
import { useLanguageContext } from '@/contexts/LanguageContext';

/**
 * Hook consolidat pentru traduceri cu suport complet pentru interpolarea variabilelor
 * @returns Funcții pentru traducere și schimbarea limbii
 */
export function useTranslation() {
  const { language, setLanguage, translations, loading, changeLanguage, t: contextT } = useLanguageContext();
  
  /**
   * Traduce o cheie și interpolează variabilele în textul rezultat
   * @param key Cheia de traducere
   * @param variables Obiect cu variabilele pentru interpolare (opțional)
   * @returns Textul tradus cu variabilele interpolate
   */
  const t = (key: string, variables?: Record<string, string | number>): string => {
    const translatedText = contextT(key);
    
    // Dacă nu avem variabile, returnăm direct textul tradus
    if (!variables || Object.keys(variables).length === 0) {
      return translatedText;
    }
    
    // Interpolăm variabilele în textul tradus
    let result = translatedText;
    for (const [varKey, varValue] of Object.entries(variables)) {
      const placeholder = `{{${varKey}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), String(varValue));
    }
    
    return result;
  };
  
  return {
    t,
    language,
    setLanguage,
    changeLanguage,
    translations,
    loading
  };
}

// Alias pentru compatibilitate - toate hook-urile să folosească useTranslation
export const useLanguage = useTranslation;
