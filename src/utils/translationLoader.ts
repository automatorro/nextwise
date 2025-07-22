
import type { Language, Translations } from '@/types/language';
import { fallbackTranslations } from './fallbackTranslations';

// Simplu cache fără timestamp pentru a evita conflictele
const translationsCache = new Map<Language, Translations>();

export const loadTranslations = async (lang: Language): Promise<Translations> => {
  console.log(`📥 Loading translations for: ${lang}`);
  
  // Verifică cache-ul simplu
  const cached = translationsCache.get(lang);
  if (cached) {
    console.log(`⚡ Using cached translations for: ${lang}`);
    return cached;
  }

  try {
    console.log(`🔄 Fetching fresh translations from /locales/${lang}.json`);
    
    // Fetch cu cache busting pentru a forța încărcarea fresh
    const response = await fetch(`/locales/${lang}.json?t=${Date.now()}`, {
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
    
    const data = await response.json();
    
    // Validare de bază
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    
    console.log(`✅ Successfully loaded ${lang} translations`);
    console.log(`📋 Keys in ${lang}.json:`, Object.keys(data));
    
    // Verifică dacă are structura necesară
    const requiredKeys = ['common', 'nav', 'home'];
    const hasRequiredKeys = requiredKeys.every(key => data[key]);
    
    if (!hasRequiredKeys) {
      console.warn(`⚠️ ${lang}.json missing some required keys, merging with fallback`);
      // Merge cu fallback pentru cheile lipsă
      const merged = { ...fallbackTranslations[lang], ...data };
      translationsCache.set(lang, merged);
      return merged;
    }
    
    // Cache rezultatul
    translationsCache.set(lang, data);
    return data;
    
  } catch (error) {
    console.error(`❌ Error loading ${lang}.json:`, error);
    console.log(`🔄 Using fallback translations for ${lang}`);
    
    // Fallback
    const fallbackData = fallbackTranslations[lang];
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
