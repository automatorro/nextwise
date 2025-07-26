
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SecureRadarChart } from '@/components/charts/SecureRadarChart';
import { digitalCompetenciesExplanations, getDigitalCompetenciesRecommendations } from '@/utils/testSpecificExplanations/digitalCompetenciesExplanations';
import { getDimensionLabel } from '@/utils/testLabels';

interface DigitalCompetenciesExplanationProps {
  score: {
    overall: number;
    dimensions: {
      alfabetizare_digitala?: number;
      comunicare_digitala?: number;
      creare_continut?: number;
      siguranta_digitala?: number;
      rezolvare_probleme?: number;
    };
    interpretations?: Record<string, string>;
  };
  language?: string;
}

const DigitalCompetenciesExplanation: React.FC<DigitalCompetenciesExplanationProps> = ({ 
  score, 
  language = 'ro' 
}) => {
  const dimensions = score.dimensions || {};
  const interpretations = score.interpretations || {};
  
  // Pregătim datele pentru graficul radar
  const radarData = Object.entries(dimensions).map(([key, value]) => ({
    dimension: getDimensionLabel('Competențe Digitale', key),
    value: value || 0,
    fullMark: 100
  }));

  // Determinăm nivelul general de competență
  const getCompetencyLevel = (score: number) => {
    if (score >= 86) return { level: 'Expert', variant: 'default' as const, color: 'bg-green-500' };
    if (score >= 66) return { level: 'Avansat', variant: 'secondary' as const, color: 'bg-blue-500' };
    if (score >= 41) return { level: 'Intermediar', variant: 'outline' as const, color: 'bg-yellow-500' };
    return { level: 'Începător', variant: 'destructive' as const, color: 'bg-red-500' };
  };

  const competencyLevel = getCompetencyLevel(score.overall);
  const recommendations = getDigitalCompetenciesRecommendations(dimensions);

  const labels = {
    title: 'Analiză Competențe Digitale & Analitice',
    overallLevel: 'Nivelul General de Competență',
    dimensionsTitle: 'Analiză pe Dimensiuni',
    recommendationsTitle: 'Recomandări de Dezvoltare',
    noRecommendations: 'Felicitări! Ai competențe digitale foarte bune în toate domeniile.',
    competencyLevels: {
      expert: 'Expert (86-100%): Competențe foarte avansate',
      advanced: 'Avansat (66-85%): Competențe solide',
      intermediate: 'Intermediar (41-65%): Competențe funcționale',
      beginner: 'Începător (0-40%): Necesită dezvoltare'
    }
  };

  return (
    <div className="space-y-6">
      {/* Scorul general și nivelul de competență */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {labels.overallLevel}
            <Badge variant={competencyLevel.variant} className="text-sm">
              {competencyLevel.level} - {score.overall}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>{labels.competencyLevels.expert}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>{labels.competencyLevels.advanced}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>{labels.competencyLevels.intermediate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>{labels.competencyLevels.beginner}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grafic radar pentru dimensiuni */}
      {radarData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{labels.dimensionsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <SecureRadarChart
              data={radarData}
              dataKey="value"
              fill="#3b82f6"
              stroke="#3b82f6"
            />
          </CardContent>
        </Card>
      )}

      {/* Interpretări detaliate pentru fiecare dimensiune */}
      <div className="space-y-4">
        {Object.entries(dimensions).map(([dimensionKey, dimensionScore]) => {
          const explanation = digitalCompetenciesExplanations[dimensionKey];
          const interpretation = interpretations[dimensionKey];
          const level = getCompetencyLevel(dimensionScore || 0);
          
          if (!explanation) return null;
          
          return (
            <Card key={dimensionKey}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{getDimensionLabel('Competențe Digitale', dimensionKey)}</span>
                  <Badge variant={level.variant}>
                    {level.level} - {dimensionScore}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{explanation.description}</p>
                {interpretation && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{interpretation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recomandări de dezvoltare */}
      <Card>
        <CardHeader>
          <CardTitle>{labels.recommendationsTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-700 font-medium">{labels.noRecommendations}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalCompetenciesExplanation;
