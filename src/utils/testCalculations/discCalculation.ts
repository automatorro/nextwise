import { StandardizedScore } from '@/types/tests';

// Acceptăm numere, exact ce primim.
interface DiscAnswers {
  [key: string]: number;
}

// "Traducătorul" nostru intern.
const answerMap: { [key: number]: 'D' | 'I' | 'S' | 'C' } = {
  1: 'D', 2: 'I', 3: 'S', 4: 'C',
};

// Temporarily store profile details - will be replaced by dynamic translations
const getProfileDetails = () => ({
  D: { name: "tests.disc.explanation.profiles.D.name", description: "tests.disc.explanation.profiles.D.description" },
  I: { name: "tests.disc.explanation.profiles.I.name", description: "tests.disc.explanation.profiles.I.description" },
  S: { name: "tests.disc.explanation.profiles.S.name", description: "tests.disc.explanation.profiles.S.description" },
  C: { name: "tests.disc.explanation.profiles.C.name", description: "tests.disc.explanation.profiles.C.description" }
});

export function calculateDiscScore(answers: DiscAnswers): StandardizedScore {
  const counts = { D: 0, I: 0, S: 0, C: 0 };

  Object.values(answers).forEach(numericAnswer => {
    const letterAnswer = answerMap[numericAnswer]; // Traducem numărul în literă.
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
    profile_details: getProfileDetails(),
    overall: overallPercentage,
    interpretation: 'tests.disc.explanation.interpretation.dominant',
    raw_score: maxCount,
    max_score: totalAnswers
  };
}