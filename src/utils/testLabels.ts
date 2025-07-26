export const getTestTypeLabel = (testTypeId: string): string => {
  const labels: { [key: string]: string } = {
    'f47ac10b-58cc-4372-a567-0e02b2c3d480': 'Big Five Personality Test',
    ' вашей UUID': 'DISC Assessment',
    '00000000-0000-0000-0000-000000000003': 'Watson-Glaser Critical Thinking Appraisal',
    '00000000-0000-0000-0000-000000000004': 'Holland Occupational Themes (RIASEC)',
    '00000000-0000-0000-0000-000000000005': 'Competențe Digitale & Analitice',
    '00000000-0000-0000-0000-000000000006': 'Inteligența Emoțională',
    '00000000-0000-0000-0000-000000000007': 'Test de Raționament Cognitiv',
    '00000000-0000-0000-0000-000000000008': 'Belbin Team Roles',
    '00000000-0000-0000-0000-000000000009': 'Cattell 16PF',
    '00000000-0000-0000-0000-000000000010': 'Enneagram Test',
    '00000000-0000-0000-0000-000000000011': 'Test de orientare profesională',
    '00000000-0000-0000-0000-000000000012': 'GAD-7 Anxietate',
    '00000000-0000-0000-0000-000000000013': 'PHQ-9 Depresie',
    '00000000-0000-0000-0000-000000000014': 'Test Percepție Senzorială',
    '00000000-0000-0000-0000-000000000015': 'Beck Depression Inventory'
  };
  return labels[testTypeId] || 'Unknown Test Type';
};

export const isCognitiveAbilitiesTest = (testName: string): boolean => {
  const normalizedTestName = testName.toLowerCase();
  return normalizedTestName.includes('raționament cognitiv') || normalizedTestName.includes('cognitive abilities');
};

export const isBelbinTeamRoles = (testName: string): boolean => {
  const normalizedTestName = testName.toLowerCase();
  return normalizedTestName.includes('belbin') && normalizedTestName.includes('team roles');
};

