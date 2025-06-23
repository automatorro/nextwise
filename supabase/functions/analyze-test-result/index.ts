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
        const errorText = await bigFiveResponse.text();
        console.error('Big Five analysis failed:', errorText);
        throw new Error(`Failed to analyze Big Five results: ${errorText}`);
      }

      analysisResult = await bigFiveResponse.json();
    } else if (test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480') {
      // Big Five test with specific ID
      analysisResult = await analyzeBigFiveTest(answers, test_type_id, supabaseClient);
    } else if (test_type_id === 'a1b2c3d4-e5f6-7890-abcd-ef1234567890') {
      // DISC test
      analysisResult = await analyzeDISCTest(answers, test_type_id, supabaseClient);
    } else {
      // Handle other test types with existing logic
      analysisResult = await analyzeOtherTests(answers, test_type_id, supabaseClient);
    }

    // Generate AI interpretation using Gemini if available
    if (Deno.env.get('GEMINI_API_KEY')) {
      try {
        const aiInterpretation = await generateAIInterpretation(analysisResult, test_type_id, supabaseClient);
        analysisResult.ai_interpretation = aiInterpretation;
      } catch (error) {
        console.error('Failed to generate AI interpretation:', error);
        // Continue without AI interpretation if it fails
      }
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

async function generateAIInterpretation(analysisResult: any, testTypeId: string, supabaseClient: any) {
  const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
  if (!geminiApiKey) {
    throw new Error('Gemini API key not configured');
  }

  // Get test type information
  const { data: testType } = await supabaseClient
    .from('test_types')
    .select('name, description')
    .eq('id', testTypeId)
    .single();

  const testName = testType?.name || 'Test Psihologic';
  
  let prompt = `Analizează următoarele rezultate pentru testul "${testName}" și oferă o interpretare personalizată, detaliată și constructivă în română:

Rezultate: ${JSON.stringify(analysisResult, null, 2)}

Te rog să oferi:
1. O interpretare clară și accesibilă a rezultatelor
2. Puncte forte identificate
3. Domenii de dezvoltare
4. Recomandări practice și specifice
5. Sfaturi pentru dezvoltare personală sau profesională

Răspunsul să fie structurat, empatic și constructiv, de aproximativ 300-400 de cuvinte.`;

  // Customize prompt based on test type
  if (testName.toLowerCase().includes('big five') || testName.toLowerCase().includes('personalitate')) {
    prompt += '\n\nConcentrează-te pe trăsăturile de personalitate și cum influențează acestea comportamentul și relațiile interpersonale.';
  } else if (testName.toLowerCase().includes('gad') || testName.toLowerCase().includes('anxietate')) {
    prompt += '\n\nOferi sfaturi constructive pentru gestionarea anxietății și căutarea suportului professional când este necesar.';
  } else if (testName.toLowerCase().includes('inteligență emoțională')) {
    prompt += '\n\nConcentrează-te pe abilități emoționale și modalități de îmbunătățire a acestora în viața personală și profesională.';
  } else if (testName.toLowerCase().includes('disc')) {
    prompt += '\n\nConcentrează-te pe stilurile de comportament DISC și cum acestea influențează comunicarea, leadership-ul și colaborarea în echipă.';
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0]?.content?.parts[0]?.text || 'Nu s-a putut genera interpretarea AI.';
}

async function analyzeDISCTest(answers: any, test_type_id: string, supabaseClient: any) {
  // Get test questions to understand the dimensions
  const { data: questions } = await supabaseClient
    .from('test_questions')
    .select('*')
    .eq('test_type_id', test_type_id)
    .order('question_order')

  if (!questions || questions.length === 0) {
    throw new Error('No questions found for this test')
  }

  // DISC dimensions scoring
  const dimensions = {
    D: { total: 0, count: 0 }, // Dominance
    I: { total: 0, count: 0 }, // Influence
    S: { total: 0, count: 0 }, // Steadiness
    C: { total: 0, count: 0 }  // Conformity
  }

  // Process each answer
  questions.forEach((question: any) => {
    const questionId = question.id
    const answer = answers[questionId]
    
    if (answer !== undefined && question.options) {
      const options = Array.isArray(question.options) ? question.options : JSON.parse(question.options)
      
      // Find the selected option and its dimension
      const selectedOption = options.find((opt: any) => opt.value === answer)
      if (selectedOption && selectedOption.dimension) {
        const dimension = selectedOption.dimension as keyof typeof dimensions
        if (dimensions[dimension]) {
          dimensions[dimension].total += 1
          dimensions[dimension].count += 1
        }
      }
    }
  })

  // Calculate percentages for each dimension
  const totalAnswers = Object.values(dimensions).reduce((sum, dim) => sum + dim.total, 0)
  const results = Object.entries(dimensions).reduce((acc, [key, value]) => {
    const percentage = totalAnswers > 0 ? Math.round((value.total / totalAnswers) * 100) : 0
    acc[key] = percentage
    return acc
  }, {} as { [key: string]: number })

  // Determine dominant style
  const dominantStyle = Object.entries(results).reduce((max, [key, value]) => 
    value > max.value ? { key, value } : max, 
    { key: 'D', value: 0 }
  )

  // Calculate overall adaptability score
  const overall = Math.round(Object.values(results).reduce((sum, val) => sum + val, 0) / 4)

  return {
    overall,
    dimensions: results,
    dominant_style: dominantStyle.key,
    interpretation: generateDISCInterpretation(results, dominantStyle.key),
    style_description: getDISCStyleDescription(dominantStyle.key)
  }
}

function generateDISCInterpretation(results: { [key: string]: number }, dominantStyle: string) {
  const styleNames = {
    D: 'Dominanță',
    I: 'Influență', 
    S: 'Stabilitate',
    C: 'Conformitate'
  }

  const interpretations = []
  
  // Primary style
  interpretations.push(`Stilul tău dominant este ${styleNames[dominantStyle as keyof typeof styleNames]} (${results[dominantStyle]}%)`)
  
  // Secondary styles
  const sortedStyles = Object.entries(results)
    .filter(([key]) => key !== dominantStyle)
    .sort(([,a], [,b]) => b - a)
  
  if (sortedStyles.length > 0 && sortedStyles[0][1] > 20) {
    interpretations.push(`cu elemente puternice de ${styleNames[sortedStyles[0][0] as keyof typeof styleNames]} (${sortedStyles[0][1]}%)`)
  }
  
  return interpretations.join(' ')
}

function getDISCStyleDescription(style: string) {
  const descriptions = {
    D: 'Persoane orientate spre rezultate, competitive și hotărâte. Îți place să conduci și să iei decizii rapide.',
    I: 'Persoane sociabile, optimiste și expresive. Îți place să colaborezi și să motivezi pe alții.',
    S: 'Persoane calme, perseverente și diplomatice. Îți place stabilitatea și lucrul în echipă.',
    C: 'Persoane analitice, precise și sistematice. Îți place să urmezi procedurile și să menții standardele înalte.'
  }
  
  return descriptions[style as keyof typeof descriptions] || 'Stil echilibrat de comportament.'
}

async function analyzeBigFiveTest(answers: any, test_type_id: string, supabaseClient: any) {
  // Get test questions to understand the scoring
  const { data: questions } = await supabaseClient
    .from('test_questions')
    .select('*')
    .eq('test_type_id', test_type_id)
    .order('question_order')

  if (!questions || questions.length === 0) {
    throw new Error('No questions found for this test')
  }

  // Big Five dimensions mapping (based on standard Big Five questionnaire)
  const dimensions = {
    openness: { total: 0, count: 0 },
    conscientiousness: { total: 0, count: 0 },
    extraversion: { total: 0, count: 0 },
    agreeableness: { total: 0, count: 0 },
    neuroticism: { total: 0, count: 0 }
  }

  // Map questions to dimensions (typical Big Five structure)
  const dimensionMapping = [
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness',
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness',
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness',
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness',
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness',
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness',
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness',
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness',
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness',
    'extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness'
  ]

  questions.forEach((question: any, index: number) => {
    const questionId = question.id
    const answer = answers[questionId]
    
    if (answer !== undefined && dimensionMapping[index]) {
      const dimension = dimensionMapping[index] as keyof typeof dimensions
      dimensions[dimension].total += answer
      dimensions[dimension].count += 1
    }
  })

  // Calculate percentages for each dimension
  const results = Object.entries(dimensions).reduce((acc, [key, value]) => {
    const percentage = value.count > 0 ? Math.round((value.total / (value.count * 5)) * 100) : 0
    acc[key] = Math.min(100, Math.max(0, percentage))
    return acc
  }, {} as { [key: string]: number })

  // Calculate overall score
  const overall = Math.round(Object.values(results).reduce((sum, val) => sum + val, 0) / 5)

  return {
    overall,
    dimensions: results,
    interpretation: generateBigFiveInterpretation(results)
  }
}

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

  // Get test type information
  const { data: testType } = await supabaseClient
    .from('test_types')
    .select('name')
    .eq('id', test_type_id)
    .single()

  // Special handling for specific tests
  if (testType?.name?.toLowerCase().includes('gad-7')) {
    return analyzeGAD7Test(answers, questions)
  }

  if (testType?.name?.toLowerCase().includes('inteligență emoțională')) {
    return analyzeEmotionalIntelligenceTest(answers, questions)
  }

  // Default analysis for other tests
  return analyzeGenericTest(answers, questions)
}

