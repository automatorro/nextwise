import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StandardizedScore } from '@/types/tests';
import { getPersonalizedInterpretation } from '@/utils/personalization/ScoreInterpreter';
import { useLanguage } from '@/hooks/useLanguage';

interface PersonalizedResultsCardProps {
  score: StandardizedScore;
  testName?: string;
}

export const PersonalizedResultsCard: React.FC<PersonalizedResultsCardProps> = ({ 
  score, 
  testName 
}) => {
  const { t } = useLanguage();
  const personalizedData = getPersonalizedInterpretation(testName || '', score);

  if (!personalizedData) {
    return null;
  }

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('personalizedResults.title')}
          <Badge variant={personalizedData.severityVariant}>
            {personalizedData.severityLabel}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm mb-2">{t('personalizedResults.personalizedInterpretation')}</h4>
          <p className="text-sm text-muted-foreground">
            {personalizedData.personalizedMessage}
          </p>
        </div>

        {personalizedData.contextualFactors && (
          <div>
            <h4 className="font-semibold text-sm mb-2">{t('personalizedResults.contextualFactors')}</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {personalizedData.contextualFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">{t('personalizedResults.bullet')}</span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}

        {personalizedData.normalityContext && (
          <div className="p-3 bg-muted/50 rounded-md">
            <p className="text-sm">
              <span className="font-medium">{t('personalizedResults.context')}</span> {personalizedData.normalityContext}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};