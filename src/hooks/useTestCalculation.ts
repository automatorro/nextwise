// src/hooks/useTestCalculation.ts

import { useMemo } from 'react';
import { StandardizedScore } from '@/types/tests';
import { calculateCattellScore } from '@/utils/testCalculations/cattellCalculation'; 
// Aici adăugăm noua noastră funcție de calcul
import { calculateDiscScore } from '@/utils/testCalculations/discCalculation';
import { calculateGADScore } from '@/utils/testCalculations/gadCalculation';
import { calculateBigFiveScore } from '@/utils/testCalculations/bigFiveCalculation';
import { calculateEnneagramScore, getEnneagramDominantType } from '@/utils/testCalculations/enneagramCalculation';
import { calculateBelbinScore } from '@/utils/testCalculations/belbinCalculation';
import { calculateHexacoScore } from '@/utils/testCalculations/hexacoCalculation';
import { calculateHollandScore } from '@/utils/testCalculations/hollandCalculation';
import { calculateWatsonGlaserScore } from '@/utils/testCalculations/watsonGlaserCalculation';
import { calculateDigitalCompetenciesScore } from '@/utils/testCalculations/digitalCompetenciesCalculation';
import { calculateSensoryPerceptionScore } from '@/utils/testCalculations/sensoryPerceptionCalculation';
import { calculateBeckDepressionScore } from '@/utils/beckDepressionInventoryCalculator';
// Import noile calculatoare
import { calculateEmotionalIntelligenceScore } from '@/utils/testCalculations/emotionalIntelligenceCalculation';
import { calculateManagerialCompetenciesScore } from '@/utils/testCalculations/managerialCompetenciesCalculation';
import { calculateCognitiveAbilitiesScoreFromDB, calculateCognitiveAbilitiesScoreFallback } from '@/utils/cognitiveAbilitiesCalculator';

export const useTestCalculation = (
  testName: string | undefined,
  answers: Record<string, any> | undefined,
  questions?: any[]
): StandardizedScore | null => {
  const score = useMemo((): StandardizedScore | null => {
    if (!testName || !answers) {
      return null;
    }

    switch (testName) {
      case 'Cattell 16PF':
        return calculateCattellScore(answers);

      // === AICI ACTIVĂM TESTUL DISC ===
      case 'Test DISC - Stiluri de Comportament':
        return calculateDiscScore(answers);

      // === AICI ACTIVĂM TESTUL GAD-7 ===
      case 'Evaluare Anxietate GAD-7':
        return calculateGADScore(answers);

      // === AICI ACTIVĂM TESTUL BIG FIVE ===
      case 'Big Five Personality Test':
        return calculateBigFiveScore(answers);

      // === AICI ACTIVĂM TESTUL ENNEAGRAM ===
      case 'Enneagram':
      case 'Test Enneagram':
      case 'Enneagram Test':
      case 'Enneagram Personality Test':
        const enneagramScores = calculateEnneagramScore(answers);
        const dominantType = getEnneagramDominantType(enneagramScores);
        // Scorul maxim teoretic: 4 întrebări per tip × 4 puncte maxim per întrebare = 16 puncte per tip
        const maxScorePerType = 16;
        const dominantScore = enneagramScores[dominantType as keyof typeof enneagramScores];
        return {
          type: 'profile',
          dominant_profile: dominantType,
          dimensions: Object.entries(enneagramScores).map(([key, value]) => ({
            id: key,
            name: key.replace('type', 'Type '),
            score: value,
            percentage: Math.round((value / maxScorePerType) * 100)
          })),
          interpretation: `Tipul tău dominant Enneagram este ${dominantType.replace('type', 'Type ')}`,
          overall: Math.round((dominantScore / maxScorePerType) * 100),
          raw_score: dominantScore,
          max_score: maxScorePerType
        };

      // === TESTUL BELBIN ===
      case 'Roluri în Echipă Belbin':
      case 'Belbin Team Roles':
      case 'Test Belbin':
        return calculateBelbinScore(answers);

      // === TESTUL HEXACO ===
      case 'HEXACO Personality Test':
      case 'Test HEXACO':
      case 'HEXACO':
        return calculateHexacoScore(answers);

      // === TESTUL HOLLAND RIASEC ===
      case 'Holland RIASEC Test':
      case 'Test Holland RIASEC':
      case 'RIASEC':
      case 'Holland Career Test':
        return calculateHollandScore(answers);

      // === TESTUL WATSON-GLASER ===
      case 'Watson-Glaser Critical Thinking':
      case 'Test Watson-Glaser':
      case 'Watson Glaser':
      case 'Critical Thinking Test':
        return calculateWatsonGlaserScore(answers);

      // === TESTUL COMPETENȚE DIGITALE ===
      case 'Competențe Digitale & Analitice':
      case 'Digital Competencies Test':
      case 'Test Competențe Digitale':
        return calculateDigitalCompetenciesScore(answers);

      // === TESTUL PERCEPȚIE SENZORIALĂ ===
      case 'Percepție Senzorială':
      case 'Sensory Perception Test':
        return calculateSensoryPerceptionScore(answers);
        
      // === TESTUL BECK DEPRESSION INVENTORY ===
      case 'Beck Depression Inventory':
      case 'BDI':
      case 'Test Depresie Beck':
        return calculateBeckDepressionScore(answers);
        
      // === TESTUL INTELIGENȚĂ EMOȚIONALĂ ===
      case 'Inteligență Emoțională':
      case 'Emotional Intelligence Test':
      case 'Test Inteligență Emoțională':
        return calculateEmotionalIntelligenceScore(answers);
        
      // === TESTUL APTITUDINI COGNITIVE ===
      case 'Aptitudini Cognitive':
      case 'Cognitive Abilities Test':
      case 'Test Aptitudini Cognitive':
        if (questions && questions.length > 0) {
          return calculateCognitiveAbilitiesScoreFromDB(answers, questions);
        } else {
          return calculateCognitiveAbilitiesScoreFallback(answers);
        }
        
      // === TESTUL COMPETENȚE MANAGERIALE ===
      case 'Competențe Manageriale':
      case 'Managerial Competencies Test':
      case 'Test Competențe Manageriale':
        return calculateManagerialCompetenciesScore(answers);

      default:
        console.warn(`No calculation logic defined for test: ${testName}`);
        return {
          type: 'scale',
          overall: 50,
          interpretation: 'Rezultat placeholder - logica de calcul nu este încă implementată',
          scale_level: 'Intermediar',
          raw_score: 0,
          max_score: 0
        };
    }
  }, [testName, answers, questions]);

  return score;
};