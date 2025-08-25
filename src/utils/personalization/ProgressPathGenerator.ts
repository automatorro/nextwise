import { StandardizedScore } from '@/types/tests';

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

export function getProgressPath(
  testName: string, 
  score: StandardizedScore
): ProgressPath | null {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('gad') || testKey.includes('anxietate')) {
    return getGADProgressPath(score);
  }
  
  if (testKey.includes('phq') || testKey.includes('depresie')) {
    return getPHQProgressPath(score);
  }
  
  if (testKey.includes('big five') || testKey.includes('personality')) {
    return getBigFiveProgressPath(score);
  }
  
  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    return getCattellProgressPath(score);
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

function getBigFiveProgressPath(score: StandardizedScore): ProgressPath {
  const milestones: ProgressMilestone[] = [];
  const trackingMethods: string[] = [];
  
  if (!score.dimensions) {
    return {
      milestones: [
        {
          timeframe: 'Săptămâna 1-2',
          goal: 'Analizează rezultatele',
          description: 'Reflectează asupra fiecărei dimensiuni și cum se manifestă în viața ta zilnică.'
        }
      ],
      retestRecommendation: 'Re-testează după 6-12 luni pentru a observa dezvoltarea personală.'
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
    goal: 'Înțelege-ți profilul complet',
    description: 'Analizează fiecare dimensiune Big Five și identifică cum se manifestă în comportamentul tău zilnic.'
  });

  // Milestones personalizate bazate pe scoruri
  const strongDimensions = score.dimensions.filter(d => d.score >= 7);
  const weakDimensions = score.dimensions.filter(d => d.score <= 4);

  if (strongDimensions.length > 0) {
    milestones.push({
      timeframe: 'Săptămâna 3-4',
      goal: 'Valorifică punctele forte',
      description: `Concentrează-te pe cum poți folosi mai eficient următoarele puncte forte: ${strongDimensions.map(d => d.name).join(', ')}.`
    });
  }

  if (weakDimensions.length > 0) {
    milestones.push({
      timeframe: 'Luna 2',
      goal: 'Dezvoltă zonele de echilibru',
      description: `Explorează strategii pentru a aduce mai mult echilibru la: ${weakDimensions.map(d => d.name).join(', ')}.`
    });
  }

  // Milestones specifice pentru dimensiuni cheie
  if (conscientiousness && conscientiousness.score <= 4) {
    milestones.push({
      timeframe: 'Luna 2-3',
      goal: 'Construiește sisteme simple de organizare',
      description: 'Implementează 1-2 sisteme simple de organizare care să te restricționeze.'
    });
  }

  if (extraversion && extraversion.score >= 7) {
    milestones.push({
      timeframe: 'Luna 3',
      goal: 'Extinde-ți rețeaua socială',
      description: 'Participă la evenimente noi și construiește conexiuni în domenii de interes.'
    });
  } else if (extraversion && extraversion.score <= 4) {
    milestones.push({
      timeframe: 'Luna 3',
      goal: 'Dezvoltă relații profunde',
      description: 'Investește timp de calitate în 2-3 relații importante pentru tine.'
    });
  }

  if (openness && openness.score >= 7) {
    milestones.push({
      timeframe: 'Luna 4',
      goal: 'Explorează teritorii noi',
      description: 'Încearcă 2-3 activități sau hobby-uri complet noi pentru tine.'
    });
  }

  // Plan pe termen lung
  milestones.push({
    timeframe: 'Luna 6',
    goal: 'Evaluează progresul',
    description: 'Analizează cum au evoluat comportamentele și atitudinile tale în ultimele luni.'
  });

  // Metode de urmărire personalizate
  trackingMethods.push('Ține un jurnal săptămânal de reflecție asupra personalității');
  trackingMethods.push('Solicită feedback lunar de la 2-3 persoane apropiate');
  trackingMethods.push('Observă și notează momentele când îți folosești punctele forte');
  
  if (conscientiousness && conscientiousness.score <= 4) {
    trackingMethods.push('Folosește aplicații simple de tracking pentru a construi obiceiuri');
  }
  
  if (neuroticism && neuroticism.score >= 6) {
    trackingMethods.push('Monitorizează starea emoțională zilnică pentru a identifica tiparele');
  }

  return {
    milestones,
    trackingMethods,
    retestRecommendation: 'Re-testează după 8-12 luni pentru a vedea evoluția personalității tale și eficacitatea strategiilor implementate.'
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