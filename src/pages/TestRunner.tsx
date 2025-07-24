import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Question from '@/components/test-runner/Question';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTestSubmission } from '@/hooks/useTestSubmission';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';

interface QuestionType {
  id: string;
  text: string;
  options: string[];
  correct_answer?: number;
  scoring_weights?: { [key: string]: number[] };
}

const TestRunner = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionType[] | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});

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
        .from('questions')
        .select('*')
        .eq('test_type_id', testId);

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setQuestions(data);
    },
    enabled: !!testId,
  });

  useEffect(() => {
    if (questions) {
      const initialAnswers: Record<string, number> = {};
      questions.forEach(question => {
        initialAnswers[question.id] = 0;
      });
      setAnswers(initialAnswers);
    }
  }, [questions]);

  const handleAnswerChange = (questionId: string, answer: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };
  
  const testSubmission = useTestSubmission();

  const handleSubmit = () => {
    if (answers && questions) {
      testSubmission.mutate({
        testId: testId!,
        answers,
        questions
      });
    }
  };

  if (isTestTypeLoading || isQuestionsLoading) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (testTypeError || questionsError || !testType) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Error loading test</h2>
            <p>Please check the test ID or try again later.</p>
            <Button onClick={() => navigate('/teste')}>Back to Tests</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <HomeNavigation />
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">{testType.name}</h1>
          {questions && questions.map(question => (
            <Question
              key={question.id}
              question={question}
              selectedAnswer={answers[question.id]}
              onAnswerChange={handleAnswerChange}
            />
          ))}
          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleSubmit}
              disabled={testSubmission.isLoading}
            >
              {testSubmission.isLoading ? (
                <>
                  Submitting...
                  <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                </>
              ) : 'Submit Test'}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestRunner;
