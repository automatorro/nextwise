
// Professional Aptitude Test Scoring Calculation
export const calculateProfessionalAptitudeScore = (answers: Record<string, number>, questions: any[]) => {
  console.log('Calculating professional aptitude score for answers:', answers);
  
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Categories for detailed analysis
  const categories = {
    logicalReasoning: { score: 0, max: 0, questions: [] as number[] },
    problemSolving: { score: 0, max: 0, questions: [] as number[] },
    readingComprehension: { score: 0, max: 0, questions: [] as number[] },
    basicMath: { score: 0, max: 0, questions: [] as number[] },
    communication: { score: 0, max: 0, questions: [] as number[] },
    teamwork: { score: 0, max: 0, questions: [] as number[] }
  };
  
  questions.forEach((question, index) => {
    const questionId = question.id;
    const userAnswer = answers[questionId];
    const questionOrder = question.question_order;
    
    if (userAnswer !== undefined && question.scoring_weights) {
      const weights = Array.isArray(question.scoring_weights) 
        ? question.scoring_weights 
        : JSON.parse(question.scoring_weights);
      
      const score = weights[userAnswer] || 0;
      const maxScore = Math.max(...weights);
      
      totalScore += score;
      maxPossibleScore += maxScore;
      
      // Categorize questions by order
      if (questionOrder >= 1 && questionOrder <= 5) {
        categories.logicalReasoning.score += score;
        categories.logicalReasoning.max += maxScore;
        categories.logicalReasoning.questions.push(questionOrder);
      } else if (questionOrder >= 6 && questionOrder <= 10) {
        categories.problemSolving.score += score;
        categories.problemSolving.max += maxScore;
        categories.problemSolving.questions.push(questionOrder);
      } else if (questionOrder >= 11 && questionOrder <= 15) {
        categories.readingComprehension.score += score;
        categories.readingComprehension.max += maxScore;
        categories.readingComprehension.questions.push(questionOrder);
      } else if (questionOrder >= 16 && questionOrder <= 20) {
        categories.basicMath.score += score;
        categories.basicMath.max += maxScore;
        categories.basicMath.questions.push(questionOrder);
      } else if (questionOrder >= 21 && questionOrder <= 25) {
        categories.communication.score += score;
        categories.communication.max += maxScore;
        categories.communication.questions.push(questionOrder);
      } else if (questionOrder >= 26 && questionOrder <= 30) {
        categories.teamwork.score += score;
        categories.teamwork.max += maxScore;
        categories.teamwork.questions.push(questionOrder);
      }
    }
  });
  
  const overallPercentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
  
  // Calculate category percentages
  const categoryResults = Object.entries(categories).map(([key, data]) => ({
    category: key,
    score: data.max > 0 ? Math.round((data.score / data.max) * 100) : 0,
    rawScore: data.score,
    maxScore: data.max,
    questions: data.questions
  }));
  
  console.log('Professional aptitude score calculated:', {
    overall: overallPercentage,
    categories: categoryResults,
    totalScore,
    maxPossibleScore
  });
  
  return {
    overall: overallPercentage,
    categories: categoryResults,
    totalAnswered: Object.keys(answers).length,
    totalQuestions: questions.length,
    rawScore: totalScore,
    maxScore: maxPossibleScore,
    interpretation: getInterpretation(overallPercentage),
    categoryAnalysis: getCategoryAnalysis(categoryResults)
  };
};

const getInterpretation = (score: number): string => {
  if (score >= 90) return 'Excelent - Aveți aptitudini profesionale foarte dezvoltate';
  if (score >= 80) return 'Foarte bun - Demonstrați competențe solide pentru mediul profesional';
  if (score >= 70) return 'Bun - Aveți o bază solidă de aptitudini profesionale';
  if (score >= 60) return 'Satisfăcător - Aptitudini profesionale în dezvoltare';
  if (score >= 50) return 'Mediu - Există potențial de îmbunătățire în mai multe domenii';
  return 'Sub medie - Recomandăm dezvoltarea aptitudinilor profesionale';
};

const getCategoryAnalysis = (categories: any[]): string => {
  const strongAreas = categories.filter(cat => cat.score >= 80);
  const weakAreas = categories.filter(cat => cat.score < 60);
  
  let analysis = '';
  
  if (strongAreas.length > 0) {
    const strongNames = strongAreas.map(area => getCategoryName(area.category)).join(', ');
    analysis += `Puncte forte: ${strongNames}. `;
  }
  
  if (weakAreas.length > 0) {
    const weakNames = weakAreas.map(area => getCategoryName(area.category)).join(', ');
    analysis += `Domenii de îmbunătățit: ${weakNames}. `;
  }
  
  return analysis || 'Performanță echilibrată în toate domeniile evaluate.';
};

const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    logicalReasoning: 'Raționament logic',
    problemSolving: 'Rezolvarea problemelor',
    readingComprehension: 'Înțelegerea textului',
    basicMath: 'Calcule matematice',
    communication: 'Comunicare',
    teamwork: 'Lucrul în echipă'
  };
  
  return names[category] || category;
};
