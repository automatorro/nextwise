
export interface Question {
  id: string;
  question_text: string;
  question_order: number;
  options: any[];
  scoring_weights?: any;
}

export const getBestAnswerOption = (question: Question) => {
  if (!question.scoring_weights) return null;
  
  console.log('Analyzing scoring weights for question:', question.question_order, question.scoring_weights);
  
  let maxScore = -1;
  let bestOptionValue = null;
  
  // Parcurge scoring_weights cu structura {option_value: {dimension: score}}
  Object.entries(question.scoring_weights).forEach(([optionValue, dimensionScores]: [string, any]) => {
    if (typeof dimensionScores === 'object' && dimensionScores !== null) {
      // Calculează scorul total pentru această opțiune pe toate dimensiunile
      let totalScore = 0;
      Object.values(dimensionScores).forEach((score: any) => {
        if (typeof score === 'number') {
          totalScore += score;
        }
      });
      
      if (totalScore > maxScore) {
        maxScore = totalScore;
        bestOptionValue = parseInt(optionValue);
      }
    }
  });
  
  console.log('Best option for question', question.question_order, ':', bestOptionValue, 'with total score:', maxScore);
  return bestOptionValue;
};

export const getUserScore = (question: Question, userAnswer: number) => {
  if (!question.scoring_weights || userAnswer === undefined) return 0;
  
  // Găsește scorul pentru răspunsul utilizatorului
  const userAnswerScores = question.scoring_weights[userAnswer.toString()];
  if (!userAnswerScores) return 0;
  
  let totalScore = 0;
  if (typeof userAnswerScores === 'object' && userAnswerScores !== null) {
    Object.values(userAnswerScores).forEach((score: any) => {
      if (typeof score === 'number') {
        totalScore += score;
      }
    });
  }
  
  return totalScore;
};

export const getMaxPossibleScore = (question: Question) => {
  if (!question.scoring_weights) return 0;
  
  let maxScore = 0;
  
  // Găsește scorul maxim posibil pentru această întrebare
  Object.values(question.scoring_weights).forEach((dimensionScores: any) => {
    if (typeof dimensionScores === 'object' && dimensionScores !== null) {
      let totalScoreForOption = 0;
      Object.values(dimensionScores).forEach((score: any) => {
        if (typeof score === 'number') {
          totalScoreForOption += score;
        }
      });
      if (totalScoreForOption > maxScore) {
        maxScore = totalScoreForOption;
      }
    }
  });
  
  return maxScore;
};

export const getOptionLabel = (question: Question, optionValue: number) => {
  const option = question.options.find((opt: any) => opt.value === optionValue);
  return option ? option.label : `Opțiunea ${optionValue}`;
};
