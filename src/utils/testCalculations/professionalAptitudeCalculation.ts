
import { calculateSJTScore } from './sjtCalculation';

// This is now the managerial competencies test calculation
// which uses the SJT scoring system for evaluating managerial scenarios
export const calculateProfessionalAptitudeScore = (answers: Record<string, number>, questions: any[]) => {
  console.log('Managerial Competencies test calculation using SJT scoring system');
  return calculateSJTScore(answers, questions);
};
