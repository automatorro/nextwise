
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question_text: string;
  question_order: number;
  options: { value: number; label: string }[];
  scoring_weights?: any;
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [isStarted, setIsStarted] = useState(false);

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

  // Fetch questions
  const { data: questions, isLoading: questionsLoading, error: questionsError } = useQuery({
    queryKey: ['questions', testId],
    queryFn: async () => {
      if (!testId) throw new Error('Test ID is required');
      
      const { data, error } = await supabase
        .from('test_questions')
        .select('*')
        .eq('test_type_id', testId)
        .order('question_order');
      
      if (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
      
      console.log('Fetched questions:', data);
      return data as Question[];
    },
    enabled: !!testId && !!testType
  });

  // Submit test mutation
  const submitTestMutation = useMutation({
    mutationFn: async (testData: { answers: any; score: any }) => {
      if (!user || !testId) throw new Error('Missing required data');

      const { data, error } = await supabase
        .from('test_results')
        .insert({
          user_id: user.id,
          test_type_id: testId,
          answers: testData.answers,
          score: testData.score
        })
        .select()
        .single();

      if (error) throw error;

      // Update tests taken count
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          tests_taken_this_month: supabase.raw('COALESCE(tests_taken_this_month, 0) + 1')
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Error updating test count:', updateError);
      }

      return data;
    },
    onSuccess: (data) => {
      navigate(`/test-result/${data.id}`);
    },
    onError: (error) => {
      console.error('Error submitting test:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut salva rezultatul testului.",
        variant: "destructive"
      });
    }
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              Test nu a fost găsit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Testul solicitat nu există sau nu este disponibil.
            </p>
            <Button onClick={() => navigate('/teste')} className="w-full">
              Înapoi la teste
            </Button>
          </CardContent>
        </Card>
      </div>
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
              Test indisponibil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Testul "{testType.name}" nu are întrebări configurate momentan. 
              Vă rugăm să încercați mai târziu sau să alegeți un alt test.
            </p>
            <Button onClick={() => navigate('/teste')} className="w-full">
              Înapoi la teste
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show test start screen
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{testType.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{testType.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Numărul de întrebări</p>
                <p className="font-semibold">{questions.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Durata estimată</p>
                <p className="font-semibold">{testType.estimated_duration} minute</p>
              </div>
            </div>
            <Button onClick={() => setIsStarted(true)} className="w-full">
              Începe testul
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Calculate score based on answers
    let totalScore = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      totalScore += answer;
    });

    const score = {
      total: totalScore,
      average: totalScore / questions.length,
      answers_count: Object.keys(answers).length
    };

    submitTestMutation.mutate({ answers, score });
  };

  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{testType.name}</h1>
            <span className="text-sm text-gray-500">
              {currentQuestionIndex + 1} din {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Întrebarea {currentQuestionIndex + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {currentQuestion.question_text}
            </p>

            <RadioGroup
              value={answers[currentQuestion.id]?.toString() || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={`option-${option.value}`}
                  />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className="text-sm cursor-pointer flex-1 py-2"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                disabled={currentQuestionIndex === 0}
              >
                Înapoi
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered || submitTestMutation.isPending}
              >
                {submitTestMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Se salvează...
                  </>
                ) : isLastQuestion ? (
                  'Finalizează testul'
                ) : (
                  'Următoarea'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestRunner;
