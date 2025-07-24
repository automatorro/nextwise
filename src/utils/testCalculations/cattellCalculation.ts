
export interface CattellScore {
  overall: number;
  dimensions: {
    warmth: number;
    reasoning: number;
    emotional_stability: number;
    dominance: number;
    liveliness: number;
    rule_consciousness: number;
    social_boldness: number;
    sensitivity: number;
    vigilance: number;
    abstractedness: number;
    privateness: number;
    apprehension: number;
    openness_to_change: number;
    self_reliance: number;
    perfectionism: number;
    tension: number;
  };
  interpretation: string;
}

export const calculateCattellScore = (answers: Record<string, number>): CattellScore => {
  const factors = {
    warmth: 0,
    reasoning: 0,
    emotional_stability: 0,
    dominance: 0,
    liveliness: 0,
    rule_consciousness: 0,
    social_boldness: 0,
    sensitivity: 0,
    vigilance: 0,
    abstractedness: 0,
    privateness: 0,
    apprehension: 0,
    openness_to_change: 0,
    self_reliance: 0,
    perfectionism: 0,
    tension: 0
  };
  
  // Maparea întrebărilor la factori (presupunem 160 întrebări, câte 10 pentru fiecare factor)
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1]);
    const factorNames = Object.keys(factors);
    const factorIndex = Math.floor((questionNumber - 1) / 10);
    
    if (factorIndex >= 0 && factorIndex < factorNames.length) {
      const factorName = factorNames[factorIndex] as keyof typeof factors;
      factors[factorName] += answer;
    }
  });
  
  // Normalizarea la scală 1-10 (specific pentru Cattell)
  const maxScorePerFactor = 10 * 3; // 10 întrebări × 3 puncte maxim
  const normalizedScores = Object.fromEntries(
    Object.entries(factors).map(([factor, score]) => [
      factor,
      Math.round(((score / maxScorePerFactor) * 9) + 1) // Scală 1-10
    ])
  ) as typeof factors;
  
  // Calculul scorului general ca medie
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 16);
  
  const interpretation = `Profilul tău Cattell 16PF arată o personalitate complexă cu scoruri variate pe cei 16 factori. Factorul dominant este cel cu scorul cel mai mare.`;
  
  return {
    overall: Math.round((overall / 10) * 100), // Convertim la procente pentru consistență
    dimensions: normalizedScores,
    interpretation
  };
};
