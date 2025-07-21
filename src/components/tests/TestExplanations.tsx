
import React from 'react';
import BigFiveExplanation from './explanations/BigFiveExplanation';
import GADExplanation from './explanations/GADExplanation';
import DISCExplanation from './explanations/DISCExplanation';
import BelbinExplanation from './explanations/BelbinExplanation';
import CognitiveExplanation from './explanations/CognitiveExplanation';
import EmotionalIntelligenceExplanation from './explanations/EmotionalIntelligenceExplanation';
import CattellExplanation from './explanations/CattellExplanation';
import EnneagramExplanation from './explanations/EnneagramExplanation';

interface TestExplanationsProps {
  testName: string;
  score: any;
  language: string;
}

const TestExplanations: React.FC<TestExplanationsProps> = ({ testName, score, language }) => {
  const renderExplanation = () => {
    switch (testName) {
      case 'Big Five Personalitate':
        return <BigFiveExplanation score={score} language={language} />;
      case 'Evaluare Anxietate GAD-7':
        return <GADExplanation score={score} language={language} />;
      case 'Test DISC - Stiluri de Comportament':
        return <DISCExplanation score={score} language={language} />;
      case 'Roluri în Echipă Belbin':
        return <BelbinExplanation score={score} language={language} />;
      case 'Test Aptitudini Cognitive':
        return <CognitiveExplanation score={score} language={language} />;
      case 'Test Inteligență Emoțională EQ':
        return <EmotionalIntelligenceExplanation score={score} language={language} />;
      case 'Test Cattell 16PF':
        return <CattellExplanation score={score} language={language} />;
      case 'Enneagram':
        return <EnneagramExplanation score={score} language={language} />;
      default:
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              {language === 'ro' 
                ? 'Explicația pentru acest test va fi disponibilă în curând.'
                : 'Explanation for this test will be available soon.'}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="mt-6">
      {renderExplanation()}
    </div>
  );
};

export default TestExplanations;
