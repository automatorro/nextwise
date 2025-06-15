
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question_text: string;
  question_order: number;
  options: string[];
  question_type: string;
  scoring_weights: number[];
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
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(0);

  const { data: testInfo, isLoading: testLoading } = useQuery({
    queryKey: ['test', testId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_types')
        .select('*')
        .eq('id', testId)
        .single();
      
      if (error) throw error;
      return data as TestType;
    },
    enabled: !!testId
  });

  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ['test-questions', testId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_questions')
        .select('*')
        .eq('test_type_id', testId)
        .order('question_order');
      
      if (error) throw error;
      return data as Question[];
    },
    enabled: !!testId
  });

  const saveResultMutation = useMutation({
    mutationFn: async (resultData: any) => {
      console.log('Saving test result:', resultData);
      
      // Save directly to Supabase
      const { data, error } = await supabase
        .from('test_results')
        .insert({
          test_type_id: resultData.testTypeId,
          user_id: resultData.userId,
          answers: resultData.answers,
          score: resultData.score,
          completed_at: resultData.completedAt
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Test result saved successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Test completat!",
        description: "Rezultatul tău a fost salvat cu succes."
      });
      navigate(`/test-result/${data.id}`);
    },
    onError: (error: any) => {
      console.error('Error saving test result:', error);
      toast({
        title: "Eroare",
        description: error?.message || "Nu am putut salva rezultatul testului.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    if (testInfo) {
      setTimeRemaining(testInfo.estimated_duration * 60);
    }
  }, [testInfo]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  const calculateGAD7Score = (answers: { [key: number]: string }, questions: Question[]) => {
    let totalScore = 0;
    
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      const question = questions[parseInt(questionIndex)];
      if (question && question.scoring_weights) {
        const optionIndex = question.options.indexOf(answer);
        if (optionIndex !== -1 && question.scoring_weights[optionIndex] !== undefined) {
          totalScore += question.scoring_weights[optionIndex];
        }
      }
    });

    // GAD-7 interpretation
    let interpretation = '';
    if (totalScore <= 4) {
      interpretation = 'Anxietate minimală';
    } else if (totalScore <= 9) {
      interpretation = 'Anxietate ușoară';
    } else if (totalScore <= 14) {
      interpretation = 'Anxietate moderată';
    } else {
      interpretation = 'Anxietate severă';
    }

    return {
      overall: Math.round((totalScore / 21) * 100),
      raw_score: totalScore,
      max_score: 21,
      interpretation: interpretation,
      dimensions: {
        anxiety_level: Math.round((totalScore / 21) * 100)
      }
    };
  };

  const calculateEQScore = (answers: { [key: number]: string }, questions: Question[]) => {
    const dimensions = {
      self_awareness: [0, 1],
      self_regulation: [2, 3],
      motivation: [4, 5],
      empathy: [6, 7],
      social_skills: [8, 9]
    };

    let totalScore = 0;
    const dimensionScores: { [key: string]: number } = {
      self_awareness: 0,
      self_regulation: 0,
      motivation: 0,
      empathy: 0,
      social_skills: 0,
    };

    Object.entries(answers).forEach(([questionIndexStr, answer]) => {
      const questionIndex = parseInt(questionIndexStr);
      const question = questions[questionIndex];
      if (question && question.scoring_weights) {
        const optionIndex = question.options.indexOf(answer);
        if (optionIndex !== -1 && question.scoring_weights[optionIndex] !== undefined) {
          const score = question.scoring_weights[optionIndex];
          totalScore += score;

          for (const [dim, indices] of Object.entries(dimensions)) {
            if (indices.includes(questionIndex)) {
              dimensionScores[dim] += score;
            }
          }
        }
      }
    });

    const maxScorePerQuestion = 5;
    const maxTotalScore = questions.length * maxScorePerQuestion;
    
    const formattedDimensions: { [key: string]: number } = {};
    for (const [dim, indices] of Object.entries(dimensions)) {
      const maxDimScore = indices.length * maxScorePerQuestion;
      formattedDimensions[dim] = maxDimScore > 0 ? Math.round((dimensionScores[dim] / maxDimScore) * 100) : 0;
    }

    return {
      overall: maxTotalScore > 0 ? Math.round((totalScore / maxTotalScore) * 100) : 0,
      raw_score: totalScore,
      max_score: maxTotalScore,
      interpretation: 'Rezultat calculat pentru Inteligența Emoțională.',
      dimensions: formattedDimensions,
    };
  };

  const calculateDefaultScore = (answers: { [key: number]: string }, questions: Question[]) => {
    let totalScore = 0;
    let maxScore = 0;
    
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      const question = questions[parseInt(questionIndex)];
      if (question && question.scoring_weights) {
        const optionIndex = question.options.indexOf(answer);
        if (optionIndex !== -1 && question.scoring_weights[optionIndex] !== undefined) {
          totalScore += question.scoring_weights[optionIndex];
        }
        maxScore += Math.max(...question.scoring_weights);
      }
    });

    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    return {
      overall: percentage,
      raw_score: totalScore,
      max_score: maxScore,
      interpretation: 'Rezultat calculat',
      dimensions: {
        general_score: percentage
      }
    };
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (questions && currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (!user || !testInfo || !questions) {
      toast({
        title: "Eroare",
        description: "Informații lipsă pentru salvarea testului.",
        variant: "destructive"
      });
      return;
    }

    console.log('Submitting test with:', { testInfo, answers, questions });

    let score;
    
    // Calculate score based on test type
    if (testInfo.name === 'Evaluare Anxietate GAD-7') {
      score = calculateGAD7Score(answers, questions);
    } else if (testInfo.name === 'Inteligență Emoțională') {
      score = calculateEQScore(answers, questions);
    } else {
      // Default scoring for other tests
      score = calculateDefaultScore(answers, questions);
    }

    const resultData = {
      testTypeId: testInfo.id,
      userId: user.id,
      answers: answers,
      score: score,
      completedAt: new Date().toISOString()
    };

    console.log('Final result data:', resultData);
    saveResultMutation.mutate(resultData);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isLoading = testLoading || questionsLoading;
  const progress = questions ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const isLastQuestion = questions ? currentQuestion === questions.length - 1 : false;
  const canProceed = answers[currentQuestion] !== undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!testInfo || !questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Test nu a fost găsit</h2>
          <Button onClick={() => navigate('/teste')}>
            Înapoi la teste
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/teste')}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la teste
            </Button>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">Timp rămas</div>
              <div className="text-lg font-bold text-red-600">
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{testInfo.name}</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Întrebarea {currentQuestion + 1} din {questions.length}
            </p>
            <div className="text-sm text-gray-600">
              {Math.round(progress)}% completat
            </div>
          </div>
          
          <Progress value={progress} className="mt-4" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestionData.question_text}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <RadioGroup 
              value={answers[currentQuestion] || ''} 
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-sm font-normal cursor-pointer flex-1 py-2"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          {isLastQuestion ? (
            <Button 
              onClick={handleSubmit}
              disabled={!canProceed || saveResultMutation.isPending}
              className="flex items-center"
            >
              {saveResultMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Finalizează Testul
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center"
            >
              Următoarea
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestRunner;
