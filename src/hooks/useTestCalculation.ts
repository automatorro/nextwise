import { useMemo } from 'react';
import { StandardizedScore } from '@/types/tests';
import { calculateCattellScore } from '@/utils/testCalculations/cattellCalculation';
import { calculateDISCScore } from '@/utils/testCalculations/discCalculation';

// This hook acts as a central router for all test calculations.
export const useTestCalculation = (
  testName: string | undefined,
  answers: Record<string, any> | undefined
): StandardizedScore | null => {
  const score = useMemo(() => {
    if (!testName || !answers) {
      return null;
    }

    // The object returned by each calculation function MUST conform to the StandardizedScore interface.
    switch (testName) {
      case 'Cattell 16PF':
        return calculateCattellScore(answers);

      case 'Test DISC - Stiluri de Comportament':
        return calculateDISCScore(answers);

      // ADD OTHER TEST CASES HERE IN THE FUTURE

      default:
        // For tests not yet implemented in this new system, return a generic message.
        console.warn(`No specific calculation logic found for test: ${testName}.`);
        return {
          type: 'scale',
          interpretation: `Rezultatele pentru testul "${testName}" nu sunt momentan disponibile în acest format.`,
        } as StandardizedScore;
    }
  }, [testName, answers]);

  return score;
};
