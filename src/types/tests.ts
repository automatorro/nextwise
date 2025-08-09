
export type TestResultType = 'dimensional' | 'profile' | 'scale' | 'role';

export interface StandardizedScore {
  type: TestResultType;
  overall?: number;
  raw_score?: number;
  max_score?: number;
  interpretation?: string;
  dimensions?: { id: string; name: string; score: number }[];
  detailed_interpretations?: { [key: string]: string };
  dominant_profile?: string;
  profile_details?: { [key: string]: { name: string; description: string } };
  roles?: { primary: string[]; secondary: string[] };
  scale_level?: string;
}
