
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
  const validateTranslations = (trans: Translations): boolean => {
    if (!trans || typeof trans !== 'object') {
      console.warn('🚨 Invalid translations object:', trans);
      return false;
    }
    
    // Check for essential keys that should exist
    const essentialKeys = ['nav', 'common', 'home'];
    const hasEssentialKeys = essentialKeys.some(key => trans[key] && typeof trans[key] === 'object');
    
    if (!hasEssentialKeys) {
      console.warn('🚨 Translations missing essential keys:', Object.keys(trans));
      return false;
    }
    
    return true;
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
        
        console.log(`🔄 Loading translations for: ${initialLanguage}`);
        
        // Try to load fresh translations
        let freshTranslations: Translations;
        try {
          freshTranslations = await loadTranslations(initialLanguage);
          
          // Validate the loaded translations
          if (!validateTranslations(freshTranslations)) {
            console.warn('⚠️ Loaded translations failed validation, using fallback');
            freshTranslations = fallbackTranslations[initialLanguage];
          }
        } catch (error) {
          console.error('❌ Failed to load translations, using fallback:', error);
          freshTranslations = fallbackTranslations[initialLanguage];
        }
        
        // Set language and translations
        setLanguage(initialLanguage);
        setTranslations(freshTranslations);
        globalTranslationsCache.set(initialLanguage, freshTranslations);
        
        console.log(`✅ Translations initialized successfully for: ${initialLanguage}`);
        console.log('🔍 Available translation keys:', Object.keys(freshTranslations));
        
        // Preload the other language
        const otherLanguage = initialLanguage === 'ro' ? 'en' : 'ro';
        try {
          const otherTranslations = await loadTranslations(otherLanguage);
          if (validateTranslations(otherTranslations)) {
            globalTranslationsCache.set(otherLanguage, otherTranslations);
            console.log(`✅ Preloaded translations for: ${otherLanguage}`);
          }
        } catch (error) {
          console.warn(`⚠️ Failed to preload ${otherLanguage}, will load on demand`);
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
      // Check if translations are already cached and valid
      let newTranslations = globalTranslationsCache.get(newLanguage);
      
      if (!newTranslations || !validateTranslations(newTranslations)) {
        console.log(`📥 Loading fresh translations for ${newLanguage}...`);
        try {
          newTranslations = await loadTranslations(newLanguage);
          
          if (!validateTranslations(newTranslations)) {
            console.warn(`⚠️ Loaded translations for ${newLanguage} failed validation, using fallback`);
            newTranslations = fallbackTranslations[newLanguage];
          }
        } catch (error) {
          console.error(`❌ Failed to load translations for ${newLanguage}:`, error);
          newTranslations = fallbackTranslations[newLanguage];
        }
        
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
      console.log('🔍 Current translation keys:', Object.keys(newTranslations));
      
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
    const result = translateKey(translations, key);
    
    // Additional debugging for missing translations
    if (result === key) {
      console.warn(`🔍 Translation key "${key}" returned as-is. Available top-level keys:`, Object.keys(translations));
    }
    
    return result;
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
