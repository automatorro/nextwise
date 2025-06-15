
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDimensionLabel } from '@/utils/testResultHelpers';

interface DetailedInterpretationsProps {
  interpretations: {
    openness?: string;
    conscientiousness?: string;
    extraversion?: string;
    agreeableness?: string;
    neuroticism?: string;
  };
}

const DetailedInterpretations = ({ interpretations }: DetailedInterpretationsProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Interpretări Detaliate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(interpretations).map(([dimension, interpretation]) => (
            <div key={dimension} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                {getDimensionLabel(dimension)}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {interpretation}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedInterpretations;
