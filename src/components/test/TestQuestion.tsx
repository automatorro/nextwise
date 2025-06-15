
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
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

interface TestQuestionProps {
  testType: TestType;
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: { [questionId: string]: number };
  isSubmitting: boolean;
  onAnswerChange: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Helper function to safely parse and normalize question options
const parseQuestionOptions = (options: Json): { value: number; label: string }[] => {
  console.log('Parsing options:', options);
  
  if (!options) {
    console.log('No options provided');
    return [];
  }

  // Handle array of objects with value and label
  if (Array.isArray(options)) {
    return options
      .filter(option => option && typeof option === 'object' && option !== null)
      .map(option => {
        // Type guard to ensure option is an object with the expected properties
        const optionObj = option as { [key: string]: any };
        return {
          value: typeof optionObj.value === 'number' ? optionObj.value : 0,
          label: typeof optionObj.label === 'string' ? optionObj.label : 
                 typeof optionObj.text === 'string' ? optionObj.text : 
                 `Option ${optionObj.value || 0}`
        };
      });
  }

  // Handle array of strings (simple format)
  if (Array.isArray(options) && options.every(opt => typeof opt === 'string')) {
    return options.map((label, index) => ({
      value: index + 1,
      label: label as string
    }));
  }

  // Handle object format
  if (typeof options === 'object' && options !== null && !Array.isArray(options)) {
    // If it's an object with numeric keys (common format)
    const entries = Object.entries(options);
    if (entries.length > 0) {
      return entries.map(([key, value]) => ({
        value: parseInt(key) || 0,
        label: typeof value === 'string' ? value : `Option ${key}`
      }));
    }
  }

  // Fallback to default Likert scale if parsing fails
  console.log('Using fallback Likert scale options');
  return [
    { value: 1, label: 'Complet dezacord' },
    { value: 2, label: 'Dezacord' },
    { value: 3, label: 'Neutru' },
    { value: 4, label: 'Acord' },
    { value: 5, label: 'Complet de acord' }
  ];
};

const TestQuestion: React.FC<TestQuestionProps> = ({
  testType,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  answers,
  isSubmitting,
  onAnswerChange,
  onNext,
  onPrevious
}) => {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Parse options safely from JSON
  const questionOptions = parseQuestionOptions(currentQuestion.options);
  console.log('Parsed question options:', questionOptions);

  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{testType.name}</h1>
            <span className="text-sm text-gray-500">
              {currentQuestionIndex + 1} din {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">
              Întrebarea {currentQuestionIndex + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              {currentQuestion.question_text}
            </p>

            <div className="space-y-4">
              <RadioGroup
                value={answers[currentQuestion.id]?.toString() || ''}
                onValueChange={onAnswerChange}
                className="space-y-2"
              >
                {questionOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem
                      value={option.value.toString()}
                      id={`option-${option.value}`}
                      className="flex-shrink-0"
                    />
                    <Label
                      htmlFor={`option-${option.value}`}
                      className="text-sm cursor-pointer flex-1 leading-relaxed"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentQuestionIndex === 0}
                className="px-6"
              >
                Înapoi
              </Button>
              
              <Button
                onClick={onNext}
                disabled={!isCurrentQuestionAnswered || isSubmitting}
                className="px-6"
              >
                {isSubmitting ? (
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

export default TestQuestion;
