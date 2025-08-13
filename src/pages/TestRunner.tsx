// src/pages/TestRunner.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTestSubmission } from '@/hooks/useTestSubmission';
import { useTestProgress } from '@/hooks/useTestProgress';
import { TestQuestion } from '@/components/test/TestQuestion';
import TestStartScreen from "@/components/test/TestStartScreen"; // Corectat importul
import TestErrorScreen from "@/components/test/TestErrorScreen"; // Corectat importul
import { useToast } from '@/hooks/use-toast';
import { PageLoader } from '@/components/layout/PageLoader';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/hooks/useLanguage';

export default function TestRunner() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // Starea gestionată activ de TestRunner
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});

  // Hook-urile folosite corect
  const { submitTest } = useTestSubmission();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { saveProgress, clearProgress, hasSavedProgress, restoreProgress, isInitialized } = useTestProgress(testId!);
  
  // Auto-forwarding logic
  const autoForwardTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: testData, isLoading, error } = useQuery({
    queryKey: ['test-data', testId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_types')
        .select('*, test_questions(*)')
        .eq('id', testId)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!testId,
  });
  
  // Logica pentru a întreba utilizatorul dacă vrea să reia progresul
  useEffect(() => {
    if (isInitialized && hasSavedProgress) {
        if (window.confirm("Am găsit un progres salvat pentru acest test. Doriți să continuați de unde ați rămas?")) {
            const progress = restoreProgress();
            if (progress) {
                setAnswers(progress.answers);
                setCurrentQuestionIndex(progress.currentQuestionIndex);
                setTestStarted(true);
            }
        } else {
            clearProgress();
        }
    }
  }, [isInitialized, hasSavedProgress, restoreProgress, clearProgress]);


  const handleAnswer = (questionId: string, answerValue: number) => {
    // Clear any existing auto-forward timeout
    if (autoForwardTimeoutRef.current) {
      clearTimeout(autoForwardTimeoutRef.current);
    }
    
    const newAnswers = { ...answers, [questionId]: answerValue };
    setAnswers(newAnswers);
    saveProgress(currentQuestionIndex, newAnswers);
    
    // Auto-forward to next question if not on last question
    if (currentQuestionIndex < totalQuestions - 1) {
      autoForwardTimeoutRef.current = setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1500); // 1.5 second delay
    }
  };
  
  const questions = testData?.test_questions || [];
  const totalQuestions = questions.length;

  const goToNextQuestion = () => {
    // Clear auto-forward timeout when manually navigating
    if (autoForwardTimeoutRef.current) {
      clearTimeout(autoForwardTimeoutRef.current);
    }
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    // Clear auto-forward timeout when manually navigating
    if (autoForwardTimeoutRef.current) {
      clearTimeout(autoForwardTimeoutRef.current);
    }
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoForwardTimeoutRef.current) {
        clearTimeout(autoForwardTimeoutRef.current);
      }
    };
  }, []);
  
  const handleSubmit = async () => {
    if (!testId) return;
    setIsSubmitting(true);
    try {
      const result = await submitTest(testId, answers);
      clearProgress(); // Ștergem progresul după trimitere
      navigate(`/test-result/${result.id}`);
    } catch (err) {
      console.error("Submission failed:", err);
      toast({
        title: t('testRunner.submitError'),
        description: t('testRunner.submitErrorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <PageLoader />;
  if (error) return <TestErrorScreen title={t('common.error')} message={error.message} onReturnToTests={() => navigate('/tests')} />;
  if (!testData || !questions.length) return <TestErrorScreen title={t('common.error')} message={t('testRunner.loadError')} onReturnToTests={() => navigate('/tests')} />;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  if (!testStarted) {
    return <TestStartScreen testType={testData} questionsCount={totalQuestions} onStartTest={() => setTestStarted(true)} />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <div className="space-y-6">
        <div className="text-center">
            <h2 className="text-2xl font-bold">{testData.name}</h2>
            <p className="text-muted-foreground">{t('testRunner.questionProgress').replace('{{current}}', String(currentQuestionIndex + 1)).replace('{{total}}', String(totalQuestions))}</p>
            <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="mt-2" />
        </div>
        <TestQuestion
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswer={(answerValue) => handleAnswer(currentQuestion.id, answerValue)}
          language={language}
        />
        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
            {t('testRunner.back')}
          </Button>
          {isLastQuestion ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? t('testRunner.submitting') : t('testRunner.finishTest')}
            </Button>
          ) : (
            <Button onClick={goToNextQuestion}>
              {t('testRunner.next')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Trebuie să ne asigurăm și că useTestSubmission returnează isSubmitting
// Așa ar trebui să arate useTestSubmission.ts pentru a fi compatibil:
/*
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useTestSubmission = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const submitTest = async (testId: string, answers: Record<string, number | string>) => {
    if (!user) throw new Error('User not authenticated');
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('test_results')
        .insert({
          user_id: user.id,
          test_type_id: testId,
          answers,
          score: {}, 
          completed_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (error) throw error;

      supabase.functions.invoke('increment-tests-taken', {
        body: { user_id: user.id }
      }).catch(err => console.error("Error incrementing tests taken:", err));

      return data;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitTest, isSubmitting };
};
*/