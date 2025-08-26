
export interface WatsonGlaserScore {
  overall: number;
  dimensions: {
    inference: number;
    assumptions: number;
    deduction: number;
    interpretation: number;
    argument_evaluation: number;
  };
  interpretations: {
    inference: string;
    assumptions: string;
    deduction: string;
    interpretation: string;
    argument_evaluation: string;
  };
  performance_level: string;
}

import { StandardizedScore } from '@/types/tests';

export const calculateWatsonGlaserScore = (answers: Record<string, number>): StandardizedScore => {
  console.log('Watson-Glaser calculation - received answers:', answers);
  
  const scores = {
    inference: 0,
    assumptions: 0,
    deduction: 0,
    interpretation: 0,
    argument_evaluation: 0
  };
  
  // Correct answers for each question (1-based indexing for easier mapping)
  const correctAnswers: Record<number, number> = {
    // Inference questions (1-8) - assessing logical reasoning
    1: 2, // Probabil - reasonable inference from data
    2: 2, // Probabil - logical connection between reading and vocabulary
    3: 1, // Insuficient de probabil - past growth doesn't guarantee future
    4: 3, // Foarte puțin probabil - overgeneralization from preference data
    5: 2, // Insuficient de probabil - results may vary between companies
    6: 2, // Probabil - reasonable inference from study data
    7: 2, // Insuficient de probabil - correlation doesn't prove universal solution
    8: 3, // Foarte puțin probabil - overgeneralization from satisfaction data
    
    // Assumptions questions (9-16) - identifying underlying assumptions
    9: 1, // Asumpție făcută - assumes training leads to productivity
    10: 1, // Asumpție făcută - assumes more budget improves performance
    11: 1, // Asumpție făcută - assumes exercise is beneficial
    12: 1, // Asumpție făcută - assumes more police reduce crime
    13: 1, // Asumpție făcută - assumes new tech provides advantages
    14: 1, // Asumpție făcută - assumes screens affect vision
    15: 1, // Asumpție făcută - assumes higher taxes improve services
    16: 1, // Asumpție făcută - assumes carbon emissions cause climate change
    
    // Deduction questions (17-24) - logical conclusions
    17: 1, // Concluzia urmează - valid logical deduction
    18: 2, // Concluzia nu urmează - invalid generalization
    19: 1, // Concluzia urmează - valid logical deduction
    20: 1, // Concluzia urmează - valid logical deduction
    21: 1, // Concluzia urmează - valid logical deduction
    22: 1, // Concluzia urmează - valid logical deduction
    23: 1, // Concluzia urmează - valid logical deduction
    24: 1, // Concluzia urmează - valid logical deduction
    
    // Interpretation questions (25-32) - drawing reasonable conclusions
    25: 2, // Interpretarea nu urmează - sample may not represent whole market
    26: 2, // Interpretarea nu urmează - extreme interpretation of small decline
    27: 1, // Interpretarea urmează - 60% is majority
    28: 2, // Interpretarea nu urmează - correlation doesn't prove causation
    29: 2, // Interpretarea nu urmează - reduction in risk doesn't mean prevention
    30: 1, // Interpretarea urmează - reasonable interpretation of correlation
    31: 1, // Interpretarea urmează - reasonable interpretation
    32: 2, // Interpretarea nu urmează - flexibility is not the only factor
    
    // Argument evaluation questions (33-40) - assessing argument strength
    33: 1, // Argument puternic - presents clear benefits and reasoning
    34: 2, // Argument slab - personal preference, not logical reasoning
    35: 1, // Argument puternic - presents clear benefits and reasoning
    36: 2, // Argument slab - personal preference, not logical reasoning
    37: 1, // Argument puternic - presents multiple clear benefits
    38: 2, // Argument slab - convenience doesn't outweigh environmental impact
    39: 1, // Argument puternic - presents clear educational benefits
    40: 2  // Argument slab - personal preference, ignores health concerns
  };
  
  // Calculate scores for each dimension
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.replace('wg-q', '').replace('q', ''));
    const correctAnswer = correctAnswers[questionNumber];
    
    if (correctAnswer && answer === correctAnswer) {
      if (questionNumber >= 1 && questionNumber <= 8) {
        scores.inference += 1;
      } else if (questionNumber >= 9 && questionNumber <= 16) {
        scores.assumptions += 1;
      } else if (questionNumber >= 17 && questionNumber <= 24) {
        scores.deduction += 1;
      } else if (questionNumber >= 25 && questionNumber <= 32) {
        scores.interpretation += 1;
      } else if (questionNumber >= 33 && questionNumber <= 40) {
        scores.argument_evaluation += 1;
      }
    }
  });
  
  // Convert to percentages (8 questions per dimension)
  const normalizedScores = {
    inference: Math.round((scores.inference / 8) * 100),
    assumptions: Math.round((scores.assumptions / 8) * 100),
    deduction: Math.round((scores.deduction / 8) * 100),
    interpretation: Math.round((scores.interpretation / 8) * 100),
    argument_evaluation: Math.round((scores.argument_evaluation / 8) * 100)
  };
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 5);
  
  // Performance level assessment
  let performance_level = "";
  if (overall >= 85) {
    performance_level = "Superior - Abilități excepționale de gândire critică";
  } else if (overall >= 70) {
    performance_level = "Peste media - Abilități bune de gândire critică";
  } else if (overall >= 55) {
    performance_level = "Mediu - Abilități moderate de gândire critică";
  } else if (overall >= 40) {
    performance_level = "Sub mediu - Abilități limitate de gândire critică";
  } else {
    performance_level = "Scăzut - Necesită dezvoltarea abilităților de gândire critică";
  }
  
  // Detailed interpretations for each dimension
  const getInterpretation = (score: number, dimension: string) => {
    if (score >= 75) {
      return `Excelent la ${dimension} - demonstrezi abilități puternice în această dimensiune a gândirii critice.`;
    } else if (score >= 60) {
      return `Bun la ${dimension} - ai competențe solide, dar mai există loc de îmbunătățire.`;
    } else if (score >= 45) {
      return `Moderat la ${dimension} - abilități de bază prezente, dar necesită dezvoltare suplimentară.`;
    } else {
      return `Necesită îmbunătățire la ${dimension} - se recomandă focalizarea pe dezvoltarea acestei competențe.`;
    }
  };
  
  const interpretations = {
    inference: getInterpretation(normalizedScores.inference, "inferențe"),
    assumptions: getInterpretation(normalizedScores.assumptions, "identificarea asumpțiilor"),
    deduction: getInterpretation(normalizedScores.deduction, "deducție logică"),
    interpretation: getInterpretation(normalizedScores.interpretation, "interpretarea datelor"),
    argument_evaluation: getInterpretation(normalizedScores.argument_evaluation, "evaluarea argumentelor")
  };
  
  console.log('Watson-Glaser final score:', {
    overall,
    dimensions: normalizedScores,
    performance_level,
    interpretations
  });
  
  return {
    type: 'dimensional',
    overall,
    dimensions: Object.entries(normalizedScores).map(([key, value]) => ({
      id: key,
      name: key,
      score: value
    })),
    detailed_interpretations: interpretations,
    interpretation: performance_level,
    raw_score: Object.values(scores).reduce((sum, score) => sum + score, 0),
    max_score: 40 // 40 questions total
  };
};
