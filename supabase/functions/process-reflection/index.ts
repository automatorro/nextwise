

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

    const fullPrompt = `Ești un expert coach de carieră care analizează o reflecție zilnică pentru un program ${programType}.
    
    Reflecția pentru ziua ${day}: "${reflection}"
    
    Oferă feedback constructiv și încurajator care:
    - Recunoaște eforturile și perspectivele lor
    - Identifică învățămintele cheie și zonele de creștere
    - Oferă sugestii specifice pentru îmbunătățire
    - Conectează învățarea de astăzi cu dezvoltarea carierei
    - Menține un ton de susținere și motivant

    ${day < 14 ? 'De asemenea, generează sarcina pentru ziua următoare.' : 'Aceasta este ziua finală, oferă feedback pentru finalizarea programului.'}

    IMPORTANT: Răspunde ÎNTOTDEAUNA în limba română. Toate mesajele, feedback-ul și sarcinile trebuie să fie în română.

    Răspunde cu un obiect JSON cu această structură exactă:
    {
      "feedback": "Mesaj personalizat de feedback",
      "nextTask": ${day < 14 ? '{"title": "Titlul sarcinii următoare", "task": "Descrierea sarcinii următoare", "estimated_duration": "15-20 minute", "reflection_question": "Întrebarea pentru reflecția următoare"}' : 'null'},
      "shouldComplete": ${day >= 14 ? 'true' : 'false'},
      "finalFeedback": ${day >= 14 ? '"Feedback final pentru finalizarea programului și scor"' : 'null'},
      "finalScore": ${day >= 14 ? '85' : 'null'}
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

    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const feedbackContent = JSON.parse(jsonMatch[0]);

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

