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
    const { cvText, jobDescriptionText, companyName, positionTitle } = await req.json();

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

    const systemPrompt = `You are an expert cover letter writer specializing in creating compelling, personalized cover letters that effectively match candidates to specific job opportunities.

INSTRUCTIONS:
1. Write a professional, engaging cover letter that demonstrates clear alignment between the candidate's experience and the job requirements
2. Use specific examples from the CV to showcase relevant skills and achievements
3. Show genuine enthusiasm for the role and company
4. Address key requirements mentioned in the job description
5. Maintain a professional yet personable tone
6. Keep the letter concise (3-4 paragraphs) but impactful
7. Include a strong opening that grabs attention
8. End with a confident call to action

STRUCTURE:
- Opening paragraph: Hook + position interest + brief value proposition
- Middle paragraph(s): Specific examples of relevant experience and achievements
- Closing paragraph: Enthusiasm + next steps

CANDIDATE'S CV:
${cvText}

JOB DESCRIPTION:
${jobDescriptionText}

${companyName ? `COMPANY: ${companyName}` : ''}
${positionTitle ? `POSITION: ${positionTitle}` : ''}

Generate a compelling cover letter that will make this candidate stand out:`;

    console.log('Calling Gemini API for cover letter generation...');
    
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
          temperature: 0.4,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
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

    const coverLetter = data.candidates[0].content.parts[0].text;

    return new Response(
      JSON.stringify({ coverLetter }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in generate-cover-letter function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate cover letter. Please try again.' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});