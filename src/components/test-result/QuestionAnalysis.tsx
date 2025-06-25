
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Question, getBestAnswerOption, getUserScore, getMaxPossibleScore, getOptionLabel } from '@/utils/scoringUtils';

interface QuestionAnalysisProps {
  question: Question;
  userAnswer: number;
}

const QuestionAnalysis = ({ question, userAnswer }: QuestionAnalysisProps) => {
  const bestOption = getBestAnswerOption(question);
  const userScore = getUserScore(question, userAnswer);
  const maxScore = getMaxPossibleScore(question);
  const isMaxScore = userScore === maxScore && maxScore > 0;
  
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900 flex-1 pr-2">
          {question.question_order}. {question.question_text}
        </h4>
        {isMaxScore && <CheckCircle className="w-5 h-5 text-green-500 mt-1" />}
        {!isMaxScore && userScore > 0 && <HelpCircle className="w-5 h-5 text-yellow-500 mt-1" />}
        {userScore === 0 && <XCircle className="w-5 h-5 text-red-500 mt-1" />}
      </div>
      
      <div className="space-y-2">
        {bestOption !== null && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Răspuns corect
            </Badge>
            <span className="text-sm font-medium text-green-700">
              {getOptionLabel(question, bestOption)}
            </span>
            <Badge variant="outline" className="text-xs">
              {maxScore} puncte
            </Badge>
          </div>
        )}
        
        {userAnswer !== undefined && (
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`${
                isMaxScore 
                  ? 'border-green-500 text-green-700' 
                  : userScore > 0 
                    ? 'border-yellow-500 text-yellow-700'
                    : 'border-red-500 text-red-700'
              }`}
            >
              Răspunsul tău
            </Badge>
            <span className={`text-sm font-medium ${
              isMaxScore 
                ? 'text-green-700' 
                : userScore > 0 
                  ? 'text-yellow-700'
                  : 'text-red-700'
            }`}>
              {getOptionLabel(question, userAnswer)}
            </span>
            <Badge variant="outline" className="text-xs">
              {userScore} puncte
            </Badge>
          </div>
        )}
        
        {maxScore > 0 && (
          <div className="text-xs text-gray-600">
            Performanță: {userScore}/{maxScore} puncte ({Math.round((userScore/maxScore) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionAnalysis;
