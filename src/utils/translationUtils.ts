
import type { Translations } from '@/types/language';

// Cache simplu pentru rezultatele traducerilor
const translationResultCache = new Map<string, any>();

export const translateKey = (translations: Translations, key: string): any => {
  // Verifică cache-ul mai întâi
  const cacheKey = `${JSON.stringify(Object.keys(translations)).slice(0, 20)}_${key}`;
  if (translationResultCache.has(cacheKey)) {
    return translationResultCache.get(cacheKey);
  }
  
  const keys = key.split('.');
  let value: any = translations;
  
  console.log(`🔍 Translating key: "${key}"`);
  console.log(`📊 Available top-level keys:`, Object.keys(translations));
  
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`❌ Translation missing: "${key}" at segment "${k}"`);
      console.log(`Available keys at this level:`, value && typeof value === 'object' ? Object.keys(value) : 'not an object');
      
      // Cache rezultatul eșuat
      translationResultCache.set(cacheKey, key);
      return key;
    }
  }
  
  const result = value !== undefined ? value : key;
  
  // Cache rezultatul reușit
  translationResultCache.set(cacheKey, result);
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

export const clearTranslationResultCache = (): void => {
  translationResultCache.clear();
  console.log('🧹 Translation result cache cleared');
};
