
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
  
  return [];
}
