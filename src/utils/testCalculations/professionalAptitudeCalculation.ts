
import { calculateSJTScore } from './sjtCalculation';

// This is now just a wrapper that calls the SJT calculation
// since the Professional Aptitude test is actually an SJT test
export const calculateProfessionalAptitudeScore = (answers: Record<string, number>, questions: any[]) => {
  console.log('Professional Aptitude calculation redirecting to SJT calculation');
  return calculateSJTScore(answers, questions);
};
