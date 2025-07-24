
import React from 'react';
import BelbinExplanation from './explanations/BelbinExplanation';
import BigFiveExplanation from './explanations/BigFiveExplanation';
import CattellExplanation from './explanations/CattellExplanation';
import CognitiveExplanation from './explanations/CognitiveExplanation';
import DISCExplanation from './explanations/DISCExplanation';
import EmotionalIntelligenceExplanation from './explanations/EmotionalIntelligenceExplanation';
import EnneagramExplanation from './explanations/EnneagramExplanation';
import GADExplanation from './explanations/GADExplanation';
import HexacoExplanation from './explanations/HexacoExplanation';

interface TestExplanationsProps {
  testName: string;
  score?: any;
  language?: string;
}

export const TestExplanations: React.FC<TestExplanationsProps> = ({ testName, score, language = 'ro' }) => {
  const normalizedTestName = testName.toLowerCase();
  
  if (normalizedTestName.includes('belbin')) {
    return <BelbinExplanation score={score} language={language} />;
  }
  
  if (normalizedTestName.includes('big five') || normalizedTestName.includes('big-five')) {
    return <BigFiveExplanation score={score} language={language} />;
  }
  
  if (normalizedTestName.includes('cattell') || normalizedTestName.includes('16pf')) {
    return <CattellExplanation score={score} language={language} />;
  }
  
  if (normalizedTestName.includes('cognitive') || normalizedTestName.includes('cognitiv')) {
    return <CognitiveExplanation score={score} language={language} />;
  }
  
  if (normalizedTestName.includes('disc')) {
    return <DISCExplanation score={score} language={language} />;
  }
  
  if (normalizedTestName.includes('emotional') || normalizedTestName.includes('emotiona')) {
    return <EmotionalIntelligenceExplanation score={score} language={language} />;
  }
  
  if (normalizedTestName.includes('enneagram')) {
    return <EnneagramExplanation score={score} language={language} />;
  }
  
  if (normalizedTestName.includes('gad') || normalizedTestName.includes('anxietate')) {
    return <GADExplanation score={score} language={language} />;
  }
  
  if (normalizedTestName.includes('hexaco')) {
    return <HexacoExplanation score={score} language={language} />;
  }
  
  return null;
};
