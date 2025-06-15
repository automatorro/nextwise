
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
  [key: string]: number; // Add index signature for compatibility
}

export const useBigFiveCalculation = (answers: BigFiveAnswers | undefined) => {
  return useMemo(() => {
    console.log('useBigFiveCalculation called with answers:', answers);
    
    if (!answers) {
      console.log('No answers provided, returning zeros');
      return {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
      };
    }

    const answerKeys = Object.keys(answers);
    console.log('Answer keys:', answerKeys);
    
    // Check if we have UUID-based answers (Big Five test format)
    if (answerKeys.length === 0 || !answerKeys.some(key => key.length > 10)) {
      console.log('No valid UUID keys found, not a Big Five test');
      return {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0
      };
    }

    // For UUID-based answers, we need to map them to question positions
    // Based on the order they appear in the answers object
    const sortedAnswerEntries = Object.entries(answers);
    console.log('Sorted answer entries count:', sortedAnswerEntries.length);

    // Define which question positions belong to each dimension (1-based indexing)
    const dimensions = {
      openness: [1, 2, 3, 4, 5, 6, 7, 8],
      conscientiousness: [9, 10, 11, 12, 13, 14, 15, 16],
      extraversion: [17, 18, 19, 20, 21, 22, 23, 24],
      agreeableness: [25, 26, 27, 28, 29, 30, 31, 32],
      neuroticism: [33, 34, 35, 36, 37, 38, 39, 40]
    };

    // Define which questions are reverse scored (1-based positions)
    const reverseScored = [4, 5, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 37, 40];

    // Calculate scores for each dimension
    const dimensionScores: BigFiveDimensions = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0
    };

    // Calculate each dimension score using position-based mapping
    Object.entries(dimensions).forEach(([dimension, questionPositions]) => {
      let score = 0;
      let validAnswers = 0;
      
      questionPositions.forEach(position => {
        // Get the answer at this position (position is 1-based, array is 0-based)
        const answerIndex = position - 1;
        if (answerIndex < sortedAnswerEntries.length) {
          const [, answer] = sortedAnswerEntries[answerIndex];
          
          if (answer !== undefined && answer !== null) {
            // Apply reverse scoring if needed: (6 - answer)
            const adjustedScore = reverseScored.includes(position) ? (6 - answer) : answer;
            score += adjustedScore;
            validAnswers++;
            console.log(`Position ${position} (${dimension}): answer=${answer}, adjusted=${adjustedScore}, reverse=${reverseScored.includes(position)}`);
          }
        }
      });
      
      console.log(`Dimension ${dimension}: raw score=${score}, validAnswers=${validAnswers}`);
      dimensionScores[dimension as keyof BigFiveDimensions] = score;
    });

    // Convert raw scores to percentages (each dimension: 8-40 points -> 0-100%)
    const dimensionPercentages: BigFiveDimensions = {
      openness: Math.max(0, Math.min(100, Math.round(((dimensionScores.openness - 8) / 32) * 100))),
      conscientiousness: Math.max(0, Math.min(100, Math.round(((dimensionScores.conscientiousness - 8) / 32) * 100))),
      extraversion: Math.max(0, Math.min(100, Math.round(((dimensionScores.extraversion - 8) / 32) * 100))),
      agreeableness: Math.max(0, Math.min(100, Math.round(((dimensionScores.agreeableness - 8) / 32) * 100))),
      neuroticism: Math.max(0, Math.min(100, Math.round(((dimensionScores.neuroticism - 8) / 32) * 100)))
    };

    console.log('Final dimension percentages:', dimensionPercentages);
    console.log('Raw dimension scores:', dimensionScores);
    
    return dimensionPercentages;
  }, [answers]);
};
