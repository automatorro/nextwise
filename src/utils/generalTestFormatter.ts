export interface FormattedTestResult {
  overall: number;
  dimensions: { [key: string]: number };
  interpretation: string;
  testName: string;
}

export function formatGeneralTestResult(testResult: any): FormattedTestResult {
  if (!testResult || !testResult.test_types) {
    return {
      overall: 0,
      dimensions: {},
      interpretation: 'Rezultate indisponibile',
      testName: 'Test necunoscut'
    };
  }

  const testName = testResult.test_types.name || 'Test necunoscut';
  const score = testResult.score || {};
  
  // Extract overall score
  const overall = score.overall || 0;
  
  // Extract dimensions
  const dimensions = score.dimensions || {};
  
  // Generate interpretation based on score
  let interpretation = 'Scor calculat';
  if (overall >= 80) {
    interpretation = 'Scor foarte ridicat - Rezultat excelent';
  } else if (overall >= 60) {
    interpretation = 'Scor ridicat - Rezultat bun';
  } else if (overall >= 40) {
    interpretation = 'Scor mediu - Rezultat satisfăcător';
  } else {
    interpretation = 'Scor scăzut - Poate fi îmbunătățit';
  }
  
  return {
    overall,
    dimensions,
    interpretation,
    testName
  };
}
