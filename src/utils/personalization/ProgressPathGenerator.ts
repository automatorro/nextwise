import { StandardizedScore } from '@/types/tests';
import { translateKey } from '@/utils/translationUtils';

// Get translations function
const getTranslations = async () => {
  const language = localStorage.getItem('language') || 'ro';
  try {
    const translations = await import(`../../../public/locales/${language}.json`);
    return translations.default;
  } catch (error) {
    const fallback = await import('../../../public/locales/ro.json');
    return fallback.default;
  }
};

export interface ProgressMilestone {
  timeframe: string;
  goal: string;
  description: string;
}

export interface ProgressPath {
  milestones: ProgressMilestone[];
  trackingMethods?: string[];
  retestRecommendation?: string;
}

export async function getProgressPath(
  testName: string, 
  score: StandardizedScore
): Promise<ProgressPath | null> {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('gad') || testKey.includes('anxietate')) {
    return getGADProgressPath(score);
  }
  
  if (testKey.includes('phq') || testKey.includes('depresie') || testKey.includes('beck') || testKey.includes('bdi')) {
    return getPHQProgressPath(score);
  }
  
  if (testKey.includes('big five') || testKey.includes('personality')) {
    return await getBigFiveProgressPath(score);
  }
  
  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    return getCattellProgressPath(score);
  }
  
  if (testKey.includes('enneagram')) {
    return getEnneagramProgressPath(score);
  }
  
  return null;
}

function getGADProgressPath(score: StandardizedScore): ProgressPath {
  const rawScore = score.raw_score || 0;
  
  if (rawScore <= 4) {
    return {
      milestones: [
        {
          timeframe: '1-2 săptămâni',
          goal: 'Menținerea echilibrului',
          description: 'Continuă cu strategiile curente de management al stresului'
        },
        {
          timeframe: '1-3 luni',
          goal: 'Prevenirea',
          description: 'Dezvoltă strategii preventive pentru gestionarea stresului viitor'
        },
        {
          timeframe: '6 luni',
          goal: 'Optimizarea',
          description: 'Optimizează rutinele de wellness și auto-îngrijire'
        }
      ],
      trackingMethods: [
        'Monitorizează nivelul de stress zilnic (scală 1-10)',
        'Notează factorii declanșatori și strategiile eficiente',
        'Evaluează calitatea somnului și energia zilnică'
      ],
      retestRecommendation: 'Re-testare recomandată în 6-12 luni pentru menținerea monitorizării sănătății mentale.'
    };
  } else if (rawScore <= 9) {
    return {
      milestones: [
        {
          timeframe: '1-2 săptămâni',
          goal: 'Implementarea tehnicilor de bază',
          description: 'Învață și practică tehnici de relaxare și respirație'
        },
        {
          timeframe: '4-6 săptămâni',
          goal: 'Stabilirea rutinei',
          description: 'Creează o rutină zilnică care include management al stresului'
        },
        {
          timeframe: '3 luni',
          goal: 'Reducerea simptomelor',
          description: 'Observă îmbunătățiri în gestionarea anxietății zilnice'
        }
      ],
      trackingMethods: [
        'Jurnal zilnic al anxietății cu note despre intensitate și declanșatori',
        'Urmărește progresul în exercițiile de relaxare',
        'Monitorizează schimbările în pattern-urile de somn'
      ],
      retestRecommendation: 'Re-testare în 2-3 luni pentru evaluarea progresului tehnicilor de management.'
    };
  } else if (rawScore <= 14) {
    return {
      milestones: [
        {
          timeframe: '1 săptămână',
          goal: 'Consultare profesională',
          description: 'Programează și participă la prima consultație cu un specialist'
        },
        {
          timeframe: '1 lună',
          goal: 'Plan de tratament',
          description: 'Dezvoltă și începe implementarea planului de tratament'
        },
        {
          timeframe: '3 luni',
          goal: 'Îmbunătățiri măsurabile',
          description: 'Observă reducerea semnificativă a simptomelor de anxietate'
        }
      ],
      trackingMethods: [
        'Colaborează cu terapeutul pentru monitoring profesional',
        'Completează regulat scale de evaluare a anxietății',
        'Documentează progresul în activitățile zilnice afectate'
      ],
      retestRecommendation: 'Re-testare la 6-8 săptămâni sau conform recomandărilor terapeutului.'
    };
  } else {
    return {
      milestones: [
        {
          timeframe: '24-48 ore',
          goal: 'Intervenție imediată',
          description: 'Contactează un specialist și stabilește un plan de siguranță'
        },
        {
          timeframe: '1-2 săptămâni',
          goal: 'Stabilizare',
          description: 'Implementează strategii intensive de management al crizei'
        },
        {
          timeframe: '1-2 luni',
          goal: 'Reducerea severității',
          description: 'Progres semnificativ în reducerea simptomelor severe'
        }
      ],
      trackingMethods: [
        'Monitoring profesional intensiv',
        'Evaluări frecvente ale siguranței și stabilității',
        'Urmărirea aderenței la planul de tratament'
      ],
      retestRecommendation: 'Re-testare frecventă conform protocolului stabilit cu specialistul (de obicei săptămânal/bi-săptămânal).'
    };
  }
}

