
import type { Json } from '@/integrations/supabase/types';

export interface Question {
  id: string;
  question_text_ro: string;
  question_text_en?: string | null;
  question_order: number;
  options: Json;
  scoring_weights?: Json | null;
}

export const getBestAnswerOption = (question: Question): number | null => {
  if (!question.scoring_weights) return null;
  
  const weights = question.scoring_weights as number[];
  if (!Array.isArray(weights)) return null;
  
  const maxScore = Math.max(...weights);
  return weights.indexOf(maxScore);
};

export const getUserScore = (question: Question, userAnswer: number): number => {
  if (!question.scoring_weights || userAnswer === undefined) return 0;
  
  const weights = question.scoring_weights as number[];
  if (!Array.isArray(weights) || userAnswer >= weights.length) return 0;
  
  return weights[userAnswer] || 0;
};

export const getMaxPossibleScore = (question: Question): number => {
  if (!question.scoring_weights) return 0;
  
  const weights = question.scoring_weights as number[];
  if (!Array.isArray(weights)) return 0;
  
  return Math.max(...weights);
};

export const getOptionLabel = (question: Question, optionIndex: number): string => {
  if (!question.options) return '';
  
  const options = question.options as string[];
  if (!Array.isArray(options) || optionIndex >= options.length) return '';
  
  return options[optionIndex] || '';
};
