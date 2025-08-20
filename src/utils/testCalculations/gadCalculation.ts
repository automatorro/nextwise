
import { StandardizedScore } from '@/types/tests';

export const calculateGADScore = (answers: Record<string, number>): StandardizedScore => {
  // GAD-7 are 7 întrebări, fiecare cu scoruri de la 0-3
  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  
  // Determinarea nivelului de anxietate bazat pe scorul total
  let severity_level: string;
  let interpretation: string;
  
  if (totalScore >= 0 && totalScore <= 4) {
    severity_level = 'Minimal';
    interpretation = 'Anxietate minimă - Nu sunt necesare măsuri speciale';
  } else if (totalScore >= 5 && totalScore <= 9) {
    severity_level = 'Ușoară';
    interpretation = 'Anxietate ușoară - Monitorizare și tehnici de relaxare';
  } else if (totalScore >= 10 && totalScore <= 14) {
    severity_level = 'Moderată';
    interpretation = 'Anxietate moderată - Se recomandă consultarea unui specialist';
  } else {
    severity_level = 'Severă';
    interpretation = 'Anxietate severă - Este necesară intervenția unui specialist';
  }
  
  // Calculul procentajului (scor maxim posibil = 21)
  const percentage = Math.round((totalScore / 21) * 100);
  
  return {
    type: 'scale',
    overall: percentage,
    scale_level: severity_level,
    interpretation,
    raw_score: totalScore,
    max_score: 21
  };
};
