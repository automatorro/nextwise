
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SJTRadarChart } from '../charts/SJTRadarChart';

interface SJTResultsProps {
  score: {
    overall: number;
    dimensions: Record<string, number>;
    interpretation: string;
    detailed_interpretations?: Record<string, string>;
    recommendations?: string[];
    dominant_profile?: string;
    secondary_profile?: string;
  };
}

export const SJTResults: React.FC<SJTResultsProps> = ({ score }) => {
  // Defensive checks
  if (!score || typeof score !== 'object') {
    return null;
  }

  const getScoreLevel = (value: number) => {
    if (value >= 75) return { level: 'Foarte ridicat', variant: 'default' as const };
    if (value >= 60) return { level: 'Ridicat', variant: 'secondary' as const };
    if (value >= 40) return { level: 'Mediu', variant: 'outline' as const };
    return { level: 'Scăzut', variant: 'destructive' as const };
  };

  const getProfileLabel = (profile: string) => {
    const labels: Record<string, string> = {
      'Leader': 'Lider',
      'Specialist_Analitic': 'Specialist Analitic',
      'Creativ': 'Creativ',
      'Suport_Servicii': 'Suport/Servicii',
      'Antreprenor': 'Antreprenor',
      'Vanzari': 'Vânzări'
    };
    return labels[profile] || profile;
  };

  // Validate dimensions
  const validDimensions = score.dimensions && typeof score.dimensions === 'object' 
    ? Object.entries(score.dimensions).filter(([_, value]) => typeof value === 'number' && value >= 0)
    : [];

  const safeInterpretation = score.interpretation || 'Interpretare indisponibilă';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rezultat Test SJT - Orientare în Carieră</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {score.dominant_profile && (
              <div className="text-2xl font-bold text-blue-600">
                {getProfileLabel(score.dominant_profile)}
              </div>
            )}
            <p className="text-gray-700">{safeInterpretation}</p>
            
            {score.dominant_profile && score.secondary_profile && (
              <div className="flex justify-center gap-2 mt-4">
                <Badge variant="default">
                  Profil dominant: {getProfileLabel(score.dominant_profile)}
                </Badge>
                <Badge variant="secondary">
                  Profil secundar: {getProfileLabel(score.secondary_profile)}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {validDimensions.length > 0 && (
        <SJTRadarChart data={score.dimensions} />
      )}

      {validDimensions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analiza Profilurilor de Carieră</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {validDimensions.map(([key, value]) => {
              const scoreLevel = getScoreLevel(value);
              
              return (
                <div key={key} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{getProfileLabel(key)}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={scoreLevel.variant}>{scoreLevel.level}</Badge>
                      <span className="font-bold text-blue-600">{Math.round(value)}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-800">
                    {score.detailed_interpretations?.[key] || 'Interpretare generală pentru acest profil'}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {score.recommendations && Array.isArray(score.recommendations) && score.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recomandări de Carieră</CardTitle>
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
      )}
    </div>
  );
};
