
export interface SensoryPerceptionExplanation {
  description: string;
  dimensions: {
    discriminare_vizuala: { name: string; description: string; highTrait: string; lowTrait: string; };
    procesare_auditiva: { name: string; description: string; highTrait: string; lowTrait: string; };
    integrare_multimodala: { name: string; description: string; highTrait: string; lowTrait: string; };
    atentie_perceptuala: { name: string; description: string; highTrait: string; lowTrait: string; };
  };
  scoreRanges: Array<{
    range: string;
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  whatItMeans: string;
  professionalRelevance: string;
}

export function getSensoryPerceptionExplanation(language: 'en' | 'ro' = 'ro'): SensoryPerceptionExplanation {
  if (language === 'en') {
    return {
      description: `The Sensory Perception Test evaluates your ability to process, integrate, and respond to sensory information from your environment. It measures four key dimensions that are crucial for professional performance in fields requiring high perceptual acuity.`,
      dimensions: {
        discriminare_vizuala: {
          name: 'Visual Discrimination',
          description: 'Ability to distinguish between visual stimuli and detect subtle differences',
          highTrait: 'Excellent visual acuity, notices fine details, good color discrimination',
          lowTrait: 'Basic visual processing, may miss subtle visual cues, standard perception'
        },
        procesare_auditiva: {
          name: 'Auditory Processing',
          description: 'Capacity to interpret and understand auditory information effectively',
          highTrait: 'Superior hearing discrimination, excellent sound localization, multi-stream processing',
          lowTrait: 'Standard auditory processing, may struggle in noisy environments, basic sound recognition'
        },
        integrare_multimodala: {
          name: 'Multimodal Integration',
          description: 'Ability to combine information from multiple sensory channels',
          highTrait: 'Excellent sensory integration, coordinated responses, adaptive processing',
          lowTrait: 'Basic sensory coordination, may rely on single sensory channels, standard integration'
        },
        atentie_perceptuala: {
          name: 'Perceptual Attention',
          description: 'Capacity for selective attention and sustained perceptual focus',
          highTrait: 'Superior attention control, excellent filtering, sustained vigilance',
          lowTrait: 'Standard attention span, basic filtering abilities, normal focus capacity'
        }
      },
      scoreRanges: [
        { range: '0-45%', label: 'Developing', variant: 'outline' },
        { range: '46-65%', label: 'Moderate', variant: 'secondary' },
        { range: '66-85%', label: 'High', variant: 'default' },
        { range: '86-100%', label: 'Exceptional', variant: 'default' }
      ],
      whatItMeans: 'Your sensory perception profile indicates how effectively you process environmental information. Higher scores suggest better performance in careers requiring perceptual precision.',
      professionalRelevance: 'These abilities are crucial for careers in healthcare, design, safety, transportation, and any field requiring attention to sensory details.'
    };
  } else {
    return {
      description: `Testul de Percepție Senzorială evaluează capacitatea ta de a procesa, integra și răspunde la informațiile senzoriale din mediul înconjurător. Măsoară patru dimensiuni cheie care sunt cruciale pentru performanța profesională în domeniile care necesită acuitate perceptuală ridicată.`,
      dimensions: {
        discriminare_vizuala: {
          name: 'Discriminare Vizuală',
          description: 'Abilitatea de a distinge între stimulii vizuali și de a detecta diferențe subtile',
          highTrait: 'Acuitate vizuală excelentă, observă detalii fine, discriminare bună a culorilor',
          lowTrait: 'Procesare vizuală de bază, poate pierde indicii vizuale subtili, percepție standard'
        },
        procesare_auditiva: {
          name: 'Procesare Auditivă',
          description: 'Capacitatea de a interpreta și înțelege eficient informațiile auditive',
          highTrait: 'Discriminare auditivă superioară, localizare excelentă a sunetului, procesare multi-flux',
          lowTrait: 'Procesare auditivă standard, poate avea dificultăți în medii zgomotoase, recunoaștere de bază'
        },
        integrare_multimodala: {
          name: 'Integrare Multimodală',
          description: 'Abilitatea de a combina informații din multiple canale senzoriale',
          highTrait: 'Integrare senzorială excelentă, răspunsuri coordonate, procesare adaptivă',
          lowTrait: 'Coordonare senzorială de bază, poate să se bazeze pe canale senzoriale simple, integrare standard'
        },
        atentie_perceptuala: {
          name: 'Atenție Perceptuală',
          description: 'Capacitatea pentru atenție selectivă și focalizare perceptuală susținută',
          highTrait: 'Control superior al atenției, filtrare excelentă, vigilență susținută',
          lowTrait: 'Capacitate de atenție standard, abilități de filtrare de bază, capacitate normală de focalizare'
        }
      },
      scoreRanges: [
        { range: '0-45%', label: 'În dezvoltare', variant: 'outline' },
        { range: '46-65%', label: 'Moderat', variant: 'secondary' },
        { range: '66-85%', label: 'Ridicat', variant: 'default' },
        { range: '86-100%', label: 'Excepțional', variant: 'default' }
      ],
      whatItMeans: 'Profilul tău de percepție senzorială indică cât de eficient procesezi informațiile din mediu. Scorurile mai mari sugerează performanțe mai bune în carierele care necesită precizie perceptuală.',
      professionalRelevance: 'Aceste abilități sunt cruciale pentru carierele în sănătate, design, siguranță, transport și orice domeniu care necesită atenție la detaliile senzoriale.'
    };
  }
}

export const getDimensionExplanation = (testName: string, dimensionKey: string): string => {
  if (!testName.toLowerCase().includes('percep') && !testName.toLowerCase().includes('senzor')) {
    return `Dimensiunea ${dimensionKey} măsoară aspecte specifice ale percepției senzoriale.`;
  }
  
  const explanations: Record<string, string> = {
    discriminare_vizuala: 'Discriminarea vizuală măsoară capacitatea ta de a identifica diferențe subtile între stimulii vizuali, de a detecta detalii fine și de a procesa informațiile vizuale cu acuratețe. Această abilitate este esențială în domenii precum designul grafic, medicina, arhitectura și controlul calității.',
    procesare_auditiva: 'Procesarea auditivă evaluează abilitatea ta de a interpreta și înțelege informațiile sonore, inclusiv capacitatea de a distinge între sunete similare, de a localiza surse audio și de a procesa multiple fluxuri auditive simultan. Este crucială pentru muzică, interpretariat, logopedia și securitate.',
    integrare_multimodala: 'Integrarea multimodală măsoară capacitatea ta de a combina eficient informațiile de la diferite simțuri pentru a crea o imagine completă a mediului. Această abilitate este vitală pentru pilotaj, chirurgie, sport de performanță și activități care necesită coordonare complexă.',
    atentie_perceptuala: 'Atenția perceptuală evaluează capacitatea ta de a te concentra selectiv pe stimuli relevanți, de a filtra distractorii și de a menține vigilența pentru perioade extinse. Este esențială pentru controlul traficului, securitate, cercetare și orice activitate care necesită monitorizare atentă.'
  };
  
  return explanations[dimensionKey] || `Dimensiunea ${dimensionKey} este importantă pentru procesarea senzorială eficientă.`;
};
