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

export interface ScoreRange {
  range: string;
  label: string;
  variant: 'default' | 'secondary' | 'outline';
}

export interface TestScoringExplanation {
  description: string;
  scoreRanges?: ScoreRange[];
  whatItMeans?: string;
}

export interface ScoreInterpretationResult {
  level: string;
  description: string;
  variant: 'default' | 'secondary' | 'outline';
}

export const getDimensionLabel = (key: string): string => {
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
    team_building: 'Construirea Echipei',

    // Emotional Intelligence dimensions
    self_awareness: 'Autoconștientizare',
    self_regulation: 'Autoreglare',
    motivation: 'Motivație',
    social_skills: 'Abilități Sociale',

    // GAD-7 dimensions
    worry_frequency: 'Frecvența îngrijorărilor',
    control_difficulty: 'Dificultatea de control',
    anxiety_symptoms: 'Simptome de anxietate',
    restlessness: 'Agitație',
    concentration_problems: 'Probleme de concentrare',
    irritability: 'Iritabilitate',
    sleep_disturbance: 'Tulburări de somn',

    // Beck Depression dimensions
    mood_symptoms: 'Simptome de dispoziție',
    cognitive_symptoms: 'Simptome cognitive',
    physical_symptoms: 'Simptome fizice',
    behavioral_symptoms: 'Simptome comportamentale',

    // Professional Aptitudes dimensions
    analytical_thinking: 'Gândire Analitică',
    communication_skills: 'Abilități de Comunicare',
    leadership_potential: 'Potențial de Leadership',
    adaptability: 'Adaptabilitate',
    teamwork: 'Muncă în Echipă',

    // Digital Competencies dimensions
    technical_proficiency: 'Competență Tehnică',
    digital_communication: 'Comunicare Digitală',
    data_analysis: 'Analiză de Date',
    cybersecurity_awareness: 'Conștientizare Cybersecurity',
    digital_innovation: 'Inovație Digitală'
  };

  return labels[key] || key;
};

export const getScoreColor = (score: number, testName?: string): string => {
  if (testName === 'Test Aptitudini Cognitive') {
    if (score >= 90) return 'text-purple-600';
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-blue-600';
    return 'text-orange-600';
  } else if (score >= 70) {
    return 'text-green-500';
  } else if (score >= 40) {
    return 'text-yellow-500';
  } else {
    return 'text-red-500';
  }
};

export const getScoreBadgeVariant = (score: number, testName?: string): 'default' | 'secondary' | 'outline' => {
  if (testName === 'Test Aptitudini Cognitive') {
    if (score >= 90) return 'default';
    if (score >= 70) return 'default';
    if (score >= 40) return 'secondary';
    return 'outline';
  } else if (score >= 70) {
    return 'default';
  } else if (score >= 40) {
    return 'secondary';
  } else {
    return 'outline';
  }
};

