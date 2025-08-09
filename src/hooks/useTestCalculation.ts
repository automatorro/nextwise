import { useMemo } from 'react';
import { StandardizedScore } from '@/types/tests';
import { calculateCattellScore } from '@/utils/testCalculations/cattellCalculation';
// We will add other imports later

export const useTestCalculation = (
  testName: string | undefined,
  answers: Record<string, any> | undefined
): StandardizedScore | null => {
  const score = useMemo(() => {
    if (!testName || !answers) {
      return null;
    }

    switch (testName) {
      case 'Cattell 16PF':
        return calculateCattellScore(answers);

      // We will add cases for other tests here, one by one.

      default:
        console.warn(`No specific calculation logic implemented for: ${testName}.`);
        return {
          type: 'scale',
          interpretation: `Afișarea rezultatelor pentru testul "${testName}" este în curs de implementare.`,
        };
    }
  }, [testName, answers]);

  return score;
};
