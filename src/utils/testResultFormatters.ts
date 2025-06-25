
import { getScoreInterpretation } from './testScoring';
import { supabase } from '@/integrations/supabase/client';

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

// Funcție pentru calcularea scorului pentru Test Aptitudini Cognitive folosind scoring_weights real
export async function calculateCognitiveAbilitiesScoreFromDB(
  testTypeId: string, 
  answers: { [key: string]: number }
) {
  console.log('Calculating cognitive abilities score from database for:', testTypeId);
  
  try {
    // Obține toate întrebările cu scoring_weights din baza de date
    const { data: questions, error } = await supabase
      .from('test_questions')
      .select('*')
      .eq('test_type_id', testTypeId)
      .order('question_order');

    if (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }

    if (!questions || questions.length === 0) {
      console.warn('No questions found for test type:', testTypeId);
      return calculateCognitiveAbilitiesScore(answers); // fallback
    }

    console.log('Found questions:', questions.length);

    // Calculează scorurile pe dimensiuni folosind scoring_weights real
    const dimensionScores: { [key: string]: number } = {};
    const dimensionMaxScores: { [key: string]: number } = {};
    
    let totalScore = 0;
    let totalMaxScore = 0;

    questions.forEach(question => {
      const userAnswer = answers[question.id];
      
      if (userAnswer === undefined || !question.scoring_weights) {
        console.warn('Missing answer or scoring weights for question:', question.id);
        return;
      }

      // Procesează scoring_weights pentru această întrebare
      Object.entries(question.scoring_weights).forEach(([dimension, weights]: [string, any]) => {
        if (typeof weights === 'object' && weights !== null) {
          // Inițializează dimensiunea dacă nu există
          if (!dimensionScores[dimension]) {
            dimensionScores[dimension] = 0;
            dimensionMaxScores[dimension] = 0;
          }

          // Adaugă scorul pentru răspunsul utilizatorului
          const userScore = weights[userAnswer.toString()] || 0;
          dimensionScores[dimension] += userScore;
          totalScore += userScore;

          // Calculează scorul maxim pentru această dimensiune/întrebare
          const maxScoreForQuestion = Math.max(...Object.values(weights).filter(v => typeof v === 'number'));
          dimensionMaxScores[dimension] += maxScoreForQuestion;
          totalMaxScore += maxScoreForQuestion;
        }
      });
    });

    // Convertește scorurile în procentaje
    const dimensionPercentages: { [key: string]: number } = {};
    Object.keys(dimensionScores).forEach(dimension => {
      const maxForDimension = dimensionMaxScores[dimension];
      dimensionPercentages[dimension] = maxForDimension > 0 
        ? Math.round((dimensionScores[dimension] / maxForDimension) * 100) 
        : 0;
    });

    const overallPercentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

    console.log('Calculated scores from DB:', {
      overall: overallPercentage,
      dimensions: dimensionPercentages,
      raw: { totalScore, totalMaxScore },
      dimensionScores,
      dimensionMaxScores
    });

    return {
      overall: overallPercentage,
      raw_score: totalScore,
      max_score: totalMaxScore,
      dimensions: dimensionPercentages,
      interpretation: getScoreInterpretation(overallPercentage, 'Test Aptitudini Cognitive').description
    };

  } catch (error) {
    console.error('Error calculating score from database, using fallback:', error);
    return calculateCognitiveAbilitiesScore(answers);
  }
}

// Funcție pentru calcularea scorului pentru Test Aptitudini Cognitive (fallback)
export function calculateCognitiveAbilitiesScore(answers: { [key: string]: number }) {
  console.log('Calculating cognitive abilities score (fallback) for answers:', answers);
  
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
  
  console.log('Calculated cognitive scores (fallback):', {
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