export const getTestScoringExplanation = (testName: string): TestScoringExplanation | null => {
  const explanations: { [key: string]: TestScoringExplanation } = {
    'Big Five': {
      description: 'Testul Big Five măsoară personalitatea pe 5 dimensiuni fundamentale care descriu trăsăturile tale de personalitate și modul în care interacționezi cu lumea.',
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' },
        { range: '70-100%', label: 'Ridicat', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale arată profilul tău de personalitate și cum te poziționezi față de alte persoane în ceea ce privește aceste 5 dimensiuni fundamentale.'
    },
    'Inteligență Emoțională': {
      description: 'Acest test evaluează capacitatea ta de a înțelege, gestiona și utiliza emoțiile în mod eficient în relațiile personale și profesionale.',
      scoreRanges: [
        { range: '0-39%', label: 'Dezvoltare necesară', variant: 'outline' },
        { range: '40-69%', label: 'Competent', variant: 'secondary' },
        { range: '70-100%', label: 'Foarte dezvoltat', variant: 'default' }
      ],
      whatItMeans: 'Un scor mai ridicat indică o capacitate mai bună de a gestiona emoțiile tale și de a înțelege emoțiile altora, ceea ce poate îmbunătăți relațiile și succesul profesional.'
    },
    'GAD-7': {
      description: 'GAD-7 este un screening pentru anxietatea generalizată care măsoară frecvența și intensitatea simptomelor de anxietate din ultimele două săptămâni.',
      scoreRanges: [
        { range: '0-4', label: 'Minimal', variant: 'default' },
        { range: '5-9', label: 'Ușor', variant: 'secondary' },
        { range: '10-14', label: 'Moderat', variant: 'outline' },
        { range: '15-21', label: 'Sever', variant: 'outline' }
      ],
      whatItMeans: 'Scorurile mai mari indică niveluri mai ridicate de anxietate. Un scor de 10 sau mai mare sugerează că ar putea fi util să vorbești cu un profesionist în sănătate mintală.'
    },
    'Beck Depression': {
      description: 'Beck Depression Inventory evaluează severitatea simptomelor depresive și poate ajuta la identificarea nevoii de suport profesional.',
      scoreRanges: [
        { range: '0-13', label: 'Minimal', variant: 'default' },
        { range: '14-19', label: 'Ușor', variant: 'secondary' },
        { range: '20-28', label: 'Moderat', variant: 'outline' },
        { range: '29-63', label: 'Sever', variant: 'outline' }
      ],
      whatItMeans: 'Scorurile mai mari indică simptome mai severe de depresie. Este important să discuți rezultatele cu un profesionist dacă scorul este ridicat.'
    },
    'Aptitudini Profesionale': {
      description: 'Acest test evaluează competențele și aptitudinile tale profesionale cheie care sunt importante pentru succesul în carieră.',
      scoreRanges: [
        { range: '0-39%', label: 'Dezvoltare necesară', variant: 'outline' },
        { range: '40-69%', label: 'Competent', variant: 'secondary' },
        { range: '70-100%', label: 'Foarte dezvoltat', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele arată punctele tale forte și zonele unde poți să te dezvolți pentru a-ți îmbunătăți performanța profesională.'
    },
    'Competențe Digitale': {
      description: 'Evaluează nivelul tău de competențe digitale și abilitatea de a utiliza tehnologia în mod eficient în contextul modern.',
      scoreRanges: [
        { range: '0-39%', label: 'Începător', variant: 'outline' },
        { range: '40-69%', label: 'Intermediar', variant: 'secondary' },
        { range: '70-100%', label: 'Avansat', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele îți arată unde te poziționezi în era digitală și ce competențe poți dezvolta pentru a fi mai eficient.'
    },
    'Test Aptitudini Cognitive': {
      description: 'Test Aptitudini Cognitive evaluează cinci tipuri fundamentale de raționament cognitiv: verbal, numeric, logic, spațial și abstract. Aceste aptitudini sunt esențiale pentru succesul academic și profesional, oferind o imagine completă asupra capacităților intelectuale. Testul măsoară nu doar cunoștințele, ci și capacitatea de a procesa informații, de a rezolva probleme și de a gândi critic.',
      scoreRanges: [
        { range: '0-39%', label: 'Sub medie', variant: 'outline' },
        { range: '40-69%', label: 'Mediu', variant: 'secondary' },
        { range: '70-89%', label: 'Ridicat', variant: 'default' },
        { range: '90-100%', label: 'Excepțional', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele te ajută să înțelegi punctele forte și slăbiciunile cognitive, să alegi domenii de studiu sau cariere potrivite aptitudinilor tale și să dezvolți strategii de învățare eficiente. Un profil echilibrat indică versatilitate cognitivă, în timp ce scoruri ridicate în anumite domenii pot sugera specializări naturale.'
    }
  };

  // Find matching test type
  for (const [key, explanation] of Object.entries(explanations)) {
    if (testName.includes(key)) {
      return explanation;
    }
  }

  return null;
};

export const getScoreInterpretation = (score: number, scoreType: 'percentage' | 'scale' | 'raw' = 'percentage'): ScoreInterpretationResult => {
  if (scoreType === 'percentage') {
    if (score >= 70) {
      return {
        level: 'Ridicat',
        description: 'Scorul tău este în intervalul superior, indicând un nivel ridicat pentru această măsură.',
        variant: 'default'
      };
    } else if (score >= 40) {
      return {
        level: 'Moderat',
        description: 'Scorul tău este în intervalul mediu, indicând un nivel moderat pentru această măsură.',
        variant: 'secondary'
      };
    } else {
      return {
        level: 'Scăzut',
        description: 'Scorul tău este în intervalul inferior, indicând un nivel scăzut pentru această măsură.',
        variant: 'outline'
      };
    }
  } else if (scoreType === 'scale') {
    if (score >= 7) {
      return {
        level: 'Ridicat',
        description: 'Scorul tău este ridicat pe această scală.',
        variant: 'default'
      };
    } else if (score >= 4) {
      return {
        level: 'Moderat',
        description: 'Scorul tău este moderat pe această scală.',
        variant: 'secondary'
      };
    } else {
      return {
        level: 'Scăzut',
        description: 'Scorul tău este scăzut pe această scală.',
        variant: 'outline'
      };
    }
  } else {
    // Raw score interpretation depends on the specific test
    return {
      level: 'Individual',
      description: 'Acest scor necesită interpretare specifică pentru testul respectiv.',
      variant: 'secondary'
    };
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
      },
      restlessness: {
        description: 'Sentimentul de neliniște și incapacitatea de a te relaxa.',
        interpretations: {
          high: 'Te simți adesea neliniștit și îți este greu să te relaxezi.',
          low: 'Reușești să te relaxezi și să îți găsești liniștea interioară.'
        }
      },
      concentration_problems: {
        description: 'Dificultăți în concentrare și focalizare pe sarcini.',
        interpretations: {
          high: 'Anxietatea îți afectează capacitatea de concentrare.',
          low: 'Poți să te concentrezi bine chiar și în situații stresante.'
        }
      },
      irritability: {
        description: 'Tendința de a deveni ușor iritabil sau nervos.',
        interpretations: {
          high: 'Te superi sau te enervezi mai ușor decât de obicei.',
          low: 'Menții o dispoziție echilibrată chiar și sub presiune.'
        }
      },
      sleep_disturbance: {
        description: 'Probleme cu somnul cauzate de anxietate sau îngrijorări.',
        interpretations: {
          high: 'Anxietatea îți afectează calitatea și durata somnului.',
          low: 'Dormi bine și odihnitor, fără să fii afectat de îngrijorări.'
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
      },
      physical_symptoms: {
        description: 'Manifestările fizice ale depresiei, cum ar fi oboseala și problemele de somn.',
        interpretations: {
          high: 'Experimentezi simptome fizice care pot fi legate de starea emoțională.',
          low: 'Te simți energic și ai un nivel normal de activitate fizică.'
        }
      },
      behavioral_symptoms: {
        description: 'Schimbările în comportament și activități zilnice.',
        interpretations: {
          high: 'Îți poate fi dificil să îți menții rutina obișnuită.',
          low: 'Îți menții activitățile normale și angajamentele sociale.'
        }
      }
    },

    'Aptitudini Profesionale': {
      analytical_thinking: {
        description: 'Capacitatea de a analiza informații complexe și de a lua decizii bazate pe date.',
        interpretations: {
          high: 'Excelezi în analizarea problemelor complexe și găsirea soluțiilor logice.',
          low: 'Poți dezvolta mai mult abilitatea de analiză sistematică a informațiilor.'
        },
        yourScore: {
          high: 'Ai abilități analitice foarte dezvoltate.',
          moderate: 'Te descurci bine la analizarea problemelor de complexitate medie.',
          low: 'Poți îmbunătăți tehnicile de gândire analitică și logică.'
        }
      },
      communication_skills: {
        description: 'Abilitatea de a comunica eficient, atât verbal cât și în scris.',
        interpretations: {
          high: 'Comunici clar și persuasiv, adaptându-te la diferite audiențe.',
          low: 'Poți dezvolta mai mult abilitățile de comunicare pentru a fi mai eficient.'
        },
        yourScore: {
          high: 'Ai abilități de comunicare excelente.',
          moderate: 'Comunici eficient în majoritatea situațiilor.',
          low: 'Poți îmbunătăți tehnicile de comunicare verbală și scrisă.'
        }
      },
      leadership_potential: {
        description: 'Capacitatea de a inspira, motiva și ghida pe alții către obiective comune.',
        interpretations: {
          high: 'Demonstrezi calități naturale de leadership și poți inspira pe alții.',
          low: 'Poți dezvolta mai mult abilitățile de leadership prin practică și formare.'
        },
        yourScore: {
          high: 'Ai un potențial de leadership foarte ridicat.',
          moderate: 'Arăți semne promițătoare de dezvoltare a leadershipului.',
          low: 'Poți dezvolta abilitățile de leadership prin experiență și învățare.'
        }
      },
      adaptability: {
        description: 'Capacitatea de a te adapta la schimbări și situații noi.',
        interpretations: {
          high: 'Te adaptezi rapid la schimbări și îmbrățișezi cu ușurință situațiile noi.',
          low: 'Preferi stabilitatea și îți poate fi dificil să te adaptezi la schimbări rapide.'
        },
        yourScore: {
          high: 'Ești foarte flexibil și adaptabil la schimbări.',
          moderate: 'Te adaptezi rezonabil de bine la situații noi.',
          low: 'Poți dezvolta mai mult flexibilitatea și deschiderea către schimbare.'
        }
      },
      teamwork: {
        description: 'Abilitatea de a lucra eficient în echipă și de a colabora constructiv.',
        interpretations: {
          high: 'Colaborezi excelent în echipă și contribui pozitiv la dinamica grupului.',
          low: 'Poți îmbunătăți abilitățile de colaborare și lucru în echipă.'
        },
        yourScore: {
          high: 'Ești un membru de echipă foarte valoros.',
          moderate: 'Colaborezi bine cu majoritatea colegilor.',
          low: 'Poți dezvolta mai mult abilitățile de lucru în echipă.'
        }
      }
    },

    'Competențe Digitale': {
      technical_proficiency: {
        description: 'Nivelul de competență în utilizarea tehnologiilor și instrumentelor digitale.',
        interpretations: {
          high: 'Stăpânești foarte bine tehnologiile digitale și te adaptezi rapid la unelte noi.',
          low: 'Poți îmbunătăți abilitățile tehnice prin formare și practică.'
        },
        yourScore: {
          high: 'Ai competențe tehnice foarte dezvoltate.',
          moderate: 'Te descurci bine cu majoritatea tehnologiilor.',
          low: 'Poți dezvolta mai mult abilitățile tehnice digitale.'
        }
      },
      digital_communication: {
        description: 'Abilitatea de a comunica eficient prin mijloace digitale.',
        interpretations: {
          high: 'Excelezi în comunicarea digitală și folosești eficient platformele online.',
          low: 'Poți îmbunătăți modul în care comunici prin mijloace digitale.'
        },
        yourScore: {
          high: 'Ai abilități excelente de comunicare digitală.',
          moderate: 'Comunici eficient prin majoritatea canalelor digitale.',
          low: 'Poți dezvolta mai mult abilitățile de comunicare online.'
        }
      },
      data_analysis: {
        description: 'Capacitatea de a interpreta și analiza date pentru a lua decizii informate.',
        interpretations: {
          high: 'Analizezi datele cu ușurință și extragi insight-uri valoroase.',
          low: 'Poți dezvolta mai mult abilitățile de analiză și interpretare a datelor.'
        },
        yourScore: {
          high: 'Ai abilități foarte bune de analiză a datelor.',
          moderate: 'Poți interpreta datele de bază și extragi informații utile.',
          low: 'Poți îmbunătăți abilitățile de lucru cu datele și analiză.'
        }
      },
      cybersecurity_awareness: {
        description: 'Conștientizarea riscurilor de securitate cibernetică și adoptarea de practici sigure.',
        interpretations: {
          high: 'Ești foarte conștient de riscurile digitale și adopți practici sigure.',
          low: 'Poți îmbunătăți cunoștințele despre securitatea cibernetică.'
        },
        yourScore: {
          high: 'Ai o conștientizare excelentă a securității cibernetice.',
          moderate: 'Înțelegi riscurile de bază și adopți practici rezonabile.',
          low: 'Poți învăța mai mult despre securitatea digitală și protecția datelor.'
        }
      },
      digital_innovation: {
        description: 'Capacitatea de a identifica și implementa soluții digitale inovatoare.',
        interpretations: {
          high: 'Ești inovator în utilizarea tehnologiei și găsești soluții creative.',
          low: 'Poți dezvolta mai mult creativitatea în folosirea tehnologiilor.'
        },
        yourScore: {
          high: 'Ai un spirit inovator foarte dezvoltat în domeniul digital.',
          moderate: 'Arăți creativitate în utilizarea tehnologiilor.',
          low: 'Poți explora mai mult potențialul inovator al tehnologiilor.'
        }
      }
    },

    'Test Aptitudini Cognitive': {
      '0': {
        description: 'Raționamentul verbal măsoară capacitatea de a înțelege, analiza și utiliza limbajul în mod eficient. Include vocabularul, comprehensiunea textului, analogiile verbale și abilitatea de a exprima idei clar și coherent.',
        interpretations: {
          high: 'Scoruri ridicate indică o capacitate excelentă de comunicare, vocabular bogat și abilități puternice de comprehensiune. Aceste persoane reușesc bine în domenii care necesită expresie verbală și analiza textelor.',
          low: 'Scoruri mai mici sugerează posibile dificultăți în comunicarea verbală sau în înțelegerea textelor complexe. Cu practică și dezvoltare, aceste abilități pot fi îmbunătățite semnificativ.'
        },
        yourScore: {
          high: 'Ai o capacitate verbală remarcabilă! Ești capabil să comunici eficient, să înțelegi texte complexe și să faci conexiuni verbale subtile. Consideră cariere în jurnalism, literatură, drept sau educație.',
          moderate: 'Ai abilități verbale solide care îți permit să comunici eficient în majoritatea situațiilor. Cu mai multă practică în lectură și scriere, poți dezvolta aceste abilități la un nivel superior.',
          low: 'Raționamentul verbal poate fi îmbunătățit prin lectură regulată, expansiunea vocabularului și practica expresiei scrise și orale. Concentrează-te pe dezvoltarea acestor abilități pentru o comunicare mai eficientă.'
        }
      },
      '1': {
        description: 'Raționamentul numeric evaluează abilitatea de a lucra cu numere, de a efectua calcule și de a rezolva probleme matematice. Include aritmetica de bază, gândirea cantitativă și recunoașterea modelelor numerice.',
        interpretations: {
          high: 'Persoanele cu scoruri ridicate la raționamentul numeric sunt eficiente în lucrul cu date cantitative, calcule și analiza numerică. Sunt potrivite pentru cariere în matematică, științe, inginerie sau finanțe.',
          low: 'Scoruri mai mici pot indica nevoia de mai multă practică cu conceptele matematice de bază. Aceste abilități pot fi dezvoltate prin exerciții regulate și abordări practice ale matematicii.'
        },
        yourScore: {
          high: 'Ai abilități numerice excelente! Poți lucra cu ușurință cu date cantitative și rezolva probleme matematice complexe. Domeniile STEM, finanțele sau analiza datelor ar putea fi potrivite pentru tine.',
          moderate: 'Ai o bună înțelegere a conceptelor numerice și poți rezolva majoritatea problemelor matematice. Cu practică suplimentară, poți dezvolta aceste abilități la un nivel avansat.',
          low: 'Raționamentul numeric poate fi îmbunătățit prin practică regulată cu exerciții matematice și aplicații practice ale numerelor în viața de zi cu zi. Nu te descuraja - cu perseverență, aceste abilități se dezvoltă.'
        }
      },
      '2': {
        description: 'Raționamentul logic măsoară capacitatea de a gândi secvențial, de a face inferențe valide și de a rezolva probleme prin aplicarea principiilor logice. Include deducția, inducția și gândirea critică.',
        interpretations: {
          high: 'Scoruri ridicate indică o capacitate excelentă de a analiza informații, de a identifica relații cauzale și de a lua decizii bazate pe logică. Aceste persoane reușesc în rezolvarea problemelor complexe.',
          low: 'Scoruri mai mici sugerează nevoia de dezvoltare a gândirii structurate și a abilităților de analiză. Aceste competențe pot fi îmbunătățite prin practică și înțelegerea principiilor logice.'
        },
        yourScore: {
          high: 'Ai o capacitate logică remarcabilă! Poți analiza informații complexe, identifica modele și lua decizii raționale. Consideră cariere în programare, consultanță, cercetare sau management strategic.',
          moderate: 'Ai abilități logice bune care îți permit să rezolvi majoritatea problemelor. Dezvoltă aceste abilități prin puzzle-uri logice, jocuri de strategie și analiza sistematică a problemelor.',
          low: 'Raționamentul logic poate fi dezvoltat prin practică cu exerciții de logică, puzzle-uri și abordarea sistematică a problemelor. Încearcă să analizezi pas cu pas situațiile complexe.'
        }
      },
      '3': {
        description: 'Raționamentul spațial evaluează capacitatea de a vizualiza și manipula mental obiecte în spațiu. Include rotația mentală, orientarea spațială și înțelegerea relațiilor geometrice.',
        interpretations: {
          high: 'Persoanele cu abilități spațiale puternice pot vizualiza cu ușurință obiecte tridimensionale, înțeleg planurile și hărțile și pot naviga eficient în spațiu. Sunt potrivite pentru cariere în arhitectură, inginerie sau arte vizuale.',
          low: 'Scoruri mai mici pot indica dificultăți în vizualizarea spațială sau în înțelegerea relațiilor geometrice. Aceste abilități pot fi dezvoltate prin practică cu puzzle-uri 3D și exerciții de vizualizare.'
        },
        yourScore: {
          high: 'Ai abilități spațiale exceptionale! Poți vizualiza mental obiecte complexe și înțelegi relațiile spațiale cu ușurință. Arhitectura, ingineria, designul sau pilotajul ar putea fi domenii perfecte pentru tine.',
          moderate: 'Ai o bună înțelegere a relațiilor spațiale. Poți dezvolta aceste abilități prin jocuri de construcție, puzzle-uri 3D și activități care implică vizualizarea spațială.',
          low: 'Raționamentul spațial poate fi îmbunătățit prin practică cu puzzle-uri, jocuri de construcție și exerciții de vizualizare. Încearcă activități care te ajută să gândești tridimensional.'
        }
      },
      '4': {
        description: 'Raționamentul abstract măsoară capacitatea de a identifica modele, de a face conexiuni între concepte aparent nerelaționate și de a gândi flexibil. Include recunoașterea de tipare și gândirea creativă.',
        interpretations: {
          high: 'Scoruri ridicate indică o capacitate excelentă de a gândi abstract, de a identifica modele complexe și de a face conexiuni inovatoare. Aceste persoane au potențial pentru inovație și creativitate.',
          low: 'Scoruri mai mici sugerează o preferință pentru gândirea concretă și structurată. Gândirea abstractă poate fi dezvoltată prin expunerea la idei diverse și practica recunoașterii de modele.'
        },
        yourScore: {
          high: 'Ai o capacitate abstractă remarcabilă! Poți identifica modele complexe și face conexiuni creative între idei. Cercetarea, inovația, arta conceptuală sau strategia de business ar putea fi domeniile tale.',
          moderate: 'Ai abilități abstracte solide care îți permit să înțelegi concepte complexe. Dezvoltă aceste abilități prin expunerea la idei diverse și prin exerciții de recunoaștere a modelelor.',
          low: 'Gândirea abstractă poate fi dezvoltată prin practică cu puzzle-uri de modele, expunerea la arte și filosofie, și prin încercarea de a identifica conexiuni între concepte diferite.'
        }
      }
    }
  };

  // Handle numeric keys for cognitive aptitudes test
  function getActualDimensionKey(testName: string, key: string): string {
    if (testName === 'Test Aptitudini Cognitive') {
      const mapping: { [key: string]: string } = {
        '0': '0', // Raționament Verbal
        '1': '1', // Raționament Numeric
        '2': '2', // Raționament Logic
        '3': '3', // Raționament Spațial
        '4': '4'  // Raționament Abstract
      };
      return mapping[key] || key;
    }
    return key;
  }

  const actualKey = getActualDimensionKey(testName, dimensionKey);
  return explanations[testName]?.[actualKey] || null;
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
