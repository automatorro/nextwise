import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, userId } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const systemPrompt = `You are an expert career counselor and coach. Analyze the user's question or situation and provide a comprehensive progress sheet with:
    - Clear objective extraction
    - Detailed analysis of the situation
    - Actionable recommendations
    - Specific next steps
    - Timeline and milestones`;

    const userPrompt = `Analyze this career development question/situation:

    "${question}"

    Provide a comprehensive response as a JSON object with:
    {
      "extracted_objective": "The main career goal or challenge identified",
      "ai_analysis": "Detailed analysis of the situation, challenges, and opportunities",
      "recommendations": [
        {
          "title": "Recommendation title",
          "description": "Detailed description",
          "priority": "high/medium/low",
          "timeframe": "immediate/short-term/long-term"
        }
      ],
      "next_steps": [
        {
          "step": "Action step description",
          "timeline": "When to complete",
          "resources": ["Required resources"],
          "success_metrics": "How to measure success"
        }
      ]
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const sheetContent = JSON.parse(data.choices[0].message.content);

    console.log(`Generated progress sheet for user ${userId}`);

    return new Response(JSON.stringify(sheetContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-progress-sheet:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});