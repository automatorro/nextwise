
import React from 'react';
import { BelbinExplanation } from './explanations/BelbinExplanation';
import { BigFiveExplanation } from './explanations/BigFiveExplanation';
import { CattellExplanation } from './explanations/CattellExplanation';
import { CognitiveExplanation } from './explanations/CognitiveExplanation';
import { DISCExplanation } from './explanations/DISCExplanation';
import { EmotionalIntelligenceExplanation } from './explanations/EmotionalIntelligenceExplanation';
import { EnneagramExplanation } from './explanations/EnneagramExplanation';
import { GADExplanation } from './explanations/GADExplanation';
import { HexacoExplanation } from './explanations/HexacoExplanation';

interface TestExplanationsProps {
  testName: string;
}

export const TestExplanations: React.FC<TestExplanationsProps> = ({ testName }) => {
  const normalizedTestName = testName.toLowerCase();
  
  if (normalizedTestName.includes('belbin')) {
    return <BelbinExplanation />;
  }
  
  if (normalizedTestName.includes('big five') || normalizedTestName.includes('big-five')) {
    return <BigFiveExplanation />;
  }
  
  if (normalizedTestName.includes('cattell') || normalizedTestName.includes('16pf')) {
    return <CattellExplanation />;
  }
  
  if (normalizedTestName.includes('cognitive') || normalizedTestName.includes('cognitiv')) {
    return <CognitiveExplanation />;
  }
  
  if (normalizedTestName.includes('disc')) {
    return <DISCExplanation />;
  }
  
  if (normalizedTestName.includes('emotional') || normalizedTestName.includes('emotiona')) {
    return <EmotionalIntelligenceExplanation />;
  }
  
  if (normalizedTestName.includes('enneagram')) {
    return <EnneagramExplanation />;
  }
  
  if (normalizedTestName.includes('gad') || normalizedTestName.includes('anxietate')) {
    return <GADExplanation />;
  }
  
  if (normalizedTestName.includes('hexaco')) {
    return <HexacoExplanation />;
  }
  
  return null;
};
