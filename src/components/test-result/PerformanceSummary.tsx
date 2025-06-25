
import React from 'react';

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
  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-900 mb-2">Sumar Performanță</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-blue-700">Punctaj total obținut:</span>
          <span className="font-semibold ml-2">{totalUserScore}</span>
        </div>
        <div>
          <span className="text-blue-700">Punctaj maxim posibil:</span>
          <span className="font-semibold ml-2">{totalMaxScore}</span>
        </div>
        <div>
          <span className="text-blue-700">Răspunsuri perfecte:</span>
          <span className="font-semibold ml-2">{questionsWithMaxScore}/{totalQuestions}</span>
        </div>
        <div>
          <span className="text-blue-700">Procentaj general:</span>
          <span className="font-semibold ml-2">
            {totalMaxScore > 0 ? Math.round((totalUserScore/totalMaxScore) * 100) : 0}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSummary;
