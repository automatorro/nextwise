
import { TestScoringExplanation, DimensionExplanation } from './types';

export function getTestScoringExplanation(testName: string): TestScoringExplanation {
  if (testName.includes('Big Five') || testName.includes('big-five')) {
    return {
      description: 'Testul Big Five măsoară cinci dimensiuni fundamentale ale personalității: deschidere, conștiinciozitate, extraversiune, agreabilitate și neuroticism. Aceste dimensiuni oferă o imagine completă a trăsăturilor tale de personalitate.',
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' },
        { range: '70-100%', label: 'Ridicat', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică nivelul la care fiecare dimensiune este prezentă în personalitatea ta. Aceste informații te pot ajuta să înțelegi mai bine comportamentul și preferințele tale.'
    };
  }

  if (testName.includes('Watson-Glaser') || testName.includes('watson-glaser')) {
    return {
      description: 'Testul Watson-Glaser evaluează capacitatea de raționament critic și gândire structurată prin cinci componente esențiale: inferențe, recunoașterea asumpțiilor, deducție, interpretarea și evaluarea argumentelor. Acest test este utilizat pe scară largă în mediul corporativ și academic pentru evaluarea abilităților de analiză logică și luarea deciziilor fundamentate.',
      scoreRanges: [
        { range: '0-42%', label: 'Sub medie', variant: 'outline' },
        { range: '43-62%', label: 'Mediu', variant: 'secondary' },
        { range: '63-82%', label: 'Bun', variant: 'default' },
        { range: '83-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale reflectă capacitatea de a analiza informații în mod critic, de a identifica presupuneri ascunse, de a deduce concluzii logice, de a interpreta corect textele și de a evalua forța argumentelor. Un scor ridicat indică o gândire critică avansată, esențială pentru luarea deciziilor complexe în mediul profesional.'
    };
  }

  // Add other test explanations here as needed

  return {
    description: 'Nu există explicații disponibile pentru acest test.',
  };
}

export function getDimensionExplanation(testName: string, dimensionKey: string): DimensionExplanation | null {
  if (testName.includes('Big Five') || testName.includes('big-five')) {
    const explanations: { [key: string]: DimensionExplanation } = {
      openness: {
        description: 'Deschiderea către experiențe noi reflectă curiozitatea, creativitatea și interesul pentru artă și idei noi.',
        interpretations: {
          high: 'Ești deschis la noi experiențe și idei, ceea ce te face creativ și adaptabil.',
          low: 'Preferi rutina și familiarul, ceea ce poate oferi stabilitate, dar limitează inovația.'
        },
        yourScore: {
          high: 'Ai o minte deschisă și ești curios să explorezi noi perspective.',
          moderate: 'Ai un echilibru între deschidere și preferința pentru familiar.',
          low: 'Ești mai conservator în gândire și preferi stabilitatea.'
        }
      },
      conscientiousness: {
        description: 'Conștiinciozitatea reflectă disciplina, organizarea și responsabilitatea în atingerea obiectivelor.',
        interpretations: {
          high: 'Ești organizat și responsabil, ceea ce te ajută să atingi obiectivele cu succes.',
          low: 'Poți fi mai relaxat în privința planificării și organizării.'
        },
        yourScore: {
          high: 'Ai o abordare disciplinată și atentă în muncă și viață.',
          moderate: 'Ai un echilibru între flexibilitate și organizare.',
          low: 'Preferi o abordare mai relaxată și spontană.'
        }
      },
      extraversion: {
        description: 'Extraversiunea indică nivelul de sociabilitate, energie și entuziasm în interacțiunile sociale.',
        interpretations: {
          high: 'Ești sociabil și energic, te bucuri de compania altora.',
          low: 'Ești mai rezervat și preferi momentele de liniște.'
        },
        yourScore: {
          high: 'Îți place să fii în centrul atenției și să interacționezi cu oamenii.',
          moderate: 'Ai un echilibru între sociabilitate și timp pentru tine.',
          low: 'Preferi să petreci timp singur sau în cercuri restrânse.'
        }
      },
      agreeableness: {
        description: 'Agreabilitatea reflectă cooperarea, empatia și dorința de a ajuta pe ceilalți.',
        interpretations: {
          high: 'Ești cooperant și empatic, ceea ce te face un bun coleg și prieten.',
          low: 'Poți fi mai direct și orientat spre propriile obiective.'
        },
        yourScore: {
          high: 'Ești atent la nevoile celorlalți și cauți armonia.',
          moderate: 'Ai un echilibru între grijă pentru ceilalți și propriile nevoi.',
          low: 'Ești mai independent și uneori competitiv.'
        }
      },
      neuroticism: {
        description: 'Neuroticismul indică tendința de a experimenta emoții negative precum anxietatea și stresul.',
        interpretations: {
          high: 'Poți fi mai sensibil la stres și emoții negative.',
          low: 'Ești calm și echilibrat emoțional în fața provocărilor.'
        },
        yourScore: {
          high: 'Este important să gestionezi stresul pentru a-ți menține echilibrul.',
          moderate: 'Ai un nivel moderat de sensibilitate emoțională.',
          low: 'Ești rezistent la stres și ai o stare emoțională stabilă.'
        }
      }
    };

    return explanations[dimensionKey] || null;
  }

  if (testName.includes('Watson-Glaser') || testName.includes('watson-glaser')) {
    const explanations: { [key: string]: DimensionExplanation } = {
      inferences: {
        description: 'Capacitatea de a determina probabilitatea adevărului unei afirmații pe baza faptelor prezentate. Această abilitate este crucială pentru luarea deciziilor bazate pe evidențe.',
        interpretations: {
          high: 'Excelent în evaluarea probabilității - poți să distingi între ce este sigur adevărat, probabil adevărat sau insuficient susținut de evidențe.',
          low: 'Dificultăți în evaluarea probabilității - există tendința de a trage concluzii prea rapide sau de a nu recunoaște limitele informațiilor disponibile.'
        },
        yourScore: {
          high: 'Ai o capacitate excelentă de a evalua probabilitatea afirmațiilor bazate pe fapte. Această abilitate te ajută să iei decizii informate și să eviți concluziile pripite.',
          moderate: 'Ai o capacitate moderată de a evalua probabilitatea afirmațiilor. Poți îmbunătăți prin exerciții care se concentrează pe distincția dintre fapte și inferențe.',
          low: 'Ai nevoie de dezvoltare în evaluarea probabilității afirmațiilor. Concentrează-te pe distincția dintre ce este direct afirmat și ce este doar sugerat.'
        }
      },
      assumptions: {
        description: 'Abilitatea de a identifica presupunerile implicite dintr-o afirmație. Recunoașterea asumpțiilor este esențială pentru înțelegerea argumentelor și a punctelor de vedere.',
        interpretations: {
          high: 'Excelent în identificarea presupunerilor - poți să recunoști ce este presupus, dar nu afirmat explicit într-un argument.',
          low: 'Dificultăți în identificarea presupunerilor - există tendința de a accepta argumentele fără a examina premisele ascunse.'
        },
        yourScore: {
          high: 'Ai o capacitate excelentă de a identifica presupunerile implicite. Această abilitate te ajută să analizezi argumentele în profunzime și să identifici punctele slabe.',
          moderate: 'Ai o capacitate moderată de a identifica presupunerile. Poți îmbunătăți prin exerciții care se concentrează pe identificarea premiselor ascunse.',
          low: 'Ai nevoie de dezvoltare în identificarea presupunerilor. Învață să te întrebi ce este presupus, dar nu afirmat explicit în argumentele prezentate.'
        }
      },
      deduction: {
        description: 'Capacitatea de a determina dacă o concluzie urmează logic din premise. Deducția este fundamentul raționamentului logic și a demonstrațiilor valide.',
        interpretations: {
          high: 'Excelent în raționamentul deductiv - poți să determini cu acuratețe dacă o concluzie urmează logic din premise.',
          low: 'Dificultăți în raționamentul deductiv - există tendința de a confunda validitatea logică cu adevărul sau probabilitatea.'
        },
        yourScore: {
          high: 'Ai o capacitate excelentă de raționament deductiv. Poți să determini cu acuratețe dacă concluziile urmează logic din premise, indiferent de conținutul lor.',
          moderate: 'Ai o capacitate moderată de raționament deductiv. Poți îmbunătăți prin exerciții de logică formală și analiza validității argumentelor.',
          low: 'Ai nevoie de dezvoltare în raționamentul deductiv. Concentrează-te pe distincția dintre validitatea logică și adevărul premises.'
        }
      },
      interpretation: {
        description: 'Abilitatea de a extrage concluzii corecte dintr-un text sau set de informații. Interpretarea corectă este esențială pentru înțelegerea și comunicarea eficientă.',
        interpretations: {
          high: 'Excelent în interpretarea informațiilor - poți să extragi concluzii corecte și să eviți suprageneralizările.',
          low: 'Dificultăți în interpretarea informațiilor - există tendința de a citi mai mult decât este prezent sau de a interpreta greșit datele.'
        },
        yourScore: {
          high: 'Ai o capacitate excelentă de interpretare. Poți să extragi concluzii corecte din informațiile prezentate fără a adăuga presupuneri nedovedite.',
          moderate: 'Ai o capacitate moderată de interpretare. Poți îmbunătăți prin exerciții care se concentrează pe distincția dintre ce este afirmat și ce este interpretat.',
          low: 'Ai nevoie de dezvoltare în interpretarea informațiilor. Învață să citești cu atenție și să extragi doar concluziile susținute de evidențe.'
        }
      },
      argument_evaluation: {
        description: 'Capacitatea de a evalua forța unui argument prin analiza relevanței și logicii. Evaluarea argumentelor este crucială pentru luarea deciziilor bazate pe raționament solid.',
        interpretations: {
          high: 'Excelent în evaluarea argumentelor - poți să distingi între argumentele puternice și cele slabe bazându-te pe relevanță și logică.',
          low: 'Dificultăți în evaluarea argumentelor - există tendința de a fi influențat de conținutul emoțional mai mult decât de logica argumentului.'
        },
        yourScore: {
          high: 'Ai o capacitate excelentă de evaluare a argumentelor. Poți să distingi între argumentele puternice și cele slabe bazându-te pe criterii logice și relevanță.',
          moderate: 'Ai o capacitate moderată de evaluare a argumentelor. Poți îmbunătăți prin exerciții care se concentrează pe analiza relevanței și logicii.',
          low: 'Ai nevoie de dezvoltare în evaluarea argumentelor. Învață să analizezi argumentele bazându-te pe logică și relevanță, nu pe conținutul emoțional.'
        }
      }
    };

    return explanations[dimensionKey] || null;
  }

  // Add other test dimension explanations here as needed

  return null;
}

export function getDimensionLabel(dimensionKey: string): string {
  const labels: { [key: string]: string } = {
    // Big Five labels
    openness: 'Deschidere către experiențe',
    conscientiousness: 'Conștiinciozitate',
    extraversion: 'Extraversiune',
    agreeableness: 'Agreabilitate',
    neuroticism: 'Neuroticism',

    // Watson-Glaser labels
    inferences: 'Inferențe',
    assumptions: 'Recunoașterea Asumpțiilor',
    deduction: 'Deducție',
    interpretation: 'Interpretarea',
    argument_evaluation: 'Evaluarea Argumentelor',
  };

  return labels[dimensionKey] || dimensionKey;
}
