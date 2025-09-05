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

export interface ContextualRecommendation {
  type: 'self-help' | 'professional' | 'immediate' | 'lifestyle';
  category: string;
  title: string;
  description: string;
  actionItems?: string[];
}

export async function getContextualRecommendations(
  testName: string, 
  score: StandardizedScore
): Promise<ContextualRecommendation[] | null> {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('gad') || testKey.includes('anxietate')) {
    return getGADRecommendations(score);
  }
  
  if (testKey.includes('phq') || testKey.includes('depresie') || testKey.includes('beck') || testKey.includes('bdi')) {
    return getPHQRecommendations(score);
  }
  
  if (testKey.includes('big five') || testKey.includes('personality')) {
    return await getBigFiveRecommendations(score);
  }
  
  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    return getCattellRecommendations(score);
  }
  
  if (testKey.includes('enneagram')) {
    return getEnneagramRecommendations(score);
  }
  
  if (testKey.includes('digital') || testKey.includes('competente')) {
    return getDigitalCompetenciesRecommendations(score);
  }
  
  return null;
}

function getGADRecommendations(score: StandardizedScore): ContextualRecommendation[] {
  const rawScore = score.raw_score || 0;
  const recommendations: ContextualRecommendation[] = [];
  
  if (rawScore <= 4) {
    recommendations.push({
      type: 'lifestyle',
      category: 'Menținerea bunăstării',
      title: 'Continuă strategiile care funcționează',
      description: 'Scorul tău indică o gestionare bună a anxietății. Continuă cu obiceiurile sănătoase.',
      actionItems: [
        'Menține o rutină de somn regulată',
        'Practică exerciții fizice regulate',
        'Continuă activitățile care îți aduc bucurie și relaxare'
      ]
    });
  } else if (rawScore <= 9) {
    recommendations.push({
      type: 'self-help',
      category: 'Tehnici de auto-ajutor',
      title: 'Dezvoltă strategii de management',
      description: 'Nivel ușor de anxietate care poate fi gestionat prin tehnici simple.',
      actionItems: [
        'Încearcă exerciții de respirație profundă (4-7-8)',
        'Practică mindfulness 10 minute zilnic',
        'Identifică și evită sau gestionează factorii declanșatori',
        'Menține un jurnal al anxietății pentru a identifica pattern-uri'
      ]
    });
    
    recommendations.push({
      type: 'lifestyle',
      category: 'Schimbări de stil de viață',
      title: 'Optimizează rutina zilnică',
      description: 'Ajustări simple care pot reduce anxietatea.',
      actionItems: [
        'Limitează cafeina și alcoolul',
        'Stabilește o rutină de exerciții (30 min, 3x/săptămână)',
        'Asigură-te că dormi 7-8 ore pe noapte',
        'Conectează-te social cu persoane care te susțin'
      ]
    });
  } else if (rawScore <= 14) {
    recommendations.push({
      type: 'professional',
      category: 'Consultare profesională',
      title: 'Consideră sprijinul specializat',
      description: 'La acest nivel, terapia poate fi foarte benefică pentru dezvoltarea strategiilor de coping.',
      actionItems: [
        'Caută un terapeut specializat în tulburări de anxietate',
        'Explorează terapia cognitiv-comportamentală (CBT)',
        'Discută cu medicul de familie despre opțiuni'
      ]
    });
    
    recommendations.push({
      type: 'self-help',
      category: 'Strategii intensive',
      title: 'Implementează tehnici avansate',
      description: 'Combinații de tehnici pentru management mai eficient.',
      actionItems: [
        'Practică relaxarea musculară progresivă',
        'Încearcă aplicații de meditație ghidată',
        'Dezvoltă un plan de siguranță pentru momentele acute',
        'Învață tehnici de restructurare cognitivă'
      ]
    });
  } else {
    recommendations.push({
      type: 'immediate',
      category: 'Acțiune imediată',
      title: 'Caută ajutor profesional urgent',
      description: 'Acest nivel de anxietate necesită intervenție profesională pentru a preveni impactul negativ.',
      actionItems: [
        'Programează o consultație cu un specialist în sănătate mintală',
        'Consideră consultarea medicului pentru evaluare medicală',
        'Contactează linia de ajutor pentru criză dacă te simți copleșit',
        'Informează o persoană de încredere despre starea ta'
      ]
    });
    
    recommendations.push({
      type: 'professional',
      category: 'Plan de tratament',
      title: 'Dezvoltă un plan comprehensiv',
      description: 'Combinație de intervenții pentru management optim.',
      actionItems: [
        'Evaluare pentru posibilă medicație anxiolitică',
        'Terapie specializată (CBT, EMDR sau alte forme)',
        'Plan de gestionare a crizelor de anxietate',
        'Monitorizare regulată cu profesionistul'
      ]
    });
  }
  
  return recommendations;
}

