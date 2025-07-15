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
    const { simulationType, userId } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Define simulation scenarios and roles
    const simulationConfigs = {
      'job_interview': {
        role: 'Recruiter',
        context: 'You are conducting a job interview for a mid-level position. Be professional, ask relevant questions about experience, skills, and cultural fit.',
        opening: 'Good morning! Thank you for coming in today. I\'m excited to learn more about you and your background. Could you start by telling me a bit about yourself and what interests you about this position?'
      },
      'performance_review': {
        role: 'Manager',
        context: 'You are conducting a performance review meeting. Be constructive, focus on achievements, areas for improvement, and goal setting.',
        opening: 'Hi there! Thanks for meeting with me today for your performance review. I\'d like to start by discussing your accomplishments this quarter. What are you most proud of in your recent work?'
      },
      'team_conflict': {
        role: 'Team_Member',
        context: 'You are a team member involved in a workplace conflict. Express concerns professionally while being open to resolution.',
        opening: 'I\'m glad we could sit down to talk about this. I\'ve been feeling frustrated about some of the recent team dynamics, and I think we need to address what happened in the last project meeting.'
      },
      'salary_negotiation': {
        role: 'HR_Manager',
        context: 'You are an HR manager in a salary negotiation. Be professional, consider budget constraints, but be open to reasonable requests.',
        opening: 'Thank you for requesting this meeting. I understand you\'d like to discuss your compensation. I\'ve reviewed your performance and contribution to the team. What specific aspects would you like to discuss?'
      }
    };

    const config = simulationConfigs[simulationType as keyof typeof simulationConfigs];
    if (!config) {
      throw new Error(`Unknown simulation type: ${simulationType}`);
    }

    const systemPrompt = `${config.context}

    Instructions:
    - Maintain the role consistently throughout the conversation
    - Respond naturally and professionally
    - Ask follow-up questions to keep the conversation engaging
    - Provide realistic challenges and scenarios
    - Give constructive feedback when appropriate
    - Keep responses concise (2-3 sentences max)
    - Rate the user's responses on: clarity (1-10), empathy (1-10), structure (1-10), conviction (1-10)`;

    const initialMessage = config.opening;

    // Generate initial AI response with scoring
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
          { role: 'user', content: 'Start the simulation.' }
        ],
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    console.log(`Started ${simulationType} simulation for user ${userId}`);

    return new Response(JSON.stringify({ 
      message: aiMessage,
      role: config.role 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in start-simulation:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});