
export const calculateWatsonGlaserScore = (answers: Record<string, number>) => {
  console.log('Calculating Watson-Glaser score with answers:', answers);
  
  // Define the sections and their question ranges
  const sections = {
    inference: { start: 1, end: 8, name: 'Inferențe' },
    assumptions: { start: 9, end: 16, name: 'Asumpții' },
    deduction: { start: 17, end: 24, name: 'Deducție' },
    interpretation: { start: 25, end: 32, name: 'Interpretare' },
    evaluation: { start: 33, end: 40, name: 'Evaluarea argumentelor' }
  };

  // Correct answers for each question (0-indexed)
  const correctAnswers: Record<number, number> = {
    1: 4, 2: 2, 3: 3, 4: 2, 5: 4, 6: 4, 7: 3, 8: 2, // Inference
    9: 0, 10: 0, 11: 1, 12: 0, 13: 1, 14: 0, 15: 1, 16: 0, // Assumptions
    17: 0, 18: 0, 19: 1, 20: 0, 21: 1, 22: 0, 23: 1, 24: 1, // Deduction
    25: 0, 26: 1, 27: 1, 28: 0, 29: 0, 30: 1, 31: 0, 32: 1, // Interpretation
    33: 0, 34: 1, 35: 1, 36: 0, 37: 1, 38: 0, 39: 1, 40: 0  // Evaluation
  };

  let totalCorrect = 0;
  let totalQuestions = 0;
  const dimensionScores: Record<string, number> = {};

  // Calculate scores for each section
  Object.entries(sections).forEach(([key, section]) => {
    let sectionCorrect = 0;
    let sectionTotal = 0;

    for (let i = section.start; i <= section.end; i++) {
      const userAnswer = answers[i.toString()];
      const correctAnswer = correctAnswers[i];
      
      if (userAnswer !== undefined) {
        sectionTotal++;
        totalQuestions++;
        
        if (userAnswer === correctAnswer) {
          sectionCorrect++;
          totalCorrect++;
        }
      }
    }

    // Calculate percentage for this dimension
    const sectionPercentage = sectionTotal > 0 ? Math.round((sectionCorrect / sectionTotal) * 100) : 0;
    dimensionScores[key] = sectionPercentage;
  });

  // Calculate overall score
  const overallScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const result = {
    overall: overallScore,
    dimensions: dimensionScores,
    interpretations: {
      inference: getScoreInterpretation(dimensionScores.inference),
      assumptions: getScoreInterpretation(dimensionScores.assumptions),
      deduction: getScoreInterpretation(dimensionScores.deduction),
      interpretation: getScoreInterpretation(dimensionScores.interpretation),
      evaluation: getScoreInterpretation(dimensionScores.evaluation)
    }
  };

  console.log('Watson-Glaser calculated result:', result);
  return result;
};

const getScoreInterpretation = (score: number): string => {
  if (score >= 80) return 'Excelent';
  if (score >= 60) return 'Bun';
  if (score >= 40) return 'Mediu';
  return 'Necesită îmbunătățire';
};
