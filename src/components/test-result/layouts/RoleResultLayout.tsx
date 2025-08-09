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

interface RoleResultLayoutProps {
  score: StandardizedScore;
  testName: string;
  completedAt: string;
  resultId: string;
}

const RoleResultLayout = ({ score, testName, completedAt, resultId }: RoleResultLayoutProps) => {
  const { language } = useLanguage();
  const labels = getResultLabels(language);

  return (
    <div className="space-y-8">
      {/* Header */}
      <TestResultHeader testName={testName} completedAt={completedAt} />

      {/* Test Explanations */}
      <TestExplanations testName={testName} score={score} language={language} />

      {/* Scoring Explanation */}
      <ScoringExplanation 
        testName={testName}
        overallScore={score.overall}
        scoreType="percentage"
        roleScores={score.dimensions}
      />

      {/* Belbin Role Results */}
      <BelbinRoleResults
        roleScores={score.dimensions || {}}
        primaryRoles={score.roles?.primary || []}
        secondaryRoles={score.roles?.secondary || []}
        interpretation={score.interpretation}
      />

      {/* AI Analysis Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{labels.generateAnalysis}</CardTitle>
          <p className="text-sm text-gray-600">
            {labels.analysisDescription}
          </p>
        </CardHeader>
        <CardContent>
          <DetailedAnalysisSection 
            dimensions={score.dimensions || {}} 
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

      {/* Actions */}
      <TestResultActions />
    </div>
  );
};

export default RoleResultLayout;
