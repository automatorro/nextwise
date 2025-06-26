
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

  // Depression/Anxiety levels
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
    noResultsFound: language === 'en' ? 'Results not found' : 'Rezultatul nu a fost găsit'
  };
};
