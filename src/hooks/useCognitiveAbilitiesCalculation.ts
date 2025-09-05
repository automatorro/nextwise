
import { useMemo } from 'react';
import { calculateCognitiveAbilitiesScore } from '@/utils/testResultFormatters';

export const useCognitiveAbilitiesCalculation = (answers?: { [key: string]: number }) => {
  return useMemo(() => {
    if (!answers || Object.keys(answers).length === 0) {
      return null;
    }

    console.log('Computing cognitive abilities from answers:', answers);
    
    const result = calculateCognitiveAbilitiesScore(answers);
    
    // Extract dimensions from the array format
    const dimensions = result.dimensions || [];
    const getDimensionScore = (id: string) => {
      const dimension = dimensions.find(d => d.id === id);
      return dimension ? dimension.score : 0;
    };
    
    return {
      verbal: getDimensionScore('verbal'),
      numeric: getDimensionScore('numeric'),
      logic: getDimensionScore('logic'),
      spatial: getDimensionScore('spatial'),
      abstract: getDimensionScore('abstract')
    };
  }, [answers]);
};