function getPHQProgressPath(score: StandardizedScore): ProgressPath {
  const rawScore = score.raw_score || 0;
  
  if (rawScore <= 4) {
    return {
      milestones: [
        {
          timeframe: '2-4 săptămâni',
          goal: 'Menținerea bunăstării',
          description: 'Continuă cu activitățile care susțin sănătatea mentală'
        },
        {
          timeframe: '3-6 luni',
          goal: 'Dezvoltarea resilienței',
          description: 'Dezvoltă strategii pentru gestionarea provocărilor viitoare'
        }
      ],
      trackingMethods: [
        'Monitorizează dispoziția zilnică',
        'Urmărește calitatea relațiilor și activităților plăcute'
      ],
      retestRecommendation: 'Re-testare anuală pentru menținerea monitorului sănătății mentale.'
    };
  } else if (rawScore <= 9) {
    return {
      milestones: [
        {
          timeframe: '2-4 săptămâni',
          goal: 'Îmbunătățirea rutinei',
          description: 'Stabilește rutine sănătoase pentru somn, exerciții și nutriție'
        },
        {
          timeframe: '6-8 săptămâni',
          goal: 'Îmbunătățirea dispoziției',
          description: 'Observă îmbunătățiri în energie și interes pentru activități'
        }
      ],
      trackingMethods: [
        'Jurnal zilnic al dispoziției și energiei',
        'Urmărește participarea la activități sociale și de plăcere'
      ],
      retestRecommendation: 'Re-testare în 2-3 luni pentru evaluarea eficacității strategiilor implementate.'
    };
  } else {
    return {
      milestones: [
        {
          timeframe: '1 săptămână',
          goal: 'Consultare profesională',
          description: 'Programează evaluarea cu un specialist în sănătate mintală'
        },
        {
          timeframe: '4-6 săptămâni',
          goal: 'Stabilizarea simptomelor',
          description: 'Implementează planul de tratament și observă primele îmbunătățiri'
        },
        {
          timeframe: '3-6 luni',
          goal: 'Recuperarea funcțională',
          description: 'Redobândește capacitatea de a funcționa în activitățile zilnice'
        }
      ],
      trackingMethods: [
        'Colaborează cu echipa medicală pentru monitoring profesional',
        'Urmărește progresul în funcționarea zilnică',
        'Monitorizează aderența la tratament'
      ],
      retestRecommendation: 'Re-testare conform programului stabilit cu specialistul (de obicei la 4-6 săptămâni).'
    };
  }
}

