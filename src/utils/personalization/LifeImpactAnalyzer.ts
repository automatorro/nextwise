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

export interface LifeAreaImpact {
  name: string;
  impact: string;
  examples?: string[];
}

export interface LifeImpactData {
  areas: LifeAreaImpact[];
  overallImpact?: string;
}

export async function getLifeImpactExplanation(
  testName: string, 
  score: StandardizedScore
): Promise<LifeImpactData | null> {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('gad') || testKey.includes('anxietate')) {
    return getGADLifeImpact(score);
  }
  
  if (testKey.includes('phq') || testKey.includes('depresie')) {
    return getPHQLifeImpact(score);
  }
  
  if (testKey.includes('big five') || testKey.includes('personality')) {
    return await getBigFiveLifeImpact(score);
  }
  
  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    return getCattellLifeImpact(score);
  }
  
  return null;
}

function getGADLifeImpact(score: StandardizedScore): LifeImpactData {
  const rawScore = score.raw_score || 0;
  
  if (rawScore <= 4) {
    return {
      areas: [
        {
          name: 'Muncă/Studii',
          impact: 'Funcționare optimă, concentrare bună și productivitate normală.',
          examples: ['Poți finaliza sarcinile la timp', 'Te simți confortabil în prezentări', 'Gestionezi bine deadline-urile']
        },
        {
          name: 'Relații',
          impact: 'Interacțiuni sociale naturale și confortabile.',
          examples: ['Comunici deschis cu prietenii', 'Te simți relaxat în grupuri', 'Poți rezolva conflictele constructiv']
        },
        {
          name: 'Sănătate fizică',
          impact: 'Somn odihnitor și energie stabilă pe parcursul zilei.',
          examples: ['Adormi ușor', 'Te trezești odihnit', 'Nu ai tensiuni musculare excesive']
        },
        {
          name: 'Activități zilnice',
          impact: 'Poți să te bucuri de activități și să îți urmezi rutina normală.',
          examples: ['Îți place să ieși cu prietenii', 'Găsești timp pentru hobby-uri', 'Gestionezi responsabilitățile casei']
        }
      ],
      overallImpact: 'Anxietatea minimă nu interferează cu funcționarea ta zilnică și îți permite să trăiești o viață echilibrată.'
    };
  } else if (rawScore <= 9) {
    return {
      areas: [
        {
          name: 'Muncă/Studii',
          impact: 'Poate apărea preocuparea excesivă pentru unele sarcini, dar nu afectează major performanța.',
          examples: ['Îți faci griji înainte de prezentări importante', 'Uneori amâni sarcinile dificile', 'Poți avea dificultăți cu concentrarea în perioade stresante']
        },
        {
          name: 'Relații',
          impact: 'Ocazional poți evita situațiile sociale noi sau provocatoare.',
          examples: ['Preferi grupurile mici față de cele mari', 'Uneori îți faci griji despre părerea altora', 'Poți fi mai rezervat în situații noi']
        },
        {
          name: 'Sănătate fizică',
          impact: 'Simptome fizice ușoare care apar sporadic în situații stresante.',
          examples: ['Tensiune musculară ocazională', 'Somn ușor afectat în perioade stresante', 'Palpitații rare în situații anxioase']
        },
        {
          name: 'Activități zilnice',
          impact: 'Majoritatea activităților rămân neschimbate, cu evitări ocazionale.',
          examples: ['Poți amâna uneori activități noi', 'Preferi rutina cunoscută', 'Îți planifici mai mult activitățile importante']
        }
      ],
      overallImpact: 'Anxietatea ușoară poate crea discomfort ocazional, dar nu limitează semnificativ funcționarea ta în viața de zi cu zi.'
    };
  } else if (rawScore <= 14) {
    return {
      areas: [
        {
          name: 'Muncă/Studii',
          impact: 'Preocupările persistente pot afecta concentrarea și performanța la locul de muncă sau în studii.',
          examples: ['Dificultăți de concentrare în timpul sarcinilor', 'Procrastinare frecventă', 'Performanță scăzută în situații de presiune', 'Evitarea responsabilităților noi']
        },
        {
          name: 'Relații',
          impact: 'Anxietatea poate afecta calitatea și frecvența interacțiunilor sociale.',
          examples: ['Evitarea evenimentelor sociale', 'Dificultăți în exprimarea nevoilor', 'Tensiuni în relațiile apropiate', 'Izolare socială parțială']
        },
        {
          name: 'Sănătate fizică',
          impact: 'Simptome fizice mai frecvente care pot afecta bunăstarea generală.',
          examples: ['Tulburări de somn regulate', 'Tensiune musculară cronică', 'Probleme digestive', 'Oboseală frecventă']
        },
        {
          name: 'Activități zilnice',
          impact: 'Limitarea sau evitarea unor activități din cauza anxietății.',
          examples: ['Amânarea deciziilor importante', 'Evitarea situațiilor noi', 'Dificultăți în gestionarea sarcinilor casnice', 'Reducerea activităților plăcute']
        }
      ],
      overallImpact: 'Anxietatea moderată începe să interfereze notabil cu funcționarea zilnică și poate afecta calitatea vieții în mai multe domenii.'
    };
  } else {
    return {
      areas: [
        {
          name: 'Muncă/Studii',
          impact: 'Anxietatea severă interferează major cu capacitatea de a funcționa eficient la locul de muncă sau în studii.',
          examples: ['Absenteeism frecvent', 'Performanță semnificativ scăzută', 'Incapacitatea de a finaliza sarcini', 'Evitarea completă a anumitor responsabilități']
        },
        {
          name: 'Relații',
          impact: 'Relațiile sunt sever afectate, cu izolare socială semnificativă.',
          examples: ['Evitarea contact social', 'Conflicte frecvente cu cei apropiați', 'Dificultăți severe de comunicare', 'Pierderea relațiilor importante']
        },
        {
          name: 'Sănătate fizică',
          impact: 'Simptome fizice intense și persistente care afectează semnificativ calitatea vieții.',
          examples: ['Insomnie cronică', 'Atacuri de panică', 'Probleme digestive severe', 'Dureri de cap frecvente', 'Oboseală extremă']
        },
        {
          name: 'Activități zilnice',
          impact: 'Limitare severă a activităților zilnice și dificultăți majore în auto-îngrijire.',
          examples: ['Dificultăți în ieșirea din casă', 'Probleme cu auto-îngrijirea', 'Incapacitatea de a gestiona responsabilități de bază', 'Evitarea majorității activităților']
        }
      ],
      overallImpact: 'Anxietatea severă are un impact devastator asupra tuturor aspectelor vieții și necesită intervenție profesională imediată pentru a preveni deteriorarea ulterioară.'
    };
  }
}

