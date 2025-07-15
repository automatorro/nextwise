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
    const { programType, currentDay, userId } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Define specialized prompts for each program type
    const programPrompts = {
      'leadership_development': `You are an expert leadership coach. Generate a practical daily task for day ${currentDay} of a 14-day leadership development program. Focus on building essential leadership skills like communication, decision-making, team management, and emotional intelligence.`,
      'communication_skills': `You are a communication expert. Generate a practical daily task for day ${currentDay} of a 14-day communication skills program. Focus on improving verbal, non-verbal, written communication, active listening, and interpersonal skills.`,
      'time_management': `You are a productivity expert. Generate a practical daily task for day ${currentDay} of a 14-day time management program. Focus on planning, prioritization, goal setting, productivity techniques, and work-life balance.`,
      'emotional_intelligence': `You are an emotional intelligence coach. Generate a practical daily task for day ${currentDay} of a 14-day emotional intelligence program. Focus on self-awareness, self-regulation, empathy, social skills, and emotional management.`
    };

    const systemPrompt = programPrompts[programType as keyof typeof programPrompts] || 
      `You are a career development expert. Generate a practical daily task for day ${currentDay} of a 14-day professional development program.`;

    const userPrompt = `Generate a specific, actionable daily task for day ${currentDay}. The task should:
    - Be completable in 15-30 minutes
    - Be practical and applicable to real work situations
    - Include clear instructions and expected outcomes
    - Build upon previous days' learning
    - Be engaging and motivating

    Return the response as a JSON object with:
    {
      "title": "Task title",
      "description": "Detailed task description",
      "instructions": ["step 1", "step 2", "step 3"],
      "estimated_time": "15-20 minutes",
      "learning_objective": "What the user will learn",
      "reflection_prompt": "Question for end-of-day reflection"
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
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const taskContent = JSON.parse(data.choices[0].message.content);

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