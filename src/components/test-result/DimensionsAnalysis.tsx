import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StandardizedScore } from '@/types/tests';
import { useLanguage } from '@/hooks/useLanguage';

interface DimensionsAnalysisProps {
  // Am schimbat 'score' în 'dimensions' pentru claritate
  dimensions?: { id: string; name: string; score: number }[]; 
}

export const DimensionsAnalysis: React.FC<DimensionsAnalysisProps> = ({ dimensions }) => {
  const { t } = useLanguage();
  
  // Verificare robustă a datelor
  if (!dimensions || dimensions.length === 0) {
    return null; 
  }

  // Transformăm datele din formatul nostru în formatul cerut de librăria de grafice
  const chartData = dimensions.map(dim => ({
    subject: t(`bigFive.dimensions.${dim.id}.title`) || dim.name.charAt(0).toUpperCase() + dim.name.slice(1),
    score: dim.score,
    fullMark: 10, // Scorul este pe o scală de la 1 la 10
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('bigFive.chartTitle')}</CardTitle> 
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar name={t('bigFive.yourScore')} dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};