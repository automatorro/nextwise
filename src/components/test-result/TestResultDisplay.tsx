// src/components/test-result/TestResultDisplay.tsx

import React from 'react';
import { StandardizedScore } from '@/types/tests';
// Vom adăuga importuri pentru layout-uri aici, pe măsură ce le construim
// import { DimensionalResultLayout } from './layouts/DimensionalResultLayout';

interface TestResultDisplayProps {
  score: StandardizedScore | null;
  testName?: string;
}

/**
 * Această componentă este "dispecerul vizual" central.
 * Primește scorul standardizat și decide ce layout specializat să afișeze.
 */
export const TestResultDisplay: React.FC<TestResultDisplayProps> = ({ score, testName }) => {
  // Afișează o stare de încărcare dacă scorul încă nu a fost calculat.
  if (!score) {
    return (
        <div className="text-center p-8">
            <p className="text-muted-foreground">Se încarcă rezultatele...</p>
        </div>
    );
  }

  // Aici este logica de "rutare" vizuală.
  switch (score.type) {
    // Cazul pentru teste dimensionale (Cattell, Big Five etc.)
    // Îl vom activa în pasul următor.
    // case 'dimensional':
    //   return <DimensionalResultLayout score={score} testName={testName} />;
    
    // Cazul default, pentru a afișa mesajul generic.
    default:
      return (
        <div className="text-center p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded">
          <h2 className="text-xl font-semibold">Rezultat Primit</h2>
          <p>{score.interpretation}</p>
        </div>
      );
  }
};