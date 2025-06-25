
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Question, getUserScore, getMaxPossibleScore } from '@/utils/scoringUtils';
import QuestionAnalysis from './QuestionAnalysis';
import PerformanceSummary from './PerformanceSummary';

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

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Analiza Răspunsurilor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Se încarcă analiza răspunsurilor...</div>
        </CardContent>
      </Card>
    );
  }

  if (!questions || questions.length === 0) return null;

  // Calculează statistici generale
  let totalUserScore = 0;
  let totalMaxScore = 0;
  let questionsWithMaxScore = 0;

  questions.forEach(question => {
    const userAnswer = userAnswers[question.id];
    const userScore = getUserScore(question, userAnswer);
    const maxScore = getMaxPossibleScore(question);
    
    totalUserScore += userScore;
    totalMaxScore += maxScore;
    
    if (userScore === maxScore && maxScore > 0) {
      questionsWithMaxScore++;
    }
  });

  return (
    <Card className="mb-8 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Analiza Detaliată a Răspunsurilor</span>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-sm">
              <Trophy className="w-3 h-3 mr-1" />
              {questionsWithMaxScore}/{questions.length} perfecte
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {totalUserScore}/{totalMaxScore} puncte
            </Badge>
          </div>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Analiza răspunsurilor tale comparativ cu opțiunile cu punctaj maxim. 
          Pentru testele cognitive, fiecare răspuns poate avea punctaje diferite pe multiple dimensiuni.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question) => (
          <QuestionAnalysis
            key={question.id}
            question={question}
            userAnswer={userAnswers[question.id]}
          />
        ))}
        
        <PerformanceSummary
          totalUserScore={totalUserScore}
          totalMaxScore={totalMaxScore}
          questionsWithMaxScore={questionsWithMaxScore}
          totalQuestions={questions.length}
        />
      </CardContent>
    </Card>
  );
};

export default CorrectAnswersSection;
