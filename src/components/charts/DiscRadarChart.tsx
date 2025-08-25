import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

interface DiscRadarChartProps {
  dimensions?: { id: string; name: string; score: number; }[] | { [key: string]: number };
  testName?: string;
}

export const DiscRadarChart: React.FC<DiscRadarChartProps> = ({ dimensions, testName }) => {
  const { t } = useLanguage();

  if (!dimensions || Object.keys(dimensions).length === 0) {
    return null;
  }

  // Transform dimensions data for radar chart
  const chartData = Array.isArray(dimensions) 
    ? dimensions.map(dim => ({
        dimension: t(`tests.disc.explanation.profiles.${dim.id}.name`),
        score: Math.round(dim.score),
        fullMark: 100
      }))
    : Object.entries(dimensions).map(([key, value]) => ({
        dimension: t(`tests.disc.explanation.profiles.${key}.name`),
        score: Math.round(value),
        fullMark: 100
      }));

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-center">
          {t('tests.disc.explanation.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="dimension" 
                className="text-sm font-medium"
                tick={{ fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="DISC Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {t('tests.disc.explanation.description')}
        </div>
      </CardContent>
    </Card>
  );
};