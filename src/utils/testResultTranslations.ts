interface TestResultTranslations {
  [key: string]: {
    en: string;
    ro: string;
  };
}

export const interpretationTranslations: TestResultTranslations = {
  // Big Five interpretations
  'Scor foarte scăzut': {
    en: 'Very low score',
    ro: 'Scor foarte scăzut'
  },
  'Scor scăzut': {
    en: 'Low score', 
    ro: 'Scor scăzut'
  },
  'Scor moderat': {
    en: 'Moderate score',
    ro: 'Scor moderat'
  },
  'Scor ridicat': {
    en: 'High score',
    ro: 'Scor ridicat'
  },
  'Scor foarte ridicat': {
    en: 'Very high score',
    ro: 'Scor foarte ridicat'
  },
  
  // GAD-7 Anxiety specific interpretations
  'Anxietate minimă': {
    en: 'Minimal anxiety',
    ro: 'Anxietate minimă'
  },
  'Anxietate ușoară': {
    en: 'Mild anxiety',
    ro: 'Anxietate ușoară'
  },
  'Anxietate moderată': {
    en: 'Moderate anxiety',
    ro: 'Anxietate moderată'
  },
  'Anxietate severă': {
    en: 'Severe anxiety',
    ro: 'Anxietate severă'
  },
  'Nivel minimal de anxietate': {
    en: 'Minimal level of anxiety',
    ro: 'Nivel minimal de anxietate'
  },
  'Nivel ușor de anxietate': {
    en: 'Mild level of anxiety',
    ro: 'Nivel ușor de anxietate'
  },
  'Nivel moderat de anxietate': {
    en: 'Moderate level of anxiety',
    ro: 'Nivel moderat de anxietate'
  },
  'Nivel sever de anxietate': {
    en: 'Severe level of anxiety',
    ro: 'Nivel sever de anxietate'
  },

  // PHQ-9 Depression specific interpretations
  'Depresie minimă': {
    en: 'Minimal depression',
    ro: 'Depresie minimă'
  },
  'Depresie ușoară': {
    en: 'Mild depression',
    ro: 'Depresie ușoară'
  },
  'Depresie moderată': {
    en: 'Moderate depression',
    ro: 'Depresie moderată'
  },
  'Depresie severă': {
    en: 'Severe depression',
    ro: 'Depresie severă'
  },
  'Depresie foarte severă': {
    en: 'Very severe depression',
    ro: 'Depresie foarte severă'
  },

  // DISC specific interpretations
  'Stil Dominant': {
    en: 'Dominant style',
    ro: 'Stil Dominant'
  },
  'Stil Influent': {
    en: 'Influential style',
    ro: 'Stil Influent'
  },
  'Stil Stabil': {
    en: 'Steady style',
    ro: 'Stil Stabil'
  },
  'Stil Conștiincios': {
    en: 'Conscientious style',
    ro: 'Stil Conștiincios'
  },

  // Cognitive abilities interpretations
  'Performanță excelentă': {
    en: 'Excellent performance',
    ro: 'Performanță excelentă'
  },
  'Performanță foarte bună': {
    en: 'Very good performance',
    ro: 'Performanță foarte bună'
  },
  'Performanță bună': {
    en: 'Good performance',
    ro: 'Performanță bună'
  },
  'Performanță medie': {
    en: 'Average performance',
    ro: 'Performanță medie'
  },
  'Performanță sub medie': {
    en: 'Below average performance',
    ro: 'Performanță sub medie'
  },

  // General levels
  'Nivel minimal': {
    en: 'Minimal level',
    ro: 'Nivel minimal'
  },
  'Nivel ușor': {
    en: 'Mild level',
    ro: 'Nivel ușor'
  },
  'Nivel moderat': {
    en: 'Moderate level',
    ro: 'Nivel moderat'
  },
  'Nivel sever': {
    en: 'Severe level',
    ro: 'Nivel sever'
  },

  // Stress levels
  'Stres scăzut': {
    en: 'Low stress',
    ro: 'Stres scăzut'
  },
  'Stres moderat': {
    en: 'Moderate stress',
    ro: 'Stres moderat'
  },
  'Stres ridicat': {
    en: 'High stress',
    ro: 'Stres ridicat'
  },

  // Leadership levels
  'Potențial de leadership scăzut': {
    en: 'Low leadership potential',
    ro: 'Potențial de leadership scăzut'
  },
  'Potențial de leadership moderat': {
    en: 'Moderate leadership potential', 
    ro: 'Potențial de leadership moderat'
  },
  'Potențial de leadership ridicat': {
    en: 'High leadership potential',
    ro: 'Potențial de leadership ridicat'
  },

  // Emotional Intelligence levels
  'Inteligență emoțională scăzută': {
    en: 'Low emotional intelligence',
    ro: 'Inteligență emoțională scăzută'
  },
  'Inteligență emoțională moderată': {
    en: 'Moderate emotional intelligence',
    ro: 'Inteligență emoțională moderată'
  },
  'Inteligență emoțională ridicată': {
    en: 'High emotional intelligence',
    ro: 'Inteligență emoțională ridicată'
  },

  // Generic interpretations for fallback
  'Interpretarea nu este disponibilă': {
    en: 'Interpretation not available',
    ro: 'Interpretarea nu este disponibilă'
  },
  'Rezultate indisponibile': {
    en: 'Results unavailable',
    ro: 'Rezultate indisponibile'
  }
};

