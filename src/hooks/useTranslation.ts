import { useLanguage } from './useLanguage';
import { interpolateVariables } from '@/utils/i18n/translationUtils';

/**
 * Hook personalizat pentru traduceri cu suport pentru interpolarea variabilelor
 * @returns Funcții pentru traducere și schimbarea limbii
 */
export function useTranslation() {
  const { t, language, setLanguage } = useLanguage();
  
  /**
   * Traduce o cheie și interpolează variabilele în textul rezultat
   * @param key Cheia de traducere
   * @param variables Obiect cu variabilele pentru interpolare
   * @returns Textul tradus cu variabilele interpolate
   */
  const translate = (key: string, variables?: Record<string, string | number>) => {
    const translatedText = t(key);
    
    if (!variables || Object.keys(variables).length === 0) {
      return translatedText;
    }
    
    return interpolateVariables(translatedText, variables);
  };
  
  return {
    t: translate,
    language,
    setLanguage
  };
}