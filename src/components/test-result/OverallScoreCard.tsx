import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StandardizedScore } from '@/types/tests'; // Folosim noul nostru contract standardizat

// Definim proprietățile pe care le acceptă ACUM componenta
interface OverallScoreCardProps {
  score: Partial<StandardizedScore>; // Facem 'score' parțial pentru a fi flexibil
  testName?: string;
}

export const OverallScoreCard: React.FC<OverallScoreCardProps> = ({ score, testName }) => {
  // Verificări de siguranță pentru fiecare valoare, cu valori de rezervă
  const overallPercentage = score.overall ?? 0;
  const rawScore = score.raw_score ?? 0;
  const maxScore = score.max_score ?? 0;
  const interpretation = score.interpretation ?? 'Interpretarea nu este disponibilă.';

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Rezultatul Testului: {testName || 'Test Incomplet'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Scorul Total</h3>
          <p className="text-4xl font-bold text-primary">{overallPercentage}%</p>
          <p className="text-sm text-muted-foreground">{interpretation}</p>
        </div>
        <div>
          <p className="text-sm">
            <span className="font-semibold">Puncte Obținute:</span> {rawScore}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Puncte Maxime:</span> {maxScore}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallScoreCard;