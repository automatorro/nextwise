
import React from 'react';

interface CattellExplanationProps {
  score: any;
  language: string;
}

const CattellExplanation: React.FC<CattellExplanationProps> = ({ score, language }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-600">
        {language === 'en' 
          ? 'Cattell 16PF explanation will be available soon.'
          : 'Explicația pentru testul Cattell 16PF va fi disponibilă în curând.'}
      </p>
    </div>
  );
};

export default CattellExplanation;
