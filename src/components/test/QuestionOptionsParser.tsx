
import type { Json } from '@/integrations/supabase/types';

export interface ParsedOption {
  value: number;
  label: string;
}

// Comprehensive helper function to safely parse and normalize question options
export const parseQuestionOptions = (options: Json, language: 'ro' | 'en' = 'ro'): ParsedOption[] => {
  console.log('=== OPTION PARSING ===');
  console.log('Input:', options);
  console.log('Language:', language);
  
  if (!options) {
    console.log('No options, using default Likert scale');
    return getDefaultLikertScale(language);
  }

  try {
    // Handle array format
    if (Array.isArray(options)) {
      if (options.length === 0) return getDefaultLikertScale(language);
      
      // Objects with label/value properties (proper format)
      if (typeof options[0] === 'object' && options[0] !== null) {
        const firstItem = options[0] as Record<string, any>;
        
        if ('label' in firstItem && 'value' in firstItem) {
          return options.map((opt: any) => ({
            value: ensureValidNumber(opt.value),
            label: String(opt.label || `Option ${opt.value || 1}`)
          })).sort((a, b) => a.value - b.value);
        }
        
        if ('text' in firstItem && 'value' in firstItem) {
          return options.map((opt: any) => ({
            value: ensureValidNumber(opt.value),
            label: String(opt.text || `Option ${opt.value || 1}`)
          })).sort((a, b) => a.value - b.value);
        }
        
        if ('value' in firstItem) {
          return options.map((opt: any, index: number) => ({
            value: ensureValidNumber(opt.value, index),
            label: String(opt.label || opt.text || `Option ${index + 1}`)
          })).sort((a, b) => a.value - b.value);
        }
      }
      
      // Array of strings
      if (typeof options[0] === 'string') {
        return options.map((label: string, index: number) => ({
          value: index,
          label: String(label)
        }));
      }
      
      // Array of primitives
      return options.map((item: any, index: number) => ({
        value: index,
        label: String(item || `Option ${index + 1}`)
      }));
    }

    // Handle object format (key-value pairs)
    if (typeof options === 'object') {
      const entries = Object.entries(options);
      if (entries.length === 0) return getDefaultLikertScale(language);
      
      return entries
        .map(([key, value]) => ({
          value: ensureValidNumber(key),
          label: String(value || `Option ${key}`)
        }))
        .sort((a, b) => a.value - b.value);
    }

    // Handle JSON string
    if (typeof options === 'string') {
      try {
        const parsed = JSON.parse(options);
        return parseQuestionOptions(parsed, language);
      } catch {
        return [{ value: 0, label: options }];
      }
    }
  } catch (error) {
    console.error('Option parsing error:', error);
  }

  return getDefaultLikertScale(language);
};

const ensureValidNumber = (value: any, fallback: number = 0): number => {
  if (typeof value === 'number' && !isNaN(value) && value >= 0) {
    return Math.round(value);
  }
  
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  
  return Math.max(0, fallback);
};

const getDefaultLikertScale = (language: 'ro' | 'en' = 'ro'): ParsedOption[] => {
  if (language === 'en') {
    return [
      { value: 0, label: 'Strongly Disagree' },
      { value: 1, label: 'Disagree' },
      { value: 2, label: 'Neutral' },
      { value: 3, label: 'Agree' },
      { value: 4, label: 'Strongly Agree' }
    ];
  }
  
  return [
    { value: 0, label: 'Complet dezacord' },
    { value: 1, label: 'Dezacord' },
    { value: 2, label: 'Neutru' },
    { value: 3, label: 'Acord' },
    { value: 4, label: 'Complet de acord' }
  ];
};
