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
  
  if (testKey.includes('phq') || testKey.includes('depresie') || testKey.includes('beck') || testKey.includes('bdi')) {
    return getPHQLifeImpact(score);
  }
  
  if (testKey.includes('big five') || testKey.includes('personality')) {
    return await getBigFiveLifeImpact(score);
  }
  
  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    return getCattellLifeImpact(score);
  }
  
  if (testKey.includes('enneagram')) {
    return getEnneagramLifeImpact(score);
  }
  
  if (testKey.includes('digital') || testKey.includes('competente')) {
    return getDigitalCompetenciesLifeImpact(score);
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

function getEnneagramLifeImpact(score: StandardizedScore): LifeImpactData {
  const dominantType = score.dominant_profile;
  const areas: LifeAreaImpact[] = [];
  
  if (!dominantType) {
    return {
      areas: [
        {
          name: 'Autocunoaștere',
          impact: 'Tipul tău Enneagram influențează fundamental modul în care percepi și interacționezi cu lumea.',
          examples: ['Motivațiile subconștiente', 'Tiparele de răspuns la stres', 'Modurile de relaționare cu alții']
        }
      ],
      overallImpact: 'Enneagram-ul oferă o hartă profundă a personalității interne și a motivațiilor comportamentale.'
    };
  }
  
  // Impact specific bazat pe tipul Enneagram
  const typeImpacts: Record<string, LifeAreaImpact[]> = {
    'type1': [
      {
        name: 'Muncă și performanță',
        impact: 'Perfecționismul tău îți influențează standardele și abordarea față de muncă.',
        examples: ['Standarde înalte pentru sine și alții', 'Atenție extremă la detalii', 'Dificultate în a finaliza proiecte care nu sunt "perfecte"', 'Frustare cu incompetența altora']
      },
      {
        name: 'Relații interpersonale',
        impact: 'Tendința de a corecta și îmbunătăți poate afecta relațiile.',
        examples: ['Critica constructivă care poate fi percepută ca critică', 'Dificultate în a accepta diferențele', 'Aprecierea pentru ordine și predictibilitate în relații']
      },
      {
        name: 'Stres și relaxare',
        impact: 'Vocea critică interioară poate crea tensiune constantă.',
        examples: ['Dificultate în a te relaxa complet', 'Autocritică severă', 'Tensiune fizică din cauza tensiunii mentale']
      }
    ],
    'type2': [
      {
        name: 'Relații și conexiuni',
        impact: 'Focusul pe nevoile altora poate submina propriile nevoi.',
        examples: ['Tendința de a fi disponibil pentru toată lumea', 'Dificultate în a spune "nu"', 'Epuizare din cauza dedicării excesive', 'Relații unde dai mai mult decât primești']
      },
      {
        name: 'Identitate și auto-valoare',
        impact: 'Valoarea de sine depinde de cât de mult ești necesar altora.',
        examples: ['Sentiment de gol când nu ajuți pe nimeni', 'Dificultate în a-ți recunoaște propriile realizări', 'Sentiments de resentiment când ajutorul nu este apreciat']
      },
      {
        name: 'Carieră și realizări',
        impact: 'Tendința de a prioritiza nevoile altora poate afecta dezvoltarea profesională.',
        examples: ['Alegerea unor carriere de servire', 'Dificultate în autopromotion', 'Subminia propriilor obiective pentru a ajuta colegii']
      }
    ],
    'type3': [
      {
        name: 'Succesul și imaginea',
        impact: 'Focusul pe realizări poate masca identitatea autentică.',
        examples: ['Adaptarea personalității pentru a impresiona', 'Măsurarea valorii de sine prin realizări', 'Evitarea eșecurilor la orice cost', 'Competitivitate constantă']
      },
      {
        name: 'Relații și intimitate',
        impact: 'Menținerea unei imagini de succes poate limita vulnerabilitatea.',
        examples: ['Dificultate în a arăta slăbiciuni partenerului', 'Relații superficiale bazate pe impresii', 'Prioritizarea carierei în fața relațiilor']
      },
      {
        name: 'Echilibru și autenticitate',
        impact: 'Ritmul accelerat poate preveni introspectia și dezvoltarea emoțională.',
        examples: ['Evitarea momentelor de liniște și reflexie', 'Pierderea contactului cu propriile sentimente', 'Burnout din cauza activității constante']
      }
    ],
    'type4': [
      {
        name: 'Starea emoțională',
        impact: 'Intensitatea emoțională poate crea fluctuații majore în dispoziție.',
        examples: ['Perioade de tristețe profundă sau extaz', 'Sentimente de alienare și singurătate', 'Nostalgia și idealizarea trecutului sau viitorului', 'Căutarea constantă a ceea ce lipsește']
      },
      {
        name: 'Creativitate și exprimare',
        impact: 'Nevoia de unicitate influențează alegerile creative și profesionale.',
        examples: ['Atragerea către arte și exprimare creativă', 'Rezistența la conformare și rutină', 'Căutarea originalității în toate domeniile']
      },
      {
        name: 'Relații și identitate',
        impact: 'Căutarea identității autentice poate complica relațiile.',
        examples: ['Teste constante ale loialității prietenilor', 'Atragerea către persoane indisponibile', 'Dificultate în a menține relații stabile']
      }
    ],
    'type5': [
      {
        name: 'Energie și resurse',
        impact: 'Managementul energiei influențează toate aspectele vieții.',
        examples: ['Nevoia de timp în singurate pentru reîncărcare', 'Protejarea resurselor emoționale și fizice', 'Evitarea situațiilor epuizante energetic', 'Planificarea atentă a interacțiunilor sociale']
      },
      {
        name: 'Cunoaștere și competență',
        impact: 'Focusul pe competență poate crea presiune pentru expertiză.',
        examples: ['Dorința de a fi expert înainte de a acționa', 'Evitarea situațiilor unde competența nu este demonstrată', 'Investirea timpului în învățare și cercetare']
      },
      {
        name: 'Relații și intimitate',
        impact: 'Nevoile de spațiu și autonomie pot afecta apropierea emoțională.',
        examples: ['Dificultate în exprimarea emoțiilor', 'Preferința pentru comunicare electronică', 'Nevoia de relații care respectă independența']
      }
    ],
    'type6': [
      {
        name: 'Siguranță și stabilitate',
        impact: 'Căutarea securității influențează majoritatea deciziilor de viață.',
        examples: ['Preferința pentru job-uri stabile și previsibile', 'Construirea unor rețele de suport solide', 'Planificarea meticuloasă pentru scenarii negative', 'Evitarea riscurilor nejustificate']
      },
      {
        name: 'Autoritate și încredere',
        impact: 'Relația ambivalentă cu autoritatea afectează dinamicile de putere.',
        examples: ['Respectul pentru autoritatea legitimă dar suspiciunea față de abuz', 'Dificultate în luarea deciziilor importante singur', 'Căutarea validării și consiliului']
      },
      {
        name: 'Anxietate și gândire',
        impact: 'Mintea vigilentă poate genera anxietate și supraanaliză.',
        examples: ['Anticiparea constantă a problemelor potențiale', 'Dificultate în calmarea minții', 'Căutarea de asigurări de la alții']
      }
    ],
    'type7': [
      {
        name: 'Experiențe și varietate',
        impact: 'Nevoia de stimulare influențează alegerile și angajamentele.',
        examples: ['Dificultate în menținerea focusului pe termen lung', 'Atragerea către experiențe noi și diverse', 'Evitarea rutinei și monotoniei', 'Implicarea în multiple proiecte simultan']
      },
      {
        name: 'Emoții și procesare',
        impact: 'Evitarea emoțiilor negative poate limita procesarea și maturizarea.',
        examples: ['Tendința de a "sări peste" momentele dificile', 'Optimismul care poate ignora realitățile', 'Dificultate în a sta cu durerea sau pierderea']
      },
      {
        name: 'Angajamente și responsabilități',
        impact: 'FOMO poate afecta capacitatea de angajament profund.',
        examples: ['Dificultate în alegerea unei căi și renunțarea la altele', 'Probleme cu finalizarea proiectelor', 'Tendința de a evita responsabilitățile grele']
      }
    ],
    'type8': [
      {
        name: 'Putere și control',
        impact: 'Nevoia de control influențează leadership-ul și relațiile.',
        examples: ['Tendința naturală către roluri de leadership', 'Dificultate în a accepta control extern', 'Protejarea celor vulnerabili', 'Confruntarea directă cu injustețea']
      },
      {
        name: 'Intensitate și energie',
        impact: 'Energia puternică poate fi copleșitoare pentru alții.',
        examples: ['Abordarea intensă în toate domeniile vieții', 'Dificultate în a modula energia pentru situații delicate', 'Atragerea sau respingerea oamenilor prin intensitate']
      },
      {
        name: 'Vulnerabilitate și emoții',
        impact: 'Evitarea vulnerabilității poate limita intimitatea emoțională.',
        examples: ['Dificultate în a recunoaște și exprima emoții mai delicate', 'Tendința de a "ataca" când se simte vulnerabil', 'Protejarea prin agresiune sau retragere']
      }
    ],
    'type9': [
      {
        name: 'Energie și inițiativă',
        impact: 'Inerția poate afecta urmărirea obiectivelor și schimbărilor.',
        examples: ['Dificultate în începerea proiectelor noi', 'Tendința de a amâna deciziile importante', 'Preferința pentru rutina cunoscută', 'Procrastinarea prin distragerea atenției']
      },
      {
        name: 'Relații și pace',
        impact: 'Evitarea conflictului poate submina nevoile personale.',
        examples: ['Merge pe calea de cea mai mică rezistență', 'Dificultate în exprimarea dezacordului', 'Suprimarea propriilor nevoi pentru a menține pacea', 'Acumularea resentimentelor neexprimat']
      },
      {
        name: 'Identitate și priorități',
        impact: 'Focusul pe alții poate umbri propria identitate și dorințe.',
        examples: ['Dificultate în identificarea propriilor priorități', 'Adoptarea în intereselor și opiniilor altora', 'Simțirea de "invizibilitate" sau de a fi luat de-a gata']
      }
    ]
  };
  
  const specificImpacts = typeImpacts[dominantType] || [];
  areas.push(...specificImpacts);
  
  // Adaugă impact general pentru toate tipurile
  areas.push({
    name: 'Dezvoltare personală',
    impact: 'Tipul tău Enneagram oferă o hartă pentru creșterea personală și spirituală.',
    examples: [
      'Înțelegerea motivațiilor inconștiente',
      'Recunoașterea tiparelor autodistructive',
      'Dezvoltarea compassiunii pentru sine și alții',
      'Călea către integrare și maturitate emoțională'
    ]
  });
  
  return {
    areas,
    overallImpact: 'Enneagram-ul îți arată nu doar cine ești, ci și cine poți deveni prin lucrarea conștientă cu tipul tău de personalitate și drumul către integrare.'
  };
}

function getDigitalCompetenciesLifeImpact(score: StandardizedScore): LifeImpactData {
  const overallScore = score.overall || 0;
  const dimensions = score.dimensions || {};
  
  const impactAreas: LifeAreaImpact[] = [
    {
      name: "Cariera și Oportunități Profesionale",
      impact: overallScore >= 70 
        ? "Competențele tale digitale te poziționează excelent pentru oportunitățile din economia digitală și îți sporesc șansele de avansare în carieră."
        : "Dezvoltarea competențelor digitale îți va deschide noi oportunități profesionale și va îmbunătăți perspectivele de carieră în lumea modernă.",
      examples: overallScore >= 70 
        ? ["Abilitatea de a lucra eficient în medii digitale", "Competitivitate sporită pe piața muncii", "Acces la joburi remote și flexibile"]
        : ["Necesitatea de dezvoltare pentru roluri moderne", "Limitări în accesul la oportunități digitale", "Riscul de a rămâne în urmă în carieră"]
    },
    {
      name: "Eficiența și Productivitatea Zilnică",
      impact: overallScore >= 70
        ? "Îți gestionezi eficient taskurile digitale și economisești timp prin automatizare și optimizare."
        : "Dezvoltarea acestor competențe te va ajuta să îți organizezi mai bine viața și să economisești timp prin folosirea eficientă a tehnologiei.",
      examples: overallScore >= 70
        ? ["Gestionarea eficientă a informațiilor", "Automatizarea taskurilor repetitive", "Comunicare rapidă și eficientă"]
        : ["Pierderea de timp prin metode ineficiente", "Dificultăți în organizarea digitală", "Stress generat de tehnologie"]
    },
    {
      name: "Siguranța și Confidențialitatea Online",
      impact: (dimensions['siguranta_digitala'] && typeof dimensions['siguranta_digitala'] === 'number' && dimensions['siguranta_digitala'] >= 70)
        ? "Îți protejezi eficient datele personale și financiare în mediul online, evitând riscurile de securitate."
        : "Este important să îți dezvolți cunoștințele de securitate digitală pentru a te proteja împotriva amenințărilor online.",
      examples: (dimensions['siguranta_digitala'] && typeof dimensions['siguranta_digitala'] === 'number' && dimensions['siguranta_digitala'] >= 70)
        ? ["Protecție împotriva fraudelor online", "Gestionarea sigură a parolelor", "Conștientizarea riscurilor digitale"]
        : ["Vulnerabilitate la atacuri cibernetice", "Risc de compromitere a datelor", "Posibile probleme financiare"]
    },
    {
      name: "Comunicarea și Relațiile Sociale",
      impact: (dimensions['comunicare_digitala'] && typeof dimensions['comunicare_digitala'] === 'number' && dimensions['comunicare_digitala'] >= 70)
        ? "Comunici eficient în mediul digital și îți construiești relații profesionale și personale valoroase online."
        : "Îmbunătățirea competențelor de comunicare digitală te va ajuta să te conectezi mai bine cu ceilalți și să îți extindezi rețeaua socială.",
      examples: (dimensions['comunicare_digitala'] && typeof dimensions['comunicare_digitala'] === 'number' && dimensions['comunicare_digitala'] >= 70)
        ? ["Networking eficient online", "Comunicare profesională clară", "Menținerea relațiilor la distanță"]
        : ["Dificultăți în comunicarea online", "Oportunități ratate de networking", "Izolare în mediul digital"]
    }
  ];

  return {
    areas: impactAreas,
    overallImpact: overallScore >= 70 
      ? "Competențele tale digitale îți oferă o bază solidă pentru a naviga cu succes în lumea modernă și te ajută să profiti de oportunitățile erei digitale."
      : "Dezvoltarea competențelor digitale va avea un impact semnificativ asupra tuturor aspectelor vieții tale, de la carieră la relații și siguranța personală."
  };
}