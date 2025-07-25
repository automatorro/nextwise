
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface BelbinRadarChartProps {
  roleScores: { [key: string]: number };
}

const BelbinRadarChart = ({ roleScores }: BelbinRadarChartProps) => {
  const roleLabels: { [key: string]: string } = {
    plant: 'Plant',
    resource_investigator: 'RI',
    coordinator: 'CO',
    shaper: 'SH',
    monitor_evaluator: 'ME',
    teamworker: 'TW',
    implementer: 'IMP',
    completer_finisher: 'CF',
    specialist: 'SP'
  };

  const chartData = Object.entries(roleScores).map(([role, score]) => ({
    role: roleLabels[role] || role,
    score: score,
    fullMark: 18
  }));

  const chartConfig = {
    score: {
      label: 'Puncte',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <div className="w-full">
      <ChartContainer 
        id="belbin-radar-chart" 
        config={chartConfig} 
        className="mx-auto aspect-square max-h-[400px]"
      >
        <RadarChart data={chartData}>
          <ChartTooltip 
            content={<ChartTooltipContent />}
            formatter={(value, name) => [`${value} puncte`, 'Scor']}
            labelFormatter={(label) => {
              const fullNames: { [key: string]: string } = {
                'Plant': 'Plant (Creativul)',
                'RI': 'Resource Investigator',
                'CO': 'Coordinator', 
                'SH': 'Shaper',
                'ME': 'Monitor Evaluator',
                'TW': 'Teamworker',
                'IMP': 'Implementer',
                'CF': 'Completer Finisher',
                'SP': 'Specialist'
              };
              return fullNames[label] || label;
            }}
          />
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="role" 
            className="text-xs"
            tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 18]}
            className="text-xs"
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          <Radar
            name="Puncte"
            dataKey="score"
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

export default BelbinRadarChart;
