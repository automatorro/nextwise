
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
    const { reflection, programType, day } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const fullPrompt = `You are an expert career coach analyzing a daily reflection for a ${programType} program.
    
    Day ${day} reflection: "${reflection}"
    
    Provide constructive and encouraging feedback that:
    - Acknowledges their efforts and insights
    - Identifies key learnings and growth areas
    - Offers specific suggestions for improvement
    - Connects today's learning to career development
    - Maintains a supportive and motivational tone

    ${day < 14 ? 'Also generate the next day task.' : 'This is the final day, provide completion feedback.'}

    Respond with a JSON object with this exact structure:
    {
      "feedback": "Personalized feedback message",
      "nextTask": ${day < 14 ? '{"title": "Next task title", "task": "Next task description", "estimated_duration": "15-20 minutes", "reflection_question": "Next reflection question"}' : 'null'},
      "shouldComplete": ${day >= 14 ? 'true' : 'false'},
      "finalFeedback": ${day >= 14 ? '"Final program completion feedback and score"' : 'null'},
      "finalScore": ${day >= 14 ? '85' : 'null'}
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
    const aiResponse = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error('No response from Gemini API');
    }

    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const feedbackContent = JSON.parse(jsonMatch[0]);

    console.log(`Processed reflection for program ${programType}, day ${day}`);

    return new Response(JSON.stringify(feedbackContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in process-reflection:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      feedback: "Thank you for your reflection. Continue with your development journey tomorrow!",
      nextTask: day < 14 ? {
        title: "Daily Reflection",
        task: "Take time to reflect on your progress and plan for tomorrow.",
        estimated_duration: "10 minutes",
        reflection_question: "What will you focus on tomorrow?"
      } : null,
      shouldComplete: day >= 14,
      finalFeedback: day >= 14 ? "Congratulations on completing the program!" : null,
      finalScore: day >= 14 ? 85 : null
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
