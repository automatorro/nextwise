
import { supabase } from '@/integrations/supabase/client';
import { getScoreInterpretation } from './testScoring';

export interface CognitiveScore {
  overall: number;
  raw_score: number;
  max_score: number;
  dimensions: { [key: string]: number };
  interpretation: string;
}

// Funcție pentru calcularea scorului pentru Test Aptitudini Cognitive folosind scoring_weights real
export async function calculateCognitiveAbilitiesScoreFromDB(
  testTypeId: string, 
  answers: { [key: string]: number }
): Promise<CognitiveScore> {
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
      return calculateCognitiveAbilitiesScoreFallback(answers); // fallback
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

      console.log('Processing question:', question.id, 'scoring_weights:', question.scoring_weights);

      // Procesează scoring_weights cu structura corectă: {option_value: {dimension: score}}
      Object.entries(question.scoring_weights).forEach(([optionValue, dimensionScores_raw]: [string, any]) => {
        if (typeof dimensionScores_raw === 'object' && dimensionScores_raw !== null) {
          // Pentru fiecare opțiune, procesează dimensiunile
          Object.entries(dimensionScores_raw).forEach(([dimension, score]: [string, any]) => {
            // Inițializează dimensiunea dacă nu există
            if (!dimensionScores[dimension]) {
              dimensionScores[dimension] = 0;
              dimensionMaxScores[dimension] = 0;
            }

            const numericScore = typeof score === 'number' ? score : 0;
            
            // Dacă opțiunea curentă este răspunsul utilizatorului, adaugă scorul
            if (optionValue === userAnswer.toString()) {
              dimensionScores[dimension] += numericScore;
              totalScore += numericScore;
            }

            // Ține evidența scorului maxim pentru această dimensiune
            if (numericScore > 0) {
              // Găsește scorul maxim pentru această întrebare și dimensiune
              const currentMaxForDimension = dimensionMaxScores[dimension] || 0;
              const maxScoreForThisQuestionDimension = numericScore;
              
              // Actualizează doar dacă acest scor este mai mare decât ce avem deja pentru această întrebare
              if (optionValue === '1') { // Prima iterație pentru această întrebare
                dimensionMaxScores[dimension] = currentMaxForDimension + maxScoreForThisQuestionDimension;
              } else {
                // Găsește maximul dintre toate opțiunile pentru această dimensiune
                const existingMax = Math.floor(dimensionMaxScores[dimension] / questions.length) || 0;
                if (maxScoreForThisQuestionDimension > existingMax) {
                  dimensionMaxScores[dimension] = dimensionMaxScores[dimension] - existingMax + maxScoreForThisQuestionDimension;
                }
              }
            }
          });
        }
      });

      // Calculează scorul maxim pentru această întrebare
      let maxScoreForQuestion = 0;
      Object.values(question.scoring_weights).forEach((dimensionScores_raw: any) => {
        if (typeof dimensionScores_raw === 'object' && dimensionScores_raw !== null) {
          let totalScoreForOption = 0;
          Object.values(dimensionScores_raw).forEach((score: any) => {
            if (typeof score === 'number') {
              totalScoreForOption += score;
            }
          });
          if (totalScoreForOption > maxScoreForQuestion) {
            maxScoreForQuestion = totalScoreForOption;
          }
        }
      });
      
      totalMaxScore += maxScoreForQuestion;
    });

    // Recalculează dimensionMaxScores corect
    const correctDimensionMaxScores: { [key: string]: number } = {};
    questions.forEach(question => {
      if (question.scoring_weights) {
        Object.values(question.scoring_weights).forEach((dimensionScores_raw: any) => {
          if (typeof dimensionScores_raw === 'object' && dimensionScores_raw !== null) {
            Object.entries(dimensionScores_raw).forEach(([dimension, score]: [string, any]) => {
              if (!correctDimensionMaxScores[dimension]) {
                correctDimensionMaxScores[dimension] = 0;
              }
              const numericScore = typeof score === 'number' ? score : 0;
              if (numericScore > correctDimensionMaxScores[dimension]) {
                correctDimensionMaxScores[dimension] = numericScore;
              }
            });
          }
        });
      }
    });

    // Multiplică cu numărul de întrebări pentru fiecare dimensiune
    Object.keys(correctDimensionMaxScores).forEach(dimension => {
      correctDimensionMaxScores[dimension] *= questions.length / 5; // presupunând 5 dimensiuni
    });

    // Convertește scorurile în procentaje
    const dimensionPercentages: { [key: string]: number } = {};
    Object.keys(dimensionScores).forEach(dimension => {
      const maxForDimension = correctDimensionMaxScores[dimension] || 1;
      dimensionPercentages[dimension] = Math.round((dimensionScores[dimension] / maxForDimension) * 100);
    });

    const overallPercentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

    console.log('Calculated scores from DB:', {
      overall: overallPercentage,
      dimensions: dimensionPercentages,
      raw: { totalScore, totalMaxScore },
      dimensionScores,
      correctDimensionMaxScores
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
    return calculateCognitiveAbilitiesScoreFallback(answers);
  }
}

// Funcție pentru calcularea scorului pentru Test Aptitudini Cognitive (fallback)
export function calculateCognitiveAbilitiesScoreFallback(answers: { [key: string]: number }): CognitiveScore {
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
  const dimensionPercentajes: { [key: string]: number } = {};
  Object.keys(dimensionScores).forEach(dimension => {
    const score = dimensionScores[dimension as keyof typeof dimensionScores];
    const count = dimensionCounts[dimension as keyof typeof dimensionCounts];
    const maxForDimension = count * 4;
    dimensionPercentajes[dimension] = maxForDimension > 0 ? Math.round((score / maxForDimension) * 100) : 0;
  });
  
  // Calculează scorul general
  const overallPercentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
  
  console.log('Calculated cognitive scores (fallback):', {
    overall: overallPercentage,
    dimensions: dimensionPercentajes,
    raw: { totalScore, maxPossibleScore }
  });
  
  return {
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: maxPossibleScore,
    dimensions: dimensionPercentajes,
    interpretation: getScoreInterpretation(overallPercentage, 'Test Aptitudini Cognitive').description
  };
}
