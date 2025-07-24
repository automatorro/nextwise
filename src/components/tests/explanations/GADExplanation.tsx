
import React from 'react';

interface GADExplanationProps {
  score?: any;
  language?: string;
}

export const GADExplanation: React.FC<GADExplanationProps> = ({ score, language = 'ro' }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-600">
        {language === 'en' 
          ? 'GAD-7 explanation will be available soon.'
          : 'Explicația pentru testul GAD-7 va fi disponibilă în curând.'}
      </p>
    </div>
  );
};

export default GADExplanation;
