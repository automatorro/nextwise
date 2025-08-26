import { StandardizedScore } from '@/types/tests';

export interface PersonalizedInterpretation {
  personalizedMessage: string;
  severityLabel: string;
  severityVariant: 'default' | 'secondary' | 'outline' | 'destructive';
  contextualFactors?: string[];
  normalityContext?: string;
}

export function getPersonalizedInterpretation(
  testName: string, 
  score: StandardizedScore,
  language: string = 'ro'
): PersonalizedInterpretation | null {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('gad') || testKey.includes('anxietate')) {
    return getGADPersonalizedInterpretation(score);
  }
  
  if (testKey.includes('phq') || testKey.includes('depresie') || testKey.includes('beck') || testKey.includes('bdi')) {
    return getPHQPersonalizedInterpretation(score);
  }
  
  if (testKey.includes('big five') || testKey.includes('personality')) {
    return getBigFivePersonalizedInterpretation(score, language);
  }
  
  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    return getCattellPersonalizedInterpretation(score);
  }
  
  if (testKey.includes('enneagram')) {
    return getEnneagramPersonalizedInterpretation(score, language);
  }
  
  return null;
}

function getGADPersonalizedInterpretation(score: StandardizedScore): PersonalizedInterpretation {
  const rawScore = score.raw_score || 0;
  const percentage = score.overall || 0;
  
  if (rawScore <= 4) {
    return {
      personalizedMessage: `Scorul tău de ${rawScore} puncte indică un nivel minimal de anxietate. Aceasta este o stare normală și sănătoasă. Ocazional, toți experimentăm îngrijorări ușoare, dar acestea nu interferează semnificativ cu activitățile zilnice.`,
      severityLabel: 'Normal',
      severityVariant: 'default',
      contextualFactors: [
        'Îngrijorările ocazionale sunt parte din experiența umană normală',
        'Stresul ușor poate fi chiar benefic în anumite situații',
        'Capacitatea de a gestiona anxietatea pare să fie bună'
      ],
      normalityContext: 'Majoritatea adulților sănătoși au scoruri în acest interval (0-4 puncte).'
    };
  } else if (rawScore <= 9) {
    return {
      personalizedMessage: `Cu un scor de ${rawScore} puncte, experimentezi un nivel ușor de anxietate. Aceasta poate fi legată de stresul cotidian sau de provocări specifice din viața ta. Deși nu este îngrijorător, este util să fii conștient de factorii care îți declanșează anxietatea.`,
      severityLabel: 'Ușoară',
      severityVariant: 'secondary',
      contextualFactors: [
        'Poate fi legată de schimbări recente în viață sau stress suplimentar',
        'Simptomele pot varia în funcție de circumstanțe',
        'Tehnicile simple de management pot fi foarte eficiente'
      ],
      normalityContext: 'Aproximativ 20-30% din populație experimentează nivele similare de anxietate.'
    };
  } else if (rawScore <= 14) {
    return {
      personalizedMessage: `Scorul tău de ${rawScore} puncte sugerează un nivel moderat de anxietate care poate începe să interfereze cu unele aspecte ale vieții tale. Este important să acorzi atenție acestor simptome și să consideri strategii mai active de management.`,
      severityLabel: 'Moderată',
      severityVariant: 'outline',
      contextualFactors: [
        'Anxietatea poate afecta concentrarea, somnul sau relațiile',
        'Simptomele fizice (tensiune musculară, oboseală) pot fi prezente',
        'Poate exista o tendință de evitare a anumitor situații'
      ],
      normalityContext: 'Acest nivel necesită atenție și strategii active de management.'
    };
  } else {
    return {
      personalizedMessage: `Cu un scor de ${rawScore} puncte, experimentezi un nivel sever de anxietate care probabil interferează semnificativ cu viața ta zilnică. Este foarte important să cauți sprijin profesional pentru a dezvolta strategii eficiente de management.`,
      severityLabel: 'Severă',
      severityVariant: 'destructive',
      contextualFactors: [
        'Anxietatea poate afecta major funcționarea zilnică',
        'Simptomele fizice și emoționale pot fi intense',
        'Poate exista o limitare semnificativă a activităților normale'
      ],
      normalityContext: 'Acest nivel de anxietate beneficiază semnificativ de intervenție profesională.'
    };
  }
}