const formatDimensionKey = (dimensionKey: string): string => {
  return dimensionKey
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getDimensionLabel = (testName: string, dimensionKey: string): string => {
  const normalizedTestName = testName.toLowerCase();
  
  // Big Five Dimensions
  if (normalizedTestName.includes('big five')) {
    const bigFiveLabels: { [key: string]: string } = {
      openness: 'Deschidere către Experiență',
      conscientiousness: 'Conștiinciozitate',
      extraversion: 'Extraversiune',
      agreeableness: 'Agreabilitate',
      neuroticism: 'Nevrotism'
    };
    return bigFiveLabels[dimensionKey] || formatDimensionKey(dimensionKey);
  }
  
  // DISC Dimensions
  if (normalizedTestName.includes('disc')) {
    const discLabels: { [key: string]: string } = {
      dominance: 'Dominanță',
      influence: 'Influență',
      steadiness: 'Stabilitate',
      conscientiousness: 'Conștiinciozitate'
    };
    return discLabels[dimensionKey] || formatDimensionKey(dimensionKey);
  }
  
  // Holland RIASEC Dimensions
  if (normalizedTestName.includes('holland') || normalizedTestName.includes('riasec')) {
    const hollandLabels: { [key: string]: string } = {
      realistic: 'Realist',
      investigative: 'Investigativ',
      artistic: 'Artistic',
      social: 'Social',
      enterprising: 'Întreprinzător',
      conventional: 'Convențional'
    };
    return hollandLabels[dimensionKey] || formatDimensionKey(dimensionKey);
  }

  // Cognitive Abilities Dimensions
  if (normalizedTestName.includes('raționament cognitiv') || normalizedTestName.includes('cognitive abilities')) {
    const cognitiveLabels: { [key: string]: string } = {
      verbal: 'Verbal',
      numeric: 'Numeric',
      logic: 'Logic',
      spatial: 'Spațial',
      abstract: 'Abstract'
    };
    return cognitiveLabels[dimensionKey] || formatDimensionKey(dimensionKey);
  }

  // Belbin Team Roles
  if (normalizedTestName.includes('belbin') && normalizedTestName.includes('team roles')) {
    const belbinLabels: { [key: string]: string } = {
      plant: 'Plant',
      resource_investigator: 'Resource Investigator',
      coordinator: 'Coordinator',
      shaper: 'Shaper',
      monitor_evaluator: 'Monitor Evaluator',
      teamworker: 'Teamworker',
      implementer: 'Implementer',
      completer_finisher: 'Completer Finisher',
      specialist: 'Specialist'
    };
    return belbinLabels[dimensionKey] || formatDimensionKey(dimensionKey);
  }

  // Cattell 16PF
  if (normalizedTestName.includes('cattell') || normalizedTestName.includes('16pf')) {
    const cattellLabels: { [key: string]: string } = {
      warmth: 'Warmth',
      reasoning: 'Reasoning',
      emotional_stability: 'Emotional Stability',
      dominance: 'Dominance',
      liveliness: 'Liveliness',
      rule_consciousness: 'Rule-Consciousness',
      social_boldness: 'Social Boldness',
      sensitivity: 'Sensitivity',
      vigilance: 'Vigilance',
      abstractedness: 'Abstractedness',
      privateness: 'Privateness',
      apprehension: 'Apprehension',
      openness_to_change: 'Openness to Change',
      self_reliance: 'Self-Reliance',
      perfectionism: 'Perfectionism',
      tension: 'Tension'
    };
    return cattellLabels[dimensionKey] || formatDimensionKey(dimensionKey);
  }

  // Enneagram Test
  if (normalizedTestName.includes('enneagram')) {
    const enneagramLabels: { [key: string]: string } = {
      type1: 'Tipul 1 - Reformatorul',
      type2: 'Tipul 2 - Ajutătorul',
      type3: 'Tipul 3 - Realizatorul',
      type4: 'Tipul 4 - Individualistul',
      type5: 'Tipul 5 - Investigatorul',
      type6: 'Tipul 6 - Loialistul',
      type7: 'Tipul 7 - Entuziastul',
      type8: 'Tipul 8 - Provocatorul',
      type9: 'Tipul 9 - Mediatorul'
    };
    return enneagramLabels[dimensionKey] || formatDimensionKey(dimensionKey);
  }

  // SJT Career Test
  if (normalizedTestName.includes('sjt') || normalizedTestName.includes('situational judgment') || normalizedTestName.includes('orientare') || normalizedTestName.includes('cariera')) {
    const sjtLabels: { [key: string]: string } = {
      leadership: 'Leadership',
      communication: 'Comunicare',
      teamwork: 'Lucru în echipă',
      problem_solving: 'Rezolvarea problemelor',
      adaptability: 'Adaptabilitate',
      decision_making: 'Luarea deciziilor',
      stress_management: 'Gestionarea stresului',
      customer_service: 'Servicii pentru clienți',
      ethics: 'Etică',
      innovation: 'Inovație',
      time_management: 'Gestionarea timpului',
      conflict_resolution: 'Rezolvarea conflictelor'
    };
    return sjtLabels[dimensionKey] || formatDimensionKey(dimensionKey);
  }
  
  // Sensory Perception Test
  if (normalizedTestName.includes('percep') && normalizedTestName.includes('senzor')) {
    const sensoryLabels: { [key: string]: string } = {
      discriminare_vizuala: 'Discriminare Vizuală',
      procesare_auditiva: 'Procesare Auditivă', 
      integrare_multimodala: 'Integrare Multimodală',
      atentie_perceptuala: 'Atenție Perceptuală'
    };
    return sensoryLabels[dimensionKey] || formatDimensionKey(dimensionKey);
  }
  
  // Default formatting
  
  return formatDimensionKey(dimensionKey);
};
