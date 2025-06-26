
// Common test options translations to avoid repetition
export const COMMON_OPTIONS_TRANSLATIONS: { [key: string]: string } = {
  // Likert scale options - Romanian to English
  'Deloc': 'Not at all',
  'Foarte puțin': 'Very little',
  'Puțin': 'A little',
  'Moderat': 'Moderately',
  'Mult': 'Much',
  'Foarte mult': 'Very much',
  'Complet dezacord': 'Strongly disagree',
  'Dezacord': 'Disagree',
  'Neutru': 'Neutral',
  'De acord': 'Agree',
  'Complet de acord': 'Strongly agree',
  'Niciodată': 'Never',
  'Rareori': 'Rarely',
  'Uneori': 'Sometimes',
  'Adesea': 'Often',
  'Întotdeauna': 'Always',
  
  // Frequency options
  'Câteva zile': 'Several days',
  'Mai mult de jumătate din zile': 'More than half the days',
  'Aproape zilnic': 'Nearly every day',
  
  // Yes/No options
  'Da': 'Yes',
  'Nu': 'No',
  
  // Intensity levels
  'Foarte scăzut': 'Very low',
  'Scăzut': 'Low',
  'Mediu': 'Medium',
  'Ridicat': 'High',
  'Foarte ridicat': 'Very high',
  
  // Belbin specific options
  'Foarte caracteristic pentru mine': 'Very characteristic of me',
  'Destul de caracteristic pentru mine': 'Quite characteristic of me',
  'Puțin caracteristic pentru mine': 'Somewhat characteristic of me',
  'Deloc caracteristic pentru mine': 'Not at all characteristic of me'
};

// Function to translate a single option
export const translateOption = (option: string, language: 'en' | 'ro'): string => {
  if (language === 'ro') {
    return option; // Return original Romanian text
  }
  
  // For English, try to find translation
  return COMMON_OPTIONS_TRANSLATIONS[option] || option;
};

// Function to translate an array of options
export const translateOptions = (options: string[], language: 'en' | 'ro'): string[] => {
  return options.map(option => translateOption(option, language));
};
