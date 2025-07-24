
export interface DISCScore {
  overall: number;
  dimensions: {
    dominance: number;
    influence: number;
    steadiness: number;
    conscientiousness: number;
  };
  dominant_style: string;
  interpretation: string;
}

export const calculateDISCScore = (answers: Record<string, number>): DISCScore => {
  const scores = {
    dominance: 0,
    influence: 0,
    steadiness: 0,
    conscientiousness: 0
  };
  
  // Maparea întrebărilor la stiluri DISC
  // Presupunem că avem 24 de întrebări, câte 6 pentru fiecare stil
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1]);
    
    if (questionNumber >= 1 && questionNumber <= 6) {
      scores.dominance += answer;
    } else if (questionNumber >= 7 && questionNumber <= 12) {
      scores.influence += answer;
    } else if (questionNumber >= 13 && questionNumber <= 18) {
      scores.steadiness += answer;
    } else if (questionNumber >= 19 && questionNumber <= 24) {
      scores.conscientiousness += answer;
    }
  });
  
  // Normalizarea la procente
  const maxScorePerDimension = 6 * 4; // 6 întrebări × 4 puncte maxim
  const normalizedScores = {
    dominance: Math.round((scores.dominance / maxScorePerDimension) * 100),
    influence: Math.round((scores.influence / maxScorePerDimension) * 100),
    steadiness: Math.round((scores.steadiness / maxScorePerDimension) * 100),
    conscientiousness: Math.round((scores.conscientiousness / maxScorePerDimension) * 100)
  };
  
  // Determinarea stilului dominant
  const dominantStyle = Object.entries(normalizedScores).reduce((a, b) => 
    normalizedScores[a[0] as keyof typeof normalizedScores] > normalizedScores[b[0] as keyof typeof normalizedScores] ? a : b
  )[0];
  
  const styleNames = {
    dominance: 'Dominance (D) - Orientat spre rezultate și control',
    influence: 'Influence (I) - Orientat spre oameni și persuasiune',
    steadiness: 'Steadiness (S) - Orientat spre stabilitate și cooperare',
    conscientiousness: 'Conscientiousness (C) - Orientat spre precizie și calitate'
  };
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 4);
  
  return {
    overall,
    dimensions: normalizedScores,
    dominant_style: dominantStyle,
    interpretation: styleNames[dominantStyle as keyof typeof styleNames]
  };
};
