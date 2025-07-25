
// Translation objects for test options
export const bigFiveTranslations = {
  'Complet dezacord': 'Strongly Disagree',
  'Dezacord': 'Disagree',
  'Neutru': 'Neutral',
  'Acord': 'Agree',
  'Complet de acord': 'Strongly Agree'
};

export const cattellTranslations = {
  'Complet dezacord': 'Strongly Disagree',
  'Dezacord': 'Disagree',
  'Neutru': 'Neutral',
  'Acord': 'Agree',
  'Complet de acord': 'Strongly Agree'
};

export const discTranslations = {
  'Complet dezacord': 'Strongly Disagree',
  'Dezacord': 'Disagree',
  'Neutru': 'Neutral',
  'Acord': 'Agree',
  'Complet de acord': 'Strongly Agree'
};

export const emotionalIntelligenceTranslations = {
  'Complet dezacord': 'Strongly Disagree',
  'Dezacord': 'Disagree',
  'Neutru': 'Neutral',
  'Acord': 'Agree',
  'Complet de acord': 'Strongly Agree'
};

export const cognitiveTranslations = {
  'Complet dezacord': 'Strongly Disagree',
  'Dezacord': 'Disagree',
  'Neutru': 'Neutral',
  'Acord': 'Agree',
  'Complet de acord': 'Strongly Agree'
};

export const belbinTranslations = {
  'Complet dezacord': 'Strongly Disagree',
  'Dezacord': 'Disagree',
  'Neutru': 'Neutral',
  'Acord': 'Agree',
  'Complet de acord': 'Strongly Agree'
};

export const hexacoTranslations = {
  'Complet dezacord': 'Strongly Disagree',
  'Dezacord': 'Disagree',
  'Neutru': 'Neutral',
  'Acord': 'Agree',
  'Complet de acord': 'Strongly Agree'
};

export const gad7Translations = {
  'Deloc': 'Not at all',
  'Câteva zile': 'Several days',
  'Mai mult de jumătate din zile': 'More than half the days',
  'Aproape zilnic': 'Nearly every day'
};

export const sjtTranslations = {
  'Foarte eficient': 'Very effective',
  'Eficient': 'Effective',
  'Oarecum eficient': 'Somewhat effective',
  'Ineficient': 'Ineffective',
  'Foarte ineficient': 'Very ineffective'
};

export const professionalAptitudeTranslations = {
  'Foarte eficient': 'Very effective',
  'Eficient': 'Effective',
  'Oarecum eficient': 'Somewhat effective',
  'Ineficient': 'Ineffective',
  'Foarte ineficient': 'Very ineffective'
};

export const watsonGlaserTranslations = {
  'Adevărat': 'True',
  'Fals': 'False',
  'Probabil adevărat': 'Probably true',
  'Probabil fals': 'Probably false',
  'Date insuficiente': 'Insufficient data',
  'Urmează logic': 'Follows logically',
  'Nu urmează logic': 'Does not follow logically'
};

