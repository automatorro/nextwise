
export interface EmotionalIntelligenceScore {
  overall: number;
  dimensions: {
    self_awareness: number;
    self_regulation: number;
    motivation: number;
    empathy: number;
    social_skills: number;
  };
  interpretation: string;
}

export const calculateEmotionalIntelligenceScore = (answers: Record<string, number>): EmotionalIntelligenceScore => {
  const scores = {
    self_awareness: 0,
    self_regulation: 0,
    motivation: 0,
    empathy: 0,
    social_skills: 0
  };
  
  // Maparea întrebărilor la dimensiuni (presupunem 25 întrebări, câte 5 pentru fiecare dimensiune)
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1]);
    
    if (questionNumber >= 1 && questionNumber <= 5) {
      scores.self_awareness += answer;
    } else if (questionNumber >= 6 && questionNumber <= 10) {
      scores.self_regulation += answer;
    } else if (questionNumber >= 11 && questionNumber <= 15) {
      scores.motivation += answer;
    } else if (questionNumber >= 16 && questionNumber <= 20) {
      scores.empathy += answer;
    } else if (questionNumber >= 21 && questionNumber <= 25) {
      scores.social_skills += answer;
    }
  });
  
  // Normalizarea la procente
  const maxScorePerDimension = 5 * 4; // 5 întrebări × 4 puncte maxim
  const normalizedScores = {
    self_awareness: Math.round((scores.self_awareness / maxScorePerDimension) * 100),
    self_regulation: Math.round((scores.self_regulation / maxScorePerDimension) * 100),
    motivation: Math.round((scores.motivation / maxScorePerDimension) * 100),
    empathy: Math.round((scores.empathy / maxScorePerDimension) * 100),
    social_skills: Math.round((scores.social_skills / maxScorePerDimension) * 100)
  };
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 5);
  
  let interpretation: string;
  if (overall >= 80) {
    interpretation = 'Inteligență emoțională foarte dezvoltată - Excelente abilități de management emoțional';
  } else if (overall >= 65) {
    interpretation = 'Inteligență emoțională bună - Abilități solide cu oportunități de îmbunătățire';
  } else if (overall >= 50) {
    interpretation = 'Inteligență emoțională moderată - Necesită dezvoltare în mai multe domenii';
  } else {
    interpretation = 'Inteligență emoțională scăzută - Se recomandă focus pe dezvoltarea abilităților emoționale';
  }
  
  return {
    overall,
    dimensions: normalizedScores,
    interpretation
  };
};
