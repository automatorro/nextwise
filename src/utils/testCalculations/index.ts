
import { calculateBigFiveScore } from './bigFiveCalculation';
import { calculateGADScore } from './gadCalculation';
import { calculateDISCScore } from './discCalculation';
import { calculateBelbinScore } from './belbinCalculation';
import { calculateCognitiveScore } from './cognitiveCalculation';
import { calculateEmotionalIntelligenceScore } from './emotionalIntelligenceCalculation';
import { calculateCattellScore } from './cattellCalculation';
import { calculateEnneagramScore } from './enneagramCalculation';

export const calculateTestScore = (testName: string, answers: Record<string, number>, questions: any[]) => {
  switch (testName) {
    case 'Big Five Personalitate':
      return calculateBigFiveScore(answers, questions);
    case 'Evaluare Anxietate GAD-7':
      return calculateGADScore(answers);
    case 'Test DISC - Stiluri de Comportament':
      return calculateDISCScore(answers);
    case 'Roluri în Echipă Belbin':
      return calculateBelbinScore(answers);
    case 'Test Aptitudini Cognitive':
      return calculateCognitiveScore(answers, questions);
    case 'Test Inteligență Emoțională EQ':
      return calculateEmotionalIntelligenceScore(answers);
    case 'Test Cattell 16PF':
      return calculateCattellScore(answers);
    case 'Enneagram':
      return calculateEnneagramScore(answers);
    default:
      return { total: 0 };
  }
};

export * from './bigFiveCalculation';
export * from './gadCalculation';
export * from './discCalculation';
export * from './belbinCalculation';
export * from './cognitiveCalculation';
export * from './emotionalIntelligenceCalculation';
export * from './cattellCalculation';
export * from './enneagramCalculation';
