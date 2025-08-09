
export type TestResultType = 'dimensional' | 'profile' | 'scale' | 'role';

export interface StandardizedScore {
  type: TestResultType;
  overall?: number;
  raw_score?: number;
  max_score?: number;
  interpretation?: string;
  // Dimensions are ALWAYS an array of objects for consistency
  dimensions?: { id: string; name: string; score: number }[];
  detailed_interpretations?: { [key: string]: string };
  dominant_profile?: string;
  // Profile details are for tests like DISC
  profile_details?: { [key: string]: { name: string; description: string } };
  roles?: { primary: string[]; secondary: string[] };
  // Scale level is for tests like BDI
  scale_level?: string;
}
