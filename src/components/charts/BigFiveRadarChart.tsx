
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface BigFiveRadarChartProps {
  dimensions: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}

const BigFiveRadarChart = ({ dimensions }: BigFiveRadarChartProps) => {
  const chartData = [
    {
      dimension: 'Deschidere',
      value: dimensions.openness,
      fullMark: 100,
    },
    {
      dimension: 'Conștiinciozitate',
      value: dimensions.conscientiousness,
      fullMark: 100,
    },
    {
      dimension: 'Extraversiune',
      value: dimensions.extraversion,
      fullMark: 100,
    },
    {
      dimension: 'Amabilitate',
      value: dimensions.agreeableness,
      fullMark: 100,
    },
    {
      dimension: 'Nevrotism',
      value: dimensions.neuroticism,
      fullMark: 100,
    },
  ];

  const chartConfig = {
    value: {
      label: 'Scor (%)',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <div className="w-full">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[400px]">
        <RadarChart data={chartData}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="dimension" 
            className="text-xs"
            tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            className="text-xs"
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          <Radar
            name="Scor"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  );
};

export default BigFiveRadarChart;
