
import React from 'react';
import BelbinRadarChart from '../charts/BelbinRadarChart';
import BigFiveRadarChart from '../charts/BigFiveRadarChart';
import { HexacoRadarChart } from '../charts/HexacoRadarChart';

interface TestResultChartsProps {
  testName: string;
  score: any;
}

export const TestResultCharts: React.FC<TestResultChartsProps> = ({ testName, score }) => {
  if (testName.toLowerCase().includes('belbin')) {
    return <BelbinRadarChart data={score.dimensions} />;
  }
  
  if (testName.toLowerCase().includes('big five') || testName.toLowerCase().includes('big-five')) {
    return <BigFiveRadarChart data={score.dimensions} />;
  }
  
  if (testName.toLowerCase().includes('hexaco')) {
    return <HexacoRadarChart data={score.dimensions} />;
  }
  
  return null;
};
