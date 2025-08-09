
export interface HexacoScore {
  overall: number;
  dimensions: {
    honesty_humility: number;
    emotionality: number;
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    openness: number;
  };
  interpretation: string;
}

export const calculateHexacoScore = (answers: Record<string, number>): HexacoScore => {
  const scores = {
    honesty_humility: 0,
    emotionality: 0,
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    openness: 0
  };
  
  // HEXACO has 6 dimensions with typically 10 questions each (60 total)
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1] || questionId);
    
    if (questionNumber >= 1 && questionNumber <= 10) {
      scores.honesty_humility += answer;
    } else if (questionNumber >= 11 && questionNumber <= 20) {
      scores.emotionality += answer;
    } else if (questionNumber >= 21 && questionNumber <= 30) {
      scores.extraversion += answer;
    } else if (questionNumber >= 31 && questionNumber <= 40) {
      scores.agreeableness += answer;
    } else if (questionNumber >= 41 && questionNumber <= 50) {
      scores.conscientiousness += answer;
    } else if (questionNumber >= 51 && questionNumber <= 60) {
      scores.openness += answer;
    }
  });
  
  // Normalize to percentages (max score per dimension is 10 questions × 5 points = 50)
  const maxScorePerDimension = 10 * 5;
  const normalizedScores = {
    honesty_humility: Math.round((scores.honesty_humility / maxScorePerDimension) * 100),
    emotionality: Math.round((scores.emotionality / maxScorePerDimension) * 100),
    extraversion: Math.round((scores.extraversion / maxScorePerDimension) * 100),
    agreeableness: Math.round((scores.agreeableness / maxScorePerDimension) * 100),
    conscientiousness: Math.round((scores.conscientiousness / maxScorePerDimension) * 100),
    openness: Math.round((scores.openness / maxScorePerDimension) * 100)
  };
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 6);
  
  const interpretation = `Profilul tău HEXACO arată o personalitate cu puncte forte în ${
    Object.entries(normalizedScores).sort(([,a], [,b]) => b - a)[0][0]
  }.`;
  
  return {
    overall,
    dimensions: normalizedScores,
    interpretation
  };
};
