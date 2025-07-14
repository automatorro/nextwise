
import type { Translations } from '@/types/language';

// Cache pentru rezultatele traducerilor pentru a evita căutările repetate
const translationResultCache = new Map<string, any>();

export const translateKey = (translations: Translations, key: string): any => {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Log missing key for debugging
      console.warn(`Translation missing for key: "${key}" at "${k}"`, {
        fullKey: key,
        currentValue: value,
        availableKeys: value ? Object.keys(value) : 'null'
      });
      return key;
    }
  }
  
  return value !== undefined ? value : key;
};

export const getStoredLanguage = (): string | null => {
  try {
    return localStorage.getItem('language');
  } catch (error) {
    console.warn('Failed to get stored language:', error);
    return null;
  }
};

export const setStoredLanguage = (language: string): void => {
  try {
    localStorage.setItem('language', language);
  } catch (error) {
    console.warn('Failed to store language:', error);
  }
};

// Funcție pentru curățarea cache-ului de rezultate
export const clearTranslationResultCache = (): void => {
  translationResultCache.clear();
};
