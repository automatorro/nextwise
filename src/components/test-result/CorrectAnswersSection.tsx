
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, HelpCircle, Trophy } from 'lucide-react';
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

  const getBestAnswerOption = (question: Question) => {
    if (!question.scoring_weights) return null;
    
    console.log('Analyzing scoring weights for question:', question.question_order, question.scoring_weights);
    
    let maxScore = -1;
    let bestOptionValue = null;
    
    // Parcurge toate dimensiunile din scoring_weights
    Object.values(question.scoring_weights).forEach((dimensionWeights: any) => {
      if (typeof dimensionWeights === 'object' && dimensionWeights !== null) {
        // Pentru fiecare dimensiune, găsește opțiunea cu cel mai mare punctaj
        Object.entries(dimensionWeights).forEach(([optionValue, score]: [string, any]) => {
          const numericScore = typeof score === 'number' ? score : 0;
          if (numericScore > maxScore) {
            maxScore = numericScore;
            bestOptionValue = parseInt(optionValue);
          }
        });
      }
    });
    
    console.log('Best option for question', question.question_order, ':', bestOptionValue, 'with score:', maxScore);
    return bestOptionValue;
  };

  const getUserScore = (question: Question, userAnswer: number) => {
    if (!question.scoring_weights || userAnswer === undefined) return 0;
    
    let totalScore = 0;
    
    // Calculează scorul pentru răspunsul utilizatorului pe toate dimensiunile
    Object.values(question.scoring_weights).forEach((dimensionWeights: any) => {
      if (typeof dimensionWeights === 'object' && dimensionWeights !== null) {
        const score = dimensionWeights[userAnswer.toString()];
        if (typeof score === 'number') {
          totalScore += score;
        }
      }
    });
    
    return totalScore;
  };

  const getMaxPossibleScore = (question: Question) => {
    if (!question.scoring_weights) return 0;
    
    let maxScore = 0;
    
    // Găsește scorul maxim posibil pentru această întrebare
    Object.values(question.scoring_weights).forEach((dimensionWeights: any) => {
      if (typeof dimensionWeights === 'object' && dimensionWeights !== null) {
        Object.values(dimensionWeights).forEach((score: any) => {
          if (typeof score === 'number' && score > maxScore) {
            maxScore = score;
          }
        });
      }
    });
    
    return maxScore;
  };

  const getOptionLabel = (question: Question, optionValue: number) => {
    const option = question.options.find((opt: any) => opt.value === optionValue);
    return option ? option.label : `Opțiunea ${optionValue}`;
  };

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
        {questions.map((question) => {
          const bestOption = getBestAnswerOption(question);
          const userAnswer = userAnswers[question.id];
          const userScore = getUserScore(question, userAnswer);
          const maxScore = getMaxPossibleScore(question);
          const isMaxScore = userScore === maxScore && maxScore > 0;
          
          return (
            <div key={question.id} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900 flex-1 pr-2">
                  {question.question_order}. {question.question_text}
                </h4>
                {isMaxScore && <CheckCircle className="w-5 h-5 text-green-500 mt-1" />}
                {!isMaxScore && userScore > 0 && <HelpCircle className="w-5 h-5 text-yellow-500 mt-1" />}
                {userScore === 0 && <XCircle className="w-5 h-5 text-red-500 mt-1" />}
              </div>
              
              <div className="space-y-2">
                {bestOption !== null && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Răspuns optim
                    </Badge>
                    <span className="text-sm font-medium text-green-700">
                      {getOptionLabel(question, bestOption)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {maxScore} puncte
                    </Badge>
                  </div>
                )}
                
                {userAnswer !== undefined && (
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`${
                        isMaxScore 
                          ? 'border-green-500 text-green-700' 
                          : userScore > 0 
                            ? 'border-yellow-500 text-yellow-700'
                            : 'border-red-500 text-red-700'
                      }`}
                    >
                      Răspunsul tău
                    </Badge>
                    <span className={`text-sm font-medium ${
                      isMaxScore 
                        ? 'text-green-700' 
                        : userScore > 0 
                          ? 'text-yellow-700'
                          : 'text-red-700'
                    }`}>
                      {getOptionLabel(question, userAnswer)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {userScore} puncte
                    </Badge>
                  </div>
                )}
                
                {maxScore > 0 && (
                  <div className="text-xs text-gray-600">
                    Performanță: {userScore}/{maxScore} puncte ({Math.round((userScore/maxScore) * 100)}%)
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Sumar Performanță</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">Punctaj total obținut:</span>
              <span className="font-semibold ml-2">{totalUserScore}</span>
            </div>
            <div>
              <span className="text-blue-700">Punctaj maxim posibil:</span>
              <span className="font-semibold ml-2">{totalMaxScore}</span>
            </div>
            <div>
              <span className="text-blue-700">Răspunsuri perfecte:</span>
              <span className="font-semibold ml-2">{questionsWithMaxScore}/{questions.length}</span>
            </div>
            <div>
              <span className="text-blue-700">Procentaj general:</span>
              <span className="font-semibold ml-2">
                {totalMaxScore > 0 ? Math.round((totalUserScore/totalMaxScore) * 100) : 0}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrectAnswersSection;
