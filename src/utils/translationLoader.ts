
import type { Language, Translations } from '@/types/language';
import { fallbackTranslations } from './fallbackTranslations';

// Cache simplu pentru traduceri
const translationsCache = new Map<Language, Translations>();

// Funcție pentru merge profund a obiectelor
const deepMerge = (target: any, source: any): any => {
  if (!source || typeof source !== 'object') return target;
  if (!target || typeof target !== 'object') return source;

  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
};

export const loadTranslations = async (lang: Language): Promise<Translations> => {
  console.log(`🔄 Loading translations for: ${lang}`);
  
  // Verifică cache-ul
  const cached = translationsCache.get(lang);
  if (cached) {
    console.log(`⚡ Using cached translations for: ${lang}`);
    return cached;
  }

  // Începe cu fallback-ul complet
  const fallbackData = fallbackTranslations[lang];
  console.log(`📋 Starting with fallback for ${lang}, keys:`, Object.keys(fallbackData));

  try {
    // Încarcă traducerile din fișier
    console.log(`📥 Attempting to load /locales/${lang}.json`);
    
    const response = await fetch(`/locales/${lang}.json?v=${Date.now()}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const loadedData = await response.json();
    
    if (!loadedData || typeof loadedData !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    
    console.log(`✅ Successfully loaded ${lang}.json`);
    console.log(`📊 Keys in loaded data:`, Object.keys(loadedData));
    
    // Merge cu fallback-ul pentru a completa lipsurile
    const mergedData = deepMerge(fallbackData, loadedData);
    
    console.log(`🔄 Merged data keys:`, Object.keys(mergedData));
    console.log(`✅ Final translations ready for ${lang}`);
    
    // Cache rezultatul merged
    translationsCache.set(lang, mergedData);
    return mergedData;
    
  } catch (error) {
    console.error(`❌ Error loading ${lang}.json:`, error);
    console.log(`🔄 Using complete fallback for ${lang}`);
    
    // Cache fallback-ul în caz de eșec
    translationsCache.set(lang, fallbackData);
    return fallbackData;
  }
};

export const clearTranslationsCache = (): void => {
  translationsCache.clear();
  console.log('🧹 Translation cache cleared');
};

export const preloadAllTranslations = async (): Promise<void> => {
  console.log('🚀 Preloading all translations...');
  const languages: Language[] = ['ro', 'en'];
  
  for (const lang of languages) {
    try {
      await loadTranslations(lang);
      console.log(`✅ Preloaded ${lang}`);
    } catch (error) {
      console.warn(`❌ Failed to preload ${lang}:`, error);
    }
  }
};
