interface Answers {
  [key: string]: number;
}

interface Dimensions {
  [key: string]: number;
}

// This map correctly assigns each question to its corresponding factor.
const questionFactorMap: { [key: number]: keyof Dimensions } = {
  1: 'warmth', 2: 'reasoning', 3: 'emotional_stability',
  4: 'dominance', 5: 'liveliness', 6: 'rule_consciousness',
  7: 'social_boldness', 8: 'sensitivity', 9: 'vigilance',
  10: 'abstractedness', 11: 'privateness', 12: 'apprehension',
  13: 'openness_to_change', 14: 'self_reliance', 15: 'perfectionism',
  16: 'tension', 17: 'warmth', 18: 'reasoning',
  19: 'emotional_stability', 20: 'dominance', 21: 'liveliness',
  22: 'rule_consciousness', 23: 'social_boldness', 24: 'sensitivity',
  25: 'vigilance', 26: 'abstractedness', 27: 'privateness',
  28: 'apprehension', 29: 'openness_to_change', 30: 'self_reliance',
  31: 'perfectionism', 32: 'tension', 33: 'warmth',
  34: 'reasoning', 35: 'emotional_stability', 36: 'dominance',
  37: 'liveliness', 38: 'rule_consciousness', 39: 'social_boldness',
  40: 'sensitivity', 41: 'vigilance', 42: 'abstractedness',
  43: 'privateness', 44: 'apprehension', 45: 'openness_to_change',
  46: 'self_reliance', 47: 'perfectionism', 48: 'tension'
};

const factorKeys: (keyof Dimensions)[] = [
    'warmth', 'reasoning', 'emotional_stability', 'dominance', 'liveliness',
    'rule_consciousness', 'social_boldness', 'sensitivity', 'vigilance',
    'abstractedness', 'privateness', 'apprehension', 'openness_to_change',
    'self_reliance', 'perfectionism', 'tension'
];

export function calculateCattellScore(answers: Answers) {
  const rawScores: Dimensions = factorKeys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  const MAX_SCORE_PER_FACTOR = 15; // 3 questions per factor * max score of 5

  for (const questionId in answers) {
      const questionNumber = parseInt(questionId.replace('question-', ''), 10);
      const answerValue = answers[questionId];

      if (!isNaN(questionNumber) && questionFactorMap[questionNumber] && answerValue >= 1 && answerValue <= 5) {
          const factor = questionFactorMap[questionNumber];
          rawScores[factor] += answerValue;
      }
  }

  const normalizedScores: Dimensions = {};
  let totalNormalizedScore = 0;
  for (const factor of factorKeys) {
    const score = rawScores[factor] || 0;
    // Normalize score to a 1-10 scale, ensuring 0 maps to 1.
    const normalized = Math.round((score / MAX_SCORE_PER_FACTOR) * 9) + 1;
    normalizedScores[factor] = normalized;
    totalNormalizedScore += score;
  }

  const MAX_TOTAL_SCORE = factorKeys.length * MAX_SCORE_PER_FACTOR;
  const overallPercentage = Math.round((totalNormalizedScore / MAX_TOTAL_SCORE) * 100);

  return {
    dimensions: normalizedScores,
    raw_scores: rawScores,
    overall: overallPercentage,
    interpretation: "Interpretarea va fi adăugată ulterior.", // Placeholder
  };
}
