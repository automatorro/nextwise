
import { getScoreInterpretation } from './testScoring';

export interface BeckDepressionScore {
  overall: number;
  raw_score: number;
  max_score: number;
  dimensions: { [key: string]: number };
  interpretation: string;
  severity_level: string;
}

// Beck Depression Inventory scoring function
export function calculateBeckDepressionScore(answers: { [key: string]: number }): BeckDepressionScore {
  console.log('Calculating Beck Depression Inventory score for answers:', answers);
  
  let totalScore = 0;
  const maxPossibleScore = Object.keys(answers).length * 3; // Each question has max score of 3
  
  // Calculate total raw score
  Object.values(answers).forEach(value => {
    totalScore += value;
  });
  
  // Determine severity level based on BDI-II scoring guidelines
  let severityLevel = '';
  let interpretation = '';
  
  if (totalScore <= 13) {
    severityLevel = 'Minimal';
    interpretation = 'Simptome minime de depresie. Nivelul tău de tristețe este în intervalul normal.';
  } else if (totalScore <= 19) {
    severityLevel = 'Ușoară';
    interpretation = 'Depresie ușoară. Poți experimenta unele simptome de depresie care ar putea beneficia de atenție.';
  } else if (totalScore <= 28) {
    severityLevel = 'Moderată';
    interpretation = 'Depresie moderată. Simptomele tale sugerează prezența unei depresii moderate care ar trebui să fie evaluată de un profesionist.';
  } else {
    severityLevel = 'Severă';
    interpretation = 'Depresie severă. Simptomele tale indică o depresie severă. Este recomandat să cauți ajutor profesional imediat.';
  }
  
  // Calculate dimensions based on BDI-II factor structure
  const dimensions = {
    'Afectiv': 0,
    'Cognitiv': 0,
    'Somatic': 0,
    'Suicidalitate': 0
  };
  
  // Group questions by dimension (simplified grouping)
  const affectiveQuestions = [1, 2, 5, 6, 7, 9, 10]; // Sadness, pessimism, guilt, punishment, self-dislike, suicidal thoughts, crying
  const cognitiveQuestions = [3, 8, 13, 14]; // Past failure, self-criticism, indecisiveness, worthlessness
  const somaticQuestions = [4, 11, 12, 15, 16, 17, 18, 19, 20, 21]; // Anhedonia, agitation, interest loss, energy loss, sleep, irritability, appetite, concentration, fatigue, sexual interest
  const suicidalQuestions = [9]; // Suicidal ideation
  
  // Calculate dimension scores
  affectiveQuestions.forEach(qNum => {
    const questionId = Object.keys(answers).find(id => id.includes(qNum.toString()));
    if (questionId) dimensions['Afectiv'] += answers[questionId];
  });
  
  cognitiveQuestions.forEach(qNum => {
    const questionId = Object.keys(answers).find(id => id.includes(qNum.toString()));
    if (questionId) dimensions['Cognitiv'] += answers[questionId];
  });
  
  somaticQuestions.forEach(qNum => {
    const questionId = Object.keys(answers).find(id => id.includes(qNum.toString()));
    if (questionId) dimensions['Somatic'] += answers[questionId];
  });
  
  suicidalQuestions.forEach(qNum => {
    const questionId = Object.keys(answers).find(id => id.includes(qNum.toString()));
    if (questionId) dimensions['Suicidalitate'] += answers[questionId];
  });
  
  // Convert to percentages for display
  const dimensionPercentages: { [key: string]: number } = {};
  dimensionPercentages['Afectiv'] = Math.round((dimensions['Afectiv'] / (affectiveQuestions.length * 3)) * 100);
  dimensionPercentages['Cognitiv'] = Math.round((dimensions['Cognitiv'] / (cognitiveQuestions.length * 3)) * 100);
  dimensionPercentages['Somatic'] = Math.round((dimensions['Somatic'] / (somaticQuestions.length * 3)) * 100);
  dimensionPercentages['Suicidalitate'] = Math.round((dimensions['Suicidalitate'] / (suicidalQuestions.length * 3)) * 100);
  
  const overallPercentage = Math.round((totalScore / maxPossibleScore) * 100);
  
  console.log('Beck Depression Inventory calculated scores:', {
    totalScore,
    maxPossibleScore,
    overallPercentage,
    severityLevel,
    dimensions: dimensionPercentages
  });
  
  return {
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: maxPossibleScore,
    dimensions: dimensionPercentages,
    interpretation,
    severity_level: severityLevel
  };
}
