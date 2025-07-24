
export interface SJTScore {
  overall: number;
  dimensions: Record<string, number>;
  interpretation: string;
  detailed_interpretations?: Record<string, string>;
  recommendations?: string[];
  dominant_profile?: string;
  secondary_profile?: string;
}

export const calculateSJTScore = (answers: Record<string, number>, questions: any[]): SJTScore => {
  console.log('Calculating SJT score for answers:', answers);
  
  // Inițializarea scorurilor pentru fiecare profil de carieră
  const profileScores: Record<string, number> = {
    'Leader': 0,
    'Specialist_Analitic': 0,
    'Creativ': 0,
    'Suport_Servicii': 0,
    'Antreprenor': 0,
    'Vanzari': 0
  };

  // Calcularea scorurilor bazată pe scoring_weights din baza de date
  Object.entries(answers).forEach(([questionId, answerValue]) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question?.scoring_weights) {
      const weights = question.scoring_weights as Record<string, number[]>;
      
      Object.entries(weights).forEach(([profile, profileWeights]) => {
        if (answerValue < profileWeights.length) {
          profileScores[profile] = (profileScores[profile] || 0) + profileWeights[answerValue];
        }
      });
    }
  });

  // Normalizarea scorurilor la 0-100
  const normalizedScores: Record<string, number> = {};
  const maxPossibleScore = questions.length * 2; // Fiecare întrebare poate avea max +2 puncte
  
  Object.entries(profileScores).forEach(([profile, score]) => {
    // Convertim de la range [-10, +20] la [0, 100]
    const normalizedScore = Math.max(0, Math.min(100, Math.round(((score + 10) / 30) * 100)));
    normalizedScores[profile] = normalizedScore;
  });

  // Determinarea profilului dominant și secundar
  const sortedProfiles = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
  const dominantProfile = sortedProfiles[0][0];
  const secondaryProfile = sortedProfiles[1][0];
  
  // Verificarea dacă două scoruri sunt apropiate (diferență ≤ 7 puncte din 100)
  const scoreDifference = sortedProfiles[0][1] - sortedProfiles[1][1];
  const hasMixedProfile = scoreDifference <= 7;

  // Calcularea scorului general
  const overall = Math.round(
    Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 
    Object.values(normalizedScores).length
  );

  // Generarea interpretării
  const interpretation = generateInterpretation(dominantProfile, secondaryProfile, hasMixedProfile);

  return {
    overall,
    dimensions: normalizedScores,
    interpretation,
    detailed_interpretations: generateDetailedInterpretations(normalizedScores),
    recommendations: generateRecommendations(dominantProfile, secondaryProfile, hasMixedProfile),
    dominant_profile: dominantProfile,
    secondary_profile: secondaryProfile
  };
};

// Funcții helper
function generateInterpretation(dominantProfile: string, secondaryProfile: string, hasMixedProfile: boolean): string {
  const profileLabels: Record<string, string> = {
    'Leader': 'Lider',
    'Specialist_Analitic': 'Specialist Analitic',
    'Creativ': 'Creativ',
    'Suport_Servicii': 'Suport/Servicii',
    'Antreprenor': 'Antreprenor',
    'Vanzari': 'Vânzări'
  };

  if (hasMixedProfile) {
    return `Profilul tău de carieră este mixt: ${profileLabels[dominantProfile]} + ${profileLabels[secondaryProfile]}`;
  }
  
  return `Profilul tău dominant de carieră este: ${profileLabels[dominantProfile]}`;
}

function generateDetailedInterpretations(dimensions: Record<string, number>): Record<string, string> {
  const interpretations: Record<string, string> = {};
  
  const profileDescriptions: Record<string, string> = {
    'Leader': 'Ai înclinații naturale către leadership și coordonarea echipelor. Îți place să iei inițiativa și să motivezi pe ceilalți.',
    'Specialist_Analitic': 'Preferi să analizezi în profunzime problemele și să găsești soluții bazate pe date concrete și logică.',
    'Creativ': 'Îți place să găsești soluții inovatoare și să aduci o perspectivă nouă în rezolvarea problemelor.',
    'Suport_Servicii': 'Ai o înclinație naturală către ajutorarea celorlalți și construirea de relații pozitive în echipă.',
    'Antreprenor': 'Îți place să îți asumi riscuri calculate și să creezi oportunități noi de afaceri.',
    'Vanzari': 'Ai abilități naturale de persuasiune și îți place să construiești relații cu clienții.'
  };
  
  Object.entries(dimensions).forEach(([profile, score]) => {
    const level = score >= 75 ? 'foarte ridicat' : score >= 60 ? 'ridicat' : score >= 40 ? 'mediu' : 'scăzut';
    interpretations[profile] = `Scor ${level}: ${profileDescriptions[profile]}`;
  });
  
  return interpretations;
}

function generateRecommendations(dominantProfile: string, secondaryProfile: string, hasMixedProfile: boolean): string[] {
  const recommendations: string[] = [];
  
  const profileRecommendations: Record<string, string[]> = {
    'Leader': [
      'Caută roluri de management sau coordonare de echipă',
      'Dezvoltă-ți abilitățile de comunicare și motivare',
      'Participă la cursuri de leadership și management'
    ],
    'Specialist_Analitic': [
      'Orientează-te către roluri care necesită analiză în profunzime',
      'Dezvoltă competențele tehnice și analitice',
      'Caută domenii precum consultanță, cercetare sau analiză de date'
    ],
    'Creativ': [
      'Explorează cariere în domenii creative sau inovatoare',
      'Caută roluri care îți permit să îți exprimi creativitatea',
      'Dezvoltă un portofoliu cu proiectele tale creative'
    ],
    'Suport_Servicii': [
      'Orientează-te către roluri în servicii sau suport clienți',
      'Dezvoltă abilitățile de comunicare și empatie',
      'Caută domenii precum HR, customer service sau consiliere'
    ],
    'Antreprenor': [
      'Consideră să îți începi propria afacere',
      'Dezvoltă competențele de business și management',
      'Participă la programe de antreprenoriat și networking'
    ],
    'Vanzari': [
      'Explorează cariere în vânzări sau business development',
      'Dezvoltă abilitățile de negociere și persuasiune',
      'Caută roluri care implică interacțiunea cu clienții'
    ]
  };
  
  // Adaugă recomandările pentru profilul dominant
  if (profileRecommendations[dominantProfile]) {
    recommendations.push(...profileRecommendations[dominantProfile]);
  }
  
  // Dacă este profil mixt, adaugă și recomandări pentru profilul secundar
  if (hasMixedProfile && profileRecommendations[secondaryProfile]) {
    recommendations.push(`Combină elementele din ${secondaryProfile.toLowerCase()} cu cele din ${dominantProfile.toLowerCase()}`);
  }
  
  return recommendations;
}
