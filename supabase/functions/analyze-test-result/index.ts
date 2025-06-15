
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { answers, test_type_id } = await req.json()
    console.log('Analyzing test result for test_type_id:', test_type_id)

    let analysisResult;

    // Route to appropriate analysis function based on test type
    if (test_type_id === 'big5-test-2024-v1') {
      // Call the Big Five analysis function
      const bigFiveResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/analyze-big-five-result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`
        },
        body: JSON.stringify({ answers, test_type_id })
      });

      if (!bigFiveResponse.ok) {
        throw new Error('Failed to analyze Big Five results');
      }

      analysisResult = await bigFiveResponse.json();
    } else {
      // Handle other test types with existing logic
      analysisResult = await analyzeOtherTests(answers, test_type_id, supabaseClient);
    }

    return new Response(
      JSON.stringify(analysisResult),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error in analyze-test-result:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})

async function analyzeOtherTests(answers: any, test_type_id: string, supabaseClient: any) {
  // Get test questions to understand the scoring
  const { data: questions } = await supabaseClient
    .from('test_questions')
    .select('*')
    .eq('test_type_id', test_type_id)
    .order('question_order')

  if (!questions || questions.length === 0) {
    throw new Error('No questions found for this test')
  }

  // Calculate score based on answers
  let totalScore = 0
  let maxScore = 0

  questions.forEach((question: any, index: number) => {
    const questionNumber = (index + 1).toString()
    const answer = answers[questionNumber]
    
    if (answer !== undefined && question.scoring_weights) {
      const weights = Array.isArray(question.scoring_weights) 
        ? question.scoring_weights 
        : JSON.parse(question.scoring_weights)
      
      if (weights && weights[answer - 1] !== undefined) {
        totalScore += weights[answer - 1]
        maxScore += Math.max(...weights)
      }
    }
  })

  // Calculate percentage
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0

  // Generate interpretation based on percentage
  let interpretation = ''
  if (percentage >= 80) {
    interpretation = 'Scor foarte ridicat'
  } else if (percentage >= 60) {
    interpretation = 'Scor ridicat'
  } else if (percentage >= 40) {
    interpretation = 'Scor moderat'
  } else if (percentage >= 20) {
    interpretation = 'Scor scăzut'
  } else {
    interpretation = 'Scor foarte scăzut'
  }

  return {
    overall: percentage,
    raw_score: totalScore,
    max_score: maxScore,
    interpretation: interpretation,
    dimensions: {
      general_score: percentage
    }
  }
}
