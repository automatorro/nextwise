
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
    
    console.log('Processing simulation response:', { simulationType, userResponse, conversationLength: conversationLog?.length });
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Determine if simulation should continue or complete
    const messageCount = conversationLog?.length || 0;
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

    console.log('Calling Gemini API...');

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
      console.error(`Gemini API error: ${response.status} ${response.statusText}`);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const geminiResult = await response.json();
    console.log('Gemini API response:', JSON.stringify(geminiResult, null, 2));
    
    const aiResponse = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      console.error('No response from Gemini API');
      throw new Error('No response from Gemini API');
    }

    console.log('Raw AI response:', aiResponse);

    // Try multiple approaches to extract JSON
    let responseContent;
    
    try {
      // First try: direct JSON parse
      responseContent = JSON.parse(aiResponse);
    } catch {
      try {
        // Second try: extract JSON with regex
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          responseContent = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
      } catch {
        // Third try: create a fallback response
        console.warn('Could not parse AI response as JSON, creating fallback');
        responseContent = {
          message: aiResponse.length > 10 ? aiResponse : "Thank you for your response. That's interesting. Can you tell me more about that?",
          shouldComplete: shouldComplete,
          ...(shouldComplete && {
            feedback: "Thank you for participating in this simulation. You showed good communication skills.",
            scores: {
              clarity: 7,
              empathy: 7,
              conviction: 7,
              structure: 7,
              overall: 70
            }
          })
        };
      }
    }

    // Validate response structure
    if (!responseContent.message || typeof responseContent.message !== 'string') {
      responseContent.message = "Thank you for your response. Let me think about that...";
    }

    if (typeof responseContent.shouldComplete !== 'boolean') {
      responseContent.shouldComplete = shouldComplete;
    }

    console.log('Final response content:', responseContent);
    console.log(`Processed simulation response for ${simulationType}`);

    return new Response(JSON.stringify(responseContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in process-simulation-response:', error);
    
    // Return a proper fallback response instead of throwing
    const fallbackResponse = {
      message: "Thank you for your response. I'm processing your input and will continue our conversation.",
      shouldComplete: false
    };
    
    return new Response(JSON.stringify(fallbackResponse), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
