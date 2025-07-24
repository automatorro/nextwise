
import React from 'react';

interface BigFiveExplanationProps {
  score?: any;
  language?: string;
}

const BigFiveExplanation: React.FC<BigFiveExplanationProps> = ({ score, language = 'ro' }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-600">
        {language === 'en' 
          ? 'Big Five personality explanation will be available soon.'
          : 'Explicația pentru testul Big Five va fi disponibilă în curând.'}
      </p>
    </div>
  );
};

export default BigFiveExplanation;
