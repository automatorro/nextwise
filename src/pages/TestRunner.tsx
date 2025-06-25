import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useTestProgress } from '@/hooks/useTestProgress';
import { useLanguage } from '@/hooks/useLanguage';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTestSubmission } from '@/hooks/useTestSubmission';
import Navbar from '@/components/layout/Navbar';
import TestStartScreen from '@/components/test/TestStartScreen';
import TestQuestion from '@/components/test/TestQuestion';
import TestErrorScreen from '@/components/test/TestErrorScreen';
import TestProgressRestoreDialog from '@/components/test/TestProgressRestoreDialog';
import type { Json } from '@/integrations/supabase/types';

interface Question {
  id: string;
  question_text: string;
  question_order: number;
  options: Json;
  scoring_weights?: Json;
}

interface TestType {
  id: string;
  name: string;
  description: string;
  estimated_duration: number;
  questions_count: number;
}

const TestRunner = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { canTakeTest } = useSubscription();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [isStarted, setIsStarted] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);

  // Initialize progress management
  const {
    hasSavedProgress,
    savedProgress,
    saveProgress,
    clearProgress,
    restoreProgress
  } = useTestProgress(testId || '');

  // Initialize test submission hook with navigation callback
  const { submitTest, isSubmitting, error } = useTestSubmission((resultId: string) => {
    // Clear progress when test is successfully submitted
    clearProgress();
    navigate(`/test-result/${resultId}`);
  });

  // Fetch test type
  const { data: testType, isLoading: testTypeLoading, error: testTypeError } = useQuery({
    queryKey: ['testType', testId],
    queryFn: async () => {
      if (!testId) throw new Error('Test ID is required');
      
      const { data, error } = await supabase
        .from('test_types')
        .select('*')
        .eq('id', testId)
        .single();
      
      if (error) {
        console.error('Error fetching test type:', error);
        throw error;
      }
      
      return data as TestType;
    },
    enabled: !!testId
  });

  // Fetch questions with language-specific text
  const { data: questions, isLoading: questionsLoading, error: questionsError } = useQuery({
    queryKey: ['questions', testId, language],
    queryFn: async () => {
      if (!testId) throw new Error('Test ID is required');
      
      // Select the appropriate question text column based on language
      const questionTextColumn = language === 'en' ? 'question_text_en' : 'question_text_ro';
      
      const { data, error } = await supabase
        .from('test_questions')
        .select(`id, ${questionTextColumn} as question_text, question_order, options, scoring_weights`)
        .eq('test_type_id', testId)
        .order('question_order');
      
      if (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
      
      console.log('Fetched questions for language:', language, data);
      return data as Question[];
    },
    enabled: !!testId && !!testType
  });

  // Check if user can take test
  useEffect(() => {
    if (!canTakeTest()) {
      toast({
        title: "Limită atinsă",
        description: "Ai atins limita de teste pentru această lună.",
        variant: "destructive"
      });
      navigate('/abonament');
    }
  }, [canTakeTest, navigate, toast]);

  // Check for saved progress when questions are loaded
  useEffect(() => {
    if (questions && hasSavedProgress && !isStarted) {
      setShowProgressDialog(true);
    }
  }, [questions, hasSavedProgress, isStarted]);

  // Save progress whenever answers or current question changes
  useEffect(() => {
    if (isStarted && testId) {
      saveProgress(currentQuestionIndex, answers);
    }
  }, [currentQuestionIndex, answers, isStarted, testId, saveProgress]);

  const handleRestoreProgress = () => {
    const progress = restoreProgress();
    if (progress) {
      setCurrentQuestionIndex(progress.currentQuestionIndex);
      setAnswers(progress.answers);
      setIsStarted(true);
      setShowProgressDialog(false);
      
      toast({
        title: "Progres restaurat",
        description: `Continui de la întrebarea ${progress.currentQuestionIndex + 1}`
      });
    }
  };

  const handleStartFresh = () => {
    clearProgress();
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowProgressDialog(false);
    
    toast({
      title: "Test reînceput",
      description: "Începi testul de la prima întrebare"
    });
  };

  const handleAnswerChange = (value: string) => {
    const currentQuestion = questions![currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions!.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (!testId) return;
    
    submitTest({
      test_type_id: testId,
      answers
    });
  };

  // Handle loading states and errors
  if (testTypeLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (testTypeError || !testType) {
    return (
      <TestErrorScreen
        title="Test nu a fost găsit"
        message="Testul solicitat nu există sau nu este disponibil."
        onReturnToTests={() => navigate('/teste')}
      />
    );
  }

  if (questionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Se încarcă întrebările...</p>
        </div>
      </div>
    );
  }

  if (questionsError || !questions || questions.length === 0) {
    return (
      <TestErrorScreen
        title="Test indisponibil"
        message={`Testul "${testType.name}" nu are întrebări configurate momentan. Vă rugăm să încercați mai târziu sau să alegeți un alt test.`}
        onReturnToTests={() => navigate('/teste')}
      />
    );
  }

  // Show test start screen
  if (!isStarted && !showProgressDialog) {
    return (
      <div>
        <Navbar />
        <div className="pt-20">
          <TestStartScreen
            testType={testType}
            questionsCount={questions.length}
            onStartTest={() => setIsStarted(true)}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <TestProgressRestoreDialog
          open={showProgressDialog}
          testName={testType.name}
          questionNumber={savedProgress?.currentQuestionIndex || 0}
          totalQuestions={questions.length}
          onRestore={handleRestoreProgress}
          onStartFresh={handleStartFresh}
        />
        
        {isStarted && (
          <TestQuestion
            testType={testType}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            answers={answers}
            isSubmitting={isSubmitting}
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
      </div>
    </div>
  );
};

export default TestRunner;
