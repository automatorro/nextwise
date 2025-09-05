import { StandardizedScore } from '@/types/tests';

export interface ManagerialCompetenciesScore {
  overall: number;
  dimensions: {
    leadership: number;
    strategic_thinking: number;
    decision_making: number;
    communication: number;
    team_management: number;
    problem_solving: number;
    adaptability: number;
  };
  interpretation: string;
}

/**
 * Calculates the score for the Managerial Competencies test
 * @param answers - Object containing question IDs as keys and answer values (typically 0-4)
 * @returns StandardizedScore object with scale type
 */
export const calculateManagerialCompetenciesScore = (answers: Record<string, number>): StandardizedScore => {
  // Default dimensions with 0 scores
  const dimensions = {
    leadership: 0,
    strategic_thinking: 0,
    decision_making: 0,
    communication: 0,
    team_management: 0,
    problem_solving: 0,
    adaptability: 0
  };
  
  // Count questions per dimension
  const questionCounts = {
    leadership: 0,
    strategic_thinking: 0,
    decision_making: 0,
    communication: 0,
    team_management: 0,
    problem_solving: 0,
    adaptability: 0
  };

  // Map question IDs to dimensions
  // Assuming question IDs follow a pattern like "q-1", "q-2", etc.
  Object.entries(answers).forEach(([questionId, value]) => {
    const questionNum = parseInt(questionId.split('-')[1] || '0');
    
    // Map questions to dimensions based on question number
    // This mapping should be adjusted based on the actual test structure
    let dimension: keyof typeof dimensions;
    
    if (questionNum >= 1 && questionNum <= 5) {
      dimension = 'leadership';
    } else if (questionNum >= 6 && questionNum <= 10) {
      dimension = 'strategic_thinking';
    } else if (questionNum >= 11 && questionNum <= 15) {
      dimension = 'decision_making';
    } else if (questionNum >= 16 && questionNum <= 20) {
      dimension = 'communication';
    } else if (questionNum >= 21 && questionNum <= 25) {
      dimension = 'team_management';
    } else if (questionNum >= 26 && questionNum <= 30) {
      dimension = 'problem_solving';
    } else {
      dimension = 'adaptability';
    }
    
    // Add the answer value to the dimension score
    dimensions[dimension] += value;
    questionCounts[dimension]++;
  });
  
  // Calculate percentage scores for each dimension
  const normalizedDimensions = Object.fromEntries(
    Object.entries(dimensions).map(([dimension, score]) => {
      const count = questionCounts[dimension as keyof typeof questionCounts];
      // Each question is scored 0-4, so max score per question is 4
      const maxPossible = count * 4;
      return [dimension, maxPossible > 0 ? Math.round((score / maxPossible) * 100) : 0];
    })
  ) as typeof dimensions;
  
  // Calculate overall score as average of all dimensions
  const overall = Math.round(
    Object.values(normalizedDimensions).reduce((sum, score) => sum + score, 0) / 
    Object.keys(normalizedDimensions).length
  );
  
  // Determine interpretation based on overall score
  let interpretation: string;
  if (overall >= 85) {
    interpretation = 'Competențe manageriale excelente - Demonstrați abilități de leadership de nivel înalt';
  } else if (overall >= 70) {
    interpretation = 'Competențe manageriale bune - Aveți o bază solidă pentru roluri de conducere';
  } else if (overall >= 50) {
    interpretation = 'Competențe manageriale moderate - Există oportunități de dezvoltare în anumite domenii';
  } else {
    interpretation = 'Competențe manageriale în dezvoltare - Se recomandă training și mentorat';
  }
  
  // Determine scale level based on overall score
  let scale_level: string;
  if (overall >= 85) {
    scale_level = 'Expert';
  } else if (overall >= 70) {
    scale_level = 'Avansat';
  } else if (overall >= 50) {
    scale_level = 'Intermediar';
  } else if (overall >= 30) {
    scale_level = 'Începător';
  } else {
    scale_level = 'Novice';
  }
  
  // Convert dimensions to StandardizedScore format
  const dimensionsArray = Object.entries(normalizedDimensions).map(([id, score]) => ({
    id,
    name: id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), // Convert snake_case to Title Case
    score
  }));
  
  // Calculate raw score as sum of all answer values
  const raw_score = Object.values(answers).reduce((sum, value) => sum + value, 0);
  
  // Calculate max score (assuming each question is scored 0-4)
  const max_score = Object.keys(answers).length * 4;
  
  return {
    type: 'scale',
    overall,
    dimensions: dimensionsArray,
    interpretation,
    scale_level,
    raw_score,
    max_score
  };
};