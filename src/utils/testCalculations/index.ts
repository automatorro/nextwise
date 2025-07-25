
import { calculateBigFiveScore } from './bigFiveCalculation';
import { calculateCattellScore } from './cattellCalculation';
import { calculateDISCScore } from './discCalculation';
import { calculateEmotionalIntelligenceScore } from './emotionalIntelligenceCalculation';
import { calculateCognitiveScore } from './cognitiveCalculation';
import { calculateBelbinScore } from './belbinCalculation';
import { calculateHexacoScore } from './hexacoCalculation';
import { calculateGADScore } from './gadCalculation';
import { calculateSJTScore } from './sjtCalculation';
import { calculateProfessionalAptitudeScore } from './professionalAptitudeCalculation';
import { calculateWatsonGlaserScore } from './watsonGlaserCalculation';

export {
  calculateBigFiveScore,
  calculateCattellScore,
  calculateDISCScore,
  calculateEmotionalIntelligenceScore,
  calculateCognitiveScore,
  calculateBelbinScore,
  calculateHexacoScore,
  calculateGADScore,
  calculateSJTScore,
  calculateProfessionalAptitudeScore,
  calculateWatsonGlaserScore
};

// Funcție pentru a determina care funcție de calcul să folosim
export function getScoreCalculationFunction(testName: string) {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('big five') || testKey.includes('big-five')) {
    return calculateBigFiveScore;
  }
  
  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    return calculateCattellScore;
  }
  
  if (testKey.includes('disc')) {
    return calculateDISCScore;
  }
  
  if (testKey.includes('emotional') || testKey.includes('emotiona')) {
    return calculateEmotionalIntelligenceScore;
  }
  
  if (testKey.includes('cognitive') || testKey.includes('cognitiv')) {
    return calculateCognitiveScore;
  }
  
  if (testKey.includes('belbin')) {
    return calculateBelbinScore;
  }
  
  if (testKey.includes('hexaco')) {
    return calculateHexacoScore;
  }
  
  if (testKey.includes('gad') || testKey.includes('anxietate')) {
    return calculateGADScore;
  }
  
  if (testKey.includes('sjt') || testKey.includes('situational') || testKey.includes('competențe manageriale') || testKey.includes('managerial')) {
    return calculateSJTScore;
  }
  
  if (testKey.includes('professional') || testKey.includes('aptitude')) {
    return calculateProfessionalAptitudeScore;
  }
  
  if (testKey.includes('watson') || testKey.includes('glaser') || testKey.includes('critical thinking')) {
    return calculateWatsonGlaserScore;
  }
  
  // Fallback la cognitive pentru teste necunoscute
  return calculateCognitiveScore;
}
