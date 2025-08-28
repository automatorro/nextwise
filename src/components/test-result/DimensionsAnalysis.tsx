
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StandardizedScore } from '@/types/tests';
import { useLanguage } from '@/hooks/useLanguage';
import { DigitalCompetenciesRadarChart } from '@/components/charts/DigitalCompetenciesRadarChart';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

interface DimensionsAnalysisProps {
  dimensions?: { id: string; name: string; score: number }[]; 
  testName?: string;
}

export const DimensionsAnalysis: React.FC<DimensionsAnalysisProps> = ({ dimensions, testName }) => {
  const { t } = useLanguage();
  
  // Verificare robustă a datelor
  if (!dimensions || dimensions.length === 0) {
    return null; 
  }

  // Verificăm dacă este testul de competențe digitale
  const isDigitalCompetenciesTest = testName?.toLowerCase().includes('competențe digitale') || 
                                   testName?.toLowerCase().includes('digital competencies');

  // Pentru testul de competențe digitale, folosim componenta dedicată
  if (isDigitalCompetenciesTest) {
    return <DigitalCompetenciesRadarChart dimensions={dimensions} />;
  }

  // Pentru testul Big Five, folosim logica originală
  const chartData = dimensions.map(dim => ({
    subject: t(`bigFive.dimensions.${dim.id}.title`) || dim.name.charAt(0).toUpperCase() + dim.name.slice(1),
    score: dim.score,
    fullMark: 10, // Scorul este pe o scală de la 1 la 10 pentru Big Five
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('bigFive.chartTitle') || 'Profilul de Personalitate'}</CardTitle> 
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar name={t('bigFive.yourScore') || 'Scorul Tău'} dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
