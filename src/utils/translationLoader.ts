
import type { Language, Translations } from '@/types/language';
import { fallbackTranslations } from './fallbackTranslations';

// Cache pentru traduceri cu timestamp pentru invalidare
interface CacheEntry {
  data: Translations;
  timestamp: number;
}

const translationsCache = new Map<Language, CacheEntry>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minute

// Funcție pentru verificarea validității cache-ului
const isCacheValid = (entry: CacheEntry): boolean => {
  return Date.now() - entry.timestamp < CACHE_DURATION;
};

export const loadTranslations = async (lang: Language): Promise<Translations> => {
  // Verifică cache-ul local
  const cached = translationsCache.get(lang);
  if (cached && isCacheValid(cached)) {
    return cached.data;
  }

  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      console.warn(`Failed to load translations for ${lang}, using fallback`);
      const fallbackData = fallbackTranslations[lang];
      
      // Cache fallback-ul pentru a evita request-urile repetate
      translationsCache.set(lang, {
        data: fallbackData,
        timestamp: Date.now()
      });
      
      return fallbackData;
    }
    
    const data = await response.json();
    
    // Cache rezultatul
    translationsCache.set(lang, {
      data: data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error('Error loading translations:', error);
    
    // Încearcă să folosești cache-ul expirat dacă există
    if (cached) {
      console.warn(`Using expired cache for ${lang}`);
      return cached.data;
    }
    
    // Fallback final
    const fallbackData = fallbackTranslations[lang];
    translationsCache.set(lang, {
      data: fallbackData,
      timestamp: Date.now()
    });
    
    return fallbackData;
  }
};

// Funcție pentru preîncărcarea traducerilor
export const preloadAllTranslations = async (): Promise<void> => {
  const languages: Language[] = ['ro', 'en'];
  
  const promises = languages.map(async (lang) => {
    try {
      await loadTranslations(lang);
    } catch (error) {
      console.warn(`Failed to preload ${lang}:`, error);
    }
  });
  
  await Promise.allSettled(promises);
};

// Funcție pentru curățarea cache-ului
export const clearTranslationsCache = (): void => {
  translationsCache.clear();
};
