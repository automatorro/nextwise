import { getGenericDimensionExplanation } from './scoreInterpretations';

interface ScoreRange {
  range: string;
  label: string;
  variant: 'default' | 'secondary' | 'outline' | 'destructive';
}

interface TestScoringExplanation {
  description: string;
  scoreRanges?: ScoreRange[];
  whatItMeans?: string;
}

// SJT-specific dimension explanations
const getSJTDimensionExplanation = (dimensionKey: string): string => {
  const explanations: { [key: string]: string } = {
    leadership: 'Această dimensiune evaluează capacitatea ta de a conduce echipe, de a lua decizii importante și de a inspira alții în situații profesionale complexe.',
    communication: 'Măsoară abilitățile tale de comunicare eficientă, ascultare activă și capacitatea de a transmite mesaje clare în diverse contexte profesionale.',
    teamwork: 'Evaluează capacitatea ta de a colabora eficient cu ceilalți, de a contribui la obiectivele echipei și de a menține relații profesionale constructive.',
    problem_solving: 'Această dimensiune măsoară abilitățile tale de analiză, gândire critică și capacitatea de a găsi soluții creative la probleme complexe.',
    adaptability: 'Evaluează flexibilitatea ta în fața schimbărilor, capacitatea de a învăța rapid și de a te adapta la noi situații și cerințe profesionale.',
    decision_making: 'Măsoară capacitatea ta de a lua decizii informate și eficiente, de a evalua opțiunile disponibile și de a acționa decisiv când este necesar.',
    stress_management: 'Evaluează capacitatea ta de a funcționa eficient sub presiune, de a gestiona stresul și de a menține performanța în situații dificile.',
    customer_service: 'Această dimensiune măsoară abilitățile tale de a interacționa cu clienții, de a răspunde la nevoile lor și de a oferi servicii de calitate.',
    ethics: 'Evaluează capacitatea ta de a lua decizii etice, de a respecta valorile organizaționale și de a acționa cu integritate în situații profesionale.',
    innovation: 'Măsoară capacitatea ta de a gândi creativ, de a propune idei noi și de a contribui la inovația în mediul de lucru.',
    time_management: 'Evaluează abilitățile tale de organizare, prioritizare și gestionare eficientă a timpului pentru îndeplinirea sarcinilor.',
    conflict_resolution: 'Această dimensiune măsoară capacitatea ta de a identifica, aborda și rezolva conflictele într-un mod constructiv și profesional.'
  };
  
  return explanations[dimensionKey] || `Această dimensiune evaluează aspecte importante ale performanței tale profesionale în contextul ${dimensionKey}.`;
};

export const getDimensionExplanation = (testName: string, dimensionKey: string): string => {
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('sjt') || testKey.includes('situational judgment') || 
      testKey.includes('orientare') || testKey.includes('cariera')) {
    return getSJTDimensionExplanation(dimensionKey);
  }
  
  // For other tests, use the generic explanation
  return getGenericDimensionExplanation(dimensionKey);
};

