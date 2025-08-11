import { StandardizedScore } from '@/types/tests';

// Interfața acum acceptă numere, exact ce primește de la sistemul vechi.
interface DiscAnswers {
  [key: string]: number;
}

// "Traducătorul": mapează numerele primite la literele de care avem nevoie.
const answerMap: { [key: number]: 'D' | 'I' | 'S' | 'C' } = {
  1: 'D',
  2: 'I',
  3: 'S',
  4: 'C',
};

const profileDetails = {
  D: { name: "Dominanță (D)", description: "Sunteți o persoană directă, hotărâtă și orientată spre rezultate..." },
  I: { name: "Influență (I)", description: "Sunteți o persoană sociabilă, optimistă și entuziastă..." },
  S: { name: "Stabilitate (S)", description: "Sunteți o persoană calmă, răbdătoare și loială..." },
  C: { name: "Conștiinciozitate (C)", description: "Sunteți o persoană precisă, analitică și organizată..." }
};

export function calculateDiscScore(answers: DiscAnswers): StandardizedScore {
  const counts = { D: 0, I: 0, S: 0, C: 0 };

  Object.values(answers).forEach(numericAnswer => {
    const letterAnswer = answerMap[numericAnswer]; // Folosim "traducătorul"
    if (letterAnswer) {
      counts[letterAnswer]++;
    }
  });

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
    type: 'profile',
    dominant_profile: dominantProfile,
    profile_details: profileDetails,
    overall: overallPercentage,
    interpretation: `Profilul tău principal este ${profileDetails[dominantProfile].name}. Acest lucru indică o tendință puternică spre a acționa și a gândi în modul descris mai jos.`,
    raw_score: maxCount,
    max_score: totalAnswers
  };
}