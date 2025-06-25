
// Mapping functions to convert database content to translation keys

export const getCategoryTranslationKey = (categoryName: string): string => {
  const categoryMap: { [key: string]: string } = {
    'Sănătate Mentală': 'testCategories.mentalHealth',
    'Mental Health': 'testCategories.mentalHealth',
    'Aptitudini Cognitive': 'testCategories.cognitiveAbilities',
    'Cognitive Abilities': 'testCategories.cognitiveAbilities',
    'Roluri în Echipă': 'testCategories.teamRoles',
    'Team Roles': 'testCategories.teamRoles',
    'Personalitate': 'testCategories.personality',
    'Personality': 'testCategories.personality',
    'Leadership': 'testCategories.leadership',
    'Inteligență Emoțională': 'testCategories.emotionalIntelligence',
    'Emotional Intelligence': 'testCategories.emotionalIntelligence',
    'Bunăstare': 'testCategories.wellness',
    'Wellness': 'testCategories.wellness',
    'Cognitiv': 'testCategories.cognitive',
    'Cognitive': 'testCategories.cognitive',
    'Abilități Tehnice': 'testCategories.technicalSkills',
    'Technical Skills': 'testCategories.technicalSkills',
    'Digital': 'testCategories.digital',
    'Senzorial': 'testCategories.sensory',
    'Sensory': 'testCategories.sensory'
  };

  return categoryMap[categoryName] || categoryName;
};

export const getTestNameTranslationKey = (testName: string): string => {
  const testNameMap: { [key: string]: string } = {
    'Beck Depression Inventory': 'testNames.beckDepressionInventory',
    'Test de Aptitudini Cognitive': 'testNames.cognitiveAbilitiesTest',
    'Cognitive Abilities Test': 'testNames.cognitiveAbilitiesTest',
    'Rolurile de Echipă Belbin': 'testNames.belbinTeamRoles',
    'Belbin Team Roles': 'testNames.belbinTeamRoles'
  };

  return testNameMap[testName] || testName;
};

export const getTestDescriptionTranslationKey = (testName: string): string => {
  const descriptionMap: { [key: string]: string } = {
    'Beck Depression Inventory': 'testDescriptions.beckDepressionInventory',
    'Test de Aptitudini Cognitive': 'testDescriptions.cognitiveAbilitiesTest',
    'Cognitive Abilities Test': 'testDescriptions.cognitiveAbilitiesTest',
    'Rolurile de Echipă Belbin': 'testDescriptions.belbinTeamRoles',
    'Belbin Team Roles': 'testDescriptions.belbinTeamRoles'
  };

  return descriptionMap[testName] || testName;
};
