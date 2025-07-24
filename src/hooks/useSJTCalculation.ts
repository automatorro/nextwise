
import { useMemo } from 'react';

export const useSJTCalculation = (answers?: Record<string, number>, questions?: any[]) => {
  return useMemo(() => {
    if (!answers || !questions || Object.keys(answers).length === 0) {
      return null;
    }

    console.log('Calculating SJT scores for answers:', answers);
    console.log('Using questions:', questions);

    // Inițializarea scorurilor pentru fiecare profil de carieră
    const profileScores: Record<string, number> = {
      'Leader': 0,
      'Specialist_Analitic': 0,
      'Creativ': 0,
      'Suport_Servicii': 0,
      'Antreprenor': 0,
      'Vanzari': 0
    };

    // Calcularea scorurilor bazată pe scoring_weights din baza de date
    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === questionId);
      
      if (question?.scoring_weights) {
        const weights = question.scoring_weights as Record<string, number[]>;
        
        Object.entries(weights).forEach(([profile, profileWeights]) => {
          if (answerValue < profileWeights.length) {
            profileScores[profile] = (profileScores[profile] || 0) + profileWeights[answerValue];
          }
        });
      }
    });

    // Găsirea scorului maxim posibil pentru normalizare
    const maxPossibleScore = Math.max(...Object.values(profileScores));
    const minScore = Math.min(...Object.values(profileScores));
    
    // Normalizarea scorurilor la 0-100
    const normalizedScores: Record<string, number> = {};
    
    Object.entries(profileScores).forEach(([profile, score]) => {
      if (maxPossibleScore === minScore) {
        // Dacă toate scorurile sunt egale
        normalizedScores[profile] = 50;
      } else {
        // Normalizare la 0-100
        const normalizedScore = Math.round(((score - minScore) / (maxPossibleScore - minScore)) * 100);
        normalizedScores[profile] = Math.max(0, Math.min(100, normalizedScore));
      }
    });

    console.log('SJT calculated scores:', normalizedScores);
    console.log('Raw profile scores:', profileScores);
    
    return normalizedScores;
  }, [answers, questions]);
};
