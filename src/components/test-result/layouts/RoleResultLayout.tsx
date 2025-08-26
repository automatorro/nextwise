import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import BelbinRadarChart from '@/components/charts/BelbinRadarChart';
import { useLanguage } from '@/hooks/useLanguage';

interface RoleResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
}

export const RoleResultLayout: React.FC<RoleResultLayoutProps> = ({ score, testName }) => {
  const { roles, dimensions } = score;
  const { t } = useLanguage();

  // Create role scores object for radar chart (for Belbin)
  const roleScores = dimensions?.reduce((acc, dim) => {
    acc[dim.id] = dim.score;
    return acc;
  }, {} as { [key: string]: number }) || {};

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

      {/* Radar Chart for Belbin */}
      {testName === 'Roluri în Echipă Belbin' && Object.keys(roleScores).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('tests.belbin.roleDistribution')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BelbinRadarChart roleScores={roleScores} />
          </CardContent>
        </Card>
      )}

      {/* Primary and Secondary Roles */}
      {roles && (roles.primary?.length > 0 || roles.secondary?.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>{t('tests.belbin.teamRoles')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {roles.primary?.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">{t('tests.belbin.primaryRoles')}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {roles.primary.map((role) => (
                    <li key={role} className="text-muted-foreground">{role}</li>
                  ))}
                </ul>
              </div>
            )}
            {roles.secondary?.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">{t('tests.belbin.secondaryRoles')}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {roles.secondary.map((role) => (
                    <li key={role} className="text-muted-foreground">{role}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Role Scores */}
      {dimensions && dimensions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('tests.belbin.allRoleScores')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dimensions
              .sort((a, b) => b.score - a.score)
              .map((dimension) => (
                <div key={dimension.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{dimension.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {dimension.score}/{score.max_score || 18}
                    </span>
                  </div>
                  <Progress 
                    value={dimension.percentage} 
                    className="h-2"
                  />
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      <TestExplanations score={score} testName={testName} />
    </div>
  );
};