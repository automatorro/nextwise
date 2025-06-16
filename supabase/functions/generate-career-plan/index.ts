
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
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
    const { testResults, careerGoal, userProfile } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Analyze test results to create career plan prompt
    const bigFiveResults = testResults.find((result: any) => 
      result.test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    );

    let personalityInsights = '';
    if (bigFiveResults?.score) {
      const dimensions = bigFiveResults.score.dimensions || {};
      personalityInsights = `
        Personality Profile:
        - Openness: ${dimensions.openness || 'N/A'}
        - Conscientiousness: ${dimensions.conscientiousness || 'N/A'}
        - Extraversion: ${dimensions.extraversion || 'N/A'}
        - Agreeableness: ${dimensions.agreeableness || 'N/A'}
        - Neuroticism: ${dimensions.neuroticism || 'N/A'}
      `;
    }

    const prompt = `
      Create a detailed career development plan for someone who wants to become a ${careerGoal}.
      
      ${personalityInsights}
      
      Please provide:
      1. A realistic timeline (3-6 months, 6-12 months, 1-2 years)
      2. 6-10 specific milestones with clear descriptions
      3. Skills to develop
      4. Recommended courses or certifications
      5. Networking strategies
      6. Potential challenges and how to overcome them
      
      Format the response as JSON with this structure:
      {
        "title": "Career Development Plan Title",
        "description": "Brief description of the career path",
        "timeline": "Estimated completion time",
        "milestones": [
          {
            "title": "Milestone Title",
            "description": "Detailed description",
            "targetWeeks": 4,
            "category": "skill|certification|experience|networking"
          }
        ],
        "recommendations": [
          {
            "type": "skill|course|certification|networking",
            "title": "Recommendation Title",
            "description": "Why this is important",
            "priority": 1-5
          }
        ]
      }
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
              text: prompt
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
      // Fallback: create a basic structure
      careerPlan = {
        title: `Plan de carieră ${careerGoal}`,
        description: generatedText.substring(0, 200) + '...',
        timeline: '6-12 luni',
        milestones: [
          {
            title: 'Evaluare competențe actuale',
            description: 'Identifică punctele forte și zonele de îmbunătățire',
            targetWeeks: 2,
            category: 'assessment'
          },
          {
            title: 'Dezvoltare competențe tehnice',
            description: 'Învățarea tehnologiilor și instrumentelor necesare',
            targetWeeks: 12,
            category: 'skill'
          },
          {
            title: 'Construirea unui portofoliu',
            description: 'Crearea de proiecte demonstrative',
            targetWeeks: 8,
            category: 'experience'
          }
        ],
        recommendations: [
          {
            type: 'skill',
            title: 'Dezvoltă competențe practice',
            description: 'Concentrează-te pe implementarea practică a cunoștințelor',
            priority: 5
          }
        ]
      };
    }

    return new Response(
      JSON.stringify({ success: true, careerPlan }),
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
