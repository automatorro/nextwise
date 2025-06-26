
interface ScoreInterpretation {
  level: string;
  description: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
}

export function getScoreInterpretation(score: number, testName?: string, language: 'en' | 'ro' = 'ro'): ScoreInterpretation {
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
