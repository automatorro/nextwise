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

  // Determinăm tipul de test bazat pe ID-urile dimensiunilor
  const isDigitalCompetencies = dimensions.some(dim => 
    ['alfabetizare_digitala', 'comunicare_digitala', 'creare_continut', 'siguranta_digitala', 'rezolvare_probleme'].includes(dim.id)
  );

  // Transformăm datele din formatul nostru în formatul cerut de librăria de grafice
  const chartData = dimensions.map(dim => ({
    subject: isDigitalCompetencies 
      ? t(`testResult.digitalCompetencies.dimensions.${dim.id}.title`) 
      : t(`testResult.bigFive.dimensions.${dim.id}.title`) || dim.name,
    score: dim.score,
    fullMark: 10, // Scorul este pe scară 0-10
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isDigitalCompetencies 
            ? t('testResult.digitalCompetencies.chartTitle')
            : t('bigFive.chartTitle')}
        </CardTitle> 
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar 
              name={isDigitalCompetencies ? t('testResult.digitalCompetencies.yourScore') : t('bigFive.yourScore')} 
              dataKey="score" 
              stroke="#8884d8" 
              fill="#8884d8" 
              fillOpacity={0.6} 
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};