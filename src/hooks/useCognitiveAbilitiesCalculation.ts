
import { useMemo } from 'react';
import { calculateCognitiveAbilitiesScore } from '@/utils/testResultFormatters';

export const useCognitiveAbilitiesCalculation = (answers?: { [key: string]: number }) => {
  return useMemo(() => {
    if (!answers || Object.keys(answers).length === 0) {
      return null;
    }

    console.log('Computing cognitive abilities from answers:', answers);
    
    const result = calculateCognitiveAbilitiesScore(answers);
    
    return {
      verbal: result.dimensions.verbal || 0,
      numeric: result.dimensions.numeric || 0,
      logic: result.dimensions.logic || 0,
      spatial: result.dimensions.spatial || 0,
      abstract: result.dimensions.abstract || 0
    };
  }, [answers]);
};
