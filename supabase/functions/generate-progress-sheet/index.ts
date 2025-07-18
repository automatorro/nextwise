
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
    const { question } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const systemPrompt = `You are an expert career coach and analyst. Based on the user's question or goal, create a comprehensive progress sheet.

    User's question/goal: "${question}"
    
    Analyze this and provide:
    1. Extract the main objective
    2. Provide detailed analysis of the situation
    3. Give specific recommendations
    4. List concrete next steps
    
    Respond with a JSON object with this exact structure:
    {
      "objective": "Clear, concise statement of the main objective",
      "analysis": "Detailed analysis of the current situation, challenges, and opportunities (2-3 paragraphs)",
      "recommendations": [
        "Specific recommendation 1",
        "Specific recommendation 2",
        "Specific recommendation 3"
      ],
      "nextSteps": [
        "Concrete action step 1",
        "Concrete action step 2", 
        "Concrete action step 3",
        "Concrete action step 4"
      ]
    }
    
    Make sure all recommendations and steps are practical, actionable, and relevant to the user's career development.`;

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

    const sheetContent = JSON.parse(jsonMatch[0]);

    console.log(`Generated progress sheet for question: ${question.substring(0, 50)}...`);

    return new Response(JSON.stringify(sheetContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-progress-sheet:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      objective: "Career Development Goal",
      analysis: "Based on your question, it's important to take a strategic approach to your career development. Consider your current skills, desired outcomes, and the steps needed to bridge any gaps.",
      recommendations: [
        "Assess your current skills and identify areas for improvement",
        "Network with professionals in your target field",
        "Create a timeline with specific milestones"
      ],
      nextSteps: [
        "Write down your specific career goal",
        "Research the requirements for your target role",
        "Identify 3 key skills to develop",
        "Set up informational interviews with industry professionals"
      ]
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
