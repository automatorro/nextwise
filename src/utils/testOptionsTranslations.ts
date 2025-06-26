
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
  'Acord': 'Agree',
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
  'Deloc caracteristic pentru mine': 'Not at all characteristic of me',
  
  // Additional common variations
  'Pentru deloc': 'Not at all',
  'În mică măsură': 'To a small extent',
  'În mare măsură': 'To a large extent',
  'Complet': 'Completely',
  
  // Scale variations
  '1 - Deloc caracteristic': '1 - Not at all characteristic',
  '2 - Puțin caracteristic': '2 - Somewhat characteristic',
  '3 - Destul de caracteristic': '3 - Quite characteristic',
  '4 - Foarte caracteristic': '4 - Very characteristic',
  
  // More specific Belbin variations
  'Nu mă caracterizează deloc': 'Does not characterize me at all',
  'Mă caracterizează puțin': 'Characterizes me a little',
  'Mă caracterizează destul de mult': 'Characterizes me quite a lot',
  'Mă caracterizează foarte mult': 'Characterizes me very much'
};

// Function to translate a single option
export const translateOption = (option: string, language: 'en' | 'ro'): string => {
  if (language === 'ro') {
    return option; // Return original Romanian text
  }
  
  // For English, try to find translation
  const translated = COMMON_OPTIONS_TRANSLATIONS[option];
  if (translated) {
    return translated;
  }
  
  // Try partial matching for complex options
  for (const [roText, enText] of Object.entries(COMMON_OPTIONS_TRANSLATIONS)) {
    if (option.includes(roText)) {
      return option.replace(roText, enText);
    }
  }
  
  return option; // Return original if no translation found
};

// Function to translate an array of options
export const translateOptions = (options: string[], language: 'en' | 'ro'): string[] => {
  return options.map(option => translateOption(option, language));
};
