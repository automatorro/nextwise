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
    const { testResults, careerGoal, userProfile, userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Analyze test results to create career plan prompt
    const bigFiveResults = testResults.find((result: any) => 
      result.test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    );

    let personalityInsights = '';
    if (bigFiveResults?.score) {
      const dimensions = bigFiveResults.score.dimensions || {};
      personalityInsights = `
        Profilul de personalitate (Big Five):
        - Deschidere: ${dimensions.openness || 'N/A'}/100
        - Conștiinciozitate: ${dimensions.conscientiousness || 'N/A'}/100
        - Extraversiune: ${dimensions.extraversion || 'N/A'}/100
        - Amabilitate: ${dimensions.agreeableness || 'N/A'}/100
        - Nevroza: ${dimensions.neuroticism || 'N/A'}/100
      `;
    }

    const prompt = `
      Creează un plan detaliat de dezvoltare a carierei pentru cineva care vrea să devină ${careerGoal}.
      
      ${personalityInsights}
      
      Alte rezultate ale testelor:
      ${testResults.map((r: any) => `- ${r.test_types?.name}: ${JSON.stringify(r.score)}`).join('\n')}
      
      Te rog să furnizezi:
      1. Un timeline realist (3-6 luni, 6-12 luni, 1-2 ani)
      2. 6-10 milestones specifice cu descrieri clare
      3. Competențe de dezvoltat
      4. Cursuri sau certificări recomandate
      5. Strategii de networking
      6. Provocări potențiale și cum să le depășești
      
      Formatează răspunsul ca JSON cu această structură:
      {
        "title": "Titlul planului de dezvoltare a carierei",
        "description": "Descriere scurtă a căii de carieră",
        "timeline": "Timpul estimat de finalizare",
        "milestones": [
          {
            "title": "Titlul Milestone-ului",
            "description": "Descriere detaliată",
            "targetWeeks": 4,
            "category": "skill|certification|experience|networking|assessment"
          }
        ],
        "recommendations": [
          {
            "type": "skill|course|certification|networking",
            "title": "Titlul recomandării",
            "description": "De ce este important",
            "priority": 1-5
          }
        ]
      }
      
      Răspunde DOAR cu JSON-ul, fără alte explicații.
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
              text: prompt
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

    if (!generatedText) {
      throw new Error('No response from Gemini API');
    }

    // Try to parse JSON from the response
    let careerPlan;
    try {
      // Extract JSON from the response (it might contain markdown formatting)
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        careerPlan = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      // Fallback: create a basic structure
      careerPlan = {
        title: `Plan de carieră ${careerGoal}`,
        description: `Plan personalizat pentru a deveni ${careerGoal} bazat pe profilul tău de personalitate.`,
        timeline: '6-12 luni',
        milestones: [
          {
            title: 'Evaluare competențe actuale',
            description: 'Identifică punctele forte și zonele de îmbunătățire relevante pentru rolul dorit.',
            targetWeeks: 2,
            category: 'assessment'
          },
          {
            title: 'Dezvoltare competențe tehnice',
            description: 'Învățarea tehnologiilor și instrumentelor necesare în domeniu.',
            targetWeeks: 12,
            category: 'skill'
          },
          {
            title: 'Construirea unui portofoliu',
            description: 'Crearea de proiecte demonstrative relevante.',
            targetWeeks: 8,
            category: 'experience'
          },
          {
            title: 'Networking în industrie',
            description: 'Conectarea cu profesioniști din domeniu și participarea la evenimente.',
            targetWeeks: 16,
            category: 'networking'
          }
        ],
        recommendations: [
          {
            type: 'skill',
            title: 'Dezvoltă competențe practice',
            description: 'Concentrează-te pe implementarea practică a cunoștințelor teoretice.',
            priority: 5
          },
          {
            type: 'certification',
            title: 'Obține certificări relevante',
            description: 'Certificările validate de industrie îți vor crește credibilitatea.',
            priority: 4
          }
        ]
      };
    }

    // Save the career plan to database
    const { data: savedPlan, error: saveError } = await supabase
      .from('career_paths')
      .insert({
        user_id: userId,
        title: careerPlan.title,
        description: careerPlan.description,
        milestones: careerPlan.milestones,
        generated_by_ai: true,
        progress_percentage: 0
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving career plan:', saveError);
      throw saveError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        careerPlan: {
          ...careerPlan,
          id: savedPlan.id
        }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error generating career plan:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to generate career plan' 
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