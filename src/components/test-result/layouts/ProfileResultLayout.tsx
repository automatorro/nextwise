// src/components/test-result/layouts/ProfileResultLayout.tsx

import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

interface ProfileResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
}

/**
 * Acesta este layout-ul specializat pentru teste "de profil"
 * (ex: DISC, Enneagram), care identifică un tip dominant.
 */
export const ProfileResultLayout: React.FC<ProfileResultLayoutProps> = ({ score, testName }) => {
  const { t } = useLanguage();
  const dominantProfileId = score.dominant_profile;
  
  // Get the translated profile information for DISC tests
  const getProfileInfo = () => {
    if (testName?.includes('DISC') && dominantProfileId) {
      const profileKey = dominantProfileId;
      return {
        name: t(`tests.disc.explanation.profiles.${profileKey}.name`),
        description: t(`tests.disc.explanation.profiles.${profileKey}.description`)
      };
    }
    // Fallback to old system for other tests
    return dominantProfileId ? score.profile_details?.[dominantProfileId] : null;
  };
  
  const profileInfo = getProfileInfo();

  // Get the translated interpretation for DISC tests
  const getInterpretation = () => {
    if (testName?.includes('DISC') && dominantProfileId && profileInfo?.name) {
      return t('tests.disc.explanation.interpretation.dominant').replace('{{profile}}', profileInfo.name);
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

      {profileInfo && (
        <Card>
          <CardHeader>
            <CardTitle>
              {testName?.includes('DISC') 
                ? t('tests.disc.explanation.profileTitle').replace('{{profile}}', profileInfo.name)
                : `Profilul tău Principal: ${profileInfo.name}`
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{profileInfo.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Aici vom adăuga cardul de Analiză AI pentru acest tip de test */}
    </div>
  );
};