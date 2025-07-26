import { calculateDISCScores } from './discCalculation';
import { calculateBigFiveScore } from './bigFiveCalculation';
import { calculateHollandScore } from './hollandCalculation';
import { calculateWatsonGlaserScore } from './watsonGlaserCalculation';

export const calculateTestScore = (testName: string, answers: Record<string, number>) => {
  console.log(`Calculating score for test: ${testName}`, answers);
  
  switch (testName.toLowerCase()) {
    case 'disc assessment':
      return calculateDISCScores(answers);
    case 'big five personality test':
      return calculateBigFiveScore(answers);
    case 'holland code career test':
      return calculateHollandScore(answers);
    case 'watson-glaser critical thinking appraisal':
    case 'watson-glaser':
      return calculateWatsonGlaserScore(answers);
    default:
      console.warn(`Unknown test name: ${testName}`);
      return null;
  }
};
