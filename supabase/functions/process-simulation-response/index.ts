
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

    // Determine if simulation should continue or complete
    const messageCount = conversationLog.length;
    const shouldComplete = messageCount >= 8; // Complete after 4 exchanges (8 messages total)

    const simulationRoles = {
      'job_interview': 'experienced HR recruiter conducting a job interview',
      'management_promotion': 'senior manager discussing promotion opportunities',
      'team_conflict': 'colleague involved in a workplace conflict that needs resolution',
      'salary_negotiation': 'HR manager in a salary negotiation meeting'
    };

    const role = simulationRoles[simulationType as keyof typeof simulationRoles] || 'professional colleague';

    let systemPrompt = `You are a ${role}. You are having a realistic professional conversation.
    
    Based on the user's response: "${userResponse}"
    
    Conversation history: ${JSON.stringify(conversationLog)}
    
    ${shouldComplete ? 
      `This conversation is ending. Provide a natural conclusion and detailed feedback with scores.
      
      Respond with a JSON object with this exact structure:
      {
        "message": "Your final response to conclude the conversation",
        "shouldComplete": true,
        "feedback": "Detailed feedback on the user's performance throughout the conversation",
        "scores": {
          "clarity": 8,
          "empathy": 7,
          "conviction": 9,
          "structure": 8,
          "overall": 82
        }
      }` :
      `Continue the conversation naturally. Ask relevant follow-up questions or respond appropriately to move the conversation forward.
      
      Respond with a JSON object with this exact structure:
      {
        "message": "Your response to continue the conversation",
        "shouldComplete": false
      }`
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
              text: systemPrompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const geminiResult = await response.json();
    const aiResponse = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error('No response from Gemini API');
    }

    // Clean the response to extract only JSON
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const responseContent = JSON.parse(jsonMatch[0]);

    console.log(`Processed simulation response for ${simulationType}`);

    return new Response(JSON.stringify(responseContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in process-simulation-response:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      message: "Thank you for your response. Let me think about that...",
      shouldComplete: false
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
