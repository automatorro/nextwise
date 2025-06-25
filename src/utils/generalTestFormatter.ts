
import { getScoreInterpretation } from './testScoring';

export interface FormattedTestResult {
  overall: number;
  dimensions: { [key: string]: number };
  interpretation: string;
  testName: string;
}

export function formatTestResults(testResult: any): FormattedTestResult {
  const { score, test_types } = testResult;
  
  if (!score || typeof score !== 'object') {
    return {
      overall: 0,
      dimensions: {},
      interpretation: 'Rezultate indisponibile',
      testName: ''
    };
  }

  const testName = test_types?.name || '';
  const overall = score.overall || 0;
  const dimensions = score.dimensions || {};
  
  return {
    overall,
    dimensions,
    interpretation: getScoreInterpretation(overall, testName).description,
    testName
  };
}
