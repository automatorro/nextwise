
export interface TestScoringExplanation {
  description: string;
  scoreRanges?: Array<{
    range: string;
    label: string;
    variant: 'outline' | 'secondary' | 'default';
  }>;
  whatItMeans?: string;
}

export interface DimensionExplanation {
  description: string;
  interpretations: {
    high: string;
    low: string;
  };
  yourScore: {
    high: string;
    moderate: string;
    low: string;
  };
}
