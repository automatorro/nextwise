
export interface HollandScore {
  overall: number;
  dimensions: {
    realistic: number;
    investigative: number;
    artistic: number;
    social: number;
    enterprising: number;
    conventional: number;
  };
  dominant_code: string;
  interpretation: string;
}

import { StandardizedScore } from '@/types/tests';

export const calculateHollandScore = (answers: Record<string, number>): StandardizedScore => {
  const scores = {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0
  };
  
  // Holland RIASEC has 10 questions per dimension (60 total)
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1] || questionId);
    
    if (questionNumber >= 1 && questionNumber <= 10) {
      scores.realistic += answer;
    } else if (questionNumber >= 11 && questionNumber <= 20) {
      scores.investigative += answer;
    } else if (questionNumber >= 21 && questionNumber <= 30) {
      scores.artistic += answer;
    } else if (questionNumber >= 31 && questionNumber <= 40) {
      scores.social += answer;
    } else if (questionNumber >= 41 && questionNumber <= 50) {
      scores.enterprising += answer;
    } else if (questionNumber >= 51 && questionNumber <= 60) {
      scores.conventional += answer;
    }
  });
  
  // Normalize to percentages (max score per dimension is 10 questions × 5 points = 50)
  const maxScorePerDimension = 10 * 5; // 10 questions × 5 points max
  const normalizedScores = {
    realistic: Math.round((scores.realistic / maxScorePerDimension) * 100),
    investigative: Math.round((scores.investigative / maxScorePerDimension) * 100),
    artistic: Math.round((scores.artistic / maxScorePerDimension) * 100),
    social: Math.round((scores.social / maxScorePerDimension) * 100),
    enterprising: Math.round((scores.enterprising / maxScorePerDimension) * 100),
    conventional: Math.round((scores.conventional / maxScorePerDimension) * 100)
  };
  
  // Determine dominant type
  const dominantType = Object.entries(normalizedScores).reduce((a, b) => 
    normalizedScores[a[0] as keyof typeof normalizedScores] > normalizedScores[b[0] as keyof typeof normalizedScores] ? a : b
  )[0];
  
  const typeNames = {
    realistic: 'Realistic (R) - Practic și orientat spre activități concrete',
    investigative: 'Investigative (I) - Analitic și orientat spre cercetare',
    artistic: 'Artistic (A) - Creativ și orientat spre exprimare artistică',
    social: 'Social (S) - Orientat spre ajutorarea altora',
    enterprising: 'Enterprising (E) - Orientat spre leadership și afaceri',
    conventional: 'Conventional (C) - Organizat și orientat spre detalii'
  };
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 6);
  
  return {
    type: 'profile',
    overall,
    dominant_profile: dominantType.toUpperCase(),
    dimensions: Object.entries(normalizedScores).map(([key, value]) => ({
      id: key,
      name: key,
      score: value
    })),
    interpretation: typeNames[dominantType as keyof typeof typeNames],
    raw_score: Object.values(scores).reduce((sum, score) => sum + score, 0),
    max_score: 60 * 5 // 60 questions × 5 points max
  };
};
