
import { getScoreInterpretation } from './testScoring';
import { calculateBeckDepressionScore } from '@/utils/beckDepressionInventoryCalculator';
import { calculateBelbinTeamRolesScore } from '@/utils/belbinTeamRolesCalculator';
import { isBeckDepressionInventory, isBelbinTeamRoles } from '@/utils/testLabels';

export interface FormattedTestResult {
  overall: number;
  dimensions: { [key: string]: number };
  interpretation: string;
  testName: string;
  severity_level?: string;
  primary_roles?: string[];
  secondary_roles?: string[];
}

export function formatTestResults(testResult: any): FormattedTestResult {
  const { score, test_types, answers } = testResult;
  
  if (!score || typeof score !== 'object') {
    return {
      overall: 0,
      dimensions: {},
      interpretation: 'Rezultate indisponibile',
      testName: ''
    };
  }

  const testName = test_types?.name || '';
  
  // For Beck Depression Inventory, recalculate if needed to ensure proper formatting
  if (isBeckDepressionInventory(testName) && answers) {
    const beckScore = calculateBeckDepressionScore(answers);
    return {
      overall: beckScore.overall,
      dimensions: beckScore.dimensions,
      interpretation: beckScore.interpretation,
      testName,
      severity_level: beckScore.severity_level
    };
  }

  // For Belbin Team Roles, recalculate if needed to ensure proper formatting
  if (isBelbinTeamRoles(testName) && answers) {
    const belbinScore = calculateBelbinTeamRolesScore(answers);
    return {
      overall: belbinScore.overall,
      dimensions: belbinScore.dimensions,
      interpretation: belbinScore.interpretation,
      testName,
      primary_roles: belbinScore.primary_roles,
      secondary_roles: belbinScore.secondary_roles
    };
  }
  
  // Default formatting for other tests
  const overall = score.overall || 0;
  const dimensions = score.dimensions || {};
  
  return {
    overall,
    dimensions,
    interpretation: getScoreInterpretation(overall, testName).description,
    testName,
    severity_level: score.severity_level,
    primary_roles: score.primary_roles,
    secondary_roles: score.secondary_roles
  };
}
