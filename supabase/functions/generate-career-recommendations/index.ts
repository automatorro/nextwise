import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get user's test results
    const { data: testResults } = await supabase
      .from('test_results')
      .select('*, test_types(name)')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    // Get existing career plans
    const { data: careerPlans } = await supabase
      .from('career_paths')
      .select('*')
      .eq('user_id', userId);

    // Get existing recommendations to avoid duplicates
    const { data: existingRecs } = await supabase
      .from('career_recommendations')
      .select('recommendation_type, title')
      .eq('user_id', userId)
      .eq('is_dismissed', false);

    if (!testResults || testResults.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          recommendations: [
            {
              user_id: userId,
              recommendation_type: 'test',
              title: 'Completează primul test de personalitate',
              description: 'Pentru a primi recomandări personalizate, completează testul Big Five pentru a-ți înțelege mai bine personalitatea și preferințele profesionale.',
              action_text: 'Fă testul Big Five',
              priority: 5
            }
          ]
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze test results for recommendations
    const bigFiveResult = testResults.find(r => 
      r.test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    );

    let personalityAnalysis = '';
    if (bigFiveResult?.score?.dimensions) {
      const dims = bigFiveResult.score.dimensions;
      personalityAnalysis = `
        Analiză Big Five:
        - Deschidere: ${dims.openness}/100
        - Conștiinciozitate: ${dims.conscientiousness}/100  
        - Extraversiune: ${dims.extraversion}/100
        - Amabilitate: ${dims.agreeableness}/100
        - Nevroza: ${dims.neuroticism}/100
      `;
    }

    let analysisPrompt = `
      Pe baza următorului profil al utilizatorului, generează 3-5 recomandări personalizate pentru carieră:
      
      Rezultatele testelor:
      ${testResults.map(r => `- ${r.test_types?.name}: Scor ${JSON.stringify(r.score)}`).join('\n')}
      
      ${personalityAnalysis}
      
      Planuri de carieră existente: ${careerPlans?.map(p => p.title).join(', ') || 'Niciunul'}
      
      Recomandări existente (evită duplicatele): ${existingRecs?.map(r => r.title).join(', ') || 'Niciunul'}
      
      Generează recomandări în aceste categorii: skill, path, test, course, certification
      
      Criterii pentru recomandări:
      - Bazate pe punctele forte și slăbiciunile din teste
      - Relevante pentru dezvoltarea carierei
      - Acționabile și specifice
      - Evită duplicarea recomandărilor existente
      
      Formatează ca array JSON (DOAR JSON, fără alte explicații):
      [
        {
          "recommendation_type": "skill|path|test|course|certification",
          "title": "Titlu scurt al recomandării",
          "description": "De ce este recomandată pe baza profilului lor",
          "action_text": "Text pentru call-to-action",
          "priority": 1-5
        }
      ]
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: analysisPrompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} - ${errorText}`);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const geminiResult = await response.json();
    const generatedText = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    let recommendations = [];
    try {
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      // Fallback recommendations based on Big Five results
      if (bigFiveResult?.score?.dimensions) {
        const dims = bigFiveResult.score.dimensions;
        
        if (dims.openness > 70) {
          recommendations.push({
            recommendation_type: 'skill',
            title: 'Explorează tehnologii noi',
            description: 'Deschiderea ta ridicată sugerează că ai avea succes în învățarea de tehnologii inovatoare.',
            action_text: 'Vezi cursuri noi',
            priority: 4
          });
        }
        
        if (dims.conscientiousness > 70) {
          recommendations.push({
            recommendation_type: 'certification',
            title: 'Obține certificări profesionale',
            description: 'Conștiinciozitatea ta ridicată te va ajuta să completezi cu succes programe de certificare.',
            action_text: 'Explorează certificări',
            priority: 5
          });
        }
        
        if (dims.extraversion > 70) {
          recommendations.push({
            recommendation_type: 'path',
            title: 'Consideră roluri de leadership',
            description: 'Extraversiunea ta ridicată indică potențial pentru roluri manageriale sau de conducere.',
            action_text: 'Explorează leadership',
            priority: 4
          });
        } else if (dims.extraversion < 40) {
          recommendations.push({
            recommendation_type: 'skill',
            title: 'Dezvoltă competențe tehnice specializate',
            description: 'Introversiunea ta poate fi un avantaj în roluri tehnice care necesită concentrare profundă.',
            action_text: 'Vezi competențe tehnice',
            priority: 4
          });
        }
      }
      
      // Default fallback
      if (recommendations.length === 0) {
        recommendations = [
          {
            recommendation_type: 'skill',
            title: 'Dezvoltă competențe de comunicare',
            description: 'Competențele de comunicare sunt esențiale în orice carieră și te vor ajuta să progresezi.',
            action_text: 'Vezi cursuri de comunicare',
            priority: 4
          },
          {
            recommendation_type: 'path',
            title: 'Explorează opțiuni de carieră',
            description: 'Pe baza profilului tău, ar fi util să explorezi diferite căi de carieră disponibile.',
            action_text: 'Explorează cariere',
            priority: 3
          }
        ];
      }
    }

    // Add user_id and test_ids to each recommendation
    const enrichedRecommendations = recommendations.map((rec: any) => ({
      ...rec,
      user_id: userId,
      based_on_test_ids: testResults.map(r => r.id)
    }));

    // Save recommendations to database
    const { error: insertError } = await supabase
      .from('career_recommendations')
      .insert(enrichedRecommendations);

    if (insertError) {
      console.error('Error saving recommendations:', insertError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        recommendations: enrichedRecommendations 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to generate recommendations' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});