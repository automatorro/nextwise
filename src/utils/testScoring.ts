
export function getScoreBadgeVariant(score: number, testName?: string): "default" | "secondary" | "destructive" | "outline" {
  const testKey = testName?.toLowerCase() || '';
  
  // Algoritm specific pentru GAD-7 (corectare critică!)
  if (testKey.includes('gad-7') || testKey.includes('anxietate')) {
    if (score >= 71) return "destructive"; // Severe anxiety
    if (score >= 48) return "outline";     // Moderate anxiety  
    if (score >= 24) return "secondary";   // Mild anxiety
    return "default";                      // Minimal anxiety
  }
  
  // Algoritm specific pentru PHQ-9 (depresie)
  if (testKey.includes('phq-9') || testKey.includes('depresie')) {
    if (score >= 80) return "destructive"; // Severe depression
    if (score >= 60) return "outline";     // Moderate depression
    if (score >= 40) return "secondary";   // Mild depression
    return "default";                      // Minimal depression
  }
  
  // Algoritm default pentru alte teste
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";  
  if (score >= 40) return "outline";
  return "destructive";
}

export function getScoreColor(score: number, testName?: string): string {
  const testKey = testName?.toLowerCase() || '';
  
  // Culori specifice pentru teste clinice (inversate!)
  if (testKey.includes('gad-7') || testKey.includes('anxietate') || 
      testKey.includes('phq-9') || testKey.includes('depresie')) {
    if (score >= 71) return "text-red-700";    // Severe
    if (score >= 48) return "text-orange-700"; // Moderate  
    if (score >= 24) return "text-yellow-700"; // Mild
    return "text-green-700";                   // Minimal
  }
  
  // Culori default pentru teste pozitive
  if (score >= 80) return "text-green-700";
  if (score >= 60) return "text-blue-700"; 
  if (score >= 40) return "text-gray-700";
  return "text-red-700";
}

