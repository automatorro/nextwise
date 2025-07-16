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
    const { simulationType, userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Define simulation scenarios and roles
    const simulationConfigs = {
      'job_interview': {
        role: 'Recruiter',
        context: 'Desfășori un interviu de angajare pentru o poziție de nivel mediu. Fii profesional, pune întrebări relevante despre experiență, abilități și potrivirea culturală.',
        opening: 'Bună dimineața! Mulțumesc că ați venit astăzi. Sunt încântat să aflu mai multe despre dumneavoastră și experiența dumneavoastră. Ați putea să începeți prin a-mi spune ceva despre dumneavoastră și ce vă interesează la această poziție?'
      },
      'performance_review': {
        role: 'Manager',
        context: 'Desfășori o întâlnire de evaluare a performanței. Fii constructiv, concentrează-te pe realizări, zone de îmbunătățire și stabilirea obiectivelor.',
        opening: 'Salut! Mulțumesc că te-ai întâlnit cu mine astăzi pentru evaluarea performanței. Aș vrea să încep prin a discuta realizările tale din acest trimestru. De ce ești cel mai mândru în munca ta recentă?'
      },
      'team_conflict': {
        role: 'Team_Member',
        context: 'Ești un membru al echipei implicat într-un conflict de la locul de muncă. Exprimă preocupările profesional, fiind deschis la rezolvare.',
        opening: 'Mă bucur că am putut să ne așezăm să vorbim despre asta. M-am simțit frustrat în privința dinamicii recente a echipei și cred că trebuie să abordăm ce s-a întâmplat în ultima întâlnire de proiect.'
      },
      'salary_negotiation': {
        role: 'HR_Manager',
        context: 'Ești un manager HR într-o negociere salarială. Fii profesional, consideră constrângerile bugetare, dar fii deschis la cereri rezonabile.',
        opening: 'Mulțumesc pentru solicitarea acestei întâlniri. Înțeleg că ați dori să discutați despre compensarea dumneavoastră. Am revizuit performanța și contribuția dumneavoastră la echipă. Ce aspecte specifice ați dori să discutăm?'
      }
    };

    const config = simulationConfigs[simulationType as keyof typeof simulationConfigs];
    if (!config) {
      throw new Error(`Unknown simulation type: ${simulationType}`);
    }

    const fullPrompt = `${config.context}

    Instrucțiuni:
    - Menține rolul consistent pe toată durata conversației
    - Răspunde natural și profesional
    - Pune întrebări de urmărire pentru a menține conversația captivantă
    - Oferă provocări și scenarii realiste
    - Dă feedback constructiv când este cazul
    - Păstrează răspunsurile concise (maxim 2-3 propoziții)

    Începe simularea cu mesajul de deschidere: "${config.opening}"

    Răspunde cu JSON:
    {
      "message": "Mesajul de deschidere",
      "role": "${config.role}"
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

    console.log(`Started ${simulationType} simulation for user ${userId}`);

    return new Response(JSON.stringify({ 
      message: aiResponse.message,
      role: aiResponse.role 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in start-simulation:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});