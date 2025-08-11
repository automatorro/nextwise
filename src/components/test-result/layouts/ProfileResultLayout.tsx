// src/components/test-result/layouts/ProfileResultLayout.tsx

import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
}

/**
 * Acesta este layout-ul specializat pentru teste "de profil"
 * (ex: DISC, Enneagram), care identifică un tip dominant.
 */
export const ProfileResultLayout: React.FC<ProfileResultLayoutProps> = ({ score, testName }) => {
  const dominantProfileId = score.dominant_profile;
  // Extragem detaliile profilului dominant din obiectul trimis de funcția de calcul
  const profileInfo = dominantProfileId ? score.profile_details?.[dominantProfileId] : null;

  const cardScoreData = {
    overall: score.overall ?? 0,
    raw_score: score.raw_score ?? 0,
    max_score: score.max_score ?? 0,
    interpretation: score.interpretation ?? '',
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
            <CardTitle>Profilul tău Principal: {profileInfo.name}</CardTitle>
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