function getPHQPersonalizedInterpretation(score: StandardizedScore): PersonalizedInterpretation {
  const rawScore = score.raw_score || 0;
  
  if (rawScore <= 4) {
    return {
      personalizedMessage: `Scorul tău indică o stare emoțională pozitivă, fără simptome semnificative de depresie. Această stare reflectă o funcționare psihică sănătoasă și capacitatea de a face față provocărilor vieții.`,
      severityLabel: 'Minimal',
      severityVariant: 'default',
      normalityContext: 'Majoritatea persoanelor sănătoase au scoruri în acest interval.'
    };
  } else if (rawScore <= 9) {
    return {
      personalizedMessage: `Experimentezi simptome ușoare care pot include perioade de tristețe sau scăderea energiei. Acestea pot fi reacții normale la stress sau schimbări în viață.`,
      severityLabel: 'Ușor',
      severityVariant: 'secondary',
      normalityContext: 'Simptomele ușoare sunt comune și pot fi temporare.'
    };
  } else if (rawScore <= 14) {
    return {
      personalizedMessage: `Scorul tău sugerează simptome moderate de depresie care pot afecta funcționarea zilnică. Este recomandat să acorzi atenție acestor simptome.`,
      severityLabel: 'Moderat',
      severityVariant: 'outline',
      normalityContext: 'Acest nivel poate beneficia de intervenție profesională.'
    };
  } else {
    return {
      personalizedMessage: `Experimentezi simptome severe care necesită atenție profesională imediată pentru a dezvolta un plan de tratament adecvat.`,
      severityLabel: 'Sever',
      severityVariant: 'destructive',
      normalityContext: 'Intervenția profesională este esențială la acest nivel.'
    };
  }
}

function getBigFivePersonalizedInterpretation(score: StandardizedScore, language: string = 'ro'): PersonalizedInterpretation {
  // Import the translations (this is a simplified approach)
  const translations: any = {
    ro: {
      personalizedResults: {
        title: "Profil Personal",
        factors: {
          development: "Personalitatea se dezvoltă de-a lungul timpului prin experiențe",
          situational: "Fiecare dimensiune influențează diferit comportamentul în diverse situații",
          unique: "Combinația ta unică de trăsături determină stilul tău personal"
        },
        normalityContext: "Toate scorurile Big Five sunt normale. Diversitatea personalităților umane este ceea ce face societatea funcțională și creativă."
      }
    },
    en: {
      personalizedResults: {
        title: "Personal Profile",
        factors: {
          development: "Personality develops over time through experiences",
          situational: "Each dimension influences behavior differently in various situations",
          unique: "Your unique combination of traits determines your personal style"
        },
        normalityContext: "All Big Five scores are normal. The diversity of human personalities is what makes society functional and creative."
      }
    }
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let current = translations[language] || translations.ro;
    for (const k of keys) {
      current = current?.[k];
    }
    return current || key;
  };

  if (!score.dimensions) {
    return {
      personalizedMessage: language === 'en' 
        ? "Your Big Five profile is unique and reflects a distinct combination of personality traits."
        : "Profilul tău Big Five este unic și reflectă o combinație distinctă de trăsături de personalitate.",
      severityLabel: language === 'en' ? "Unique Profile" : "Profil Unic",
      severityVariant: "default"
    };
  }

  // Identificăm dimensiunile dominante (scoruri >= 7)
  const strongTraits = score.dimensions.filter(d => d.score >= 7);
  const weakTraits = score.dimensions.filter(d => d.score <= 4);

  let message = language === 'en' ? "Your Big Five profile shows that " : "Profilul tău Big Five arată că ";
  
  if (strongTraits.length > 0) {
    const traitNames = strongTraits.map(t => t.name.toLowerCase()).join(", ");
    message += language === 'en' 
      ? `you have high scores in ${traitNames}. `
      : `ai scoruri ridicate la ${traitNames}. `;
  }
  
  if (weakTraits.length > 0) {
    const traitNames = weakTraits.map(t => t.name.toLowerCase()).join(", ");
    message += language === 'en'
      ? `On the other hand, you have lower scores in ${traitNames}. `
      : `În schimb, ai scoruri mai scăzute la ${traitNames}. `;
  }
  
  message += language === 'en'
    ? "This combination gives you a distinct personality profile with specific strengths."
    : "Această combinație îți oferă un profil de personalitate distinct cu puncte forte specifice.";

  return {
    personalizedMessage: message,
    severityLabel: t('personalizedResults.title'),
    severityVariant: "default",
    contextualFactors: [
      t('personalizedResults.factors.development'),
      t('personalizedResults.factors.situational'),
      t('personalizedResults.factors.unique')
    ],
    normalityContext: t('personalizedResults.normalityContext')
  };
}

