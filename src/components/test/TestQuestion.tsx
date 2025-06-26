
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
import { parseQuestionOptions } from './QuestionOptionsParser';
import { useLanguage } from '@/hooks/useLanguage';
import type { Json } from '@/integrations/supabase/types';

interface Question {
  id: string;
  question_text: string;
  question_order: number;
  options: Json;
  options_en?: Json;
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
  const { language, t } = useLanguage();
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  console.log('=== DETAILED OPTION DEBUGGING ===');
  console.log('Current language:', language);
  console.log('Question ID:', currentQuestion.id);
  console.log('Romanian options (raw):', currentQuestion.options);
  console.log('English options (raw):', currentQuestion.options_en);
  console.log('Test type name:', testType.name);

  // Helper function to check if options data is corrupted
  const isOptionsCorrupted = (options: Json): boolean => {
    if (!options) return true;
    
    if (typeof options === 'string') {
      return options === '[object Object]' || options.includes('[object Object]');
    }
    
    if (Array.isArray(options)) {
      return options.some(opt => 
        typeof opt === 'string' && (opt === '[object Object]' || opt.includes('[object Object]'))
      );
    }
    
    return false;
  };

  // Get options with PRIORITIZED use of options_en for English
  const getLocalizedOptions = () => {
    console.log('🔄 Getting localized options...');
    
    // For English language: PRIORITIZE options_en column
    if (language === 'en') {
      console.log('🇬🇧 Language is EN - checking options_en first');
      
      // First, try to use options_en if it exists and is not corrupted
      if (currentQuestion.options_en && !isOptionsCorrupted(currentQuestion.options_en)) {
        console.log('✅ Using options_en from database');
        const enOptions = parseQuestionOptions(currentQuestion.options_en, 'en');
        console.log('📋 Options from options_en:', enOptions);
        return enOptions;
      }
      
      console.log('⚠️ options_en not available or corrupted, falling back to translation');
      // Fallback: translate Romanian options
      const sourceOptions = currentQuestion.options;
      if (!sourceOptions || isOptionsCorrupted(sourceOptions)) {
        console.log('❌ Source options also corrupted, using defaults');
        return parseQuestionOptions(null, 'en');
      }
      
      console.log('🔄 Translating Romanian options to English as fallback');
      const translatedOptions = parseQuestionOptions(sourceOptions, 'en');
      console.log('✅ Fallback translated options result:', translatedOptions);
      return translatedOptions;
    }
    
    // For Romanian language: use Romanian options as-is
    console.log('🇷🇴 Language is RO - using Romanian options');
    const sourceOptions = currentQuestion.options;
    if (!sourceOptions || isOptionsCorrupted(sourceOptions)) {
      console.log('❌ Romanian options corrupted, using defaults');
      return parseQuestionOptions(null, 'ro');
    }
    
    const roOptions = parseQuestionOptions(sourceOptions, 'ro');
    console.log('✅ Romanian options result:', roOptions);
    return roOptions;
  };

  const questionOptions = getLocalizedOptions();
  console.log('🎯 FINAL OPTIONS FOR RENDERING:', questionOptions);

  const isCurrentQuestionAnswered = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleExitTest = () => {
    navigate('/teste');
  };

  // Validate that we have valid options and none contain corrupted data
  const hasValidOptions = questionOptions.length > 0 && 
    questionOptions.every(opt => 
      opt.value >= 0 && 
      opt.label && 
      opt.label.trim() !== '' && 
      opt.label !== '[object Object]' &&
      !opt.label.includes('[object Object]')
    );

  console.log('✅ Has valid options:', hasValidOptions);
  console.log('📊 Options validation details:', questionOptions.map(opt => ({
    value: opt.value,
    label: opt.label,
    labelLength: opt.label?.length || 0,
    isValid: opt.value >= 0 && opt.label && opt.label.trim() !== ''
  })));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{testType.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {currentQuestionIndex + 1} {language === 'en' ? 'of' : 'din'} {totalQuestions}
              </span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                    <X className="w-4 h-4 mr-1" />
                    {language === 'en' ? 'Exit test' : 'Ieși din test'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {language === 'en' ? 'Confirm exit from test?' : 'Confirmi ieșirea din test?'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {language === 'en' 
                        ? 'If you exit now, all progress in this test will be lost and you will have to restart from the beginning.'
                        : 'Dacă ieși acum, tot progresul din acest test se va pierde și va trebui să îl reiei de la început.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleExitTest} className="bg-red-600 hover:bg-red-700">
                      {language === 'en' ? 'Yes, exit test' : 'Da, ieși din test'}
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
              {language === 'en' ? `Question ${currentQuestionIndex + 1}` : `Întrebarea ${currentQuestionIndex + 1}`}
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
                    <div key={`${currentQuestion.id}-${option.value}`} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`option-${currentQuestion.id}-${option.value}`}
                        className="flex-shrink-0"
                      />
                      <Label
                        htmlFor={`option-${currentQuestion.id}-${option.value}`}
                        className="text-sm cursor-pointer flex-1 leading-relaxed"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-lg font-medium mb-2">
                    {language === 'en' ? 'Options corrupted' : 'Opțiuni corupte'}
                  </p>
                  <p className="text-sm">
                    {language === 'en' 
                      ? 'The question options appear to be corrupted. Please contact support.'
                      : 'Opțiunile pentru această întrebare par să fie corupte. Te rugăm să contactezi suportul.'}
                  </p>
                  <p className="text-xs mt-2 text-gray-400">
                    {language === 'en'
                      ? 'Data repair is needed for this question.'
                      : 'Este necesară repararea datelor pentru această întrebare.'}
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
                {language === 'en' ? 'Back' : 'Înapoi'}
              </Button>
              
              <Button
                onClick={onNext}
                disabled={!isCurrentQuestionAnswered || isSubmitting || !hasValidOptions}
                className="px-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {language === 'en' ? 'Saving...' : 'Se salvează...'}
                  </>
                ) : isLastQuestion ? (
                  language === 'en' ? 'Finish test' : 'Finalizează testul'
                ) : (
                  language === 'en' ? 'Next' : 'Următoarea'
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
