
import { calculateDISCScore } from './discCalculation';
import { calculateBigFiveScore } from './bigFiveCalculation';
import { calculateWatsonGlaserScore } from './watsonGlaserCalculation';

export const calculateTestScore = (testName: string, answers: Record<string, number>) => {
  console.log(`Calculating score for test: ${testName}`, answers);
  
  switch (testName.toLowerCase()) {
    case 'disc assessment':
      return calculateDISCScore(answers);
    case 'big five personality test':
      // Big Five needs questions parameter, but we'll handle it in the hook
      return { overall: 0, dimensions: {}, interpretations: {} };
    case 'watson-glaser critical thinking appraisal':
    case 'watson-glaser':
      return calculateWatsonGlaserScore(answers);
    default:
      console.warn(`Unknown test name: ${testName}`);
      return null;
  }
};
