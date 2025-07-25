
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTestSubmission } from '@/hooks/useTestSubmission';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';

interface QuestionType {
  id: string;
  question_text_ro: string;
  question_text_en?: string;
  options: string[];
  question_order: number;
  scoring_weights?: { [key: string]: number[] } | null;
}

const TestRunner = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { data: testType, isLoading: isTestTypeLoading, error: testTypeError } = useQuery({
    queryKey: ['testType', testId],
    queryFn: async () => {
      if (!testId) throw new Error("Test ID is required");
      const { data, error } = await supabase
        .from('test_types')
        .select('*')
        .eq('id', testId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!testId,
  });

  const { data: questionsData, isLoading: isQuestionsLoading, error: questionsError } = useQuery({
    queryKey: ['questions', testId],
    queryFn: async () => {
      if (!testId) throw new Error("Test ID is required");
      const { data, error } = await supabase
        .from('test_questions')
        .select('*')
        .eq('test_type_id', testId)
        .order('question_order');

      if (error) throw error;
      return data;
    },
    enabled: !!testId,
  });

  useEffect(() => {
    if (questionsData) {
      const formattedQuestions = questionsData.map(q => ({
        id: q.id,
        question_text_ro: q.question_text_ro || q.question_text_en || '',
        question_text_en: q.question_text_en,
        options: Array.isArray(q.options) ? q.options as string[] : [],
        question_order: q.question_order,
        scoring_weights: q.scoring_weights as { [key: string]: number[] } | null
      }));
      setQuestions(formattedQuestions);
    }
  }, [questionsData]);

  const testSubmission = useTestSubmission();

  const handleAnswerChange = (questionId: string, answer: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));

    // Auto-advance to next question after 500ms delay
    setTimeout(() => {
      if (questions && currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 500);
  };

  const handleSubmit = () => {
    if (answers && questions) {
      testSubmission.mutate({
        testId: testId!,
        answers,
        questions
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  if (isTestTypeLoading || isQuestionsLoading) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-gray-600">Se încarcă testul...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (testTypeError || questionsError || !testType || !questions || questions.length === 0) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Eroare la încărcarea testului</h2>
            <p className="text-gray-600 mb-6">Te rugăm să verifici ID-ul testului sau să încerci din nou mai târziu.</p>
            <Button onClick={() => navigate('/tests')}>Înapoi la Teste</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  // Add safety check for currentQuestion
  if (!currentQuestion) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Eroare la încărcarea întrebării</h2>
            <p className="text-gray-600 mb-6">Nu s-a putut încărca întrebarea curentă.</p>
            <Button onClick={() => navigate('/tests')}>Înapoi la Teste</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;

  // Helper function to get option text
  const getOptionText = (option: any, index: number): string => {
    if (typeof option === 'string') {
      return option;
    }
    if (typeof option === 'object' && option !== null) {
      return option.label || option.text || option.value || `Opțiunea ${index + 1}`;
    }
    return String(option || `Opțiunea ${index + 1}`);
  };

  return (
    <div>
      <HomeNavigation />
      <div className="min-h-screen bg-gray-50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{testType.name}</h1>
              <div className="text-sm text-gray-600">
                Întrebarea {currentQuestionIndex + 1} din {questions.length}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQuestionIndex + 1}. {currentQuestion.question_text_ro}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ''}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`${currentQuestion.id}-${index}`}
                      className="flex-shrink-0"
                    />
                    <Label 
                      htmlFor={`${currentQuestion.id}-${index}`} 
                      className="cursor-pointer flex-1 text-base leading-relaxed"
                    >
                      {getOptionText(option, index)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </Button>

            <div className="flex gap-2">
              {!isLastQuestion ? (
                <Button 
                  onClick={handleNext}
                  disabled={!isCurrentQuestionAnswered}
                  className="flex items-center gap-2"
                >
                  Următoarea
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={!isCurrentQuestionAnswered || testSubmission.isLoading}
                  className="flex items-center gap-2"
                >
                  {testSubmission.isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Se finalizează...
                    </>
                  ) : (
                    'Finalizează testul'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestRunner;
