
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { Language, Translations } from '@/types/language';
import { fallbackTranslations } from '@/utils/fallbackTranslations';
import { loadTranslations, clearTranslationsCache } from '@/utils/translationLoader';
import { translateKey, getStoredLanguage, setStoredLanguage, clearTranslationResultCache } from '@/utils/translationUtils';

interface LanguageContextType {
  language: Language;
  translations: Translations;
  loading: boolean;
  changeLanguage: (newLanguage: Language) => Promise<void>;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ro');
  const [translations, setTranslations] = useState<Translations>(fallbackTranslations.ro);
  const [loading, setLoading] = useState(true);
  const isInitializing = useRef(true);

  // Funcție pentru resetarea completă a sistemului
  const resetSystem = useCallback(() => {
    console.log('🔄 Resetting translation system...');
    clearTranslationsCache();
    clearTranslationResultCache();
  }, []);

  // Funcție pentru încărcarea sigură a traducerilor
  const loadSafeTranslations = useCallback(async (lang: Language): Promise<Translations> => {
    console.log(`🔄 Loading safe translations for: ${lang}`);
    
    try {
      const loadedTranslations = await loadTranslations(lang);
      console.log(`✅ Loaded translations for ${lang}`);
      return loadedTranslations;
    } catch (error) {
      console.error(`❌ Error loading translations for ${lang}:`, error);
      console.log(`🔄 Using fallback translations for ${lang}`);
      return fallbackTranslations[lang];
    }
  }, []);

  // Inițializare
  useEffect(() => {
    const initializeTranslations = async () => {
      if (!isInitializing.current) return;
      
      console.log('🚀 Initializing translation system...');
      
      // Reset sistem
      resetSystem();
      
      try {
        // Obține limba salvată
        const savedLanguage = getStoredLanguage() as Language;
        const initialLanguage = (savedLanguage === 'ro' || savedLanguage === 'en') ? savedLanguage : 'ro';
        
        console.log(`🔄 Initial language: ${initialLanguage}`);
        
        // Setează limba și fallback-ul imediat
        setLanguage(initialLanguage);
        setTranslations(fallbackTranslations[initialLanguage]);
        
        // Încarcă traducerile complete
        const completeTranslations = await loadSafeTranslations(initialLanguage);
        setTranslations(completeTranslations);
        
        console.log(`✅ Translation system initialized for ${initialLanguage}`);
        
      } catch (error) {
        console.error('❌ Critical error in initialization:', error);
        setLanguage('ro');
        setTranslations(fallbackTranslations.ro);
      } finally {
        setLoading(false);
        isInitializing.current = false;
      }
    };

    initializeTranslations();
  }, [resetSystem, loadSafeTranslations]);

  // Schimbarea limbii
  const changeLanguage = useCallback(async (newLanguage: Language) => {
    if (newLanguage === language) {
      console.log('🔄 Language change skipped - same language');
      return;
    }

    console.log(`🔄 Changing language from ${language} to ${newLanguage}`);
    
    try {
      // Schimbare imediată cu fallback
      setLanguage(newLanguage);
      setTranslations(fallbackTranslations[newLanguage]);
      setStoredLanguage(newLanguage);
      
      // Clear cache pentru traduceri fresh
      clearTranslationResultCache();
      
      // Încarcă traducerile complete
      const completeTranslations = await loadSafeTranslations(newLanguage);
      setTranslations(completeTranslations);
      
      console.log(`✅ Language changed to ${newLanguage}`);
      
    } catch (error) {
      console.error(`❌ Error changing language to ${newLanguage}:`, error);
      setTranslations(fallbackTranslations[newLanguage]);
    }
  }, [language, loadSafeTranslations]);

  // Funcția de traducere optimizată
  const t = useCallback((key: string) => {
    try {
      const result = translateKey(translations, key);
      
      // Dacă nu găsește cheia, încearcă din fallback
      if (result === key) {
        const fallbackResult = translateKey(fallbackTranslations[language], key);
        if (fallbackResult !== key) {
          return fallbackResult;
        }
      }
      
      return result;
    } catch (error) {
      console.error(`❌ Error translating "${key}":`, error);
      return key;
    }
  }, [translations, language]);

  const contextValue: LanguageContextType = {
    language,
    translations,
    loading,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
