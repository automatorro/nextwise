export interface DimensionExplanation {
  description: string;
  interpretations?: {
    high: string;
    low: string;
  };
  yourScore?: {
    high?: string;
    moderate?: string;
    low?: string;
  };
}

export const getDimensionLabel = (dimensionKey: string): string => {
  const labels: { [key: string]: string } = {
    // Big Five dimensions
    openness: 'Deschidere către Experiență',
    conscientiousness: 'Conștiinciozitate',
    extraversion: 'Extraversiune',
    agreeableness: 'Agreabilitate',
    neuroticism: 'Neuroticismul',
    
    // Cattell 16PF dimensions
    warmth: 'Căldură',
    reasoning: 'Raționament',
    emotional_stability: 'Stabilitate Emoțională',
    dominance: 'Dominanță',
    liveliness: 'Vivacitate',
    rule_consciousness: 'Conștiința Regulilor',
    social_boldness: 'Îndrăzneală Socială',
    sensitivity: 'Sensibilitate',
    vigilance: 'Vigilență',
    abstractedness: 'Abstractizare',
    privateness: 'Caracter Privat',
    apprehension: 'Îngrijorare',
    openness_to_change: 'Deschidere către Schimbare',
    self_reliance: 'Autoîncredere',
    perfectionism: 'Perfecționism',
    tension: 'Tensiune',
    
    // DISC dimensions
    dominance_disc: 'Dominanță (D)',
    influence: 'Influență (I)',
    steadiness: 'Stabilitate (S)',
    conscientiousness_disc: 'Conștiinciozitate (C)',
    
    // Leadership dimensions
    vision: 'Viziune',
    empathy: 'Empatie',
    decision_making: 'Luarea Deciziilor',
    communication: 'Comunicare',
    team_building: 'Construirea Echipei'
  };
  
  return labels[dimensionKey] || dimensionKey.charAt(0).toUpperCase() + dimensionKey.slice(1);
};

export const getScoreColor = (score: number): string => {
  if (score >= 70) {
    return 'text-green-500';
  } else if (score >= 40) {
    return 'text-yellow-500';
  } else {
    return 'text-red-500';
  }
};