function getPHQRecommendations(score: StandardizedScore): ContextualRecommendation[] {
  const rawScore = score.raw_score || 0;
  const recommendations: ContextualRecommendation[] = [];
  
  if (rawScore <= 4) {
    recommendations.push({
      type: 'lifestyle',
      category: 'Prevenția',
      title: 'Menține sănătatea mentală',
      description: 'Continuă cu obiceiurile care susțin bunăstarea emoțională.',
      actionItems: [
        'Menține conexiuni sociale semnificative',
        'Practică activități fizice regulate',
        'Dezvoltă hobby-uri și pasiuni personale'
      ]
    });
  } else if (rawScore <= 9) {
    recommendations.push({
      type: 'self-help',
      category: 'Auto-îngrijire',
      title: 'Strategii de auto-ajutor',
      description: 'Tehnici pentru îmbunătățirea dispoziției și energiei.',
      actionItems: [
        'Stabilește o rutină zilnică structurată',
        'Practică activitatea fizică regulat',
        'Menține un jurnal de recunoștință',
        'Conectează-te cu prietenii și familia'
      ]
    });
  } else if (rawScore <= 14) {
    recommendations.push({
      type: 'professional',
      category: 'Intervenție profesională',
      title: 'Consultare cu specialist',
      description: 'Terapia poate fi foarte eficientă pentru simptomele moderate.',
      actionItems: [
        'Caută un psihoterapeut specializat în depresie',
        'Discută cu medicul despre evaluare completă',
        'Explorează opțiuni de terapie cognitiv-comportamentală'
      ]
    });
  } else {
    recommendations.push({
      type: 'immediate',
      category: 'Intervenție urgentă',
      title: 'Caută ajutor imediat',
      description: 'Simptomele severe necesită atenție profesională imediată.',
      actionItems: [
        'Contactează imediat un specialist în sănătate mintală',
        'Dacă ai gânduri de auto-vătămare, apelează linia de urgență',
        'Informează familia sau prietenii despre starea ta',
        'Nu rămâne singur - caută suport imediat'
      ]
    });
  }
  
  return recommendations;
}

