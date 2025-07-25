
import { bigFiveTranslations } from './testTranslationMapping';
import { cattellTranslations } from './testTranslationMapping';
import { discTranslations } from './testTranslationMapping';
import { emotionalIntelligenceTranslations } from './testTranslationMapping';
import { cognitiveTranslations } from './testTranslationMapping';
import { belbinTranslations } from './testTranslationMapping';
import { hexacoTranslations } from './testTranslationMapping';
import { gad7Translations } from './testTranslationMapping';
import { sjtTranslations } from './testTranslationMapping';
import { professionalAptitudeTranslations } from './testTranslationMapping';
import { watsonGlaserTranslations } from './testTranslationMapping';

export function translateOptions(options: string[], targetLanguage: string): string[] {
  const allTranslations = {
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

  if (targetLanguage === 'en') {
    return options.map(option => {
      return allTranslations[option as keyof typeof allTranslations] || option;
    });
  }
  
  return options;
}

export function translateTestOptions(testName: string, options: string[], targetLanguage: string): string[] {
  if (targetLanguage === 'ro') {
    return options;
  }

  // Big Five translations
  if (testName.includes('Big Five') || testName.includes('big-five')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return bigFiveTranslations[option as keyof typeof bigFiveTranslations] || option;
      }
      return option;
    });
  }

  // Cattell 16PF translations
  if (testName.includes('Cattell') || testName.includes('16PF')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return cattellTranslations[option as keyof typeof cattellTranslations] || option;
      }
      return option;
    });
  }

  // DISC translations
  if (testName.includes('DISC')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return discTranslations[option as keyof typeof discTranslations] || option;
      }
      return option;
    });
  }

  // Emotional Intelligence translations
  if (testName.includes('Emotional Intelligence') || testName.includes('emotional intelligence')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return emotionalIntelligenceTranslations[option as keyof typeof emotionalIntelligenceTranslations] || option;
      }
      return option;
    });
  }

  // Cognitive translations
  if (testName.includes('Cognitive') || testName.includes('cognitive')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return cognitiveTranslations[option as keyof typeof cognitiveTranslations] || option;
      }
      return option;
    });
  }

  // Belbin translations
  if (testName.includes('Belbin') || testName.includes('belbin')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return belbinTranslations[option as keyof typeof belbinTranslations] || option;
      }
      return option;
    });
  }

  // HEXACO translations
  if (testName.includes('HEXACO') || testName.includes('hexaco')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return hexacoTranslations[option as keyof typeof hexacoTranslations] || option;
      }
      return option;
    });
  }

  // GAD-7 translations
  if (testName.includes('GAD-7') || testName.includes('gad-7')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return gad7Translations[option as keyof typeof gad7Translations] || option;
      }
      return option;
    });
  }

  // SJT translations
  if (testName.includes('SJT') || testName.includes('sjt')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return sjtTranslations[option as keyof typeof sjtTranslations] || option;
      }
      return option;
    });
  }

  // Professional Aptitude translations
  if (testName.includes('competențe manageriale') || testName.includes('managerial')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return professionalAptitudeTranslations[option as keyof typeof professionalAptitudeTranslations] || option;
      }
      return option;
    });
  }

  // Watson-Glaser translations
  if (testName.includes('Watson-Glaser') || testName.includes('watson-glaser') || testName.includes('watson') || testName.includes('glaser')) {
    return options.map(option => {
      if (targetLanguage === 'en') {
        return watsonGlaserTranslations[option as keyof typeof watsonGlaserTranslations] || option;
      }
      return option;
    });
  }

  return options;
}
