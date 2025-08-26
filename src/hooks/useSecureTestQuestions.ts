import { useMemo } from 'react';
import { useUserRole } from '@/hooks/useUserRole';

interface TestQuestion {
  id: string;
  test_type_id: string;
  question_text_ro: string;
  question_text_en?: string;
  question_order: number;
  question_type: string;
  options: any;
  options_en?: any;
  scoring_weights?: any;
  created_at: string;
}

/**
 * Security hook that filters out sensitive data from test questions for non-admin users
 * This prevents test integrity compromise by hiding scoring weights
 */
export const useSecureTestQuestions = (questions: TestQuestion[] | undefined) => {
  const { isAdmin } = useUserRole();

  const secureQuestions = useMemo(() => {
    if (!questions) return [];

    return questions.map(question => {
      // For non-admin users, remove scoring weights to maintain test integrity
      if (!isAdmin()) {
        const { scoring_weights, ...secureQuestion } = question;
        return {
          ...secureQuestion,
          created_at: secureQuestion.created_at || new Date().toISOString()
        };
      }

      // Admin users can see all data including scoring weights
      return {
        ...question,
        created_at: question.created_at || new Date().toISOString()
      };
    });
  }, [questions, isAdmin]);

  return secureQuestions;
};