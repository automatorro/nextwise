
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TestSubmissionData {
  test_type_id: string;
  answers: { [key: string]: number };
}

// 16PF Factor definitions
const CATTELL_16PF_FACTORS = {
  A: { name: 'Warmth', lowDescription: 'Reserved, Formal', highDescription: 'Warm, Outgoing' },
  B: { name: 'Reasoning', lowDescription: 'Concrete Thinking', highDescription: 'Abstract Thinking' },
  C: { name: 'Emotional Stability', lowDescription: 'Reactive, Easily Upset', highDescription: 'Emotionally Stable, Calm' },
  E: { name: 'Dominance', lowDescription: 'Deferential, Humble', highDescription: 'Dominant, Assertive' },
  F: { name: 'Liveliness', lowDescription: 'Serious, Restrained', highDescription: 'Lively, Spontaneous' },
  G: { name: 'Rule-Consciousness', lowDescription: 'Expedient, Nonconforming', highDescription: 'Rule-conscious, Dutiful' },
  H: { name: 'Social Boldness', lowDescription: 'Shy, Threat-sensitive', highDescription: 'Socially Bold, Venturesome' },
  I: { name: 'Sensitivity', lowDescription: 'Utilitarian, Objective', highDescription: 'Sensitive, Aesthetic' },
  L: { name: 'Vigilance', lowDescription: 'Trusting, Unsuspecting', highDescription: 'Vigilant, Suspicious' },
  M: { name: 'Abstractedness', lowDescription: 'Grounded, Practical', highDescription: 'Abstracted, Imaginative' },
  N: { name: 'Privateness', lowDescription: 'Forthright, Genuine', highDescription: 'Private, Discreet' },
  O: { name: 'Apprehension', lowDescription: 'Self-assured, Unworried', highDescription: 'Apprehensive, Worried' },
  Q1: { name: 'Openness to Change', lowDescription: 'Traditional, Attached to familiar', highDescription: 'Open to change, Experimenting' },
  Q2: { name: 'Self-Reliance', lowDescription: 'Group-oriented, Affiliative', highDescription: 'Self-reliant, Solitary' },
  Q3: { name: 'Perfectionism', lowDescription: 'Tolerates disorder, Unexacting', highDescription: 'Perfectionistic, Organized' },
  Q4: { name: 'Tension', lowDescription: 'Relaxed, Placid', highDescription: 'Tense, Impatient' }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { test_type_id, answers }: TestSubmissionData = await req.json();
    
    console.log('Analyzing test results for test type:', test_type_id);

    // Get test type information
    const { data: testType, error: testTypeError } = await supabaseClient
      .from('test_types')
      .select('name')
      .eq('id', test_type_id)
      .single();

    if (testTypeError) {
      console.error('Error fetching test type:', testTypeError);
      throw testTypeError;
    }

    console.log('Test type found:', testType?.name);

    // Get questions with scoring weights
    const { data: questions, error: questionsError } = await supabaseClient
      .from('test_questions')
      .select('id, scoring_weights')
      .eq('test_type_id', test_type_id);

    if (questionsError) {
      console.error('Error fetching questions:', questionsError);
      throw questionsError;
    }

    console.log('Found questions:', questions?.length);

    // Check if this is a Cattell 16PF test
    const isCattell16PF = testType.name.includes('16PF') || testType.name.includes('Cattell');

    if (isCattell16PF) {
      console.log('Running Cattell 16PF analysis');
      return await analyzeCattell16PF(answers, questions);
    } else {
      console.log('Running generic test analysis for:', test_type_id);
      return await analyzeGenericTest(answers, questions, testType.name);
    }

  } catch (error) {
    console.error('Error in analyze-test-result:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

async function analyzeCattell16PF(answers: { [key: string]: number }, questions: any[]) {
  console.log('Calculating 16PF factor scores...');
  
  // Calculate scores for each of the 16 factors
  const factorScores: { [key: string]: number } = {};
  const factorCounts: { [key: string]: number } = {};
  
  // Initialize all factors
  Object.keys(CATTELL_16PF_FACTORS).forEach(factor => {
    factorScores[factor] = 0;
    factorCounts[factor] = 0;
  });

  // Calculate raw scores for each factor
  questions.forEach(question => {
    const userAnswer = answers[question.id];
    const weights = question.scoring_weights || {};
    
    if (userAnswer !== undefined) {
      Object.keys(weights).forEach(factor => {
        if (CATTELL_16PF_FACTORS[factor]) {
          const weight = weights[factor];
          const score = weight > 0 ? userAnswer : (6 - userAnswer); // Reverse scoring for negative weights
          factorScores[factor] += score;
          factorCounts[factor]++;
        }
      });
    }
  });

  console.log('Factor counts:', factorCounts);
  console.log('Raw factor scores:', factorScores);

  // Convert to percentile scores (1-10 scale, typical for 16PF)
  const dimensions: { [key: string]: number } = {};
  Object.keys(CATTELL_16PF_FACTORS).forEach(factor => {
    if (factorCounts[factor] > 0) {
      const rawScore = factorScores[factor] / factorCounts[factor];
      // Convert 1-5 scale to 1-10 scale (16PF standard)
      dimensions[factor] = Math.round((rawScore - 1) * 2.25 + 1);
      dimensions[factor] = Math.max(1, Math.min(10, dimensions[factor]));
    } else {
      dimensions[factor] = 5; // Default middle score
    }
  });

  // Calculate overall score
  const overallScore = Math.round(Object.values(dimensions).reduce((a, b) => a + b, 0) / 16);

  console.log('Final 16PF factor scores:', dimensions);

  const result = {
    overall: overallScore,
    raw_score: Object.values(factorScores).reduce((a, b) => a + b, 0),
    max_score: Object.values(factorCounts).reduce((a, b) => a + b, 0) * 5,
    interpretation: generateCattell16PFInterpretation(dimensions),
    dimensions: dimensions,
    detailed_interpretations: generateDetailedCattell16PFInterpretations(dimensions)
  };

  return new Response(JSON.stringify(result), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

function generateCattell16PFInterpretation(dimensions: { [key: string]: number }): string {
  const interpretations: string[] = [];
  
  Object.entries(dimensions).forEach(([factor, score]) => {
    const factorInfo = CATTELL_16PF_FACTORS[factor];
    if (factorInfo) {
      if (score >= 8) {
        interpretations.push(`${factorInfo.name}: ${factorInfo.highDescription} (scor: ${score})`);
      } else if (score <= 3) {
        interpretations.push(`${factorInfo.name}: ${factorInfo.lowDescription} (scor: ${score})`);
      }
    }
  });

  if (interpretations.length === 0) {
    return "Profilul tău de personalitate prezintă un echilibru în majoritatea dimensiunilor 16PF, indicând o personalitate versatilă și adaptabilă.";
  }

  return `Caracteristicile tale dominante: ${interpretations.join('; ')}.`;
}

function generateDetailedCattell16PFInterpretations(dimensions: { [key: string]: number }): { [key: string]: string } {
  const detailed: { [key: string]: string } = {};
  
  Object.entries(dimensions).forEach(([factor, score]) => {
    const factorInfo = CATTELL_16PF_FACTORS[factor];
    if (factorInfo) {
      if (score >= 8) {
        detailed[factor] = `Scor ridicat la ${factorInfo.name} (${score}/10): ${factorInfo.highDescription}. Acest factor puternic influențează modul în care interacționezi cu lumea și iei decizii.`;
      } else if (score <= 3) {
        detailed[factor] = `Scor scăzut la ${factorInfo.name} (${score}/10): ${factorInfo.lowDescription}. Această caracteristică definește un aspect important al personalității tale.`;
      } else {
        detailed[factor] = `Scor moderat la ${factorInfo.name} (${score}/10): Echilibru între ${factorInfo.lowDescription.toLowerCase()} și ${factorInfo.highDescription.toLowerCase()}.`;
      }
    }
  });
  
  return detailed;
}

async function analyzeGenericTest(answers: { [key: string]: number }, questions: any[], testName: string) {
  console.log('Calculating generic test scores...');
  
  // Calculate basic scoring
  let totalScore = 0;
  let maxScore = 0;
  const dimensionScores: { [key: string]: number } = {};
  const dimensionCounts: { [key: string]: number } = {};

  questions.forEach(question => {
    const userAnswer = answers[question.id];
    const weights = question.scoring_weights || {};
    
    if (userAnswer !== undefined) {
      totalScore += userAnswer;
      maxScore += 5;
      
      // Handle dimension scoring if weights are provided
      Object.keys(weights).forEach(dimension => {
        if (!dimensionScores[dimension]) {
          dimensionScores[dimension] = 0;
          dimensionCounts[dimension] = 0;
        }
        dimensionScores[dimension] += userAnswer * weights[dimension];
        dimensionCounts[dimension]++;
      });
    }
  });

  // Convert dimension scores to percentages
  const dimensions: { [key: string]: number } = {};
  Object.keys(dimensionScores).forEach(dim => {
    if (dimensionCounts[dim] > 0) {
      dimensions[dim] = Math.round((dimensionScores[dim] / (dimensionCounts[dim] * 5)) * 100);
    }
  });

  const overallPercentage = Math.round((totalScore / maxScore) * 100);

  const result = {
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: maxScore,
    interpretation: `Ai obținut un scor de ${overallPercentage}% la testul ${testName}. ${generateGenericInterpretation(overallPercentage)}`,
    dimensions: dimensions
  };

  return new Response(JSON.stringify(result), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

function generateGenericInterpretation(percentage: number): string {
  if (percentage >= 80) {
    return "Acest scor ridicat indică caracteristici puternic dezvoltate în domeniile evaluate.";
  } else if (percentage >= 60) {
    return "Acest scor moderat-ridicat sugerează un nivel bun de dezvoltare în aspectele măsurate.";
  } else if (percentage >= 40) {
    return "Acest scor moderat indică un echilibru în caracteristicile evaluate.";
  } else {
    return "Acest scor sugerează oportunități de dezvoltare în domeniile evaluate.";
  }
}
