
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Language, Translations } from '@/types/language';

interface LanguageContextType {
  language: Language;
  translations: Translations;
  loading: boolean;
  changeLanguage: (newLanguage: Language) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple fallback translations for critical errors
const minimalFallback: Record<Language, Translations> = {
  ro: {
    loading: 'Se încarcă...',
    error: 'Eroare'
  },
  en: {
    loading: 'Loading...',
    error: 'Error'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ro');
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);

  // Simple translation function with better error handling
  const translateKey = useCallback((translations: Translations, key: string): string => {
    if (!key || typeof key !== 'string') {
      console.warn('Invalid translation key:', key);
      return '';
    }

    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation missing: "${key}"`);
        return key; // Return the key itself if not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  }, []);

  // Load translations from JSON file with simplified error handling
  const loadTranslations = useCallback(async (lang: Language): Promise<Translations> => {
    try {
      console.log(`Loading translations for: ${lang}`);
      const response = await fetch(`/locales/${lang}.json?v=${Date.now()}`, {
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Successfully loaded ${lang} translations`);
      return data;
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
      return minimalFallback[lang];
    }
  }, []);

  // Get stored language with fallback
  const getStoredLanguage = (): Language => {
    try {
      const stored = localStorage.getItem('language');
      return (stored === 'en' || stored === 'ro') ? stored : 'ro';
    } catch {
      return 'ro';
    }
  };

  // Store language with error handling
  const setStoredLanguage = (lang: Language): void => {
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      console.warn('Failed to store language:', error);
    }
  };

  // Initialize translations on mount
  useEffect(() => {
    const initializeTranslations = async () => {
      try {
        const initialLanguage = getStoredLanguage();
        console.log(`Initializing with language: ${initialLanguage}`);
        
        setLanguage(initialLanguage);
        
        const loadedTranslations = await loadTranslations(initialLanguage);
        setTranslations(loadedTranslations);
      } catch (error) {
        console.error('Failed to initialize translations:', error);
        // Set minimal fallback
        setTranslations(minimalFallback[language]);
      } finally {
        setLoading(false);
      }
    };

    initializeTranslations();
  }, [loadTranslations, language]);

  // Change language function
  const changeLanguage = useCallback(async (newLanguage: Language) => {
    if (newLanguage === language) return;

    try {
      console.log(`Changing language to: ${newLanguage}`);
      setLanguage(newLanguage);
      setStoredLanguage(newLanguage);
      
      const newTranslations = await loadTranslations(newLanguage);
      setTranslations(newTranslations);
    } catch (error) {
      console.error('Failed to change language:', error);
      // Revert on error
      setLanguage(language);
      setTranslations(minimalFallback[language]);
    }
  }, [language, loadTranslations]);

  // Translation function
  const t = useCallback((key: string): string => {
    return translateKey(translations, key);
  }, [translations, translateKey]);

  // Create context value
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
    console.error('useLanguageContext must be used within a LanguageProvider');
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
