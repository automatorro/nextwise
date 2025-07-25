
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BigFiveRadarChart from '../charts/BigFiveRadarChart';
import BelbinRadarChart from '../charts/BelbinRadarChart';
import { HexacoRadarChart } from '../charts/HexacoRadarChart';
import { SJTRadarChart } from '../charts/SJTRadarChart';

interface TestResultChartsProps {
  testName: string;
  score: {
    overall: number;
    dimensions?: { [key: string]: number };
    role_scores?: { [key: string]: number };
  };
}

export const TestResultCharts: React.FC<TestResultChartsProps> = ({ testName, score }) => {
  const testKey = testName.toLowerCase();
  
  // Don't show charts for tests that don't have meaningful visualizations
  if (testKey.includes('sjt') || testKey.includes('situational judgment') || 
      testKey.includes('orientare') || testKey.includes('cariera') ||
      testKey.includes('gad') || testKey.includes('anxietate') ||
      testKey.includes('phq') || testKey.includes('depresie') ||
      testKey.includes('cognitiv') || testKey.includes('cognitive')) {
    return null;
  }
  
  if (testKey.includes('big five')) {
    // Convert dimensions to the expected BigFive format
    const bigFiveDimensions = {
      openness: score.dimensions?.openness || 0,
      conscientiousness: score.dimensions?.conscientiousness || 0,
      extraversion: score.dimensions?.extraversion || 0,
      agreeableness: score.dimensions?.agreeableness || 0,
      neuroticism: score.dimensions?.neuroticism || 0
    };
    return <BigFiveRadarChart dimensions={bigFiveDimensions} />;
  }
  
  if (testKey.includes('belbin')) {
    return <BelbinRadarChart roleScores={score.role_scores || score.dimensions || {}} />;
  }
  
  if (testKey.includes('hexaco')) {
    // Convert the dimensions to the expected format for HexacoRadarChart
    const hexacoData = score.dimensions || {};
    const formattedHexacoData = {
      honesty_humility: hexacoData.honesty_humility || 0,
      emotionality: hexacoData.emotionality || 0,
      extraversion: hexacoData.extraversion || 0,
      agreeableness: hexacoData.agreeableness || 0,
      conscientiousness: hexacoData.conscientiousness || 0,
      openness: hexacoData.openness || 0
    };
    return <HexacoRadarChart data={formattedHexacoData} />;
  }
  
  if (testKey.includes('disc')) {
    return <SJTRadarChart data={score.dimensions || {}} />;
  }
  
  // For tests with meaningful dimensions, show a generic radar chart
  if (score.dimensions && Object.keys(score.dimensions).length > 0) {
    return <SJTRadarChart data={score.dimensions} />;
  }
  
  // If no meaningful chart can be displayed, don't show anything
  return null;
};
