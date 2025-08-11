import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTestSubmission } from '@/hooks/useTestSubmission';
import { useTestProgress } from '@/hooks/useTestProgress';
import { TestQuestion } from '@/components/test/TestQuestion';
import { TestStartScreen } from '@/components/test/TestStartScreen';
import { TestErrorScreen } from '@/components/test/TestErrorScreen';
import { useToast } from '@/components/ui/use-toast';
import { PageLoader } from '@/components/layout/PageLoader';

export default function TestRunner() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { submitTest, isSubmitting } = useTestSubmission();
  
  const {
    currentQuestionIndex,
    answers,
    testStarted,
    startTest,
    handleAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
  } = useTestProgress(testId);

  const { data: testData, isLoading, error } = useQuery({
    queryKey: ['test-data', testId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_types')
        .select('*, test_questions(*, test_options(*))')
        .eq('id', testId)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!testId,
  });

  const handleSubmit = async () => {
    if (!testId || !testData) return;
    try {
      const result = await submitTest(testId, answers);
      navigate(`/test-result/${result.id}`);
    } catch (err) {
      console.error("Submission failed:", err);
      toast({
        title: "Eroare la trimitere",
        description: "Nu am putut salva rezultatele. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <PageLoader />;
  if (error) return <TestErrorScreen message={error.message} />;
  if (!testData || !testData.test_questions) return <TestErrorScreen message="Testul nu a putut fi încărcat." />;

  const questions = testData.test_questions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  if (!testStarted) {
    return <TestStartScreen testName={testData.name} onStart={startTest} />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <TestQuestion
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        selectedAnswer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
        onNext={goToNextQuestion}
        onBack={goToPreviousQuestion}
        onSubmit={handleSubmit}
        isLastQuestion={isLastQuestion}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}