export const dimensionTranslations: TestResultTranslations = {
  // Big Five dimensions
  'openness': {
    en: 'Openness to Experience',
    ro: 'Deschidere către Experiență'
  },
  'conscientiousness': {
    en: 'Conscientiousness',
    ro: 'Conștiinciozitate'
  },
  'extraversion': {
    en: 'Extraversion',
    ro: 'Extraversiune'
  },
  'agreeableness': {
    en: 'Agreeableness', 
    ro: 'Agreabilitate'
  },
  'neuroticism': {
    en: 'Neuroticism',
    ro: 'Nevrotism'
  },

  // Cognitive abilities dimensions
  'logical_reasoning': {
    en: 'Logical Reasoning',
    ro: 'Raționament Logic'
  },
  'numerical_reasoning': {
    en: 'Numerical Reasoning',
    ro: 'Raționament Numeric'
  },
  'verbal_reasoning': {
    en: 'Verbal Reasoning',
    ro: 'Raționament Verbal'
  },
  'spatial_reasoning': {
    en: 'Spatial Reasoning',
    ro: 'Raționament Spațial'
  },
  'abstract_reasoning': {
    en: 'Abstract Reasoning',
    ro: 'Raționament Abstract'
  },

  // Emotional Intelligence dimensions
  'self_awareness': {
    en: 'Self-Awareness',
    ro: 'Autocunoaștere'
  },
  'self_regulation': {
    en: 'Self-Regulation',
    ro: 'Autoreglementare'
  },
  'motivation': {
    en: 'Motivation',
    ro: 'Motivație'
  },
  'empathy': {
    en: 'Empathy',
    ro: 'Empatie'
  },
  'social_skills': {
    en: 'Social Skills',
    ro: 'Abilități Sociale'
  }
};

export const translateInterpretation = (text: string, targetLanguage: 'en' | 'ro'): string => {
  if (!text) return text;
  
  // Try direct translation first
  const directTranslation = interpretationTranslations[text];
  if (directTranslation) {
    return directTranslation[targetLanguage];
  }

  // Try partial matching for longer texts
  for (const [key, translation] of Object.entries(interpretationTranslations)) {
    if (text.includes(key)) {
      return text.replace(key, translation[targetLanguage]);
    }
  }

  // Enhanced fallback with smart interpretation
  if (targetLanguage === 'en') {
    // Generic Romanian to English patterns
    if (text.includes('scăzut')) return text.replace('scăzut', 'low');
    if (text.includes('ridicat')) return text.replace('ridicat', 'high');
    if (text.includes('moderat')) return text.replace('moderat', 'moderate');
    if (text.includes('minimal')) return text.replace('minimal', 'minimal');
    if (text.includes('sever')) return text.replace('sever', 'severe');
    if (text.includes('nivel')) return text.replace('nivel', 'level');
    if (text.includes('scor')) return text.replace('scor', 'score');
  }

  return text;
};

export const translateDimension = (dimensionKey: string, targetLanguage: 'en' | 'ro'): string => {
  const translation = dimensionTranslations[dimensionKey.toLowerCase()];
  return translation ? translation[targetLanguage] : dimensionKey;
};

export const getResultLabels = (language: 'en' | 'ro') => {
  return {
    overallScore: language === 'en' ? 'Overall Score' : 'Scor General',
    interpretation: language === 'en' ? 'Interpretation' : 'Interpretare',
    dimensions: language === 'en' ? 'Dimensions' : 'Dimensiuni',
    testResults: language === 'en' ? 'Test Results' : 'Rezultatele Testului',
    completedAt: language === 'en' ? 'Completed at' : 'Completat la',
    backToTests: language === 'en' ? 'Back to Tests' : 'Înapoi la Teste',
    generateAnalysis: language === 'en' ? 'Generate Detailed Analysis' : 'Generează Analiza Detaliată',
    analysisDescription: language === 'en' 
      ? 'Get a personalized AI analysis and specific recommendations based on your results'
      : 'Primește o analiză personalizată cu AI și recomandări specifice bazate pe rezultatele tale',
    noResultsFound: language === 'en' ? 'Results not found' : 'Rezultatul nu a fost găsit',
    scoreExplanation: language === 'en' ? 'Understanding Your Score' : 'Înțelegerea Scorului',
    detailedExplanations: language === 'en' ? 'Detailed Dimension Explanations' : 'Explicații Detaliate ale Dimensiunilor',
    detailedInterpretations: language === 'en' ? 'Detailed Interpretations' : 'Interpretări Detaliate',
    answerAnalysis: language === 'en' ? 'Detailed Answer Analysis' : 'Analiza Detaliată a Răspunsurilor',
    testResult: language === 'en' ? 'Test Result' : 'Rezultatul testului',
    completedOn: language === 'en' ? 'Completed on' : 'Completat pe',
    overallScoreTitle: language === 'en' ? 'Overall Score' : 'Scorul General',
    scoredPoints: language === 'en' ? 'Points scored' : 'Scor obținut',
    maxPoints: language === 'en' ? 'Maximum score' : 'Scor maxim'
  };
};
