import React from 'react';
import BigFiveExplanation from './explanations/BigFiveExplanation';
import BelbinExplanation from './explanations/BelbinExplanation';
import CattellExplanation from './explanations/CattellExplanation';
import CognitiveExplanation from './explanations/CognitiveExplanation';
import DISCExplanation from './explanations/DISCExplanation';
import EmotionalIntelligenceExplanation from './explanations/EmotionalIntelligenceExplanation';
import EnneagramExplanation from './explanations/EnneagramExplanation';
import GADExplanation from './explanations/GADExplanation';
import HollandExplanation from './explanations/HollandExplanation';
import DigitalCompetenciesExplanation from './explanations/DigitalCompetenciesExplanation';
import { HexacoExplanation } from './explanations/HexacoExplanation';
import { SJTExplanation } from './explanations/SJTExplanation';
import { WatsonGlaserExplanation } from './explanations/WatsonGlaserExplanation';
import SensoryPerceptionExplanation from './explanations/SensoryPerceptionExplanation';

interface TestExplanationsProps {
  testName: string;
  score?: any;
  language?: string;
}

export const TestExplanations: React.FC<TestExplanationsProps> = ({ testName, score, language = 'ro' }) => {
  console.log('TestExplanations - Test name:', testName);
  console.log('TestExplanations - Score:', score);
  
  const testKey = testName.toLowerCase();
  
  if (testKey.includes('big five') || testKey.includes('big-five')) {
    return <BigFiveExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('belbin')) {
    return <BelbinExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('cattell') || testKey.includes('16pf')) {
    return <CattellExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('watson') || testKey.includes('glaser') || testKey.includes('critical thinking')) {
    return <WatsonGlaserExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('cognitive') || testKey.includes('cognitiv')) {
    return <CognitiveExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('disc')) {
    return <DISCExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('emotional') || testKey.includes('emotiona')) {
    return <EmotionalIntelligenceExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('enneagram')) {
    return <EnneagramExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('gad') || testKey.includes('anxietate')) {
    return <GADExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('hexaco')) {
    return <HexacoExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('holland') || testKey.includes('riasec') || testKey.includes('occupational themes')) {
    return <HollandExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('competențe digitale') || testKey.includes('competente digitale') || testKey.includes('digital')) {
    return <DigitalCompetenciesExplanation score={score} language={language} />;
  }
  
  if (testKey.includes('sjt') || testKey.includes('situational judgment') || testKey.includes('orientare') || testKey.includes('cariera') || testKey.includes('competențe manageriale') || testKey.includes('managerial')) {
    return <SJTExplanation score={score} language={language} />;
  }

  // Sensory Perception Test
  if (testName.includes('Percepție Senzorială') || testName.toLowerCase().includes('sensory perception')) {
    return (
      <SensoryPerceptionExplanation
        score={score}
        language={language}
      />
    );
  }

  return null;
};
