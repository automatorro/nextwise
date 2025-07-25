
import React, { useState, useEffect } from 'react';
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
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const {
    saveProgress,
    clearProgress,
    restoreProgress,
    hasSavedProgress
  } = useTestProgress(testId || '');

  useEffect(() => {
    if (!testId || !user) return;

    const fetchTestData = async () => {
      try {
        setIsLoading(true);
        
        // Check for existing progress
        const existingProgress = restoreProgress();
        if (existingProgress && Object.keys(existingProgress.answers).length > 0) {
          setShowRestoreDialog(true);
        }

        // Fetch test type
        const { data: testTypeData, error: testTypeError } = await supabase
          .from('test_types')
          .select('*')
          .eq('id', testId)
          .single();

        if (testTypeError) throw testTypeError;
        setTestType(testTypeData);

        // Fetch questions
        const { data: questionsData, error: questionsError } = await supabase
          .from('test_questions')
          .select('*')
          .eq('test_type_id', testId)
          .order('question_order');

        if (questionsError) throw questionsError;
        setQuestions(questionsData || []);

      } catch (error) {
        console.error('Error fetching test data:', error);
        setError('Failed to load test data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestData();
  }, [testId, user, restoreProgress]);

  const handleRestoreProgress = async (restore: boolean) => {
    if (restore) {
      const progress = restoreProgress();
      if (progress && progress.answers) {
        setAnswers(progress.answers);
        setCurrentQuestionIndex(progress.currentQuestionIndex || 0);
      }
    }
    setShowRestoreDialog(false);
    setHasStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    const questionOrder = questions[currentQuestionIndex]?.question_order;
    if (questionOrder) {
      const newAnswers = { ...answers, [questionOrder]: answerIndex };
      setAnswers(newAnswers);
      
      // Save progress
      saveProgress(currentQuestionIndex, newAnswers);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      saveProgress(nextIndex, answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      saveProgress(prevIndex, answers);
    }
  };

  const handleSubmit = async () => {
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
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isComplete = Object.keys(answers).length === questions.length;

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
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
        message="Test not found" 
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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{testType.name}</span>
              <span className="text-sm font-normal">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
            </CardTitle>
            <Progress value={progress} className="w-full" />
          </CardHeader>
        </Card>

        {currentQuestion && (
          <TestQuestion
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.question_order]}
            onAnswer={handleAnswer}
            language={language}
          />
        )}

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
      </div>
    </div>
  );
};

export default TestRunner;
