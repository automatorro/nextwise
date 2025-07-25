
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';

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

interface TestQuestionProps {
  question: Question;
  selectedAnswer: number | undefined;
  onAnswer: (answerIndex: number) => void;
  language: string;
}

const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswer,
  language
}) => {
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
    if (language === 'en' && question.question_text_en) {
      return question.question_text_en;
    }
    return question.question_text_ro || question.question_text || '';
  };

  const getOptions = () => {
    if (language === 'en' && question.options_en) {
      return parseOptions(question.options_en);
    }
    return parseOptions(question.options);
  };

  const options = getOptions();

  return (
    <Card className="border-2 border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl">
          {getQuestionText()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.map((option: any, index: number) => {
          const optionText = typeof option === 'object' ? option.label : option;
          const isSelected = selectedAnswer === index;
          
          return (
            <button
              key={index}
              onClick={() => onAnswer(index)}
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
      </CardContent>
    </Card>
  );
};

export default TestQuestion;
