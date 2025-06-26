
import type { Translations } from '@/types/language';

// Cache pentru rezultatele traducerilor pentru a evita căutările repetate
const translationResultCache = new Map<string, any>();

export const translateKey = (translations: Translations, key: string): any => {
  // Verifică cache-ul pentru această combinație de translations + key
  const cacheKey = `${JSON.stringify(translations).slice(0, 50)}_${key}`;
  
  if (translationResultCache.has(cacheKey)) {
    return translationResultCache.get(cacheKey);
  }

  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  // Cache rezultatul (preservând arrays, objects, etc.)
  const result = value !== undefined ? value : key;
  translationResultCache.set(cacheKey, result);
  
  // Limitează dimensiunea cache-ului
  if (translationResultCache.size > 1000) {
    const firstKey = translationResultCache.keys().next().value;
    translationResultCache.delete(firstKey);
  }
  
  return result;
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
