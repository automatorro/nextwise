
export interface WatsonGlaserScore {
  overall: number;
  raw_score: number;
  max_score: number;
  dimensions: {
    inferences: number;
    assumptions: number;
    deduction: number;
    interpretation: number;
    argument_evaluation: number;
  };
  interpretation: string;
  level: string;
  section_scores: {
    inferences: number;
    assumptions: number;
    deduction: number;
    interpretation: number;
    argument_evaluation: number;
  };
}

export function calculateWatsonGlaserScore(answers: { [key: string]: number }): WatsonGlaserScore {
  console.log('Calculating Watson-Glaser score for answers:', answers);
  
  // Initialize section scores
  const sectionScores = {
    inferences: 0,
    assumptions: 0,
    deduction: 0,
    interpretation: 0,
    argument_evaluation: 0
  };
  
  // Define correct answers for each question (0-indexed for options array)
  const correctAnswers: { [key: number]: number } = {
    // Secțiunea 1: Inferențe (întrebările 1-8)
    1: 4, // Date insuficiente
    2: 2, // Probabil adevărat
    3: 3, // Probabil fals
    4: 2, // Probabil adevărat
    5: 4, // Date insuficiente
    6: 4, // Date insuficiente
    7: 3, // Probabil fals
    8: 2, // Probabil adevărat
    
    // Secțiunea 2: Asumpții (întrebările 9-16)
    9: 0,  // Da
    10: 0, // Da
    11: 1, // Nu
    12: 0, // Da
    13: 1, // Nu
    14: 0, // Da
    15: 1, // Nu
    16: 0, // Da
    
    // Secțiunea 3: Deducție (întrebările 17-24)
    17: 0, // Urmează logic
    18: 0, // Urmează logic
    19: 1, // Nu urmează logic
    20: 0, // Urmează logic
    21: 1, // Nu urmează logic
    22: 0, // Urmează logic
    23: 1, // Nu urmează logic
    24: 1, // Nu urmează logic
    
    // Secțiunea 4: Interpretarea (întrebările 25-32)
    25: 0, // Concluzia urmează
    26: 1, // Concluzia nu urmează
    27: 1, // Concluzia nu urmează
    28: 0, // Concluzia urmează
    29: 0, // Concluzia urmează
    30: 1, // Concluzia nu urmează
    31: 0, // Concluzia urmează
    32: 1, // Concluzia nu urmează
    
    // Secțiunea 5: Evaluarea argumentelor (întrebările 33-40)
    33: 0, // Argument puternic
    34: 1, // Argument slab
    35: 1, // Argument slab
    36: 0, // Argument puternic
    37: 1, // Argument slab
    38: 0, // Argument puternic
    39: 1, // Argument slab
    40: 0  // Argument puternic
  };
  
  let totalScore = 0;
  
  // Calculate scores for each section
  Object.entries(answers).forEach(([questionId, selectedAnswer]) => {
    const questionNumber = parseInt(questionId.split('-').pop() || '0');
    const correctAnswer = correctAnswers[questionNumber];
    
    if (selectedAnswer === correctAnswer) {
      totalScore += 1;
      
      // Add to appropriate section
      if (questionNumber >= 1 && questionNumber <= 8) {
        sectionScores.inferences += 1;
      } else if (questionNumber >= 9 && questionNumber <= 16) {
        sectionScores.assumptions += 1;
      } else if (questionNumber >= 17 && questionNumber <= 24) {
        sectionScores.deduction += 1;
      } else if (questionNumber >= 25 && questionNumber <= 32) {
        sectionScores.interpretation += 1;
      } else if (questionNumber >= 33 && questionNumber <= 40) {
        sectionScores.argument_evaluation += 1;
      }
    }
  });
  
  // Convert section scores to percentages
  const sectionPercentages = {
    inferences: Math.round((sectionScores.inferences / 8) * 100),
    assumptions: Math.round((sectionScores.assumptions / 8) * 100),
    deduction: Math.round((sectionScores.deduction / 8) * 100),
    interpretation: Math.round((sectionScores.interpretation / 8) * 100),
    argument_evaluation: Math.round((sectionScores.argument_evaluation / 8) * 100)
  };
  
  // Determine level and interpretation based on total score
  let level = '';
  let interpretation = '';
  
  if (totalScore >= 33) {
    level = 'Excelent';
    interpretation = 'Gândire critică avansată - Te afli în top 10% din populație. Poți analiza complex informațiile și lua decizii logice fundamentate.';
  } else if (totalScore >= 25) {
    level = 'Bun';
    interpretation = 'Gândire critică peste medie - Ai abilități bune de raționament logic și poți identifica majoritatea erorilor de gândire.';
  } else if (totalScore >= 17) {
    level = 'Mediu';
    interpretation = 'Gândire critică la nivel mediu - Poți îmbunătăți prin antrenament abilitățile de analiză logică și evaluare a argumentelor.';
  } else {
    level = 'Sub medie';
    interpretation = 'Gândire critică sub medie - Ai nevoie de antrenament în raționament logic și dezvoltarea abilităților de gândire critică.';
  }
  
  const overallPercentage = Math.round((totalScore / 40) * 100);
  
  console.log('Watson-Glaser score calculated:', {
    totalScore,
    overallPercentage,
    level,
    sectionScores,
    sectionPercentages
  });
  
  return {
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: 40,
    dimensions: sectionPercentages,
    interpretation,
    level,
    section_scores: sectionScores
  };
}
