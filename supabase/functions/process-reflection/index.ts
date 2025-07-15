import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

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
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const systemPrompt = `You are an expert career coach analyzing a user's daily reflection for a ${programType} program. 
    Provide constructive, encouraging feedback that:
    - Acknowledges their efforts and insights
    - Identifies key learnings and growth areas
    - Offers specific suggestions for improvement
    - Connects today's learning to career development
    - Maintains a supportive and motivational tone`;

    const userPrompt = `Analyze this reflection from day ${currentDay} of the program:

    "${reflection}"

    Provide feedback as a JSON object with:
    {
      "feedback": "Personalized feedback message",
      "key_insights": ["insight 1", "insight 2"],
      "suggestions": ["suggestion 1", "suggestion 2"],
      "encouragement": "Motivational message",
      "next_focus": "What to focus on tomorrow"
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const feedbackContent = JSON.parse(data.choices[0].message.content);

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