function analyzeGAD7Test(answers: any, questions: any[]) {
  let totalScore = 0
  
  questions.forEach((question: any) => {
    const answer = answers[question.id]
    if (answer !== undefined) {
      // GAD-7 scoring: 0=Not at all, 1=Several days, 2=More than half the days, 3=Nearly every day
      totalScore += (answer - 1) // Convert from 1-4 to 0-3 scale
    }
  })

  let severity = ''
  let interpretation = ''
  
  if (totalScore <= 4) {
    severity = 'Minimal'
    interpretation = 'Anxietate minimă - în limite normale'
  } else if (totalScore <= 9) {
    severity = 'Ușoară'
    interpretation = 'Anxietate ușoară - poate necesita monitorizare'
  } else if (totalScore <= 14) {
    severity = 'Moderată'
    interpretation = 'Anxietate moderată - se recomandă consultarea unui specialist'
  } else {
    severity = 'Severă'
    interpretation = 'Anxietate severă - este recomandată urgent consultarea unui specialist'
  }

  const percentage = Math.round((totalScore / 21) * 100) // GAD-7 max score is 21

  return {
    overall: percentage,
    raw_score: totalScore,
    max_score: 21,
    severity,
    interpretation,
    dimensions: {
      anxiety_level: percentage
    }
  }
}

