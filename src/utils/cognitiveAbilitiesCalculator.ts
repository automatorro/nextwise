import { StandardizedScore } from '@/types/tests';

export interface CognitiveAbilitiesScore {
  overall: number;
  dimensions: {
    verbal: number;
    numeric: number;
    logic: number;
    spatial: number;
    abstract: number;
  };
  interpretation: string;
  details: string;
}

export const calculateCognitiveAbilitiesScoreFromDB = (answers: Record<string, number>, questions: any[]): StandardizedScore => {
  const scores = {
    verbal: 0,
    numeric: 0,
    logic: 0,
    spatial: 0,
    abstract: 0
  };
  
  const correctAnswers = {
    verbal: 0,
    numeric: 0,
    logic: 0,
    spatial: 0,
    abstract: 0
  };
  
  const totalQuestions = {
    verbal: 0,
    numeric: 0,
    logic: 0,
    spatial: 0,
    abstract: 0
  };

  // Calculate scores based on question data
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const questionNumber = parseInt(questionId.split('-')[1]) || 1;
      
      // Map questions to dimensions
      let dimension: keyof typeof scores;
      if (questionNumber >= 1 && questionNumber <= 10) {
        dimension = 'verbal';
      } else if (questionNumber >= 11 && questionNumber <= 20) {
        dimension = 'numeric';
      } else if (questionNumber >= 21 && questionNumber <= 30) {
        dimension = 'logic';
      } else if (questionNumber >= 31 && questionNumber <= 40) {
        dimension = 'spatial';
      } else {
        dimension = 'abstract';
      }
      
      totalQuestions[dimension]++;
      
      // Check if answer is correct based on scoring weights or correct_answer
      let isCorrect = false;
      if (question.scoring_weights && Array.isArray(question.scoring_weights)) {
        const weights = question.scoring_weights as number[];
        if (weights[answer] === Math.max(...weights)) {
          isCorrect = true;
        }
      } else if (question.correct_answer !== undefined) {
        isCorrect = answer === question.correct_answer;
      }
      
      if (isCorrect) {
        correctAnswers[dimension]++;
      }
    }
  });
  
  // Calculate percentages
  const normalizedScores = Object.fromEntries(
    Object.entries(scores).map(([dimension, _]) => [
      dimension,
      totalQuestions[dimension as keyof typeof totalQuestions] > 0 
        ? Math.round((correctAnswers[dimension as keyof typeof correctAnswers] / totalQuestions[dimension as keyof typeof totalQuestions]) * 100)
        : 0
    ])
  ) as typeof scores;
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 5);
  
  let interpretation: string;
  if (overall >= 80) {
    interpretation = 'Aptitudini cognitive foarte dezvoltate - Performanță excelentă în toate domeniile';
  } else if (overall >= 65) {
    interpretation = 'Aptitudini cognitive bune - Performanță solidă cu puncte forte în anumite domenii';
  } else if (overall >= 50) {
    interpretation = 'Aptitudini cognitive moderate - Oportunități de îmbunătățire în mai multe domenii';
  } else {
    interpretation = 'Aptitudini cognitive în dezvoltare - Se recomandă antrenament suplimentar';
  }

  // Determine scale level based on overall score
  let scale_level: string;
  if (overall >= 80) {
    scale_level = 'Avansat';
  } else if (overall >= 65) {
    scale_level = 'Intermediar-Avansat';
  } else if (overall >= 50) {
    scale_level = 'Intermediar';
  } else if (overall >= 30) {
    scale_level = 'Începător-Intermediar';
  } else {
    scale_level = 'Începător';
  }

  // Convert dimensions to StandardizedScore format
  const dimensionsArray = Object.entries(normalizedScores).map(([id, score]) => ({
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1), // Capitalize first letter
    score
  }));

  // Calculate raw score as sum of correct answers
  const raw_score = Object.values(correctAnswers).reduce((sum, count) => sum + count, 0);
  // Calculate max score as sum of total questions
  const max_score = Object.values(totalQuestions).reduce((sum, count) => sum + count, 0);

  return {
    type: 'scale',
    overall,
    dimensions: dimensionsArray,
    interpretation,
    scale_level,
    raw_score,
    max_score,
    details: `Ai obținut ${overall}% din punctajul total posibil în testul de aptitudini cognitive.`
  };
};

export const calculateCognitiveAbilitiesScoreFallback = (answers: Record<string, number>): StandardizedScore => {
  const scores = {
    verbal: 0,
    numeric: 0,
    logic: 0,
    spatial: 0,
    abstract: 0
  };
  
  const correctAnswers = {
    verbal: 0,
    numeric: 0,
    logic: 0,
    spatial: 0,
    abstract: 0
  };
  
  const totalQuestions = {
    verbal: 0,
    numeric: 0,
    logic: 0,
    spatial: 0,
    abstract: 0
  };
  
  // Calculul bazat pe răspunsurile corecte (presupunem că toate întrebările sunt la fel de importante)
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1]) || 1;
    
    // Maparea întrebărilor la dimensiuni
    let dimension: keyof typeof scores;
    if (questionNumber >= 1 && questionNumber <= 10) {
      dimension = 'verbal';
    } else if (questionNumber >= 11 && questionNumber <= 20) {
      dimension = 'numeric';
    } else if (questionNumber >= 21 && questionNumber <= 30) {
      dimension = 'logic';
    } else if (questionNumber >= 31 && questionNumber <= 40) {
      dimension = 'spatial';
    } else {
      dimension = 'abstract';
    }
    
    totalQuestions[dimension]++;
    
    // Presupunem că răspunsul este corect (ar trebui să fie înlocuit cu logica reală)
    correctAnswers[dimension]++;
  });
  
  // Calculul procentajelor
  const normalizedScores = Object.fromEntries(
    Object.entries(scores).map(([dimension, _]) => [
      dimension,
      totalQuestions[dimension as keyof typeof totalQuestions] > 0 
        ? Math.round((correctAnswers[dimension as keyof typeof correctAnswers] / totalQuestions[dimension as keyof typeof totalQuestions]) * 100)
        : 0
    ])
  ) as typeof scores;
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 5);
  
  let interpretation: string;
  if (overall >= 80) {
    interpretation = 'Aptitudini cognitive foarte dezvoltate - Performanță excelentă în toate domeniile';
  } else if (overall >= 65) {
    interpretation = 'Aptitudini cognitive bune - Performanță solidă cu puncte forte în anumite domenii';
  } else if (overall >= 50) {
    interpretation = 'Aptitudini cognitive moderate - Oportunități de îmbunătățire în mai multe domenii';
  } else {
    interpretation = 'Aptitudini cognitive în dezvoltare - Se recomandă antrenament suplimentar';
  }

  // Return StandardizedScore format
  return {
    type: 'scale',
    overall,
    dimensions: Object.entries(normalizedScores).map(([id, score]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      score
    })),
    interpretation,
    scale_level: determineScaleLevel(overall),
    raw_score: 0, // Fallback doesn't have access to raw scores
    max_score: 50, // Assuming 50 questions total
    details: `Ai obținut ${overall}% din punctajul total posibil în testul de aptitudini cognitive.`
  };
};

// Helper function to determine scale level
function determineScaleLevel(overall: number): string {
  if (overall >= 80) {
    return 'Avansat';
  } else if (overall >= 65) {
    return 'Intermediar-Avansat';
  } else if (overall >= 50) {
    return 'Intermediar';
  } else if (overall >= 30) {
    return 'Începător-Intermediar';
  } else {
    return 'Începător';
  }
}
