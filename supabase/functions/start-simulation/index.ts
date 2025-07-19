
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
    const { simulationType } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const simulationConfigs = {
      'job_interview': {
        role: 'Intervievator',
        opening: 'Bună ziua! Vă mulțumesc că ați venit astăzi la acest interviu. Sunt bucuros să vă cunosc și să aflu mai multe despre experiența dumneavoastră. Ați putea să începeți prin a-mi spune puțin despre dumneavoastră și ce vă interesează la această poziție?'
      },
      'management_promotion': {
        role: 'Manager Senior',
        opening: 'Bună ziua! Vă mulțumesc că ați acceptat să discutăm despre oportunitatea de promovare. Aș dori să încep prin a discuta despre experiența dumneavoastră de leadership. Îmi puteți povesti despre o situație în care a trebuit să conduceți o echipă printr-o provocare dificilă?'
      },
      'team_conflict': {
        role: 'Coleg de Echipă',
        opening: 'Mă bucur că am putut să ne facem timp pentru această discuție. M-am simțit frustrat în legătură cu dinamica echipei din ultima vreme și cred că trebuie să abordăm ce s-a întâmplat în ultima noastră ședință de proiect.'
      },
      'salary_negotiation': {
        role: 'Manager HR',
        opening: 'Vă mulțumesc că ați solicitat această întâlnire. Înțeleg că doriți să discutăm despre compensația dumneavoastră. Am analizat performanța și contribuțiile dumneavoastră la echipă. Ce aspecte specifice ați dori să discutăm?'
      }
    };

    const config = simulationConfigs[simulationType as keyof typeof simulationConfigs];
    if (!config) {
      throw new Error(`Unknown simulation type: ${simulationType}`);
    }

    console.log(`Started ${simulationType} simulation`);

    return new Response(JSON.stringify({ 
      message: config.opening,
      role: config.role 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in start-simulation:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: "Bună ziua! Să începem sesiunea noastră de practică. Cum vă pot ajuta astăzi?",
      role: "Asistent"
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
