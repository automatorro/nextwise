
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDimensionExplanation } from '@/utils/scoring/testExplanations';
import { getScoreBadgeVariant } from '@/utils/scoring/scoreVariants';

interface DimensionExplanationsProps {
  testName: string;
  dimensions: { [key: string]: number };
}

const DimensionExplanations = ({ testName, dimensions }: DimensionExplanationsProps) => {
  const getDimensionLabel = (key: string): string => {
    const labels: { [key: string]: string } = {
      // Big Five
      openness: 'Deschidere către Experiență',
      conscientiousness: 'Conștiinciozitate',
      extraversion: 'Extraversiune',
      agreeableness: 'Agreabilitate',
      neuroticism: 'Nevrotism',
      
      // SJT Career dimensions
      leadership: 'Leadership',
      communication: 'Comunicare',
      teamwork: 'Lucru în echipă',
      problem_solving: 'Rezolvarea problemelor',
      adaptability: 'Adaptabilitate',
      decision_making: 'Luarea deciziilor',
      stress_management: 'Gestionarea stresului',
      customer_service: 'Servicii pentru clienți',
      ethics: 'Etică',
      innovation: 'Inovație',
      time_management: 'Gestionarea timpului',
      conflict_resolution: 'Rezolvarea conflictelor',
      
      // Cognitive abilities
      logical_reasoning: 'Raționament Logic',
      numerical_reasoning: 'Raționament Numeric',
      verbal_reasoning: 'Raționament Verbal',
      spatial_reasoning: 'Raționament Spațial',
      abstract_reasoning: 'Raționament Abstract',
      
      // Emotional Intelligence
      self_awareness: 'Autocunoaștere',
      self_regulation: 'Autoreglementare',
      motivation: 'Motivație',
      empathy: 'Empatie',
      social_skills: 'Abilități Sociale'
    };
    
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
  };

  const validDimensions = Object.entries(dimensions).filter(([_, value]) => 
    typeof value === 'number' && value > 0
  );

  if (validDimensions.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Explicații Detaliate ale Dimensiunilor</CardTitle>
        <p className="text-sm text-gray-600">
          Înțelege ce înseamnă fiecare dimensiune și cum te poziționezi
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {validDimensions.map(([key, value]) => (
            <div key={key} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{getDimensionLabel(key)}</h4>
                <div className="flex items-center gap-2">
                  <Badge variant={getScoreBadgeVariant(value, testName)}>
                    {Math.round(value)}%
                  </Badge>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {getDimensionExplanation(testName, key)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionExplanations;
