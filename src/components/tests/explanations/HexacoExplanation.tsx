
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HexacoExplanationProps {
  score?: any;
  language?: string;
}

export const HexacoExplanation: React.FC<HexacoExplanationProps> = ({ score }) => {
  const { t, language } = useTranslation();

  const dimensions = [
    { key: 'H', color: 'text-blue-600' },
    { key: 'E', color: 'text-purple-600' },
    { key: 'X', color: 'text-green-600' },
    { key: 'A', color: 'text-orange-600' },
    { key: 'C', color: 'text-red-600' },
    { key: 'O', color: 'text-indigo-600' }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {t('tests.hexaco.explanation.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">
            {t('tests.hexaco.explanation.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dimensions.map(({ key, color }) => (
              <div key={key} className="space-y-2">
                <h4 className={`font-semibold ${color}`}>
                  {t(`tests.hexaco.explanation.dimensions.${key}.name`)}
                </h4>
                <p className="text-sm text-gray-600">
                  {t(`tests.hexaco.explanation.dimensions.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HexacoExplanation;
