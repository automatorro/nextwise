
import React from 'react';

interface CognitiveExplanationProps {
  score: any;
  language: string;
}

const CognitiveExplanation: React.FC<CognitiveExplanationProps> = ({ score, language }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-600">
        {language === 'en' 
          ? 'Cognitive abilities explanation will be available soon.'
          : 'Explicația pentru testul de aptitudini cognitive va fi disponibilă în curând.'}
      </p>
    </div>
  );
};

export default CognitiveExplanation;
