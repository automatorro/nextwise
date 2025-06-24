
import { TestResult } from '@/hooks/useTestResults';

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

export function getDimensionExplanation(testName: string, dimensionKey: string): {
  description: string;
  interpretations?: {
    high: string;
    low: string;
  };
  yourScore?: {
    high?: string;
    moderate?: string;
    low?: string;
  };
} {
  const testKey = testName.toLowerCase();
  
  if (testKey === 'big five personalitate') {
    switch (dimensionKey) {
      case 'openness':
        return {
          description: 'Deschiderea la experiență reflectă curiozitatea intelectuală, creativitatea și deschiderea către idei noi. Persoanele cu scoruri ridicate sunt imaginative, artistice și aventuroase.',
          interpretations: {
            high: 'Ești o persoană creativă, curioasă și deschisă la experiențe noi.',
            low: 'Preferi stabilitatea și rutina, fiind mai conservator în abordări.'
          }
        };
      case 'conscientiousness':
        return {
          description: 'Conștiinciozitatea indică nivelul de organizare, disciplină și orientare către obiective. Persoanele conștiincioase sunt ordonate, punctuale și perseverente.',
          interpretations: {
            high: 'Ești o persoană organizată, disciplinată și orientată către obiective.',
            low: 'Ești mai spontan și flexibil, dar poți avea provocări cu organizarea.'
          }
        };
      case 'extraversion':
        return {
          description: 'Extraversia măsoară sociabilitatea, energia și tendința de a căuta stimulare din mediul extern. Extraveriții sunt vorbiți, asertivi și energici în interacțiunile sociale.',
          interpretations: {
            high: 'Ești o persoană sociabilă, energică și confortabilă în grupuri.',
            low: 'Preferi interacțiunile mai intime și timpul petrecut singur pentru reîncărcare.'
          }
        };
      case 'agreeableness':
        return {
          description: 'Agreabilitatea reflectă tendința de a fi cooperant, empatic și încrezător în relațiile cu ceilalți. Persoanele agreabile sunt altruiste, înțelegătoare și armonioase.',
          interpretations: {
            high: 'Ești o persoană empatică, cooperantă și orientată către armonie.',
            low: 'Ești mai direct și competitiv, prioritizând obiectivitatea.'
          }
        };
      case 'neuroticism':
        return {
          description: 'Neuroticismul indică instabilitatea emoțională și tendința de a experimenta emoții negative. Scoruri ridicate sugerează anxietate și mood variabil, scoruri scăzute indică stabilitate emoțională.',
          interpretations: {
            high: 'Poți experimenta emoții intense, fiind important să dezvolți strategii de gestionare.',
            low: 'Ai o stabilitate emoțională bună și reziști bine la stres.'
          }
        };
      default:
        return {
          description: 'Această dimensiune contribuie la profilul general de personalitate Big Five.'
        };
    }
  }
  
  if (testKey === 'test aptitudini cognitive') {
    const actualKey = getActualDimensionKey(dimensionKey);
    
    switch (actualKey) {
      case 'verbal':
        return {
          description: 'Raționamentul verbal evaluează capacitatea de a înțelege și manipula informații prezentate în cuvinte. Include înțelegerea vocabularului, analogiilor și relațiilor semantice.',
          interpretations: {
            high: 'Ai abilități verbale excelente, fiind priceput la comunicare și înțelegerea textelor complexe.',
            low: 'Poți dezvolta aceste abilități prin lectură regulată și exerciții de vocabular.'
          }
        };
      case 'numeric':
        return {
          description: 'Raționamentul numeric măsoară capacitatea de a lucra cu numere, concepte matematice și relații cantitative. Include aritmetica, secvențele numerice și problemele matematice.',
          interpretations: {
            high: 'Ai abilități matematice puternice și poți rezolva probleme numerice complexe cu ușurință.',
            low: 'Poți îmbunătăți aceste abilități prin practică regulată și exerciții matematice.'
          }
        };
      case 'logic':
        return {
          description: 'Raționamentul logic evaluează capacitatea de a identifica modele, de a face deducții și de a rezolva probleme folosind reguli logice.',
          interpretations: {
            high: 'Ai abilități logice excelente și poți analiza situații complexe în mod sistematic.',
            low: 'Poți dezvolta gândirea logică prin exerciții de logică și rezolvarea de puzzle-uri.'
          }
        };
      case 'spatial':
        return {
          description: 'Raționamentul spațial măsoară capacitatea de a vizualiza și manipula obiecte în spațiu. Include rotația mentală și percepția formelor.',
          interpretations: {
            high: 'Ai abilități spațiale puternice, fiind priceput la vizualizarea și manipularea obiectelor.',
            low: 'Poți îmbunătăți aceste abilități prin exerciții de vizualizare și jocuri spațiale.'
          }
        };
      case 'abstract':
        return {
          description: 'Raționamentul abstract evaluează capacitatea de a identifica modele complexe și de a gândi conceptual dincolo de informațiile concrete.',
          interpretations: {
            high: 'Ai abilități abstracte excelente și poți identifica patterns și concepte complexe.',
            low: 'Poți dezvolta gândirea abstractă prin exerciții de recunoaștere a tiparelor.'
          }
        };
      default:
        return {
          description: 'Această dimensiune contribuie la evaluarea generală a aptitudinilor cognitive.'
        };
    }
  }
  
  return {
    description: 'Această dimensiune contribuie la profilul general al testului.'
  };
}

function getActualDimensionKey(key: string): string {
  const keyMap: { [key: string]: string } = {
    '0': 'verbal',
    '1': 'numeric', 
    '2': 'logic',
    '3': 'spatial',
    '4': 'abstract'
  };
  
  return keyMap[key] || key;
}

export function getDimensionLabel(testName: string, dimensionKey: string): string {
  const testKey = testName.toLowerCase();
  
  if (testKey === 'big five personalitate') {
    switch (dimensionKey) {
      case 'openness':
        return 'Deschidere la experiență';
      case 'conscientiousness':
        return 'Conștiinciozitate';
      case 'extraversion':
        return 'Extraversie';
      case 'agreeableness':
        return 'Agreabilitate';
      case 'neuroticism':
        return 'Neuroticismul';
      default:
        return dimensionKey;
    }
  }
  
  if (testKey === 'test aptitudini cognitive') {
    const actualKey = getActualDimensionKey(dimensionKey);
    
    switch (actualKey) {
      case 'verbal':
        return 'Raționament Verbal';
      case 'numeric':
        return 'Raționament Numeric';
      case 'logic':
        return 'Raționament Logic';
      case 'spatial':
        return 'Raționament Spațial';
      case 'abstract':
        return 'Raționament Abstract';
      default:
        return dimensionKey;
    }
  }
  
  return dimensionKey;
}

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

export function formatTestResults(testResult: any) {
  const { score, test_types } = testResult;
  
  if (!score || typeof score !== 'object') {
    return {
      overall: 0,
      dimensions: {},
      interpretation: 'Rezultate indisponibile'
    };
  }

  const testName = test_types?.name || '';
  const overall = score.overall || 0;
  const dimensions = score.dimensions || {};
  
  return {
    overall,
    dimensions,
    interpretation: getScoreInterpretation(overall, testName).description,
    testName
  };
}
