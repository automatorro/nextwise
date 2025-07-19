
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
    const { userResponse, conversationLog, simulationType } = await req.json();
    
    console.log('Processing simulation response:', { simulationType, userResponse, conversationLength: conversationLog?.length });
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Determine if simulation should continue or complete
    const messageCount = conversationLog?.length || 0;
    const shouldComplete = messageCount >= 8; // Complete after 4 exchanges (8 messages total)

    const simulationRoles = {
      'job_interview': 'recrutor HR experimentat care desfășoară un interviu de angajare',
      'management_promotion': 'manager senior care discută despre oportunități de promovare',
      'team_conflict': 'coleg implicat într-un conflict de la locul de muncă care necesită rezolvare',
      'salary_negotiation': 'manager HR într-o întâlnire de negociere salarială'
    };

    const role = simulationRoles[simulationType as keyof typeof simulationRoles] || 'coleg profesional';

    let systemPrompt = `Ești un ${role}. Conduci o conversație profesională realistă în limba română.
    
    Pe baza răspunsului utilizatorului: "${userResponse}"
    
    Istoricul conversației: ${JSON.stringify(conversationLog)}
    
    ${shouldComplete ? 
      `Această conversație se încheie. Oferă o concluzie naturală și un feedback detaliat cu scoruri.
      
      Răspunde cu un obiect JSON cu această structură exactă:
      {
        "message": "Răspunsul tău final pentru a încheia conversația",
        "shouldComplete": true,
        "feedback": "Feedback detaliat despre performanța utilizatorului de-a lungul conversației",
        "scores": {
          "clarity": 8,
          "empathy": 7,
          "conviction": 9,
          "structure": 8,
          "overall": 82
        }
      }` :
      `Continuă conversația în mod natural. Pune întrebări de urmărire relevante sau răspunde corespunzător pentru a avansa conversația.
      
      Răspunde cu un obiect JSON cu această structură exactă:
      {
        "message": "Răspunsul tău pentru a continua conversația",
        "shouldComplete": false
      }`
    }
    
    IMPORTANT: Răspunde ÎNTOTDEAUNA în limba română. Toate mesajele, întrebările și feedback-ul trebuie să fie în română.`;

    console.log('Calling Gemini API...');

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
              text: systemPrompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      console.error(`Gemini API error: ${response.status} ${response.statusText}`);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const geminiResult = await response.json();
    console.log('Gemini API response:', JSON.stringify(geminiResult, null, 2));
    
    const aiResponse = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      console.error('No response from Gemini API');
      throw new Error('No response from Gemini API');
    }

    console.log('Raw AI response:', aiResponse);

    // Try multiple approaches to extract JSON
    let responseContent;
    
    try {
      // First try: direct JSON parse
      responseContent = JSON.parse(aiResponse);
    } catch {
      try {
        // Second try: extract JSON with regex
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          responseContent = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
      } catch {
        // Third try: create a fallback response in Romanian
        console.warn('Could not parse AI response as JSON, creating fallback');
        responseContent = {
          message: aiResponse.length > 10 ? aiResponse : "Mulțumesc pentru răspunsul dumneavoastră. Este interesant. Îmi puteți spune mai multe despre acest lucru?",
          shouldComplete: shouldComplete,
          ...(shouldComplete && {
            feedback: "Mulțumesc pentru participarea la această simulare. Ați demonstrat abilități bune de comunicare.",
            scores: {
              clarity: 7,
              empathy: 7,
              conviction: 7,
              structure: 7,
              overall: 70
            }
          })
        };
      }
    }

    // Validate response structure
    if (!responseContent.message || typeof responseContent.message !== 'string') {
      responseContent.message = "Mulțumesc pentru răspunsul dumneavoastră. Să mă gândesc la asta...";
    }

    if (typeof responseContent.shouldComplete !== 'boolean') {
      responseContent.shouldComplete = shouldComplete;
    }

    console.log('Final response content:', responseContent);
    console.log(`Processed simulation response for ${simulationType}`);

    return new Response(JSON.stringify(responseContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in process-simulation-response:', error);
    
    // Return a proper fallback response in Romanian
    const fallbackResponse = {
      message: "Mulțumesc pentru răspunsul dumneavoastră. Procesez informațiile și voi continua conversația noastră.",
      shouldComplete: false
    };
    
    return new Response(JSON.stringify(fallbackResponse), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