export function getScoreInterpretation(score: number, testName?: string, language: 'en' | 'ro' = 'ro'): {
  level: string;
  description: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
} {
  const testKey = testName?.toLowerCase() || '';
  
  // CORECTARE CRITICĂ: Algoritm corect pentru GAD-7
  if (testKey.includes('gad-7') || testKey.includes('anxietate')) {
    if (language === 'en') {
      if (score >= 71) return {
        level: "Severe anxiety",
        description: "Significant anxiety symptoms that require professional attention",
        variant: "destructive"
      };
      if (score >= 48) return {
        level: "Moderate anxiety", 
        description: "Noticeable anxiety symptoms that may benefit from support",
        variant: "outline"
      };
      if (score >= 24) return {
        level: "Mild anxiety",
        description: "Some anxiety symptoms present but manageable",
        variant: "secondary"
      };
      return {
        level: "Minimal anxiety",
        description: "Very low levels of anxiety symptoms",
        variant: "default"
      };
    } else {
      if (score >= 71) return {
        level: "Anxietate severă",
        description: "Simptome semnificative de anxietate care necesită atenție profesională",
        variant: "destructive"
      };
      if (score >= 48) return {
        level: "Anxietate moderată", 
        description: "Simptome notabile de anxietate care ar putea beneficia de suport",
        variant: "outline"
      };
      if (score >= 24) return {
        level: "Anxietate ușoară",
        description: "Simptome de anxietate prezente dar gestionabile",
        variant: "secondary"
      };
      return {
        level: "Anxietate minimă",
        description: "Nivele foarte scăzute de simptome de anxietate",
        variant: "default"
      };
    }
  }
  
  // Algoritm similar pentru PHQ-9 (depresie)
  if (testKey.includes('phq-9') || testKey.includes('depresie')) {
    if (language === 'en') {
      if (score >= 80) return {
        level: "Severe depression",
        description: "Significant depressive symptoms requiring professional care",
        variant: "destructive"
      };
      if (score >= 60) return {
        level: "Moderate depression", 
        description: "Notable depressive symptoms that may need support",
        variant: "outline"
      };
      if (score >= 40) return {
        level: "Mild depression",
        description: "Some depressive symptoms present",
        variant: "secondary"
      };
      return {
        level: "Minimal depression",
        description: "Very low levels of depressive symptoms",
        variant: "default"
      };
    } else {
      if (score >= 80) return {
        level: "Depresie severă",
        description: "Simptome semnificative de depresie care necesită îngrijire profesională",
        variant: "destructive"
      };
      if (score >= 60) return {
        level: "Depresie moderată", 
        description: "Simptome notabile de depresie care ar putea necesita suport",
        variant: "outline"
      };
      if (score >= 40) return {
        level: "Depresie ușoară",
        description: "Simptome de depresie prezente",
        variant: "secondary"
      };
      return {
        level: "Depresie minimă",
        description: "Nivele foarte scăzute de simptome depresive",
        variant: "default"
      };
    }
  }
  
  // Algoritm pentru teste cognitive
  if (testKey.includes('aptitudini cognitive')) {
    if (language === 'en') {
      if (score >= 80) return {
        level: "Excellent",
        description: "Very well-developed cognitive abilities",
        variant: "default"
      };
      if (score >= 60) return {
        level: "Good", 
        description: "Above average cognitive abilities",
        variant: "secondary"
      };
      if (score >= 40) return {
        level: "Average",
        description: "Cognitive abilities within normal limits", 
        variant: "outline"
      };
      if (score >= 20) return {
        level: "Below average",
        description: "Cognitive abilities that need development",
        variant: "outline"
      };
      return {
        level: "Low",
        description: "Cognitive abilities that require special attention",
        variant: "destructive"
      };
    } else {
      if (score >= 80) return {
        level: "Excelent",
        description: "Abilități cognitive foarte dezvoltate",
        variant: "default"
      };
      if (score >= 60) return {
        level: "Bun", 
        description: "Abilități cognitive peste medie",
        variant: "secondary"
      };
      if (score >= 40) return {
        level: "Mediu",
        description: "Abilități cognitive în limitele normale", 
        variant: "outline"
      };
      if (score >= 20) return {
        level: "Sub mediu",
        description: "Abilități cognitive care necesită dezvoltare",
        variant: "outline"
      };
      return {
        level: "Scăzut",
        description: "Abilități cognitive care necesită atenție specială",
        variant: "destructive"
      };
    }
  }
  
  // Default interpretation for other tests
  if (language === 'en') {
    if (score >= 80) return {
      level: "Very high",
      description: "Excellent score on this test",
      variant: "default"
    };
    if (score >= 60) return {
      level: "High",
      description: "Good score on this test", 
      variant: "secondary"
    };
    if (score >= 40) return {
      level: "Moderate",
      description: "Score within normal limits",
      variant: "outline"
    };
    if (score >= 20) return {
      level: "Low", 
      description: "Below average score",
      variant: "outline"
    };
    return {
      level: "Very low",
      description: "Score that requires attention",
      variant: "destructive"
    };
  } else {
    if (score >= 80) return {
      level: "Foarte ridicat",
      description: "Scor excelent la acest test",
      variant: "default"
    };
    if (score >= 60) return {
      level: "Ridicat",
      description: "Scor bun la acest test", 
      variant: "secondary"
    };
    if (score >= 40) return {
      level: "Moderat",
      description: "Scor în limitele normale",
      variant: "outline"
    };
    if (score >= 20) return {
      level: "Scăzut", 
      description: "Scor sub medie",
      variant: "outline"
    };
    return {
      level: "Foarte scăzut",
      description: "Scor care necesită atenție",
      variant: "destructive"
    };
  }
}

export function getTestScoringExplanation(testName: string, language: 'en' | 'ro' = 'ro'): {
  description: string;
  scoreRanges?: Array<{
    range: string;
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  whatItMeans?: string;
} {
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