function getDigitalCompetenciesRecommendationsInternal(score: StandardizedScore): string[] {
  const recommendations: string[] = [];
  const dimensions = score.dimensions || {};
  
  // Recomandări generale bazate pe scorul overall
  const overallScore = score.overall || 0;
  
  if (overallScore < 60) {
    recommendations.push("Începe cu cursuri online de alfabetizare digitală pentru a-ți consolida fundamentele");
    recommendations.push("Practică zilnic folosirea instrumentelor digitale de bază");
  }
  
  // Recomandări specifice pe dimensiuni
  Object.entries(dimensions).forEach(([dimension, dimensionScore]) => {
    if (typeof dimensionScore === 'number' && dimensionScore < 60) {
      switch (dimension) {
        case 'alfabetizare_digitala':
          recommendations.push("Îmbunătățește-ți abilitățile de navigare și căutare pe internet");
          recommendations.push("Învață să evaluezi credibilitatea surselor online");
          break;
        case 'comunicare_digitala':
          recommendations.push("Practică comunicarea profesională prin email și platforme de colaborare");
          recommendations.push("Dezvoltă-ți abilitățile de networking online");
          break;
        case 'creare_continut':
          recommendations.push("Învață să folosești instrumente de editare foto și video");
          recommendations.push("Dezvoltă-ți abilitățile de scriere pentru mediul digital");
          break;
        case 'siguranta_digitala':
          recommendations.push("Studiază principiile de securitate cibernetică");
          recommendations.push("Implementează practici sigure de gestionare a parolelor");
          break;
        case 'rezolvare_probleme':
          recommendations.push("Dezvoltă-ți abilitățile de troubleshooting pentru probleme tehnice");
          recommendations.push("Învață să folosești resurse online pentru rezolvarea problemelor");
          break;
      }
    }
  });
  
  // Recomandări pentru niveluri avansate
  if (overallScore >= 80) {
    recommendations.push("Consideră să devii mentor pentru alții în domeniul competențelor digitale");
    recommendations.push("Explorează tehnologii emergente în domeniul tău de interes");
  }
  
  return recommendations.slice(0, 5); // Limitează la 5 recomandări
}

function getDigitalCompetenciesRecommendations(score: StandardizedScore): ContextualRecommendation[] {
  const recommendations: ContextualRecommendation[] = [];
  const dimensions = score.dimensions || {};
  const overallScore = score.overall || 0;
  
  if (overallScore >= 80) {
    recommendations.push({
      type: 'professional',
      category: 'Dezvoltare avansată',
      title: 'Become a Digital Leader',
      description: 'Competențele tale digitale excelente te poziționează să devii un lider în transformarea digitală.',
      actionItems: [
        'Consideră roluri de Digital Transformation Officer',
        'Dezvoltă-ți abilitățile de mentoring în competențe digitale',
        'Explorează tehnologii emergente (AI, IoT, Blockchain)',
        'Participă la conferințe și evenimente de tech leadership'
      ]
    });
  } else if (overallScore >= 60) {
    recommendations.push({
      type: 'professional',
      category: 'Consolidare competențe',
      title: 'Solidifică fundamentele digitale',
      description: 'Ai o bază bună, acum este timpul să îți consolidezi și să îți extinzi competențele digitale.',
      actionItems: [
        'Certifică-te în domenii specializate (Google, Microsoft, Adobe)',
        'Participă la cursuri avansate online',
        'Contribuie la proiecte digitale în echipă',
        'Dezvoltă-ți portofoliul digital personal'
      ]
    });
  } else {
    recommendations.push({
      type: 'self-help',
      category: 'Dezvoltare de bază',
      title: 'Construiește fundamentele digitale',
      description: 'Este important să începi cu competențele digitale de bază pentru a te adapta la lumea modernă.',
      actionItems: [
        'Înscrie-te la cursuri de alfabetizare digitală',
        'Practică zilnic cu instrumente digitale de bază',
        'Cere ajutorul colegilor sau prietenilor tech-savvy',
        'Folosește aplicații educaționale pentru învățare'
      ]
    });
  }

  // Recomandări specifice pe dimensiuni
  Object.entries(dimensions).forEach(([dimension, dimensionScore]) => {
    if (typeof dimensionScore === 'number' && dimensionScore < 60) {
      switch (dimension) {
        case 'alfabetizare_digitala':
          recommendations.push({
            type: 'self-help',
            category: 'Alfabetizare digitală',
            title: 'Îmbunătățește navigarea și căutarea online',
            description: 'Dezvoltă-ți abilitățile fundamentale de folosire a internetului și evaluarea informațiilor.',
            actionItems: [
              'Învață să folosești operatori de căutare avansați',
              'Exersează evaluarea credibilității surselor online',
              'Familiarizează-te cu browserele și extensiile utile',
              'Practică organizarea și salvarea informațiilor digitale'
            ]
          });
          break;
        case 'siguranta_digitala':
          recommendations.push({
            type: 'immediate',
            category: 'Securitate digitală',
            title: 'Protejează-ți identitatea online',
            description: 'Învață principiile esențiale de securitate cibernetică pentru a-ți proteja datele personale.',
            actionItems: [
              'Folosește un manager de parole (LastPass, Bitwarden)',
              'Activează autentificarea cu doi factori peste tot',
              'Învață să recunoști tentativele de phishing',
              'Fă backup-uri regulate la datele importante'
            ]
          });
          break;
      }
    }
  });

  return recommendations.slice(0, 3); // Limitează la 3 recomandări pentru a nu copleși
}

