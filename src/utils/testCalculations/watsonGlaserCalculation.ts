
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
  
  // Define correct answers for each question (1-indexed)
  const correctAnswers: { [key: number]: number } = {
    // Secțiunea 1: Inferențe (întrebările 1-8)
    1: 3, // Insuficientă informație
    2: 4, // Probabil adevărat
    3: 2, // Probabil fals
    4: 4, // Probabil adevărat
    5: 3, // Insuficientă informație
    6: 3, // Insuficientă informație
    7: 4, // Probabil adevărat
    8: 4, // Probabil adevărat
    
    // Secțiunea 2: Asumpții (întrebările 9-16)
    9: 1,  // Da
    10: 1, // Da
    11: 0, // Nu
    12: 1, // Da
    13: 0, // Nu
    14: 1, // Da
    15: 0, // Nu
    16: 1, // Da
    
    // Secțiunea 3: Deducție (întrebările 17-24)
    17: 0, // Nu urmează logic
    18: 1, // Urmează logic
    19: 0, // Nu urmează logic
    20: 1, // Urmează logic
    21: 1, // Urmează logic
    22: 0, // Nu urmează logic
    23: 0, // Nu urmează logic
    24: 1, // Urmează logic
    
    // Secțiunea 4: Interpretarea (întrebările 25-32)
    25: 1, // Concluzia urmează
    26: 0, // Concluzia nu urmează
    27: 0, // Concluzia nu urmează
    28: 1, // Concluzia urmează
    29: 1, // Concluzia urmează
    30: 0, // Concluzia nu urmează
    31: 1, // Concluzia urmează
    32: 1, // Concluzia urmează
    
    // Secțiunea 5: Evaluarea argumentelor (întrebările 33-40)
    33: 1, // Puternic
    34: 0, // Slab
    35: 0, // Slab
    36: 1, // Puternic
    37: 0, // Slab
    38: 1, // Puternic
    39: 0, // Slab
    40: 1  // Puternic
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
