
import type { Translations } from '@/types/language';

// Cache pentru rezultatele traducerilor
const translationResultCache = new Map<string, any>();

export const translateKey = (translations: Translations, key: string): any => {
  // Verifică cache-ul
  const cacheKey = `${JSON.stringify(Object.keys(translations)).slice(0, 50)}_${key}`;
  if (translationResultCache.has(cacheKey)) {
    return translationResultCache.get(cacheKey);
  }
  
  const keys = key.split('.');
  let value: any = translations;
  
  console.log(`🔍 Translating key: "${key}"`);
  
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
      console.log(`✅ Found segment "${k}" at level ${i + 1}`);
    } else {
      console.warn(`❌ Translation missing: "${key}" at segment "${k}"`);
      console.log(`Available keys at level ${i + 1}:`, value && typeof value === 'object' ? Object.keys(value) : 'not an object');
      
      // Cache rezultatul eșuat
      translationResultCache.set(cacheKey, key);
      return key;
    }
  }
  
  const result = value !== undefined ? value : key;
  console.log(`✅ Translation result for "${key}":`, result);
  
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
    console.log(`💾 Stored language: ${language}`);
  } catch (error) {
    console.warn('Failed to store language:', error);
  }
};

export const clearTranslationResultCache = (): void => {
  translationResultCache.clear();
  console.log('🧹 Translation result cache cleared');
};

// Funcție utilitară pentru debugging
export const debugTranslationStructure = (translations: Translations, maxDepth: number = 3): void => {
  const logStructure = (obj: any, prefix: string = '', depth: number = 0) => {
    if (depth > maxDepth) return;
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const currentPath = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];
        
        if (typeof value === 'object' && value !== null) {
          console.log(`📂 ${currentPath} (object with ${Object.keys(value).length} keys)`);
          logStructure(value, currentPath, depth + 1);
        } else {
          console.log(`📄 ${currentPath}: "${value}"`);
        }
      }
    }
  };
  
  console.log('🔍 Translation structure:');
  logStructure(translations);
};