function analyzeEmotionalIntelligenceTest(answers: any, questions: any[]) {
  let totalScore = 0
  let maxScore = 0

  questions.forEach((question: any) => {
    const answer = answers[question.id]
    if (answer !== undefined) {
      totalScore += answer
      maxScore += 5 // Assuming 5-point Likert scale
    }
  })

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0

  let interpretation = ''
  if (percentage >= 80) {
    interpretation = 'Inteligență emoțională foarte ridicată - excelentă capacitate de a înțelege și gestiona emoțiile'
  } else if (percentage >= 65) {
    interpretation = 'Inteligență emoțională ridicată - bună capacitate de management emoțional'
  } else if (percentage >= 50) {
    interpretation = 'Inteligență emoțională moderată - există potențial de îmbunătățire'
  } else if (percentage >= 35) {
    interpretation = 'Inteligență emoțională scăzută - se recomandă dezvoltarea abilităților emoționale'
  } else {
    interpretation = 'Inteligență emoțională foarte scăzută - necesită atenție și dezvoltare urgentă'
  }

  return {
    overall: percentage,
    raw_score: totalScore,
    max_score: maxScore,
    interpretation,
    dimensions: {
      emotional_intelligence: percentage
    }
  }
}

function analyzeGenericTest(answers: any, questions: any[]) {
  let totalScore = 0
  let maxScore = 0

  questions.forEach((question: any) => {
    const answer = answers[question.id]
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

function generateBigFiveInterpretation(results: { [key: string]: number }) {
  const interpretations = []
  
  if (results.openness >= 70) interpretations.push('foarte deschis la experiențe noi')
  else if (results.openness >= 30) interpretations.push('moderat deschis la experiențe noi')
  else interpretations.push('preferi rutina și stabilitatea')
  
  if (results.conscientiousness >= 70) interpretations.push('foarte disciplinat și organizat')
  else if (results.conscientiousness >= 30) interpretations.push('moderat organizat')
  else interpretations.push('mai spontan și flexibil')
  
  if (results.extraversion >= 70) interpretations.push('foarte sociabil și energic')
  else if (results.extraversion >= 30) interpretations.push('echilibrat între introverție și extraverție')
  else interpretations.push('preferi activitățile calme și solitudinea')
  
  if (results.agreeableness >= 70) interpretations.push('foarte cooperant și empatic')
  else if (results.agreeableness >= 30) interpretations.push('echilibrat în relațiile sociale')
  else interpretations.push('mai competitiv și direct')
  
  if (results.neuroticism >= 70) interpretations.push('tendință spre anxietate și stres')
  else if (results.neuroticism >= 30) interpretations.push('stabilitate emoțională moderată')
  else interpretations.push('foarte stabil emoțional și calm')
  
  return `Personalitatea ta se caracterizează prin: ${interpretations.join(', ')}.`
}
