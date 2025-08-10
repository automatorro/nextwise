// src/hooks/useTestCalculation.ts

import { useMemo } from 'react';
import { StandardizedScore } from '@/types/tests';
// Vom adăuga importuri pentru funcțiile de calcul aici, pe măsură ce le migrăm.
// import { calculateCattellScore } from '@/utils/testCalculations/cattellCalculation';

/**
 * Acest hook este "motorul" central al sistemului de rezultate.
 * Primește numele testului și răspunsurile, și returnează un obiect standardizat de scor.
 */
export const useTestCalculation = (
  testName: string | undefined,
  answers: Record<string, any> | undefined
): StandardizedScore | null => {
  const score = useMemo((): StandardizedScore | null => {
    // Dacă nu avem datele necesare, nu facem nimic.
    if (!testName || !answers) {
      return null;
    }

    // Aici vom adăuga logica pentru fiecare test, pe rând.
    switch (testName) {
      // Exemplu (decomentat mai târziu):
      // case 'Cattell 16PF':
      //   return calculateCattellScore(answers);

      // Cazul default, pentru testele pe care încă nu le-am migrat.
      default:
        console.warn(`Nu există logică de calcul în noul sistem pentru: ${testName}.`);
        return {
          type: 'scale', // Un tip generic pentru a nu crăpa
          interpretation: `Afișarea rezultatelor pentru testul "${testName}" este în curs de implementare în noul sistem.`,
        };
    }
  }, [testName, answers]);

  return score;
};