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

    // DISC
    dominance: 'Dominanță (D)',
    influence: 'Influență (I)',
    steadiness: 'Stabilitate (S)',
    compliance: 'Conformitate (C)',

    // HEXACO
    honesty_humility: 'Onestitate-Umilință',
    emotionality: 'Emoționalitate',
    extraversion_hexaco: 'Extraversiune',
    agreeableness_hexaco: 'Amabilitate',
    conscientiousness_hexaco: 'Conștiinciozitate',
    openness_hexaco: 'Deschidere',

    // Enneagram
    type_1: 'Tip 1 - Perfecționistul',
    type_2: 'Tip 2 - Ajutătorul',
    type_3: 'Tip 3 - Realizatorul',
    type_4: 'Tip 4 - Individualistul',
    type_5: 'Tip 5 - Investigatorul',
    type_6: 'Tip 6 - Loialistul',
    type_7: 'Tip 7 - Entuziastul',
    type_8: 'Tip 8 - Provocatorul',
    type_9: 'Tip 9 - Pacificatorul',

    // Belbin Team Roles
    plant: 'Plantă (Creativul)',
    resource_investigator: 'Investigator de Resurse',
    coordinator: 'Coordonator',
    shaper: 'Formator',
    monitor_evaluator: 'Monitor-Evaluator',
    teamworker: 'Muncitor în Echipă',
    implementer: 'Implementator',
    completer_finisher: 'Finalizator',
    specialist: 'Specialist',

    // Beck Depression
    depression_level: 'Nivel de Depresie',
    cognitive_symptoms: 'Simptome Cognitive',
    emotional_symptoms: 'Simptome Emoționale',
    physical_symptoms: 'Simptome Fizice',

    // Cognitive Abilities
    verbal_reasoning: 'Raționament Verbal',
    numerical_reasoning: 'Raționament Numeric',
    abstract_reasoning: 'Raționament Abstract',
    spatial_reasoning: 'Raționament Spațial',
    logical_reasoning: 'Raționament Logic',

    // Digital & Analytical Competencies
    digital_literacy: 'Alfabetizare Digitală',
    data_analysis: 'Analiza Datelor',
    problem_solving_digital: 'Rezolvarea Problemelor Digitale',
    digital_communication: 'Comunicare Digitală',
    digital_security: 'Securitate Digitală',

    // Professional Aptitudes
    leadership_aptitude: 'Aptitudine Leadership',
    analytical_aptitude: 'Aptitudine Analitică',
    creative_aptitude: 'Aptitudine Creativă',
    technical_aptitude: 'Aptitudine Tehnică',
    social_aptitude: 'Aptitudine Socială',

    // Sensory Perception
    visual_perception: 'Percepție Vizuală',
    auditory_perception: 'Percepție Auditivă',
    tactile_perception: 'Percepție Tactilă',
    spatial_perception: 'Percepție Spațială',

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
    },

    'Test DISC': {
      description: 'Testul DISC analizează stilul tău de comportament în patru dimensiuni principale: Dominanță, Influență, Stabilitate și Conformitate.',
      scoreRanges: [
        { range: '0-30%', label: 'Scăzut', variant: 'outline' },
        { range: '31-70%', label: 'Moderat', variant: 'secondary' },
        { range: '71-100%', label: 'Ridicat', variant: 'default' }
      ],
      whatItMeans: 'DISC te ajută să înțelegi cum interacționezi cu alții, cum comunici și ce te motivează în mediul de lucru. Este foarte util pentru dezvoltarea echipelor și comunicarea eficientă.'
    },

    'Enneagram': {
      description: 'Enneagramul identifică unul din cele 9 tipuri de personalitate, fiecare cu motivații, frici și mecanisme de apărare distincte.',
      scoreRanges: [
        { range: 'Tip dominant', label: 'Tipul tău principal', variant: 'default' },
        { range: 'Wing-uri', label: 'Influențe secundare', variant: 'secondary' }
      ],
      whatItMeans: 'Enneagramul oferă perspective profunde asupra motivațiilor inconștiente și căilor de dezvoltare personală. Este un instrument puternic pentru autocunoaștere și creștere spirituală.'
    },

    'HEXACO': {
      description: 'Modelul HEXACO măsoară personalitatea pe 6 dimensiuni: Onestitate-Umilință, Emoționalitate, Extraversiune, Amabilitate, Conștiinciozitate și Deschidere.',
      scoreRanges: [
        { range: '0-30%', label: 'Scăzut', variant: 'outline' },
        { range: '31-70%', label: 'Moderat', variant: 'secondary' },
        { range: '71-100%', label: 'Ridicat', variant: 'default' }
      ],
      whatItMeans: 'HEXACO extinde modelul Big Five cu dimensiunea Onestitate-Umilință, oferind o perspectivă mai completă asupra personalității și comportamentului etic.'
    },

    'Roluri în Echipă Belbin': {
      description: 'Testul Belbin identifică rolurile tale preferate în echipă din cele 9 roluri distincte, fiecare cu contribuții și slăbiciuni specifice.',
      scoreRanges: [
        { range: 'Rol primar', label: 'Rolul tău dominant', variant: 'default' },
        { range: 'Roluri secundare', label: 'Roluri de backup', variant: 'secondary' },
        { range: 'Roluri evitate', label: 'Roluri mai puțin preferate', variant: 'outline' }
      ],
      whatItMeans: 'Cunoașterea rolurilor tale în echipă te ajută să înțelegi cum contribui cel mai bine la succesul echipei și să colaborezi mai eficient cu alții.'
    },

    'Test Aptitudini Cognitive': {
      description: 'Evaluează capacitățile tale cognitive în diverse domenii: raționament verbal, numeric, abstract, spațial și logic.',
      scoreRanges: [
        { range: '0-39%', label: 'Sub medie', variant: 'outline' },
        { range: '40-59%', label: 'Mediu', variant: 'secondary' },
        { range: '60-79%', label: 'Peste medie', variant: 'default' },
        { range: '80-100%', label: 'Superior', variant: 'default' }
      ],
      whatItMeans: 'Aptitudinile cognitive sunt indicatori ai capacității tale de a procesa informații, rezolva probleme și de a învăța în contexte diverse. Sunt relevante pentru performanța academică și profesională.'
    },

    'Beck Depression Inventory': {
      description: 'BDI-II evaluează severitatea simptomelor depresive în ultimele două săptămâni, fiind un instrument standardizat folosit în practică clinică.',
      scoreRanges: [
        { range: '0-13', label: 'Minim', variant: 'default' },
        { range: '14-19', label: 'Ușor', variant: 'secondary' },
        { range: '20-28', label: 'Moderat', variant: 'outline' },
        { range: '29-63', label: 'Sever', variant: 'destructive' }
      ],
      whatItMeans: 'Acest scor oferă o evaluare a severității simptomelor depresive. Scorurile mai mari indică necesitatea consultării unui specialist pentru evaluare și tratament.'
    },

    'Competențe Digitale': {
      description: 'Evaluează nivelul tău de competențe digitale în era modernă: alfabetizare digitală, analiza datelor, securitate și comunicare online.',
      scoreRanges: [
        { range: '0-49%', label: 'Dezvoltare necesară', variant: 'outline' },
        { range: '50-74%', label: 'Competent', variant: 'secondary' },
        { range: '75-100%', label: 'Avansat', variant: 'default' }
      ],
      whatItMeans: 'Competențele digitale sunt esențiale în economia modernă. Rezultatul arată punctele tale forte și domeniile care necesită dezvoltare continuă.'
    },

    'Aptitudini Profesionale': {
      description: 'Măsoară aptitudinile tale în diverse domenii profesionale: leadership, analiză, creativitate, tehnologie și abilități sociale.',
      scoreRanges: [
        { range: '0-39%', label: 'Dezvoltare necesară', variant: 'outline' },
        { range: '40-69%', label: 'Competent', variant: 'secondary' },
        { range: '70-100%', label: 'Foarte dezvoltat', variant: 'default' }
      ],
      whatItMeans: 'Aceste aptitudini influențează succesul tău în diverse roluri profesionale și pot ghida deciziile de carieră și dezvoltarea profesională.'
    },

    'Test Percepție Senzorială': {
      description: 'Evaluează acuitatea și eficiența percepției tale senzoriale în domeniile vizual, auditiv, tactil și spațial.',
      scoreRanges: [
        { range: '0-39%', label: 'Sub normal', variant: 'outline' },
        { range: '40-69%', label: 'Normal', variant: 'secondary' },
        { range: '70-100%', label: 'Superior', variant: 'default' }
      ],
      whatItMeans: 'Percepția senzorială influențează modul în care procesezi informațiile din mediul înconjurător și poate fi relevantă pentru anumite cariere și activități.'
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
        description: 'Măsoară gradul de căldură și sociabilitate în relațiile interumane.',
        interpretations: {
          high: 'Ești cald, sociabil și îți place să petreci timp cu oamenii.',
          low: 'Ești mai rezervat, formal și preferi să păstrezi distanța în relații.'
        },
        yourScore: {
          high: 'Ești foarte deschis și cald în relații, oamenii se simt confortabil în preajma ta.',
          moderate: 'Ai un echilibru între căldură și rezervă în relațiile sociale.',
          low: 'Ești mai formal și rezervat, preferi relații mai distante și profesionale.'
        }
      },
      B: {
        description: 'Evaluează capacitatea de raționament abstract și inteligența fluidă.',
        interpretations: {
          high: 'Ai abilități analitice puternice și îți place să rezolvi probleme complexe.',
          low: 'Preferi abordări concrete și practice la probleme.'
        },
        yourScore: {
          high: 'Excel la gândirea abstractă și analizele complexe.',
          moderate: 'Ai abilități de raționament solide, cu preferință pentru claritate.',
          low: 'Preferi abordări practice și concrete, cu exemple tangibile.'
        }
      },
      C: {
        description: 'Măsoară stabilitatea emoțională și capacitatea de a face față stresului.',
        interpretations: {
          high: 'Ești stabil emoțional, calm și gestionezi bine presiunea.',
          low: 'Poți fi mai reactiv la stres și schimbări emoționale.'
        },
        yourScore: {
          high: 'Ești foarte calm și stabil, chiar și în situații stresante.',
          moderate: 'Ai o stabilitate emoțională bună, cu momente ocazionale de tensiune.',
          low: 'Poți fi mai sensibil la stres și schimbări emoționale.'
        }
      },
      E: {
        description: 'Reflectă dorința de a domina și conduce în situații sociale.',
        interpretations: {
          high: 'Îți place să conduci și să iei inițiativa în grupuri.',
          low: 'Preferi să urmezi decât să conduci, ești mai deferențial.'
        },
        yourScore: {
          high: 'Ești un lider natural care își asumă responsabilitatea.',
          moderate: 'Poți conduce când e necesar, dar nu cauți întotdeauna să fii în centru.',
          low: 'Preferi să susții și să urmezi, mai degrabă decât să conduci.'
        }
      },
      F: {
        description: 'Măsoară nivelul de energie, veselie și spontaneitate.',
        interpretations: {
          high: 'Ești lively, spontan și aduci energie pozitivă în grupuri.',
          low: 'Ești mai serios, restrâns și controlat în comportament.'
        },
        yourScore: {
          high: 'Ești plin de energie și spontaneitate, aduci veselie în grup.',
          moderate: 'Ai momente de veselie echilibrate cu seriozitate.',
          low: 'Ești mai serios și controlat, preferi să te gândești înainte să acționezi.'
        }
      },
      G: {
        description: 'Evaluează respectul pentru reguli, norme și datorie morală.',
        interpretations: {
          high: 'Ești conștiincios, respecti regulile și ai o etică puternică.',
          low: 'Ești mai flexibil cu regulile și mai puțin convențional.'
        },
        yourScore: {
          high: 'Ai standarde etice înalte și respecti întotdeauna regulile.',
          moderate: 'Respecti normele dar poți fi flexibil când situația o cere.',
          low: 'Ești mai liber în interpretarea regulilor și convențiilor.'
        }
      },
      H: {
        description: 'Măsoară îndrăzneala socială și confortul în situații noi.',
        interpretations: {
          high: 'Ești îndrăzneț social, aventuros și nu te sperii de provocări.',
          low: 'Ești mai timid, prudent și sensibil la amenințări.'
        },
        yourScore: {
          high: 'Ești curajos și îți place să îți asumi riscuri sociale.',
          moderate: 'Ai încredere socială dar ești prudent în situații noi.',
          low: 'Ești mai rezervat și prudent în situații sociale noi.'
        }
      },
      I: {
        description: 'Reflectă sensibilitatea estetică și emoțională.',
        interpretations: {
          high: 'Ești sensibil, empatic și apreciezi frumusețea și arta.',
          low: 'Ești mai practic, obiectiv și orientat către utilitate.'
        },
        yourScore: {
          high: 'Ești foarte sensibil la frumusețe și la nevoile emoționale ale altora.',
          moderate: 'Ai un echilibru între sensibilitate și practicitate.',
          low: 'Ești pragmatic și te concentrezi pe aspectele practice ale vieții.'
        }
      },
      L: {
        description: 'Măsoară vigilența și suspiciunea față de intențiile altora.',
        interpretations: {
          high: 'Ești vigilent, suspicios și cauți motive ascunse.',
          low: 'Ai încredere în oameni și ești mai puțin suspicios.'
        },
        yourScore: {
          high: 'Ești precaut și analizezi atent intențiile oamenilor.',
          moderate: 'Ai încredere dar ești prudent cu oamenii noi.',
          low: 'Ai încredere naturală în oameni și vezi binele în ei.'
        }
      },
      M: {
        description: 'Evaluează tendința către gândire abstractă și imaginație.',
        interpretations: {
          high: 'Îți place să te gândești la concepte abstracte și să visezi.',
          low: 'Ești orientat către realitate, practic și concret.'
        },
        yourScore: {
          high: 'Ai o imaginație bogată și îți place să explorezi idei abstracte.',
          moderate: 'Îți place să visezi dar rămâi conectat la realitate.',
          low: 'Ești foarte practic și te concentrezi pe lucrurile concrete.'
        }
      },
      N: {
        description: 'Măsoară gradul de discreție și tendința de a fi rezervat.',
        interpretations: {
          high: 'Ești discret, îți păstrezi gândurile private și ești diplomat.',
          low: 'Ești deschis, direct și sincer în comunicare.'
        },
        yourScore: {
          high: 'Ești foarte discret și diplomatic în comunicare.',
          moderate: 'Echilibrezi deschiderea cu discreția când e necesar.',
          low: 'Ești foarte deschis și direct în exprimarea gândurilor.'
        }
      },
      O: {
        description: 'Reflectă tendința către îngrijorare și aprehensiune.',
        interpretations: {
          high: 'Tind să te îngrijorezi și să anticipezi probleme.',
          low: 'Ești sigur pe tine, optimist și nu te îngrijorezi prea mult.'
        },
        yourScore: {
          high: 'Ești prone la îngrijorare și analizezi riscurile atent.',
          moderate: 'Uneori te îngrijorezi dar în general ești optimist.',
          low: 'Ești foarte încrezător și optimist, nu te îngrijorezi prea mult.'
        }
      },
      Q1: {
        description: 'Măsoară deschiderea către schimbare și experimentare.',
        interpretations: {
          high: 'Îți place să experimentezi și să înveți lucruri noi.',
          low: 'Preferi tradițiile și metodele dovedite.'
        },
        yourScore: {
          high: 'Ești foarte deschis la schimbare și inovație.',
          moderate: 'Accepți schimbarea dar apreciezi și tradițiile.',
          low: 'Preferi stabilitatea și metodele tradiționale dovedite.'
        }
      },
      Q2: {
        description: 'Evaluează preferința pentru independență și autosuficiență.',
        interpretations: {
          high: 'Preferi să lucrezi independent și să te bazezi pe tine.',
          low: 'Îți place să faci parte din grupuri și să colaborezi.'
        },
        yourScore: {
          high: 'Ești foarte independent și preferi să lucrezi singur.',
          moderate: 'Apreciezi atât independența cât și colaborarea.',
          low: 'Îți place să lucrezi în echipă și să colaborezi cu alții.'
        }
      },
      Q3: {
        description: 'Măsoară organizarea și perfecționismul.',
        interpretations: {
          high: 'Ești foarte organizat și îți place ca totul să fie perfect.',
          low: 'Ești mai relaxat cu privire la ordine și organizare.'
        },
        yourScore: {
          high: 'Ești extrem de organizat și ai standarde înalte.',
          moderate: 'Îți place ordinea dar poți fi flexibil când e necesar.',
          low: 'Ești relaxat cu privire la organizare și perfecțiune.'
        }
      },
      Q4: {
        description: 'Reflectă nivelul de tensiune și energie nervoasă.',
        interpretations: {
          high: 'Ai multă energie nervosă și poți fi tensionat sau nerăbdător.',
          low: 'Ești relaxat, calm și nu te grăbești.'
        },
        yourScore: {
          high: 'Ai energie mare și poți fi nerăbdător să acționezi.',
          moderate: 'Ai momente de energie înaltă echilibrate cu relaxare.',
          low: 'Ești foarte relaxat și calm, nu te grăbești niciodată.'
        }
      }
    },

    'Inteligența Emoțională': {
      self_awareness: {
        description: 'Capacitatea de a înțelege propriile emoții, puncte forte și limitări.',
        interpretations: {
          high: 'Ai o înțelegere clară a emoțiilor și motivațiilor tale.',
          low: 'Poți avea dificultăți în înțelegerea propriilor emoții.'
        },
        yourScore: {
          high: 'Ești foarte conștient de emoțiile și reacțiile tale.',
          moderate: 'Ai o bună înțelegere de sine cu potențial de dezvoltare.',
          low: 'Ar fi util să dedici timp pentru autoreflecție și autocunoaștere.'
        }
      },
      self_regulation: {
        description: 'Abilitatea de a gestiona și controla emoțiile și impulsurile.',
        interpretations: {
          high: 'Gestionezi bine emoțiile și nu reactionezi impulsiv.',
          low: 'Poți avea dificultăți în controlul emoțiilor și reacțiilor.'
        },
        yourScore: {
          high: 'Excel la controlul emoțional și gestionarea impulsurilor.',
          moderate: 'Ai un control rezonabil cu ocazionale momente de impulsivitate.',
          low: 'Ai nevoie să dezvolți tehnici de gestionare emoțională.'
        }
      },
      motivation: {
        description: 'Dorința internă de a atinge obiective și de a avea performanțe.',
        interpretations: {
          high: 'Ești auto-motivat și persistenț în atingerea obiectivelor.',
          low: 'Poți avea nevoie de motivație externă pentru a atinge țelurile.'
        },
        yourScore: {
          high: 'Ai o motivație internă puternică și persistență.',
          moderate: 'Ești motivat dar uneori ai nevoie de încurajare externă.',
          low: 'Ar fi util să îți găsești surse de motivație internă.'
        }
      },
      empathy: {
        description: 'Capacitatea de a înțelege și simți emoțiile altora.',
        interpretations: {
          high: 'Înțelegi bine emoțiile altora și poți să te pui în locul lor.',
          low: 'Poți avea dificultăți în înțelegerea perspectivei altora.'
        },
        yourScore: {
          high: 'Ești foarte empatic și înțelegi intuitiv emoțiile altora.',
          moderate: 'Ai empatie dar uneori ai nevoie să te concentrezi pentru a înțelege.',
          low: 'Ar fi util să practice ascultarea activă și empatia.'
        }
      },
      social_skills: {
        description: 'Abilitatea de a gestiona relațiile și de a influența pozitiv.',
        interpretations: {
          high: 'Ești priceput în relații sociale și comunicare eficientă.',
          low: 'Poți avea dificultăți în construirea și menținerea relațiilor.'
        },
        yourScore: {
          high: 'Excel în comunicare și construirea relațiilor.',
          moderate: 'Ai abilități sociale solide cu potențial de îmbunătățire.',
          low: 'Ar fi util să practice comunicarea și tehnicile sociale.'
        }
      }
    },

    'GAD-7': {
      anxiety_level: {
        description: 'Evaluează nivelul general de anxietate experimentat în ultimele două săptămâni.',
        interpretations: {
          high: 'Experimentezi un nivel semnificativ de anxietate care poate necesita atenție profesională.',
          low: 'Ai un nivel minimal de anxietate, ceea ce indică o stare de bunăstare emoțională.'
        },
        yourScore: {
          high: 'Nivelul tău de anxietate este ridicat. Consideră să consulți un specialist.',
          moderate: 'Experimentezi anxietate moderată. Tehnicile de relaxare pot fi utile.',
          low: 'Ai un nivel foarte scăzut de anxietate, ceea ce este foarte pozitiv.'
        }
      }
    },

    'Test de Leadership': {
      leadership: {
        description: 'Evaluează competențele și stilul tău general de leadership.',
        interpretations: {
          high: 'Ai abilități de leadership puternice și poți conduce eficient echipe.',
          low: 'Ai potențial de dezvoltare în domeniul leadership-ului.'
        },
        yourScore: {
          high: 'Ești un lider natural cu abilități dezvoltate.',
          moderate: 'Ai competențe de leadership solide care pot fi îmbunătățite.',
          low: 'Ai potențial de leadership care poate fi dezvoltat prin practică.'
        }
      }
    },

    'Test de Gestionare a Stresului': {
      stress_management: {
        description: 'Măsoară capacitatea ta de a face față și gestiona situațiile stresante.',
        interpretations: {
          high: 'Gestionezi foarte bine stresul și rămâi calm sub presiune.',
          low: 'Poți avea dificultăți în gestionarea stresului și a presiunii.'
        },
        yourScore: {
          high: 'Excel în gestionarea stresului și a presiunii.',
          moderate: 'Gestionezi rezonabil stresul cu ocazionale momente dificile.',
          low: 'Ar fi util să învețe tehnici de management al stresului.'
        }
      }
    },

    'Test DISC': {
      dominance: {
        description: 'Măsoară tendința de a fi direct, hotărât și orientat către rezultate.',
        interpretations: {
          high: 'Ești direct, hotărât și îți place să iei controlul situațiilor.',
          low: 'Ești mai cooperant și preferi să eviți conflictele directe.'
        },
        yourScore: {
          high: 'Ești foarte direct și hotărât în abordări.',
          moderate: 'Ai un echilibru între asertivitate și cooperare.',
          low: 'Preferi abordări mai blânde și cooperante.'
        }
      },
      influence: {
        description: 'Reflectă abilitatea de a inspira și influența pozitiv pe alții.',
        interpretations: {
          high: 'Ești charismatic și îți place să interacționezi cu oamenii.',
          low: 'Ești mai rezervat și preferi comunicarea directă, factuală.'
        },
        yourScore: {
          high: 'Ai abilități excelente de influențare și comunicare.',
          moderate: 'Poți influența pozitiv dar nu întotdeauna cauți să fii în centru.',
          low: 'Preferi comunicarea directă și factuală.'
        }
      },
      steadiness: {
        description: 'Măsoară preferința pentru stabilitate, rutină și medii predictibile.',
        interpretations: {
          high: 'Îți place stabilitatea și ești loial în relații și angajamente.',
          low: 'Îți place schimbarea și varietatea, poți fi mai puțin răbdător cu rutina.'
        },
        yourScore: {
          high: 'Valorizezi stabilitatea și ești foarte loial.',
          moderate: 'Apreciezi stabilitatea dar te adaptezi la schimbare.',
          low: 'Îți place varietatea și schimbarea frecventă.'
        }
      },
      compliance: {
        description: 'Reflectă tendința de a urmări standarde înalte și a respecta regulile.',
        interpretations: {
          high: 'Îți place să urmezi proceduri și să menții standarde înalte de calitate.',
          low: 'Ești mai flexibil cu regulile și preferi să improvizezi.'
        },
        yourScore: {
          high: 'Ai standarde înalte și urmezi întotdeauna procedurile.',
          moderate: 'Respecti regulile dar poți fi flexibil când e necesar.',
          low: 'Preferi flexibilitatea și abordările creative.'
        }
      }
    },

    'Enneagram': {
      type_1: {
        description: 'Perfecționistul - orientat către îmbunătățire și corectitudine.',
        interpretations: {
          high: 'Ai standarde înalte și dorești să îmbunătățești totul în jurul tău.',
          low: 'Ești mai flexibil cu imperfecțiunile și mai puțin critic.'
        },
        yourScore: {
          high: 'Ești foarte orientat către perfecțiune și îmbunătățire continuă.',
          moderate: 'Ai standarde înalte dar poți accepta imperfecțiunile.',
          low: 'Ești relaxat cu privire la imperfecțiuni și mai puțin critic.'
        }
      },
      type_2: {
        description: 'Ajutătorul - orientat către a ajuta și îngrijí pe alții.',
        interpretations: {
          high: 'Îți place să ajuți pe alții și să fii necesar.',
          low: 'Ești mai centrat pe propriile nevoi și mai puțin focusat pe alții.'
        },
        yourScore: {
          high: 'Ești foarte orientat către ajutorarea altora.',
          moderate: 'Îți place să ajuți dar nu neglijezi propriile nevoi.',
          low: 'Te concentrezi mai mult pe propriile nevoi și obiective.'
        }
      },
      type_3: {
        description: 'Realizatorul - orientat către succes și eficiență.',
        interpretations: {
          high: 'Ești foarte motivat să reușești și să fii eficient.',
          low: 'Ești mai puțin preocupat de imagine și mai puțin competitiv.'
        },
        yourScore: {
          high: 'Ești foarte orientat către succes și realizări.',
          moderate: 'Îți place să reușești dar nu la orice preț.',
          low: 'Ești mai puțin preocupat de statut și competiție.'
        }
      },
      type_4: {
        description: 'Individualistul - orientat către unicitate și autenticitate.',
        interpretations: {
          high: 'Valorizezi autenticitatea și îți place să fii unic.',
          low: 'Ești mai puțin preocupat de a fi diferit și mai conformist.'
        },
        yourScore: {
          high: 'Valorizezi foarte mult autenticitatea și unicitatea.',
          moderate: 'Îți place să fii autentic dar te adaptezi când e necesar.',
          low: 'Te simți confortabil să te conformezi normelor sociale.'
        }
      },
      type_5: {
        description: 'Investigatorul - orientat către cunoaștere și înțelegere.',
        interpretations: {
          high: 'Îți place să înveți și să înțelegi lucrurile în profunzime.',
          low: 'Ești mai puțin interesat de teorii și mai orientat către acțiune.'
        },
        yourScore: {
          high: 'Ești foarte curios și îți place să înțelegi totul în detaliu.',
          moderate: 'Îți place să înveți dar echilibrezi cu acțiunea.',
          low: 'Preferi acțiunea și aplicarea practică decât teoria.'
        }
      },
      type_6: {
        description: 'Loialistul - orientat către securitate și sprijin.',
        interpretations: {
          high: 'Valorizezi securitatea și loialitatea în relații.',
          low: 'Ești mai independent și mai puțin căutător de securitate.'
        },
        yourScore: {
          high: 'Valorizezi foarte mult securitatea și loialitatea.',
          moderate: 'Îți place securitatea dar poți lua riscuri când e necesar.',
          low: 'Ești foarte independent și nu te teamă de risc.'
        }
      },
      type_7: {
        description: 'Entuziastul - orientat către experiențe noi și plăcere.',
        interpretations: {
          high: 'Îți place să explorezi și să ai experiențe noi și plăcute.',
          low: 'Ești mai focusat și mai puțin căutător de stimulare.'
        },
        yourScore: {
          high: 'Ești foarte aventuros și căuti constant experiențe noi.',
          moderate: 'Îți place varietatea dar poți să te concentrezi când e necesar.',
          low: 'Preferi focusul și profunzimea în loc de varietate.'
        }
      },
      type_8: {
        description: 'Provocatorul - orientat către putere și control.',
        interpretations: {
          high: 'Îți place să fii în control și să lupți pentru dreptate.',
          low: 'Ești mai puțin confrontational și mai diplomatic.'
        },
        yourScore: {
          high: 'Ești foarte asertiv și îți place să fii în control.',
          moderate: 'Poți fi asertiv când e necesar dar nu cauți conflictul.',
          low: 'Preferi diplomația și evitarea conflictelor.'
        }
      },
      type_9: {
        description: 'Pacificatorul - orientat către armonie și pace.',
        interpretations: {
          high: 'Valorizezi pacea și armonia, evitând conflictele.',
          low: 'Ești mai dispus să te confrunți și mai puțin evitant.'
        },
        yourScore: {
          high: 'Valorizezi foarte mult pacea și armonia.',
          moderate: 'Îți place pacea dar poți să te confrunți când e necesar.',
          low: 'Nu eviți conflictele și poți fi mai direct.'
        }
      }
    },

    'Roluri în Echipă Belbin': {
      plant: {
        description: 'Creativul - aduce idei originale și soluții inovatoare.',
        interpretations: {
          high: 'Ești foarte creativ și aduci idei originale în echipă.',
          low: 'Ești mai puțin focusat pe creativitate și mai practic.'
        },
        yourScore: {
          high: 'Ești sursa principală de idei creative în echipă.',
          moderate: 'Contribui cu idei creative dar nu numai cu acestea.',
          low: 'Te concentrezi mai mult pe aspectele practice decât pe creativitate.'
        }
      },
      resource_investigator: {
        description: 'Investigatorul de resurse - explorează oportunități și dezvoltă contacte.',
        interpretations: {
          high: 'Ești excelent la găsirea de oportunități și dezvoltarea rețelelor.',
          low: 'Ești mai puțin orientat spre exterior și mai introspectiv.'
        },
        yourScore: {
          high: 'Excel la găsirea de oportunități și contacte externe.',
          moderate: 'Poți explora oportunități dar nu este rolul tău principal.',
          low: 'Preferi să lucrezi cu resursele existente decât să cauți altele noi.'
        }
      },
      coordinator: {
        description: 'Coordonatorul - clarifică obiectivele și promovează luarea deciziilor.',
        interpretations: {
          high: 'Ești natural la coordonarea echipei și facilitarea deciziilor.',
          low: 'Preferi să contribui individual decât să coordonezi.'
        },
        yourScore: {
          high: 'Ești un coordinator natural care facilitează munca în echipă.',
          moderate: 'Poți coordona când e necesar dar nu cauți întotdeauna acest rol.',
          low: 'Preferi să contribui ca membru individual al echipei.'
        }
      },
      shaper: {
        description: 'Formatorul - provoacă echipa și depășește obstacolele.',
        interpretations: {
          high: 'Ești energic și îți place să împingi echipa către realizări.',
          low: 'Ești mai puțin confrontational și mai diplomatic.'
        },
        yourScore: {
          high: 'Ești forța motrice care împinge echipa să depășească obstacolele.',
          moderate: 'Poți provoca echipa când e necesar dar nu constant.',
          low: 'Preferi abordări mai diplomatice și mai puțin directe.'
        }
      },
      monitor_evaluator: {
        description: 'Monitor-Evaluatorul - analizează opțiunile și judecă cu exactitate.',
        interpretations: {
          high: 'Ești foarte bun la analizarea obiectivă și luarea deciziilor înțelepte.',
          low: 'Ești mai impulsiv și mai puțin analitic în decizii.'
        },
        yourScore: {
          high: 'Excel la analiza obiectivă și evaluarea opțiunilor.',
          moderate: 'Poți analiza situațiile dar nu întotdeauna în detaliu.',
          low: 'Preferi să acționezi rapid decât să analizezi îndelung.'
        }
      },
      teamworker: {
        description: 'Muncitorul în echipă - cooperează și evită conflictele.',
        interpretations: {
          high: 'Ești foarte cooperant și ajuți la menținerea armoniei în echipă.',
          low: 'Ești mai independent și mai puțin focusat pe dinamica echipei.'
        },
        yourScore: {
          high: 'Ești foarte cooperant și menții armonia în echipă.',
          moderate: 'Cooperezi bine dar poți fi și independent când e necesar.',
          low: 'Preferi să lucrezi independent și ești mai puțin focusat pe armonie.'
        }
      },
      implementer: {
        description: 'Implementatorul - transformă ideile în acțiuni practice.',
        interpretations: {
          high: 'Ești excelent la transformarea planurilor în acțiuni concrete.',
          low: 'Ești mai orientat către idei decât către implementare practică.'
        },
        yourScore: {
          high: 'Excel la transformarea ideilor în realitate prin acțiuni concrete.',
          moderate: 'Poți implementa dar îți place și să contribui cu idei.',
          low: 'Preferi să dezvolți idei decât să le implementezi practic.'
        }
      },
      completer_finisher: {
        description: 'Finalizatorul - verifică detaliile și respectă termenele.',
        interpretations: {
          high: 'Ești foarte atent la detalii și te asiguri că totul este terminat corect.',
          low: 'Ești mai puțin preocupat de detalii și mai orientat către imagine de ansamblu.'
        },
        yourScore: {
          high: 'Ești foarte atent la detalii și te asiguri că totul este perfect.',
          moderate: 'Vezi detaliile importante dar nu te obsedezi cu ele.',
          low: 'Preferi să te concentrezi pe imaginea de ansamblu decât pe detalii.'
        }
      },
      specialist: {
        description: 'Specialistul - aduce cunoștințe specializate și dedicare.',
        interpretations: {
          high: 'Ești foarte specializat și aduci expertiza tehnică în echipă.',
          low: 'Ești mai generalist și mai puțin focusat pe o specializare.'
        },
        yourScore: {
          high: 'Ești expertul tehnic care aduce cunoștințe specializate.',
          moderate: 'Ai expertiză în anumite domenii dar și cunoștințe generale.',
          low: 'Preferi să ai cunoștințe generale decât să te specializezi într-un domeniu.'
        }
      }
    },

    'Beck Depression Inventory': {
      depression_level: {
        description: 'Evaluează severitatea generală a simptomelor depresive.',
        interpretations: {
          high: 'Experimentezi simptome semnificative de depresie care necesită atenție profesională.',
          low: 'Ai un nivel minimal de simptome depresive, ceea ce indică o stare de bunăstare.'
        },
        yourScore: {
          high: 'Scorul indică simptome severe de depresie. Consultă un specialist în sănătate mentală.',
          moderate: 'Experimentezi simptome moderate de depresie. Consideră să cauți sprijin profesional.',
          low: 'Ai un nivel foarte scăzut de simptome depresive.'
        }
      },
      cognitive_symptoms: {
        description: 'Simptomele cognitive ale depresiei: gânduri negative, dificultăți de concentrare.',
        interpretations: {
          high: 'Experimentezi gânduri negative frecvente și dificultăți de concentrare.',
          low: 'Ai puține simptome cognitive ale depresiei.'
        },
        yourScore: {
          high: 'Ai simptome cognitive semnificative care afectează gândirea.',
          moderate: 'Experimentezi ocazional gânduri negative sau dificultăți de concentrare.',
          low: 'Gândirea ta este clară și pozitivă în general.'
        }
      },
      emotional_symptoms: {
        description: 'Simptomele emoționale: tristețe, vinovăție, iritabilitate.',
        interpretations: {
          high: 'Experimentezi emoții negative intense și frecvente.',
          low: 'Ai o stare emoțională stabilă și pozitivă.'
        },
        yourScore: {
          high: 'Simți emoții negative intense care te afectează semnificativ.',
          moderate: 'Ai momente de tristețe sau iritabilitate dar nu constante.',
          low: 'Starea ta emoțională este în general stabilă și pozitivă.'
        }
      },
      physical_symptoms: {
        description: 'Simptomele fizice: oboseală, probleme de somn, pierderea apetitului.',
        interpretations: {
          high: 'Experimentezi simptome fizice semnificative legate de depresie.',
          low: 'Ai puține sau deloc simptome fizice ale depresiei.'
        },
        yourScore: {
          high: 'Ai simptome fizice importante care îți afectează funcționarea zilnică.',
          moderate: 'Experimentezi unele simptome fizice ocazionale.',
          low: 'Te simți bine fizic și ai energie adecvată.'
        }
      }
    },

    'Test Aptitudini Cognitive': {
      verbal_reasoning: {
        description: 'Capacitatea de a înțelege și manipula informații verbale și concepte.',
        interpretations: {
          high: 'Ai abilități verbale excelente și înțelegi ușor concepte complexe.',
          low: 'Poți avea dificultăți cu materialul verbal complex.'
        },
        yourScore: {
          high: 'Excel la raționamentul verbal și analiza textelor complexe.',
          moderate: 'Ai abilități verbale solide cu potențial de dezvoltare.',
          low: 'Ar fi util să practice citirea și analiza de texte complexe.'
        }
      },
      numerical_reasoning: {
        description: 'Capacitatea de a lucra cu numere și concepte matematice.',
        interpretations: {
          high: 'Ai abilități matematice foarte bune și înțelegi rapid conceptele numerice.',
          low: 'Poți avea dificultăți cu calculele complexe și analiza numerică.'
        },
        yourScore: {
          high: 'Excel la matematică și analiza numerică.',
          moderate: 'Ai abilități numerice rezonabile cu potențial de îmbunătățire.',
          low: 'Ar fi util să practice calculele și conceptele matematice.'
        }
      },
      abstract_reasoning: {
        description: 'Capacitatea de a înțelege pattern-uri și relații abstracte.',
        interpretations: {
          high: 'Ai o capacitate excelentă de a vedea pattern-uri și conexiuni abstracte.',
          low: 'Poți avea dificultăți cu gândirea abstractă și pattern-urile complexe.'
        },
        yourScore: {
          high: 'Excel la identificarea pattern-urilor și gândirea abstractă.',
          moderate: 'Poți înțelege concepte abstracte cu efort.',
          low: 'Preferi concepte concrete și ai nevoie de exemple tangibile.'
        }
      },
      spatial_reasoning: {
        description: 'Capacitatea de a vizualiza și manipula obiecte în spațiu.',
        interpretations: {
          high: 'Ai abilități spațiale excelente și poți vizualiza ușor obiecte 3D.',
          low: 'Poți avea dificultăți cu vizualizarea spațială și orientarea.'
        },
        yourScore: {
          high: 'Excel la vizualizarea spațială și manipularea mentală a obiectelor.',
          moderate: 'Ai abilități spațiale rezonabile pentru majoritatea sarcinilor.',
          low: 'Ar fi util să practice exerciții de vizualizare spațială.'
        }
      },
      logical_reasoning: {
        description: 'Capacitatea de a analiza argumente și de a trage concluzii logice.',
        interpretations: {
          high: 'Ai abilități logice excelente și poți analiza argumente complexe.',
          low: 'Poți avea dificultăți cu raționamentul logic și analiza critică.'
        },
        yourScore: {
          high: 'Excel la gândirea logică și analiza critică.',
          moderate: 'Ai abilități logice solide cu potențial de dezvoltare.',
          low: 'Ar fi util să practice exerciții de logică și argumentare.'
        }
      }
    },

    'Competențe Digitale': {
      digital_literacy: {
        description: 'Cunoștințele și abilitățile de bază pentru folosirea tehnologiei digitale.',
        interpretations: {
          high: 'Ai competențe digitale excelente și te adaptezi ușor la tehnologii noi.',
          low: 'Ai nevoie să îți dezvolți competențele digitale de bază.'
        },
        yourScore: {
          high: 'Ești foarte competent în folosirea tehnologiei digitale.',
          moderate: 'Ai competențe digitale solide cu potențial de îmbunătățire.',
          low: 'Ar fi util să urmezi cursuri de alfabetizare digitală.'
        }
      },
      data_analysis: {
        description: 'Capacitatea de a interpreta și analiza date și informații.',
        interpretations: {
          high: 'Ești foarte bun la analiza datelor și extragerea de insights.',
          low: 'Ai nevoie să îți dezvolți abilitățile de analiză a datelor.'
        },
        yourScore: {
          high: 'Excel la analiza datelor și interpretarea statisticilor.',
          moderate: 'Poți analiza date simple dar ai nevoie de practică pentru cele complexe.',
          low: 'Ar fi util să înveți concepte de bază de analiză a datelor.'
        }
      },
      problem_solving_digital: {
        description: 'Abilitatea de a rezolva probleme folosind instrumente digitale.',
        interpretations: {
          high: 'Ești foarte priceput la rezolvarea problemelor cu ajutorul tehnologiei.',
          low: 'Ai dificultăți în utilizarea tehnologiei pentru rezolvarea problemelor.'
        },
        yourScore: {
          high: 'Folosești foarte eficient tehnologia pentru a rezolva probleme.',
          moderate: 'Poți rezolva probleme digitale comune cu succes.',
          low: 'Ai nevoie să dezvolți abilitățile de problem-solving digital.'
        }
      },
      digital_communication: {
        description: 'Competențele de comunicare în mediile digitale.',
        interpretations: {
          high: 'Comunici foarte eficient în mediile digitale.',
          low: 'Ai dificultăți cu comunicarea digitală efectivă.'
        },
        yourScore: {
          high: 'Excel la comunicarea digitală și folosirea platformelor online.',
          moderate: 'Comunici rezonabil în mediile digitale.',
          low: 'Ar fi util să practice comunicarea digitală și eticheta online.'
        }
      },
      digital_security: {
        description: 'Cunoștințele despre securitatea și protecția datelor digitale.',
        interpretations: {
          high: 'Ești foarte conștient de securitatea digitală și îți protejezi datele.',
          low: 'Ai nevoie să înveți mai multe despre securitatea digitală.'
        },
        yourScore: {
          high: 'Ai cunoștințe excelente despre securitatea digitală.',
          moderate: 'Înțelegi conceptele de bază de securitate digitală.',
          low: 'Ar fi important să înveți despre protecția datelor și securitatea online.'
        }
      }
    },

    'Aptitudini Profesionale': {
      leadership_aptitude: {
        description: 'Potențialul natural pentru a conduce și influența echipe.',
        interpretations: {
          high: 'Ai un potențial natural puternic pentru leadership.',
          low: 'Ai mai mult potențial ca membru al echipei decât ca lider.'
        },
        yourScore: {
          high: 'Ai aptitudini naturale excelente pentru leadership.',
          moderate: 'Ai potențial de leadership care poate fi dezvoltat.',
          low: 'Contribui cel mai bine ca membru valoros al echipei.'
        }
      },
      analytical_aptitude: {
        description: 'Capacitatea naturală de a analiza probleme complexe și date.',
        interpretations: {
          high: 'Ai aptitudini analitice foarte puternice pentru probleme complexe.',
          low: 'Preferi abordări mai puțin analitice și mai intuitive.'
        },
        yourScore: {
          high: 'Excel la analiza detaliată și gândirea sistematică.',
          moderate: 'Ai abilități analitice solide pentru majoritatea problemelor.',
          low: 'Preferi abordări intuitive și creative decât analize detaliate.'
        }
      },
      creative_aptitude: {
        description: 'Potențialul pentru gândire creativă și soluții inovatoare.',
        interpretations: {
          high: 'Ai un potențial creativ foarte puternic și aduci soluții originale.',
          low: 'Preferi abordări mai practice și mai puțin creative.'
        },
        yourScore: {
          high: 'Ai un potențial creativ excepțional și gândire inovatoare.',
          moderate: 'Poți fi creativ când situația o cere.',
          low: 'Preferi soluții dovedite și abordări practice.'
        }
      },
      technical_aptitude: {
        description: 'Aptitudinea pentru înțelegerea și utilizarea tehnologiilor.',
        interpretations: {
          high: 'Ai aptitudini tehnice foarte puternice și înțelegi rapid tehnologiile.',
          low: 'Ai dificultăți cu aspectele tehnice și preferi domeniile non-tehnice.'
        },
        yourScore: {
          high: 'Ai aptitudini tehnice excelente și te adaptezi rapid la tehnologii noi.',
          moderate: 'Poți învăța tehnologii cu efort și practică.',
          low: 'Preferi domeniile care nu necesită aptitudini tehnice avansate.'
        }
      },
      social_aptitude: {
        description: 'Capacitatea naturală de a interacționa și conecta cu oamenii.',
        interpretations: {
          high: 'Ai aptitudini sociale excelente și conectezi ușor cu oamenii.',
          low: 'Ai dificultăți cu interacțiunile sociale complexe.'
        },
        yourScore: {
          high: 'Excel la construirea relațiilor și comunicarea cu diverse persoane.',
          moderate: 'Te descurci bine în majoritatea situațiilor sociale.',
          low: 'Preferi munca independentă și interacțiunile sociale limitate.'
        }
      }
    },

    'Test Percepție Senzorială': {
      visual_perception: {
        description: 'Acuitatea și eficiența procesării informațiilor vizuale.',
        interpretations: {
          high: 'Ai o percepție vizuală foarte ascuțită și procesezi rapid informația vizuală.',
          low: 'Poți avea dificultăți cu procesarea rapidă a informațiilor vizuale complexe.'
        },
        yourScore: {
          high: 'Ai o percepție vizuală excepțională și atenție la detalii vizuale.',
          moderate: 'Percepția ta vizuală este bună pentru majoritatea sarcinilor.',
          low: 'Ar fi util să practice exerciții de antrenament vizual.'
        }
      },
      auditory_perception: {
        description: 'Capacitatea de a procesa și înțelege informațiile auditive.',
        interpretations: {
          high: 'Ai o percepție auditivă excelentă și distingi subtilitățile sonore.',
          low: 'Poți avea dificultăți cu procesarea informațiilor auditive complexe.'
        },
        yourScore: {
          high: 'Ai o sensibilitate auditivă excepțională și procesezi bine sunetele.',
          moderate: 'Percepția ta auditivă este adecvată pentru majoritatea situațiilor.',
          low: 'Ar putea fi util să practice ascultarea activă și focusată.'
        }
      },
      tactile_perception: {
        description: 'Sensibilitatea și eficiența percepției prin atingere.',
        interpretations: {
          high: 'Ai o sensibilitate tactilă foarte dezvoltată și folosești eficient atingerea.',
          low: 'Ai o sensibilitate tactilă mai redusă sau te bazezi mai puțin pe atingere.'
        },
        yourScore: {
          high: 'Ai o sensibilitate tactilă excepțională și folosești bine atingerea.',
          moderate: 'Percepția ta tactilă este normală pentru activitățile zilnice.',
          low: 'Te bazezi mai puțin pe informațiile tactile și mai mult pe alte simțuri.'
        }
      },
      spatial_perception: {
        description: 'Capacitatea de a percepe și naviga în spațiul tridimensional.',
        interpretations: {
          high: 'Ai o orientare spațială excelentă și navighezi ușor în spații complexe.',
          low: 'Poți avea dificultăți cu orientarea spațială și navigarea.'
        },
        yourScore: {
          high: 'Ai o orientare spațială excepțională și simț excelent al direcției.',
          moderate: 'Te orientezi bine în majoritatea spațiilor familiare.',
          low: 'Ar fi util să practice exerciții de orientare spațială.'
        }
      }
    }
  };

  const testExplanations = explanations[testName] || 
                          Object.entries(explanations).find(([key]) => testName.includes(key))?.[1];
  
  return testExplanations?.[dimensionKey] || null;
};
