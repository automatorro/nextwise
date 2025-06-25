
import { useState, useEffect } from 'react';

export type Language = 'ro' | 'en';

interface Translations {
  [key: string]: any;
}

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('ro');
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);

  const loadTranslations = async (lang: Language) => {
    try {
      setLoading(true);
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}`);
      }
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to empty object if translations fail to load
      setTranslations({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ro' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
      loadTranslations(savedLanguage);
    } else {
      loadTranslations('ro');
    }
  }, []);

  useEffect(() => {
    if (language) {
      loadTranslations(language);
    }
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string) => {
    if (loading) {
      return key; // Return key while loading
    }

    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return {
    language,
    changeLanguage,
    t,
    loading,
  };
};
