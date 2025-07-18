
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
    const { userResponse, conversationLog, simulationType } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const simulationConfigs = {
      'job_interview': 'You are conducting a job interview. Respond naturally to their answer and ask follow-up questions about their experience and skills.',
      'management_promotion': 'You are a senior manager evaluating someone for promotion. Ask about their leadership experience and management capabilities.',
      'team_conflict': 'You are a team member in a workplace conflict. Respond to their points and express your perspective professionally.',
      'salary_negotiation': 'You are an HR manager in a salary negotiation. Consider their request and negotiate professionally while considering budget constraints.'
    };

    const context = simulationConfigs[simulationType as keyof typeof simulationConfigs] || 
      'You are a professional assistant helping someone practice workplace communication.';

    const exchangeCount = conversationLog.length;
    const shouldEnd = exchangeCount >= 8;

    const fullPrompt = `${context}

    Conversation history: ${JSON.stringify(conversationLog)}
    Their latest response: "${userResponse}"

    Instructions:
    - Respond naturally to: "${userResponse}"
    - ${shouldEnd ? 'This should be your final response. End the conversation professionally and provide feedback on their performance.' : 'Continue the conversation naturally.'}
    - Evaluate their response on: clarity (1-10), empathy (1-10), structure (1-10), conviction (1-10)
    - Keep responses concise (max 2-3 sentences, except for ending)

    Respond with JSON:
    {
      "message": "Your response",
      "scores": {
        "clarity": 7,
        "empathy": 8,
        "structure": 6,
        "conviction": 9,
        "overall": 75
      },
      "feedback": "Brief feedback about their response",
      "shouldComplete": ${shouldEnd}
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
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const geminiResult = await response.json();
    const aiResponseText = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponseText) {
      throw new Error('No response from Gemini API');
    }

    const jsonMatch = aiResponseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const aiResponse = JSON.parse(jsonMatch[0]);

    console.log(`Processed simulation response for ${simulationType}`);

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in process-simulation-response:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: "Thank you for your response. Let's continue our practice session.",
      scores: {
        clarity: 7,
        empathy: 7,
        structure: 7,
        conviction: 7,
        overall: 70
      },
      feedback: "Good effort! Keep practicing to improve your communication skills.",
      shouldComplete: false
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
