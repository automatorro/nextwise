
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

    const fullPrompt = `You are an expert career counselor and coach. Analyze the user's career question/situation and provide a comprehensive progress sheet.

    User's question/situation: "${question}"

    Provide a comprehensive response as a JSON object with this exact structure:
    {
      "objective": "The main career objective or challenge identified",
      "analysis": "Detailed analysis of the situation, challenges, and opportunities",
      "recommendations": [
        {
          "title": "Recommendation title",
          "description": "Detailed description",
          "priority": "high",
          "timeframe": "short-term"
        }
      ],
      "nextSteps": [
        "Specific action step 1",
        "Specific action step 2",
        "Specific action step 3"
      ]
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

    const sheetContent = JSON.parse(jsonMatch[0]);

    console.log('Generated progress sheet successfully');

    return new Response(JSON.stringify(sheetContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-progress-sheet:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      objective: "Career Development",
      analysis: "Based on your question, there are opportunities for growth and development in your career path.",
      recommendations: [
        {
          title: "Self-Assessment",
          description: "Take time to evaluate your current skills and identify areas for improvement.",
          priority: "high",
          timeframe: "short-term"
        }
      ],
      nextSteps: [
        "Reflect on your career goals",
        "Identify key skill gaps",
        "Create an action plan"
      ]
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
