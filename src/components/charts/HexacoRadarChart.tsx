
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HexacoRadarChartProps {
  data: {
    honesty_humility: number;
    emotionality: number;
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    openness: number;
  };
}

export const HexacoRadarChart: React.FC<HexacoRadarChartProps> = ({ data }) => {
  const chartData = [
    { dimension: 'Onestitate-Umilință', value: data.honesty_humility, fullName: 'Onestitate-Umilință' },
    { dimension: 'Emotivitate', value: data.emotionality, fullName: 'Emotivitate' },
    { dimension: 'Extraversiune', value: data.extraversion, fullName: 'Extraversiune' },
    { dimension: 'Agreabilitate', value: data.agreeableness, fullName: 'Agreabilitate' },
    { dimension: 'Conștiinciozitate', value: data.conscientiousness, fullName: 'Conștiinciozitate' },
    { dimension: 'Deschidere', value: data.openness, fullName: 'Deschidere către Experiență' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profilul HEXACO</CardTitle>
        <CardDescription>
          Vizualizarea celor 6 dimensiuni ale personalității tale
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="dimension" 
                tick={{ fontSize: 12 }}
                className="text-sm"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="Scorul tău"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          {chartData.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{item.fullName}</span>
              <span className="text-blue-600 font-bold">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
