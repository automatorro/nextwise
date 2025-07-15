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
    const { userResponse, conversationHistory, simulationType, userId } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Define simulation contexts
    const simulationConfigs = {
      'job_interview': {
        role: 'Recruiter',
        context: 'You are conducting a job interview. Continue the conversation naturally, ask follow-up questions, probe deeper into their experience and skills.'
      },
      'performance_review': {
        role: 'Manager',
        context: 'You are conducting a performance review. Provide feedback, discuss goals, and address any concerns professionally.'
      },
      'team_conflict': {
        role: 'Team_Member',
        context: 'You are a team member in a conflict situation. Respond to their points, express your perspective, work toward resolution.'
      },
      'salary_negotiation': {
        role: 'HR_Manager',
        context: 'You are an HR manager in salary negotiation. Consider their request, ask for justification, negotiate professionally.'
      }
    };

    const config = simulationConfigs[simulationType as keyof typeof simulationConfigs];
    if (!config) {
      throw new Error(`Unknown simulation type: ${simulationType}`);
    }

    // Determine if simulation should end (after 4-6 exchanges)
    const exchangeCount = conversationHistory.length;
    const shouldEnd = exchangeCount >= 8; // 4-6 exchanges = 8-12 messages

    const systemPrompt = `${config.context}

    Conversation history: ${JSON.stringify(conversationHistory)}

    Instructions:
    - Respond naturally to: "${userResponse}"
    - ${shouldEnd ? 'This should be your final response. Wrap up the conversation professionally and provide a summary of how they performed.' : 'Continue the conversation naturally.'}
    - Rate their response on: clarity (1-10), empathy (1-10), structure (1-10), conviction (1-10)
    - Keep responses concise (2-3 sentences max unless ending)

    Respond with JSON:
    {
      "message": "Your response",
      "scores": {
        "clarity": 7,
        "empathy": 8,
        "structure": 6,
        "conviction": 9
      },
      "feedback": "Brief feedback on their response",
      "shouldEnd": ${shouldEnd}
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
          { role: 'user', content: userResponse }
        ],
        temperature: 0.8,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = JSON.parse(data.choices[0].message.content);

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