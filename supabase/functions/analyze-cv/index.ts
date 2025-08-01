
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
    const { cvText, jobDescriptionText } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    if (!cvText || !jobDescriptionText) {
      throw new Error('Both cvText and jobDescriptionText are required');
    }

    const systemPrompt = `You are an expert HR consultant and CV analyst. Analyze the provided CV against the job description and provide a comprehensive analysis.

CV Content:
"${cvText}"

Job Description:
"${jobDescriptionText}"

Please analyze the CV against this job description and provide your response as a valid JSON object with this exact structure:

{
  "matchScore": <number between 0-100>,
  "keywordAnalysis": {
    "found": ["keyword1", "keyword2", "keyword3"],
    "missing": ["missing1", "missing2", "missing3"]
  },
  "sectionFeedback": [
    {
      "section": "Section Name",
      "feedback": "Detailed feedback for this section"
    }
  ],
  "rewriteSuggestions": [
    {
      "original": "Original text from CV",
      "suggestion": "Improved version of the text"
    }
  ]
}

Analysis Guidelines:
- Calculate matchScore based on keyword alignment, experience relevance, and skill match
- In keywordAnalysis.found, list 5-8 relevant keywords/skills that appear in both CV and job description
- In keywordAnalysis.missing, list 3-6 important keywords from job description missing in CV
- Provide 3-5 section feedback items covering different CV sections (summary, experience, skills, etc.)
- Suggest 2-4 concrete rewrite improvements with specific original text and better alternatives
- Focus on actionable, specific feedback that will improve hiring chances
- Be constructive and professional in tone

Respond with ONLY the JSON object, no additional text.`;

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
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} - ${errorText}`);
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
      console.error('AI Response:', aiResponse);
      throw new Error('No valid JSON found in AI response');
    }

    let analysisResult;
    try {
      analysisResult = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw AI Response:', aiResponse);
      throw new Error('Failed to parse AI response as JSON');
    }

    // Validate the response structure
    if (!analysisResult.matchScore || 
        !analysisResult.keywordAnalysis || 
        !analysisResult.sectionFeedback || 
        !analysisResult.rewriteSuggestions) {
      console.error('Invalid analysis result structure:', analysisResult);
      throw new Error('Invalid analysis result structure');
    }

    console.log(`CV analysis completed with match score: ${analysisResult.matchScore}%`);

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-cv function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to analyze CV',
      matchScore: 0,
      keywordAnalysis: {
        found: [],
        missing: []
      },
      sectionFeedback: [{
        section: "Analysis Error",
        feedback: "Unable to complete CV analysis. Please check your input and try again."
      }],
      rewriteSuggestions: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
