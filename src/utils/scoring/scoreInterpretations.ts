export const getGADInterpretation = (score: number): string => {
  if (score >= 15) return 'Simptome severe de anxietate - Se recomandă consult medical';
  if (score >= 10) return 'Simptome moderate de anxietate - Ia în considerare consiliere sau terapie';
  if (score >= 5) return 'Simptome ușoare de anxietate - Monitorizează și aplică tehnici de relaxare';
  return 'Simptome minime de anxietate - Menține un stil de viață sănătos';
};

export const getPHQInterpretation = (score: number): string => {
  if (score >= 20) return 'Simptome severe de depresie - Consult medical urgent';
  if (score >= 15) return 'Simptome moderate de depresie - Ia în considerare consiliere sau tratament';
  if (score >= 10) return 'Simptome ușoare de depresie - Monitorizează și caută suport emoțional';
  if (score >= 5) return 'Simptome minime de depresie - Menține activități pozitive și sociale';
  return 'Fără simptome depresive semnificative - Continuă cu un stil de viață echilibrat';
};

export const getPersonalityInterpretation = (score: number): string => {
  if (score >= 80) return 'Personalitate puternic definită - Puncte forte clare și abilități bine dezvoltate';
  if (score >= 65) return 'Personalitate echilibrată - Abilități solide cu potențial de creștere';
  if (score >= 50) return 'Personalitate moderată - Oportunități de dezvoltare și explorare';
  if (score >= 35) return 'Personalitate în formare - Necesită explorare și dezvoltare personală';
  return 'Personalitate în dezvoltare - Se recomandă focus pe autocunoaștere și dezvoltare';
};

export const getCognitiveInterpretation = (score: number): string => {
  if (score >= 80) return 'Aptitudini cognitive foarte dezvoltate - Performanță excelentă în toate domeniile';
  if (score >= 65) return 'Aptitudini cognitive bune - Performanță solidă cu puncte forte în anumite domenii';
  if (score >= 50) return 'Aptitudini cognitive moderate - Oportunități de îmbunătățire în mai multe domenii';
  if (score >= 35) return 'Aptitudini cognitive în dezvoltare - Se recomandă antrenament suplimentar';
  return 'Aptitudini cognitive de bază - Necesită antrenament specific și suport';
};

export const getEmotionalIntelligenceInterpretation = (score: number): string => {
  if (score >= 80) return 'Inteligență emoțională foarte dezvoltată - Excelente abilități de management emoțional';
  if (score >= 65) return 'Inteligență emoțională bună - Abilități solide cu oportunități de îmbunătățire';
  if (score >= 50) return 'Inteligență emoțională moderată - Necesită dezvoltare în mai multe domenii';
  if (score >= 35) return 'Inteligență emoțională în dezvoltare - Se recomandă focus pe dezvoltarea abilităților emoționale';
  return 'Inteligență emoțională de bază - Necesită suport și antrenament specific';
};

export const getScoreInterpretation = (score: number, testName: string): string => {
  const normalizedTestName = testName.toLowerCase();
  
  // Clinical tests (GAD-7, PHQ-9, etc.)
  if (normalizedTestName.includes('gad-7') || normalizedTestName.includes('anxietate')) {
    return getGADInterpretation(score);
  }
  
  if (normalizedTestName.includes('phq-9') || normalizedTestName.includes('depresie')) {
    return getPHQInterpretation(score);
  }
  
  // HEXACO specific interpretations
  if (normalizedTestName.includes('hexaco')) {
    if (score >= 80) return 'Personalitate foarte echilibrată cu puncte forte în multiple dimensiuni';
    if (score >= 65) return 'Personalitate echilibrată cu oportunități de dezvoltare în anumite dimensiuni';
    if (score >= 50) return 'Personalitate moderată cu variații între dimensiuni';
    if (score >= 35) return 'Personalitate cu diferențe semnificative între dimensiuni';
    return 'Personalitate cu variații mari între dimensiuni - consultă interpretările detaliate';
  }
  
  // Personality tests (Big Five, DISC, etc.)
  if (normalizedTestName.includes('big five') || normalizedTestName.includes('disc') || 
      normalizedTestName.includes('belbin') || normalizedTestName.includes('cattell')) {
    return getPersonalityInterpretation(score);
  }
  
  // Cognitive tests
  if (normalizedTestName.includes('cognitive') || normalizedTestName.includes('cognitiv')) {
    return getCognitiveInterpretation(score);
  }
  
  // Emotional intelligence
  if (normalizedTestName.includes('emotional') || normalizedTestName.includes('emotiona')) {
    return getEmotionalIntelligenceInterpretation(score);
  }
  
  // Default personality interpretation
  return getPersonalityInterpretation(score);
};

export const getTestTypeInterpretation = (testName: string): string => {
  const normalizedTestName = testName.toLowerCase();
  
  if (normalizedTestName.includes('gad-7') || normalizedTestName.includes('anxietate')) {
    return 'Test de anxietate GAD-7 - Evaluează nivelul de anxietate generalizată';
  }
  
  if (normalizedTestName.includes('phq-9') || normalizedTestName.includes('depresie')) {
    return 'Test de depresie PHQ-9 - Evaluează severitatea simptomelor depresive';
  }
  
  if (normalizedTestName.includes('big five')) {
    return 'Testul Big Five - Evaluează cele cinci dimensiuni majore ale personalității';
  }
  
  if (normalizedTestName.includes('disc')) {
    return 'Testul DISC - Evaluează stilul de personalitate și comportamentul dominant';
  }
  
  if (normalizedTestName.includes('belbin')) {
    return 'Testul Belbin - Identifică rolurile preferate într-o echipă';
  }
  
  if (normalizedTestName.includes('cattell')) {
    return 'Testul Cattell 16PF - Evaluează 16 factori primari ai personalității';
  }
  
  if (normalizedTestName.includes('cognitive')) {
    return 'Test de aptitudini cognitive - Evaluează abilitățile cognitive generale';
  }
  
  if (normalizedTestName.includes('emotional')) {
    return 'Test de inteligență emoțională - Evaluează abilitățile emoționale și sociale';
  }
  
  return 'Test de personalitate - Evaluează trăsăturile și caracteristicile personale';
};
