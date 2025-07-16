import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userResponse, conversationHistory, simulationType, userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Define simulation contexts
    const simulationConfigs = {
      'job_interview': {
        role: 'Recruiter',
        context: 'Desfășori un interviu de angajare. Continuă conversația natural, pune întrebări de urmărire, investighează mai adânc experiența și abilitățile lor.'
      },
      'performance_review': {
        role: 'Manager',
        context: 'Desfășori o evaluare de performanță. Oferă feedback, discută obiectivele și abordează orice preocupări în mod profesional.'
      },
      'team_conflict': {
        role: 'Team_Member',
        context: 'Ești un membru al echipei într-o situație de conflict. Răspunde la punctele lor, exprimă-ți perspectiva, lucrează către rezolvare.'
      },
      'salary_negotiation': {
        role: 'HR_Manager',
        context: 'Ești un manager HR în negocierea salariului. Consideră cererea lor, cere justificare, negociază profesional.'
      }
    };

    const config = simulationConfigs[simulationType as keyof typeof simulationConfigs];
    if (!config) {
      throw new Error(`Unknown simulation type: ${simulationType}`);
    }

    // Determine if simulation should end (after 4-6 exchanges)
    const exchangeCount = conversationHistory.length;
    const shouldEnd = exchangeCount >= 8; // 4-6 exchanges = 8-12 messages

    const fullPrompt = `${config.context}

    Istoricul conversației: ${JSON.stringify(conversationHistory)}

    Instrucțiuni:
    - Răspunde natural la: "${userResponse}"
    - ${shouldEnd ? 'Acesta ar trebui să fie răspunsul tău final. Încheie conversația profesional și oferă un rezumat al performanței lor.' : 'Continuă conversația natural.'}
    - Evaluează răspunsul lor pe: claritate (1-10), empatie (1-10), structură (1-10), convingere (1-10)
    - Păstrează răspunsurile concise (maxim 2-3 propoziții, exceptând încheierea)

    Răspunde cu JSON:
    {
      "message": "Răspunsul tău",
      "scores": {
        "clarity": 7,
        "empathy": 8,
        "structure": 6,
        "conviction": 9
      },
      "feedback": "Feedback scurt despre răspunsul lor",
      "shouldEnd": ${shouldEnd}
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
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} - ${errorText}`);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const geminiResult = await response.json();
    const aiResponseText = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponseText) {
      throw new Error('No response from Gemini API');
    }

    const aiResponse = JSON.parse(aiResponseText);

    console.log(`Processed simulation response for user ${userId}, simulation ${simulationType}`);

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in process-simulation-response:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});