async function getBigFiveRecommendations(score: StandardizedScore): Promise<ContextualRecommendation[]> {
  const translations = await getTranslations();
  const t = (key: string) => translateKey(translations, key);
  const recommendations: ContextualRecommendation[] = [];
  
  if (!score.dimensions) {
    return [{
      type: "self-help",
      category: t('recommendations.selfAwareness'),
      title: t('recommendations.bigFive.developSelfAwareness'),
      description: t('recommendations.bigFive.developSelfAwarenessDesc')
    }];
  }

  // Recomandări bazate pe dimensiuni specifice
  score.dimensions.forEach(dimension => {
    if (dimension.id === 'openness') {
      if (dimension.score >= 7) {
        recommendations.push({
          type: "lifestyle",
          category: t('recommendations.creativity'),
          title: t('recommendations.bigFive.channelCreativity'),
          description: t('recommendations.bigFive.channelCreativityDesc'),
          actionItems: t('recommendations.bigFive.channelCreativityActions')
        });
      } else {
        recommendations.push({
          type: "self-help",
          category: t('recommendations.comfort'),
          title: t('recommendations.bigFive.valorizeStability'),
          description: t('recommendations.bigFive.valorizeStabilityDesc'),
          actionItems: t('recommendations.bigFive.valorizeStabilityActions') || [
            "Creează rutine productive", 
            "Specializează-te într-un domeniu", 
            "Construiește sisteme organizate"
          ]
        });
      }
    }
    
    if (dimension.id === 'conscientiousness') {
      if (dimension.score >= 7) {
        recommendations.push({
          type: "professional",
          category: t('recommendations.productivity'),
          title: t('recommendations.bigFive.valorizeProductivity'),
          description: t('recommendations.bigFive.valorizeProductivityDesc'),
          actionItems: t('recommendations.bigFive.valorizeProductivityActions') || [
            "Acceptă roluri de leadership", 
            "Gestionează proiecte complexe", 
            "Creează sisteme de productivitate"
          ]
        });
      } else {
        recommendations.push({
          type: "lifestyle",
          category: t('recommendations.flexibility'),
          title: t('recommendations.bigFive.developFlexibility'),
          description: t('recommendations.bigFive.developFlexibilityDesc'),
          actionItems: t('recommendations.bigFive.developFlexibilityActions')
        });
      }
    }

    if (dimension.id === 'extraversion') {
      if (dimension.score >= 7) {
        recommendations.push({
          type: "lifestyle",
          category: t('recommendations.socialization'),
          title: t('recommendations.bigFive.energizeThroughInteraction'),
          description: t('recommendations.bigFive.energizeThroughInteractionDesc'),
          actionItems: t('recommendations.bigFive.energizeThroughInteractionActions') || [
            "Participă la evenimente de networking", 
            "Alătură-te grupurilor de interes", 
            "Consideră roluri care implică prezentări"
          ]
        });
      } else {
        recommendations.push({
          type: "self-help",
          category: t('recommendations.introspection'),
          title: t('recommendations.bigFive.valorizeDeepReflection'),
          description: t('recommendations.bigFive.valorizeDeepReflectionDesc'),
          actionItems: t('recommendations.bigFive.valorizeDeepReflectionActions')
        });
      }
    }
  });

  // Recomandare generală pentru Big Five
  recommendations.push({
    type: "self-help",
    category: t('recommendations.selfAwareness') || 'Autocunoaștere',
    title: t('recommendations.bigFive.developSelfAwareness') || 'Dezvoltă autocunoașterea',
    description: t('recommendations.bigFive.developSelfAwarenessDesc') || 'Folosește rezultatele pentru o înțelegere mai profundă a personalității tale.',
    actionItems: t('recommendations.bigFive.developSelfAwarenessActions')
  });

  return recommendations;
}

