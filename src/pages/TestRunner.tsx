import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useTestSubmission } from '@/hooks/useTestSubmission';
import { useSessionId } from '@/hooks/useSessionId';
import TestQuestion from '@/components/test/TestQuestion';

const TestRunner = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const sessionId = useSessionId();

  // Fetch test details and questions
  const { data: testData, isLoading, error } = useQuery({
    queryKey: ['test', testId],
    queryFn: async () => {
      if (!testId) throw new Error('Test ID is required');
      
      // First get the test details
      const { data: testDetails, error: testError } = await supabase
        .from('test_types')
        .select('*')
        .eq('id', testId)
        .single();

      if (testError) {
        console.error('Error fetching test details:', testError);
        throw testError;
      }

      console.log('Test details loaded:', testDetails);

      // Then get the questions
      const { data: questions, error: questionsError } = await supabase
        .from('test_questions')
        .select('*')
        .eq('test_type_id', testId)
        .order('question_order');

      if (questionsError) {
        console.error('Error fetching questions:', questionsError);
        throw questionsError;
      }

      console.log('Questions loaded:', questions?.length || 0);
      console.log('First question:', questions?.[0]);

      // Handle Watson-Glaser test specifically
      if (testDetails.name.toLowerCase().includes('watson') || 
          testDetails.name.toLowerCase().includes('glaser')) {
        console.log('Watson-Glaser test detected, questions loaded from database');
      }

      return {
        testDetails,
        questions: questions || []
      };
    },
    enabled: !!testId
  });

  // Set timer when test data is loaded
  useEffect(() => {
    if (testData?.testDetails && timeLeft === null) {
      const duration = testData.testDetails.estimated_duration || 15;
      setTimeLeft(duration * 60); // Convert to seconds
    }
  }, [testData, timeLeft]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          handleSubmit(); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < (testData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting || !testData) return;

    setIsSubmitting(true);
    try {
      console.log('Submitting test:', testData.testDetails.name);
      console.log('Answers:', answers);
      
      // Use the test submission hook
      const { submitTest } = useTestSubmission();
      await submitTest(testId!, answers, sessionId);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) return <div>Loading test...</div>;
  if (error) return <div>Error loading test: {error.message}</div>;
  if (!testData) return <div>Test not found</div>;

  const currentQuestion = testData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / testData.questions.length) * 100;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Test Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{testData.testDetails.name}</h1>
          {timeLeft !== null && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-mono">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600">
            Întrebarea {currentQuestionIndex + 1} din {testData.questions.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progress)}% complet
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <TestQuestion
          question={currentQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          onAnswer={(answerIndex) => handleAnswer(currentQuestion.id, answerIndex)}
          language={language}
        />
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Precedenta
        </Button>

        <div className="flex gap-2">
          {currentQuestionIndex < testData.questions.length - 1 ? (
            <Button onClick={handleNext}>
              Următoarea
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Se trimite...' : 'Finalizează testul'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestRunner;
