
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Question {
  id: string;
  question_text_ro: string;
  question_text_en?: string;
  question_text?: string;
  options: any;
  options_en?: any;
  question_order: number;
  question_type?: string;
  scoring_weights?: any;
}

interface TestType {
  name: string;
  estimated_duration: number;
  questions_count: number;
}

interface TestQuestionProps {
  currentQuestion: Question;
  questions: Question[];
  answers: Record<string, number>;
  currentIndex: number;
  testType: TestType;
  onAnswer: (questionId: string, answer: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
  timeRemaining?: number;
}

const TestQuestion: React.FC<TestQuestionProps> = ({
  currentQuestion,
  questions,
  answers,
  currentIndex,
  testType,
  onAnswer,
  onNext,
  onPrevious,
  onFinish,
  timeRemaining
}) => {
  const { language } = useLanguage();
  
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const hasAnswer = answers[currentQuestion.id] !== undefined;
  const isLastQuestion = currentIndex === questions.length - 1;

  // Parse options based on language
  const parseOptions = (options: any) => {
    if (!options) return [];
    
    try {
      if (typeof options === 'string') {
        return JSON.parse(options);
      }
      if (Array.isArray(options)) {
        return options;
      }
      return [];
    } catch (error) {
      console.error('Error parsing options:', error);
      return [];
    }
  };

  const getQuestionText = () => {
    if (language === 'en' && currentQuestion.question_text_en) {
      return currentQuestion.question_text_en;
    }
    return currentQuestion.question_text_ro || currentQuestion.question_text || '';
  };

  const getOptions = () => {
    if (language === 'en' && currentQuestion.options_en) {
      return parseOptions(currentQuestion.options_en);
    }
    return parseOptions(currentQuestion.options);
  };

  const options = getOptions();

  const handleOptionSelect = (optionIndex: number) => {
    onAnswer(currentQuestion.id, optionIndex);
    
    // Auto-advance after a short delay (except for last question)
    if (!isLastQuestion) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">
            {language === 'en' ? 'Question' : 'Întrebarea'} {currentIndex + 1} {language === 'en' ? 'of' : 'din'} {questions.length}
          </span>
          {timeRemaining && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
        <Progress value={progress} className="w-48" />
      </div>

      {/* Question Card */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl">
            {testType.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            {getQuestionText()}
          </p>

          <div className="space-y-4">
            {options.map((option: any, index: number) => {
              const optionText = typeof option === 'object' ? option.label : option;
              const isSelected = answers[currentQuestion.id] === index;
              
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:border-blue-300 ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 text-blue-900' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Previous' : 'Anterior'}</span>
        </Button>

        <div className="flex space-x-3">
          {!isLastQuestion ? (
            <Button
              onClick={onNext}
              disabled={!hasAnswer}
              className="flex items-center space-x-2"
            >
              <span>{language === 'en' ? 'Next' : 'Următorul'}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={onFinish}
              disabled={!hasAnswer}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
            >
              <span>{language === 'en' ? 'Finish Test' : 'Finalizează Testul'}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestQuestion;
