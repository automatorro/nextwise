
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import TestResultHeader from '../TestResultHeader';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { ScoringExplanation } from '../ScoringExplanation';
import BelbinRoleResults from '../BelbinRoleResults';
import DetailedAnalysisSection from '../DetailedAnalysisSection';
import TestResultActions from '../TestResultActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { getResultLabels } from '@/utils/testResultTranslations';
import { dimensionsToObject } from '@/utils/dimensionsConverter';

interface RoleResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
  completedAt?: string;
  resultId?: string;
}

export const RoleResultLayout = ({ score, testName, completedAt, resultId }: RoleResultLayoutProps) => {
  const { language } = useLanguage();
  const labels = getResultLabels(language);

  // Convert dimensions array to object format for components that expect it
  const dimensionsAsObject = dimensionsToObject(score.dimensions);

  return (
    <div className="space-y-8">
      {/* Header */}
      {testName && completedAt && (
        <TestResultHeader testName={testName} completedAt={completedAt} />
      )}

      {/* Test Explanations */}
      {testName && (
        <TestExplanations testName={testName} score={score} language={language} />
      )}

      {/* Scoring Explanation */}
      {testName && (
        <ScoringExplanation 
          testName={testName}
          overallScore={score.overall}
          scoreType="percentage"
          roleScores={dimensionsAsObject}
        />
      )}

      {/* Belbin Role Results */}
      <BelbinRoleResults
        roleScores={dimensionsAsObject}
        primaryRoles={score.roles?.primary || []}
        secondaryRoles={score.roles?.secondary || []}
        interpretation={score.interpretation}
      />

      {/* AI Analysis Section */}
      {resultId && testName && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{labels.generateAnalysis}</CardTitle>
            <p className="text-sm text-gray-600">
              {labels.analysisDescription}
            </p>
          </CardHeader>
          <CardContent>
            <DetailedAnalysisSection 
              dimensions={dimensionsAsObject} 
              resultId={resultId}
              testType={testName}
              score={{
                overall: score.overall,
                raw_score: score.raw_score,
                max_score: score.max_score,
                interpretation: score.interpretation
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <TestResultActions />
    </div>
  );
};
