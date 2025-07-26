
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { parseQuestionOptions } from '@/components/test/QuestionOptionsParser';

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
  const getQuestionText = () => {
    if (language === 'en' && question.question_text_en) {
      return question.question_text_en;
    }
    return question.question_text_ro || question.question_text || '';
  };

  const getRawOptions = () => {
    if (language === 'en' && question.options_en) {
      return question.options_en;
    }
    return question.options;
  };

  // Use the parser to get properly structured options
  const parsedOptions = parseQuestionOptions(getRawOptions(), language as 'ro' | 'en');

  return (
    <Card className="border-2 border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl">
          {getQuestionText()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {parsedOptions.map((option, index) => {
          const isSelected = selectedAnswer === option.value;
          
          return (
            <button
              key={index}
              onClick={() => onAnswer(option.value)}
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
                <span className="text-sm font-medium">{option.label}</span>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TestQuestion;
