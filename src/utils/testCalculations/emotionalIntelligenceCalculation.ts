
import { StandardizedScore } from '@/types/tests';

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

export const calculateEmotionalIntelligenceScore = (answers: Record<string, number>): StandardizedScore => {
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
  
  // Determine scale level based on overall score
  let scale_level: string;
  if (overall >= 80) {
    scale_level = 'Avansat';
  } else if (overall >= 65) {
    scale_level = 'Intermediar-Avansat';
  } else if (overall >= 50) {
    scale_level = 'Intermediar';
  } else if (overall >= 30) {
    scale_level = 'Începător-Intermediar';
  } else {
    scale_level = 'Începător';
  }
  
  // Convert dimensions to StandardizedScore format
  const dimensionsArray = Object.entries(normalizedScores).map(([id, score]) => ({
    id,
    name: id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), // Convert snake_case to Title Case
    score
  }));
  
  // Calculate raw score as sum of all answer values
  const raw_score = Object.values(answers).reduce((sum, value) => sum + value, 0);
  
  // Calculate max score (assuming each question is scored 0-4)
  const max_score = Object.keys(answers).length * 4;
  
  return {
    type: 'scale',
    overall,
    dimensions: dimensionsArray,
    interpretation,
    scale_level,
    raw_score,
    max_score
  };
};
