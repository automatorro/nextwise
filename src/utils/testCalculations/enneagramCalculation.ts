
export interface EnneagramScore {
  type1: number;
  type2: number;
  type3: number;
  type4: number;
  type5: number;
  type6: number;
  type7: number;
  type8: number;
  type9: number;
}

export const calculateEnneagramScore = (answers: Record<string, number>): EnneagramScore => {
  const scores: EnneagramScore = {
    type1: 0,
    type2: 0,
    type3: 0,
    type4: 0,
    type5: 0,
    type6: 0,
    type7: 0,
    type8: 0,
    type9: 0
  };

  // Calculăm scorurile pentru fiecare tip bazat pe răspunsuri
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1]);
    
    // Maparea întrebărilor la tipuri (bazat pe structura din SQL)
    const questionTypeMap: Record<number, keyof EnneagramScore> = {
      1: 'type1', 2: 'type1', 3: 'type1', 4: 'type1', // Perfecționistul
      5: 'type2', 6: 'type2', 7: 'type2', 8: 'type2', // Ajutătorul
      9: 'type3', 10: 'type3', 11: 'type3', 12: 'type3', // Realizatorul
      13: 'type4', 14: 'type4', 15: 'type4', 16: 'type4', // Individualistul
      17: 'type5', 18: 'type5', 19: 'type5', 20: 'type5', // Investigatorul
      21: 'type6', 22: 'type6', 23: 'type6', 24: 'type6', // Loialistul
      25: 'type7', 26: 'type7', 27: 'type7', 28: 'type7', // Entuziastul
      29: 'type8', 30: 'type8', 31: 'type8', 32: 'type8', // Contestatarul
      33: 'type9', 34: 'type9', 35: 'type9', 36: 'type9'  // Mediatorul
    };

    const targetType = questionTypeMap[questionNumber];
    if (targetType) {
      scores[targetType] += answer;
    }
  });

  return scores;
};

export const getEnneagramDominantType = (scores: EnneagramScore): string => {
  return Object.entries(scores).reduce((a, b) => 
    scores[a[0] as keyof EnneagramScore] > scores[b[0] as keyof EnneagramScore] ? a : b
  )[0];
};

export const getEnneagramTypeDescription = (type: string, language: 'ro' | 'en' = 'ro') => {
  const descriptions = {
    type1: {
      ro: 'Perfecționistul - Orientat spre principii, ordine și perfecțiune',
      en: 'The Perfectionist - Principled, orderly, and perfectionistic'
    },
    type2: {
      ro: 'Ajutătorul - Empatic, sincer și orientat spre relații',
      en: 'The Helper - Empathetic, sincere, and relationship-oriented'
    },
    type3: {
      ro: 'Realizatorul - Adaptabil, ambițios și orientat spre imagine',
      en: 'The Achiever - Adaptable, ambitious, and image-oriented'
    },
    type4: {
      ro: 'Individualistul - Expresiv, dramatic și orientat spre sine',
      en: 'The Individualist - Expressive, dramatic, and self-absorbed'
    },
    type5: {
      ro: 'Investigatorul - Intens, cerebral și orientat spre izolare',
      en: 'The Investigator - Intense, cerebral, and isolated'
    },
    type6: {
      ro: 'Loialistul - Angajat, orientat spre securitate și anxios',
      en: 'The Loyalist - Committed, security-oriented, and anxious'
    },
    type7: {
      ro: 'Entuziastul - Spontan, versatil și orientat spre achiziții',
      en: 'The Enthusiast - Spontaneous, versatile, and acquisitive'
    },
    type8: {
      ro: 'Contestatarul - Autopossesiv, autoritar și orientat spre control',
      en: 'The Challenger - Self-confident, decisive, and controlling'
    },
    type9: {
      ro: 'Mediatorul - Receptiv, liniștit și orientat spre acord',
      en: 'The Peacemaker - Receptive, reassuring, and agreeable'
    }
  };

  return descriptions[type as keyof typeof descriptions]?.[language] || descriptions.type1[language];
};