export const getTestTranslation = (testName: string, language: string) => {
  const translations: Record<string, { ro: { name: string; description: string }, en: { name: string; description: string } }> = {
    'Big Five Personality Test': {
      ro: {
        name: 'Testul Big Five de Personalitate',
        description: 'Evaluează personalitatea pe baza celor cinci dimensiuni fundamentale: deschidere, conștiinciozitate, extraversiune, agreabilitate și neuroticismul.'
      },
      en: {
        name: 'Big Five Personality Test',
        description: 'Assesses personality based on five fundamental dimensions: openness, conscientiousness, extraversion, agreeableness, and neuroticism.'
      }
    },
    'Watson-Glaser Critical Thinking Appraisal': {
      ro: {
        name: 'Testul Watson-Glaser de Gândire Critică',
        description: 'Evaluează abilitățile de gândire critică prin inferențe, recunoașterea asumpțiilor, deducție, interpretarea și evaluarea argumentelor.'
      },
      en: {
        name: 'Watson-Glaser Critical Thinking Appraisal',
        description: 'Assesses critical thinking abilities through inference, assumption recognition, deduction, interpretation, and argument evaluation.'
      }
    },
    'Cattell 16PF': {
      ro: {
        name: 'Testul Cattell 16PF',
        description: 'Măsoară 16 factori principali ai personalității pentru o evaluare comprehensivă a trăsăturilor individuale.'
      },
      en: {
        name: 'Cattell 16PF Test',
        description: 'Measures 16 primary personality factors for a comprehensive assessment of individual traits.'
      }
    },
    'DISC Assessment': {
      ro: {
        name: 'Evaluarea DISC',
        description: 'Analizează stilul comportamental pe baza dominanței, influenței, stabilității și conformității.'
      },
      en: {
        name: 'DISC Assessment',
        description: 'Analyzes behavioral style based on dominance, influence, steadiness, and compliance.'
      }
    },
    'Emotional Intelligence Test': {
      ro: {
        name: 'Testul de Inteligență Emoțională',
        description: 'Evaluează capacitatea de a înțelege, utiliza și gestiona emoțiile în mod eficient.'
      },
      en: {
        name: 'Emotional Intelligence Test',
        description: 'Assesses the ability to understand, use, and manage emotions effectively.'
      }
    },
    'Belbin Team Roles': {
      ro: {
        name: 'Rolurile în Echipă Belbin',
        description: 'Identifică rolurile preferate în echipă și stilurile de colaborare pentru o mai bună performanță în grup.'
      },
      en: {
        name: 'Belbin Team Roles',
        description: 'Identifies preferred team roles and collaboration styles for better group performance.'
      }
    },
    'HEXACO Personality Test': {
      ro: {
        name: 'Testul de Personalitate HEXACO',
        description: 'Evaluează personalitatea pe șase dimensiuni: sinceritate-umilință, emoționalitate, extraversiune, agreabilitate, conștiinciozitate și deschidere.'
      },
      en: {
        name: 'HEXACO Personality Test',
        description: 'Assesses personality across six dimensions: honesty-humility, emotionality, extraversion, agreeableness, conscientiousness, and openness.'
      }
    },
    'GAD-7 Anxiety Scale': {
      ro: {
        name: 'Scala de Anxietate GAD-7',
        description: 'Screeningul și monitorizarea simptomelor de anxietate generalizată.'
      },
      en: {
        name: 'GAD-7 Anxiety Scale',
        description: 'Screening and monitoring of generalized anxiety symptoms.'
      }
    },
    'Competențe Manageriale': {
      ro: {
        name: 'Testul de Competențe Manageriale',
        description: 'Evaluează abilitățile de leadership și management prin scenarii situaționale.'
      },
      en: {
        name: 'Managerial Competencies Test',
        description: 'Assesses leadership and management skills through situational scenarios.'
      }
    },
    'Test Situational de Evaluare (SJT)': {
      ro: {
        name: 'Test Situational de Evaluare (SJT)',
        description: 'Evaluează judgmentul și abilitățile de luare a deciziilor prin scenarii realiste de lucru.'
      },
      en: {
        name: 'Situational Judgment Test (SJT)',
        description: 'Assesses judgment and decision-making skills through realistic work scenarios.'
      }
    },
    'Test de Orientare în Carieră': {
      ro: {
        name: 'Test de Orientare în Carieră',
        description: 'Identifică interesele și aptitudinile pentru a ghida deciziile de carieră.'
      },
      en: {
        name: 'Career Orientation Test',
        description: 'Identifies interests and aptitudes to guide career decisions.'
      }
    },
    'Enneagram Test': {
      ro: {
        name: 'Testul Enneagramă',
        description: 'Explorează cele nouă tipuri de personalitate și motivațiile lor fundamentale.'
      },
      en: {
        name: 'Enneagram Test',
        description: 'Explores nine personality types and their fundamental motivations.'
      }
    },
    'Aptitudini Cognitive': {
      ro: {
        name: 'Testul de Aptitudini Cognitive',
        description: 'Evaluează abilitățile mentale generale și capacitățile de procesare cognitivă.'
      },
      en: {
        name: 'Cognitive Aptitude Test',
        description: 'Assesses general mental abilities and cognitive processing capabilities.'
      }
    }
  };

  const translation = translations[testName];
  if (!translation) {
    return {
      name: testName,
      description: ''
    };
  }

  return translation[language as keyof typeof translation] || translation.ro;
};
