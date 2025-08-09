import { useMemo } from 'react';

export interface StandardizedScore {
  type: 'dimensional' | 'profile' | 'scale' | 'role';
  overall: number;
  raw_score: number;
  max_score: number;
  interpretation: string;
  dimensions?: { [key: string]: number };
  detailed_interpretations?: { [key: string]: string };
  profiles?: { dominant: string; secondary?: string };
  roles?: { primary: string[]; secondary: string[] };
  recommendations?: string[];
  severity_level?: string;
  dominant_profile?: string;
  secondary_profile?: string;
}

interface TestData {
  test_types: {
    name: string;
    description: string;
  };
  answers: { [key: string]: number };
  score?: any;
}

export const useTestCalculation = (testData: TestData | null, questions: any[] = []): StandardizedScore | null => {
  return useMemo(() => {
    if (!testData || !testData.answers || Object.keys(testData.answers).length === 0) {
      return null;
    }

    const testName = testData.test_types?.name?.toLowerCase() || '';
    const answers = testData.answers;

    console.log('Calculating score for test:', testName);
    console.log('Answers:', answers);

    try {
      // Big Five Personality Test
      if (testName.includes('big five') || testName.includes('big-five')) {
        return calculateBigFive(answers, questions);
      }

      // Cattell 16PF Test
      if (testName.includes('cattell') || testName.includes('16pf')) {
        return calculateCattell16PF(answers);
      }

      // DISC Assessment
      if (testName.includes('disc')) {
        return calculateDISC(answers);
      }

      // Belbin Team Roles
      if (testName.includes('belbin')) {
        return calculateBelbin(answers);
      }

      // Enneagram Test
      if (testName.includes('enneagram')) {
        return calculateEnneagram(answers);
      }

      // Holland RIASEC
      if (testName.includes('holland') || testName.includes('riasec') || testName.includes('occupational themes')) {
        return calculateHolland(answers);
      }

      // Emotional Intelligence
      if (testName.includes('emotional') || testName.includes('eq')) {
        return calculateEmotionalIntelligence(answers);
      }

      // Watson-Glaser Critical Thinking
      if (testName.includes('watson') || testName.includes('glaser')) {
        return calculateWatsonGlaser(answers);
      }

      // GAD-7 Anxiety
      if (testName.includes('gad') || testName.includes('anxiety')) {
        return calculateGAD(answers);
      }

      // Beck Depression Inventory
      if (testName.includes('beck') || testName.includes('depression')) {
        return calculateBeckDepression(answers);
      }

      // SJT / Career Orientation
      if (testName.includes('sjt') || testName.includes('situational') || testName.includes('orientare') || testName.includes('cariera')) {
        return calculateSJT(answers, questions);
      }

      // Cognitive Abilities
      if (testName.includes('cognitive') || testName.includes('cognitiv') || testName.includes('abilities')) {
        return calculateCognitive(answers, questions);
      }

      // Digital Competencies
      if (testName.includes('competențe digitale') || testName.includes('competente digitale') || testName.includes('digital')) {
        return calculateDigitalCompetencies(answers);
      }

      // Sensory Perception
      if (testName.includes('percepție senzorială') || testName.includes('perceptie senzoriala') || testName.includes('sensory perception')) {
        return calculateSensoryPerception(answers);
      }

      // HEXACO Personality
      if (testName.includes('hexaco')) {
        return calculateHEXACO(answers);
      }

      // Professional Aptitude (uses SJT calculation)
      if (testName.includes('professional') || testName.includes('aptitude') || testName.includes('managerial')) {
        return calculateSJT(answers, questions);
      }

      // Generic fallback for unknown tests
      console.warn('Unknown test type, using generic calculation:', testName);
      return calculateGeneric(answers, testData.score);

    } catch (error) {
      console.error('Error calculating test score:', error);
      return calculateGeneric(answers, testData.score);
    }
  }, [testData, questions]);
};

// Individual calculation functions with standardized outputs

const calculateBigFive = (answers: { [key: string]: number }, questions: any[]): StandardizedScore => {
  const { calculateBigFiveScore } = require('@/utils/testCalculations/bigFiveCalculation');
  const result = calculateBigFiveScore(answers, questions);
  
  return {
    type: 'dimensional',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions,
    detailed_interpretations: {}
  };
};

const calculateCattell16PF = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateCattellScore } = require('@/utils/testCalculations/cattellCalculation');
  const result = calculateCattellScore(answers);
  
  return {
    type: 'scale',
    overall: result.overall,
    raw_score: result.raw_score,
    max_score: result.max_score,
    interpretation: result.interpretation,
    dimensions: result.dimensions,
    detailed_interpretations: result.detailed_interpretations
  };
};

const calculateDISC = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateDISCScore } = require('@/utils/testCalculations/discCalculation');
  const result = calculateDISCScore(answers);
  
  return {
    type: 'dimensional',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions,
    profiles: { dominant: result.dominant_style }
  };
};

const calculateBelbin = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateBelbinScore } = require('@/utils/testCalculations/belbinCalculation');
  const result = calculateBelbinScore(answers);
  
  return {
    type: 'role',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions,
    roles: { primary: result.primary_roles, secondary: result.secondary_roles }
  };
};

