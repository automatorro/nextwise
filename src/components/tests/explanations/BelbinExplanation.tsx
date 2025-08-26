
import React from 'react';

interface BelbinExplanationProps {
  score?: any;
  language?: string;
}

const BelbinExplanation: React.FC<BelbinExplanationProps> = ({ score, language = 'ro' }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-600">
        {language === 'en' 
          ? 'Belbin explanation will be available soon.'
          : 'Explicația pentru testul Belbin va fi disponibilă în curând.'}
      </p>
    </div>
  );
};

export default BelbinExplanation;
