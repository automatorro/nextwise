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
    const { message, sessionId, userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get user context (career plans, test results)
    const { data: careerPlans } = await supabase
      .from('career_paths')
      .select('*')
      .eq('user_id', userId);

    const { data: testResults } = await supabase
      .from('test_results')
      .select('*, test_types(name)')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(3);

    // Get conversation history
    const { data: chatHistory } = await supabase
      .from('career_chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    // Build context for AI
    let contextPrompt = `
      Ești un mentor profesional pentru carieră și coach. Ajuți oamenii să își dezvolte cariera bazându-te pe personalitatea, abilitățile și obiectivele lor.
      
      Contextul utilizatorului:
      - Planuri de carieră active: ${careerPlans?.length || 0}
      - Rezultate recente ale testelor: ${testResults?.map(r => r.test_types?.name).join(', ') || 'Niciunul'}
      
      Istoricul conversației curente:
      ${chatHistory?.map(msg => `${msg.message_type}: ${msg.content}`).join('\n') || 'Niciun mesaj anterior'}
      
      Mesajul curent al utilizatorului: ${message}
      
      Te rog să oferi sfaturi utile și acționabile pentru carieră. Fii specific și practic. Dacă faci referire la rezultatele testelor sau planurile de carieră ale acestora, fii încurajator și constructiv.
      Păstrează răspunsurile concise dar valoroase (maxim 200 de cuvinte). Răspunde în română.
    `;

    // Use the correct Gemini API endpoint
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
              text: contextPrompt
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

    // Save both messages to database
    const { error: userMsgError } = await supabase
      .from('career_chat_messages')
      .insert({
        session_id: sessionId,
        user_id: userId,
        message_type: 'user',
        content: message
      });

    const { error: aiMsgError } = await supabase
      .from('career_chat_messages')
      .insert({
        session_id: sessionId,
        user_id: userId,
        message_type: 'ai',
        content: aiResponse
      });

    if (userMsgError || aiMsgError) {
      console.error('Error saving messages:', { userMsgError, aiMsgError });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        response: aiResponse 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in AI mentoring:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to process AI mentoring request' 
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