async function getBigFiveProgressPath(score: StandardizedScore): Promise<ProgressPath> {
  const translations = await getTranslations();
  const t = (key: string) => translateKey(translations, key);
  const milestones: ProgressMilestone[] = [];
  const trackingMethods: string[] = [];
  
  if (!score.dimensions) {
    return {
      milestones: [
        {
          timeframe: 'Săptămâna 1-2',
          goal: t('progressPath.bigFive.understandProfile'),
          description: t('progressPath.bigFive.understandProfileDesc')
        }
      ],
      retestRecommendation: t('progressPath.bigFive.retestRecommendation')
    };
  }

  // Declare all dimension variables at the top
  const conscientiousness = score.dimensions.find(d => d.id === 'conscientiousness');
  const extraversion = score.dimensions.find(d => d.id === 'extraversion');
  const openness = score.dimensions.find(d => d.id === 'openness');
  const neuroticism = score.dimensions.find(d => d.id === 'neuroticism');

  // Milestone 1: Analiza inițială
  milestones.push({
    timeframe: 'Săptămâna 1-2',
    goal: t('progressPath.bigFive.understandProfile'),
    description: t('progressPath.bigFive.understandProfileDesc')
  });

  // Milestones personalizate bazate pe scoruri
  const strongDimensions = score.dimensions.filter(d => d.score >= 7);
  const weakDimensions = score.dimensions.filter(d => d.score <= 4);

  if (strongDimensions.length > 0) {
    milestones.push({
      timeframe: 'Săptămâna 3-4',
      goal: t('progressPath.bigFive.valorizeStrengths'),
      description: t('progressPath.bigFive.valorizeStrengthsDesc').replace('{{strengths}}', strongDimensions.map(d => d.name).join(', '))
    });
  }

  if (weakDimensions.length > 0) {
    milestones.push({
      timeframe: 'Luna 2',
      goal: t('progressPath.bigFive.developBalance'),
      description: t('progressPath.bigFive.developBalanceDesc').replace('{{weaknesses}}', weakDimensions.map(d => d.name).join(', '))
    });
  }

  // Milestones specifice pentru dimensiuni cheie
  if (conscientiousness && conscientiousness.score <= 4) {
    milestones.push({
      timeframe: 'Luna 2-3',
      goal: t('progressPath.bigFive.buildSimpleOrganization'),
      description: t('progressPath.bigFive.buildSimpleOrganizationDesc')
    });
  }

  if (extraversion && extraversion.score >= 7) {
    milestones.push({
      timeframe: 'Luna 3',
      goal: t('progressPath.bigFive.expandSocialNetwork'),
      description: t('progressPath.bigFive.expandSocialNetworkDesc')
    });
  } else if (extraversion && extraversion.score <= 4) {
    milestones.push({
      timeframe: 'Luna 3',
      goal: t('progressPath.bigFive.developDeepRelationships'),
      description: t('progressPath.bigFive.developDeepRelationshipsDesc')
    });
  }

  if (openness && openness.score >= 7) {
    milestones.push({
      timeframe: 'Luna 4',
      goal: t('progressPath.bigFive.exploreNewTerritories'),
      description: t('progressPath.bigFive.exploreNewTerritoriesDesc')
    });
  }

  // Plan pe termen lung
  milestones.push({
    timeframe: 'Luna 6',
    goal: t('progressPath.bigFive.evaluateProgress'),
    description: t('progressPath.bigFive.evaluateProgressDesc')
  });

  // Metode de urmărire personalizate
  trackingMethods.push(t('progressPath.bigFive.weeklyReflectionJournal'));
  trackingMethods.push(t('progressPath.bigFive.monthlyFeedback'));
  trackingMethods.push(t('progressPath.bigFive.observeStrengths'));
  
  if (conscientiousness && conscientiousness.score <= 4) {
    trackingMethods.push('Folosește aplicații simple de tracking pentru a construi obiceiuri');
  }
  
  if (neuroticism && neuroticism.score >= 6) {
    trackingMethods.push('Monitorizează starea emoțională zilnică pentru a identifica tiparele');
  }

  return {
    milestones,
    trackingMethods,
    retestRecommendation: t('progressPath.bigFive.retestRecommendation')
  };
}

function getCattellProgressPath(score: StandardizedScore): ProgressPath {
  return {
    milestones: [
      {
        timeframe: '2-4 săptămâni',
        goal: 'Analiză detaliată',
        description: 'Studiază fiecare factor și implicațiile sale în viața ta'
      },
      {
        timeframe: '2-3 luni',
        goal: 'Dezvoltarea strategiilor',
        description: 'Creează planuri specifice pentru optimizarea punctelor forte și îmbunătățirea zonelor slabe'
      },
      {
        timeframe: '6-12 luni',
        goal: 'Transformarea comportamentală',
        description: 'Implementează și măsoară schimbările în comportament și performanță'
      }
    ],
    trackingMethods: [
      'Setează obiective specifice pentru fiecare factor relevant',
      'Solicită feedback regulat în mediul profesional și personal',
      'Măsoară progresul prin indicatori comportamentali concreți'
    ],
    retestRecommendation: 'Re-testare recomandată după 18-24 luni pentru evaluarea schimbărilor în profilul de personalitate.'
  };
}

