
import type { Language, Translations } from '@/types/language';
import { fallbackTranslations } from './fallbackTranslations';

export const loadTranslations = async (lang: Language): Promise<Translations> => {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      console.warn(`Failed to load translations for ${lang}, using fallback`);
      return fallbackTranslations[lang];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading translations:', error);
    // Use fallback translations
    return fallbackTranslations[lang];
  }
};
