
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';

interface DigitalCompetenciesRadarChartProps {
  dimensions: {
    id: string;
    name: string;
    score: number;
  }[];
}

export const DigitalCompetenciesRadarChart: React.FC<DigitalCompetenciesRadarChartProps> = ({ dimensions }) => {
  const { t } = useLanguage();

  // Maparea dimensiunilor la traduceri corecte
  const dimensionLabels: Record<string, string> = {
    alfabetizare_digitala: t('digitalCompetencies.dimensions.alfabetizare_digitala.title') || 'Alfabetizare Digitală',
    comunicare_digitala: t('digitalCompetencies.dimensions.comunicare_digitala.title') || 'Comunicare Digitală',
    creare_continut: t('digitalCompetencies.dimensions.creare_continut.title') || 'Creare Conținut',
    siguranta_digitala: t('digitalCompetencies.dimensions.siguranta_digitala.title') || 'Siguranță Digitală',
    rezolvare_probleme: t('digitalCompetencies.dimensions.rezolvare_probleme.title') || 'Rezolvare Probleme'
  };

  // Transformăm datele pentru grafic - folosim scorul direct (care este deja în procente)
  const chartData = dimensions.map(dim => ({
    subject: dimensionLabels[dim.id] || dim.name,
    score: dim.score, // Scorul este deja în procente (0-100)
    fullMark: 100
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('digitalCompetencies.chartTitle') || 'Competențe Digitale & Analitice'}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Radar 
              name={t('digitalCompetencies.yourScore') || 'Scorul Tău'} 
              dataKey="score" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
