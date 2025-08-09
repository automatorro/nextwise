
import React from 'react';
import { StandardizedScore } from '@/types/tests';
import OverallScoreCard from '../OverallScoreCard';
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
        score={{
          overall: score.overall || 0,
          raw_score: score.raw_score || 0,
          max_score: score.max_score || 0,
          interpretation: score.interpretation || ''
        }}
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
