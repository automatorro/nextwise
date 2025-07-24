
export interface BigFiveScore {
  overall: number;
  dimensions: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  interpretation: string;
}

export const calculateBigFiveScore = (answers: Record<string, number>, questions: any[]): BigFiveScore => {
  const scores = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  };
  
  const questionCounts = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  };
  
  // Calculul bazat pe scoring_weights din întrebări
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.scoring_weights) {
      const weights = question.scoring_weights as Record<string, number[]>;
      
      // Adăugăm scorurile pentru fiecare dimensiune
      Object.entries(weights).forEach(([dimension, dimensionWeights]) => {
        if (dimension in scores && answer < dimensionWeights.length) {
          scores[dimension as keyof typeof scores] += dimensionWeights[answer];
          questionCounts[dimension as keyof typeof questionCounts]++;
        }
      });
    }
  });
  
  // Normalizarea la procente
  const normalizedScores = Object.fromEntries(
    Object.entries(scores).map(([dimension, score]) => [
      dimension,
      questionCounts[dimension as keyof typeof questionCounts] > 0 
        ? Math.round((score / (questionCounts[dimension as keyof typeof questionCounts] * 4)) * 100)
        : 0
    ])
  ) as typeof scores;
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 5);
  
  const interpretation = `Profilul tău Big Five arată o personalitate echilibrată cu puncte forte în ${
    Object.entries(normalizedScores).sort(([,a], [,b]) => b - a)[0][0]
  }.`;
  
  return {
    overall,
    dimensions: normalizedScores,
    interpretation
  };
};
