
import { useState, useEffect } from 'react';
import type { Language, Translations } from '@/types/language';
import { fallbackTranslations } from '@/utils/fallbackTranslations';
import { loadTranslations } from '@/utils/translationLoader';
import { translateKey, getStoredLanguage, setStoredLanguage } from '@/utils/translationUtils';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('ro');
  const [translations, setTranslations] = useState<Translations>(fallbackTranslations.ro);
  const [loading, setLoading] = useState(true);

  const loadLanguageTranslations = async (lang: Language) => {
    try {
      setLoading(true);
      const data = await loadTranslations(lang);
      setTranslations(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLanguage = getStoredLanguage() as Language;
    if (savedLanguage && (savedLanguage === 'ro' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
      loadLanguageTranslations(savedLanguage);
    } else {
      loadLanguageTranslations('ro');
    }
  }, []);

  useEffect(() => {
    if (language) {
      loadLanguageTranslations(language);
    }
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setStoredLanguage(newLanguage);
  };

  const t = (key: string) => {
    return translateKey(translations, key);
  };

  return {
    language,
    changeLanguage,
    t,
    loading,
  };
};
