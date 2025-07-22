
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

// Global cache for translations - shared across all components
const globalTranslationsCache = new Map<Language, Translations>();

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ro');
  const [translations, setTranslations] = useState<Translations>(fallbackTranslations.ro);
  const [loading, setLoading] = useState(true);
  const isInitializing = useRef(true);
  const isChangingLanguage = useRef(false);

  // Function to validate translations object
  const validateTranslations = (trans: Translations, lang: Language): boolean => {
    if (!trans || typeof trans !== 'object') {
      console.warn(`🚨 Invalid translations object for ${lang}:`, trans);
      return false;
    }
    
    // Check for essential keys that should exist based on fallback structure
    const essentialKeys = ['nav', 'common', 'home'];
    const hasEssentialKeys = essentialKeys.every(key => {
      const hasKey = trans[key] && typeof trans[key] === 'object';
      if (!hasKey) {
        console.warn(`🚨 Missing essential key "${key}" in ${lang} translations`);
      }
      return hasKey;
    });
    
    if (!hasEssentialKeys) {
      console.warn(`🚨 ${lang} translations missing essential keys:`, Object.keys(trans));
      return false;
    }
    
    console.log(`✅ ${lang} translations validation passed`);
    return true;
  };

  // Function to merge translations with fallback
  const mergeWithFallback = (loadedTranslations: Translations, lang: Language): Translations => {
    const fallback = fallbackTranslations[lang];
    
    // If loaded translations are invalid, use fallback
    if (!validateTranslations(loadedTranslations, lang)) {
      console.warn(`⚠️ Using fallback translations for ${lang} due to validation failure`);
      return fallback;
    }
    
    // Deep merge loaded translations with fallback
    const merged = { ...fallback };
    
    Object.keys(loadedTranslations).forEach(key => {
      if (typeof loadedTranslations[key] === 'object' && typeof fallback[key] === 'object') {
        merged[key] = { ...fallback[key], ...loadedTranslations[key] };
      } else {
        merged[key] = loadedTranslations[key];
      }
    });
    
    console.log(`✅ Successfully merged ${lang} translations with fallback`);
    return merged;
  };

  // Initialize translations and preload both languages
  useEffect(() => {
    const initializeTranslations = async () => {
      try {
        console.log('🌐 Initializing translations system...');
        
        // Clear all caches to start fresh
        globalTranslationsCache.clear();
        clearTranslationsCache();
        clearTranslationResultCache();
        
        // Get stored language or default to 'ro'
        const savedLanguage = getStoredLanguage() as Language;
        const initialLanguage = savedLanguage && (savedLanguage === 'ro' || savedLanguage === 'en') ? savedLanguage : 'ro';
        
        console.log(`🔄 Initializing with language: ${initialLanguage}`);
        
        // Start with fallback translations immediately
        let initialTranslations = fallbackTranslations[initialLanguage];
        setLanguage(initialLanguage);
        setTranslations(initialTranslations);
        
        console.log(`⚡ Set initial fallback translations for: ${initialLanguage}`);
        
        // Try to load fresh translations in background
        try {
          const freshTranslations = await loadTranslations(initialLanguage);
          const mergedTranslations = mergeWithFallback(freshTranslations, initialLanguage);
          
          // Update with fresh translations
          setTranslations(mergedTranslations);
          globalTranslationsCache.set(initialLanguage, mergedTranslations);
          
          console.log(`✅ Updated with fresh translations for: ${initialLanguage}`);
        } catch (error) {
          console.warn(`⚠️ Failed to load fresh translations for ${initialLanguage}, using fallback:`, error);
          globalTranslationsCache.set(initialLanguage, initialTranslations);
        }
        
        // Preload the other language
        const otherLanguage = initialLanguage === 'ro' ? 'en' : 'ro';
        try {
          const otherTranslations = await loadTranslations(otherLanguage);
          const mergedOtherTranslations = mergeWithFallback(otherTranslations, otherLanguage);
          globalTranslationsCache.set(otherLanguage, mergedOtherTranslations);
          console.log(`✅ Preloaded translations for: ${otherLanguage}`);
        } catch (error) {
          console.warn(`⚠️ Failed to preload ${otherLanguage}, using fallback`);
          globalTranslationsCache.set(otherLanguage, fallbackTranslations[otherLanguage]);
        }
        
      } catch (error) {
        console.error('❌ Critical error in translation initialization:', error);
        // Emergency fallback
        const emergencyLanguage = 'ro';
        setLanguage(emergencyLanguage);
        setTranslations(fallbackTranslations[emergencyLanguage]);
        globalTranslationsCache.set(emergencyLanguage, fallbackTranslations[emergencyLanguage]);
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
      
      if (!newTranslations || !validateTranslations(newTranslations, newLanguage)) {
        console.log(`📥 Loading fresh translations for ${newLanguage}...`);
        
        // Use fallback immediately while loading
        const fallbackTranslation = fallbackTranslations[newLanguage];
        setTranslations(fallbackTranslation);
        
        try {
          const freshTranslations = await loadTranslations(newLanguage);
          newTranslations = mergeWithFallback(freshTranslations, newLanguage);
        } catch (error) {
          console.error(`❌ Failed to load translations for ${newLanguage}:`, error);
          newTranslations = fallbackTranslation;
        }
        
        globalTranslationsCache.set(newLanguage, newTranslations);
      } else {
        console.log(`⚡ Using cached translations for ${newLanguage}`);
      }

      // Update state
      setLanguage(newLanguage);
      setTranslations(newTranslations);
      setStoredLanguage(newLanguage);
      
      // Clear translation result cache to ensure fresh results
      clearTranslationResultCache();
      
      console.log(`✅ Language changed to ${newLanguage} successfully`);
      console.log('🔍 Available translation keys:', Object.keys(newTranslations));
      
    } catch (error) {
      console.error(`❌ Critical error changing language to ${newLanguage}:`, error);
      // Emergency fallback
      const emergencyTranslations = fallbackTranslations[newLanguage];
      setTranslations(emergencyTranslations);
      globalTranslationsCache.set(newLanguage, emergencyTranslations);
      setLanguage(newLanguage);
      setStoredLanguage(newLanguage);
    } finally {
      isChangingLanguage.current = false;
    }
  }, [language]);

  const t = useCallback((key: string) => {
    try {
      const result = translateKey(translations, key);
      
      // Additional debugging for missing translations
      if (result === key) {
        console.warn(`🔍 Translation key "${key}" returned as-is.`);
        console.warn('Current translations structure:', {
          language,
          topLevelKeys: Object.keys(translations),
          hasNav: !!translations.nav,
          hasCommon: !!translations.common,
          hasHome: !!translations.home
        });
        
        // Try fallback translation
        const fallbackResult = translateKey(fallbackTranslations[language], key);
        if (fallbackResult !== key) {
          console.log(`✅ Found fallback translation for "${key}": ${fallbackResult}`);
          return fallbackResult;
        }
      }
      
      return result;
    } catch (error) {
      console.error(`❌ Error translating key "${key}":`, error);
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
