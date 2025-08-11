// src/utils/testCalculations/discCalculation.ts

import { StandardizedScore } from '@/types/tests';

interface DiscAnswers {
  [key: string]: 'D' | 'I' | 'S' | 'C';
}

const profileDetails = {
  D: {
    name: "Dominanță (D)",
    description: "Sunteți o persoană directă, hotărâtă și orientată spre rezultate. Vă asumați riscuri, luați decizii rapide și vă place să aveți controlul. Puteți fi perceput ca fiind exigent și nerăbdător, dar sunteți motorul care împinge proiectele înainte."
  },
  I: {
    name: "Influență (I)",
    description: "Sunteți o persoană sociabilă, optimistă și entuziastă. Vă place să colaborați, să convingeți și să motivați oamenii din jur. Energia și carisma dumneavoastră sunt contagioase, făcându-vă un excelent comunicator și membru de echipă."
  },
  S: {
    name: "Stabilitate (S)",
    description: "Sunteți o persoană calmă, răbdătoare și loială. Valorați siguranța și consecvența, fiind un coechipier de încredere și un bun ascultător. Preferiți un mediu de lucru stabil și predictibil și sunteți excelent în a menține armonia în echipă."
  },
  C: {
    name: "Conștiinciozitate (C)",
    description: "Sunteți o persoană precisă, analitică și organizată. Acordați o mare atenție detaliilor, calității și corectitudinii. Valorați logica și faptele, iar abordarea dumneavoastră metodică asigură că standardele înalte sunt întotdeauna respectate."
  }
};

/**
 * Calculează scorul pentru testul DISC.
 * Identifică profilul cu cele mai multe răspunsuri.
 */
export function calculateDiscScore(answers: DiscAnswers): StandardizedScore {
  const counts = { D: 0, I: 0, S: 0, C: 0 };
  
  Object.values(answers).forEach(answer => {
    if (counts.hasOwnProperty(answer)) {
      counts[answer]++;
    }
  });

  // Găsește profilul dominant
  let dominantProfile: keyof typeof counts = 'D';
  let maxCount = 0;

  for (const profile in counts) {
    if (counts[profile as keyof typeof counts] > maxCount) {
      maxCount = counts[profile as keyof typeof counts];
      dominantProfile = profile as keyof typeof counts;
    }
  }
  
  const totalAnswers = Object.keys(answers).length;
  const overallPercentage = totalAnswers > 0 ? Math.round((maxCount / totalAnswers) * 100) : 0;

  return {
    type: 'profile', // Tipul de rezultat este 'profile'
    dominant_profile: dominantProfile,
    profile_details: profileDetails,
    overall: overallPercentage,
    interpretation: `Profilul tău principal este ${profileDetails[dominantProfile].name}. Acest lucru indică o tendință puternică spre a acționa și a gândi în modul descris mai jos.`,
    raw_score: maxCount,
    max_score: totalAnswers
  };
}