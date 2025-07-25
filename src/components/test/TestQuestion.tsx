
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Language } from '@/types/language';

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

  const options = language === 'en' && question.options_en 
    ? question.options_en 
    : question.options;

  // Parse options if they're stored as JSON string
  const parsedOptions = typeof options === 'string' ? JSON.parse(options) : options;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {questionText}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.isArray(parsedOptions) && parsedOptions.map((option: string, index: number) => (
          <Button
            key={index}
            variant={selectedAnswer === index ? "default" : "outline"}
            className="w-full text-left justify-start p-4 h-auto whitespace-normal"
            onClick={() => onAnswer(index)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
