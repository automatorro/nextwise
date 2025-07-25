export const bigFiveTranslations = {
  "Foarte nepotrivit": "Very Uncharacteristic",
  "Nepotrivit": "Uncharacteristic",
  "Neutru": "Neutral",
  "Potrivit": "Characteristic",
  "Foarte potrivit": "Very Characteristic"
};

export const cattellTranslations = {
  "Slabă": "Low",
  "Medie": "Average",
  "Înaltă": "High"
};

export const discTranslations = {
  "Dominanță": "Dominance",
  "Influență": "Influence",
  "Stabilitate": "Steadiness",
  "Conștiinciozitate": "Conscientiousness"
};

export const emotionalIntelligenceTranslations = {
  "Foarte rar": "Very Rarely",
  "Rar": "Rarely",
  "Ocazional": "Occasionally",
  "Frecvent": "Frequently",
  "Foarte frecvent": "Very Frequently"
};

export const cognitiveTranslations = {
  "Foarte dificil": "Very Difficult",
  "Dificil": "Difficult",
  "Mediu": "Medium",
  "Ușor": "Easy",
  "Foarte ușor": "Very Easy"
};

export const belbinTranslations = {
  plant: 'Creativul',
  resource_investigator: 'Investigatorul',
  coordinator: 'Coordonatorul',
  shaper: 'Modelatorul',
  monitor_evaluator: 'Evaluatorul',
  teamworker: 'Echipierul',
  implementer: 'Implementatorul',
  completer_finisher: 'Finalizatorul',
  specialist: 'Specialistul'
};

export const hexacoTranslations = {
  "Dezacord puternic": "Strongly Disagree",
  "Dezacord": "Disagree",
  "Neutru": "Neutral",
  "Acord": "Agree",
  "Acord puternic": "Strongly Agree"
};

export const gad7Translations = {
  "Deloc": "Not at all",
  "Câteva zile": "Several days",
  "Mai mult de jumătate din zile": "More than half the days",
  "Aproape în fiecare zi": "Nearly every day"
};

export const sjtTranslations = {
  "Foarte ineficient": "Very Ineffective",
  "Ineficient": "Ineffective",
  "Neutru": "Neutral",
  "Eficient": "Effective",
  "Foarte eficient": "Very Effective"
};

export const professionalAptitudeTranslations = {
  "Dezacord total": "Strongly Disagree",
  "Dezacord": "Disagree",
  "Neutru": "Neutral",
  "Acord": "Agree",
  "Acord total": "Strongly Agree"
};

export const watsonGlaserTranslations = {
  // Inferențe - 5 opțiuni
  "Sigur fals": "Definitely false",
  "Probabil fals": "Probably false", 
  "Insuficientă informație": "Insufficient information",
  "Probabil adevărat": "Probably true",
  "Sigur adevărat": "Definitely true",
  
  // Asumpții - 2 opțiuni
  "Nu": "No",
  "Da": "Yes",
  
  // Deducție - 2 opțiuni
  "Nu urmează logic": "Does not follow logically",
  "Urmează logic": "Follows logically",
  
  // Interpretarea - 2 opțiuni
  "Concluzia nu este corectă": "The conclusion is not correct",
  "Concluzia este corectă": "The conclusion is correct",
  
  // Evaluarea argumentelor - 2 opțiuni
  "Slab": "Weak",
  "Puternic": "Strong"
};

export const allTestTranslations = {
  ...bigFiveTranslations,
  ...cattellTranslations,
  ...discTranslations,
  ...emotionalIntelligenceTranslations,
  ...cognitiveTranslations,
  ...belbinTranslations,
  ...hexacoTranslations,
  ...gad7Translations,
  ...sjtTranslations,
  ...professionalAptitudeTranslations,
  ...watsonGlaserTranslations,
};
