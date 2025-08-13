import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cvText, jobDescriptionText, analysisResult } = await req.json();

    if (!cvText || !jobDescriptionText) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: cvText and jobDescriptionText' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const systemPrompt = `You are an expert CV optimization specialist. Your task is to completely rewrite and optimize a CV to perfectly match a specific job description while maintaining the candidate's authentic experience and qualifications.

INSTRUCTIONS:
1. Analyze the original CV and job description thoroughly
2. Restructure and rewrite the CV to maximize relevance for the target position
3. Use keywords from the job description naturally throughout the CV
4. Optimize section order and content emphasis based on job requirements
5. Enhance descriptions of relevant experience and skills
6. Ensure ATS (Applicant Tracking System) compatibility
7. Maintain professional formatting and readability
8. Keep all information truthful - do not fabricate experience

RESPONSE FORMAT:
Return ONLY the optimized CV text in a clean, professional format suitable for copying and pasting. Do not include any explanations, metadata, or additional commentary.

ORIGINAL CV:
${cvText}

JOB DESCRIPTION:
${jobDescriptionText}

${analysisResult ? `ANALYSIS INSIGHTS:
- Match Score: ${analysisResult.matchScore}%
- Missing Keywords: ${analysisResult.keywordAnalysis?.missing?.join(', ') || 'None'}
- Key Areas for Improvement: ${analysisResult.sectionFeedback?.map(f => f.section).join(', ') || 'General optimization'}` : ''}

Generate the optimized CV:`;

    console.log('Calling Gemini API for CV rewrite...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemPrompt }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid response structure from Gemini API:', JSON.stringify(data));
      throw new Error('Invalid response from AI service');
    }

    const optimizedCV = data.candidates[0].content.parts[0].text;

    return new Response(
      JSON.stringify({ optimizedCV }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in rewrite-cv function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to optimize CV. Please try again.' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});