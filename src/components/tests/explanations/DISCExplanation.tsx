
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DISCExplanationProps {
  score?: any;
}

const DISCExplanation: React.FC<DISCExplanationProps> = ({ score }) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('tests.disc.explanation.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {t('tests.disc.explanation.description')}
          </p>
          
          <div className="space-y-3">
            <h4 className="font-semibold">{t('tests.disc.explanation.whatItMeans')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('tests.disc.explanation.interpretation.general')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {['D', 'I', 'S', 'C'].map((profile) => (
              <div key={profile} className="p-4 border rounded-lg">
                <h5 className="font-semibold text-sm mb-2">
                  {t(`tests.disc.explanation.profiles.${profile}.name`)}
                </h5>
                <p className="text-xs text-muted-foreground">
                  {t(`tests.disc.explanation.profiles.${profile}.description`)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DISCExplanation;