function getPHQLifeImpact(score: StandardizedScore): LifeImpactData {
  const rawScore = score.raw_score || 0;
  
  if (rawScore <= 4) {
    return {
      areas: [
        {
          name: 'Dispoziție',
          impact: 'Stare emoțională stabilă și pozitivă, cu capacitatea de a te bucura de activități.',
          examples: ['Te simți în general optimist', 'Găsești plăcere în activitățile obișnuite', 'Ai energie pentru proiecte noi']
        },
        {
          name: 'Muncă/Studii',
          impact: 'Motivație și concentrare optime pentru activitățile profesionale sau academice.',
          examples: ['Îți îndeplinești sarcinile cu plăcere', 'Ai inițiativă pentru proiecte noi', 'Te concentrezi ușor pe activități']
        },
        {
          name: 'Relații',
          impact: 'Angajament social sănătos și capacitatea de a menține relații apropiate.',
          examples: ['Îți place să petreci timp cu prietenii', 'Ești prezent emoțional pentru cei apropiați', 'Comunici deschis și pozitiv']
        }
      ],
      overallImpact: 'Starea ta emoțională susține o funcționare optimă în toate aspectele vieții.'
    };
  } else if (rawScore <= 9) {
    return {
      areas: [
        {
          name: 'Dispoziție',
          impact: 'Perioade ocazionale de tristețe sau lipsa energiei, dar în general stare stabilă.',
          examples: ['Zile când te simți mai obosit', 'Scăderi temporare ale entuziasmului', 'Momente de melancolie']
        },
        {
          name: 'Muncă/Studii',
          impact: 'Performanța rămâne bună, cu fluctuații minore ale motivației.',
          examples: ['Uneori îți este greu să te motivezi', 'Poți amâna câteva sarcini', 'Concentrarea variază ușor']
        },
        {
          name: 'Activități sociale',
          impact: 'Participi la majoritatea activităților, cu retrageri ocazionale.',
          examples: ['Uneori preferi să stai acasă', 'Scăderea ușoară a energiei sociale', 'Păstrezi relațiile importante']
        }
      ],
      overallImpact: 'Simptomele ușoare nu afectează major funcționarea, dar este util să fii atent la ele.'
    };
  } else if (rawScore <= 14) {
    return {
      areas: [
        {
          name: 'Dispoziție',
          impact: 'Tristețe persistentă și scăderea semnificativă a plăcerii în activități.',
          examples: ['Sentimente de tristețe majoritatea zilelor', 'Pierderea interesului pentru hobby-uri', 'Dificultăți în a găsi bucurie']
        },
        {
          name: 'Muncă/Studii',
          impact: 'Performanța scăzută din cauza concentrării reduse și lipsei de motivație.',
          examples: ['Dificultăți de concentrare', 'Procrastinare frecventă', 'Scăderea productivității']
        },
        {
          name: 'Relații',
          impact: 'Retragerea din relații și dificultăți în menținerea conexiunilor sociale.',
          examples: ['Evitarea prietenilor', 'Comunicare redusă', 'Izolare socială parțială']
        }
      ],
      overallImpact: 'Simptomele moderate afectează notabil mai multe aspecte ale vieții și necesită atenție specializată.'
    };
  } else {
    return {
      areas: [
        {
          name: 'Dispoziție',
          impact: 'Tristețe profundă, disperare și pierderea completă a plăcerii în activități.',
          examples: ['Sentimente intense de tristețe', 'Disperare și lipsă de speranță', 'Incapacitatea de a simți bucurie']
        },
        {
          name: 'Funcționare zilnică',
          impact: 'Dificultăți severe în îndeplinirea sarcinilor de bază și auto-îngrijirea.',
          examples: ['Probleme cu igiena personală', 'Dificultăți în prepararea meselor', 'Probleme cu somnul și alimentația']
        },
        {
          name: 'Siguranța personală',
          impact: 'Risc crescut pentru gânduri de auto-vătămare sau sinucidere.',
          examples: ['Gânduri despre moarte', 'Sentimente de nevalorare extremă', 'Gânduri de auto-vătămare']
        }
      ],
      overallImpact: 'Simptomele severe necesită intervenție profesională imediată pentru siguranța și recuperarea persoanei.'
    };
  }
}

