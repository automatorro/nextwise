
import { useTranslation } from './useTranslation';

// Deprecated: Use useTranslation instead
// This is kept for backward compatibility but will be removed
export const useLanguage = () => {
  console.warn('useLanguage is deprecated. Use useTranslation instead.');
  return useTranslation();
};
