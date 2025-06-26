
interface TestExplanation {
  description: string;
  scoreRanges?: Array<{
    range: string;
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  whatItMeans?: string;
}

export function getTestScoringExplanation(testName: string, language: 'en' | 'ro' = 'ro'): TestExplanation {
  const testKey = testName.toLowerCase();
  
  // CORECTARE CRITICĂ: Explicație corectă pentru GAD-7
  if (testKey.includes('gad-7') || testKey.includes('anxietate')) {
    return language === 'en' ? {
      description: `GAD-7 (Generalized Anxiety Disorder scale) measures anxiety symptoms over the past two weeks. Scores range from 0-21, with higher scores indicating more severe anxiety symptoms that may require professional attention.`,
      scoreRanges: [
        { range: '0-23%', label: 'Minimal', variant: 'default' },
        { range: '24-47%', label: 'Mild', variant: 'secondary' },
        { range: '48-70%', label: 'Moderate', variant: 'outline' },
        { range: '71-100%', label: 'Severe', variant: 'destructive' }
      ],
      whatItMeans: 'Higher scores indicate more significant anxiety symptoms. Scores above 70% suggest seeking professional support may be beneficial.'
    } : {
      description: `GAD-7 (Scala Tulburării de Anxietate Generalizată) măsoară simptomele de anxietate din ultimele două săptămâni. Scorurile variază de la 0-21, unde scoruri mai mari indică simptome de anxietate mai severe care pot necesita atenție profesională.`,
      scoreRanges: [
        { range: '0-23%', label: 'Minimal', variant: 'default' },
        { range: '24-47%', label: 'Ușor', variant: 'secondary' },
        { range: '48-70%', label: 'Moderat', variant: 'outline' },
        { range: '71-100%', label: 'Sever', variant: 'destructive' }
      ],
      whatItMeans: 'Scorurile mai mari indică simptome de anxietate mai semnificative. Scorurile peste 70% sugerează că ar putea fi benefic să cauți sprijin profesional.'
    };
  }
  
  if (testKey.includes('big five')) {
    return language === 'en' ? {
      description: `The Big Five test measures five fundamental personality dimensions: Openness to Experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Each dimension is rated on a scale from 1 to 100, where higher scores indicate a stronger presence of that trait.`,
      scoreRanges: [
        { range: '0-39%', label: 'Low', variant: 'outline' },
        { range: '40-69%', label: 'Moderate', variant: 'secondary' },
        { range: '70-100%', label: 'High', variant: 'default' }
      ],
      whatItMeans: 'The results provide insight into your personality characteristics and can be used for personal and professional development.'
    } : {
      description: `Testul Big Five măsoară cinci dimensiuni fundamentale ale personalității: Deschiderea la experiență, Conștiinciozitatea, Extraversia, Agreabilitatea și Neuroticismul. Fiecare dimensiune este evaluată pe o scală de la 1 la 100, unde scorurile mai mari indică o prezență mai puternică a trăsăturii respective.`,
      scoreRanges: [
        { range: '0-39%', label: 'Scăzut', variant: 'outline' },
        { range: '40-69%', label: 'Moderat', variant: 'secondary' },
        { range: '70-100%', label: 'Ridicat', variant: 'default' }
      ],
      whatItMeans: 'Rezultatele oferă o perspectivă asupra caracteristicilor tale de personalitate și pot fi folosite pentru dezvoltare personală și profesională.'
    };
  }
  
  if (testKey.includes('aptitudini cognitive')) {
    return language === 'en' ? {
      description: `The Cognitive Abilities Test evaluates five fundamental types of reasoning: verbal, numerical, logical, spatial, and abstract. The test contains 40 questions (8 per dimension) and measures mental processing capacity and problem-solving skills.`,
      scoreRanges: [
        { range: '0-19%', label: 'Low', variant: 'destructive' },
        { range: '20-39%', label: 'Below average', variant: 'outline' },
        { range: '40-59%', label: 'Average', variant: 'secondary' },
        { range: '60-79%', label: 'Good', variant: 'default' },
        { range: '80-100%', label: 'Excellent', variant: 'default' }
      ],
      whatItMeans: 'Cognitive abilities are fundamental for learning, problem-solving, and adapting to new situations.'
    } : {
      description: `Testul de Aptitudini Cognitive evaluează cinci tipuri fundamentale de raționament: verbal, numeric, logic, spațial și abstract. Testul conține 40 de întrebări (8 per dimensiune) și măsoară capacitatea de procesare mentală și rezolvare de probleme.`,
      scoreRanges: [
        { range: '0-19%', label: 'Scăzut', variant: 'destructive' },
        { range: '20-39%', label: 'Sub mediu', variant: 'outline' },
        { range: '40-59%', label: 'Mediu', variant: 'secondary' },
        { range: '60-79%', label: 'Bun', variant: 'default' },
        { range: '80-100%', label: 'Excelent', variant: 'default' }
      ],
      whatItMeans: 'Aptitudinile cognitive sunt fundamentale pentru învățare, rezolvarea problemelor și adaptarea la situații noi.'
    };
  }
  
  // Default explanation
  return language === 'en' ? {
    description: `This psychological test was designed to evaluate various aspects of personality and behavior. The results provide insight into your psychological characteristics and can be used for personal and professional development.`,
    scoreRanges: [
      { range: '0-39%', label: 'Low', variant: 'outline' },
      { range: '40-69%', label: 'Moderate', variant: 'secondary' },
      { range: '70-100%', label: 'High', variant: 'default' }
    ]
  } : {
    description: `Acest test psihologic a fost conceput pentru a evalua diverse aspecte ale personalității și comportamentului. Rezultatele oferă o perspectivă asupra caracteristicilor tale psihologice și pot fi folosite pentru dezvoltare personală și profesională.`,
    scoreRanges: [
      { range: '0-39%', label: 'Scăzut', variant: 'outline' },
      { range: '40-69%', label: 'Moderat', variant: 'secondary' },
      { range: '70-100%', label: 'Ridicat', variant: 'default' }
    ]
  };
}
