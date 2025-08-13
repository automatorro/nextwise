

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reflection, programType, day } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Define program-specific coaching styles
    const getProgression = (day: number) => {
      if (day <= 3) return "introducere și conștientizare";
      if (day <= 7) return "dezvoltare și practică";  
      if (day <= 10) return "consolidare și aplicare";
      return "finalizare și integrare";
    };

    const programContext = {
      'motivation_reset': `un program specializat pentru RESETAREA MOTIVAȚIEI. Concentrează-te pe energie, obiective clare și obiceiuri pozitive.`,
      'leadership_transition': `un program specializat pentru TRANZIȚIA ÎN LEADERSHIP. Concentrează-te pe abilitățile de leadership, managementul echipei și luarea deciziilor.`,
      'interview_training': `un program specializat pentru PREGĂTIREA INTERVIURILOR. Concentrează-te pe comunicare, prezentare și încredere în sine.`,
      'career_clarity': `un program specializat pentru CLARITATEA ÎN CARIERĂ. Concentrează-te pe autodescoperire, explorare și planificare strategică.`
    };

    const context = programContext[programType as keyof typeof programContext] || 'un program de dezvoltare profesională';

    const fullPrompt = `Ești un expert coach de carieră care analizează o reflecție zilnică pentru ${context}
    
    ZIUA ${day}/14 - FAZA: ${getProgression(day)}
    Reflecția utilizatorului: "${reflection}"
    
    Oferă feedback personalizat și specific programului care:
    - Recunoaște eforturile și perspectivele specifice tipului de program
    - Identifică învățămintele cheie relevaante pentru ${programType.replace('_', ' ')}
    - Oferă sugestii specifice și acționabile pentru îmbunătățire
    - Conectează învățarea cu obiectivele programului
    - Menține un ton profesional dar încurajator

    ${day < 14 ? `De asemenea, sugerează direcția pentru ziua următoare (${day + 1}) în contextul fazei "${getProgression(day + 1)}".` : 'Aceasta este ziua finală - oferă feedback de finalizare și un scor bazat pe progresul din reflecție.'}

    IMPORTANT: Răspunde EXCLUSIV în limba română.

    Răspunde cu un obiect JSON valid cu această structură exactă:
    {
      "feedback": "Mesaj personalizat de feedback specific programului",
      "nextTask": ${day < 14 ? '{"title": "Titlul sarcinii pentru ziua următoare", "task": "Descrierea sarcinii următoare adaptată programului", "estimated_duration": "15-30 minute", "reflection_question": "Întrebarea pentru reflecția următoare"}' : 'null'},
      "shouldComplete": ${day >= 14 ? 'true' : 'false'},
      "finalFeedback": ${day >= 14 ? '"Feedback final pentru finalizarea programului cu evaluare și recomandări"' : 'null'},
      "finalScore": ${day >= 14 ? 'un număr între 70-100 bazat pe progresul din reflecție' : 'null'}
    }`;

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
              text: fullPrompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const geminiResult = await response.json();
    const aiResponse = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error('No response from Gemini API');
    }

    // Clean and extract JSON with improved parsing
    let cleanedResponse = aiResponse.trim();
    
    // Remove markdown code blocks if present
    cleanedResponse = cleanedResponse.replace(/```json\s*|\s*```/g, '');
    
    // Extract JSON object
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }
    
    let feedbackContent;
    try {
      feedbackContent = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, 'Raw response:', aiResponse);
      throw new Error(`Failed to parse JSON: ${parseError.message}`);
    }

    console.log(`Processed reflection for program ${programType}, day ${day}`);

    return new Response(JSON.stringify(feedbackContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in process-reflection:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      feedback: "Mulțumesc pentru reflecția ta. Continuă cu parcursul tău de dezvoltare mâine!",
      nextTask: day < 14 ? {
        title: "Reflecție Zilnică",
        task: "Ia-ți timp să reflectezi asupra progresului tău și să planifici pentru mâine.",
        estimated_duration: "10 minute",
        reflection_question: "Pe ce te vei concentra mâine?"
      } : null,
      shouldComplete: day >= 14,
      finalFeedback: day >= 14 ? "Felicitări pentru finalizarea programului!" : null,
      finalScore: day >= 14 ? 85 : null
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

