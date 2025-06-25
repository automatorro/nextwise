
import { getScoreInterpretation } from './testScoring';

export function formatTestResults(testResult: any) {
  const { score, test_types } = testResult;
  
  if (!score || typeof score !== 'object') {
    return {
      overall: 0,
      dimensions: {},
      interpretation: 'Rezultate indisponibile'
    };
  }

  const testName = test_types?.name || '';
  const overall = score.overall || 0;
  const dimensions = score.dimensions || {};
  
  return {
    overall,
    dimensions,
    interpretation: getScoreInterpretation(overall, testName).description,
    testName
  };
}

// Funcție pentru calcularea scorului pentru Test Aptitudini Cognitive
export function calculateCognitiveAbilitiesScore(answers: { [key: string]: number }) {
  console.log('Calculating cognitive abilities score for answers:', answers);
  
  // Maparea dimensiunilor pentru Test Aptitudini Cognitive
  const dimensionScores = {
    verbal: 0,
    numeric: 0,
    logic: 0,
    spatial: 0,
    abstract: 0
  };
  
  const dimensionCounts = {
    verbal: 0,
    numeric: 0,
    logic: 0,
    spatial: 0,
    abstract: 0
  };
  
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Procesează fiecare răspuns (presupunând că avem 40 de întrebări cu scoring-uri de la 0-4)
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    // Pentru fiecare răspuns, adaugă punctajul la scorurile de dimensiune
    // Acesta este un algoritm simplificat - în realitate ar trebui să folosim scoring_weights din baza de date
    
    // Determinăm dimensiunea bazată pe ordinea întrebării
    const questionOrder = parseInt(questionId.split('-').pop() || '0');
    let dimension = '';
    
    if (questionOrder >= 1 && questionOrder <= 8) {
      dimension = 'verbal';
    } else if (questionOrder >= 9 && questionOrder <= 16) {
      dimension = 'numeric';
    } else if (questionOrder >= 17 && questionOrder <= 24) {
      dimension = 'logic';
    } else if (questionOrder >= 25 && questionOrder <= 32) {
      dimension = 'spatial';
    } else if (questionOrder >= 33 && questionOrder <= 40) {
      dimension = 'abstract';
    }
    
    if (dimension && dimensionScores.hasOwnProperty(dimension)) {
      dimensionScores[dimension as keyof typeof dimensionScores] += answerValue;
      dimensionCounts[dimension as keyof typeof dimensionCounts]++;
      totalScore += answerValue;
      maxPossibleScore += 4; // Scorul maxim per întrebare este 4
    }
  });
  
  // Calculează procentajele pentru fiecare dimensiune
  const dimensionPercentages: { [key: string]: number } = {};
  Object.keys(dimensionScores).forEach(dimension => {
    const score = dimensionScores[dimension as keyof typeof dimensionScores];
    const count = dimensionCounts[dimension as keyof typeof dimensionCounts];
    const maxForDimension = count * 4;
    dimensionPercentages[dimension] = maxForDimension > 0 ? Math.round((score / maxForDimension) * 100) : 0;
  });
  
  // Calculează scorul general
  const overallPercentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
  
  console.log('Calculated cognitive scores:', {
    overall: overallPercentage,
    dimensions: dimensionPercentages,
    raw: { totalScore, maxPossibleScore }
  });
  
  return {
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: maxPossibleScore,
    dimensions: dimensionPercentages,
    interpretation: getScoreInterpretation(overallPercentage, 'Test Aptitudini Cognitive').description
  };
}
