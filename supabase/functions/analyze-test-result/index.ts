import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
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
    const { testResultId, testType, score, answers } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Create analysis prompt based on test type and results
    let analysisPrompt = `
      Analizează următorul rezultat al testului psihologic și oferă o interpretare detaliată și constructivă.
      
      Tipul testului: ${testType}
      Scorul obținut: ${JSON.stringify(score)}
      
      Te rog să oferi:
      1. O interpretare clară a rezultatelor
      2. Puncte forte identificate
      3. Zone de dezvoltare
      4. Recomandări practice pentru dezvoltarea personală și profesională
      5. Cum poate persoana să își folosească aceste rezultate în carieră
      
      Răspunde în română, într-un ton profesional dar accesibil. Fii pozitiv și constructiv.
      Maxim 500 de cuvinte.
    `;

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
              text: analysisPrompt
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
    const aiAnalysis = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiAnalysis) {
      throw new Error('No response from Gemini API');
    }

    // Update test result with AI analysis
    const { error: updateError } = await supabase
      .from('test_results')
      .update({
        ai_analysis: aiAnalysis
      })
      .eq('id', testResultId);

    if (updateError) {
      console.error('Error updating test result:', updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: aiAnalysis 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error analyzing test result:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to analyze test result' 
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