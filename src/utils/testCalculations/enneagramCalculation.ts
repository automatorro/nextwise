
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

  // Maparea ID-urilor de întrebări din baza de date la tipurile Enneagram
  const questionTypeMap: Record<string, keyof EnneagramScore> = {
    // Type 1 - Reformatorul (4 întrebări)
    '56f00dd0-47da-474f-8697-2fad17a273c5': 'type1',
    '593aa9c7-7a5f-47cf-a5ef-89d381598c75': 'type1', 
    '0d789275-7948-4357-a630-5e6752bc910c': 'type1',
    'bc194769-f0a9-448f-bcbb-3f15f9bfd35f': 'type1',
    
    // Type 2 - Ajutătorul (4 întrebări)
    'a70b9e51-0b0e-423c-bd4a-66959ccf1c39': 'type2',
    '89e3de8d-efa1-47cc-a75b-87068a959555': 'type2',
    '6e4f05b8-5c02-4b90-a134-7a2d22afbf1a': 'type2',
    'ea626aa3-45c6-4006-b7a6-308ec16a0e4a': 'type2',
    
    // Type 3 - Realizatorul (4 întrebări)
    '27ce5e57-14b4-4fb2-87dd-ba4e61639cc0': 'type3',
    '1874dcb6-3b01-4b89-8ae9-c7ccf408eedc': 'type3',
    '6f884229-5831-4545-9fd4-a5f5213a0790': 'type3',
    'addef2ba-b315-4cc2-b651-9bcd2b3e5788': 'type3',
    
    // Type 4 - Individualistul (4 întrebări)
    '00ee64c3-3751-4c4d-847f-c8a3f986648e': 'type4',
    '0e3c77cf-7797-4a20-943b-966dc4d6cb9b': 'type4',
    'a28e3b0a-c0b0-47cc-aa4b-545358890041': 'type4',
    '0391e4c6-a2cf-447d-975e-610ab6671ae7': 'type4',
    
    // Type 5 - Investigatorul (4 întrebări)
    'b441aee6-0dd5-4f9a-941c-fc93cffd6862': 'type5',
    '070ff8d0-3084-46f5-8b5b-0cb39baff9ed': 'type5',
    'e1991fc7-43e8-44d8-9bde-f2d0164836c1': 'type5',
    'c8bbfea5-af18-462b-beb2-9538755cf1b8': 'type5',
    
    // Type 6 - Loyalul (4 întrebări)
    '55c8f692-907d-4a60-95d8-290b59422c45': 'type6',
    '709324f5-3d89-42d8-93e3-b93fd1d894a2': 'type6',
    'cfe1bbda-7175-46af-9501-af95fbb80a49': 'type6',
    '1602e7c1-4348-45fa-a5f7-8e5d1ccc07b1': 'type6',
    
    // Type 7 - Entuziastul (4 întrebări)
    'b7b43524-d125-4c02-918b-b1932dcf582f': 'type7',
    '2322edae-52fb-47d2-a878-c8fa8d67c7d9': 'type7',
    '6b2cb9a0-6916-4ad7-9d51-3ebf4368cb56': 'type7',
    '52a16e6b-d6e6-4ae7-bb84-b4f95e0dceb5': 'type7',
    
    // Type 8 - Provocatorul (4 întrebări)
    '12ef8a18-3d75-401e-99f5-4967e74ba487': 'type8',
    '6896828e-64fa-40b3-9264-2121e2e86a87': 'type8',
    '80df737f-a727-421a-97ce-14a728275c3b': 'type8',
    '6d3f8b0b-66af-47f1-8219-fe0ddef28556': 'type8',
    
    // Type 9 - Mediatorul (4 întrebări)
    'fb89e0c5-74c8-4fb8-8369-6d39484e3c30': 'type9',
    '60982f08-552c-42f9-afd6-9f948d87990d': 'type9',
    '3ac82fc1-b0e2-4487-8ee6-5f960c1b4e14': 'type9',
    // Ultima întrebare pentru type9 (36 total)
  };

  // Calculăm scorurile pentru fiecare tip bazat pe răspunsuri
  Object.entries(answers).forEach(([questionId, answer]) => {
    const targetType = questionTypeMap[questionId];
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
      ro: 'Reformatorul - Orientat spre principii, ordine și perfecțiune',
      en: 'The Reformer - Principled, orderly, and perfectionistic'
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
      ro: 'Loyalul - Angajat, orientat spre securitate și anxios',
      en: 'The Loyalist - Committed, security-oriented, and anxious'
    },
    type7: {
      ro: 'Entuziastul - Spontan, versatil și orientat spre achiziții',
      en: 'The Enthusiast - Spontaneous, versatile, and acquisitive'
    },
    type8: {
      ro: 'Provocatorul - Autopossesiv, autoritar și orientat spre control',
      en: 'The Challenger - Self-confident, decisive, and controlling'
    },
    type9: {
      ro: 'Mediatorul - Receptiv, liniștit și orientat spre acord',
      en: 'The Peacemaker - Receptive, reassuring, and agreeable'
    }
  };

  return descriptions[type as keyof typeof descriptions]?.[language] || descriptions.type1[language];
};
