
import type { Translations } from '@/types/language';

export const translateKey = (translations: Translations, key: string): any => {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  // Return the value if found (preserving arrays, objects, etc.), otherwise return the key as fallback
  return value !== undefined ? value : key;
};

export const getStoredLanguage = (): string | null => {
  return localStorage.getItem('language');
};

export const setStoredLanguage = (language: string): void => {
  localStorage.setItem('language', language);
};
