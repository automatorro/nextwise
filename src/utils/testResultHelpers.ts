export const getDimensionLabel = (key: string) => {
  const labels: { [key: string]: string } = {
    // General
    general_score: 'Scor General',

    // GAD-7
    anxiety_level: 'Nivel de Anxietate',

    // Emotional Intelligence
    self_awareness: 'Conștientizare de Sine',
    self_regulation: 'Autoreglare',
    motivation: 'Motivație',
    empathy: 'Empatie',
    social_skills: 'Abilități Sociale',

    // Big Five
    openness: 'Deschidere către Experiență',
    conscientiousness: 'Conștiinciozitate',
    extraversion: 'Extraversiune',
    agreeableness: 'Amabilitate',
    neuroticism: 'Nevrotism',

    // Cattell 16PF
    A: 'Căldură (Warmth)',
    B: 'Raționament (Reasoning)', 
    C: 'Stabilitate Emoțională (Emotional Stability)',
    E: 'Dominanță (Dominance)',
    F: 'Vivacitate (Liveliness)',
    G: 'Conștiința Regulilor (Rule-Consciousness)',
    H: 'Îndrăzneală Socială (Social Boldness)',
    I: 'Sensibilitate (Sensitivity)',
    L: 'Vigilență (Vigilance)',
    M: 'Abstractizare (Abstractedness)',
    N: 'Intimitate (Privateness)',
    O: 'Aprehensiune (Apprehension)',
    Q1: 'Deschidere către Schimbare (Openness to Change)',
    Q2: 'Autosuficiență (Self-Reliance)',
    Q3: 'Perfecționism (Perfectionism)',
    Q4: 'Tensiune (Tension)',

    // Other legacy dimensions
    emotional_intelligence: 'Inteligență Emoțională',
    leadership: 'Leadership',
    stress_management: 'Gestionarea Stresului',
  };
  
  return labels[key] || key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export const getScoreBadgeVariant = (score: number) => {
  if (score >= 80) return 'default';
  if (score >= 60) return 'secondary';
  return 'destructive';
};

export const getBigFiveDimensions = (dimensions: { [key: string]: number } | undefined) => {
  if (!dimensions) {
    return {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0
    };
  }
  
  return {
    openness: dimensions.openness || 0,
    conscientiousness: dimensions.conscientiousness || 0,
    extraversion: dimensions.extraversion || 0,
    agreeableness: dimensions.agreeableness || 0,
    neuroticism: dimensions.neuroticism || 0
  };
};

export const hasValidBigFiveData = (dimensions: { [key: string]: number } | undefined) => {
  if (!dimensions) return false;
  return 'openness' in dimensions && 'conscientiousness' in dimensions && 
         'extraversion' in dimensions && 'agreeableness' in dimensions && 
         'neuroticism' in dimensions;
};

// New comprehensive scoring explanation system
export interface TestScoringExplanation {
  description: string;
  scoreRanges?: Array<{
    range: string;
    label: string;
    variant: 'default' | 'secondary' | 'outline' | 'destructive';
  }>;
  whatItMeans?: string;
}

export interface DimensionExplanation {
  description: string;
  interpretations?: {
    high: string;
    low: string;
  };
  yourScore?: {
    high: string;
    moderate: string;
    low: string;
  };
}

export const getTestScoringExplanation = (testName: string): TestScoringExplanation | null => {
  const explanations: { [key: string]: TestScoringExplanation } = {
    'Big Five': {
      description: 'Modelul Big Five măsoară personalitatea pe 5 dimensiuni fundamentale. Fiecare dimensiune este evaluată pe o scară de la 0 la 100%, unde scorurile mai mari indică prezența mai puternică a trăsăturii respective.',
      scoreRanges: [
        { range: '0-30%', label: 'Scăzut', variant: 'outline' },
        { range: '31-70%', label: 'Moderat', variant: 'secondary' },
        { range: '71-100%', label: 'Ridicat', variant: 'default' }
      ],
      whatItMeans: 'Acest test te ajută să înțelegi stilul tău de personalitate dominant și cum interacționezi cu lumea. Nu există scoruri "bune" sau "rele" - fiecare profil de personalitate are avantajele și provocările sale.'
    },

    'Cattell 16PF': {
      description: 'Testul Cattell 16PF evaluează personalitatea pe 16 factori primari, oferind o imagine detaliată și completă a profilului tău psihologic. Scorurile sunt evaluate pe o scală de la 1 la 10.',
      scoreRanges: [
        { range: '1-3', label: 'Scăzut', variant: 'outline' },
        { range: '4-7', label: 'Moderat', variant: 'secondary' },
        { range: '8-10', label: 'Ridicat', variant: 'default' }
      ],
      whatItMeans: 'Acest test oferă o analiză cuprinzătoare a personalității tale, fiind util pentru dezvoltarea personală, orientarea în carieră și înțelegerea modului în care te raportezi la alții.'
    },

    'GAD-7': {
      description: 'GAD-7 (Generalized Anxiety Disorder 7-item scale) este un instrument de screening pentru evaluarea nivelului de anxietate generalizată în ultimele două săptămâni.',
      scoreRanges: [
        { range: '0-4', label: 'Minim', variant: 'default' },
        { range: '5-9', label: 'Ușor', variant: 'secondary' },
        { range: '10-14', label: 'Moderat', variant: 'outline' },
        { range: '15-21', label: 'Sever', variant: 'destructive' }
      ],
      whatItMeans: 'Acest scor indică nivelul tău actual de anxietate. Scorurile mai mari sugerează nevoia de atenție profesională și strategii de gestionare a anxietății.'
    },

    'Inteligența Emoțională': {
      description: 'Testul de Inteligență Emoțională măsoară capacitatea ta de a înțelege, utiliza și gestiona emoțiile - atât ale tale, cât și ale altora.',
      scoreRanges: [
        { range: '0-59%', label: 'Dezvoltare necesară', variant: 'outline' },
        { range: '60-79%', label: 'Competent', variant: 'secondary' },
        { range: '80-100%', label: 'Foarte dezvoltat', variant: 'default' }
      ],
      whatItMeans: 'Inteligența emoțională este crucială pentru succesul în relații, leadership și bunăstarea personală. Poate fi dezvoltată prin practică și conștientizare.'
    },

    'Test de Leadership': {
      description: 'Evaluează stilul tău de leadership și competențele manageriale în diverse situații organizaționale.',
      scoreRanges: [
        { range: '0-49%', label: 'Leadership în dezvoltare', variant: 'outline' },
        { range: '50-74%', label: 'Leadership competent', variant: 'secondary' },
        { range: '75-100%', label: 'Leadership avansat', variant: 'default' }
      ],
      whatItMeans: 'Rezultatul reflectă potențialul tău actual de leadership. Skillurile de leadership se pot dezvolta prin experiență, formare și practică deliberată.'
    },

    'Test de Gestionare a Stresului': {
      description: 'Măsoară capacitatea ta de a face față presiunii și de a gestiona eficient situațiile stresante.',
      scoreRanges: [
        { range: '0-39%', label: 'Dificultăți în gestionare', variant: 'destructive' },
        { range: '40-69%', label: 'Gestionare moderată', variant: 'secondary' },
        { range: '70-100%', label: 'Gestionare excelentă', variant: 'default' }
      ],
      whatItMeans: 'O gestionare eficientă a stresului este esențială pentru sănătatea mentală și performanța profesională. Tehnicile de management al stresului pot fi învățate și îmbunătățite.'
    }
  };

  // Try exact match first, then partial match
  return explanations[testName] || 
         Object.entries(explanations).find(([key]) => testName.includes(key))?.[1] || 
         null;
};

export const getScoreInterpretation = (score: number, scoreType: 'percentage' | 'scale' | 'raw' = 'percentage') => {
  if (scoreType === 'scale') {
    // For 1-10 scales (like 16PF)
    if (score >= 8) return {
      level: 'Ridicat',
      variant: 'default' as const,
      description: 'Scorul tău este ridicat pentru această dimensiune, indicând o prezență puternică a acestei trăsături în personalitatea ta.'
    };
    if (score >= 4) return {
      level: 'Moderat',
      variant: 'secondary' as const,
      description: 'Scorul tău este în intervalul moderat, sugerând un echilibru în această dimensiune a personalității.'
    };
    return {
      level: 'Scăzut',
      variant: 'outline' as const,
      description: 'Scorul tău este scăzut pentru această dimensiune, indicând o prezență mai puțin pronunțată a acestei trăsături.'
    };
  }

  // For percentage scores
  if (score >= 80) return {
    level: 'Foarte Ridicat',
    variant: 'default' as const,
    description: 'Scorul tău este foarte ridicat, indicând o dezvoltare excelentă în acest domeniu.'
  };
  if (score >= 60) return {
    level: 'Ridicat',
    variant: 'secondary' as const,
    description: 'Scorul tău este bun, demonstrând competențe solide în acest domeniu.'
  };
  if (score >= 40) return {
    level: 'Moderat',
    variant: 'outline' as const,
    description: 'Scorul tău este în intervalul mediu, cu oportunități de dezvoltare.'
  };
  return {
    level: 'Scăzut',
    variant: 'destructive' as const,
    description: 'Scorul tău indică nevoia de dezvoltare în acest domeniu.'
  };
};

export const getDimensionExplanation = (testName: string, dimensionKey: string): DimensionExplanation | null => {
  const explanations: { [testName: string]: { [dimension: string]: DimensionExplanation } } = {
    'Big Five': {
      openness: {
        description: 'Măsoară deschiderea către experiențe noi, creativitatea și curiozitatea intelectuală.',
        interpretations: {
          high: 'Ești creativ, aventuros și deschis la idei noi. Îți place să explorezi și să experimentezi.',
          low: 'Preferi rutina și convenția. Ești practic și preferi metodele dovedite.'
        },
        yourScore: {
          high: 'Ai o imaginație bogată și ești deschis la experiențe noi și neconvenționale.',
          moderate: 'Ai un echilibru între deschiderea către nou și aprecierea pentru convenție.',
          low: 'Preferi stabilitatea și rutina, fiind mai conservator în abordări.'
        }
      },
      conscientiousness: {
        description: 'Reflectă organizarea, disciplina și orientarea către obiective.',
        interpretations: {
          high: 'Ești organizat, disciplinat și îți îndeplinești întotdeauna responsabilitățile.',
          low: 'Ești mai spontan și flexibil, mai puțin preocupat de organizare rigidă.'
        },
        yourScore: {
          high: 'Ești foarte organizat și disciplinat, cu o etică de muncă puternică.',
          moderate: 'Ai un echilibru între organizare și flexibilitate.',
          low: 'Preferi spontaneitatea și nu te simți constrâns de reguli rigide.'
        }
      },
      extraversion: {
        description: 'Indică nivelul de sociabilitate, energie și căutare a stimulării externe.',
        interpretations: {
          high: 'Ești sociabil, energic și îți place să fii în centrul atenției.',
          low: 'Preferi activitățile liniștite și grupurile mici. Ești mai introspectiv.'
        },
        yourScore: {
          high: 'Îți place să petreci timp cu oamenii și să fii activ social.',
          moderate: 'Te simți confortabil atât în grupuri cât și singur.',
          low: 'Preferi activitățile liniștite și timpul petrecut în intimitate.'
        }
      },
      agreeableness: {
        description: 'Măsoară empatia, cooperarea și încrederea în alții.',
        interpretations: {
          high: 'Ești empatic, cooperant și îți place să ajuți pe alții.',
          low: 'Ești mai competitiv și direct, pui propriile nevoi pe primul loc.'
        },
        yourScore: {
          high: 'Ești foarte empatic și îți place să cooperezi cu alții.',
          moderate: 'Ai un echilibru între empatie și asertivitate.',
          low: 'Ești mai direct și competitiv în interacțiunile sociale.'
        }
      },
      neuroticism: {
        description: 'Reflectă tendința către emoții negative și instabilitate emoțională.',
        interpretations: {
          high: 'Tind să experimentezi mai frecvent emoții negative și stres.',
          low: 'Ești calm, stabil emoțional și gestionezi bine stresul.'
        },
        yourScore: {
          high: 'Poți fi mai sensibil la stres și emoții negative.',
          moderate: 'Ai o stabilitate emoțională rezonabilă, cu momente de sensibilitate.',
          low: 'Ești foarte calm și stabil emoțional, gestionezi bine presiunea.'
        }
      }
    },

    'Cattell 16PF': {
      A: {
        description: 'Măsoară gradul de căldură și sociabilitate în relațiile interpersonale.',
        interpretations: {
          high: 'Ești cald, sociabil și îți place să petreci timp cu oamenii.',
          low: 'Ești mai rezervat, formal și preferi să păstrezi distanța în relații.'
        }
      },
      B: {
        description: 'Evaluează capacitatea de raționament abstract și inteligența fluidă.',
        interpretations: {
          high: 'Ai abilități analitice puternice și îți place să rezolvi probleme complexe.',
          low: 'Preferi abordări concrete și practice la probleme.'
        }
      },
      C: {
        description: 'Măsoară stabilitatea emoțională și capacitatea de a face față stresului.',
        interpretations: {
          high: 'Ești stabil emoțional, calm și gestionezi bine presiunea.',
          low: 'Poți fi mai reactiv la stres și schimbări emoționale.'
        }
      },
      E: {
        description: 'Reflectă dorința de a domina și conduce în situații sociale.',
        interpretations: {
          high: 'Îți place să conduci și să iei inițiativa în grupuri.',
          low: 'Preferi să urmezi decât să conduci, ești mai deferențial.'
        }
      },
      F: {
        description: 'Măsoară nivelul de energie, veselie și spontaneitate.',
        interpretations: {
          high: 'Ești lively, spontan și aduci energie pozitivă în grupuri.',
          low: 'Ești mai serios, restraint și controlat în comportament.'
        }
      },
      G: {
        description: 'Evaluează respectul pentru reguli, norme și datorie morală.',
        interpretations: {
          high: 'Ești conștiincios, respecti regulile și ai o etică puternică.',
          low: 'Ești mai flexibil cu regulile și mai puțin convențional.'
        }
      },
      H: {
        description: 'Măsoară îndrăzneala socială și confortul în situații noi.',
        interpretations: {
          high: 'Ești îndrăzneț social, aventuros și nu te sperii de provocări.',
          low: 'Ești mai timid, prudent și sensibil la amenințări.'
        }
      },
      I: {
        description: 'Reflectă sensibilitatea estetică și emoțională.',
        interpretations: {
          high: 'Ești sensibil, empatic și apreciezi frumusețea și arta.',
          low: 'Ești mai practic, obiectiv și orientat către utilitate.'
        }
      },
      L: {
        description: 'Măsoară vigilența și suspiciunea față de intențiile altora.',
        interpretations: {
          high: 'Ești vigilent, suspicios și cauți motive ascunse.',
          low: 'Ai încredere în oameni și ești mai puțin suspicios.'
        }
      },
      M: {
        description: 'Evaluează tendința către gândire abstractă și imaginație.',
        interpretations: {
          high: 'Îți place să te gândești la concepte abstracte și să visezi.',
          low: 'Ești orientat către realitate, practic și concret.'
        }
      },
      N: {
        description: 'Măsoară gradul de discreție și tendința de a fi rezervat.',
        interpretations: {
          high: 'Ești discret, îți păstrezi gândurile private și ești diplomat.',
          low: 'Ești deschis, direct și sincer în comunicare.'
        }
      },
      O: {
        description: 'Reflectă tendința către îngrijorare și aprehensiune.',
        interpretations: {
          high: 'Tind să te îngrijorezi și să anticipezi probleme.',
          low: 'Ești sigur pe tine, optimist și nu te îngrijorezi prea mult.'
        }
      },
      Q1: {
        description: 'Măsoară deschiderea către schimbare și experimentare.',
        interpretations: {
          high: 'Îți place să experimentezi și să înveți lucruri noi.',
          low: 'Preferi tradițiile și metodele dovedite.'
        }
      },
      Q2: {
        description: 'Evaluează preferința pentru independență și autosuficiență.',
        interpretations: {
          high: 'Preferi să lucrezi independent și să te bazezi pe tine.',
          low: 'Îți place să faci parte din grupuri și să colaborezi.'
        }
      },
      Q3: {
        description: 'Măsoară organizarea și perfecționismul.',
        interpretations: {
          high: 'Ești foarte organizat și îți place ca totul să fie perfect.',
          low: 'Ești mai relaxat cu privire la ordine și organizare.'
        }
      },
      Q4: {
        description: 'Reflectă nivelul de tensiune și energie nervoasă.',
        interpretations: {
          high: 'Ai multă energie nervosă și poți fi tensionat sau nerăbdător.',
          low: 'Ești relaxat, calm și nu te grăbesti.'
        }
      }
    },

    'Inteligența Emoțională': {
      self_awareness: {
        description: 'Capacitatea de a înțelege propriile emoții, puncte forte și limitări.',
        interpretations: {
          high: 'Ai o înțelegere clară a emoțiilor și motivațiilor tale.',
          low: 'Poți avea dificultăți în înțelegerea propriilor emoții.'
        }
      },
      self_regulation: {
        description: 'Abilitatea de a gestiona și controla emoțiile și impulsurile.',
        interpretations: {
          high: 'Gestionezi bine emoțiile și nu reactionezi impulsiv.',
          low: 'Poți avea dificultăți în controlul emoțiilor și reacțiilor.'
        }
      },
      motivation: {
        description: 'Dorința internă de a atinge obiective și de a avea performanțe.',
        interpretations: {
          high: 'Ești auto-motivat și persistenț în atingerea obiectivelor.',
          low: 'Poți avea nevoie de motivație externă pentru a atinge țelurile.'
        }
      },
      empathy: {
        description: 'Capacitatea de a înțelege și simți emoțiile altora.',
        interpretations: {
          high: 'Înțelegi bine emoțiile altora și poți să te pui în locul lor.',
          low: 'Poți avea dificultăți în înțelegerea perspectivei altora.'
        }
      },
      social_skills: {
        description: 'Abilitatea de a gestiona relațiile și de a influența pozitiv.',
        interpretations: {
          high: 'Ești priceput în relații sociale și comunicare eficientă.',
          low: 'Poți avea dificultăți în construirea și menținerea relațiilor.'
        }
      }
    }
  };

  const testExplanations = explanations[testName] || 
                          Object.entries(explanations).find(([key]) => testName.includes(key))?.[1];
  
  return testExplanations?.[dimensionKey] || null;
};
