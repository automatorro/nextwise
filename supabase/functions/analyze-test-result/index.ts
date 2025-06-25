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

    // Check test type for specific scoring
    const isCattell16PF = testType.name.includes('16PF') || testType.name.includes('Cattell');
    const isBeckDepression = testType.name.includes('Beck') || testType.name.includes('Depression') || testType.name.includes('BDI');

    if (isCattell16PF) {
      console.log('Running Cattell 16PF analysis');
      return await analyzeCattell16PF(answers, questions);
    } else if (isBeckDepression) {
      console.log('Running Beck Depression Inventory analysis');
      return await analyzeBeckDepressionInventory(answers);
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

async function analyzeBeckDepressionInventory(answers: { [key: string]: number }) {
  console.log('Calculating Beck Depression Inventory scores...');
  
  let totalScore = 0;
  const maxPossibleScore = Object.keys(answers).length * 3;
  
  // Calculate total raw score
  Object.values(answers).forEach(value => {
    totalScore += value;
  });
  
  // Determine severity level based on BDI-II scoring guidelines
  let severityLevel = '';
  let interpretation = '';
  
  if (totalScore <= 13) {
    severityLevel = 'Minimal';
    interpretation = 'Simptome minime de depresie. Nivelul tău de tristețe este în intervalul normal.';
  } else if (totalScore <= 19) {
    severityLevel = 'Ușoară';
    interpretation = 'Depresie ușoară. Poți experimenta unele simptome de depresie care ar putea beneficia de atenție.';
  } else if (totalScore <= 28) {
    severityLevel = 'Moderată';
    interpretation = 'Depresie moderată. Simptomele tale sugerează prezența unei depresii moderate care ar trebui să fie evaluată de un profesionist.';
  } else {
    severityLevel = 'Severă';
    interpretation = 'Depresie severă. Simptomele tale indică o depresie severă. Este recomandat să cauți ajutor profesional imediat.';
  }
  
  // Calculate dimensions based on BDI-II factor structure
  const dimensions = {
    'Afectiv': 0,
    'Cognitiv': 0,
    'Somatic': 0,
    'Suicidalitate': 0
  };
  
  // Get ordered question values
  const orderedAnswers = Object.keys(answers)
    .sort((a, b) => {
      const orderA = parseInt(a.split('-').pop() || '0');
      const orderB = parseInt(b.split('-').pop() || '0');
      return orderA - orderB;
    })
    .map(key => answers[key]);
  
  // Group questions by dimension
  const affectiveQuestions = [0, 1, 4, 5, 6, 8, 9]; // indices: sadness, pessimism, guilt, punishment, self-dislike, suicidal thoughts, crying
  const cognitiveQuestions = [2, 7, 12, 13]; // indices: past failure, self-criticism, indecisiveness, worthlessness
  const somaticQuestions = [3, 10, 11, 14, 15, 16, 17, 18, 19, 20]; // anhedonia, agitation, interest loss, energy loss, sleep, irritability, appetite, concentration, fatigue, sexual interest
  const suicidalQuestions = [8]; // suicidal ideation
  
  // Calculate dimension scores
  affectiveQuestions.forEach(index => {
    if (orderedAnswers[index] !== undefined) dimensions['Afectiv'] += orderedAnswers[index];
  });
  
  cognitiveQuestions.forEach(index => {
    if (orderedAnswers[index] !== undefined) dimensions['Cognitiv'] += orderedAnswers[index];
  });
  
  somaticQuestions.forEach(index => {
    if (orderedAnswers[index] !== undefined) dimensions['Somatic'] += orderedAnswers[index];
  });
  
  suicidalQuestions.forEach(index => {
    if (orderedAnswers[index] !== undefined) dimensions['Suicidalitate'] += orderedAnswers[index];
  });
  
  // Convert to percentages
  const dimensionPercentages: { [key: string]: number } = {};
  dimensionPercentages['Afectiv'] = Math.round((dimensions['Afectiv'] / (affectiveQuestions.length * 3)) * 100);
  dimensionPercentages['Cognitiv'] = Math.round((dimensions['Cognitiv'] / (cognitiveQuestions.length * 3)) * 100);
  dimensionPercentages['Somatic'] = Math.round((dimensions['Somatic'] / (somaticQuestions.length * 3)) * 100);
  dimensionPercentages['Suicidalitate'] = Math.round((dimensions['Suicidalitate'] / (suicidalQuestions.length * 3)) * 100);
  
  const overallPercentage = Math.round((totalScore / maxPossibleScore) * 100);

  console.log('Beck Depression Inventory calculated scores:', {
    totalScore,
    maxPossibleScore,
    overallPercentage,
    severityLevel,
    dimensions: dimensionPercentages
  });

  const result = {
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: maxPossibleScore,
    interpretation: interpretation,
    dimensions: dimensionPercentages,
    severity_level: severityLevel
  };

  return new Response(JSON.stringify(result), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

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
