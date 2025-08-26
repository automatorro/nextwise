
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
}

export const RoleResultLayout: React.FC<RoleResultLayoutProps> = ({ score, testName }) => {
  const { roles } = score;

  return (
    <div className="space-y-6">
      <OverallScoreCard
        score={{
          overall: score.overall,
          raw_score: score.raw_score,
          max_score: score.max_score,
          interpretation: score.interpretation
        }}
      />

      {roles && (roles.primary?.length > 0 || roles.secondary?.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Rolurile Tale în Echipă</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {roles.primary?.length > 0 && (
              <div>
                <h3 className="font-semibold">Roluri Primare</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {roles.primary.map((role) => <li key={role}>{role}</li>)}
                </ul>
              </div>
            )}
            {roles.secondary?.length > 0 && (
              <div>
                <h3 className="font-semibold">Roluri Secundare</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {roles.secondary.map((role) => <li key={role}>{role}</li>)}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <TestExplanations score={score} testName={testName} />
    </div>
  );
};
