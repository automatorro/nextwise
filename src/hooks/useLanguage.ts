
import { useState, useEffect } from 'react';

type Language = 'ro' | 'en';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('ro');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ro' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return {
    language,
    changeLanguage,
  };
};
