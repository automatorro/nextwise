
import type { Translations } from '@/types/language';

// Cache pentru rezultatele traducerilor pentru a evita căutările repetate
const translationResultCache = new Map<string, any>();

export const translateKey = (translations: Translations, key: string): any => {
  // Check cache first
  const cacheKey = `${JSON.stringify(translations).slice(0, 50)}_${key}`;
  if (translationResultCache.has(cacheKey)) {
    return translationResultCache.get(cacheKey);
  }
  
  const keys = key.split('.');
  let value: any = translations;
  
  console.log(`🔍 Translating key: "${key}"`);
  console.log(`📊 Starting with translations object:`, {
    hasTranslations: !!translations,
    topLevelKeys: translations ? Object.keys(translations) : 'none',
    type: typeof translations
  });
  
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    console.log(`  🔸 Looking for "${k}" in:`, {
      currentValue: value,
      hasProperty: value && typeof value === 'object' && k in value,
      availableKeys: value && typeof value === 'object' ? Object.keys(value) : 'not an object'
    });
    
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
      console.log(`  ✅ Found "${k}":`, value);
    } else {
      // Log missing key for debugging with more context
      console.warn(`❌ Translation missing for key: "${key}" at segment "${k}"`, {
        fullKey: key,
        missingSegment: k,
        segmentIndex: i,
        currentValue: value,
        valueType: typeof value,
        availableKeys: value && typeof value === 'object' ? Object.keys(value) : 'not an object',
        pathSoFar: keys.slice(0, i).join('.')
      });
      
      // Cache the failed result to avoid repeated lookups
      translationResultCache.set(cacheKey, key);
      return key;
    }
  }
  
  const result = value !== undefined ? value : key;
  console.log(`✅ Translation result for "${key}":`, result);
  
  // Cache the successful result
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

// Funcție pentru curățarea cache-ului de rezultate
export const clearTranslationResultCache = (): void => {
  translationResultCache.clear();
  console.log('🧹 Translation result cache cleared');
};
