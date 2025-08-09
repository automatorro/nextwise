
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface TestExplanationsProps {
  score: StandardizedScore | null;
  testName?: string;
}

export const TestExplanations: React.FC<TestExplanationsProps> = ({ score }) => {
  // Use defensive checks to ensure data exists before rendering
  if (!score?.dimensions || !score.detailed_interpretations) {
    return null; // Don't render anything if the necessary data is missing
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Explicații Detaliate ale Dimensiunilor</CardTitle>
        <p className="text-muted-foreground">
          Înțelege ce înseamnă fiecare dimensiune și cum te poziționezi
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {score.dimensions.map((dimension, index) => (
          <div key={dimension.id}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
              <div className="md:col-span-1">
                <h3 className="font-semibold capitalize">{dimension.name}</h3>
                <p className="text-sm text-muted-foreground">Scor: {dimension.score} / 10</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm">
                  {/* This is the key change: reading from the correct object */}
                  {score.detailed_interpretations?.[dimension.id] || 'Interpretare indisponibilă.'}
                </p>
              </div>
            </div>
            {index < score.dimensions.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
