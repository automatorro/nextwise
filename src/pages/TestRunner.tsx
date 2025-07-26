
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTestSubmission } from '@/hooks/useTestSubmission';
import { useSessionId } from '@/hooks/useSessionId';
import { useTestProgress } from '@/hooks/useTestProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TestQuestion } from '@/components/test/TestQuestion';
import TestProgressRestoreDialog from '@/components/test/TestProgressRestoreDialog';
import TestErrorScreen from '@/components/test/TestErrorScreen';
import TestStartScreen from '@/components/test/TestStartScreen';
import TestTimer from '@/components/test-runner/TestTimer';
import ExitTestDialog from '@/components/test-runner/ExitTestDialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/hooks/useLanguage';

interface Question {
  id: string;
  question_text_ro: string;
  question_text_en?: string;
  question_order: number;
  options: any;
  options_en?: any;
  scoring_weights?: any;
  question_type: string;
  test_type_id: string;
  created_at: string;
}

interface TestType {
  id: string;
  name: string;
  description: string;
  questions_count: number;
  estimated_duration: number;
}

const TestRunner = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submitTest } = useTestSubmission();
  const sessionId = useSessionId();
  const { language } = useLanguage();
  
  const [testType, setTestType] = useState<TestType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [autoProgressTimer, setAutoProgressTimer] = useState<NodeJS.Timeout | null>(null);

  const {
    saveProgress,
    clearProgress,
    restoreProgress,
    hasSavedProgress,
    isInitialized
  } = useTestProgress(testId || '');

  // Memoize test data fetching to prevent re-fetching
  const fetchTestData = useCallback(async () => {
    if (!testId || !user || dataFetched) return;

    try {
      setIsLoading(true);
      console.log('Fetching test data for:', testId);
      
      // Fetch test type
      const { data: testTypeData, error: testTypeError } = await supabase
        .from('test_types')
        .select('*')
        .eq('id', testId)
        .single();

      if (testTypeError) throw testTypeError;
      setTestType(testTypeData);
      console.log('Test type loaded:', testTypeData);

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('test_questions')
        .select('*')
        .eq('test_type_id', testId)
        .order('question_order');

      if (questionsError) throw questionsError;
      setQuestions(questionsData || []);
      console.log('Questions loaded:', questionsData?.length);
      
      setDataFetched(true);

    } catch (error) {
      console.error('Error fetching test data:', error);
      setError('Failed to load test data');
    } finally {
      setIsLoading(false);
    }
  }, [testId, user, dataFetched]);

  // Effect for initial data fetching - only runs once
  useEffect(() => {
    fetchTestData();
  }, [fetchTestData]);

  // Effect for checking saved progress - only after data is loaded and progress hook is initialized
  useEffect(() => {
    if (!isInitialized || !dataFetched || showRestoreDialog) return;

    const existingProgress = restoreProgress();
    if (existingProgress && Object.keys(existingProgress.answers).length > 0) {
      console.log('Found existing progress:', existingProgress);
      setShowRestoreDialog(true);
    }
  }, [isInitialized, dataFetched, restoreProgress, showRestoreDialog]);

  const handleRestoreProgress = useCallback(async (restore: boolean) => {
    if (restore) {
      const progress = restoreProgress();
      if (progress && progress.answers) {
        setAnswers(progress.answers);
        setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
        console.log('Progress restored:', progress);
      }
    }
    setShowRestoreDialog(false);
    setHasStarted(true);
  }, [restoreProgress]);

  const handleAnswer = useCallback((answerIndex: number) => {
    const questionOrder = questions[currentQuestionIndex]?.question_order;
    if (questionOrder) {
      const newAnswers = { ...answers, [questionOrder]: answerIndex };
      setAnswers(newAnswers);
      
      // Save progress
      saveProgress(currentQuestionIndex, newAnswers);
      
      // Auto-progress to next question after 800ms delay
      if (autoProgressTimer) {
        clearTimeout(autoProgressTimer);
      }
      
      const timer = setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          saveProgress(currentQuestionIndex + 1, newAnswers);
        }
      }, 800);
      
      setAutoProgressTimer(timer);
    }
  }, [questions, currentQuestionIndex, answers, saveProgress, autoProgressTimer]);

  const handleNext = useCallback(() => {
    if (autoProgressTimer) {
      clearTimeout(autoProgressTimer);
      setAutoProgressTimer(null);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      saveProgress(nextIndex, answers);
    }
  }, [currentQuestionIndex, questions.length, answers, saveProgress, autoProgressTimer]);

  const handlePrevious = useCallback(() => {
    if (autoProgressTimer) {
      clearTimeout(autoProgressTimer);
      setAutoProgressTimer(null);
    }
    
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      saveProgress(prevIndex, answers);
    }
  }, [currentQuestionIndex, answers, saveProgress, autoProgressTimer]);

  const handleSubmit = useCallback(async () => {
    if (!testId || !user) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await submitTest(testId, answers, sessionId);
      clearProgress();
      navigate(`/test-result/${result.id}`);
      toast.success('Test submitted successfully!');
    } catch (error) {
      console.error('Error submitting test:', error);
      toast.error('Failed to submit test. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [testId, user, answers, sessionId, submitTest, clearProgress, navigate]);

  const handleExit = useCallback(() => {
    setShowExitDialog(true);
  }, []);

  const handleConfirmExit = useCallback(() => {
    if (Object.keys(answers).length > 0) {
      saveProgress(currentQuestionIndex, answers);
      toast.info('Progresul tău a fost salvat');
    }
    navigate('/tests');
  }, [answers, currentQuestionIndex, saveProgress, navigate]);

  const handleTimeUp = useCallback(() => {
    toast.warning('Timpul a expirat! Testul va fi trimis automat.');
    handleSubmit();
  }, [handleSubmit]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoProgressTimer) {
        clearTimeout(autoProgressTimer);
      }
    };
  }, [autoProgressTimer]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const progress = useMemo(() => ((currentQuestionIndex + 1) / questions.length) * 100, [currentQuestionIndex, questions.length]);
  const isComplete = useMemo(() => Object.keys(answers).length === questions.length, [answers, questions.length]);
  const hasAnswers = useMemo(() => Object.keys(answers).length > 0, [answers]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <TestErrorScreen 
        title="Test Error" 
        message={error} 
        onReturnToTests={() => navigate('/tests')} 
      />
    );
  }

  if (!testType || questions.length === 0) {
    return (
      <TestErrorScreen 
        title="Test Not Found" 
        message="Test data could not be loaded" 
        onReturnToTests={() => navigate('/tests')} 
      />
    );
  }

  if (!hasStarted) {
    return (
      <>
        <TestStartScreen 
          testType={testType} 
          questionsCount={questions.length}
          onStartTest={() => setHasStarted(true)} 
        />
        {showRestoreDialog && (
          <TestProgressRestoreDialog
            open={showRestoreDialog}
            testName={testType.name}
            questionNumber={currentQuestionIndex}
            totalQuestions={questions.length}
            onRestore={() => handleRestoreProgress(true)}
            onStartFresh={() => handleRestoreProgress(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Test Header with Timer and Exit Button */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="flex justify-between items-center">
                  <span>{testType.name}</span>
                  <span className="text-sm font-normal">
                    {currentQuestionIndex + 1} / {questions.length}
                  </span>
                </CardTitle>
                <Progress value={progress} className="w-full mt-2" />
              </div>
              <div className="flex items-center space-x-4 ml-4">
                {testType.estimated_duration > 0 && (
                  <TestTimer
                    durationMinutes={testType.estimated_duration}
                    onTimeUp={handleTimeUp}
                    isActive={true}
                  />
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExit}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Ieși din test
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Question Display */}
        {currentQuestion && (
          <TestQuestion
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.question_order]}
            onAnswer={handleAnswer}
            language={language}
          />
        )}

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-4">
            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={answers[currentQuestion?.question_order] === undefined}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isComplete || isSubmitting}
                variant="default"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </Button>
            )}
          </div>
        </div>

        {/* Exit Confirmation Dialog */}
        <ExitTestDialog
          open={showExitDialog}
          onConfirm={handleConfirmExit}
          onCancel={() => setShowExitDialog(false)}
          hasAnswers={hasAnswers}
        />
      </div>
    </div>
  );
};

export default TestRunner;
