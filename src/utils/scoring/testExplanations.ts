import { hexacoExplanations } from '../testSpecificExplanations/hexacoExplanations';
import { DISCExplanation, getDISCExplanation } from '../testSpecificExplanations/discExplanations';

export interface TestExplanation {
  description: string;
  scoreRanges: Array<{
    range: string;
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  whatItMeans: string;
}

export const getTestScoringExplanation = (testName: string): TestExplanation => {
  const normalizedTestName = testName.toLowerCase();

  if (normalizedTestName.includes('disc')) {
    const discExplanation: DISCExplanation = getDISCExplanation('ro');
    return {
      description: discExplanation.description,
      scoreRanges: discExplanation.scoreRanges,
      whatItMeans: discExplanation.whatItMeans
    };
  }
  
  if (normalizedTestName.includes('hexaco')) {
    return {
      description: 'Testul HEXACO evaluează șase dimensiuni principale ale personalității: Onestitate-Umilință, Emotivitate, Extraversiune, Agreabilitate, Conștiinciozitate și Deschidere către Experiență.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică profilul tău general HEXACO și punctele tale forte în diverse dimensiuni ale personalității.'
    };
  }
  
  if (normalizedTestName.includes('big five')) {
    return {
      description: 'Testul Big Five evaluează cinci dimensiuni principale ale personalității: Deschidere, Conștiinciozitate, Extraversiune, Agreabilitate și Nevrotism.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică profilul tău general Big Five și punctele tale forte în diverse dimensiuni ale personalității.'
    };
  }
  
  if (normalizedTestName.includes('holland')) {
    return {
      description: 'Testul Holland evaluează șase tipuri de interese vocaționale: Realist, Investigativ, Artistic, Social, Întreprinzător și Convențional.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică cele mai puternice interese vocaționale și domeniile în care ai putea excela.'
    };
  }
  
  if (normalizedTestName.includes('belbin')) {
    return {
      description: 'Testul Belbin evaluează rolurile tale preferate într-o echipă, identificând punctele tale forte și contribuțiile potențiale.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică rolurile în care ești cel mai eficient și cum poți contribui la succesul echipei.'
    };
  }
  
  if (normalizedTestName.includes('aptitudini cognitive')) {
    return {
      description: 'Testul de aptitudini cognitive evaluează abilitățile tale verbale, numerice, logice, spațiale și abstracte.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică punctele tale forte și domeniile în care poți îmbunătăți performanța cognitivă.'
    };
  }
  
  if (normalizedTestName.includes('inteligență emoțională')) {
    return {
      description: 'Testul de inteligență emoțională evaluează abilitățile tale de autocunoaștere, autoreglare, motivație, empatie și abilități sociale.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică nivelul tău de inteligență emoțională și domeniile în care poți dezvolta abilități emoționale mai puternice.'
    };
  }
  
  if (normalizedTestName.includes('competențe digitale')) {
    return {
      description: 'Testul de competențe digitale evaluează abilitățile tale de utilizare a tehnologiilor digitale, analiza datelor și adaptabilitate la noile tehnologii.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică nivelul tău de competențe digitale și domeniile în care poți îmbunătăți utilizarea tehnologiilor digitale.'
    };
  }
  
  if (normalizedTestName.includes('grupuri de cuvinte')) {
    return {
      description: 'Testul evaluează abilitatea ta de a identifica relații semantice și de a grupa cuvinte pe baza unor criterii logice.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică capacitatea ta de a analiza și organiza informații verbale.'
    };
  }
  
  if (normalizedTestName.includes('raționament logic')) {
    return {
      description: 'Testul evaluează abilitatea ta de a trage concluzii logice din informații prezentate sub formă de afirmații sau scenarii.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică capacitatea ta de a raționa logic și de a rezolva probleme complexe.'
    };
  }
  
  if (normalizedTestName.includes('atenție distributivă')) {
    return {
      description: 'Testul evaluează abilitatea ta de a gestiona și monitoriza mai multe sarcini sau informații simultan.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică capacitatea ta de a lucra eficient în medii complexe și solicitante.'
    };
  }
  
   if (normalizedTestName.includes('sjt') || normalizedTestName.includes('situational judgment') || normalizedTestName.includes('orientare') || normalizedTestName.includes('cariera')) {
    return {
      description: 'Testul de Judecată Situațională (SJT) evaluează modul în care reacționezi în diverse situații profesionale, oferind insight-uri despre stilul tău de lucru și valorile profesionale.',
      scoreRanges: [
        { range: '0-25%', label: 'Scăzut', variant: 'outline' },
        { range: '26-50%', label: 'Moderat', variant: 'secondary' },
        { range: '51-75%', label: 'Bun', variant: 'default' },
        { range: '76-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele tale indică profilul tău dominant și secundar, oferind o perspectivă asupra preferințelor tale în carieră.'
    };
  }
  
  if (normalizedTestName.includes('percep') && normalizedTestName.includes('senzor')) {
    return {
      description: 'Testul de Percepție Senzorială evaluează patru dimensiuni ale procesării senzoriale: discriminarea vizuală, procesarea auditivă, integrarea multimodală și atenția perceptuală. Fiecare dimensiune este măsurată prin 8 întrebări cu scale Likert 1-5.',
      scoreRanges: [
        { range: '0-45%', label: 'În dezvoltare', variant: 'outline' },
        { range: '46-65%', label: 'Moderat', variant: 'secondary' },
        { range: '66-85%', label: 'Ridicat', variant: 'default' },
        { range: '86-100%', label: 'Excepțional', variant: 'default' }
      ],
      whatItMeans: 'Scorurile tale indică eficiența cu care procesezi informațiile senzoriale din mediu. Scorurile mai mari sugerează abilități perceptuale superioare, importante pentru cariere în medicină, design, siguranță și domenii tehnice.'
    };
  }

  return {
    description: 'Acest test evaluează abilități și preferințe specifice prin întrebări cu opțiuni multiple sau scale de evaluare.',
    scoreRanges: [
      { range: '0-25%', label: 'Scăzut', variant: 'outline' },
      { range: '26-50%', label: 'Moderat', variant: 'secondary' },
      { range: '51-75%', label: 'Bun', variant: 'default' },
      { range: '76-100%', label: 'Excelent', variant: 'default' }
    ],
    whatItMeans: 'Rezultatele tale oferă insight-uri valoroase despre profilul tău în domeniul evaluat.'
  };
};

export const getDimensionExplanation = (testName: string, dimensionKey: string): string => {
  const normalizedTestName = testName.toLowerCase();
  
  if (normalizedTestName.includes('hexaco')) {
    const explanation = hexacoExplanations.dimensions[dimensionKey];
    if (explanation) {
      return explanation.description;
    }
  }
  
  if (normalizedTestName.includes('big five')) {
    const labels: { [key: string]: string } = {
      openness: 'Deschidere către Experiență',
      conscientiousness: 'Conștiinciozitate',
      extraversion: 'Extraversiune',
      agreeableness: 'Agreabilitate',
      neuroticism: 'Nevrotism'
    };
    return `Dimensiunea ${labels[dimensionKey] || dimensionKey} măsoară aspecte specifice ale personalității tale.`;
  }
  
  if (normalizedTestName.includes('holland')) {
    const labels: { [key: string]: string } = {
      realistic: 'Realist',
      investigative: 'Investigativ',
      artistic: 'Artistic',
      social: 'Social',
      enterprising: 'Întreprinzător',
      conventional: 'Convențional'
    };
    return `Dimensiunea ${labels[dimensionKey] || dimensionKey} măsoară interesele tale vocaționale specifice.`;
  }
  
  if (normalizedTestName.includes('belbin')) {
    const labels: { [key: string]: string } = {
      plant: 'Plant',
      resource_investigator: 'Resource Investigator',
      coordinator: 'Coordinator',
      shaper: 'Shaper',
      monitor_evaluator: 'Monitor Evaluator',
      teamworker: 'Teamworker',
      implementer: 'Implementer',
      completer_finisher: 'Completer Finisher',
      specialist: 'Specialist'
    };
    return `Rolul ${labels[dimensionKey] || dimensionKey} descrie contribuția ta preferată într-o echipă.`;
  }
  
  if (normalizedTestName.includes('aptitudini cognitive')) {
    const labels: { [key: string]: string } = {
      verbal: 'Verbal',
      numeric: 'Numeric',
      logic: 'Logic',
      spatial: 'Spațial',
      abstract: 'Abstract'
    };
    return `Aptitudinea ${labels[dimensionKey] || dimensionKey} măsoară capacitatea ta de a rezolva probleme specifice.`;
  }
  
  if (normalizedTestName.includes('inteligență emoțională')) {
    const labels: { [key: string]: string } = {
      self_awareness: 'Autocunoaștere',
      self_regulation: 'Autoreglare',
      motivation: 'Motivație',
      empathy: 'Empatie',
      social_skills: 'Abilități Sociale'
    };
    return `Abilitatea ${labels[dimensionKey] || dimensionKey} descrie aspecte ale inteligenței tale emoționale.`;
  }
  
  if (normalizedTestName.includes('competențe digitale')) {
    const labels: { [key: string]: string } = {
      digital_literacy: 'Alfabetizare Digitală',
      data_analysis: 'Analiza Datelor',
      adaptability: 'Adaptabilitate'
    };
    return `Competența ${labels[dimensionKey] || dimensionKey} măsoară aspecte ale competențelor tale digitale.`;
  }
  
  if (normalizedTestName.includes('percep') && normalizedTestName.includes('senzor')) {
    const explanations: Record<string, string> = {
      discriminare_vizuala: 'Discriminarea vizuală măsoară capacitatea ta de a identifica diferențe subtile între stimulii vizuali, de a detecta detalii fine și de a procesa informațiile vizuale cu acuratețe. Această abilitate este esențială în domenii precum designul grafic, medicina, arhitectura și controlul calității.',
      procesare_auditiva: 'Procesarea auditivă evaluează abilitatea ta de a interpreta și înțelege informațiile sonore, inclusiv capacitatea de a distinge între sunete similare, de a localiza surse audio și de a procesa multiple fluxuri auditive simultan. Este crucială pentru muzică, interpretariat, logopedia și securitate.',
      integrare_multimodala: 'Integrarea multimodală măsoară capacitatea ta de a combina eficient informațiile de la diferite simțuri pentru a crea o imagine completă a mediului. Această abilitate este vitală pentru pilotaj, chirurgie, sport de performanță și activități care necesită coordonare complexă.',
      atentie_perceptuala: 'Atenția perceptuală evaluează capacitatea ta de a te concentra selectiv pe stimuli relevanți, de a filtra distractorii și de a menține vigilența pentru perioade extinse. Este esențială pentru controlul traficului, securitate, cercetare și orice activitate care necesită monitorizare atentă.'
    };
    
    return explanations[dimensionKey] || `Dimensiunea ${dimensionKey} este importantă pentru procesarea senzorială eficientă.`;
  }
  
  return `Această dimensiune măsoară aspecte specifice relevante pentru ${testName}.`;
};
