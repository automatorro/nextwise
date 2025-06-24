
import { TestResult } from '@/hooks/useTestResults';

export function getTestScoringExplanation(testName: string): string {
  switch (testName.toLowerCase()) {
    case 'big five personalitate':
      return `Testul Big Five măsoară cinci dimensiuni fundamentale ale personalității: Deschiderea la experiență, Conștiinciozitatea, Extraversia, Agreabilitatea și Neuroticismul. Fiecare dimensiune este evaluată pe o scală de la 1 la 100, unde scorurile mai mari indică o prezență mai puternică a trăsăturii respective.`;
    
    case 'test inteligență emoțională eq':
      return `Testul de Inteligență Emoțională evaluează capacitatea de a recognoaște, înțelege și gestiona emoțiile proprii și ale celorlalți. Scorurile se interpretează astfel: 80-100% = Foarte ridicat, 60-79% = Ridicat, 40-59% = Moderat, 20-39% = Scăzut, 0-19% = Foarte scăzut.`;
    
    case 'test aptitudini cognitive':
      return `Testul de Aptitudini Cognitive evaluează cinci tipuri fundamentale de raționament: verbal, numeric, logic, spațial și abstract. Testul conține 40 de întrebări (8 per dimensiune) și măsoară capacitatea de procesare mentală și rezolvare de probleme. Scorurile se interpretează ca procente: 80-100% = Excelent, 60-79% = Bun, 40-59% = Mediu, 20-39% = Sub mediu, 0-19% = Scăzut.`;
    
    default:
      return `Acest test psihologic a fost conceput pentru a evalua diverse aspecte ale personalității și comportamentului. Rezultatele oferă o perspectivă asupra caracteristicilor tale psihologice și pot fi folosite pentru dezvoltare personală și profesională.`;
  }
}

export function getDimensionExplanation(testName: string, dimensionKey: string): string {
  const testKey = testName.toLowerCase();
  
  if (testKey === 'big five personalitate') {
    switch (dimensionKey) {
      case 'openness':
        return 'Deschiderea la experiență reflectă curiozitatea intelectuală, creativitatea și deschiderea către idei noi. Persoanele cu scoruri ridicate sunt imaginative, artistice și aventuroase.';
      case 'conscientiousness':
        return 'Conștiinciozitatea indică nivelul de organizare, disciplină și orientare către obiective. Persoanele conștiincioase sunt ordonate, punctuale și perseverente.';
      case 'extraversion':
        return 'Extraversia măsoară sociabilitatea, energia și tendința de a căuta stimulare din mediul extern. Extraveriții sunt vorbiți, asertivi și energici în interacțiunile sociale.';
      case 'agreeableness':
        return 'Agreabilitatea reflectă tendința de a fi cooperant, empatic și încrezător în relațiile cu ceilalți. Persoanele agreabile sunt altruiste, înțelegătoare și armonioase.';
      case 'neuroticism':
        return 'Neuroticismul indică instabilitatea emoțională și tendința de a experimenta emoții negative. Scoruri ridicate sugerează anxietate și mood variabil, scoruri scăzute indică stabilitate emoțională.';
      default:
        return 'Această dimensiune contribuie la profilul general de personalitate Big Five.';
    }
  }
  
  if (testKey === 'test aptitudini cognitive') {
    // First, convert numeric keys to meaningful dimension names
    const actualKey = getActualDimensionKey(dimensionKey);
    
    switch (actualKey) {
      case 'verbal':
        return 'Raționamentul verbal evaluează capacitatea de a înțelege și manipula informații prezentate în cuvinte. Include înțelegerea vocabularului, analogiilor și relațiilor semantice. Această abilitate este crucială pentru comunicare, lectură și învățare.';
      case 'numeric':
        return 'Raționamentul numeric măsoară capacitatea de a lucra cu numere, concepte matematice și relații cantitative. Include aritmetica, secvențele numerice și problemele matematice practice. Este esențial pentru carierele STEM și gestionarea financiară.';
      case 'logic':
        return 'Raționamentul logic evaluează capacitatea de a identifica modele, de a face deducții și de a rezolva probleme folosind reguli logice. Include silogisme, secvențe și relații cauză-efect. Este fundamental pentru gândirea critică și analiza.';
      case 'spatial':
        return 'Raționamentul spațial măsoară capacitatea de a vizualiza și manipula obiecte în spațiu. Include rotația mentală, percepția formelor și relațiile geometrice. Este crucial pentru domeniile inginerești, arhitecturii și artelor vizuale.';
      case 'abstract':
        return 'Raționamentul abstract evaluează capacitatea de a identifica modele complexe și de a gândi conceptual dincolo de informațiile concrete. Include recunoașterea tiparelor, analogiile și gândirea simbolică. Este esențial pentru inovație și rezolvarea creativă de probleme.';
      default:
        return 'Această dimensiune contribuie la evaluarea generală a aptitudinilor cognitive.';
    }
  }
  
  return 'Această dimensiune contribuie la profilul general al testului.';
}

function getActualDimensionKey(key: string): string {
  // Convert numeric dimension keys to meaningful names for cognitive abilities test
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
  if (score >= 80) return "default";    // Verde pentru scoruri foarte bune
  if (score >= 60) return "secondary";  // Albastru pentru scoruri bune  
  if (score >= 40) return "outline";    // Gri pentru scoruri medii
  return "destructive";                 // Roșu pentru scoruri scăzute
}

export function getScoreColor(score: number, testName?: string): string {
  if (score >= 80) return "text-green-700";
  if (score >= 60) return "text-blue-700"; 
  if (score >= 40) return "text-gray-700";
  return "text-red-700";
}

export function getScoreInterpretation(score: number, testName?: string): string {
  const testKey = testName?.toLowerCase() || '';
  
  if (testKey.includes('aptitudini cognitive')) {
    if (score >= 80) return "Excelent - Abilități cognitive foarte dezvoltate";
    if (score >= 60) return "Bun - Abilități cognitive peste medie";
    if (score >= 40) return "Mediu - Abilități cognitive în limitele normale";
    if (score >= 20) return "Sub mediu - Abilități cognitive care necesită dezvoltare";
    return "Scăzut - Abilități cognitive care necesită atenție specială";
  }
  
  // Default interpretation for other tests
  if (score >= 80) return "Scor foarte ridicat";
  if (score >= 60) return "Scor ridicat";
  if (score >= 40) return "Scor moderat";
  if (score >= 20) return "Scor scăzut";
  return "Scor foarte scăzut";
}

export function formatTestResults(testResult: TestResult) {
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
    interpretation: getScoreInterpretation(overall, testName),
    testName
  };
}
