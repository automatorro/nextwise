
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getDimensionLabel } from '@/utils/testLabels';
import { getScoreColor } from '@/utils/testScoring';
import { useLanguage } from '@/hooks/useLanguage';

interface DimensionsAnalysisProps {
  dimensions: { [key: string]: number };
  testName?: string;
}

const DimensionsAnalysis = ({ dimensions, testName = '' }: DimensionsAnalysisProps) => {
  const { language } = useLanguage();
  
  if (!dimensions || Object.keys(dimensions).length === 0) {
    return null;
  }

  // Get proper type names for Enneagram
  const getEnneagramTypeName = (key: string) => {
    const typeNames = {
      type1: language === 'en' ? 'The Reformer' : 'Reformatorul',
      type2: language === 'en' ? 'The Helper' : 'Ajutătorul',
      type3: language === 'en' ? 'The Achiever' : 'Realizatorul',
      type4: language === 'en' ? 'The Individualist' : 'Individualistul',
      type5: language === 'en' ? 'The Investigator' : 'Investigatorul',
      type6: language === 'en' ? 'The Loyalist' : 'Loyalul',
      type7: language === 'en' ? 'The Enthusiast' : 'Entuziastul',
      type8: language === 'en' ? 'The Challenger' : 'Provocatorul',
      type9: language === 'en' ? 'The Peacemaker' : 'Mediatorul'
    };
    return typeNames[key as keyof typeof typeNames] || key;
  };

  const isEnneagramTest = testName.includes('Enneagram');

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Dimension Analysis' : 'Analiza pe Dimensiuni'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(dimensions).map(([key, value]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">
                  {isEnneagramTest ? getEnneagramTypeName(key) : getDimensionLabel(testName, key)}
                </h3>
                <span className={`font-bold ${getScoreColor(value)}`}>
                  {isEnneagramTest ? `${value} ${language === 'en' ? 'pts' : 'pct'}` : `${value}%`}
                </span>
              </div>
              <Progress 
                value={isEnneagramTest ? Math.min(100, (value / 20) * 100) : value} 
                className="w-full" 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionsAnalysis;