async function getBigFiveLifeImpact(score: StandardizedScore): Promise<LifeImpactData> {
  const translations = await getTranslations();
  const t = (key: string) => translateKey(translations, key);
  const areas: LifeAreaImpact[] = [];
  
  if (!score.dimensions) {
    return {
      areas: [
        {
          name: t('lifeImpact.bigFive.career'),
          impact: 'Trăsăturile tale de personalitate influențează stilul de lucru și preferințele profesionale.',
          examples: ['Alegerea tipului de rol potrivit', 'Stilul de colaborare în echipă']
        }
      ]
    };
  }

  // Impact specific bazat pe dimensiuni
  const openness = score.dimensions.find(d => d.id === 'openness');
  const conscientiousness = score.dimensions.find(d => d.id === 'conscientiousness');
  const extraversion = score.dimensions.find(d => d.id === 'extraversion');
  const agreeableness = score.dimensions.find(d => d.id === 'agreeableness');
  const neuroticism = score.dimensions.find(d => d.id === 'neuroticism');

  // Carieră & Profesie
  let careerImpact = 'Profilul tău de personalitate influențează ';
  let careerExamples: string[] = [];
  
  if (conscientiousness && conscientiousness.score >= 7) {
    careerImpact += 'tendința ta către organizare și disciplină, făcându-te potrivit pentru roluri de responsabilitate. ';
    careerExamples.push('Leadership și management de proiecte', 'Roluri care necesită atenție la detalii');
  } else if (conscientiousness && conscientiousness.score <= 4) {
    careerImpact += 'stilul tău flexibil de lucru, făcându-te potrivit pentru medii creative și adaptabile. ';
    careerExamples.push('Roluri creative și inovatoare', 'Proiecte cu cerințe schimbătoare');
  }

  if (extraversion && extraversion.score >= 7) {
    careerExamples.push('Roluri cu interacțiune constantă cu oamenii', 'Prezentări și vânzări');
  } else if (extraversion && extraversion.score <= 4) {
    careerExamples.push('Lucru independent și analitic', 'Roluri tehnice specializate');
  }

  areas.push({
    name: t('lifeImpact.bigFive.career'),
    impact: careerImpact,
    examples: careerExamples
  });

  // Relații Interpersonale
  let relationshipImpact = '';
  let relationshipExamples: string[] = [];

  if (agreeableness && agreeableness.score >= 7) {
    relationshipImpact = 'Tendința ta către cooperare și empatie facilitează relații armonioase și de sprijin mutual. ';
    relationshipExamples.push('Relații bazate pe încredere și susținere', 'Capacitate de mediere în conflicte');
  } else if (agreeableness && agreeableness.score <= 4) {
    relationshipImpact = 'Stilul tău direct și competitiv poate fi avantajos în negocieri și situații care necesită fermitate. ';
    relationshipExamples.push('Relații bazate pe respect mutual', 'Abilitatea de a lua decizii dificile');
  }

  if (extraversion && extraversion.score >= 7) {
    relationshipExamples.push('Rețele sociale largi și diverse', 'Energie în grupuri mari');
  } else if (extraversion && extraversion.score <= 4) {
    relationshipExamples.push('Relații profunde și intime', 'Preferință pentru conversații 1-la-1');
  }

  areas.push({
    name: t('lifeImpact.bigFive.relationships'),
    impact: relationshipImpact,
    examples: relationshipExamples
  });

  // Gestionarea Stresului
  let stressImpact = '';
  let stressExamples: string[] = [];

  if (neuroticism && neuroticism.score >= 7) {
    stressImpact = 'Sensibilitatea ta emoțională înseamnă că reacționezi intens la stres, dar și că ești foarte empatic. ';
    stressExamples.push('Nevoie de strategii active de gestionare a stresului', 'Capacitate mare de empatie și înțelegere');
  } else if (neuroticism && neuroticism.score <= 4) {
    stressImpact = 'Stabilitatea ta emoțională te ajută să rămâi calm în situații dificile și să gestionezi bine presiunea. ';
    stressExamples.push('Capacitate de a lucra sub presiune', 'Rol de stabilizator în echipe');
  }

  areas.push({
    name: t('lifeImpact.bigFive.stress'),
    impact: stressImpact,
    examples: stressExamples
  });

  // Dezvoltare & Învățare
  let learningImpact = '';
  let learningExamples: string[] = [];

  if (openness && openness.score >= 7) {
    learningImpact = 'Deschiderea ta către experiențe noi înseamnă că înveți rapid și te adaptezi ușor la schimbări. ';
    learningExamples.push('Învățare rapidă în domenii diverse', 'Adaptabilitate la tehnologii noi');
  } else if (openness && openness.score <= 4) {
    learningImpact = 'Preferința ta pentru metode dovedite înseamnă că dezvolți expertiza profundă în domeniile de interes. ';
    learningExamples.push('Specializare în profunzime', 'Aplicarea metodelor testate și sigure');
  }

  areas.push({
    name: t('lifeImpact.bigFive.learning'),
    impact: learningImpact,
    examples: learningExamples
  });

  return {
    areas,
    overallImpact: t('lifeImpact.bigFive.overallImpact')
  };
}

function getCattellLifeImpact(score: StandardizedScore): LifeImpactData {
  return {
    areas: [
      {
        name: 'Stil de leadership',
        impact: 'Factorii de personalitate determină stilul tău natural de leadership și luare a deciziilor.',
        examples: ['Preferința pentru decizie colaborativă vs independentă', 'Modul de motivare a celorlalți', 'Gestionarea presiunii și stresului']
      },
      {
        name: 'Adaptabilitate',
        impact: 'Profilul 16PF arată cum te adaptezi la schimbări și situații noi.',
        examples: ['Flexibilitatea în față schimbărilor', 'Gestionarea incertitudinii', 'Răspunsul la provocări neașteptate']
      },
      {
        name: 'Comunicare și relații',
        impact: 'Factorii de personalitate influențează stilul de comunicare și preferințele sociale.',
        examples: ['Preferința pentru comunicare directă vs diplomatică', 'Gradul de extraversion social', 'Modul de exprimare a emoțiilor']
      }
    ],
    overallImpact: 'Profilul Cattell oferă o perspectivă detaliată asupra modului în care personalitatea ta se manifestă în toate aspectele vieții.'
  };
}