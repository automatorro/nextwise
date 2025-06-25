
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Question {
  id: string;
  question_text: string;
  question_order: number;
  options: any[];
  scoring_weights?: any;
}

interface CorrectAnswersSectionProps {
  testTypeId: string;
  userAnswers: { [questionId: string]: number };
}

const CorrectAnswersSection = ({ testTypeId, userAnswers }: CorrectAnswersSectionProps) => {
  const { data: questions, isLoading } = useQuery({
    queryKey: ['test-questions', testTypeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_questions')
        .select('*')
        .eq('test_type_id', testTypeId)
        .order('question_order');
      
      if (error) throw error;
      return data as Question[];
    },
    enabled: !!testTypeId
  });

  const getCorrectAnswer = (question: Question) => {
    if (!question.scoring_weights) return null;
    
    // Find the option with the highest score in scoring_weights
    let maxScore = -1;
    let correctOptionValue = null;
    
    Object.entries(question.scoring_weights).forEach(([key, weights]: [string, any]) => {
      if (typeof weights === 'object') {
        Object.entries(weights).forEach(([optionValue, score]: [string, any]) => {
          if (typeof score === 'number' && score > maxScore) {
            maxScore = score;
            correctOptionValue = parseInt(optionValue);
          }
        });
      }
    });
    
    return correctOptionValue;
  };

  const getOptionLabel = (question: Question, optionValue: number) => {
    const option = question.options.find((opt: any) => opt.value === optionValue);
    return option ? option.label : `Opțiunea ${optionValue}`;
  };

  const getUserAnswerStatus = (questionId: string, correctAnswer: number | null) => {
    const userAnswer = userAnswers[questionId];
    if (correctAnswer === null) return 'unknown';
    return userAnswer === correctAnswer ? 'correct' : 'incorrect';
  };

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Răspunsuri Corecte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Se încarcă răspunsurile corecte...</div>
        </CardContent>
      </Card>
    );
  }

  if (!questions || questions.length === 0) return null;

  const correctCount = questions.filter(q => {
    const correctAnswer = getCorrectAnswer(q);
    return correctAnswer !== null && userAnswers[q.id] === correctAnswer;
  }).length;

  return (
    <Card className="mb-8 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Răspunsuri Corecte</span>
          <Badge variant="outline" className="text-sm">
            {correctCount}/{questions.length} corecte
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Vezi răspunsurile corecte și compară-le cu alegerile tale pentru a învăța din greșeli.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question) => {
          const correctAnswer = getCorrectAnswer(question);
          const userAnswer = userAnswers[question.id];
          const status = getUserAnswerStatus(question.id, correctAnswer);
          
          return (
            <div key={question.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900 flex-1 pr-2">
                  {question.question_order}. {question.question_text}
                </h4>
                {status === 'correct' && <CheckCircle className="w-5 h-5 text-green-500 mt-1" />}
                {status === 'incorrect' && <XCircle className="w-5 h-5 text-red-500 mt-1" />}
                {status === 'unknown' && <HelpCircle className="w-5 h-5 text-gray-400 mt-1" />}
              </div>
              
              <div className="space-y-2">
                {correctAnswer !== null && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Răspuns corect
                    </Badge>
                    <span className="text-sm font-medium text-green-700">
                      {getOptionLabel(question, correctAnswer)}
                    </span>
                  </div>
                )}
                
                {userAnswer !== undefined && (
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={status === 'correct' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'}
                    >
                      Răspunsul tău
                    </Badge>
                    <span className={`text-sm font-medium ${status === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
                      {getOptionLabel(question, userAnswer)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CorrectAnswersSection;
