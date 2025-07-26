
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

export const calculateHollandScore = (answers: Record<string, number>): HollandScore => {
  const scores = {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0
  };
  
  // Holland Code typically has 6 questions per dimension
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
  
  // Normalize to percentages
  const maxScorePerDimension = 10 * 4; // 10 questions × 4 points max
  const normalizedScores = {
    realistic: Math.round((scores.realistic / maxScorePerDimension) * 100),
    investigative: Math.round((scores.investigative / maxScorePerDimension) * 100),
    artistic: Math.round((scores.artistic / maxScorePerDimension) * 100),
    social: Math.round((scores.social / maxScorePerDimension) * 100),
    enterprising: Math.round((scores.enterprising / maxScorePerDimension) * 100),
    conventional: Math.round((scores.conventional / maxScorePerDimension) * 100)
  };
  
  // Determine dominant code
  const dominantType = Object.entries(normalizedScores).reduce((a, b) => 
    normalizedScores[a[0] as keyof typeof normalizedScores] > normalizedScores[b[0] as keyof typeof normalizedScores] ? a : b
  )[0];
  
  const typeNames = {
    realistic: 'Realistic (R) - Practical și orientat spre activități concrete',
    investigative: 'Investigative (I) - Analitic și orientat spre cercetare',
    artistic: 'Artistic (A) - Creativ și orientat spre exprimare artistică',
    social: 'Social (S) - Orientat spre ajutorarea altora',
    enterprising: 'Enterprising (E) - Orientat spre leadership și afaceri',
    conventional: 'Conventional (C) - Organizat și orientat spre detalii'
  };
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 6);
  
  return {
    overall,
    dimensions: normalizedScores,
    dominant_code: dominantType.toUpperCase(),
    interpretation: typeNames[dominantType as keyof typeof typeNames]
  };
};
