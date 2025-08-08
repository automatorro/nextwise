
export interface CattellScore {
  overall: number;
  dimensions: {
    warmth: number;
    reasoning: number;
    emotional_stability: number;
    dominance: number;
    liveliness: number;
    rule_consciousness: number;
    social_boldness: number;
    sensitivity: number;
    vigilance: number;
    abstractedness: number;
    privateness: number;
    apprehension: number;
    openness_to_change: number;
    self_reliance: number;
    perfectionism: number;
    tension: number;
  };
  interpretation: string;
}

export const calculateCattellScore = (answers: Record<string, number>): CattellScore => {
  console.log('=== CATTELL CALCULATION START ===');
  console.log('Total answers received:', Object.keys(answers).length);
  console.log('Answers object:', answers);
  
  const factors = {
    warmth: 0,
    reasoning: 0,
    emotional_stability: 0,
    dominance: 0,
    liveliness: 0,
    rule_consciousness: 0,
    social_boldness: 0,
    sensitivity: 0,
    vigilance: 0,
    abstractedness: 0,
    privateness: 0,
    apprehension: 0,
    openness_to_change: 0,
    self_reliance: 0,
    perfectionism: 0,
    tension: 0
  };
  
  console.log('Initial factors:', factors);
  
  // Maparea întrebărilor la factori (presupunem 160 întrebări, câte 10 pentru fiecare factor)
  for (const questionId in answers) {
    try {
      // --- START of each iteration ---
      console.log(`Processing: ${questionId}, Answer: ${answers[questionId]}`);
      
      const answer = answers[questionId];
      
      // Validate the answer value
      if (typeof answer !== 'number') {
        console.warn(`Invalid answer type for ${questionId}: ${typeof answer}, value: ${answer}`);
        continue;
      }
      
      const questionNumber = parseInt(questionId.split('-')[1]);
      console.log(`Parsed question number: ${questionNumber} from ${questionId}`);
      
      // Validate question number
      if (isNaN(questionNumber) || questionNumber < 1) {
        console.warn(`Invalid question number parsed: ${questionNumber} from ${questionId}`);
        continue;
      }
      
      const factorNames = Object.keys(factors);
      const factorIndex = Math.floor((questionNumber - 1) / 10);
      console.log(`Factor index calculated: ${factorIndex} for question ${questionNumber}`);
      
      if (factorIndex >= 0 && factorIndex < factorNames.length) {
        const factorName = factorNames[factorIndex] as keyof typeof factors;
        console.log(`Adding ${answer} to factor: ${factorName} (current value: ${factors[factorName]})`);
        
        factors[factorName] += answer;
        
        console.log(`Updated ${factorName} to: ${factors[factorName]}`);
      } else {
        console.warn(`Factor index ${factorIndex} out of bounds for question ${questionNumber}. Valid range: 0-${factorNames.length - 1}`);
      }
      
    } catch (error) {
      console.error(`Failed to process ${questionId}. Error:`, error.message);
      console.error('Error stack:', error.stack);
      // By using 'continue', we skip the broken iteration and move to the next one.
      continue;
    }
  }
  
  console.log('Final factors after processing all questions:', factors);
  
  // Normalizarea la scală 1-10 (specific pentru Cattell)
  const maxScorePerFactor = 10 * 3; // 10 întrebări × 3 puncte maxim
  console.log(`Max score per factor: ${maxScorePerFactor}`);
  
  const normalizedScores = Object.fromEntries(
    Object.entries(factors).map(([factor, score]) => {
      const normalizedScore = Math.round(((score / maxScorePerFactor) * 9) + 1); // Scală 1-10
      console.log(`Normalizing ${factor}: ${score} -> ${normalizedScore}`);
      return [factor, normalizedScore];
    })
  ) as typeof factors;
  
  console.log('Normalized scores:', normalizedScores);
  
  // Calculul scorului general ca medie
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 16);
  console.log(`Overall score calculated: ${overall}`);
  
  const interpretation = `Profilul tău Cattell 16PF arată o personalitate complexă cu scoruri variate pe cei 16 factori. Factorul dominant este cel cu scorul cel mai mare.`;
  
  const finalResult = {
    overall: Math.round((overall / 10) * 100), // Convertim la procente pentru consistență
    dimensions: normalizedScores,
    interpretation
  };
  
  console.log('=== CATTELL CALCULATION END ===');
  console.log('Final result:', finalResult);
  
  return finalResult;
};
