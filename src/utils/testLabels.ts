
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

  if (testKey.includes('holland') || testKey.includes('riasec') || testKey.includes('occupational themes')) {
    switch (dimensionKey) {
      case 'realistic':
        return 'Realistic (R)';
      case 'investigative':
        return 'Investigative (I)';
      case 'artistic':
        return 'Artistic (A)';
      case 'social':
        return 'Social (S)';
      case 'enterprising':
        return 'Enterprising (E)';
      case 'conventional':
        return 'Conventional (C)';
      default:
        return dimensionKey;
    }
  }

  if (testKey.includes('competențe digitale') || testKey.includes('competente digitale') || testKey.includes('digital')) {
    switch (dimensionKey) {
      case 'alfabetizare_digitala':
        return 'Alfabetizare Digitală';
      case 'comunicare_digitala':
        return 'Comunicare Digitală';
      case 'creare_continut':
        return 'Creare Conținut Digital';
      case 'siguranta_digitala':
        return 'Siguranță Digitală';
      case 'rezolvare_probleme':
        return 'Rezolvarea Problemelor Digitale';
      default:
        return dimensionKey;
    }
  }
  
  if (testKey === 'test aptitudini cognitive' || testKey.includes('aptitudini cognitive')) {
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

  if (testKey === 'roluri în echipă belbin' || testKey.includes('belbin')) {
    switch (dimensionKey) {
      case 'plant':
        return 'Plant (Creativul)';
      case 'resource_investigator':
        return 'Resource Investigator (Investigatorul)';
      case 'coordinator':
        return 'Coordinator (Coordonatorul)';
      case 'shaper':
        return 'Shaper (Modelatorul)';
      case 'monitor_evaluator':
        return 'Monitor Evaluator (Evaluatorul)';
      case 'teamworker':
        return 'Teamworker (Echipierul)';
      case 'implementer':
        return 'Implementer (Implementatorul)';
      case 'completer_finisher':
        return 'Completer Finisher (Finalizatorul)';
      case 'specialist':
        return 'Specialist (Specialistul)';
      default:
        return dimensionKey;
    }
  }
  
  return dimensionKey;
}

// Funcție helper pentru a determina dacă un test este de tip cognitive abilities
export function isCognitiveAbilitiesTest(testName: string): boolean {
  return testName.toLowerCase().includes('aptitudini cognitive');
}

// Funcție helper pentru a obține dimensiunile pentru un anumit tip de test
export function getTestDimensions(testName: string): string[] {
  const testKey = testName.toLowerCase();
  
  if (testKey === 'big five personalitate') {
    return ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
  }
  
  if (testKey === 'test aptitudini cognitive' || testKey.includes('aptitudini cognitive')) {
    return ['verbal', 'numeric', 'logic', 'spatial', 'abstract'];
  }

  if (testKey === 'roluri în echipă belbin' || testKey.includes('belbin')) {
    return ['plant', 'resource_investigator', 'coordinator', 'shaper', 'monitor_evaluator', 'teamworker', 'implementer', 'completer_finisher', 'specialist'];
  }

  if (testKey.includes('competențe digitale') || testKey.includes('competente digitale') || testKey.includes('digital')) {
    return ['alfabetizare_digitala', 'comunicare_digitala', 'creare_continut', 'siguranta_digitala', 'rezolvare_probleme'];
  }
  
  return [];
}

export function isBeckDepressionInventory(testName: string): boolean {
  return testName.toLowerCase().includes('beck') || 
         testName.toLowerCase().includes('depression') ||
         testName.toLowerCase().includes('bdi');
}

export function isBelbinTeamRoles(testName: string): boolean {
  return testName.toLowerCase().includes('belbin') ||
         testName.toLowerCase().includes('roluri în echipă');
}
