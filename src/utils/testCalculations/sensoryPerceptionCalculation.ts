
export interface SensoryPerceptionScore {
  overall: number;
  dimensions: {
    discriminare_vizuala: number;
    procesare_auditiva: number;
    integrare_multimodala: number;
    atentie_perceptuala: number;
  };
  interpretation: string;
  dominant_ability: string;
  professional_applications: string[];
}

import { StandardizedScore } from '@/types/tests';

export const calculateSensoryPerceptionScore = (answers: Record<string, number>): StandardizedScore => {
  console.log('Calculating Sensory Perception score for answers:', answers);
  
  const scores = {
    discriminare_vizuala: 0,
    procesare_auditiva: 0,
    integrare_multimodala: 0,
    atentie_perceptuala: 0
  };
  
  const questionCounts = {
    discriminare_vizuala: 0,
    procesare_auditiva: 0,
    integrare_multimodala: 0,
    atentie_perceptuala: 0
  };
  
  // Calculul bazat pe scoring_weights din întrebări
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1] || questionId);
    
    // Maparea întrebărilor la dimensiuni (8 întrebări per dimensiune)
    if (questionNumber >= 1 && questionNumber <= 8) {
      scores.discriminare_vizuala += answer;
      questionCounts.discriminare_vizuala++;
    } else if (questionNumber >= 9 && questionNumber <= 16) {
      scores.procesare_auditiva += answer;
      questionCounts.procesare_auditiva++;
    } else if (questionNumber >= 17 && questionNumber <= 24) {
      scores.integrare_multimodala += answer;
      questionCounts.integrare_multimodala++;
    } else if (questionNumber >= 25 && questionNumber <= 32) {
      scores.atentie_perceptuala += answer;
      questionCounts.atentie_perceptuala++;
    }
  });
  
  // Normalizarea la procente (0-100%)
  const maxScorePerDimension = 8 * 5; // 8 întrebări × 5 puncte maxim
  const normalizedScores = {
    discriminare_vizuala: Math.round((scores.discriminare_vizuala / maxScorePerDimension) * 100),
    procesare_auditiva: Math.round((scores.procesare_auditiva / maxScorePerDimension) * 100),
    integrare_multimodala: Math.round((scores.integrare_multimodala / maxScorePerDimension) * 100),
    atentie_perceptuala: Math.round((scores.atentie_perceptuala / maxScorePerDimension) * 100)
  };
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 4);
  
  // Determinarea abilității dominante
  const dominantAbility = Object.entries(normalizedScores).reduce((a, b) => 
    normalizedScores[a[0] as keyof typeof normalizedScores] > normalizedScores[b[0] as keyof typeof normalizedScores] ? a : b
  )[0];
  
  // Interpretarea generală bazată pe scorul overall
  let interpretation: string;
  if (overall >= 86) {
    interpretation = 'Abilități perceptuale excepționale - Acuitate senzorială superioară cu potențial pentru cariere specializate în domenii care necesită precizie perceptuală ridicată.';
  } else if (overall >= 66) {
    interpretation = 'Abilități perceptuale ridicate - Bună procesare senzorială cu performanțe peste medie în majoritatea domeniilor care necesită atenție la detalii.';
  } else if (overall >= 46) {
    interpretation = 'Abilități perceptuale moderate - Funcționare normală cu oportunități de îmbunătățire prin antrenament specific și practică țintită.';
  } else {
    interpretation = 'Abilități perceptuale în dezvoltare - Necesită atenție și antrenament specializat pentru îmbunătățirea performanțelor în sarcini perceptuale complexe.';
  }
  
  // Aplicații profesionale bazate pe scorul general și abilitatea dominantă
  const professionalApplications = getProfessionalApplications(overall, dominantAbility);
  
  console.log('Sensory Perception calculated scores:', {
    overall,
    normalizedScores,
    dominantAbility,
    interpretation,
    professionalApplications
  });
  
  return {
    type: 'dimensional',
    overall,
    dimensions: Object.entries(normalizedScores).map(([key, value]) => ({
      id: key,
      name: getDimensionName(key),
      score: value
    })),
    interpretation,
    dominant_profile: getDimensionName(dominantAbility),
    raw_score: Object.values(scores).reduce((sum, score) => sum + score, 0),
    max_score: 32 * 5 // 32 questions × 5 points max
  };
};

const getDimensionName = (dimension: string): string => {
  const names = {
    discriminare_vizuala: 'Discriminare Vizuală',
    procesare_auditiva: 'Procesare Auditivă',
    integrare_multimodala: 'Integrare Multimodală',
    atentie_perceptuala: 'Atenție Perceptuală'
  };
  return names[dimension as keyof typeof names] || dimension;
};

const getProfessionalApplications = (overallScore: number, dominantAbility: string): string[] => {
  const baseApplications = [
    'Design grafic și vizual',
    'Arhitectură și planificare spațială',
    'Medicină și asistență medicală',
    'Siguranța muncii și controlul calității'
  ];
  
  const specificApplications = {
    discriminare_vizuala: [
      'Fotografie și cinematografie',
      'Design de interface (UI/UX)',
      'Radiologie și imagistică medicală',
      'Controlul calității vizuale',
      'Arhitectură și design interior',
      'Grafică și publicitate'
    ],
    procesare_auditiva: [
      'Inginerie audio și muzică',
      'Interpretariat și traduceri',
      'Logopedia și audiologie',
      'Securitate și supraveghere',
      'Radio și televiziune',
      'Acustică și sunet'
    ],
    integrare_multimodala: [
      'Pilotaj și transport',
      'Chirurgie și proceduri medicale',
      'Realitate virtuală și gaming',
      'Cercetare și dezvoltare',
      'Robotică și automatizare',
      'Ergonomie și factori umani'
    ],
    atentie_perceptuala: [
      'Controlul traficului aerian',
      'Analiză de date și cercetare',
      'Securitate și investigații',
      'Educație și training',
      'Monitorizare și supraveghere',
      'Controlul proceselor industriale'
    ]
  };
  
  if (overallScore >= 66) {
    const specific = specificApplications[dominantAbility as keyof typeof specificApplications] || [];
    return [...baseApplications, ...specific].slice(0, 8);
  }
  
  return baseApplications;
};