const calculateEnneagram = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateEnneagramScore } = require('@/utils/testCalculations/enneagramCalculation');
  const result = calculateEnneagramScore(answers);
  
  // Ensure result is an object with numeric values
  if (!result || typeof result !== 'object') {
    console.warn('Invalid Enneagram result, using fallback');
    return {
      type: 'dimensional',
      overall: 50,
      raw_score: 0,
      max_score: 100,
      interpretation: 'Rezultatele Enneagram nu au putut fi calculate corect.',
      dimensions: {}
    };
  }

  // Convert raw scores to percentages with proper type checking
  const numericValues = Object.values(result).filter((value): value is number => typeof value === 'number');
  
  if (numericValues.length === 0) {
    console.warn('No numeric values in Enneagram result');
    return {
      type: 'dimensional',
      overall: 50,
      raw_score: 0,
      max_score: 100,
      interpretation: 'Rezultatele Enneagram nu conțin valori numerice valide.',
      dimensions: {}
    };
  }

  const maxScore = Math.max(...numericValues);
  const dimensions: { [key: string]: number } = {};
  
  Object.entries(result).forEach(([key, value]) => {
    if (typeof value === 'number') {
      dimensions[key] = Math.round((value / maxScore) * 100);
    }
  });
  
  const validDimensionValues = Object.values(dimensions);
  const overall = validDimensionValues.length > 0 
    ? Math.round(validDimensionValues.reduce((sum, score) => sum + score, 0) / validDimensionValues.length)
    : 50;
  
  const rawScore = numericValues.reduce((sum, score) => sum + score, 0);
  
  return {
    type: 'dimensional',
    overall,
    raw_score: rawScore,
    max_score: maxScore * validDimensionValues.length,
    interpretation: 'Rezultatele Enneagram arată distribuția scorurilor pentru cele 9 tipuri de personalitate.',
    dimensions
  };
};

const calculateHolland = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateHollandScore } = require('@/utils/testCalculations/hollandCalculation');
  const result = calculateHollandScore(answers);
  
  return {
    type: 'dimensional',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions,
    profiles: { dominant: result.dominant_code }
  };
};

const calculateEmotionalIntelligence = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateEmotionalIntelligenceScore } = require('@/utils/testCalculations/emotionalIntelligenceCalculation');
  const result = calculateEmotionalIntelligenceScore(answers);
  
  return {
    type: 'dimensional',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions
  };
};

const calculateWatsonGlaser = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateWatsonGlaserScore } = require('@/utils/testCalculations/watsonGlaserCalculation');
  const result = calculateWatsonGlaserScore(answers);
  
  return {
    type: 'dimensional',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.performance_level,
    dimensions: result.dimensions,
    detailed_interpretations: result.interpretations
  };
};

const calculateGAD = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateGADScore } = require('@/utils/testCalculations/gadCalculation');
  const result = calculateGADScore(answers);
  
  return {
    type: 'scale',
    overall: result.overall,
    raw_score: result.raw_score,
    max_score: 21,
    interpretation: result.interpretation,
    severity_level: result.severity_level
  };
};

const calculateBeckDepression = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateBeckDepressionScore } = require('@/utils/beckDepressionInventoryCalculator');
  const result = calculateBeckDepressionScore(answers);
  
  return {
    type: 'scale',
    overall: result.overall,
    raw_score: result.raw_score,
    max_score: result.max_score,
    interpretation: result.interpretation,
    dimensions: result.dimensions,
    severity_level: result.severity_level
  };
};

const calculateSJT = (answers: { [key: string]: number }, questions: any[]): StandardizedScore => {
  const { calculateSJTScore } = require('@/utils/testCalculations/sjtCalculation');
  const result = calculateSJTScore(answers, questions);
  
  return {
    type: 'profile',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions,
    profiles: { dominant: result.dominantProfiles?.[0] || '' },
    dominant_profile: result.dominantProfiles?.[0],
    recommendations: result.recommendations
  };
};

const calculateCognitive = (answers: { [key: string]: number }, questions: any[]): StandardizedScore => {
  const { calculateCognitiveScore } = require('@/utils/testCalculations/cognitiveCalculation');
  const result = calculateCognitiveScore(answers, questions);
  
  return {
    type: 'dimensional',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions
  };
};

const calculateDigitalCompetencies = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateDigitalCompetenciesScore } = require('@/utils/testCalculations/digitalCompetenciesCalculation');
  const result = calculateDigitalCompetenciesScore(answers);
  
  return {
    type: 'dimensional',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions,
    detailed_interpretations: result.interpretations
  };
};

const calculateSensoryPerception = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateSensoryPerceptionScore } = require('@/utils/testCalculations/sensoryPerceptionCalculation');
  const result = calculateSensoryPerceptionScore(answers);
  
  return {
    type: 'dimensional',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions,
    profiles: { dominant: result.dominant_ability },
    recommendations: result.professional_applications
  };
};

const calculateHEXACO = (answers: { [key: string]: number }): StandardizedScore => {
  const { calculateHexacoScore } = require('@/utils/testCalculations/hexacoCalculation');
  const result = calculateHexacoScore(answers);
  
  return {
    type: 'dimensional',
    overall: result.overall,
    raw_score: result.overall,
    max_score: 100,
    interpretation: result.interpretation,
    dimensions: result.dimensions
  };
};

const calculateGeneric = (answers: { [key: string]: number }, existingScore?: any): StandardizedScore => {
  // Fallback calculation for unknown test types
  const totalAnswers = Object.keys(answers).length;
  const rawScore = (typeof existingScore?.raw_score === 'number') ? existingScore.raw_score : totalAnswers;
  const maxScore = (typeof existingScore?.max_score === 'number') ? existingScore.max_score : 100;
  const overall = (typeof existingScore?.overall === 'number') ? existingScore.overall : Math.round((totalAnswers / Math.max(totalAnswers, 1)) * 100);
  
  return {
    type: 'scale',
    overall,
    raw_score: rawScore,
    max_score: maxScore,
    interpretation: existingScore?.interpretation || 'Rezultat calculat generic',
    dimensions: existingScore?.dimensions || {}
  };
};
