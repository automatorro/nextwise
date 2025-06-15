
import { useMemo } from 'react';

interface BigFiveAnswers {
  [key: string]: number;
}

interface BigFiveDimensions {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export const useBigFiveCalculation = (answers: BigFiveAnswers | undefined) => {
  return useMemo(() => {
    if (!answers) {
      return {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
      };
    }

    // Define which questions belong to each dimension (40 questions total, 8 per dimension)
    const dimensions = {
      openness: [1, 2, 3, 4, 5, 6, 7, 8],
      conscientiousness: [9, 10, 11, 12, 13, 14, 15, 16],
      extraversion: [17, 18, 19, 20, 21, 22, 23, 24],
      agreeableness: [25, 26, 27, 28, 29, 30, 31, 32],
      neuroticism: [33, 34, 35, 36, 37, 38, 39, 40]
    };

    // Define which questions are reverse scored
    const reverseScored = [4, 5, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 37, 40];

    // Calculate scores for each dimension
    const dimensionScores: BigFiveDimensions = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0
    };

    // Calculate each dimension score
    Object.entries(dimensions).forEach(([dimension, questionNumbers]) => {
      let score = 0;
      questionNumbers.forEach(questionNum => {
        const answer = answers[questionNum.toString()];
        if (answer !== undefined) {
          // Apply reverse scoring if needed: (6 - answer)
          const adjustedScore = reverseScored.includes(questionNum) ? (6 - answer) : answer;
          score += adjustedScore;
        }
      });
      dimensionScores[dimension as keyof BigFiveDimensions] = score;
    });

    // Convert raw scores to percentages (each dimension: 8-40 points -> 0-100%)
    const dimensionPercentages: BigFiveDimensions = {
      openness: Math.round(((dimensionScores.openness - 8) / 32) * 100),
      conscientiousness: Math.round(((dimensionScores.conscientiousness - 8) / 32) * 100),
      extraversion: Math.round(((dimensionScores.extraversion - 8) / 32) * 100),
      agreeableness: Math.round(((dimensionScores.agreeableness - 8) / 32) * 100),
      neuroticism: Math.round(((dimensionScores.neuroticism - 8) / 32) * 100)
    };

    return dimensionPercentages;
  }, [answers]);
};
