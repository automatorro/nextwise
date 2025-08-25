
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Users, Lightbulb, Heart, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface BigFiveExplanationsProps {
  dimensions: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}

const BigFiveExplanations = ({ dimensions }: BigFiveExplanationsProps) => {
  const { t } = useLanguage();
  
  const getDimensionInfo = (dimension: string, score: number) => {
    const dimensionData = {
      openness: {
        title: t('bigFive.dimensions.openness.title'),
        icon: Lightbulb,
        description: t('bigFive.dimensions.openness.description'),
        highTrait: t('bigFive.dimensions.openness.high'),
        lowTrait: t('bigFive.dimensions.openness.low')
      },
      conscientiousness: {
        title: t('bigFive.dimensions.conscientiousness.title'),
        icon: Brain,
        description: t('bigFive.dimensions.conscientiousness.description'),
        highTrait: t('bigFive.dimensions.conscientiousness.high'),
        lowTrait: t('bigFive.dimensions.conscientiousness.low')
      },
      extraversion: {
        title: t('bigFive.dimensions.extraversion.title'),
        icon: Users,
        description: t('bigFive.dimensions.extraversion.description'),
        highTrait: t('bigFive.dimensions.extraversion.high'),
        lowTrait: t('bigFive.dimensions.extraversion.low')
      },
      agreeableness: {
        title: t('bigFive.dimensions.agreeableness.title'),
        icon: Heart,
        description: t('bigFive.dimensions.agreeableness.description'),
        highTrait: t('bigFive.dimensions.agreeableness.high'),
        lowTrait: t('bigFive.dimensions.agreeableness.low')
      },
      neuroticism: {
        title: t('bigFive.dimensions.neuroticism.title'),
        icon: Zap,
        description: t('bigFive.dimensions.neuroticism.description'),
        highTrait: t('bigFive.dimensions.neuroticism.high'),
        lowTrait: t('bigFive.dimensions.neuroticism.low')
      }
    };

    return dimensionData[dimension as keyof typeof dimensionData];
  };

  const getScoreInterpretation = (score: number) => {
    if (score >= 70) return { level: t('testResult.interpretation.high'), variant: 'default' as const };
    if (score >= 30) return { level: t('testResult.interpretation.moderate'), variant: 'secondary' as const };
    return { level: t('testResult.interpretation.low'), variant: 'outline' as const };
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('bigFive.explanationsTitle')}
      </h3>
      
      {Object.entries(dimensions).map(([key, score]) => {
        const info = getDimensionInfo(key, score);
        const interpretation = getScoreInterpretation(score);
        const IconComponent = info.icon;
        
        return (
          <Card key={key} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-blue-600" />
                  {info.title}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={interpretation.variant}>
                    {interpretation.level}
                  </Badge>
                  <span className="text-sm font-semibold">{score}%</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-2">{info.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-medium text-green-700">{t('testResult.interpretation.highScore')}: </span>
                  <span className="text-gray-600">{info.highTrait}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">{t('testResult.interpretation.lowScore')}: </span>
                  <span className="text-gray-600">{info.lowTrait}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BigFiveExplanations;
