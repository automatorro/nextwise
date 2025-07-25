
import React from 'react';
import BigFiveExplanation from './explanations/BigFiveExplanation';
import BelbinExplanation from './explanations/BelbinExplanation';
import CattellExplanation from './explanations/CattellExplanation';
import CognitiveExplanation from './explanations/CognitiveExplanation';
import DISCExplanation from './explanations/DISCExplanation';
import EmotionalIntelligenceExplanation from './explanations/EmotionalIntelligenceExplanation';
import EnneagramExplanation from './explanations/EnneagramExplanation';
import GADExplanation from './explanations/GADExplanation';
import { HexacoExplanation } from './explanations/HexacoExplanation';
import { SJTExplanation } from './explanations/SJTExplanation';
import { WatsonGlaserExplanation } from './explanations/WatsonGlaserExplanation';

interface TestExplanationsProps {
  testName: string;
  score?: any;
  language?: string;
}

export const TestExplanations: React.FC<TestExplanationsProps> = ({ testName, score, language = 'ro' }) => {
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
  
  if (testKey.includes('sjt') || testKey.includes('situational judgment') || testKey.includes('orientare') || testKey.includes('cariera') || testKey.includes('competențe manageriale') || testKey.includes('managerial')) {
    return <SJTExplanation score={score} language={language} />;
  }
  
  return null;
};
