
import { useMemo } from 'react';
import { calculateEnneagramScore } from '@/utils/testCalculations/enneagramCalculation';

export const useEnneagramCalculation = (answers?: Record<string, number>) => {
  return useMemo(() => {
    if (!answers) return null;

    const scores = calculateEnneagramScore(answers);
    
    // Convert EnneagramScore to dimensions format
    const dimensions = {
      type1: scores.type1,
      type2: scores.type2,
      type3: scores.type3,
      type4: scores.type4,
      type5: scores.type5,
      type6: scores.type6,
      type7: scores.type7,
      type8: scores.type8,
      type9: scores.type9
    };

    return dimensions;
  }, [answers]);
};
