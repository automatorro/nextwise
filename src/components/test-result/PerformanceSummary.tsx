
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface PerformanceSummaryProps {
  totalUserScore: number;
  totalMaxScore: number;
  questionsWithMaxScore: number;
  totalQuestions: number;
}

const PerformanceSummary = ({ 
  totalUserScore, 
  totalMaxScore, 
  questionsWithMaxScore, 
  totalQuestions 
}: PerformanceSummaryProps) => {
  const { language } = useLanguage();
  
  // Defensive checks - don't render if data is invalid
  if (totalMaxScore <= 0 || totalQuestions <= 0) {
    return null;
  }

  const labels = {
    title: language === 'en' ? 'Performance Summary' : 'Sumar Performanță',
    totalScore: language === 'en' ? 'Total score obtained:' : 'Punctaj total obținut:',
    maxScore: language === 'en' ? 'Maximum possible score:' : 'Punctaj maxim posibil:',
    perfectAnswers: language === 'en' ? 'Perfect answers:' : 'Răspunsuri perfecte:',
    overallPercentage: language === 'en' ? 'Overall percentage:' : 'Procentaj general:'
  };

  const percentage = totalMaxScore > 0 ? Math.round((totalUserScore / totalMaxScore) * 100) : 0;

  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-900 mb-2">{labels.title}</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-blue-700">{labels.totalScore}</span>
          <span className="font-semibold ml-2">{totalUserScore}</span>
        </div>
        <div>
          <span className="text-blue-700">{labels.maxScore}</span>
          <span className="font-semibold ml-2">{totalMaxScore}</span>
        </div>
        <div>
          <span className="text-blue-700">{labels.perfectAnswers}</span>
          <span className="font-semibold ml-2">{questionsWithMaxScore}/{totalQuestions}</span>
        </div>
        <div>
          <span className="text-blue-700">{labels.overallPercentage}</span>
          <span className="font-semibold ml-2">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;
