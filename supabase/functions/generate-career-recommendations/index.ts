
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

    if (!testResults || testResults.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          recommendations: [
            {
              user_id: userId,
              recommendation_type: 'test',
              title: 'Completează primul test de personalitate',
              description: 'Pentru a primi recomandări personalizate, completează testul Big Five.',
              action_text: 'Fă testul',
              priority: 5
            }
          ]
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze test results
    const bigFiveResult = testResults.find(r => 
      r.test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    );

    let analysisPrompt = `
      Based on the following user profile, generate 3-5 personalized career recommendations:
      
      Test Results:
      ${testResults.map(r => `- ${r.test_types?.name}: Score ${JSON.stringify(r.score)}`).join('\n')}
      
      Existing Career Plans: ${careerPlans?.map(p => p.title).join(', ') || 'None'}
      
      Generate recommendations in these categories: skill, path, test, course, certification
      
      Format as JSON array:
      [
        {
          "recommendation_type": "skill|path|test|course|certification",
          "title": "Short recommendation title",
          "description": "Why this is recommended based on their profile",
          "action_text": "Call to action text",
          "priority": 1-5
        }
      ]
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
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
      // Fallback recommendations
      recommendations = [
        {
          recommendation_type: 'skill',
          title: 'Dezvoltă competențe de comunicare',
          description: 'Bazat pe profilul tău, competențele de comunicare te vor ajuta să progresezi.',
          action_text: 'Vezi cursuri',
          priority: 4
        },
        {
          recommendation_type: 'path',
          title: 'Explorează leadership',
          description: 'Profilul tău sugerează potențial pentru roluri de conducere.',
          action_text: 'Creează plan',
          priority: 3
        }
      ];
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
