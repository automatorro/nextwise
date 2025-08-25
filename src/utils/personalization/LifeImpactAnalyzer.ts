import { StandardizedScore } from '@/types/tests';

export interface LifeAreaImpact {
  area: string;
  impact: string;
  examples?: string[];
}

export interface LifeImpactData {
  areas: LifeAreaImpact[];
  overallImpact?: string;
}

export function getLifeImpactExplanation(
  testName: string, 
  score: StandardizedScore
): LifeImpactData | null {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('gad') || testKey.includes('anxietate')) {
    return getGADLifeImpact(score);
  }
  
  if (testKey.includes('phq') || testKey.includes('depresie')) {
    return getPHQLifeImpact(score);
  }
  
  if (testKey.includes('big five') || testKey.includes('personality')) {
    return getBigFiveLifeImpact(score);
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
          area: 'Muncă/Studii',
          impact: 'Funcționare optimă, concentrare bună și productivitate normală.',
          examples: ['Poți finaliza sarcinile la timp', 'Te simți confortabil în prezentări', 'Gestionezi bine deadline-urile']
        },
        {
          area: 'Relații',
          impact: 'Interacțiuni sociale naturale și confortabile.',
          examples: ['Comunici deschis cu prietenii', 'Te simți relaxat în grupuri', 'Poți rezolva conflictele constructiv']
        },
        {
          area: 'Sănătate fizică',
          impact: 'Somn odihnitor și energie stabilă pe parcursul zilei.',
          examples: ['Adormi ușor', 'Te trezești odihnit', 'Nu ai tensiuni musculare excesive']
        },
        {
          area: 'Activități zilnice',
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
          area: 'Muncă/Studii',
          impact: 'Poate apărea preocuparea excesivă pentru unele sarcini, dar nu afectează major performanța.',
          examples: ['Îți faci griji înainte de prezentări importante', 'Uneori amâni sarcinile dificile', 'Poți avea dificultăți cu concentrarea în perioade stresante']
        },
        {
          area: 'Relații',
          impact: 'Ocazional poți evita situațiile sociale noi sau provocatoare.',
          examples: ['Preferi grupurile mici față de cele mari', 'Uneori îți faci griji despre părerea altora', 'Poți fi mai rezervat în situații noi']
        },
        {
          area: 'Sănătate fizică',
          impact: 'Simptome fizice ușoare care apar sporadic în situații stresante.',
          examples: ['Tensiune musculară ocazională', 'Somn ușor afectat în perioade stresante', 'Palpitații rare în situații anxioase']
        },
        {
          area: 'Activități zilnice',
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
          area: 'Muncă/Studii',
          impact: 'Preocupările persistente pot afecta concentrarea și performanța la locul de muncă sau în studii.',
          examples: ['Dificultăți de concentrare în timpul sarcinilor', 'Procrastinare frecventă', 'Performanță scăzută în situații de presiune', 'Evitarea responsabilităților noi']
        },
        {
          area: 'Relații',
          impact: 'Anxietatea poate afecta calitatea și frecvența interacțiunilor sociale.',
          examples: ['Evitarea evenimentelor sociale', 'Dificultăți în exprimarea nevoilor', 'Tensiuni în relațiile apropiate', 'Izolare socială parțială']
        },
        {
          area: 'Sănătate fizică',
          impact: 'Simptome fizice mai frecvente care pot afecta bunăstarea generală.',
          examples: ['Tulburări de somn regulate', 'Tensiune musculară cronică', 'Probleme digestive', 'Oboseală frecventă']
        },
        {
          area: 'Activități zilnice',
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
          area: 'Muncă/Studii',
          impact: 'Anxietatea severă interferează major cu capacitatea de a funcționa eficient la locul de muncă sau în studii.',
          examples: ['Absenteeism frecvent', 'Performanță semnificativ scăzută', 'Incapacitatea de a finaliza sarcini', 'Evitarea completă a anumitor responsabilități']
        },
        {
          area: 'Relații',
          impact: 'Relațiile sunt sever afectate, cu izolare socială semnificativă.',
          examples: ['Evitarea contact social', 'Conflicte frecvente cu cei apropiați', 'Dificultăți severe de comunicare', 'Pierderea relațiilor importante']
        },
        {
          area: 'Sănătate fizică',
          impact: 'Simptome fizice intense și persistente care afectează semnificativ calitatea vieții.',
          examples: ['Insomnie cronică', 'Atacuri de panică', 'Probleme digestive severe', 'Dureri de cap frecvente', 'Oboseală extremă']
        },
        {
          area: 'Activități zilnice',
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
          area: 'Dispoziție',
          impact: 'Stare emoțională stabilă și pozitivă, cu capacitatea de a te bucura de activități.',
          examples: ['Te simți în general optimist', 'Găsești plăcere în activitățile obișnuite', 'Ai energie pentru proiecte noi']
        },
        {
          area: 'Muncă/Studii',
          impact: 'Motivație și concentrare optime pentru activitățile profesionale sau academice.',
          examples: ['Îți îndeplinești sarcinile cu plăcere', 'Ai inițiativă pentru proiecte noi', 'Te concentrezi ușor pe activități']
        },
        {
          area: 'Relații',
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
          area: 'Dispoziție',
          impact: 'Perioade ocazionale de tristețe sau lipsa energiei, dar în general stare stabilă.',
          examples: ['Zile când te simți mai obosit', 'Scăderi temporare ale entuziasmului', 'Momente de melancolie']
        },
        {
          area: 'Muncă/Studii',
          impact: 'Performanța rămâne bună, cu fluctuații minore ale motivației.',
          examples: ['Uneori îți este greu să te motivezi', 'Poți amâna câteva sarcini', 'Concentrarea variază ușor']
        },
        {
          area: 'Activități sociale',
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
          area: 'Dispoziție',
          impact: 'Tristețe persistentă și scăderea semnificativă a plăcerii în activități.',
          examples: ['Sentimente de tristețe majoritatea zilelor', 'Pierderea interesului pentru hobby-uri', 'Dificultăți în a găsi bucurie']
        },
        {
          area: 'Muncă/Studii',
          impact: 'Performanța scăzută din cauza concentrării reduse și lipsei de motivație.',
          examples: ['Dificultăți de concentrare', 'Procrastinare frecventă', 'Scăderea productivității']
        },
        {
          area: 'Relații',
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
          area: 'Dispoziție',
          impact: 'Tristețe profundă, disperare și pierderea completă a plăcerii în activități.',
          examples: ['Sentimente intense de tristețe', 'Disperare și lipsă de speranță', 'Incapacitatea de a simți bucurie']
        },
        {
          area: 'Funcționare zilnică',
          impact: 'Dificultăți severe în îndeplinirea sarcinilor de bază și auto-îngrijirea.',
          examples: ['Probleme cu igiena personală', 'Dificultăți în prepararea meselor', 'Probleme cu somnul și alimentația']
        },
        {
          area: 'Siguranța personală',
          impact: 'Risc crescut pentru gânduri de auto-vătămare sau sinucidere.',
          examples: ['Gânduri despre moarte', 'Sentimente de nevalorare extremă', 'Gânduri de auto-vătămare']
        }
      ],
      overallImpact: 'Simptomele severe necesită intervenție profesională imediată pentru siguranța și recuperarea persoanei.'
    };
  }
}

