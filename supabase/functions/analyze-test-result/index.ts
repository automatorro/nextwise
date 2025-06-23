import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalysisRequest {
  answers: { [questionId: string]: number };
  test_type_id: string;
}

interface BigFiveDimension {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

interface DISCDimension {
  D: number;
  I: number;
  S: number;
  C: number;
}

interface EnneagramResult {
  dominant_type: number;
  scores: { [key: string]: number };
  type_descriptions: { [key: string]: string };
}

interface EmotionalIntelligenceDimension {
  self_awareness: number;
  self_regulation: number;
  social_awareness: number;
  relationship_management: number;
}

interface GAD7Result {
  total_score: number;
  severity_level: string;
  clinical_interpretation: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const { answers, test_type_id }: AnalysisRequest = await req.json();
    console.log('Analyzing test results for test type:', test_type_id);

    // Determine test type and run appropriate analysis
    if (test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480') {
      // Big Five Personality Test
      const result = await analyzeBigFive(answers, supabaseClient);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (test_type_id === 'a1b2c3d4-e5f6-7890-abcd-ef1234567890') {
      // DISC Test
      const result = await analyzeDISC(answers, supabaseClient);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (test_type_id === 'b2c3d4e5-f6g7-8901-bcde-fg2345678901') {
      // Enneagram Test
      const result = await analyzeEnneagram(answers, supabaseClient);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (test_type_id === 'c3d4e5f6-g7h8-9012-cdef-gh3456789012') {
      // Emotional Intelligence Test
      const result = await analyzeEmotionalIntelligence(answers, supabaseClient);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (test_type_id === 'd4e5f6g7-h8i9-0123-defg-hi4567890123') {
      // GAD-7 Anxiety Test
      const result = await analyzeGAD7(answers, supabaseClient);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Default analysis for other tests
      const questionsCount = Object.keys(answers).length;
      const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
      const maxPossibleScore = questionsCount * 5; // Assuming 5-point scale
      const average = totalScore / questionsCount;
      const percentage = (totalScore / maxPossibleScore) * 100;

      return new Response(JSON.stringify({
        total: totalScore,
        average: Math.round(average * 100) / 100,
        answers_count: questionsCount,
        overall: Math.round(percentage),
        raw_score: totalScore,
        max_score: maxPossibleScore,
        interpretation: getBasicInterpretation(percentage)
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in analyze-test-result:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function analyzeBigFive(answers: { [questionId: string]: number }, supabaseClient: any): Promise<any> {
  const { data: questions, error } = await supabaseClient
    .from('test_questions')
    .select('*')
    .eq('test_type_id', 'f47ac10b-58cc-4372-a567-0e02b2c3d480')
    .order('question_order');

  if (error) throw error;

  const dimensions: BigFiveDimension = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  };

  const dimensionCounts = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  };

  questions.forEach((question: any) => {
    const answer = answers[question.id];
    if (answer && question.scoring_weights) {
      const weights = question.scoring_weights;
      
      Object.entries(weights).forEach(([dimension, weight]: [string, any]) => {
        if (dimensions.hasOwnProperty(dimension)) {
          const adjustedScore = weight > 0 ? answer : (6 - answer);
          dimensions[dimension as keyof BigFiveDimension] += adjustedScore;
          dimensionCounts[dimension as keyof BigFiveDimension]++;
        }
      });
    }
  });

  // Calculate percentages
  const dimensionPercentages: BigFiveDimension = {
    openness: dimensionCounts.openness > 0 ? Math.round((dimensions.openness / (dimensionCounts.openness * 5)) * 100) : 0,
    conscientiousness: dimensionCounts.conscientiousness > 0 ? Math.round((dimensions.conscientiousness / (dimensionCounts.conscientiousness * 5)) * 100) : 0,
    extraversion: dimensionCounts.extraversion > 0 ? Math.round((dimensions.extraversion / (dimensionCounts.extraversion * 5)) * 100) : 0,
    agreeableness: dimensionCounts.agreeableness > 0 ? Math.round((dimensions.agreeableness / (dimensionCounts.agreeableness * 5)) * 100) : 0,
    neuroticism: dimensionCounts.neuroticism > 0 ? Math.round((dimensions.neuroticism / (dimensionCounts.neuroticism * 5)) * 100) : 0
  };

  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const questionsCount = Object.keys(answers).length;
  const average = totalScore / questionsCount;
  const overallPercentage = Math.round((average / 5) * 100);

  return {
    total: totalScore,
    average: Math.round(average * 100) / 100,
    answers_count: questionsCount,
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: questionsCount * 5,
    interpretation: getBigFiveInterpretation(overallPercentage),
    dimensions: dimensionPercentages,
    detailed_interpretations: getBigFiveDetailedInterpretations(dimensionPercentages)
  };
}

async function analyzeDISC(answers: { [questionId: string]: number }, supabaseClient: any): Promise<any> {
  const { data: questions, error } = await supabaseClient
    .from('test_questions')
    .select('*')
    .eq('test_type_id', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890')
    .order('question_order');

  if (error) throw error;

  const scores: DISCDimension = { D: 0, I: 0, S: 0, C: 0 };

  questions.forEach((question: any) => {
    const answer = answers[question.id];
    if (answer && question.options) {
      const selectedOption = question.options.find((opt: any) => opt.value === answer);
      if (selectedOption && selectedOption.dimension) {
        scores[selectedOption.dimension as keyof DISCDimension]++;
      }
    }
  });

  const totalAnswers = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const percentages = {
    D: Math.round((scores.D / totalAnswers) * 100),
    I: Math.round((scores.I / totalAnswers) * 100),
    S: Math.round((scores.S / totalAnswers) * 100),
    C: Math.round((scores.C / totalAnswers) * 100)
  };

  const dominantStyle = Object.entries(percentages).reduce((a, b) => 
    percentages[a[0] as keyof DISCDimension] > percentages[b[0] as keyof DISCDimension] ? a : b
  )[0];

  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const questionsCount = Object.keys(answers).length;
  const average = totalScore / questionsCount;
  const overallPercentage = Math.round((average / 4) * 100);

  return {
    total: totalScore,
    average: Math.round(average * 100) / 100,
    answers_count: questionsCount,
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: questionsCount * 4,
    interpretation: getDISCInterpretation(dominantStyle, percentages[dominantStyle as keyof DISCDimension]),
    dimensions: percentages,
    dominant_style: dominantStyle,
    detailed_interpretations: getDISCDetailedInterpretations(percentages, dominantStyle)
  };
}

async function analyzeEnneagram(answers: { [questionId: string]: number }, supabaseClient: any): Promise<any> {
  const { data: questions, error } = await supabaseClient
    .from('test_questions')
    .select('*')
    .eq('test_type_id', 'b2c3d4e5-f6g7-8901-bcde-fg2345678901')
    .order('question_order');

  if (error) throw error;

  const typeScores: { [key: number]: number } = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };

  questions.forEach((question: any) => {
    const answer = answers[question.id];
    if (answer && question.options) {
      const selectedOption = question.options.find((opt: any) => opt.value === answer);
      if (selectedOption && selectedOption.type) {
        typeScores[selectedOption.type]++;
      }
    }
  });

  const dominantType = Object.entries(typeScores).reduce((a, b) => 
    typeScores[parseInt(a[0])] > typeScores[parseInt(b[0])] ? a : b
  )[0];

  const totalAnswers = Object.values(typeScores).reduce((sum, value) => sum + value, 0);
  const percentages: { [key: string]: number } = {};
  
  Object.entries(typeScores).forEach(([type, score]) => {
    percentages[type] = Math.round((score / totalAnswers) * 100);
  });

  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const questionsCount = Object.keys(answers).length;
  const average = totalScore / questionsCount;
  const overallPercentage = Math.round((average / 9) * 100);

  return {
    total: totalScore,
    average: Math.round(average * 100) / 100,
    answers_count: questionsCount,
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: questionsCount * 9,
    interpretation: getEnneagramInterpretation(parseInt(dominantType), percentages[dominantType]),
    dimensions: percentages,
    dominant_type: parseInt(dominantType),
    detailed_interpretations: getEnneagramDetailedInterpretations(parseInt(dominantType), percentages)
  };
}

async function analyzeEmotionalIntelligence(answers: { [questionId: string]: number }, supabaseClient: any): Promise<any> {
  const { data: questions, error } = await supabaseClient
    .from('test_questions')
    .select('*')
    .eq('test_type_id', 'c3d4e5f6-g7h8-9012-cdef-gh3456789012')
    .order('question_order');

  if (error) throw error;

  const dimensions: EmotionalIntelligenceDimension = {
    self_awareness: 0,
    self_regulation: 0,
    social_awareness: 0,
    relationship_management: 0
  };

  const dimensionCounts = {
    self_awareness: 0,
    self_regulation: 0,
    social_awareness: 0,
    relationship_management: 0
  };

  questions.forEach((question: any) => {
    const answer = answers[question.id];
    if (answer && question.options) {
      // Extract dimension from the first option (they should all have the same dimension)
      const firstOption = Array.isArray(question.options) ? question.options[0] : null;
      if (firstOption && firstOption.dimension) {
        const dimension = firstOption.dimension as keyof EmotionalIntelligenceDimension;
        dimensions[dimension] += answer;
        dimensionCounts[dimension]++;
      }
    }
  });

  // Calculate percentages for each dimension
  const dimensionPercentages: EmotionalIntelligenceDimension = {
    self_awareness: dimensionCounts.self_awareness > 0 ? Math.round((dimensions.self_awareness / (dimensionCounts.self_awareness * 5)) * 100) : 0,
    self_regulation: dimensionCounts.self_regulation > 0 ? Math.round((dimensions.self_regulation / (dimensionCounts.self_regulation * 5)) * 100) : 0,
    social_awareness: dimensionCounts.social_awareness > 0 ? Math.round((dimensions.social_awareness / (dimensionCounts.social_awareness * 5)) * 100) : 0,
    relationship_management: dimensionCounts.relationship_management > 0 ? Math.round((dimensions.relationship_management / (dimensionCounts.relationship_management * 5)) * 100) : 0
  };

  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  const questionsCount = Object.keys(answers).length;
  const average = totalScore / questionsCount;
  const overallPercentage = Math.round((average / 5) * 100);

  return {
    total: totalScore,
    average: Math.round(average * 100) / 100,
    answers_count: questionsCount,
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: questionsCount * 5,
    interpretation: getEmotionalIntelligenceInterpretation(overallPercentage),
    dimensions: dimensionPercentages,
    detailed_interpretations: getEmotionalIntelligenceDetailedInterpretations(dimensionPercentages)
  };
}

async function analyzeGAD7(answers: { [questionId: string]: number }, supabaseClient: any): Promise<any> {
  // Calculate total GAD-7 score (0-21 scale)
  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  
  // Determine severity level based on GAD-7 scoring
  let severityLevel = '';
  let clinicalInterpretation = '';
  
  if (totalScore >= 0 && totalScore <= 4) {
    severityLevel = 'Minimă';
    clinicalInterpretation = 'Nivel minimal de anxietate. Simptomele sunt rare sau absente.';
  } else if (totalScore >= 5 && totalScore <= 9) {
    severityLevel = 'Ușoară';
    clinicalInterpretation = 'Anxietate ușoară. Este recomandat monitorizarea și tehnici de relaxare.';
  } else if (totalScore >= 10 && totalScore <= 14) {
    severityLevel = 'Moderată';
    clinicalInterpretation = 'Anxietate moderată. Se recomandă consultarea unui specialist pentru evaluare și posibil tratament.';
  } else if (totalScore >= 15 && totalScore <= 21) {
    severityLevel = 'Severă';
    clinicalInterpretation = 'Anxietate severă. Este necesară evaluarea și tratamentul de către un profesionist în sănătate mentală.';
  }

  const questionsCount = Object.keys(answers).length;
  const average = totalScore / questionsCount;
  const maxPossibleScore = questionsCount * 3; // GAD-7 uses 0-3 scale
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  return {
    total: totalScore,
    average: Math.round(average * 100) / 100,
    answers_count: questionsCount,
    overall: percentage,
    raw_score: totalScore,
    max_score: maxPossibleScore,
    interpretation: `${severityLevel} - ${clinicalInterpretation}`,
    gad7_score: totalScore,
    severity_level: severityLevel,
    clinical_interpretation: clinicalInterpretation,
    recommendations: getGAD7Recommendations(totalScore),
    detailed_interpretations: {
      score_range: `${totalScore}/21`,
      severity: severityLevel,
      description: clinicalInterpretation,
      next_steps: getGAD7NextSteps(totalScore)
    }
  };
}

function getBasicInterpretation(percentage: number): string {
  if (percentage >= 80) return "Scor foarte ridicat";
  if (percentage >= 60) return "Scor ridicat";
  if (percentage >= 40) return "Scor mediu";
  if (percentage >= 20) return "Scor scăzut";
  return "Scor foarte scăzut";
}

function getBigFiveInterpretation(percentage: number): string {
  if (percentage >= 80) return "Profil de personalitate foarte echilibrat cu trăsături pronunțate";
  if (percentage >= 60) return "Profil de personalitate echilibrat cu tendințe clare";
  if (percentage >= 40) return "Profil de personalitate moderat";
  return "Profil de personalitate cu trăsături mai puțin pronunțate";
}

function getBigFiveDetailedInterpretations(dimensions: BigFiveDimension): any {
  return {
    openness: dimensions.openness >= 60 ? 
      "Ești deschis la experiențe noi, creativ și curios. Îți place să explorezi idei noi și să gândești în mod abstract." :
      "Preferi rutina și tradițiile. Ești practic și te concentrezi pe aspectele concrete ale vieții.",
    conscientiousness: dimensions.conscientiousness >= 60 ?
      "Ești organizat, disciplinat și orientat spre obiective. Îți place să planifici și să îți duci sarcinile la bun sfârșit." :
      "Ești mai spontan și flexibil. Preferi să îți păstrezi opțiunile deschise și să te adaptezi situațiilor.",
    extraversion: dimensions.extraversion >= 60 ?
      "Ești sociabil, energic și îți place să fii în centrul atenției. Te energizezi în compania altora." :
      "Ești mai introvertit și preferi activitățile liniștite. Te energizezi prin timp petrecut singur.",
    agreeableness: dimensions.agreeableness >= 60 ?
      "Ești empatic, cooperant și îți pasă de bunăstarea altora. Eviti conflictele și cauți armonia." :
      "Ești mai competitiv și sceptic. Nu eziti să îți exprimi opiniile chiar dacă pot deranja pe alții.",
    neuroticism: dimensions.neuroticism >= 60 ?
      "Tendi să experimentezi emoții negative mai intense și să fii mai sensibil la stres." :
      "Ești emoțional stabil și calm. Te descurci bine cu stresul și păstrezi echilibrul emoțional."
  };
}

function getDISCInterpretation(dominantStyle: string, percentage: number): string {
  const styles = {
    D: `Stilul tău dominant este DOMINANȚĂ (${percentage}%). Ești direct, hotărât și orientat spre rezultate.`,
    I: `Stilul tău dominant este INFLUENȚĂ (${percentage}%). Ești sociabil, optimist și îți place să motivezi pe alții.`,
    S: `Stilul tău dominant este STABILITATE (${percentage}%). Ești calm, patient și îți place stabilitatea.`,
    C: `Stilul tău dominant este CONFORMITATE (${percentage}%). Ești analitic, precis și orientat spre calitate.`
  };
  return styles[dominantStyle as keyof typeof styles] || "Profil DISC echilibrat";
}

function getDISCDetailedInterpretations(percentages: DISCDimension, dominantStyle: string): any {
  return {
    summary: `Stilul tău dominant este ${dominantStyle} cu ${percentages[dominantStyle as keyof DISCDimension]}% din răspunsuri.`,
    D: `Dominanță: ${percentages.D}% - ${percentages.D >= 30 ? 'Nivel ridicat de dominanță. Ești direct, hotărât și îți place să conduci.' : 'Nivel moderat/scăzut de dominanță. Preferi colaborarea și consultarea.'}`,
    I: `Influență: ${percentages.I}% - ${percentages.I >= 30 ? 'Nivel ridicat de influență. Ești sociabil, optimist și îți place să motivezi pe alții.' : 'Nivel moderat/scăzut de influență. Ești mai rezervat în interacțiunile sociale.'}`,
    S: `Stabilitate: ${percentages.S}% - ${percentages.S >= 30 ? 'Nivel ridicat de stabilitate. Ești calm, patient și îți place rutina.' : 'Nivel moderat/scăzut de stabilitate. Îți place schimbarea și varietatea.'}`,
    C: `Conformitate: ${percentages.C}% - ${percentages.C >= 30 ? 'Nivel ridicat de conformitate. Ești analitic, precis și orientat spre calitate.' : 'Nivel moderat/scăzut de conformitate. Ești mai flexibil cu regulile și procedurile.'}`
  };
}

function getEnneagramInterpretation(dominantType: number, percentage: number): string {
  const typeDescriptions = {
    1: `Tipul tău dominant este PERFECȚIONISTUL (${percentage}%). Ești principial, autocontrolat și urmărești să îmbunătățești totul.`,
    2: `Tipul tău dominant este AJUTĂTORUL (${percentage}%). Ești empatic, sincer și îți place să ajuți pe alții.`,
    3: `Tipul tău dominant este REALIZATORUL (${percentage}%). Ești adapabil, ambicios și orientat spre succes.`,
    4: `Tipul tău dominant este INDIVIDUALISTUL (${percentage}%). Ești expresiv, dramatic și auto-absorbit.`,
    5: `Tipul tău dominant este INVESTIGATORUL (${percentage}%). Ești intens, secretos și izolat.`,
    6: `Tipul tău dominant este LOIALISTUL (${percentage}%). Ești angajat, responsabil și anxios.`,
    7: `Tipul tău dominant este ENTUZIASTUL (${percentage}%). Ești spontan, versatil și dispersat.`,
    8: `Tipul tău dominant este PROVOCATORUL (${percentage}%). Ești auto-încrezător, decisiv și confruntațional.`,
    9: `Tipul tău dominant este PACIFICATORUL (${percentage}%). Ești calm, stabil și complacent.`
  };
  return typeDescriptions[dominantType as keyof typeof typeDescriptions] || "Tip Enneagram nedeterminat";
}

function getEnneagramDetailedInterpretations(dominantType: number, percentages: { [key: string]: number }): any {
  const typeDetails = {
    1: {
      name: "Perfecționistul",
      core_fear: "Să fie corupt, defect sau greșit",
      core_desire: "Să fie bun, corect, perfect și îmbunătățit",
      characteristics: "Principial, idealist, autocontrolat, perfecționist",
      growth_direction: "Când ești sănătos, devii mai spontan și bucuros (către 7)",
      stress_direction: "Când ești stresat, devii critic și iritabil (către 4)"
    },
    2: {
      name: "Ajutătorul", 
      core_fear: "Să nu fie iubit sau vrut",
      core_desire: "Să se simtă iubit",
      characteristics: "Atent, interpersonal, posesiv, manipulativ",
      growth_direction: "Când ești sănătos, devii mai auto-cultivat (către 4)",
      stress_direction: "Când ești stresat, devii agresiv și dominant (către 8)"
    },
    3: {
      name: "Realizatorul",
      core_fear: "Să nu aibă valoare în afară de realizări",
      core_desire: "Să se simtă valoros și demn",
      characteristics: "Adapabil, ambicios, orientat spre imagine, ostil",
      growth_direction: "Când ești sănătos, devii mai cooperant și angajat (către 6)",
      stress_direction: "Când ești stresat, devii apatic și retras (către 9)"
    },
    4: {
      name: "Individualistul",
      core_fear: "Să nu aibă identitate sau semnificație personală",
      core_desire: "Să se găsească pe sine și semnificația lor",
      characteristics: "Expresiv, dramatic, egocentric, temperamental",
      growth_direction: "Când ești sănătos, devii mai principial și obiectiv (către 1)",
      stress_direction: "Când ești stresat, devii clingy și dependent (către 2)"
    },
    5: {
      name: "Investigatorul",
      core_fear: "Să fie incompetent sau invadat",
      core_desire: "Să fie capabil și competent",
      characteristics: "Intens, cerebral, perceptiv, izolat",
      growth_direction: "Când ești sănătos, devii mai încrezător și decisiv (către 8)",
      stress_direction: "Când ești stresat, devii hiperractiv și dispersat (către 7)"
    },
    6: {
      name: "Loialistul",
      core_fear: "Să nu aibă sprijin sau îndrumare",
      core_desire: "Să aibă securitate și sprijin",
      characteristics: "Angajat, responsabil, anxios, suspect",
      growth_direction: "Când ești sănătos, devii mai relaxat și optimist (către 9)",
      stress_direction: "Când ești stresat, devii competitiv și arogant (către 3)"
    },
    7: {
      name: "Entuziastul",
      core_fear: "Să fie prins în durere sau privațiune",
      core_desire: "Să mențină fericirea și satisfacția",
      characteristics: "Spontan, versatil, acquisitiv, dispersat",
      growth_direction: "Când ești sănătos, devii mai concentrat și dedicat (către 5)",
      stress_direction: "Când ești stresat, devii perfecționist și critic (către 1)"
    },
    8: {
      name: "Provocatorul",
      core_fear: "Să fie controlat sau vulnerabil",
      core_desire: "Să se auto-controleze",
      characteristics: "Auto-încrezător, decisiv, dominat, confruntațional",
      growth_direction: "Când ești sănătos, devii mai atent și protector (către 2)",
      stress_direction: "Când ești stresat, devii secretos și temător (către 5)"
    },
    9: {
      name: "Pacificatorul",
      core_fear: "Fragmentarea, separarea și pierderea conexiunii",
      core_desire: "Să mențină pacea interioară și exterioară",
      characteristics: "Calm, stabil, complacent, resignat",
      growth_direction: "Când ești sănătos, devii mai auto-dezvoltat și energic (către 3)",
      stress_direction: "Când ești stresat, devii anxios și preocupat (către 6)"
    }
  };

  const details = typeDetails[dominantType as keyof typeof typeDetails];
  
  return {
    dominant_type_info: details,
    type_scores: Object.entries(percentages).map(([type, score]) => ({
      type: parseInt(type),
      name: typeDetails[parseInt(type) as keyof typeof typeDetails]?.name || `Tip ${type}`,
      percentage: score
    })).sort((a, b) => b.percentage - a.percentage)
  };
}

function getEmotionalIntelligenceInterpretation(percentage: number): string {
  if (percentage >= 85) return "Inteligență emoțională excepțională - ești un lider natural în gestionarea emoțiilor";
  if (percentage >= 70) return "Inteligență emoțională foarte bună - gestionezi eficient emoțiile în majoritatea situațiilor";
  if (percentage >= 55) return "Inteligență emoțională bună - ai o bază solidă cu oportunități de dezvoltare";
  if (percentage >= 40) return "Inteligență emoțională moderată - beneficiezi de dezvoltare în câteva domenii";
  return "Inteligență emoțională în dezvoltare - concentrează-te pe construirea abilităților emoționale de bază";
}

function getEmotionalIntelligenceDetailedInterpretations(dimensions: EmotionalIntelligenceDimension): any {
  return {
    self_awareness: {
      score: dimensions.self_awareness,
      interpretation: dimensions.self_awareness >= 70 ? 
        "Ai o conștiință emoțională foarte bună. Îți recunoști rapid emoțiile și înțelegi impactul lor asupra comportamentului tău." :
        dimensions.self_awareness >= 50 ?
        "Ai o conștiință emoțională moderată. Poți îmbunătăți capacitatea de a-ți recunoaște și înțelege emoțiile în timp real." :
        "Autocunoașterea emoțională necesită dezvoltare. Practică identificarea și numirea emoțiilor pe măsură ce le experimentezi."
    },
    self_regulation: {
      score: dimensions.self_regulation,
      interpretation: dimensions.self_regulation >= 70 ?
        "Excelezi în autocontrolul emoțional. Poți gestiona stresul și emoțiile negative eficient." :
        dimensions.self_regulation >= 50 ?
        "Ai abilități moderate de autocontrol. Poți îmbunătăți tehnicile de gestionare a stresului și a emoțiilor intense." :
        "Autocontrolul emoțional necesită atenție. Învață tehnici de relaxare și strategii de gestionare a emoțiilor."
    },
    social_awareness: {
      score: dimensions.social_awareness,
      interpretation: dimensions.social_awareness >= 70 ?
        "Ai o empatie și conștiință socială excelentă. Înțelegi rapid emoțiile și nevoile altora." :
        dimensions.social_awareness >= 50 ?
        "Conștiința socială este la un nivel decent. Poți dezvolta mai mult capacitatea de a citi semnalele emoționale ale altora." :
        "Conștiința socială necesită dezvoltare. Practică observarea și interpretarea semnalelor non-verbale ale altora."
    },
    relationship_management: {
      score: dimensions.relationship_management,
      interpretation: dimensions.relationship_management >= 70 ?
        "Ești foarte bun în gestionarea relațiilor. Poți influența pozitiv și rezolva conflicte eficient." :
        dimensions.relationship_management >= 50 ?
        "Gestionarea relațiilor este la un nivel moderat. Poți îmbunătăți abilitățile de comunicare și rezolvare a conflictelor." :
        "Gestionarea relațiilor necesită atenție. Concentrează-te pe dezvoltarea abilităților de comunicare și colaborare."
    }
  };
}

function getGAD7Recommendations(score: number): string[] {
  if (score <= 4) {
    return [
      'Continuă să practici tehnici de gestionare a stresului',
      'Menține un stil de viață echilibrat',
      'Practică exerciții de respirație când te simți tensionat'
    ];
  } else if (score <= 9) {
    return [
      'Învață și practică tehnici de relaxare regulat',
      'Consideră meditația sau mindfulness-ul',
      'Menține o rutină de exerciții fizice',
      'Limitează cafeina și alcoolul'
    ];
  } else if (score <= 14) {
    return [
      'Consultă un psiholog sau psihiatru pentru evaluare',
      'Consideră terapia cognitiv-comportamentală',
      'Practică tehnici de gestionare a anxietății zilnic',
      'Evaluează factorii de stres din viața ta'
    ];
  } else {
    return [
      'Caută ajutor profesional urgent',
      'Discută cu medicul despre opțiunile de tratament',
      'Consideră atât terapia cât și medicația',
      'Creează un sistem de suport puternic',
      'Evită auto-medicația cu substanțe'
    ];
  }
}

function getGAD7NextSteps(score: number): string {
  if (score <= 4) {
    return 'Monitorizează simptomele și continuă practicile sănătoase de gestionare a stresului.';
  } else if (score <= 9) {
    return 'Implementează strategii de coping și monitorizează evoluția simptomelor.';
  } else if (score <= 14) {
    return 'Programează o consultație cu un specialist în sănătate mentală pentru evaluare și plan de tratament.';
  } else {
    return 'Caută ajutor profesional cât mai curând posibil. Anxietatea severă necesită intervenție specializată.';
  }
}
