
import { StandardizedScore } from '@/types/tests';

interface BigFiveAnswers {
  [key: string]: number;
}

interface Dimensions {
  [key: string]: number;
}

const interpretationMap = {
  openness: { 
    low: "Preferați rutina și tradițiile, fiind mai conservator în abordări.", 
    high: "Sunteți deschis la experiențe noi, creativ și aventuros." 
  },
  conscientiousness: { 
    low: "Sunteți mai flexibil și spontan, dar uneori mai puțin organizat.", 
    high: "Sunteți foarte organizat, disciplinat și orientat spre obiective." 
  },
  extraversion: { 
    low: "Preferați activitățile solitudinale și sunteți mai rezervat în social.", 
    high: "Sunteți energic, sociabil și vă place să fiți în centrul atenției." 
  },
  agreeableness: { 
    low: "Sunteți mai competitiv și direct în relațiile interpersonale.", 
    high: "Sunteți cooperant, empatic și vă place să ajutați pe alții." 
  },
  neuroticism: { 
    low: "Sunteți stabil emoțional, calm și gestionați bine stresul.", 
    high: "Sunteți mai sensibil la stres și experimentați emoții negative mai intens." 
  }
};

const dimensionKeys = Object.keys(interpretationMap) as string[];

// Maparea întrebărilor la dimensiuni (40 de întrebări total, 8 per dimensiune)
const questionDimensionMap: { [key: number]: string } = {
  // Openness (1-8)
  1: 'openness', 2: 'openness', 3: 'openness', 4: 'openness', 
  5: 'openness', 6: 'openness', 7: 'openness', 8: 'openness',
  // Conscientiousness (9-16)
  9: 'conscientiousness', 10: 'conscientiousness', 11: 'conscientiousness', 12: 'conscientiousness',
  13: 'conscientiousness', 14: 'conscientiousness', 15: 'conscientiousness', 16: 'conscientiousness',
  // Extraversion (17-24)
  17: 'extraversion', 18: 'extraversion', 19: 'extraversion', 20: 'extraversion',
  21: 'extraversion', 22: 'extraversion', 23: 'extraversion', 24: 'extraversion',
  // Agreeableness (25-32)
  25: 'agreeableness', 26: 'agreeableness', 27: 'agreeableness', 28: 'agreeableness',
  29: 'agreeableness', 30: 'agreeableness', 31: 'agreeableness', 32: 'agreeableness',
  // Neuroticism (33-40)
  33: 'neuroticism', 34: 'neuroticism', 35: 'neuroticism', 36: 'neuroticism',
  37: 'neuroticism', 38: 'neuroticism', 39: 'neuroticism', 40: 'neuroticism'
};

// Întrebările cu scor inversat (1-based positions)
const reverseScored = [4, 5, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 37, 40];

export function calculateBigFiveScore(answers: BigFiveAnswers): StandardizedScore {
  const rawScores: Dimensions = dimensionKeys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  const MAX_SCORE_PER_DIMENSION = 40; // 8 întrebări × 5 puncte max per întrebare

  // Convertim răspunsurile din format UUID la poziții numerice
  const answerEntries = Object.entries(answers);
  
  answerEntries.forEach(([questionId, answerValue], index) => {
    const questionNumber = index + 1; // poziția 1-based
    
    if (questionDimensionMap[questionNumber] && answerValue >= 1 && answerValue <= 5) {
      const dimension = questionDimensionMap[questionNumber];
      
      // Aplicăm reverse scoring dacă este necesar
      const adjustedScore = reverseScored.includes(questionNumber) ? (6 - answerValue) : answerValue;
      rawScores[dimension] += adjustedScore;
    }
  });

  const dimensions: { id: string; name: string; score: number }[] = [];
  const detailed_interpretations: { [key: string]: string } = {};
  let totalRawScore = 0;

  for (const dimension of dimensionKeys) {
    const score = rawScores[dimension] || 0;
    // Normalizare la scara 1-10 (8-40 puncte raw -> 1-10)
    const normalized = Math.max(1, Math.min(10, Math.round(((score - 8) / 32) * 9) + 1));
    
    dimensions.push({ 
      id: dimension, 
      name: dimension.charAt(0).toUpperCase() + dimension.slice(1).replace('_', ' '), 
      score: normalized 
    });
    
    detailed_interpretations[dimension] = normalized <= 5 
      ? interpretationMap[dimension as keyof typeof interpretationMap].low 
      : interpretationMap[dimension as keyof typeof interpretationMap].high;
    
    totalRawScore += score;
  }

  const MAX_TOTAL_SCORE = dimensionKeys.length * MAX_SCORE_PER_DIMENSION;
  const overallPercentage = Math.round((totalRawScore / MAX_TOTAL_SCORE) * 100);

  return {
    type: 'dimensional',
    overall: overallPercentage,
    raw_score: totalRawScore,
    max_score: MAX_TOTAL_SCORE,
    interpretation: "Rezultatele tale Big Five oferă o perspectivă cuprinzătoare asupra personalității tale în cinci dimensiuni fundamentale.",
    dimensions,
    detailed_interpretations,
  };
}

