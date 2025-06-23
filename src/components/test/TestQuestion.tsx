
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

// Comprehensive helper function to safely parse and normalize question options
const parseQuestionOptions = (options: Json): { value: number; label: string }[] => {
  console.log('=== OPTION PARSING DEBUG ===');
  console.log('Raw options:', options);
  console.log('Options type:', typeof options);
  console.log('Is array:', Array.isArray(options));
  
  if (!options) {
    console.log('No options provided, returning default Likert scale');
    return getDefaultLikertScale();
  }

  try {
    // Handle array format (most common)
    if (Array.isArray(options)) {
      console.log('Processing array format with', options.length, 'items');
      
      if (options.length === 0) {
        console.log('Empty array, using default options');
        return getDefaultLikertScale();
      }
      
      // Case 1: Array of objects with label/value or similar properties
      if (typeof options[0] === 'object' && options[0] !== null) {
        const firstItem = options[0] as { [key: string]: any };
        console.log('First item keys:', Object.keys(firstItem));
        
        // Standard format: {label: "text", value: number}
        if ('label' in firstItem && 'value' in firstItem) {
          console.log('Using label/value format');
          return options.map((opt: any) => ({
            value: ensureNumber(opt.value),
            label: String(opt.label || `Option ${opt.value || 1}`)
          }));
        }
        
        // Alternative format: {text: "text", value: number}
        if ('text' in firstItem && 'value' in firstItem) {
          console.log('Using text/value format');
          return options.map((opt: any) => ({
            value: ensureNumber(opt.value),
            label: String(opt.text || `Option ${opt.value || 1}`)
          }));
        }
        
        // Value-only format: {value: number}
        if ('value' in firstItem) {
          console.log('Using value-only format');
          return options.map((opt: any, index: number) => ({
            value: ensureNumber(opt.value, index + 1),
            label: String(opt.label || opt.text || `Option ${opt.value || (index + 1)}`)
          }));
        }
        
        // Generic object format - try to extract meaningful data
        console.log('Using generic object format');
        return options.map((opt: any, index: number) => {
          const keys = Object.keys(opt);
          const valueKey = keys.find(k => k.toLowerCase().includes('value')) || keys[0];
          const labelKey = keys.find(k => k.toLowerCase().includes('label') || k.toLowerCase().includes('text')) || keys[1] || keys[0];
          
          return {
            value: ensureNumber(opt[valueKey], index + 1),
            label: String(opt[labelKey] || `Option ${index + 1}`)
          };
        });
      }
      
      // Case 2: Array of strings
      if (typeof options[0] === 'string') {
        console.log('Processing string array');
        return options.map((label: string, index: number) => ({
          value: index + 1,
          label: String(label)
        }));
      }
      
      // Case 3: Array of numbers or mixed primitives
      console.log('Processing primitive array');
      return options.map((item: any, index: number) => ({
        value: index + 1,
        label: String(item || `Option ${index + 1}`)
      }));
    }

    // Handle object format (key-value pairs)
    if (typeof options === 'object' && options !== null) {
      console.log('Processing object format');
      const entries = Object.entries(options);
      
      if (entries.length === 0) {
        console.log('Empty object, using default options');
        return getDefaultLikertScale();
      }
      
      // Convert object entries to options, sorting by numeric keys if possible
      return entries
        .map(([key, value]) => ({
          value: ensureNumber(key),
          label: typeof value === 'string' ? value : String(value || `Option ${key}`)
        }))
        .sort((a, b) => a.value - b.value);
    }

    // Handle string format (JSON string)
    if (typeof options === 'string') {
      console.log('Attempting to parse string as JSON');
      try {
        const parsed = JSON.parse(options);
        return parseQuestionOptions(parsed); // Recursive call with parsed data
      } catch (parseError) {
        console.log('Failed to parse JSON string, treating as single option');
        return [{ value: 1, label: options }];
      }
    }

  } catch (error) {
    console.error('Error parsing options:', error);
  }

  // Ultimate fallback
  console.log('Using fallback default options');
  return getDefaultLikertScale();
};

// Helper function to ensure a value is a valid number
const ensureNumber = (value: any, fallback: number = 1): number => {
  if (typeof value === 'number' && !isNaN(value)) {
    return Math.max(1, Math.round(value));
  }
  
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      return Math.max(1, parsed);
    }
  }
  
  return fallback;
};

// Default Likert scale for fallback
const getDefaultLikertScale = (): { value: number; label: string }[] => [
  { value: 1, label: 'Complet dezacord' },
  { value: 2, label: 'Dezacord' },
  { value: 3, label: 'Neutru' },
  { value: 4, label: 'Acord' },
  { value: 5, label: 'Complet de acord' }
];

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
  console.log('Final parsed options for question:', currentQuestion.id, questionOptions);

  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleExitTest = () => {
    navigate('/teste');
  };

  // Validate that we have valid options
  const hasValidOptions = questionOptions.length > 0 && 
    questionOptions.every(opt => opt.value > 0 && opt.label);

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
              {hasValidOptions ? (
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
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-lg font-medium mb-2">Opțiuni indisponibile</p>
                  <p className="text-sm">Nu s-au putut încărca opțiunile pentru această întrebare.</p>
                  <p className="text-xs mt-2 text-gray-400">
                    Te rugăm să contactezi suportul sau să încerci din nou mai târziu.
                  </p>
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
                disabled={!isCurrentQuestionAnswered || isSubmitting || !hasValidOptions}
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
