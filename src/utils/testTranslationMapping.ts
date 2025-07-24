
export const testTranslationMapping: Record<string, { ro: string; en: string; description_ro: string; description_en: string }> = {
  'Big Five Personalitate': {
    ro: 'Big Five Personalitate',
    en: 'Big Five Personality',
    description_ro: 'Testul Big Five evaluează personalitatea pe cinci dimensiuni fundamentale: Extraversiune, Agreabilitate, Conștiinciozitate, Neuroticism și Deschidere către experiență.',
    description_en: 'The Big Five test evaluates personality across five fundamental dimensions: Extraversion, Agreeableness, Conscientiousness, Neuroticism, and Openness to Experience.'
  },
  'Cattell 16PF': {
    ro: 'Cattell 16PF',
    en: 'Cattell 16PF',
    description_ro: 'Testul Cattell 16PF evaluează 16 factori primari de personalitate, oferind o analiză detaliată a trăsăturilor tale de personalitate.',
    description_en: 'The Cattell 16PF test evaluates 16 primary personality factors, providing a detailed analysis of your personality traits.'
  },
  'Test de Personalitate HEXACO': {
    ro: 'Test de Personalitate HEXACO',
    en: 'HEXACO Personality Test',
    description_ro: 'Evaluează personalitatea pe baza modelului HEXACO cu 6 dimensiuni principale: Onestitate-Umilință, Emotivitate, Extraversiune, Agreabilitate, Conștiinciozitate și Deschidere.',
    description_en: 'Evaluates personality based on the HEXACO model with 6 main dimensions: Honesty-Humility, Emotionality, Extraversion, Agreeableness, Conscientiousness, and Openness.'
  },
  'Test Enneagram': {
    ro: 'Test Enneagram',
    en: 'Enneagram Test',
    description_ro: 'Testul Enneagram identifică tipul tău de personalitate dominant dintr-un sistem de 9 tipuri, explorând motivațiile și fricile tale de bază.',
    description_en: 'The Enneagram test identifies your dominant personality type from a system of 9 types, exploring your basic motivations and fears.'
  },
  'Test DISC': {
    ro: 'Test DISC',
    en: 'DISC Test',
    description_ro: 'Testul DISC evaluează stilul tău de comportament în patru domenii: Dominanță, Influență, Stabilitate și Conștiinciozitate.',
    description_en: 'The DISC test evaluates your behavioral style in four domains: Dominance, Influence, Steadiness, and Conscientiousness.'
  },
  'Inteligența Emoțională': {
    ro: 'Inteligența Emoțională',
    en: 'Emotional Intelligence',
    description_ro: 'Testul de Inteligență Emoțională evaluează capacitatea ta de a percepe, înțelege, gestiona și utiliza emoțiile în mod eficient.',
    description_en: 'The Emotional Intelligence test evaluates your ability to perceive, understand, manage, and use emotions effectively.'
  },
  'Roluri în Echipă Belbin': {
    ro: 'Roluri în Echipă Belbin',
    en: 'Belbin Team Roles',
    description_ro: 'Testul Belbin identifică rolurile tale preferate în echipă și modul în care contribui la succesul grupului.',
    description_en: 'The Belbin test identifies your preferred team roles and how you contribute to group success.'
  },
  'Test Aptitudini Cognitive': {
    ro: 'Test Aptitudini Cognitive',
    en: 'Cognitive Abilities Test',
    description_ro: 'Evaluează abilitățile tale cognitive în diverse domenii: verbal, numeric, logic, spațial și abstract.',
    description_en: 'Evaluates your cognitive abilities in various domains: verbal, numerical, logical, spatial, and abstract.'
  },
  'Scala GAD-7 pentru Anxietate': {
    ro: 'Scala GAD-7 pentru Anxietate',
    en: 'GAD-7 Anxiety Scale',
    description_ro: 'GAD-7 este un instrument de screening pentru anxietatea generalizată, evaluând nivelul de anxietate pe baza a 7 întrebări.',
    description_en: 'GAD-7 is a screening tool for generalized anxiety, evaluating anxiety levels based on 7 questions.'
  },
  'Beck Depression Inventory': {
    ro: 'Inventarul Beck pentru Depresie',
    en: 'Beck Depression Inventory',
    description_ro: 'Instrumentul Beck evaluează severitatea simptomelor depresive și este utilizat în screening-ul clinic.',
    description_en: 'The Beck instrument evaluates the severity of depressive symptoms and is used in clinical screening.'
  }
};

export const getTestTranslation = (testName: string, language: 'ro' | 'en' = 'ro'): { name: string; description: string } => {
  const mapping = testTranslationMapping[testName];
  if (!mapping) {
    return { name: testName, description: '' };
  }
  
  return {
    name: mapping[language],
    description: language === 'ro' ? mapping.description_ro : mapping.description_en
  };
};
