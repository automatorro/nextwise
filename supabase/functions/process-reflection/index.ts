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
    const { reflection, programType, currentDay, userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const fullPrompt = `Ești un coach expert în carieră care analizează reflecția zilnică a unui utilizator pentru un program de ${programType}. 
    Oferă feedback constructiv și încurajator care să:
    - Recunoască eforturile și perspectivele lor
    - Identifice învățăturile cheie și zonele de creștere
    - Ofere sugestii specifice pentru îmbunătățire
    - Conecteze învățarea de astăzi cu dezvoltarea carierei
    - Mențină un ton suportiv și motivațional

    Analizează această reflecție din ziua ${currentDay} a programului:

    "${reflection}"

    Oferă feedback ca un obiect JSON cu:
    {
      "feedback": "Mesaj de feedback personalizat",
      "key_insights": ["perspectiva 1", "perspectiva 2"],
      "suggestions": ["sugestia 1", "sugestia 2"],
      "encouragement": "Mesaj motivațional",
      "next_focus": "Pe ce să se concentreze mâine"
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

    const feedbackContent = JSON.parse(aiResponse);

    console.log(`Processed reflection for user ${userId}, program ${programType}, day ${currentDay}`);

    return new Response(JSON.stringify(feedbackContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in process-reflection:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});