export const getTestScoringExplanation = (testName: string): TestScoringExplanation => {
  const normalizedName = testName.toLowerCase();
  
  if (normalizedName.includes('sjt') || normalizedName.includes('situational judgment') || 
      normalizedName.includes('orientare') || normalizedName.includes('cariera')) {
    return {
      description: 'Testul de Evaluare Situațională (SJT) măsoară capacitatea ta de a lua decizii eficiente în diverse situații profesionale. Testul evaluează cum reacționezi la scenarii realiste din mediul de lucru și identifică punctele tale forte în diferite competențe profesionale.',
      scoreRanges: [
        { range: '0-39%', label: 'Dezvoltare necesară', variant: 'outline' as const },
        { range: '40-69%', label: 'Competență moderată', variant: 'secondary' as const },
        { range: '70-100%', label: 'Competență ridicată', variant: 'default' as const }
      ],
      whatItMeans: 'Scorurile tale SJT reflectă modul în care abordezi situații profesionale complexe. Competențele cu scoruri ridicate reprezintă punctele tale forte, în timp ce cele cu scoruri mai scăzute indică zone de dezvoltare. Aceste rezultate te pot ajuta să înțelegi mai bine stilul tău de lucru și să identifici oportunități de creștere profesională.'
    };
  }
  
  if (normalizedName.includes('big five') || normalizedName.includes('big-five')) {
    return {
      description: 'Testul Big Five evaluează personalitatea pe cinci dimensiuni fundamentale: Extraversiune, Agreabilitate, Conștiinciozitate, Neuroticism și Deschidere către experiență. Acest test oferă o perspectivă generală asupra trăsăturilor tale de personalitate.',
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' as const },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' as const },
        { range: '70-100%', label: 'Ridicat', variant: 'default' as const }
      ],
      whatItMeans: 'Scorul tău Big Five îți arată cum te poziționezi pe cele cinci dimensiuni principale ale personalității. Aceste informații te pot ajuta să înțelegi mai bine cum interacționezi cu ceilalți și cum abordezi diverse situații din viață.'
    };
  }
  
  if (normalizedName.includes('cattell') || normalizedName.includes('16pf')) {
    return {
      description: 'Testul Cattell 16PF evaluează 16 factori primari de personalitate, oferind o analiză detaliată a trăsăturilor tale de personalitate. Acest test este utilizat în diverse contexte, inclusiv consiliere vocațională și dezvoltare personală.',
      scoreRanges: [
        { range: '1-3', label: 'Scăzut', variant: 'outline' as const },
        { range: '4-7', label: 'Mediu', variant: 'secondary' as const },
        { range: '8-10', label: 'Ridicat', variant: 'default' as const }
      ],
      whatItMeans: 'Scorul tău Cattell 16PF îți oferă o perspectivă detaliată asupra celor 16 factori primari de personalitate. Aceste informații te pot ajuta să înțelegi mai bine punctele tale forte și punctele slabe, precum și modul în care te comporți în diverse situații.'
    };
  }
  
  if (normalizedName.includes('hexaco')) {
    return {
      description: 'Testul HEXACO evaluează personalitatea pe 6 dimensiuni principale: Onestitate-Umilința, Emotivitate, Extraversiune, Agreabilitate, Conștiinciozitate și Deschidere către Experiență. Acest test oferă o perspectivă extinsă asupra personalității tale, inclusiv aspecte morale și emoționale.',
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' as const },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' as const },
        { range: '70-100%', label: 'Ridicat', variant: 'default' as const }
      ],
      whatItMeans: 'Rezultatele HEXACO îți arată cum te pozitionezi pe 6 dimensiuni fundamentale ale personalității. Fiecare dimensiune reflectă aspecte diferite ale comportamentului tău social, emoțional și moral. Aceste informații te pot ajuta să înțelegi mai bine cum interacționezi cu alții și cum abordezi diverse situații din viață.'
    };
  }
  
  if (normalizedName.includes('gad-7') || normalizedName.includes('anxietate')) {
    return {
      description: 'GAD-7 este un instrument de screening pentru anxietatea generalizată. Acesta evaluează nivelul de anxietate pe baza răspunsurilor tale la 7 întrebări. Este utilizat pentru a identifica posibile cazuri de anxietate și pentru a monitoriza evoluția simptomelor.',
      scoreRanges: [
        { range: '0-4', label: 'Minimă', variant: 'default' as const },
        { range: '5-9', label: 'Ușoară', variant: 'secondary' as const },
        { range: '10-14', label: 'Moderată', variant: 'outline' as const },
        { range: '15-21', label: 'Severă', variant: 'destructive' as const }
      ],
      whatItMeans: 'Scorul tău GAD-7 indică nivelul tău de anxietate generalizată. Un scor mai mare sugerează un nivel mai ridicat de anxietate și poate indica necesitatea de a căuta ajutor specializat.'
    };
  }
  
  if (normalizedName.includes('emotional') || normalizedName.includes('emotiona')) {
    return {
      description: 'Testul de Inteligență Emoțională evaluează capacitatea ta de a percepe, înțelege, gestiona și utiliza emoțiile. Acesta măsoară cinci componente principale: auto-conștientizare, auto-reglare, motivație, empatie și abilități sociale.',
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' as const },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' as const },
        { range: '70-100%', label: 'Ridicat', variant: 'default' as const }
      ],
      whatItMeans: 'Scorul tău de Inteligență Emoțională îți arată cât de bine te descurci în gestionarea emoțiilor tale și în interacțiunea cu ceilalți. Un scor mai mare sugerează o inteligență emoțională mai dezvoltată și abilități mai bune de a face față situațiilor dificile.'
    };
  }
  
  if (normalizedName.includes('enneagram')) {
    return {
      description: 'Testul Enneagram evaluează tipul tău de personalitate dominant, identificând motivațiile și fricile tale de bază. Acest test oferă o perspectivă asupra modului în care te percepi pe tine însuți și asupra modului în care interacționezi cu ceilalți.',
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' as const },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' as const },
        { range: '70-100%', label: 'Ridicat', variant: 'default' as const }
      ],
      whatItMeans: 'Rezultatele Enneagram îți arată care este tipul tău de personalitate dominant și cum te poziționezi pe cele nouă tipuri principale. Aceste informații te pot ajuta să înțelegi mai bine motivațiile și fricile tale de bază, precum și modul în care interacționezi cu ceilalți.'
    };
  }
  
  if (normalizedName.includes('leadership')) {
    return {
      description: 'Testul de Leadership evaluează competențele tale manageriale și capacitatea de a conduce o echipă. Acesta măsoară diverse aspecte ale leadership-ului, inclusiv viziune, comunicare, luarea deciziilor și gestionarea conflictelor.',
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' as const },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' as const },
        { range: '70-100%', label: 'Ridicat', variant: 'default' as const }
      ],
      whatItMeans: 'Scorul tău de Leadership îți arată cât de bine te descurci în rolul de lider și care sunt punctele tale forte și punctele slabe. Aceste informații te pot ajuta să-ți îmbunătățești abilitățile de leadership și să devii un lider mai eficient.'
    };
  }
  
  if (normalizedName.includes('stress') || normalizedName.includes('stresului')) {
    return {
      description: 'Testul de Gestionare a Stresului evaluează capacitatea ta de a face față presiunii și de a gestiona situațiile stresante. Acesta măsoară diverse aspecte ale gestionării stresului, inclusiv reziliența, optimismul și abilitățile de coping.',
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' as const },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' as const },
        { range: '70-100%', label: 'Ridicat', variant: 'default' as const }
      ],
      whatItMeans: 'Scorul tău de Gestionare a Stresului îți arată cât de bine te descurci în situații stresante și care sunt punctele tale forte și punctele slabe. Aceste informații te pot ajuta să-ți îmbunătățești abilitățile de gestionare a stresului și să devii mai rezilient.'
    };
  }
  
  if (normalizedName.includes('disc')) {
    return {
      description: 'Testul DISC evaluează stilul tău de comportament dominant, identificând trăsăturile tale principale în patru domenii: Dominanță, Influență, Stabilitate și Conștiinciozitate. Acest test oferă o perspectivă asupra modului în care preferi să interacționezi cu ceilalți și să abordezi diverse situații.',
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' as const },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' as const },
        { range: '70-100%', label: 'Ridicat', variant: 'default' as const }
      ],
      whatItMeans: 'Rezultatele DISC îți arată care este stilul tău de comportament dominant și cum te poziționezi pe cele patru dimensiuni principale. Aceste informații te pot ajuta să înțelegi mai bine cum comunici cu ceilalți și cum abordezi diverse situații din viață.'
    };
  }
  
  return {
    description: 'Acest test evaluează diverse aspecte ale personalității sau abilităților tale.',
    scoreRanges: [
      { range: '0-39%', label: 'Scăzut', variant: 'outline' as const },
      { range: '40-69%', label: 'Moderat', variant: 'secondary' as const },
      { range: '70-100%', label: 'Ridicat', variant: 'default' as const }
    ],
    whatItMeans: 'Scorul tău reflectă nivelul tău în domeniile evaluate de acest test.'
  };
};
