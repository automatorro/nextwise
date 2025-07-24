
import { calculateCognitiveAbilitiesScoreFromDB, calculateCognitiveAbilitiesScoreFallback } from './cognitiveAbilitiesCalculator';

export function formatTestResults(testResult: any) {
  const { score, test_types } = testResult;
  
  if (!score || typeof score !== 'object') {
    return {
      overall: 0,
      dimensions: {},
      interpretation: 'Rezultate indisponibile'
    };
  }

  const testName = test_types?.name || '';
  const overall = score.overall || 0;
  const dimensions = score.dimensions || {};
  
  // Simple interpretation based on score
  let interpretation = 'Scor calculat';
  if (overall >= 80) {
    interpretation = 'Scor foarte ridicat';
  } else if (overall >= 60) {
    interpretation = 'Scor ridicat';
  } else if (overall >= 40) {
    interpretation = 'Scor mediu';
  } else {
    interpretation = 'Scor scăzut';
  }
  
  return {
    overall,
    dimensions,
    interpretation,
    testName
  };
}

// Re-export for backward compatibility
export { calculateCognitiveAbilitiesScoreFromDB, calculateCognitiveAbilitiesScoreFallback as calculateCognitiveAbilitiesScore } from './cognitiveAbilitiesCalculator';
