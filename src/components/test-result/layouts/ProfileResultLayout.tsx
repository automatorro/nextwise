import React from 'react';
import { StandardizedScore } from '@/types/tests';
import TestResultHeader from '../TestResultHeader';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { ScoringExplanation } from '../ScoringExplanation';
import { SJTResults } from '../SJTResults';
import DetailedAnalysisSection from '../DetailedAnalysisSection';
import TestResultActions from '../TestResultActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { getResultLabels } from '@/utils/testResultTranslations';

interface ProfileResultLayoutProps {
  score: StandardizedScore;
  testName: string;
  completedAt: string;
  resultId: string;
}

const ProfileResultLayout = ({ score, testName, completedAt, resultId }: ProfileResultLayoutProps) => {
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
        dimensions={score.dimensions}
      />

      {/* SJT Results - specialized for profile-based tests */}
      <SJTResults
        score={{
          overall: score.overall,
          dimensions: score.dimensions || {},
          interpretation: score.interpretation,
          detailed_interpretations: score.detailed_interpretations,
          recommendations: score.recommendations,
          dominant_profile: score.dominant_profile,
          secondary_profile: score.secondary_profile
        }}
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

export default ProfileResultLayout;
