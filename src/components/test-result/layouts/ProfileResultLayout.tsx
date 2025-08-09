
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import { OverallScoreCard } from '../OverallScoreCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileResultLayoutProps {
  score: StandardizedScore;
  testName?: string;
}

export const ProfileResultLayout: React.FC<ProfileResultLayoutProps> = ({ score, testName }) => {
  const dominantProfile = score.dominant_profile;
  const profileDetails = score.profile_details?.[dominantProfile || ''];

  return (
    <div className="space-y-6">
      <OverallScoreCard
        scorePercentage={score.overall}
        rawScore={score.raw_score}
        maxScore={score.max_score}
        interpretation={score.interpretation}
        testName={testName}
      />

      {dominantProfile && profileDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Profilul tău Dominant: {profileDetails.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{profileDetails.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
