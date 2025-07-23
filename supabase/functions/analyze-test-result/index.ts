
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
    const { testResultId, prompt } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // First, check if analysis already exists
    const { data: existingResult, error: fetchError } = await supabase
      .from('test_results')
      .select('ai_analysis')
      .eq('id', testResultId)
      .single();

    if (fetchError) {
      console.error('Error fetching existing result:', fetchError);
      throw fetchError;
    }

    // If analysis already exists, return it instead of generating new one
    if (existingResult?.ai_analysis) {
      console.log('Analysis already exists for result:', testResultId);
      return new Response(
        JSON.stringify({ 
          success: true, 
          analysis: existingResult.ai_analysis,
          alreadyGenerated: true
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    // Generate new analysis using Gemini API
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
              text: prompt
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

    // Save the analysis to database
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

    console.log('Analysis generated and saved for result:', testResultId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis: aiAnalysis,
        alreadyGenerated: false
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
