
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Users, Lightbulb, Heart, Zap } from 'lucide-react';

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
  const getDimensionInfo = (dimension: string, score: number) => {
    const dimensionData = {
      openness: {
        title: 'Deschidere către Experiență',
        icon: Lightbulb,
        description: 'Măsoară curiozitatea, creativitatea și deschiderea către idei noi',
        highTrait: 'Creativ, curios, aventuros',
        lowTrait: 'Practic, convențional, pragmatic'
      },
      conscientiousness: {
        title: 'Conștiinciozitate',
        icon: Brain,
        description: 'Reflectă organizarea, disciplina și responsabilitatea',
        highTrait: 'Organizat, disciplinat, responsabil',
        lowTrait: 'Spontan, flexibil, relaxat'
      },
      extraversion: {
        title: 'Extraversiune',
        icon: Users,
        description: 'Indică nivelul de sociabilitate și energie în interacțiunile sociale',
        highTrait: 'Sociabil, energic, vorbăreț',
        lowTrait: 'Rezervat, introspectiv, liniștit'
      },
      agreeableness: {
        title: 'Amabilitate',
        icon: Heart,
        description: 'Măsoară empatia, cooperarea și încrederea în alții',
        highTrait: 'Empatic, cooperant, de încredere',
        lowTrait: 'Analitic, independent, direct'
      },
      neuroticism: {
        title: 'Nevrotism',
        icon: Zap,
        description: 'Reflectă stabilitatea emoțională și gestionarea stresului',
        highTrait: 'Sensibil, reactiv, emoțional',
        lowTrait: 'Calm, stabil, rezistent la stres'
      }
    };

    return dimensionData[dimension as keyof typeof dimensionData];
  };

  const getScoreInterpretation = (score: number) => {
    if (score >= 70) return { level: 'Ridicat', variant: 'default' as const };
    if (score >= 30) return { level: 'Moderat', variant: 'secondary' as const };
    return { level: 'Scăzut', variant: 'outline' as const };
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Explicații pentru Dimensiunile Big Five
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
                  <span className="font-medium text-green-700">Scor ridicat: </span>
                  <span className="text-gray-600">{info.highTrait}</span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Scor scăzut: </span>
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
