
import React from 'react';

interface EmotionalIntelligenceExplanationProps {
  score?: any;
  language?: string;
}

const EmotionalIntelligenceExplanation: React.FC<EmotionalIntelligenceExplanationProps> = ({ score, language = 'ro' }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-gray-600">
        {language === 'en' 
          ? 'Emotional Intelligence explanation will be available soon.'
          : 'Explicația pentru testul de inteligență emoțională va fi disponibilă în curând.'}
      </p>
    </div>
  );
};

export default EmotionalIntelligenceExplanation;
