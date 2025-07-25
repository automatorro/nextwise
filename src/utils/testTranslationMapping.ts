
export const getTestTranslation = (testName: string, language: string) => {
  const translations: Record<string, Record<string, { name: string; description?: string }>> = {
    'Big Five Personalitate': {
      ro: {
        name: 'Big Five Personalitate',
        description: 'Evaluează cele cinci dimensiuni fundamentale ale personalității: Deschidere, Conștiinciozitate, Extraversie, Agreabilitate și Neuroticismul.'
      },
      en: {
        name: 'Big Five Personality',
        description: 'Evaluates the five fundamental dimensions of personality: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.'
      }
    },
    'Test SJT - Orientare în Carieră': {
      ro: {
        name: 'Test SJT - Orientare în Carieră',
        description: 'Testul de Judecată Situațională evaluează preferințele tale pentru diferite stiluri de lucru prin scenarii realiste. Descoperă-ți profilul de carieră dominant.'
      },
      en: {
        name: 'SJT - Career Orientation Test',
        description: 'The Situational Judgment Test evaluates your preferences for different work styles through realistic scenarios. Discover your dominant career profile.'
      }
    },
    'Cattell 16PF': {
      ro: {
        name: 'Cattell 16PF',
        description: 'Măsoară 16 factori fundamentali ai personalității dezvoltați de Raymond Cattell pentru o evaluare cuprinzătoare a trăsăturilor de personalitate.'
      },
      en: {
        name: 'Cattell 16PF',
        description: 'Measures 16 fundamental personality factors developed by Raymond Cattell for a comprehensive assessment of personality traits.'
      }
    },
    'GAD-7': {
      ro: {
        name: 'GAD-7 - Anxietate Generalizată',
        description: 'Un instrument de screening validat științific pentru evaluarea severității anxietății generalizate în ultimele două săptămâni.'
      },
      en: {
        name: 'GAD-7 - Generalized Anxiety',
        description: 'A scientifically validated screening tool for assessing the severity of generalized anxiety over the past two weeks.'
      }
    },
    'Inteligența Emoțională': {
      ro: {
        name: 'Inteligența Emoțională',
        description: 'Evaluează capacitatea ta de a recunoaște, înțelege și gestiona emoțiile proprii și ale celorlalți în situații diverse.'
      },
      en: {
        name: 'Emotional Intelligence',
        description: 'Evaluates your ability to recognize, understand, and manage your own emotions and those of others in various situations.'
      }
    },
    'Test de Leadership': {
      ro: {
        name: 'Test de Leadership',
        description: 'Măsoară competențele și stilurile de leadership, incluzând viziunea, comunicarea, luarea deciziilor și gestionarea echipei.'
      },
      en: {
        name: 'Leadership Test',
        description: 'Measures leadership competencies and styles, including vision, communication, decision-making, and team management.'
      }
    },
    'Test de Gestionare a Stresului': {
      ro: {
        name: 'Test de Gestionare a Stresului',
        description: 'Evaluează capacitatea ta de a face față presiunii și stresului în diferite situații profesionale și personale.'
      },
      en: {
        name: 'Stress Management Test',
        description: 'Evaluates your ability to cope with pressure and stress in various professional and personal situations.'
      }
    },
    'Test DISC': {
      ro: {
        name: 'Test DISC',
        description: 'Analizează stilul tău comportamental pe patru dimensiuni: Dominanță, Influență, Stabilitate și Conformitate.'
      },
      en: {
        name: 'DISC Test',
        description: 'Analyzes your behavioral style across four dimensions: Dominance, Influence, Steadiness, and Compliance.'
      }
    },
    'Enneagram': {
      ro: {
        name: 'Test Enneagram',
        description: 'Identifică unul din cele 9 tipuri de personalitate Enneagram, fiecare cu motivații, frici și comportamente distinctive.'
      },
      en: {
        name: 'Enneagram Test',
        description: 'Identifies one of 9 Enneagram personality types, each with distinctive motivations, fears, and behaviors.'
      }
    },
    'HEXACO': {
      ro: {
        name: 'Test HEXACO',
        description: 'Măsoară personalitatea pe 6 dimensiuni: Onestitate-Umilință, Emotivitate, Extraversie, Agreabilitate, Conștiinciozitate și Deschidere.'
      },
      en: {
        name: 'HEXACO Test',
        description: 'Measures personality across 6 dimensions: Honesty-Humility, Emotionality, Extraversion, Agreeableness, Conscientiousness, and Openness.'
      }
    },
    'Roluri în Echipă Belbin': {
      ro: {
        name: 'Roluri în Echipă Belbin',
        description: 'Identifică preferințele tale pentru unul din cele 9 roluri în echipă descrise de Meredith Belbin.'
      },
      en: {
        name: 'Belbin Team Roles',
        description: 'Identifies your preferences for one of the 9 team roles described by Meredith Belbin.'
      }
    },
    'Test Aptitudini Cognitive': {
      ro: {
        name: 'Test Aptitudini Cognitive',
        description: 'Evaluează abilitățile tale mentale în domeniile verbal, numeric, logic, spațial și abstract.'
      },
      en: {
        name: 'Cognitive Abilities Test',
        description: 'Evaluates your mental abilities in verbal, numerical, logical, spatial, and abstract domains.'
      }
    },
    'Beck Depression Inventory': {
      ro: {
        name: 'Inventarul Beck pentru Depresie',
        description: 'Un instrument clinic validat pentru evaluarea severității simptomelor depresive în ultimele două săptămâni.'
      },
      en: {
        name: 'Beck Depression Inventory',
        description: 'A validated clinical instrument for assessing the severity of depressive symptoms over the past two weeks.'
      }
    },
    'Competențe Digitale': {
      ro: {
        name: 'Test Competențe Digitale',
        description: 'Evaluează nivelul tău de competențe digitale în cinci domenii cheie: informație, comunicare, creare conținut, siguranță și rezolvare probleme.'
      },
      en: {
        name: 'Digital Competencies Test',
        description: 'Evaluates your level of digital competencies in five key areas: information, communication, content creation, safety, and problem-solving.'
      }
    },
    'Test de Competențe Manageriale': {
      ro: {
        name: 'Test de Competențe Manageriale',
        description: 'Evaluează competențele manageriale prin scenarii de judecată situațională. Testul măsoară abilitățile de leadership, luarea deciziilor și gestionarea echipei în diverse contexte profesionale.'
      },
      en: {
        name: 'Managerial Competencies Test',
        description: 'Evaluates managerial competencies through situational judgment scenarios. The test measures leadership abilities, decision-making, and team management in various professional contexts.'
      }
    },
    'Test Percepție Senzorială': {
      ro: {
        name: 'Test Percepție Senzorială',
        description: 'Evaluează preferințele tale în procesarea informațiilor prin diferite canale senzoriale: vizual, auditiv, kinestezic și digital.'
      },
      en: {
        name: 'Sensory Perception Test',
        description: 'Evaluates your preferences in processing information through different sensory channels: visual, auditory, kinesthetic, and digital.'
      }
    }
  };

  const testTranslation = translations[testName];
  if (!testTranslation) {
    return { name: testName };
  }

  return testTranslation[language] || testTranslation['ro'] || { name: testName };
};
