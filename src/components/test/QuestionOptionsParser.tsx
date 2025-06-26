
import type { Json } from '@/integrations/supabase/types';
import { translateOptions } from '@/utils/testOptionsTranslations';

export interface ParsedOption {
  value: number;
  label: string;
}

// Comprehensive helper function to safely parse and normalize question options
export const parseQuestionOptions = (options: Json, language: 'ro' | 'en' = 'ro'): ParsedOption[] => {
  console.log('=== OPTION PARSING DEBUG ===');
  console.log('Input options:', options);
  console.log('Language:', language);
  console.log('Type of options:', typeof options);
  
  if (!options) {
    console.log('No options provided, using default Likert scale');
    return getDefaultLikertScale(language);
  }

  // Check for corrupted [object Object] data
  if (isCorruptedObjectData(options)) {
    console.log('Detected corrupted [object Object] data, using default Likert scale');
    return getDefaultLikertScale(language);
  }

  try {
    let parsedOptions: ParsedOption[] = [];

    // Handle array format
    if (Array.isArray(options)) {
      console.log('Options is array, length:', options.length);
      
      if (options.length === 0) {
        console.log('Empty array, using default Likert scale');
        return getDefaultLikertScale(language);
      }
      
      // Check if array contains corrupted objects
      if (options.some(opt => isCorruptedObjectData(opt))) {
        console.log('Array contains corrupted objects, using default Likert scale');
        return getDefaultLikertScale(language);
      }
      
      console.log('First option:', options[0]);
      console.log('Type of first option:', typeof options[0]);
      
      // Objects with label/value properties (proper format)
      if (typeof options[0] === 'object' && options[0] !== null) {
        const firstItem = options[0] as Record<string, any>;
        console.log('First item keys:', Object.keys(firstItem));
        
        if ('label' in firstItem && 'value' in firstItem) {
          console.log('Found proper label/value format');
          parsedOptions = options.map((opt: any) => ({
            value: ensureValidNumber(opt.value),
            label: String(opt.label || `Option ${opt.value || 1}`)
          })).sort((a, b) => a.value - b.value);
        } else if ('text' in firstItem && 'value' in firstItem) {
          console.log('Found text/value format');
          parsedOptions = options.map((opt: any) => ({
            value: ensureValidNumber(opt.value),
            label: String(opt.text || `Option ${opt.value || 1}`)
          })).sort((a, b) => a.value - b.value);
        } else if ('value' in firstItem) {
          console.log('Found value-only format');
          parsedOptions = options.map((opt: any, index: number) => ({
            value: ensureValidNumber(opt.value, index),
            label: String(opt.label || opt.text || `Option ${index + 1}`)
          })).sort((a, b) => a.value - b.value);
        } else {
          // Handle objects without clear structure
          console.log('Object format without clear structure, attempting generic parsing');
          parsedOptions = options.map((opt: any, index: number) => {
            if (typeof opt === 'object' && opt !== null && !isCorruptedObjectData(opt)) {
              // Try to find a text-like property
              const textValue = opt.label || opt.text || opt.name || opt.title || Object.values(opt)[0];
              return {
                value: index,
                label: String(textValue || `Option ${index + 1}`)
              };
            }
            return {
              value: index,
              label: String(opt || `Option ${index + 1}`)
            };
          });
        }
      } else if (typeof options[0] === 'string') {
        // Array of strings
        console.log('Array of strings format');
        parsedOptions = options.map((label: string, index: number) => ({
          value: index,
          label: String(label)
        }));
      } else {
        // Array of primitives
        console.log('Array of primitives format');
        parsedOptions = options.map((item: any, index: number) => ({
          value: index,
          label: String(item || `Option ${index + 1}`)
        }));
      }
    } else if (typeof options === 'object') {
      // Handle object format (key-value pairs)
      console.log('Options is object');
      const entries = Object.entries(options);
      console.log('Object entries:', entries);
      
      if (entries.length === 0) {
        console.log('Empty object, using default Likert scale');
        return getDefaultLikertScale(language);
      }
      
      parsedOptions = entries
        .map(([key, value]) => ({
          value: ensureValidNumber(key),
          label: String(value || `Option ${key}`)
        }))
        .sort((a, b) => a.value - b.value);
    } else if (typeof options === 'string') {
      // Handle JSON string
      console.log('Options is string, attempting to parse JSON');
      
      // Check for corrupted string data
      if (options.includes('[object Object]')) {
        console.log('String contains [object Object], using default Likert scale');
        return getDefaultLikertScale(language);
      }
      
      try {
        const parsed = JSON.parse(options);
        console.log('Successfully parsed JSON string:', parsed);
        return parseQuestionOptions(parsed, language);
      } catch (jsonError) {
        console.log('Failed to parse JSON string, treating as single option');
        parsedOptions = [{ value: 0, label: options }];
      }
    }

    // Apply translations if we have parsed options
    if (parsedOptions.length > 0) {
      console.log('Parsed options before translation:', parsedOptions);
      
      // Extract labels for translation
      const labels = parsedOptions.map(opt => opt.label);
      const translatedLabels = translateOptions(labels, language);
      
      // Apply translated labels
      const finalOptions = parsedOptions.map((opt, index) => ({
        ...opt,
        label: translatedLabels[index] || opt.label
      }));
      
      console.log('Final translated options:', finalOptions);
      return finalOptions;
    }

    console.log('No valid options parsed, using default');
  } catch (error) {
    console.error('Option parsing error:', error);
  }

  console.log('Falling back to default Likert scale');
  return getDefaultLikertScale(language);
};

// Helper function to detect corrupted [object Object] data
const isCorruptedObjectData = (data: any): boolean => {
  if (typeof data === 'string') {
    return data === '[object Object]' || data.includes('[object Object]');
  }
  
  if (Array.isArray(data)) {
    return data.some(item => 
      typeof item === 'string' && (item === '[object Object]' || item.includes('[object Object]'))
    );
  }
  
  if (typeof data === 'object' && data !== null) {
    // Check if object has meaningless structure that indicates corruption
    const values = Object.values(data);
    return values.some(val => 
      typeof val === 'string' && (val === '[object Object]' || val.includes('[object Object]'))
    );
  }
  
  return false;
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