function getEnneagramProgressPath(score: StandardizedScore): ProgressPath {
  const dominantType = score.dominant_profile;
  const milestones: ProgressMilestone[] = [];
  const trackingMethods: string[] = [];
  
  if (!dominantType) {
    return {
      milestones: [
        {
          timeframe: 'Săptămâna 1-2',
          goal: 'Confirmarea tipului',
          description: 'Studiază toate tipurile pentru a-ți confirma tipul dominant'
        },
        {
          timeframe: 'Luna 1',
          goal: 'Înțelegerea de bază',
          description: 'Învață despre motivațiile, temerile și dorințele tipului tău'
        }
      ],
      trackingMethods: [
        'Observă tiparele de comportament în situații diverse',
        'Notează reacțiile emoționale la stress și confort'
      ],
      retestRecommendation: 'Re-testare după înțelegerea aprofundată a sistemului Enneagram (3-6 luni).'
    };
  }
  
  // Milestones generale pentru toate tipurile
  milestones.push({
    timeframe: 'Săptămâna 1-2',
    goal: 'Autocunoaștere profundă',
    description: `Studiază în detaliu caracteristicile Tipului ${dominantType.replace('type', '')} și observă cum se manifestă în viața ta`
  });
  
  milestones.push({
    timeframe: 'Săptămâna 3-4',
    goal: 'Identificarea tiparelor',
    description: 'Recunoaște tiparele automate de gândire, sentiment și comportament specifice tipului tău'
  });
  
  milestones.push({
    timeframe: 'Luna 2',
    goal: 'Înțelegerea dinamicilor',
    description: 'Învață despre căile de integrare (creștere) și dezintegrare (stres) ale tipului tău'
  });
  
  milestones.push({
    timeframe: 'Luna 3-4',
    goal: 'Dezvoltarea conștientizării',
    description: 'Practică observarea și întreruperea tiparelor automate, dezvoltând răspunsuri mai conștiente'
  });
  
  milestones.push({
    timeframe: 'Luna 6',
    goal: 'Integrarea trăsăturilor pozitive',
    description: 'Lucrează activ la dezvoltarea calităților tipului tău de integrare'
  });
  
  milestones.push({
    timeframe: 'An 1',
    goal: 'Transformarea profundă',
    description: 'Demonstrează schimbări consistente în modul în care răspunzi la provocări și relații'
  });
  
  // Metode de tracking
  trackingMethods.push('Ține un jurnal zilnic de observare a tiparelor de personalitate');
  trackingMethods.push('Notează momentele de integrare și dezintegrare');
  trackingMethods.push('Solicită feedback de la persoane apropiiate despre schimbările observate');
  trackingMethods.push('Practică exerciții specifice tipului pentru dezvoltarea conștientizării');
  trackingMethods.push('Măsoară progresul în relații și gestionarea stresului');
  
  // Milestones specifice pe tip
  const typeSpecificMilestones: Record<string, ProgressMilestone[]> = {
    'type1': [
      {
        timeframe: 'Luna 2',
        goal: 'Relaxarea standardelor',
        description: 'Practică acceptarea imperfecțiunii în situații mai puțin importante'
      },
      {
        timeframe: 'Luna 4',
        goal: 'Dezvoltarea spontaneității',
        description: 'Încorporează activități spontane și jucăușe în rutina zilnică'
      }
    ],
    'type2': [
      {
        timeframe: 'Luna 2',
        goal: 'Recunoașterea nevoilor proprii',
        description: 'Dedică timp zilnic pentru identificarea și exprimarea nevoilor personale'
      },
      {
        timeframe: 'Luna 4',
        goal: 'Stabilirea limitelor',
        description: 'Practică spunerea "nu" și stabilirea limitelor sănătoase'
      }
    ],
    'type3': [
      {
        timeframe: 'Luna 2',
        goal: 'Încetinirea ritmului',
        description: 'Programează timp pentru reflexie și procesare emoțională fără obiective'
      },
      {
        timeframe: 'Luna 4',
        goal: 'Conectarea cu valorile autentice',
        description: 'Identifică și urmează obiective bazate pe valori personale, nu pe imagine'
      }
    ],
    'type4': [
      {
        timeframe: 'Luna 2',
        goal: 'Stabilizarea dispoziției',
        description: 'Dezvoltă rutine care să îți susțină echilibrul emoțional'
      },
      {
        timeframe: 'Luna 4',
        goal: 'Focusul pe prezent',
        description: 'Practică aprecierea și angajarea cu ceea ce ai în prezent'
      }
    ],
    'type5': [
      {
        timeframe: 'Luna 2',
        goal: 'Creșterea angajamentului social',
        description: 'Programează și respectă interacțiuni sociale regulate'
      },
      {
        timeframe: 'Luna 4',
        goal: 'Exprimarea cunoștințelor',
        description: 'Găsește modalități de a împărtăși expertiza cu alții'
      }
    ],
    'type6': [
      {
        timeframe: 'Luna 2',
        goal: 'Construirea încrederii interioare',
        description: 'Practică luarea de decizii mici fără consiliere externă'
      },
      {
        timeframe: 'Luna 4',
        goal: 'Gestionarea anxietății',
        description: 'Dezvoltă un sistem personal pentru calmarea gândurilor anxioase'
      }
    ],
    'type7': [
      {
        timeframe: 'Luna 2',
        goal: 'Dezvoltarea focusului',
        description: 'Alege mai puține proiecte și explorează-le în profunzime'
      },
      {
        timeframe: 'Luna 4',
        goal: 'Toleranța pentru discomfort',
        description: 'Practică statul cu emoțiile dificile fără evitare'
      }
    ],
    'type8': [
      {
        timeframe: 'Luna 2',
        goal: 'Dezvoltarea vulnerabilității',
        description: 'Practică exprimarea emoțiilor delicate cu persoane de încredere'
      },
      {
        timeframe: 'Luna 4',
        goal: 'Leadership empatic',
        description: 'Dezvoltă stiluri de leadership care împuternicesc în loc să controleze'
      }
    ],
    'type9': [
      {
        timeframe: 'Luna 2',
        goal: 'Activarea energiei',
        description: 'Stabilește și urmează micii pași către obiectivele personale'
      },
      {
        timeframe: 'Luna 4',
        goal: 'Exprimarea opiniilor',
        description: 'Practică exprimarea dezacordului și a preferințelor personale'
      }
    ]
  };
  
  const specificMilestones = typeSpecificMilestones[dominantType] || [];
  
  // Inserez milestone-urile specifice în poziții relevante
  specificMilestones.forEach((milestone, index) => {
    milestones.splice(2 + index, 0, milestone);
  });
  
  return {
    milestones,
    trackingMethods,
    retestRecommendation: 'Re-testare recomandată după 12-18 luni de lucru activ cu tipul, pentru a observa schimbările în dezvoltarea personalității.'
  };
}

