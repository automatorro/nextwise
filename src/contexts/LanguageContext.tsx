
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

  // Funcție pentru a reseta complet sistemul de traduceri
  const resetTranslationSystem = useCallback(() => {
    console.log('🔄 Resetting complete translation system...');
    clearTranslationsCache();
    clearTranslationResultCache();
    
    // Șterge și cache-ul din localStorage dacă există
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes('translation') || key.includes('cache')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Could not clear localStorage cache:', error);
    }
  }, []);

  // Funcție pentru validarea structurii de traduceri
  const validateTranslationStructure = useCallback((trans: Translations, lang: Language): boolean => {
    if (!trans || typeof trans !== 'object') {
      console.error(`❌ Invalid translations structure for ${lang}:`, trans);
      return false;
    }

    // Verifică cheile esențiale din fallback
    const fallback = fallbackTranslations[lang];
    const requiredKeys = Object.keys(fallback);
    
    const missingKeys = requiredKeys.filter(key => !trans[key] || typeof trans[key] !== 'object');
    
    if (missingKeys.length > 0) {
      console.warn(`⚠️ Missing keys in ${lang} translations:`, missingKeys);
      return false;
    }

    console.log(`✅ Translation structure valid for ${lang}`);
    return true;
  }, []);

  // Funcție pentru încărcarea sigură a traducerilor
  const loadSafeTranslations = useCallback(async (lang: Language): Promise<Translations> => {
    console.log(`📥 Loading safe translations for: ${lang}`);
    
    try {
      // Încarcă traducerile din fișier
      const loadedTranslations = await loadTranslations(lang);
      console.log(`📊 Loaded translations for ${lang}:`, {
        keys: Object.keys(loadedTranslations),
        hasTestDescriptions: !!loadedTranslations.testDescriptions,
        hasTests: !!loadedTranslations.tests,
        hasDashboard: !!loadedTranslations.dashboard
      });
      
      // Validează structura
      if (validateTranslationStructure(loadedTranslations, lang)) {
        return loadedTranslations;
      } else {
        console.warn(`⚠️ Using fallback for ${lang} due to invalid structure`);
        return fallbackTranslations[lang];
      }
    } catch (error) {
      console.error(`❌ Error loading translations for ${lang}:`, error);
      return fallbackTranslations[lang];
    }
  }, [validateTranslationStructure]);

  // Inițializare
  useEffect(() => {
    const initializeTranslations = async () => {
      if (!isInitializing.current) return;
      
      console.log('🚀 Initializing translation system...');
      
      // Reset complet
      resetTranslationSystem();
      
      try {
        // Obține limba salvată
        const savedLanguage = getStoredLanguage() as Language;
        const initialLanguage = (savedLanguage === 'ro' || savedLanguage === 'en') ? savedLanguage : 'ro';
        
        console.log(`🔄 Setting initial language: ${initialLanguage}`);
        
        // Setează limba imediat
        setLanguage(initialLanguage);
        
        // Folosește fallback imediat pentru UX rapid
        setTranslations(fallbackTranslations[initialLanguage]);
        console.log(`⚡ Set fallback translations for ${initialLanguage}`);
        
        // Încarcă traducerile reale în background
        const realTranslations = await loadSafeTranslations(initialLanguage);
        
        // Actualizează cu traducerile reale
        setTranslations(realTranslations);
        console.log(`✅ Updated with real translations for ${initialLanguage}`);
        console.log('📋 Final translation keys:', Object.keys(realTranslations));
        
      } catch (error) {
        console.error('❌ Critical error in initialization:', error);
        // Fallback de urgență
        const emergencyLang = 'ro';
        setLanguage(emergencyLang);
        setTranslations(fallbackTranslations[emergencyLang]);
      } finally {
        setLoading(false);
        isInitializing.current = false;
      }
    };

    initializeTranslations();
  }, [resetTranslationSystem, loadSafeTranslations]);

  // Schimbarea limbii
  const changeLanguage = useCallback(async (newLanguage: Language) => {
    if (newLanguage === language) {
      console.log('🔄 Language change skipped - same language');
      return;
    }

    console.log(`🔄 Changing language from ${language} to ${newLanguage}`);
    
    try {
      // Folosește fallback imediat pentru UX
      setTranslations(fallbackTranslations[newLanguage]);
      setLanguage(newLanguage);
      setStoredLanguage(newLanguage);
      
      // Clear cache pentru a forța încărcarea fresh
      clearTranslationResultCache();
      
      // Încarcă traducerile reale
      const realTranslations = await loadSafeTranslations(newLanguage);
      
      // Actualizează cu traducerile reale
      setTranslations(realTranslations);
      
      console.log(`✅ Language changed to ${newLanguage} successfully`);
      console.log('📋 Available translation keys:', Object.keys(realTranslations));
      
    } catch (error) {
      console.error(`❌ Error changing language to ${newLanguage}:`, error);
      // Fallback de urgență
      setTranslations(fallbackTranslations[newLanguage]);
    }
  }, [language, loadSafeTranslations]);

  // Funcția de traducere
  const t = useCallback((key: string) => {
    try {
      const result = translateKey(translations, key);
      
      // Dacă nu găsește traducerea, încearcă din fallback
      if (result === key) {
        console.warn(`🔍 Key "${key}" not found, trying fallback...`);
        const fallbackResult = translateKey(fallbackTranslations[language], key);
        if (fallbackResult !== key) {
          console.log(`✅ Found in fallback: "${key}" = "${fallbackResult}"`);
          return fallbackResult;
        }
        console.warn(`❌ Key "${key}" not found in fallback either`);
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
