
export interface CognitiveScore {
  overall: number;
  dimensions: {
    verbal: number;
    numeric: number;
    logic: number;
    spatial: number;
    abstract: number;
  };
  interpretation: string;
}

export const calculateCognitiveScore = (answers: Record<string, number>, questions: any[]): CognitiveScore => {
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
  
  // Calculul bazat pe răspunsurile corecte
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.scoring_weights) {
      const weights = question.scoring_weights as number[];
      const questionNumber = parseInt(questionId.split('-')[1]);
      
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
      
      // Verificăm dacă răspunsul este corect
      if (weights[answer] === Math.max(...weights)) {
        correctAnswers[dimension]++;
      }
    }
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
  
  return {
    overall,
    dimensions: normalizedScores,
    interpretation
  };
};