function getDigitalCompetenciesProgressPath(score: StandardizedScore): ProgressPath {
  const overallScore = score.overall || 0;
  const dimensions = score.dimensions || {};
  
  const baseMilestones: ProgressMilestone[] = [
    {
      timeframe: "Săptămâna 1-2",
      goal: "Evaluarea și planificarea",
      description: "Identifică zonele cheie de dezvoltare și stabilește obiective concrete pentru fiecare competență digitală."
    }
  ];

  // Etapa 2-4: Dezvoltare pe baza punctelor slabe
  const developmentMilestones: ProgressMilestone[] = [];
  
  Object.entries(dimensions).forEach(([dimension, score]) => {
    if (typeof score === 'number' && score < 60) {
      switch (dimension) {
        case 'alfabetizare_digitala':
          developmentMilestones.push({
            timeframe: "Săptămâna 3-4",
            goal: "Alfabetizare digitală de bază",
            description: "Îmbunătățește abilitățile de căutare, evaluare și folosire a informațiilor digitale."
          });
          break;
        case 'siguranta_digitala':
          developmentMilestones.push({
            timeframe: "Săptămâna 5-6",
            goal: "Securitate digitală",
            description: "Învață principiile de securitate online și implementează practici sigure de navigare."
          });
          break;
        case 'comunicare_digitala':
          developmentMilestones.push({
            timeframe: "Săptămâna 7-8",
            goal: "Comunicare digitală eficientă",
            description: "Dezvoltă abilitățile de comunicare profesională în mediul digital."
          });
          break;
        case 'creare_continut':
          developmentMilestones.push({
            timeframe: "Săptămâna 9-10",
            goal: "Crearea de conținut digital",
            description: "Învață să creezi și să editezi conținut digital pentru diverse platforme."
          });
          break;
        case 'rezolvare_probleme':
          developmentMilestones.push({
            timeframe: "Săptămâna 11-12",
            goal: "Rezolvarea problemelor digitale",
            description: "Dezvoltă abilitățile de troubleshooting și găsirea de soluții pentru probleme tehnice."
          });
          break;
      }
    }
  });

  // Etapa finală
  const finalMilestones: ProgressMilestone[] = [
    {
      timeframe: "Luna 4",
      goal: "Integrarea și aplicarea",
      description: "Aplică toate competențele învățate în contexte reale și dezvoltă rutine digitale eficiente."
    },
    {
      timeframe: "Luna 5-6",
      goal: "Optimizarea și automatizarea",
      description: "Optimizează procesele digitale și automatizează taskurile repetitive pentru eficiență maximă."
    }
  ];

  const allMilestones = [...baseMilestones, ...developmentMilestones, ...finalMilestones];

  return {
    milestones: allMilestones,
    trackingMethods: [
      "Auto-evaluare săptămânală a progresului pe fiecare dimensiune",
      "Teste practice cu instrumente și platforme noi",
      "Feedback de la colegi privind eficiența digitală",
      "Urmărirea timpului economisit prin optimizări"
    ],
    retestRecommendation: "Retestează-te după 3-4 luni pentru a evalua progresul în dezvoltarea competențelor digitale și pentru a identifica noi zone de îmbunătățire."
  };
}