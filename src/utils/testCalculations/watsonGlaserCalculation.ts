
export const calculateWatsonGlaserScore = (answers: Record<string, number>) => {
  console.log('Calculating Watson-Glaser score with answers:', answers);
  
  // Define the sections and their question ranges
  const sections = {
    inferences: { start: 1, end: 8, name: 'Inferențe' },
    assumptions: { start: 9, end: 16, name: 'Asumpții' }, 
    deduction: { start: 17, end: 24, name: 'Deducție' },
    interpretation: { start: 25, end: 32, name: 'Interpretarea' },
    argument_evaluation: { start: 33, end: 40, name: 'Evaluarea Argumentelor' }
  };

  // Correct answers for each question (0-indexed values matching the database)
  const correctAnswers: Record<number, number> = {
    // Inference questions (1-8) - "Insuficient de probabil" = index 1
    1: 1, 2: 0, 3: 0, 4: 1, 5: 3, 6: 1, 7: 3, 8: 1,
    
    // Assumptions questions (9-16) - binary choice: "Asumpție făcută" = 0, "Asumpție nu este făcută" = 1
    9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0,
    
    // Deduction questions (17-24) - binary choice: "Concluzia urmează" = 0, "Concluzia nu urmează" = 1
    17: 0, 18: 1, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0,
    
    // Interpretation questions (25-32) - binary choice: "Interpretarea urmează" = 0, "Interpretarea nu urmează" = 1
    25: 1, 26: 1, 27: 0, 28: 0, 29: 1, 30: 0, 31: 0, 32: 1,
    
    // Argument Evaluation questions (33-40) - binary choice: "Argument puternic" = 0, "Argument slab" = 1
    33: 0, 34: 1, 35: 0, 36: 1, 37: 0, 38: 1, 39: 0, 40: 1
  };

  let totalCorrect = 0;
  let totalQuestions = 0;
  const dimensionScores: Record<string, number> = {};
  const sectionScores: Record<string, number> = {};

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

    // Store raw section scores
    sectionScores[key] = sectionCorrect;
    
    // Calculate percentage for this dimension
    const sectionPercentage = sectionTotal > 0 ? Math.round((sectionCorrect / sectionTotal) * 100) : 0;
    dimensionScores[key] = sectionPercentage;
  });

  // Calculate overall score
  const overallScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  
  // Determine performance level
  let level = 'Slab';
  let interpretation = 'Performanță slabă în gândirea critică. Se recomandă dezvoltarea sistematică a abilităților de analiză logică.';
  
  if (overallScore >= 85) {
    level = 'Excelent';
    interpretation = 'Performanță excelentă în gândirea critică. Abilități foarte dezvoltate de analiză logică și evaluare critică.';
  } else if (overallScore >= 70) {
    level = 'Bun';
    interpretation = 'Performanță bună în gândirea critică. Abilități solide de analiză cu potențial de îmbunătățire în anumite domenii.';
  } else if (overallScore >= 55) {
    level = 'Mediu';
    interpretation = 'Performanță medie în gândirea critică. Există o bază solidă, dar sunt necesare îmbunătățiri în mai multe domenii.';
  }

  const result = {
    overall: overallScore,
    raw_score: totalCorrect,
    max_score: totalQuestions,
    dimensions: dimensionScores,
    section_scores: sectionScores,
    interpretation,
    level,
    details: {
      inferences: {
        score: dimensionScores.inferences,
        correct: sectionScores.inferences,
        total: 8,
        description: 'Capacitatea de a trage concluzii logice pe baza informațiilor disponibile'
      },
      assumptions: {
        score: dimensionScores.assumptions,
        correct: sectionScores.assumptions,
        total: 8,
        description: 'Capacitatea de a identifica presupunerile ascunse într-un argument'
      },
      deduction: {
        score: dimensionScores.deduction,
        correct: sectionScores.deduction,
        total: 8,
        description: 'Capacitatea de a determina dacă concluziile urmează logic din premise'
      },
      interpretation: {
        score: dimensionScores.interpretation,
        correct: sectionScores.interpretation,
        total: 8,
        description: 'Capacitatea de a interpreta corect informațiile și evidențele'
      },
      argument_evaluation: {
        score: dimensionScores.argument_evaluation,
        correct: sectionScores.argument_evaluation,
        total: 8,
        description: 'Capacitatea de a evalua puterea și validitatea argumentelor'
      }
    }
  };

  console.log('Watson-Glaser calculated result:', result);
  return result;
};

// Funcție helper pentru interpretarea scorurilor
const getScoreInterpretation = (score: number): string => {
  if (score >= 85) return 'Excelent';
  if (score >= 70) return 'Bun';
  if (score >= 55) return 'Mediu';
  return 'Slab';
};

export { getScoreInterpretation };
