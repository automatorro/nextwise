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
    const { question, userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const fullPrompt = `Ești un consilier expert în carieră și coach. Analizează întrebarea sau situația utilizatorului și oferă o fișă de progres cuprinzătoare cu:
    - Extragerea clară a obiectivului
    - Analiza detaliată a situației
    - Recomandări acționabile
    - Pași specifici următori
    - Calendar și jaloane

    Analizează această întrebare/situație de dezvoltare a carierei:

    "${question}"

    Oferă un răspuns cuprinzător ca obiect JSON cu:
    {
      "extracted_objective": "Obiectivul principal de carieră sau provocarea identificată",
      "ai_analysis": "Analiza detaliată a situației, provocărilor și oportunităților",
      "recommendations": [
        {
          "title": "Titlul recomandării",
          "description": "Descrierea detaliată",
          "priority": "high/medium/low",
          "timeframe": "immediate/short-term/long-term"
        }
      ],
      "next_steps": [
        {
          "step": "Descrierea pasului de acțiune",
          "timeline": "Când să fie completat",
          "resources": ["Resurse necesare"],
          "success_metrics": "Cum să măsori succesul"
        }
      ]
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

    const sheetContent = JSON.parse(aiResponse);

    console.log(`Generated progress sheet for user ${userId}`);

    return new Response(JSON.stringify(sheetContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-progress-sheet:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});