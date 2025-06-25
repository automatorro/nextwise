
import { supabase } from '@/integrations/supabase/client';

// Utility for batch translating test questions using Gemini API
// This will be used to populate the question_text_en and options_en fields

export interface QuestionToTranslate {
  id: string;
  question_text_ro: string;
  options: string[];
}

export interface TranslatedQuestion {
  id: string;
  question_text_en: string;
  options_en: string[];
}

export interface TranslationResult {
  success: boolean;
  translated: number;
  total: number;
  translations?: TranslatedQuestion[];
  error?: string;
}

// Function to get all untranslated questions from a specific test type
export const getUntranslatedQuestions = async (testTypeId?: string): Promise<QuestionToTranslate[]> => {
  let query = supabase
    .from('test_questions')
    .select('id, question_text_ro, options')
    .is('question_text_en', null);
  
  if (testTypeId) {
    query = query.eq('test_type_id', testTypeId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching untranslated questions:', error);
    throw error;
  }
  
  return data?.map(q => ({
    id: q.id,
    question_text_ro: q.question_text_ro,
    options: Array.isArray(q.options) ? q.options.map(opt => String(opt)) : []
  })) || [];
};

// Function to translate a batch of questions using the Supabase edge function
export const translateQuestionsBatch = async (
  questions: QuestionToTranslate[]
): Promise<TranslationResult> => {
  try {
    console.log(`Translating ${questions.length} questions...`);
    
    const { data, error } = await supabase.functions.invoke('translate-questions', {
      body: { questions }
    });
    
    if (error) {
      console.error('Edge function error:', error);
      throw error;
    }
    
    return data as TranslationResult;
  } catch (error) {
    console.error('Translation error:', error);
    return {
      success: false,
      translated: 0,
      total: questions.length,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Function to translate all questions for a specific test type
export const translateTestQuestions = async (testTypeId: string): Promise<TranslationResult> => {
  const untranslatedQuestions = await getUntranslatedQuestions(testTypeId);
  
  if (untranslatedQuestions.length === 0) {
    return {
      success: true,
      translated: 0,
      total: 0
    };
  }
  
  return await translateQuestionsBatch(untranslatedQuestions);
};

// Function to translate ALL questions in the database
export const translateAllQuestions = async (): Promise<TranslationResult> => {
  const untranslatedQuestions = await getUntranslatedQuestions();
  
  if (untranslatedQuestions.length === 0) {
    return {
      success: true,
      translated: 0,
      total: 0
    };
  }
  
  // Process in smaller chunks to avoid timeouts
  const chunkSize = 20;
  let totalTranslated = 0;
  const allTranslations: TranslatedQuestion[] = [];
  
  for (let i = 0; i < untranslatedQuestions.length; i += chunkSize) {
    const chunk = untranslatedQuestions.slice(i, i + chunkSize);
    const result = await translateQuestionsBatch(chunk);
    
    if (result.success) {
      totalTranslated += result.translated;
      if (result.translations) {
        allTranslations.push(...result.translations);
      }
    } else {
      console.error(`Failed to translate chunk ${i / chunkSize + 1}:`, result.error);
    }
    
    // Add delay between chunks
    if (i + chunkSize < untranslatedQuestions.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  return {
    success: totalTranslated > 0,
    translated: totalTranslated,
    total: untranslatedQuestions.length,
    translations: allTranslations
  };
};

// Function to get translation progress
export const getTranslationProgress = async (): Promise<{
  total: number;
  translated: number;
  remaining: number;
  percentage: number;
}> => {
  const { data: allQuestions } = await supabase
    .from('test_questions')
    .select('id, question_text_en');
  
  if (!allQuestions) {
    return { total: 0, translated: 0, remaining: 0, percentage: 0 };
  }
  
  const total = allQuestions.length;
  const translated = allQuestions.filter(q => q.question_text_en).length;
  const remaining = total - translated;
  const percentage = total > 0 ? Math.round((translated / total) * 100) : 0;
  
  return { total, translated, remaining, percentage };
};
