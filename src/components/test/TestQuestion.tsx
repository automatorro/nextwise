
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
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

// Enhanced helper function to safely parse and normalize question options
const parseQuestionOptions = (options: Json): { value: number; label: string }[] => {
  console.log('=== ENHANCED PARSING DEBUG ===');
  console.log('Input options:', options);
  console.log('Options type:', typeof options);
  console.log('Is array:', Array.isArray(options));
  
  if (!options) {
    console.log('No options provided, returning empty array');
    return [];
  }

  // Handle array format (most common)
  if (Array.isArray(options)) {
    console.log('Processing array with length:', options.length);
    
    // Case 1: Array of objects with label and value properties
    if (options.length > 0 && typeof options[0] === 'object' && options[0] !== null) {
      const firstOption = options[0] as { [key: string]: any };
      
      // Check if it has label and value properties
      if ('label' in firstOption && 'value' in firstOption) {
        console.log('Processing as array of objects with label/value');
        return options.map((option: any) => ({
          value: typeof option.value === 'number' ? option.value : parseInt(option.value) || 0,
          label: String(option.label || `Option ${option.value || 0}`)
        }));
      }
      
      // Check if it has text and value properties (alternative format)
      if ('text' in firstOption && 'value' in firstOption) {
        console.log('Processing as array of objects with text/value');
        return options.map((option: any) => ({
          value: typeof option.value === 'number' ? option.value : parseInt(option.value) || 0,
          label: String(option.text || `Option ${option.value || 0}`)
        }));
      }
      
      // Check if it has value property only
      if ('value' in firstOption) {
        console.log('Processing as array of objects with value only');
        return options.map((option: any, index: number) => ({
          value: typeof option.value === 'number' ? option.value : parseInt(option.value) || (index + 1),
          label: String(option.label || option.text || `Option ${option.value || (index + 1)}`)
        }));
      }
    }
    
    // Case 2: Array of strings (simple format)
    if (options.length > 0 && typeof options[0] === 'string') {
      console.log('Processing as array of strings');
      return options.map((label: string, index: number) => ({
        value: index + 1,
        label: String(label)
      }));
    }
    
    // Case 3: Array of numbers or mixed types
    console.log('Processing as array of mixed types');
    return options.map((item: any, index: number) => ({
      value: index + 1,
      label: String(item || `Option ${index + 1}`)
    }));
  }

  // Handle object format (legacy support)
  if (typeof options === 'object' && options !== null) {
    console.log('Processing object format');
    
    // Check if it's an object with numeric keys
    const entries = Object.entries(options);
    if (entries.length > 0) {
      console.log('Converting object entries to options');
      return entries.map(([key, value]) => ({
        value: parseInt(key) || 0,
        label: typeof value === 'string' ? value : `Option ${key}`
      })).sort((a, b) => a.value - b.value);
    }
  }

  // Fallback to default Likert scale if all parsing fails
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
  const navigate = useNavigate();
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Parse options safely from JSON
  const questionOptions = parseQuestionOptions(currentQuestion.options);
  console.log('Final parsed question options:', questionOptions);

  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleExitTest = () => {
    navigate('/teste');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{testType.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {currentQuestionIndex + 1} din {totalQuestions}
              </span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                    <X className="w-4 h-4 mr-1" />
                    Ieși din test
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmi ieșirea din test?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Dacă ieși acum, tot progresul din acest test se va pierde și va trebui să îl reiei de la început.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Anulează</AlertDialogCancel>
                    <AlertDialogAction onClick={handleExitTest} className="bg-red-600 hover:bg-red-700">
                      Da, ieși din test
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
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
              {questionOptions.length > 0 ? (
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
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Nu s-au putut încărca opțiunile pentru această întrebare.</p>
                  <p className="text-sm mt-2">Te rugăm să reîncerci sau să contactezi suportul.</p>
                </div>
              )}
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
                disabled={!isCurrentQuestionAnswered || isSubmitting || questionOptions.length === 0}
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
