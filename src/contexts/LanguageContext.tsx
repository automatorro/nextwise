
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Language } from '@/types/language';
import type { Translations } from '@/types/language';

export type { Translations };

interface LanguageContextType {
  language: Language;
  translations: Translations;
  loading: boolean;
  changeLanguage: (newLanguage: Language) => Promise<void>;
  setLanguage: (newLanguage: Language) => void;
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

  // Improved translation function with better error handling and fallback
  const translateKey = useCallback((translations: Translations, key: string): string => {
    if (!key || typeof key !== 'string') {
      if (import.meta.env.DEV) {
        console.warn('Invalid translation key:', key);
      }
      return '';
    }

    const keys = key.split('.');
    let value: any = translations;
    
    // Try to find the translation in the current language
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // If in development mode, show a warning
        if (import.meta.env.DEV) {
          console.warn(`Translation missing: "${key}" in current language`);
        }
        
        // If the value is an array, convert to string
        if (Array.isArray(value)) {
          return '';
        }
        
        // Try to find the key in the fallback language (English)
        if (language !== 'en') {
          try {
            // Attempt to load from fallback translations
            const fallbackValue = minimalFallback['en'];
            let fbValue = fallbackValue;
            
            for (const fbk of keys) {
              if (fbValue && typeof fbValue === 'object' && fbk in fbValue) {
                fbValue = fbValue[fbk];
              } else {
                if (import.meta.env.DEV) {
                  console.warn(`Translation also missing in fallback language: "${key}"`);
                }
                return typeof key === 'string' ? key : '';
              }
            }
            
            if (typeof fbValue === 'string') {
              return fbValue;
            }
          } catch (error) {
            if (import.meta.env.DEV) {
              console.error('Error accessing fallback translation:', error);
            }
          }
        }
        
        return typeof key === 'string' ? key : '';
      }
    }
    
    // Handle arrays and objects properly
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    
    return typeof value === 'string' ? value : (typeof key === 'string' ? key : '');
  }, [language]);

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
    setLanguage,
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
