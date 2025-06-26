
export function getScoreBadgeVariant(score: number, testName?: string): "default" | "secondary" | "destructive" | "outline" {
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";  
  if (score >= 40) return "outline";
  return "destructive";
}

export function getScoreColor(score: number, testName?: string): string {
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
