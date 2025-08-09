
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
  
  // Defensive checks - don't render if no meaningful dimensions
  if (!dimensions || typeof dimensions !== 'object') {
    return null;
  }

  const validDimensions = Object.entries(dimensions).filter(([_, value]) => 
    typeof value === 'number' && value > 0
  );

  if (validDimensions.length === 0) {
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
  const isCattellTest = testName.includes('Cattell') || testName.includes('16PF');

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Dimension Analysis' : 'Analiza pe Dimensiuni'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {validDimensions.map(([key, value]) => {
            // Ensure value is a valid number
            const safeValue = typeof value === 'number' ? Math.max(0, value) : 0;
            
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">
                    {isEnneagramTest ? getEnneagramTypeName(key) : getDimensionLabel(testName, key)}
                  </h3>
                  <span className={`font-bold ${getScoreColor(safeValue)}`}>
                    {isEnneagramTest 
                      ? `${safeValue} ${language === 'en' ? 'pts' : 'pct'}` 
                      : isCattellTest
                        ? `${safeValue}/10`
                        : `${safeValue}%`
                    }
                  </span>
                </div>
                <Progress 
                  value={
                    isEnneagramTest 
                      ? Math.min(100, (safeValue / 20) * 100) 
                      : isCattellTest
                        ? (safeValue / 10) * 100
                        : safeValue
                  } 
                  className="w-full" 
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionsAnalysis;
