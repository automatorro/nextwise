
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { sanitizeChartData } from '@/utils/security';

interface SecureRadarChartProps {
  data: any[];
  dataKey: string;
  fill?: string;
  stroke?: string;
  title?: string;
}

export const SecureRadarChart = ({ 
  data, 
  dataKey, 
  fill = '#8884d8', 
  stroke = '#8884d8',
  title 
}: SecureRadarChartProps) => {
  // Sanitize chart data to prevent XSS
  const sanitizedData = sanitizeChartData(data);
  
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold text-center">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={sanitizedData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
          />
          <Radar
            name={dataKey}
            dataKey={dataKey}
            stroke={stroke}
            fill={fill}
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
