
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionProps {
  question: {
    id: string;
    text: string;
    options: string[];
    question_order: number;
  };
  selectedAnswer: number | undefined;
  onAnswerChange: (questionId: string, answer: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, selectedAnswer, onAnswerChange }) => {
  // Helper function to ensure we always get a string from options
  const getOptionText = (option: any, index: number): string => {
    if (typeof option === 'string') {
      return option;
    }
    if (typeof option === 'object' && option !== null) {
      // Handle parsed option objects with label/value structure
      return option.label || option.text || option.value || `Option ${index + 1}`;
    }
    return String(option || `Option ${index + 1}`);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">
          {question.question_order}. {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer !== undefined ? selectedAnswer.toString() : ''}
          onValueChange={(value) => onAnswerChange(question.id, parseInt(value))}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`${question.id}-${index}`} />
              <Label htmlFor={`${question.id}-${index}`} className="cursor-pointer">
                {getOptionText(option, index)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Question;
