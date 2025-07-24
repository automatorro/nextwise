
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer 
} from 'recharts';

interface SJTRadarChartProps {
  data: Record<string, number>;
}

export const SJTRadarChart: React.FC<SJTRadarChartProps> = ({ data }) => {
  const profileLabels: Record<string, string> = {
    'Leader': 'Lider',
    'Specialist_Analitic': 'Specialist Analitic',
    'Creativ': 'Creativ',
    'Suport_Servicii': 'Suport/Servicii',
    'Antreprenor': 'Antreprenor',
    'Vanzari': 'Vânzări'
  };

  const chartData = Object.entries(data).map(([key, value]) => ({
    dimension: profileLabels[key] || key,
    value: value,
    fullMark: 100
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profilul de Carieră SJT</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar
                name="SJT"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