function getBigFiveLifeImpact(score: StandardizedScore): LifeImpactData {
  return {
    areas: [
      {
        area: 'Carieră și dezvoltare profesională',
        impact: 'Profilul tău de personalitate influențează preferințele profesionale și stilul de lucru.',
        examples: ['Tipurile de proiecte care te motivează', 'Modul în care colaborezi cu colegii', 'Preferințele pentru leadership sau lucrul în echipă']
      },
      {
        area: 'Relații interpersonale',
        impact: 'Trăsăturile de personalitate modelează modul în care formezi și menții relațiile.',
        examples: ['Stilul tău de comunicare', 'Gradul de sociabilitate', 'Modul de gestionare a conflictelor']
      },
      {
        area: 'Dezvoltare personală',
        impact: 'Cunoașterea profilului te ajută să identifici zonele de dezvoltare și punctele forte.',
        examples: ['Identificarea talentelor naturale', 'Zonele care necesită dezvoltare', 'Strategii de self-improvement']
      }
    ],
    overallImpact: 'Personalitatea ta influențează modul în care experimentezi și interacționezi cu lumea din jurul tău.'
  };
}

function getCattellLifeImpact(score: StandardizedScore): LifeImpactData {
  return {
    areas: [
      {
        area: 'Stil de leadership',
        impact: 'Factorii de personalitate determină stilul tău natural de leadership și luare a deciziilor.',
        examples: ['Preferința pentru decizie colaborativă vs independentă', 'Modul de motivare a celorlalți', 'Gestionarea presiunii și stresului']
      },
      {
        area: 'Adaptabilitate',
        impact: 'Profilul 16PF arată cum te adaptezi la schimbări și situații noi.',
        examples: ['Flexibilitatea în față schimbărilor', 'Gestionarea incertitudinii', 'Răspunsul la provocări neașteptate']
      },
      {
        area: 'Comunicare și relații',
        impact: 'Factorii de personalitate influențează stilul de comunicare și preferințele sociale.',
        examples: ['Preferința pentru comunicare directă vs diplomatică', 'Gradul de extraversion social', 'Modul de exprimare a emoțiilor']
      }
    ],
    overallImpact: 'Profilul Cattell oferă o perspectivă detaliată asupra modului în care personalitatea ta se manifestă în toate aspectele vieții.'
  };
}