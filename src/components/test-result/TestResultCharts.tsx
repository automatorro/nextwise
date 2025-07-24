
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BigFiveRadarChart } from '../charts/BigFiveRadarChart';
import { BelbinRadarChart } from '../charts/BelbinRadarChart';
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
  
  if (testKey.includes('big five')) {
    return <BigFiveRadarChart data={score.dimensions || {}} />;
  }
  
  if (testKey.includes('belbin')) {
    return <BelbinRadarChart data={score.role_scores || score.dimensions || {}} />;
  }
  
  if (testKey.includes('hexaco')) {
    return <HexacoRadarChart data={score.dimensions || {}} />;
  }
  
  if (testKey.includes('sjt') || testKey.includes('situational judgment')) {
    return <SJTRadarChart data={score.dimensions || {}} />;
  }
  
  // Default chart pentru alte teste
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vizualizarea Rezultatelor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center">
          <p className="text-muted-foreground">
            Graficul nu este disponibil pentru acest tip de test.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
