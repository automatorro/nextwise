// src/components/test-result/layouts/ProfileResultLayout.tsx

import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { PersonalizedResultsCard } from '../PersonalizedResultsCard';
import { ScoringExplanation } from '../ScoringExplanation';
import { AiAnalysisCard } from '../AiAnalysisCard';
import { ContextualRecommendationsCard } from '../ContextualRecommendationsCard';
import { LifeImpactExplanation } from '../LifeImpactExplanation';
import { ProgressPathCard } from '../ProgressPathCard';
import DetailedInterpretations from '../DetailedInterpretations';
import { DiscRadarChart } from '../../charts/DiscRadarChart';
import { getEnneagramTypeDescription } from '@/utils/testCalculations/enneagramCalculation';

interface ProfileResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
  resultId?: string;
}

/**
 * Acesta este layout-ul specializat pentru teste "de profil"
 * (ex: DISC, Enneagram), care identifică un tip dominant.
 */
export const ProfileResultLayout: React.FC<ProfileResultLayoutProps> = ({ score, testName, resultId }) => {
  const { t } = useLanguage();
  const dominantProfileId = score.dominant_profile;
  
  // Get the translated profile information for DISC and Enneagram tests
  const getProfileInfo = () => {
    if (testName?.includes('DISC') && dominantProfileId) {
      const profileKey = dominantProfileId;
      return {
        name: t(`tests.disc.explanation.profiles.${profileKey}.name`),
        description: t(`tests.disc.explanation.profiles.${profileKey}.description`)
      };
    }
    
    if (testName?.toLowerCase().includes('enneagram') && dominantProfileId) {
      const typeNumber = dominantProfileId.replace('type', '');
      const language = t('common.language') === 'English' ? 'en' : 'ro';
      return {
        name: `Type ${typeNumber}`,
        description: getEnneagramTypeDescription(dominantProfileId, language as 'ro' | 'en')
      };
    }
    
    // Fallback to old system for other tests
    return dominantProfileId ? score.profile_details?.[dominantProfileId] : null;
  };
  
  const profileInfo = getProfileInfo();

  // Get the translated interpretation for DISC and Enneagram tests
  const getInterpretation = () => {
    if (testName?.includes('DISC') && dominantProfileId && profileInfo?.name) {
      return t('tests.disc.explanation.interpretation.dominant').replace('{{profile}}', profileInfo.name);
    }
    
    if (testName?.toLowerCase().includes('enneagram') && dominantProfileId && profileInfo?.name) {
      return `Tipul tău dominant Enneagram este ${profileInfo.name}. ${profileInfo.description}`;
    }
    
    // For other profile tests, return the interpretation as-is
    return score.interpretation ?? t('testResult.interpretation.notAvailable');
  };

  const cardScoreData = {
    overall: score.overall ?? 0,
    raw_score: score.raw_score ?? 0,
    max_score: score.max_score ?? 0,
    interpretation: getInterpretation(),
    dimensions: score.dimensions ?? [],
    detailed_interpretations: score.detailed_interpretations ?? {},
  };

  return (
    <div className="space-y-6">
      <OverallScoreCard
        score={cardScoreData}
        testName={testName}
      />

      {/* DISC Radar Chart */}
      {testName?.includes('DISC') && score.dimensions && (
        <DiscRadarChart dimensions={score.dimensions} testName={testName} />
      )}

      {profileInfo && (
        <Card>
          <CardHeader>
            <CardTitle>
              {testName?.includes('DISC') 
                ? t('tests.disc.explanation.profileTitle').replace('{{profile}}', profileInfo.name)
                : testName?.toLowerCase().includes('enneagram')
                ? `Tipul tău Enneagram: ${profileInfo.name}`
                : `Profilul tău Principal: ${profileInfo.name}`
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{profileInfo.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Personalized Results Card */}
      <PersonalizedResultsCard score={score} testName={testName} />

      {/* AI Analysis Card */}
      <AiAnalysisCard 
        testName={testName}
        resultId={resultId}
        score={score}
      />

      {/* Detailed Interpretations */}
      {score.detailed_interpretations && Object.keys(score.detailed_interpretations).length > 0 && (
        <DetailedInterpretations 
          interpretations={score.detailed_interpretations}
          testName={testName}
        />
      )}

      {/* Scoring Explanation */}
      <ScoringExplanation 
        testName={testName || ''} 
        dimensions={score.dimensions?.reduce((acc, dim) => ({ ...acc, [dim.id]: dim.score }), {})}
      />

      {/* Contextual Recommendations */}
      <ContextualRecommendationsCard score={score} testName={testName} />

      {/* Life Impact Explanation */}
      <LifeImpactExplanation score={score} testName={testName} />

      {/* Progress Path Card */}
      <ProgressPathCard score={score} testName={testName} />
    </div>
  );
};