function getCattellRecommendations(score: StandardizedScore): ContextualRecommendation[] {
  return [{
    type: 'self-help',
    category: 'Analiză de personalitate',
    title: 'Aplică cunoașterea de sine',
    description: 'Folosește profilul 16PF pentru înțelegere mai profundă a personalității.',
    actionItems: [
      'Analizează cum factorii de personalitate influențează comportamentul tău',
      'Identifică domeniile profesionale potrivite',
      'Dezvoltă strategii pentru gestionarea punctelor slabe',
      'Valorifică punctele forte în relații și carieră'
    ]
  }];
}

function getEnneagramRecommendations(score: StandardizedScore): ContextualRecommendation[] {
  const dominantType = score.dominant_profile;
  const recommendations: ContextualRecommendation[] = [];
  
  if (!dominantType) {
    return [{
      type: 'self-help',
      category: 'Dezvoltare personală',
      title: 'Explorează tipul tău Enneagram',
      description: 'Înțelege-ți motivațiile profunde și tiparele de comportament.',
      actionItems: [
        'Citește despre toate tipurile pentru a-ți confirma tipul',
        'Observă cum reacționezi în diferite situații',
        'Identifică tiparele de gândire și comportament'
      ]
    }];
  }
  
  // Recomandări specifice pentru fiecare tip
  const typeRecommendations: Record<string, ContextualRecommendation[]> = {
    'type1': [
      {
        type: 'self-help',
        category: 'Gestionarea perfecționismului',
        title: 'Dezvoltă flexibilitatea și auto-compasiunea',
        description: 'Învață să accepți imperfecțiunile și să îți tempezi criticismul interior.',
        actionItems: [
          'Practică mindfulness pentru a observa vocea critică interioară',
          'Stabilește standarde realiste și realizabile',
          'Celebrează progresul, nu doar perfecțiunea',
          'Învață să spui "suficient de bun" pentru anumite sarcini'
        ]
      },
      {
        type: 'lifestyle',
        category: 'Echilibru în viață',
        title: 'Încorporează relaxarea în rutină',
        description: 'Balansează munca și perfecțiunea cu activități de relaxare.',
        actionItems: [
          'Programează timp pentru hobby-uri plăcute',
          'Practică exerciții de relaxare zilnic',
          'Acceptă să fii spontan uneori'
        ]
      }
    ],
    'type2': [
      {
        type: 'self-help',
        category: 'Îngrijirea de sine',
        title: 'Învață să îți prioritizezi nevoile',
        description: 'Dezvoltă capacitatea de a-ți recunoaște și satisface propriile nevoi.',
        actionItems: [
          'Fă o listă zilnică cu nevoile tale personale',
          'Practică să spui "nu" când ești copleșit',
          'Solicită ajutor când ai nevoie',
          'Dedică timp zilnic pentru auto-îngrijire'
        ]
      },
      {
        type: 'professional',
        category: 'Limite sănătoase',
        title: 'Stabilește limite clare în relații',
        description: 'Învață să ajuți fără a te epuiza emoțional.',
        actionItems: [
          'Comunică deschis despre limitele tale',
          'Oferă ajutor din generozitate, nu din obligație',
          'Dezvoltă relații reciproce și echilibrate'
        ]
      }
    ],
    'type3': [
      {
        type: 'professional',
        category: 'Succes autentic',
        title: 'Conectează-te cu valorile autentice',
        description: 'Aliniază realizările cu valorile și identitatea ta autentică.',
        actionItems: [
          'Reflectează asupra propriilor valori și pasiuni',
          'Stabilește obiective bazate pe satisfacție personală, nu doar pe imagine',
          'Celebrează efortul și procesul, nu doar rezultatele',
          'Dezvoltă relații profunde dincolo de succes'
        ]
      },
      {
        type: 'lifestyle',
        category: 'Echilibru work-life',
        title: 'Încetinește și conectează-te emoțional',
        description: 'Balansează realizările cu conexiunea emoțională și relaxarea.',
        actionItems: [
          'Programează timp pentru reflexie și procesare emoțională',
          'Dezvoltă hobby-uri fără obiective de performanță',
          'Practică vulnerabilitatea în relații apropiate'
        ]
      }
    ],
    'type4': [
      {
        type: 'self-help',
        category: 'Stabilitate emoțională',
        title: 'Dezvoltă toleranța pentru emoțiile intense',
        description: 'Învață să navighezi prin stările emoționale intense fără a fi copleșit.',
        actionItems: [
          'Practică tehnici de grounding când emoțiile sunt intense',
          'Ține un jurnal emoțional pentru a identifica tiparele',
          'Dezvoltă rutine de auto-calmă care funcționează pentru tine',
          'Căută sprijin profesional pentru gestionarea depresiei'
        ]
      },
      {
        type: 'lifestyle',
        category: 'Exprimare creativă',
        title: 'Canalează creativitatea constructiv',
        description: 'Folosește unicitatea ta pentru proiecte creative și semnificative.',
        actionItems: [
          'Dedică timp regulat pentru activități creative',
          'Conectează-te cu comunități de artisti sau creatori',
          'Găsește modalități de a-ți exprima autenticitatea în muncă'
        ]
      }
    ],
    'type5': [
      {
        type: 'lifestyle',
        category: 'Echilibru social',
        title: 'Dezvoltă conexiuni sociale graduale',
        description: 'Balansează nevoia de solitudine cu conexiuni sociale semnificative.',
        actionItems: [
          'Programează interacțiuni sociale scurte și regulate',
          'Găsește grupuri cu interese comune',
          'Comunică nevoile tale de spațiu personal partenerilor',
          'Practică exprimarea emoțiilor în siguranță'
        ]
      },
      {
        type: 'professional',
        category: 'Partajarea cunoștințelor',
        title: 'Transformă cunoștințele în contribuții',
        description: 'Găsește modalități de a împărtăși expertiza fără a te epuiza energetic.',
        actionItems: [
          'Alege proiecte care îți valorifică cunoștințele specifice',
          'Dezvoltă sisteme pentru a împărtăși informații eficient',
          'Caută roluri care îți respectă stilul de lucru independent'
        ]
      }
    ],
    'type6': [
      {
        type: 'self-help',
        category: 'Gestionarea anxietății',
        title: 'Dezvoltă încrederea în propriile decizii',
        description: 'Construiește încrederea interioară și reduce dependența de validare externă.',
        actionItems: [
          'Practică luarea de decizii mici fără consiliere externă',
          'Dezvoltă un sistem personal de evaluare a riscurilor',
          'Creează planuri de siguranță pentru scenariile temute',
          'Cultiva încrederea prin succese incrementale'
        ]
      },
      {
        type: 'professional',
        category: 'Leadership autentic',
        title: 'Dezvoltă stil de leadership bazat pe loialitate',
        description: 'Folosește loialitatea și gândirea strategică pentru a conduce echipe.',
        actionItems: [
          'Dezvoltă sisteme clare și transparente în echipă',
          'Construiește relații de încredere cu colegii',
          'Folosește capacitatea de a anticipa probleme constructiv'
        ]
      }
    ],
    'type7': [
      {
        type: 'lifestyle',
        category: 'Focus și profunzime',
        title: 'Dezvoltă capacitatea de a sta cu experiențele',
        description: 'Învață să explorezi în profunzime în loc să fugi spre următoarea experiență.',
        actionItems: [
          'Practică meditația mindfulness pentru a sta cu momentul prezent',
          'Alege mai puține proiecte dar explorează-le în profunzime',
          'Dezvoltă toleranța pentru emoțiile negative fără evitare',
          'Creează rutine care să îți susțină focusul'
        ]
      },
      {
        type: 'professional',
        category: 'Finalizarea proiectelor',
        title: 'Dezvoltă sisteme pentru finalizare',
        description: 'Creează structuri care să te ajute să duci proiectele la capăt.',
        actionItems: [
          'Folosește timere și tehnici de time-boxing',
          'Cere feedback regular pentru a rămâne angajat',
          'Găsește parteneri de responsabilitate pentru proiecte mari'
        ]
      }
    ],
    'type8': [
      {
        type: 'self-help',
        category: 'Vulnerabilitate și control',
        title: 'Dezvoltă comfort cu vulnerabilitatea',
        description: 'Învață să îți accepți și vulnerabilitățile, nu doar puterea.',
        actionItems: [
          'Practică împărtășirea emoțiilor cu persoane de încredere',
          'Recunoaște limitele și cere ajutor când e necesar',
          'Dezvoltă empatie pentru slăbiciunile altora',
          'Învață să cedezi controlul în situații apropiate'
        ]
      },
      {
        type: 'professional',
        category: 'Leadership empatic',
        title: 'Balansează puterea cu compasiunea',
        description: 'Folosește energia ta de leadership pentru a proteja și dezvolta echipa.',
        actionItems: [
          'Practică ascultarea activă înainte de a lua decizii',
          'Oferă feedback constructiv, nu doar corectiv',
          'Dezvoltă membres ale echipei în loc să îi domni'
        ]
      }
    ],
    'type9': [
      {
        type: 'self-help',
        category: 'Energie și inițiativă',
        title: 'Dezvoltă energia interioară și inițiativa',
        description: 'Învață să îți accesezi energia și să acționezi pentru propriile priorități.',
        actionItems: [
          'Stabilește rutine mici și realizabile pentru a construi momentum',
          'Identifică și urmărește propriile priorități, nu doar pe ale altora',
          'Folosește tehnici de time-management pentru a evita amânarea',
          'Practică exprimarea opiniilor și nevoilor'
        ]
      },
      {
        type: 'lifestyle',
        category: 'Angajament activ',
        title: 'Participă activ la propria viață',
        description: 'Evită retragerea automată și angajează-te conștient în activități.',
        actionItems: [
          'Alege conștient activitățile în loc să te lași purtat de curent',
          'Stabilește și urmărește obiective personale importante',
          'Dezvoltă hobby-uri care îți aduc energie și bucurie'
        ]
      }
    ]
  };
  
  const typeSpecificRecommendations = typeRecommendations[dominantType] || [];
  recommendations.push(...typeSpecificRecommendations);
  
  // Recomandare generală pentru toate tipurile
  recommendations.push({
    type: 'self-help',
    category: 'Dezvoltare Enneagram',
    title: 'Explorează integrarea și dezintegrarea',
    description: 'Înțelege cum te comporți în stres (dezintegrare) și în siguranță (integrare).',
    actionItems: [
      'Observă cum se schimbă comportamentul tău în situații stresante',
      'Identifică ce te ajută să îți accesezi calitățile pozitive',
      'Lucrează cu un coach sau terapeut specializat în Enneagram',
      'Practică dezvoltarea trăsăturilor tipurilor de integrare'
    ]
  });
  
  return recommendations;
}