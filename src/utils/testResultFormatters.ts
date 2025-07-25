
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
  const overall = typeof score.overall === 'number' ? score.overall : 0;
  
  // Ensure dimensions is always an object with numeric values
  const dimensions = score.dimensions || {};
  const sanitizedDimensions: Record<string, number> = {};
  
  Object.entries(dimensions).forEach(([key, value]) => {
    sanitizedDimensions[key] = typeof value === 'number' ? value : 0;
  });
  
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
    dimensions: sanitizedDimensions,
    interpretation,
    testName
  };
}

// Re-export for backward compatibility
export { calculateCognitiveAbilitiesScoreFromDB, calculateCognitiveAbilitiesScoreFallback as calculateCognitiveAbilitiesScore } from './cognitiveAbilitiesCalculator';
