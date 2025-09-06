
export interface HollandScore {
  overall: number;
  dimensions: {
    realistic: number;
    investigative: number;
    artistic: number;
    social: number;
    enterprising: number;
    conventional: number;
  };
  dominant_code: string;
  interpretation: string;
  raw_score?: number;
  max_score?: number;
  profile_details?: Record<string, any>;
}

import { StandardizedScore } from '@/types/tests';

export const calculateHollandScore = (answers: Record<string, number>): StandardizedScore => {
  const scores = {
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0
  };
  
  // Holland RIASEC has 10 questions per dimension (60 total)
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1] || questionId);
    
    if (questionNumber >= 1 && questionNumber <= 10) {
      scores.realistic += answer;
    } else if (questionNumber >= 11 && questionNumber <= 20) {
      scores.investigative += answer;
    } else if (questionNumber >= 21 && questionNumber <= 30) {
      scores.artistic += answer;
    } else if (questionNumber >= 31 && questionNumber <= 40) {
      scores.social += answer;
    } else if (questionNumber >= 41 && questionNumber <= 50) {
      scores.enterprising += answer;
    } else if (questionNumber >= 51 && questionNumber <= 60) {
      scores.conventional += answer;
    }
  });
  
  // Verifică dacă există răspunsuri pentru a evita diviziunea cu zero
  const hasAnswers = Object.keys(answers).length > 0;
  
  // Normalize to percentages (max score per dimension is 10 questions × 5 points = 50)
  const maxScorePerDimension = 10 * 5; // 10 questions × 5 points max
  const normalizedScores = {
    realistic: hasAnswers ? Math.round((scores.realistic / maxScorePerDimension) * 100) : 0,
    investigative: hasAnswers ? Math.round((scores.investigative / maxScorePerDimension) * 100) : 0,
    artistic: hasAnswers ? Math.round((scores.artistic / maxScorePerDimension) * 100) : 0,
    social: hasAnswers ? Math.round((scores.social / maxScorePerDimension) * 100) : 0,
    enterprising: hasAnswers ? Math.round((scores.enterprising / maxScorePerDimension) * 100) : 0,
    conventional: hasAnswers ? Math.round((scores.conventional / maxScorePerDimension) * 100) : 0
  };
  
  // Determine dominant type
  const dominantType = Object.entries(normalizedScores).reduce((a, b) => 
    normalizedScores[a[0] as keyof typeof normalizedScores] > normalizedScores[b[0] as keyof typeof normalizedScores] ? a : b
  )[0];
  
  // Creează codul RIASEC bazat pe primele 3 tipuri dominante
  const sortedTypes = Object.entries(normalizedScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type]) => type.charAt(0).toUpperCase());
  
  const riasecCode = sortedTypes.join('');
  
  const typeNames = {
    realistic: 'Realistic (R) - Practic și orientat spre activități concrete',
    investigative: 'Investigative (I) - Analitic și orientat spre cercetare',
    artistic: 'Artistic (A) - Creativ și orientat spre exprimare artistică',
    social: 'Social (S) - Orientat spre ajutorarea altora',
    enterprising: 'Enterprising (E) - Orientat spre leadership și afaceri',
    conventional: 'Conventional (C) - Organizat și orientat spre detalii'
  };
  
  const typeDescriptions = {
    realistic: 'Tipul Realistic preferă activitățile practice care implică manipularea obiectelor, uneltelor și mașinilor. Ești orientat spre rezultate concrete și îți place să vezi produsul final al muncii tale.',
    investigative: 'Tipul Investigativ preferă activitățile analitice și intelectuale. Îți place să rezolvi probleme complexe prin cercetare și analiză sistematică.',
    artistic: 'Tipul Artistic preferă activitățile creative și expresive. Valorezi originalitatea și îți place să lucrezi în medii care permit exprimarea liberă.',
    social: 'Tipul Social preferă activitățile care implică interacțiunea cu alți oameni. Îți place să ajuți, să înveți și să dezvolți pe alții.',
    enterprising: 'Tipul Întreprinzător preferă activitățile de conducere și persuasiune. Îți place să influențezi, să convingi și să conduci pentru a atinge obiective organizaționale sau economice.',
    conventional: 'Tipul Convențional preferă activitățile organizate și structurate. Îți place să lucrezi cu date, să urmezi proceduri clare și să menții ordinea.'
  };
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 6);
  
  return {
    type: 'profile',
    overall,
    dominant_profile: dominantType.toUpperCase(),
    dominant_code: riasecCode,
    profile_details: {
      [dominantType]: {
        name: typeNames[dominantType as keyof typeof typeNames],
        description: typeDescriptions[dominantType as keyof typeof typeDescriptions]
      }
    },
    dimensions: Object.entries(normalizedScores).map(([key, value]) => ({
      id: key,
      name: key,
      score: value
    })),
    interpretation: typeNames[dominantType as keyof typeof typeNames],
    raw_score: Object.values(scores).reduce((sum, score) => sum + score, 0),
    max_score: 60 * 5 // 60 questions × 5 points max
  };
};
