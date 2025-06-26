
import { useState, useEffect, useCallback, useRef } from 'react';
import type { Language, Translations } from '@/types/language';
import { fallbackTranslations } from '@/utils/fallbackTranslations';
import { loadTranslations } from '@/utils/translationLoader';
import { translateKey, getStoredLanguage, setStoredLanguage } from '@/utils/translationUtils';

// Cache global pentru traduceri
const translationsCache = new Map<Language, Translations>();

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('ro');
  const [translations, setTranslations] = useState<Translations>(fallbackTranslations.ro);
  const [loading, setLoading] = useState(true);
  const loadingRef = useRef(false);

  // Preîncarcă traducerile pentru ambele limbi
  const preloadTranslations = useCallback(async () => {
    const languages: Language[] = ['ro', 'en'];
    
    for (const lang of languages) {
      if (!translationsCache.has(lang)) {
        try {
          const data = await loadTranslations(lang);
          translationsCache.set(lang, data);
        } catch (error) {
          console.warn(`Failed to preload ${lang} translations:`, error);
          translationsCache.set(lang, fallbackTranslations[lang]);
        }
      }
    }
  }, []);

  const loadLanguageTranslations = useCallback(async (lang: Language) => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    
    try {
      // Verifică cache-ul mai întâi
      if (translationsCache.has(lang)) {
        setTranslations(translationsCache.get(lang)!);
        setLoading(false);
        return;
      }

      setLoading(true);
      const data = await loadTranslations(lang);
      translationsCache.set(lang, data);
      setTranslations(data);
    } catch (error) {
      console.error(`Error loading ${lang} translations:`, error);
      const fallback = fallbackTranslations[lang];
      translationsCache.set(lang, fallback);
      setTranslations(fallback);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  // Inițializează traducerile la primul render
  useEffect(() => {
    const initializeTranslations = async () => {
      const savedLanguage = getStoredLanguage() as Language;
      const initialLanguage = savedLanguage && (savedLanguage === 'ro' || savedLanguage === 'en') ? savedLanguage : 'ro';
      
      setLanguage(initialLanguage);
      
      // Preîncarcă ambele limbi în background
      await preloadTranslations();
      
      // Setează traducerile pentru limba curentă
      await loadLanguageTranslations(initialLanguage);
    };

    initializeTranslations();
  }, [loadLanguageTranslations, preloadTranslations]);

  const changeLanguage = useCallback(async (newLanguage: Language) => {
    if (newLanguage === language) return;
    
    setLanguage(newLanguage);
    setStoredLanguage(newLanguage);
    
    // Încarcă traducerile instant din cache sau async
    await loadLanguageTranslations(newLanguage);
  }, [language, loadLanguageTranslations]);

  const t = useCallback((key: string) => {
    return translateKey(translations, key);
  }, [translations]);

  return {
    language,
    changeLanguage,
    t,
    loading,
  };
};
