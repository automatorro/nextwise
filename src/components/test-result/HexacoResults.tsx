
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HexacoRadarChart } from '../charts/HexacoRadarChart';
import { hexacoExplanations } from '@/utils/testSpecificExplanations/hexacoExplanations';

interface HexacoResultsProps {
  score: {
    overall: number;
    dimensions: {
      honesty_humility: number;
      emotionality: number;
      extraversion: number;
      agreeableness: number;
      conscientiousness: number;
      openness: number;
    };
    interpretation: string;
    detailed_interpretations: Record<string, string>;
    recommendations: string[];
  };
}

export const HexacoResults: React.FC<HexacoResultsProps> = ({ score }) => {
  const getScoreLevel = (value: number) => {
    if (value >= 75) return { level: 'Ridicat', variant: 'default' as const };
    if (value >= 50) return { level: 'Mediu-ridicat', variant: 'outline' as const };
    if (value >= 25) return { level: 'Mediu-scăzut', variant: 'outline' as const };
    return { level: 'Scăzut', variant: 'secondary' as const };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rezultat General HEXACO</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-600">{score.overall}%</div>
            <p className="text-gray-700">{score.interpretation}</p>
          </div>
        </CardContent>
      </Card>

      <HexacoRadarChart data={score.dimensions} />

      <Card>
        <CardHeader>
          <CardTitle>Analiza Dimensiunilor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(score.dimensions).map(([key, value]) => {
            const explanation = hexacoExplanations.dimensions[key as keyof typeof hexacoExplanations.dimensions];
            const scoreLevel = getScoreLevel(value);
            
            return (
              <div key={key} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{explanation.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={scoreLevel.variant}>{scoreLevel.level}</Badge>
                    <span className="font-bold text-blue-600">{value}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{explanation.description}</p>
                <p className="text-sm text-gray-800">
                  {score.detailed_interpretations[key]}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recomandări de Dezvoltare</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {score.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
