
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

export function getScoreInterpretation(score: number, testName?: string): {
  level: string;
  description: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
} {
  const testKey = testName?.toLowerCase() || '';
  
  if (testKey.includes('aptitudini cognitive')) {
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
  
  // Default interpretation for other tests
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

export function getTestScoringExplanation(testName: string): {
  description: string;
  scoreRanges?: Array<{
    range: string;
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  whatItMeans?: string;
} {
  switch (testName.toLowerCase()) {
    case 'big five personalitate':
      return {
        description: `Testul Big Five măsoară cinci dimensiuni fundamentale ale personalității: Deschiderea la experiență, Conștiinciozitatea, Extraversia, Agreabilitatea și Neuroticismul. Fiecare dimensiune este evaluată pe o scală de la 1 la 100, unde scorurile mai mari indică o prezență mai puternică a trăsăturii respective.`,
        scoreRanges: [
          { range: '0-39%', label: 'Scăzut', variant: 'outline' },
          { range: '40-69%', label: 'Moderat', variant: 'secondary' },
          { range: '70-100%', label: 'Ridicat', variant: 'default' }
        ],
        whatItMeans: 'Rezultatele oferă o perspectivă asupra caracteristicilor tale de personalitate și pot fi folosite pentru dezvoltare personală și profesională.'
      };
    
    case 'test inteligență emoțională eq':
      return {
        description: `Testul de Inteligență Emoțională evaluează capacitatea de a recognoaște, înțelege și gestiona emoțiile proprii și ale celorlalți. Scorurile se interpretează astfel: 80-100% = Foarte ridicat, 60-79% = Ridicat, 40-59% = Moderat, 20-39% = Scăzut, 0-19% = Foarte scăzut.`,
        scoreRanges: [
          { range: '0-19%', label: 'Foarte scăzut', variant: 'destructive' },
          { range: '20-39%', label: 'Scăzut', variant: 'outline' },
          { range: '40-59%', label: 'Moderat', variant: 'secondary' },
          { range: '60-79%', label: 'Ridicat', variant: 'default' },
          { range: '80-100%', label: 'Foarte ridicat', variant: 'default' }
        ],
        whatItMeans: 'Inteligența emoțională este crucială pentru succesul în relații și carieră.'
      };
    
    case 'test aptitudini cognitive':
      return {
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
    
    default:
      return {
        description: `Acest test psihologic a fost conceput pentru a evalua diverse aspecte ale personalității și comportamentului. Rezultatele oferă o perspectivă asupra caracteristicilor tale psihologice și pot fi folosite pentru dezvoltare personală și profesională.`,
        scoreRanges: [
          { range: '0-39%', label: 'Scăzut', variant: 'outline' },
          { range: '40-69%', label: 'Moderat', variant: 'secondary' },
          { range: '70-100%', label: 'Ridicat', variant: 'default' }
        ]
      };
  }
}
