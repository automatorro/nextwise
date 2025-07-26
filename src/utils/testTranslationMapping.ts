export const bigFiveTranslations = {
  'Foarte improbabil': 'Very Unlikely',
  'Improbabil': 'Unlikely',
  'Neutru': 'Neutral',
  'Probabil': 'Likely',
  'Foarte probabil': 'Very Likely',
} as const;

export const cattellTranslations = {
  'A': 'Reserved, detached',
  'B': 'Less intelligent, concrete',
  'C': 'Affected by feelings, easily upset',
  'E': 'Submissive, humble',
  'F': 'Sober, taciturn',
  'G': 'Expedient, disregards rules',
  'H': 'Shy, threat-sensitive',
  'I': 'Tough-minded, self-reliant',
  'L': 'Trusting, adaptable',
  'M': 'Practical, down-to-earth',
  'N': 'Forthright, unpretentious',
  'O': 'Self-assured, placid',
  'Q1': 'Conservative, respecting traditional ideas',
  'Q2': 'Group-oriented, a joiner',
  'Q3': 'Undisciplined, self-conflicted',
  'Q4': 'Relaxed, tranquil'
} as const;

export const discTranslations = {
  'Dominanță': 'Dominance',
  'Influență': 'Influence',
  'Stabilitate': 'Steadiness',
  'Conștiinciozitate': 'Conscientiousness'
} as const;

export const emotionalIntelligenceTranslations = {
  'Percepția emoțiilor': 'Perceiving Emotions',
  'Utilizarea emoțiilor': 'Using Emotions',
  'Înțelegerea emoțiilor': 'Understanding Emotions',
  'Gestionarea emoțiilor': 'Managing Emotions'
} as const;

export const cognitiveTranslations = {
  'Ușor': 'Easy',
  'Mediu': 'Medium',
  'Greu': 'Hard'
} as const;

export const belbinTranslations = {
  'Plant': 'Plant',
  'Resource Investigator': 'Resource Investigator',
  'Coordinator': 'Coordinator',
  'Shaper': 'Shaper',
  'Monitor Evaluator': 'Monitor Evaluator',
  'Teamworker': 'Teamworker',
  'Implementer': 'Implementer',
  'Completer Finisher': 'Completer Finisher',
  'Specialist': 'Specialist'
} as const;

export const hexacoTranslations = {
  'Dezacord puternic': 'Strongly Disagree',
  'Dezacord': 'Disagree',
  'Neutru': 'Neutral',
  'Acord': 'Agree',
  'Acord puternic': 'Strongly Agree'
} as const;

export const gad7Translations = {
  'Deloc': 'Not at all',
  'Câteva zile': 'Several days',
  'Mai mult de jumătate din zile': 'More than half the days',
  'Aproape în fiecare zi': 'Nearly every day'
} as const;

export const sjtTranslations = {
  'Foarte rău': 'Very Bad',
  'Rău': 'Bad',
  'Neutru': 'Neutral',
  'Bine': 'Good',
  'Foarte bine': 'Very Good'
} as const;

export const professionalAptitudeTranslations = {
  'De acord pe deplin': 'Strongly Agree',
  'De acord': 'Agree',
  'Neutru': 'Neutral',
  'Nu sunt de acord': 'Disagree',
  'Nu sunt de acord deloc': 'Strongly Disagree'
} as const;

export const watsonGlaserTranslations = {
  // Inference options
  'Adevărat': 'True',
  'Probabil adevărat': 'Probably True',
  'Date insuficiente': 'Insufficient Data',
  'Probabil fals': 'Probably False',
  'Fals': 'False',

  // Recognition of Assumptions options
  'Presupunere corectă': 'Assumption Made',
  'Presupunere incorectă': 'Assumption Not Made',

  // Deduction options
  'Concluzie validă': 'Conclusion Follows',
  'Concluzie nevalidă': 'Conclusion Does Not Follow',

  // Interpretation options
  'Concluzie justificată': 'Conclusion Warranted',
  'Concluzie nejustificată': 'Conclusion Not Warranted',

  // Evaluation of Arguments options
  'Argument puternic': 'Strong Argument',
  'Argument slab': 'Weak Argument'
} as const;

