
import React from 'react';

interface DISCExplanationProps {
  score?: any;
  language?: string;
}

const DISCExplanation: React.FC<DISCExplanationProps> = ({ score, language = 'ro' }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-600">
        {language === 'en' 
          ? 'DISC explanation will be available soon.'
          : 'Explicația pentru testul DISC va fi disponibilă în curând.'}
      </p>
    </div>
  );
};

export default DISCExplanation;
