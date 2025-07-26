
import { calculateDISCScore } from './discCalculation';
import { calculateBigFiveScore } from './bigFiveCalculation';
import { calculateWatsonGlaserScore } from './watsonGlaserCalculation';
import { calculateHollandScore } from './hollandCalculation';

export const calculateTestScore = (testName: string, answers: Record<string, number>) => {
  console.log('Calculating score for test:', testName, 'with answers:', answers);
  
  switch (testName.toLowerCase()) {
    case 'disc assessment':
      return calculateDISCScore(answers);
    case 'big five personality test':
      // Big Five needs questions parameter, but we'll handle it in the hook
      return { overall: 0, dimensions: {}, interpretations: {} };
    case 'watson-glaser critical thinking appraisal':
    case 'watson-glaser':
      return calculateWatsonGlaserScore(answers);
    case 'holland occupational themes (riasec)':
    case 'holland riasec':
      return calculateHollandScore(answers);
    default:
      console.warn('Unknown test type:', testName);
      return { 
        overall: 0, 
        dimensions: {}, 
        interpretations: {},
        error: `Test calculation not implemented for: ${testName}` 
      };
  }
};

export { calculateDISCScore } from './discCalculation';
export { calculateBigFiveScore } from './bigFiveCalculation';
export { calculateWatsonGlaserScore } from './watsonGlaserCalculation';
export { calculateHollandScore } from './hollandCalculation';
