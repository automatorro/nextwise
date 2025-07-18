
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { simulationType } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const simulationConfigs = {
      'job_interview': {
        role: 'Interviewer',
        opening: 'Hello! Thank you for coming in today. I\'m excited to learn more about you and your experience. Could you start by telling me a bit about yourself and what interests you about this position?'
      },
      'management_promotion': {
        role: 'Senior Manager',
        opening: 'Hi there! Thanks for meeting with me today for your promotion interview. I\'d like to start by discussing your leadership experience. Can you tell me about a time when you had to lead a team through a challenging situation?'
      },
      'team_conflict': {
        role: 'Team Member',
        opening: 'I\'m glad we could sit down to talk about this. I\'ve been feeling frustrated about some recent team dynamics, and I think we need to address what happened in our last project meeting.'
      },
      'salary_negotiation': {
        role: 'HR Manager',
        opening: 'Thank you for requesting this meeting. I understand you\'d like to discuss your compensation. I\'ve reviewed your performance and contributions to the team. What specific aspects would you like to discuss?'
      }
    };

    const config = simulationConfigs[simulationType as keyof typeof simulationConfigs];
    if (!config) {
      throw new Error(`Unknown simulation type: ${simulationType}`);
    }

    console.log(`Started ${simulationType} simulation`);

    return new Response(JSON.stringify({ 
      message: config.opening,
      role: config.role 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in start-simulation:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: "Hello! Let's begin our practice session. How can I help you today?",
      role: "Assistant"
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
