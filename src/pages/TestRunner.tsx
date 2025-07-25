import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { useTestProgress } from '@/hooks/useTestProgress';
import { useTestSubmission } from '@/hooks/useTestSubmission';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import TestStartScreen from '@/components/test/TestStartScreen';
import TestErrorScreen from '@/components/test/TestErrorScreen';
import TestProgressRestoreDialog from '@/components/test/TestProgressRestoreDialog';
import TestQuestion from '@/components/test/TestQuestion';
import { translateQuestions } from '@/utils/translateQuestions';
import { getTestTranslation } from '@/utils/testTranslationMapping';
import HomeNavigation from '@/components/home/HomeNavigation';

const TestRunner = () => {
  const { testId } = useParams();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  const [showProgressRestore, setShowProgressRestore] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    saveProgress, 
    loadProgress, 
    clearProgress, 
    hasProgress 
  } = useTestProgress(testId || '', user?.id || '');
  
  const { submitTest } = useTestSubmission();

  const { data: testData, isLoading, error } = useQuery({
    queryKey: ['test', testId, language],
    queryFn: async () => {
      if (!testId) throw new Error("Test ID is required");

      const { data: testType, error: testTypeError } = await supabase
        .from('test_types')
        .select('*')
        .eq('id', testId)
        .single();

      if (testTypeError) {
        console.error('Error fetching test type:', testTypeError);
        throw testTypeError;
      }

      if (!testType) {
        throw new Error("Test type not found");
      }

      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('test_type_id', testId);

      if (questionsError) {
        console.error('Error fetching questions:', questionsError);
        throw questionsError;
      }

      const translatedQuestions = await translateQuestions(questionsData, language);

      return {
        ...testType,
        questions: translatedQuestions
      };
    },
    enabled: !!testId,
    retry: false
  });

  const questions = testData?.questions || [];
  const translation = getTestTranslation(testData?.name || '', language);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (hasStarted && timeRemaining !== null && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining(prevTime => (prevTime !== null && prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }

    return () => clearInterval(intervalId);
  }, [hasStarted, timeRemaining, handleSubmit]);

  const handleStart = async () => {
    if (hasProgress && !hasStarted) {
      setShowProgressRestore(true);
      return;
    }
    
    setHasStarted(true);
    setTimeRemaining(testData.estimated_duration * 60);
    
    const newAnswers = {};
    setAnswers(newAnswers);
    await saveProgress(0, newAnswers);
  };

  const handleContinue = async () => {
    const progress = await loadProgress();
    if (progress) {
      setCurrentQuestionIndex(progress.currentQuestion);
      setAnswers(progress.answers);
      setTimeRemaining(progress.timeRemaining);
    }
    setHasStarted(true);
    setShowProgressRestore(false);
  };

  const handleStartFresh = async () => {
    await clearProgress();
    setHasStarted(true);
    setTimeRemaining(testData.estimated_duration * 60);
    const newAnswers = {};
    setAnswers(newAnswers);
    await saveProgress(0, newAnswers);
    setShowProgressRestore(false);
  };

  const handleAnswer = async (questionId: string, answer: any) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    await saveProgress(currentQuestionIndex, newAnswers, timeRemaining);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      await saveProgress(nextIndex, answers, timeRemaining);
    }
  };

  const handlePrevious = async () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      await saveProgress(prevIndex, answers, timeRemaining);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const resultId = await submitTest(testId!, answers, timeRemaining);
      await clearProgress();
      
      toast({
        title: language === 'ro' ? 'Test completat cu succes!' : 'Test completed successfully!',
        description: language === 'ro' ? 'Rezultatele tale au fost salvate.' : 'Your results have been saved.',
      });
      
      navigate(`/test-result/${resultId}`);
    } catch (error) {
      console.error('Error submitting test:', error);
      toast({
        title: language === 'ro' ? 'Eroare la salvarea rezultatelor' : 'Error saving results',
        description: language === 'ro' ? 'Te rugăm să încerci din nou.' : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <HomeNavigation />
        <div className="text-center pt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {language === 'ro' ? 'Se încarcă testul...' : 'Loading test...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !testData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HomeNavigation />
        <div className="pt-24">
          <TestErrorScreen 
            error={error}
            onRetry={() => window.location.reload()}
            onGoBack={() => navigate('/tests')}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomeNavigation />
      <div className="min-h-screen bg-gray-50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {translation.name}
                </h1>
                <p className="text-gray-600">
                  {translation.description || testData.description}
                </p>
              </div>
              {hasStarted && timeRemaining !== null && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className={`text-lg font-mono ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>
            
            {hasStarted && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {language === 'ro' ? 'Progres' : 'Progress'}: {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>

          {/* Test Content */}
          {!hasStarted ? (
            <TestStartScreen
              testData={testData}
              translation={translation}
              onStart={handleStart}
              onBack={() => navigate('/tests')}
            />
          ) : (
            <div className="space-y-6">
              {/* Current Question */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {language === 'ro' ? 'Întrebarea' : 'Question'} {currentQuestionIndex + 1}
                      </CardTitle>
                      <CardDescription>
                        {currentQuestion.text}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {currentQuestionIndex + 1} / {questions.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <TestQuestion
                    question={currentQuestion}
                    answer={answers[currentQuestion.id]}
                    onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
                    language={language}
                  />
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {language === 'ro' ? 'Precedenta' : 'Previous'}
                </Button>

                <div className="flex space-x-2">
                  {!isLastQuestion ? (
                    <Button
                      onClick={handleNext}
                      disabled={answers[currentQuestion.id] === undefined}
                    >
                      {language === 'ro' ? 'Următoarea' : 'Next'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!allQuestionsAnswered || isSubmitting}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {language === 'ro' ? 'Se trimite...' : 'Submitting...'}
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {language === 'ro' ? 'Finalizează testul' : 'Finish test'}
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Summary */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>
                      {language === 'ro' ? 'Întrebări răspunse' : 'Questions answered'}: {Object.keys(answers).length} / {questions.length}
                    </span>
                    <span>
                      {language === 'ro' ? 'Timp rămas' : 'Time remaining'}: {timeRemaining ? formatTime(timeRemaining) : '--:--'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Progress Restore Dialog */}
      <TestProgressRestoreDialog
        isOpen={showProgressRestore}
        onContinue={handleContinue}
        onStartFresh={handleStartFresh}
        onClose={() => setShowProgressRestore(false)}
      />
    </div>
  );
};

export default TestRunner;
