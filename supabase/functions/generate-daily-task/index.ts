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
    const { programType, currentDay, userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Define specialized prompts for each program type
    const programPrompts = {
      'leadership_development': `Ești un coach expert în leadership. Generează o sarcină practică zilnică pentru ziua ${currentDay} dintr-un program de dezvoltare a leadership-ului de 14 zile. Concentrează-te pe construirea abilităților esențiale de leadership precum comunicarea, luarea deciziilor, managementul echipei și inteligența emoțională.`,
      'communication_skills': `Ești un expert în comunicare. Generează o sarcină practică zilnică pentru ziua ${currentDay} dintr-un program de dezvoltare a abilităților de comunicare de 14 zile. Concentrează-te pe îmbunătățirea comunicării verbale, non-verbale, scrise, ascultarea activă și abilitățile interpersonale.`,
      'time_management': `Ești un expert în productivitate. Generează o sarcină practică zilnică pentru ziua ${currentDay} dintr-un program de management al timpului de 14 zile. Concentrează-te pe planificare, prioritizare, stabilirea obiectivelor, tehnici de productivitate și echilibrul viață-muncă.`,
      'emotional_intelligence': `Ești un coach de inteligență emoțională. Generează o sarcină practică zilnică pentru ziua ${currentDay} dintr-un program de dezvoltare a inteligenței emoționale de 14 zile. Concentrează-te pe autocunoaștere, autocontrol, empatie, abilități sociale și managementul emoțional.`
    };

    const systemPrompt = programPrompts[programType as keyof typeof programPrompts] || 
      `Ești un expert în dezvoltarea carierei. Generează o sarcină practică zilnică pentru ziua ${currentDay} dintr-un program de dezvoltare profesională de 14 zile.`;

    const fullPrompt = `${systemPrompt}

    Generează o sarcină specifică și acționabilă pentru ziua ${currentDay}. Sarcina trebuie să:
    - Fie completabilă în 15-30 de minute
    - Fie practică și aplicabilă în situații de lucru reale
    - Includă instrucțiuni clare și rezultate așteptate
    - Se bazeze pe învățarea din zilele anterioare
    - Fie captivantă și motivantă

    Răspunde cu un obiect JSON cu:
    {
      "title": "Titlul sarcinii",
      "description": "Descrierea detaliată a sarcinii",
      "instructions": ["pasul 1", "pasul 2", "pasul 3"],
      "estimated_time": "15-20 minute",
      "learning_objective": "Ce va învăța utilizatorul",
      "reflection_prompt": "Întrebare pentru reflecția de sfârșitul zilei"
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
    const aiResponse = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error('No response from Gemini API');
    }

    const taskContent = JSON.parse(aiResponse);

    console.log(`Generated daily task for user ${userId}, program ${programType}, day ${currentDay}`);

    return new Response(JSON.stringify(taskContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-daily-task:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});