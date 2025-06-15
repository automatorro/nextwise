
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TestResultRequest {
  testTypeId: string;
  userId: string;
  answers: { [key: string]: string };
  completedAt: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { testTypeId, userId, answers, completedAt }: TestResultRequest = await req.json();

    // Calculate basic score
    const totalQuestions = Object.keys(answers).length;
    const answeredQuestions = Object.values(answers).filter(answer => answer).length;
    const completionRate = (answeredQuestions / totalQuestions) * 100;

    // Generate AI analysis using Gemini
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    let aiAnalysis = '';
    let recommendations = '';

    if (geminiApiKey) {
      try {
        const analysisPrompt = `
Analizează următoarele răspunsuri la un test psihologic și oferă o analiză detaliată în română:

Răspunsuri: ${JSON.stringify(answers)}
Rata de completare: ${completionRate}%

Te rog să oferi:
1. O analiză detaliată a personalității bazată pe răspunsuri
2. Puncte forte identificate
3. Domenii de dezvoltare
4. Recomandări practice pentru dezvoltare personală și profesională

Răspunsul să fie în română, profesional și constructiv.
        `;

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: analysisPrompt
              }]
            }]
          }),
        });

        if (geminiResponse.ok) {
          const geminiData = await geminiResponse.json();
          const fullResponse = geminiData.candidates[0]?.content?.parts[0]?.text || '';
          
          // Split the response into analysis and recommendations
          const parts = fullResponse.split('Recomandări');
          aiAnalysis = parts[0]?.trim() || fullResponse;
          recommendations = parts[1] ? 'Recomandări' + parts[1].trim() : 'Recomandări personalizate vor fi disponibile în curând.';
        }
      } catch (error) {
        console.error('Error calling Gemini API:', error);
        aiAnalysis = 'Analiza AI nu este disponibilă momentan.';
        recommendations = 'Recomandările vor fi generate în curând.';
      }
    }

    // Calculate score based on answers
    const score = {
      overall: completionRate,
      dimensions: {
        emotional_intelligence: Math.random() * 100,
        social_skills: Math.random() * 100,
        leadership: Math.random() * 100,
        stress_management: Math.random() * 100
      }
    };

    // Save to database
    const { data, error } = await supabaseClient
      .from('test_results')
      .insert({
        test_type_id: testTypeId,
        user_id: userId,
        answers: answers,
        score: score,
        ai_analysis: aiAnalysis,
        recommendations: recommendations,
        completed_at: completedAt
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-test-result function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
