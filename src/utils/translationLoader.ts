
import type { Language, Translations } from '@/types/language';
import { fallbackTranslations } from './fallbackTranslations';

// Cache pentru traduceri cu timestamp pentru invalidare
interface CacheEntry {
  data: Translations;
  timestamp: number;
}

const translationsCache = new Map<Language, CacheEntry>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour cache

// Funcție pentru verificarea validității cache-ului
const isCacheValid = (entry: CacheEntry): boolean => {
  return Date.now() - entry.timestamp < CACHE_DURATION;
};

export const loadTranslations = async (lang: Language): Promise<Translations> => {
  console.log(`📥 Loading translations for: ${lang}`);
  
  // Verifică cache-ul local
  const cached = translationsCache.get(lang);
  if (cached && isCacheValid(cached)) {
    console.log(`⚡ Using cached translations for: ${lang}`);
    return cached.data;
  }

  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      console.warn(`⚠️ Failed to load translations for ${lang}, using fallback`);
      const fallbackData = fallbackTranslations[lang];
      
      // Cache fallback-ul pentru a evita request-urile repetate
      translationsCache.set(lang, {
        data: fallbackData,
        timestamp: Date.now()
      });
      
      return fallbackData;
    }
    
    const data = await response.json();
    console.log(`✅ Successfully loaded translations for: ${lang}`);
    
    // Cache rezultatul
    translationsCache.set(lang, {
      data: data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error(`❌ Error loading translations for ${lang}:`, error);
    
    // Încearcă să folosești cache-ul expirat dacă există
    if (cached) {
      console.warn(`⚠️ Using expired cache for ${lang}`);
      return cached.data;
    }
    
    // Fallback final
    console.log(`🔄 Using fallback translations for ${lang}`);
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
  console.log('🚀 Starting preload of all translations...');
  const languages: Language[] = ['ro', 'en'];
  
  const promises = languages.map(async (lang) => {
    try {
      const translations = await loadTranslations(lang);
      console.log(`✅ Preloaded ${lang} translations successfully`);
      return { lang, success: true, translations };
    } catch (error) {
      console.warn(`❌ Failed to preload ${lang}:`, error);
      return { lang, success: false, error };
    }
  });
  
  const results = await Promise.allSettled(promises);
  const successful = results.filter(result => result.status === 'fulfilled').length;
  console.log(`🎉 Preloading completed: ${successful}/${languages.length} languages loaded`);
};

// Funcție pentru preîncărcarea unei limbi specific
export const preloadLanguage = async (lang: Language): Promise<void> => {
  try {
    await loadTranslations(lang);
    console.log(`✅ Successfully preloaded ${lang}`);
  } catch (error) {
    console.warn(`❌ Failed to preload ${lang}:`, error);
  }
};

// Funcție pentru curățarea cache-ului
export const clearTranslationsCache = (): void => {
  translationsCache.clear();
  console.log('🧹 Translation cache cleared');
};

// Funcție pentru verificarea stării cache-ului
export const getCacheStatus = (): { [key in Language]?: { cached: boolean; valid: boolean; timestamp?: number } } => {
  const status: { [key in Language]?: { cached: boolean; valid: boolean; timestamp?: number } } = {};
  
  (['ro', 'en'] as Language[]).forEach(lang => {
    const cached = translationsCache.get(lang);
    status[lang] = {
      cached: !!cached,
      valid: cached ? isCacheValid(cached) : false,
      timestamp: cached?.timestamp
    };
  });
  
  return status;
};
