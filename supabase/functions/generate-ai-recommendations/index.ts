import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { analysisText, sourceType, sourceId, testType } = await req.json();
    
    if (!analysisText) {
      throw new Error('Analysis text is required');
    }

    console.log(`Generating recommendations for ${sourceType}: ${testType || 'unknown'}`);

    // Get user from authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Create prompt for generating recommendations
    const prompt = `
Analizează următoarea analiză AI și generează 3-5 recomandări concrete și acționabile pentru dezvoltarea carierei:

ANALIZA:
${analysisText}

CONTEXT:
- Tipul sursei: ${sourceType}
- Tipul testului: ${testType || 'necunoscut'}

Te rugăm să generezi recomandări în format JSON cu următoarea structură:
{
  "recommendations": [
    {
      "title": "Titlul recomandării",
      "description": "Descriere detaliată",
      "action_items": ["Acțiune 1", "Acțiune 2", "Acțiune 3"],
      "priority": 1-5 (1 = cea mai mare prioritate),
      "estimated_time": "timeframe estimat",
      "category": "skill_development|networking|job_search|personal_growth"
    }
  ]
}

Asigură-te că recomandările sunt:
1. Specifice și acționabile
2. Relevante pentru analiza furnizată
3. Realizabile în timp rezonabil
4. Prioritizate logic
5. În limba română
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No recommendations generated');
    }

    // Parse the JSON response
    let recommendationsData;
    try {
      // Extract JSON from the response (it might be wrapped in markdown)
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recommendationsData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    } catch (parseError) {
      console.error('Error parsing recommendations JSON:', parseError);
      throw new Error('Failed to parse AI recommendations');
    }

    // Save recommendations to database
    const recommendations = recommendationsData.recommendations || [];
    const savedRecommendations = [];

    for (const rec of recommendations) {
      const { data: savedRec, error: saveError } = await supabase
        .from('ai_recommendations')
        .insert({
          user_id: user.id,
          source_type: sourceType,
          source_id: sourceId,
          recommendation_text: `**${rec.title}**\n\n${rec.description}`,
          action_items: rec.action_items || [],
          priority: rec.priority || 3,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        })
        .select()
        .single();

      if (saveError) {
        console.error('Error saving recommendation:', saveError);
      } else {
        savedRecommendations.push(savedRec);
      }
    }

    console.log(`Successfully generated and saved ${savedRecommendations.length} recommendations`);

    return new Response(JSON.stringify({ 
      success: true,
      recommendations: savedRecommendations,
      count: savedRecommendations.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-ai-recommendations:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate recommendations'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});