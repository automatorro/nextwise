
import { useMemo } from 'react';
import { StandardizedScore } from '@/types/tests';
import { calculateCattellScore } from '@/utils/testCalculations/cattellCalculation';
import { calculateDISCScore } from '@/utils/testCalculations/discCalculation';
// Import other calculation functions here as they are created/refactored

// This hook acts as a central router for all test calculations.
export const useTestCalculation = (
  testName: string | undefined,
  answers: Record<string, any> | undefined
): StandardizedScore | null => {
  const score = useMemo((): StandardizedScore | null => { // Added explicit return type here
    if (!testName || !answers) {
      return null;
    }

    // The object returned by each calculation function MUST conform to the StandardizedScore interface.
    switch (testName) {
      case 'Cattell 16PF':
        return calculateCattellScore(answers);

      case 'Test DISC - Stiluri de Comportament':
        // This is a placeholder and will be properly implemented later
        return { type: 'profile', dominant_profile: 'Unknown' };

      // ADD OTHER TEST CASES HERE IN THE FUTURE

      default:
        console.warn(`No specific calculation logic found for test: ${testName}.`);
        return {
          type: 'scale',
          interpretation: `Afișarea rezultatelor pentru testul "${testName}" este în curs de implementare.`,
        };
    }
  }, [testName, answers]);

  return score;
};
