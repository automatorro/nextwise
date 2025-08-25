import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { StandardizedScore } from '@/types/tests';
import { getLifeImpactExplanation, LifeImpactData } from '@/utils/personalization/LifeImpactAnalyzer';
import { useLanguage } from '@/hooks/useLanguage';

interface LifeImpactExplanationProps {
  score: StandardizedScore;
  testName?: string;
}

export const LifeImpactExplanation: React.FC<LifeImpactExplanationProps> = ({ 
  score, 
  testName 
}) => {
  const { t } = useLanguage();
  const [impactData, setImpactData] = useState<LifeImpactData | null>(null);

  useEffect(() => {
    const loadImpactData = async () => {
      const data = await getLifeImpactExplanation(testName || '', score);
      setImpactData(data);
    };
    loadImpactData();
  }, [testName, score]);

  if (!impactData) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('lifeImpact.title')}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {t('lifeImpact.subtitle')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {impactData.areas.map((area, index) => (
          <div key={area.name}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
              <div className="md:col-span-1">
                <h4 className="font-semibold text-sm capitalize">{area.name}</h4>
              </div>
              <div className="md:col-span-3">
                <p className="text-sm text-muted-foreground">{area.impact}</p>
                {area.examples && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-muted-foreground">Exemple:</p>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      {area.examples.map((example, exIndex) => (
                        <li key={exIndex} className="flex items-start gap-1">
                          <span className="text-primary">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {index < impactData.areas.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}

        {impactData.overallImpact && (
          <div className="p-3 bg-muted/50 rounded-md">
            <p className="text-sm">
              <span className="font-medium">Impact general:</span> {impactData.overallImpact}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};