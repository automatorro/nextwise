
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Language } from '@/types/language';
import { parseQuestionOptions } from '@/components/test/QuestionOptionsParser';

interface TestQuestionProps {
  question: {
    id: string;
    question_text_ro: string;
    question_text_en?: string;
    question_order: number;
    options: any;
    options_en?: any;
    scoring_weights?: any;
    question_type: string;
    test_type_id: string;
    created_at: string;
  };
  selectedAnswer: number | undefined;
  onAnswer: (answerIndex: number) => void;
  language: Language;
}

export const TestQuestion: React.FC<TestQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswer,
  language
}) => {
  const questionText = language === 'en' && question.question_text_en 
    ? question.question_text_en 
    : question.question_text_ro;

  const rawOptions = language === 'en' && question.options_en 
    ? question.options_en 
    : question.options;

  // Use the parser to get properly structured options
  const parsedOptions = parseQuestionOptions(rawOptions, language);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {questionText}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {parsedOptions.map((option, index) => (
          <Button
            key={index}
            variant={selectedAnswer === option.value ? "default" : "outline"}
            className="w-full text-left justify-start p-4 h-auto whitespace-normal"
            onClick={() => onAnswer(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
