import { Translations } from '@/contexts/LanguageContext';

/**
 * Interpolează variabilele în textul tradus
 * @param text Textul tradus care conține placeholdere de tipul {{variableName}}
 * @param variables Obiect cu variabilele pentru interpolarea în text
 * @returns Textul cu variabilele interpolate
 */
export function interpolateVariables(text: string, variables: Record<string, string | number>): string {
  if (!text || typeof text !== 'string') return '';
  
  return Object.entries(variables).reduce((result, [key, value]) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    return result.replace(regex, String(value));
  }, text);
}

/**
 * Verifică dacă o cheie de traducere există în obiectul de traduceri
 * @param translations Obiectul cu traduceri
 * @param key Cheia de traducere (poate fi nested, ex: 'common.buttons.save')
 * @returns Boolean care indică dacă cheia există
 */
export function translationKeyExists(translations: Translations, key: string): boolean {
  if (!key || typeof key !== 'string') return false;
  
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return false;
    }
  }
  
  return true;
}

/**
 * Obține toate cheile de traducere dintr-un obiect de traduceri
 * @param translations Obiectul cu traduceri
 * @param prefix Prefixul pentru cheile nested (folosit recursiv)
 * @returns Array cu toate cheile de traducere
 */
export function getAllTranslationKeys(translations: Translations, prefix = ''): string[] {
  let keys: string[] = [];
  
  for (const key in translations) {
    const currentKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof translations[key] === 'object' && translations[key] !== null && !Array.isArray(translations[key])) {
      keys = [...keys, ...getAllTranslationKeys(translations[key] as Translations, currentKey)];
    } else {
      keys.push(currentKey);
    }
  }
  
  return keys;
}

/**
 * Compară două obiecte de traduceri și găsește cheile care lipsesc
 * @param source Obiectul sursă de traduceri
 * @param target Obiectul țintă de traduceri
 * @returns Array cu cheile care lipsesc în obiectul țintă
 */
export function findMissingTranslationKeys(source: Translations, target: Translations): string[] {
  const sourceKeys = getAllTranslationKeys(source);
  return sourceKeys.filter(key => !translationKeyExists(target, key));
}