function getCattellPersonalizedInterpretation(score: StandardizedScore): PersonalizedInterpretation {
  return {
    personalizedMessage: 'Profilul tău Cattell 16PF oferă o analiză detaliată a factorilor de personalitate care influențează comportamentul și preferințele tale.',
    severityLabel: 'Profil Complet',
    severityVariant: 'default',
    normalityContext: 'Fiecare factor de personalitate contribuie la unicitatea ta ca individ.'
  };
}

function getEnneagramPersonalizedInterpretation(score: StandardizedScore, language: string = 'ro'): PersonalizedInterpretation {
  const dominantType = score.dominant_profile;
  
  if (!dominantType) {
    return {
      personalizedMessage: language === 'en' 
        ? 'Your Enneagram profile reveals your core motivations and fear patterns.'
        : 'Profilul tău Enneagram dezvăluie motivațiile fundamentale și tiparele de teamă.',
      severityLabel: language === 'en' ? 'Personality Profile' : 'Profil de Personalitate',
      severityVariant: 'default'
    };
  }
  
  const typeNumber = dominantType.replace('type', '');
  const typeNames = {
    ro: {
      'type1': 'Perfectionist', 'type2': 'Ajutător', 'type3': 'Realizator', 
      'type4': 'Individualist', 'type5': 'Investigator', 'type6': 'Loialist',
      'type7': 'Entuziast', 'type8': 'Provocator', 'type9': 'Meditor'
    },
    en: {
      'type1': 'Perfectionist', 'type2': 'Helper', 'type3': 'Achiever',
      'type4': 'Individualist', 'type5': 'Investigator', 'type6': 'Loyalist', 
      'type7': 'Enthusiast', 'type8': 'Challenger', 'type9': 'Peacemaker'
    }
  };
  
  const typeName = typeNames[language as 'ro' | 'en'][dominantType] || typeNumber;
  
  let personalizedMessage = '';
  if (language === 'en') {
    personalizedMessage = `As Type ${typeNumber} (${typeName}), your core personality is driven by specific motivations and behavioral patterns. This Enneagram type reveals how you view the world and respond to challenges.`;
  } else {
    personalizedMessage = `Ca Tipul ${typeNumber} (${typeName}), personalitatea ta centrală este ghidată de motivații și tipare comportamentale specifice. Acest tip Enneagram dezvăluie cum percepi lumea și cum răspunzi la provocări.`;
  }
  
  const contextualFactors = language === 'en' ? [
    'Each Enneagram type has core fears and desires that drive behavior',
    'Understanding your type helps in personal growth and relationships', 
    'Types can develop differently based on stress and security levels'
  ] : [
    'Fiecare tip Enneagram are temeri și dorințe fundamentale care ghidează comportamentul',
    'Înțelegerea tipului tău ajută la dezvoltarea personală și relații',
    'Tipurile se pot dezvolta diferit în funcție de nivelurile de stres și siguranță'
  ];
  
  return {
    personalizedMessage,
    severityLabel: language === 'en' ? `Type ${typeNumber} - ${typeName}` : `Tipul ${typeNumber} - ${typeName}`,
    severityVariant: 'default',
    contextualFactors,
    normalityContext: language === 'en' 
      ? 'All Enneagram types are equally valid and represent different ways of experiencing and navigating the world.'
      : 'Toate tipurile Enneagram sunt la fel de valide și reprezintă modalități diferite de a experimenta și naviga lumea.'
  };
}