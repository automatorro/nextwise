
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { Language, Translations } from '@/types/language';
import { fallbackTranslations } from '@/utils/fallbackTranslations';
import { loadTranslations, preloadAllTranslations } from '@/utils/translationLoader';
import { translateKey, getStoredLanguage, setStoredLanguage, clearTranslationResultCache } from '@/utils/translationUtils';

interface LanguageContextType {
  language: Language;
  translations: Translations;
  loading: boolean;
  changeLanguage: (newLanguage: Language) => Promise<void>;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Global cache for translations - shared across all components
const globalTranslationsCache = new Map<Language, Translations>();

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ro');
  const [translations, setTranslations] = useState<Translations>(fallbackTranslations.ro);
  const [loading, setLoading] = useState(true);
  const isInitializing = useRef(true);
  const isChangingLanguage = useRef(false);

  // Initialize translations and preload both languages
  useEffect(() => {
    const initializeTranslations = async () => {
      try {
        console.log('🌐 Initializing translations...');
        
        // Clear all caches to force fresh reload
        globalTranslationsCache.clear();
        clearTranslationResultCache();
        
        // Get stored language or default to 'ro'
        const savedLanguage = getStoredLanguage() as Language;
        const initialLanguage = savedLanguage && (savedLanguage === 'ro' || savedLanguage === 'en') ? savedLanguage : 'ro';
        
        // Set initial language
        setLanguage(initialLanguage);
        
        // Load fresh translations
        const initialTranslations = await loadTranslations(initialLanguage);
        
        // Cache and set translations
        globalTranslationsCache.set(initialLanguage, initialTranslations);
        setTranslations(initialTranslations);
        
        // Preload the other language in background
        const otherLanguage = initialLanguage === 'ro' ? 'en' : 'ro';
        const otherTranslations = await loadTranslations(otherLanguage);
        globalTranslationsCache.set(otherLanguage, otherTranslations);
        
        console.log(`🚀 Initial translations loaded for: ${initialLanguage}`);
      } catch (error) {
        console.error('❌ Error initializing translations:', error);
        // Fallback to basic translations
        setTranslations(fallbackTranslations[language]);
        globalTranslationsCache.set(language, fallbackTranslations[language]);
      } finally {
        setLoading(false);
        isInitializing.current = false;
      }
    };

    initializeTranslations();
  }, []);

  const changeLanguage = useCallback(async (newLanguage: Language) => {
    if (newLanguage === language || isChangingLanguage.current) {
      console.log('🔄 Language change skipped - same language or already changing');
      return;
    }

    console.log(`🔄 Changing language from ${language} to ${newLanguage}`);
    isChangingLanguage.current = true;

    try {
      // Check if translations are already cached
      let newTranslations = globalTranslationsCache.get(newLanguage);
      
      if (!newTranslations) {
        console.log(`📥 Loading translations for ${newLanguage}...`);
        newTranslations = await loadTranslations(newLanguage);
        globalTranslationsCache.set(newLanguage, newTranslations);
      } else {
        console.log(`⚡ Using cached translations for ${newLanguage}`);
      }

      // Update state immediately
      setLanguage(newLanguage);
      setTranslations(newTranslations);
      setStoredLanguage(newLanguage);
      
      // Clear translation result cache to ensure fresh results
      clearTranslationResultCache();
      
      console.log(`✅ Language changed to ${newLanguage} successfully`);
    } catch (error) {
      console.error(`❌ Error changing language to ${newLanguage}:`, error);
      // Fallback to cached translations or basic fallback
      const fallbackTranslations_local = globalTranslationsCache.get(newLanguage) || fallbackTranslations[newLanguage];
      setTranslations(fallbackTranslations_local);
      globalTranslationsCache.set(newLanguage, fallbackTranslations_local);
      setLanguage(newLanguage);
      setStoredLanguage(newLanguage);
    } finally {
      isChangingLanguage.current = false;
    }
  }, [language]);

  const t = useCallback((key: string) => {
    return translateKey(translations, key);
  }, [translations]);

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