export const getDimensionExplanation = (testName: string, dimensionKey: string): DimensionExplanation | null => {
  // Map numeric keys to dimension names for specific tests
  const getActualDimensionKey = (testName: string, key: string): string => {
    if (testName.includes('Inteligență Emoțională')) {
      const mapping: { [key: string]: string } = {
        '0': 'self_awareness',
        '1': 'self_regulation', 
        '2': 'motivation',
        '3': 'empathy',
        '4': 'social_skills'
      };
      return mapping[key] || key;
    }
    
    if (testName.includes('GAD-7')) {
      const mapping: { [key: string]: string } = {
        '0': 'worry_frequency',
        '1': 'control_difficulty',
        '2': 'anxiety_symptoms',
        '3': 'restlessness',
        '4': 'concentration_problems',
        '5': 'irritability',
        '6': 'sleep_disturbance'
      };
      return mapping[key] || key;
    }

    if (testName.includes('Beck Depression')) {
      const mapping: { [key: string]: string } = {
        '0': 'mood_symptoms',
        '1': 'cognitive_symptoms',
        '2': 'physical_symptoms',
        '3': 'behavioral_symptoms'
      };
      return mapping[key] || key;
    }

    if (testName.includes('Aptitudini Profesionale')) {
      const mapping: { [key: string]: string } = {
        '0': 'analytical_thinking',
        '1': 'communication_skills',
        '2': 'leadership_potential',
        '3': 'adaptability',
        '4': 'teamwork'
      };
      return mapping[key] || key;
    }

    if (testName.includes('Competențe Digitale')) {
      const mapping: { [key: string]: string } = {
        '0': 'technical_proficiency',
        '1': 'digital_communication',
        '2': 'data_analysis',
        '3': 'cybersecurity_awareness',
        '4': 'digital_innovation'
      };
      return mapping[key] || key;
    }
    
    return key;
  };

  const actualKey = getActualDimensionKey(testName, dimensionKey);
  
  const explanations: { [testType: string]: { [dimension: string]: DimensionExplanation } } = {
    'Big Five': {
      openness: {
        description: 'Măsoară creativitatea, curiositatea intelectuală și deschiderea către experiențe noi.',
        interpretations: {
          high: 'Ești o persoană creativă, deschisă la idei noi și experimente. Îți place să explorezi concepte abstracte.',
          low: 'Preferi rutina și tradițiile. Ești mai conservator în abordări și îți place stabilitatea.'
        },
        yourScore: {
          high: 'Scorul tău ridicat indică o personalitate creativă și aventuroasă.',
          moderate: 'Ai un echilibru bun între conservatorism și deschidere către nou.',
          low: 'Preferi stabilitatea și metodele dovedite în detrimentul experimentării.'
        }
      },
      conscientiousness: {
        description: 'Evaluează nivelul de organizare, disciplină și orientare către obiective.',
        interpretations: {
          high: 'Ești foarte organizat, disciplinat și îți respecti angajamentele. Îți place să planifici în avans.',
          low: 'Ești mai spontan și flexibil, dar poate îți lipsește organizarea în unele situații.'
        },
        yourScore: {
          high: 'Ești foarte disciplinat și organizat în abordarea sarcinilor.',
          moderate: 'Ai un echilibru rezonabil între organizare și spontaneitate.',
          low: 'Ai tendința să fii mai puțin structurat în abordarea sarcinilor.'
        }
      },
      extraversion: {
        description: 'Măsoară sociabilitatea, asertivitatea și tendința de a căuta stimulare din exterior.',
        interpretations: {
          high: 'Ești energic, sociabil și îți place să fii în centrul atenției. Te încarci din interacțiunea cu alții.',
          low: 'Preferi activitățile liniștite și grupurile mici. Te încarci din timpul petrecut singur.'
        },
        yourScore: {
          high: 'Ești o persoană foarte sociabilă și energică.',
          moderate: 'Îți place atât interacțiunea socială, cât și timpul petrecut singur.',
          low: 'Preferi activitățile liniștite și interacțiunile în grupuri mici.'
        }
      },
      agreeableness: {
        description: 'Evaluează tendința de a fi cooperant, încrezător și empatic cu ceilalți.',
        interpretations: {
          high: 'Ești foarte empatic, cooperant și îți place să ajuți pe alții. Eviti conflictele.',
          low: 'Ești mai competitiv și skeptic. Nu eziti să îți exprimi dezacordul când este necesar.'
        },
        yourScore: {
          high: 'Ești foarte empatic și cooperant în relațiile cu ceilalți.',
          moderate: 'Ai un echilibru bun între cooperare și asertivitate.',
          low: 'Ești mai competitiv și nu eziti să îți aperi punctul de vedere.'
        }
      },
      neuroticism: {
        description: 'Măsoară tendința de a experimenta emoții negative și instabilitate emoțională.',
        interpretations: {
          high: 'Poți fi mai sensibil la stres și ai tendința să experimentezi emoții negative mai intense.',
          low: 'Ești calm, relaxat și gestionezi bine stresul. Ai o stabilitate emoțională bună.'
        },
        yourScore: {
          high: 'Poți fi mai sensibil la stres și schimbări emoționale.',
          moderate: 'Ai o stabilitate emoțională rezonabilă, cu momente de sensibilitate.',
          low: 'Ai o stabilitate emoțională foarte bună și gestionezi bine stresul.'
        }
      }
    },

    'Inteligență Emoțională': {
      self_awareness: {
        description: 'Capacitatea de a-ți recunoaște și înțelege propriile emoții pe măsură ce le experimentezi.',
        interpretations: {
          high: 'Ești foarte conștient de emoțiile tale și înțelegi cum acestea îți influențează comportamentul.',
          low: 'S-ar putea să îți fie dificil să îți identifici emoțiile sau să înțelegi de ce le simți.'
        },
        yourScore: {
          high: 'Ai o conștientizare excelentă a propriilor emoții.',
          moderate: 'Îți recunoști emoțiile în majoritatea situațiilor.',
          low: 'Poți dezvolta mai mult capacitatea de autoreflecție emoțională.'
        }
      },
      self_regulation: {
        description: 'Abilitatea de a-ți gestiona și controla emoțiile, în special în situații stresante.',
        interpretations: {
          high: 'Îți poți controla bine impulsurile și rămâi calm sub presiune.',
          low: 'Poți avea dificultăți în gestionarea reacțiilor emoționale intense.'
        },
        yourScore: {
          high: 'Excelezi în gestionarea emoțiilor și a stresului.',
          moderate: 'Reușești să îți controlezi emoțiile în majoritatea situațiilor.',
          low: 'Poți îmbunătăți tehnicile de gestionare a emoțiilor.'
        }
      },
      motivation: {
        description: 'Nivelul de motivație intrinsecă și perseverența în atingerea obiectivelor.',
        interpretations: {
          high: 'Ești foarte motivat să îți atingi obiectivele și perseverezi chiar și în fața dificultăților.',
          low: 'S-ar putea să îți lipsească motivația sau să abandonezi ușor când întâmpini obstacole.'
        },
        yourScore: {
          high: 'Ai o motivație intrinsecă foarte puternică.',
          moderate: 'Ești motivat pentru majoritatea obiectivelor tale.',
          low: 'Poți dezvolta strategii pentru a-ți îmbunătăți motivația.'
        }
      },
      empathy: {
        description: 'Capacitatea de a înțelege și recunoaște emoțiile celorlalți.',
        interpretations: {
          high: 'Ești foarte empatic și poți citi cu ușurință emoțiile celor din jurul tău.',
          low: 'S-ar putea să îți fie dificil să înțelegi perspectiva emoțională a altora.'
        },
        yourScore: {
          high: 'Ai o empatie foarte dezvoltată pentru ceilalți.',
          moderate: 'Reușești să înțelegi emoțiile altora în majoritatea situațiilor.',
          low: 'Poți dezvolta mai mult capacitatea de a înțelege perspectiva altora.'
        }
      },
      social_skills: {
        description: 'Abilitatea de a gestiona relațiile interpersonale și de a comunica eficient.',
        interpretations: {
          high: 'Excelezi în comunicare și în gestionarea relațiilor sociale. Știi să rezolvi conflictele constructiv.',
          low: 'Poți avea dificultăți în comunicarea eficientă sau în gestionarea conflictelor.'
        },
        yourScore: {
          high: 'Ai abilități sociale excelente și comunici foarte eficient.',
          moderate: 'Te descurci bine în majoritatea situațiilor sociale.',
          low: 'Poți îmbunătăți tehnicile de comunicare și gestionare a relațiilor.'
        }
      }
    },

    'GAD-7': {
      worry_frequency: {
        description: 'Frecvența cu care experimentezi îngrijorări și anxietate.',
        interpretations: {
          high: 'Experimentezi îngrijorări frecvente care pot afecta funcționarea zilnică.',
          low: 'Raramente îți faci griji excesive și menții o perspectivă echilibrată.'
        }
      },
      control_difficulty: {
        description: 'Dificultatea în controlarea gândurilor de îngrijorare.',
        interpretations: {
          high: 'Îți este dificil să oprești gândurile de îngrijorare o dată ce încep.',
          low: 'Poți controla și redirecționa gândurile negative cu relativă ușurință.'
        }
      },
      anxiety_symptoms: {
        description: 'Prezența simptomelor fizice ale anxietății.',
        interpretations: {
          high: 'Experimentezi simptome fizice ale anxietății (palpitații, transpirație, etc.).',
          low: 'Raramente experimentezi manifestări fizice ale anxietății.'
        }
      }
    },

    'Beck Depression': {
      mood_symptoms: {
        description: 'Simptomele legate de dispoziție și starea emoțională generală.',
        interpretations: {
          high: 'Poți experimenta tristețe persistentă sau scăderea interesului pentru activități.',
          low: 'Menții o dispoziție pozitivă și interes pentru activitățile zilnice.'
        }
      },
      cognitive_symptoms: {
        description: 'Simptomele cognitive ale depresiei, inclusiv gândirea negativă.',
        interpretations: {
          high: 'Poți avea gânduri negative despre tine sau viitor.',
          low: 'Menții o perspectivă pozitivă și realistă asupra vieții.'
        }
      }
    },

    'Cattell 16PF': {
      warmth: {
        description: 'Măsoară gradul de căldură și cordialitate în relațiile interpersonale.',
        interpretations: {
          high: 'Ești o persoană caldă, atentă și îți place să îi ajuți pe alții.',
          low: 'Ești mai rezervat și formal în relațiile cu ceilalți.'
        }
      }
    },

    'DISC': {
      dominance_disc: {
        description: 'Tendința de a fi direct, hotărât și de a prelua controlul în situații.',
        interpretations: {
          high: 'Ești direct, hotărât și îți place să conduci proiecte și echipe.',
          low: 'Preferi să colaborezi și să urmezi indicațiile altora.'
        }
      },
      influence: {
        description: 'Abilitatea de a influența și persuada pe alții prin comunicare.',
        interpretations: {
          high: 'Ești charismatic, optimist și îți place să interactionezi cu oamenii.',
          low: 'Preferi să te concentrezi pe sarcini concrete decât pe persuasiune.'
        }
      }
    }
  };

  // Find the test type
  let testType = '';
  if (testName.includes('Big Five')) testType = 'Big Five';
  else if (testName.includes('Inteligență Emoțională')) testType = 'Inteligență Emoțională';
  else if (testName.includes('GAD-7')) testType = 'GAD-7';
  else if (testName.includes('Beck Depression')) testType = 'Beck Depression';
  else if (testName.includes('Cattell') || testName.includes('16PF')) testType = 'Cattell 16PF';
  else if (testName.includes('DISC')) testType = 'DISC';

  return explanations[testType]?.[actualKey] || null;
};

export const getScoreInterpretation = (testName: string, score: number): string => {
  if (testName.includes('Big Five')) {
    if (score >= 80) return 'Scor foarte ridicat, indică o trăsătură dominantă.';
    if (score >= 60) return 'Scor ridicat, indică o trăsătură bine definită.';
    if (score >= 40) return 'Scor moderat, indică o trăsătură prezentă, dar nu dominantă.';
    return 'Scor scăzut, indică o trăsătură mai puțin pronunțată.';
  }

  if (testName.includes('Inteligență Emoțională')) {
    if (score >= 80) return 'Inteligență emoțională foarte dezvoltată.';
    if (score >= 60) return 'Inteligență emoțională bună.';
    if (score >= 40) return 'Inteligență emoțională moderată.';
    return 'Inteligență emoțională care necesită îmbunătățiri.';
  }

  return 'Interpretare generală a scorului.';
};

export const getTestScoreRange = (testName: string): string => {
    if (testName.includes('Big Five')) {
        return 'Scorurile variază de la 0 la 100.';
    }

    if (testName.includes('Inteligență Emoțională')) {
        return 'Scorurile variază de la 0 la 100.';
    }

    return 'Scorurile variază în funcție de test.';
};