// Test name and description translations
export const testNameTranslations: Record<string, { ro: string; en: string }> = {
  'Big Five Personality Test': {
    ro: 'Testul Big Five de Personalitate',
    en: 'Big Five Personality Test'
  },
  'DISC Assessment': {
    ro: 'Evaluarea DISC',
    en: 'DISC Assessment'
  },
  'Emotional Intelligence Test': {
    ro: 'Testul de Inteligență Emoțională',
    en: 'Emotional Intelligence Test'
  },
  'Cognitive Abilities Test': {
    ro: 'Testul de Abilități Cognitive',
    en: 'Cognitive Abilities Test'
  },
  'Belbin Team Roles': {
    ro: 'Rolurile din Echipă Belbin',
    en: 'Belbin Team Roles'
  },
  'HEXACO Personality Inventory': {
    ro: 'Inventarul de Personalitate HEXACO',
    en: 'HEXACO Personality Inventory'
  },
  'GAD-7 Anxiety Scale': {
    ro: 'Scala de Anxietate GAD-7',
    en: 'GAD-7 Anxiety Scale'
  },
  'Situational Judgment Test': {
    ro: 'Test de Judecată Situațională',
    en: 'Situational Judgment Test'
  },
  'Professional Aptitude Test': {
    ro: 'Test de Aptitudini Profesionale',
    en: 'Professional Aptitude Test'
  },
  'Watson-Glaser Critical Thinking': {
    ro: 'Gândirea Critică Watson-Glaser',
    en: 'Watson-Glaser Critical Thinking'
  },
  'Beck Depression Inventory': {
    ro: 'Inventarul de Depresie Beck',
    en: 'Beck Depression Inventory'
  }
};

export const testDescriptionTranslations: Record<string, { ro: string; en: string }> = {
  'Big Five Personality Test': {
    ro: 'Evaluează cele cinci dimensiuni principale ale personalității: Extraversiunea, Agreabilitatea, Conștiinciozitatea, Neuroticismul și Deschiderea către experiență.',
    en: 'Evaluates the five main dimensions of personality: Extraversion, Agreeableness, Conscientiousness, Neuroticism, and Openness to experience.'
  },
  'DISC Assessment': {
    ro: 'Identifică stilul tău comportamental în patru categorii: Dominanță, Influență, Stabilitate și Conștiinciozitate.',
    en: 'Identifies your behavioral style in four categories: Dominance, Influence, Steadiness, and Conscientiousness.'
  },
  'Emotional Intelligence Test': {
    ro: 'Măsoară capacitatea de a percepe, utiliza, înțelege și gestiona emoțiile în mod eficient.',
    en: 'Measures the ability to perceive, use, understand, and manage emotions effectively.'
  },
  'Cognitive Abilities Test': {
    ro: 'Evaluează abilitățile cognitive generale, inclusiv raționamentul logic, memoria și viteza de procesare.',
    en: 'Evaluates general cognitive abilities, including logical reasoning, memory, and processing speed.'
  },
  'Belbin Team Roles': {
    ro: 'Identifică rolurile preferate în echipă și contribuțiile tale unice într-un mediu colaborativ.',
    en: 'Identifies preferred team roles and your unique contributions in a collaborative environment.'
  },
  'HEXACO Personality Inventory': {
    ro: 'Măsoară șase factori majori ai personalității: Onestitatea, Emoționalitatea, Extraversiunea, Agreabilitatea, Conștiinciozitatea și Deschiderea.',
    en: 'Measures six major personality factors: Honesty, Emotionality, Extraversion, Agreeableness, Conscientiousness, and Openness.'
  },
  'GAD-7 Anxiety Scale': {
    ro: 'Evaluează severitatea simptomelor de anxietate generalizată în ultimele două săptămâni.',
    en: 'Evaluates the severity of generalized anxiety symptoms over the past two weeks.'
  },
  'Situational Judgment Test': {
    ro: 'Testează capacitatea de a lua decizii eficiente în situații profesionale complexe.',
    en: 'Tests the ability to make effective decisions in complex professional situations.'
  },
  'Professional Aptitude Test': {
    ro: 'Evaluează aptitudinile și competențele necesare pentru diverse cariere profesionale.',
    en: 'Evaluates aptitudes and competencies needed for various professional careers.'
  },
  'Watson-Glaser Critical Thinking': {
    ro: 'Măsoară abilitățile de gândire critică în cinci domenii: inferență, recunoașterea presupunerilor, deducție, interpretare și evaluarea argumentelor.',
    en: 'Measures critical thinking abilities in five areas: inference, recognition of assumptions, deduction, interpretation, and evaluation of arguments.'
  },
  'Beck Depression Inventory': {
    ro: 'Evaluează severitatea simptomelor depresive și monitorizează progresul în timp.',
    en: 'Evaluates the severity of depressive symptoms and monitors progress over time.'
  }
};

export const getTestTranslation = (testName: string, language: string) => {
  const nameTranslation = testNameTranslations[testName];
  const descriptionTranslation = testDescriptionTranslations[testName];

  return {
    name: language === 'ro' && nameTranslation ? nameTranslation.ro : (nameTranslation?.en || testName),
    description: language === 'ro' && descriptionTranslation ? descriptionTranslation.ro : (descriptionTranslation?.en || '')
  };
};
