
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
    const { programType, day } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Define program-specific prompts
    const programPrompts = {
      'motivation_reset': `Generate a practical daily task for day ${day} of a 14-day motivation reset program. Focus on building confidence, setting clear goals, and developing positive habits.`,
      'leadership_transition': `Generate a practical daily task for day ${day} of a 14-day leadership transition program. Focus on leadership skills, team management, and decision-making.`,
      'interview_training': `Generate a practical daily task for day ${day} of a 14-day interview training program. Focus on interview preparation, communication skills, and confidence building.`,
      'career_clarity': `Generate a practical daily task for day ${day} of a 14-day career clarity program. Focus on self-discovery, career exploration, and goal setting.`
    };

    const systemPrompt = programPrompts[programType as keyof typeof programPrompts] || 
      `Generate a practical daily task for day ${day} of a 14-day professional development program.`;

    const fullPrompt = `${systemPrompt}

    Create a specific and actionable task for day ${day}. The task should:
    - Be completable in 15-30 minutes
    - Be practical and applicable to real work situations
    - Include clear instructions and expected outcomes
    - Build on previous days' learning
    - Be engaging and motivating

    Respond with a JSON object with this exact structure:
    {
      "title": "Task title",
      "task": "Detailed task description with clear instructions",
      "estimated_duration": "15-20 minutes",
      "reflection_question": "Question for end-of-day reflection"
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

    // Clean the response to extract only JSON
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const taskContent = JSON.parse(jsonMatch[0]);

    console.log(`Generated daily task for program ${programType}, day ${day}`);

    return new Response(JSON.stringify(taskContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-daily-task:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      title: "Daily Task",
      task: "Take 15 minutes to reflect on your professional goals and write down three specific actions you can take this week to move closer to achieving them.",
      estimated_duration: "15 minutes",
      reflection_question: "What did you learn about yourself today, and how will you apply this insight?"
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
