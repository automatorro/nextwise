
// Utility function to convert dimensions array to object format
export const dimensionsToObject = (dimensions?: { id: string; name: string; score: number }[]): { [key: string]: number } => {
  if (!dimensions || !Array.isArray(dimensions)) {
    return {};
  }
  
  return dimensions.reduce((acc, dimension) => {
    acc[dimension.id] = dimension.score;
    return acc;
  }, {} as { [key: string]: number });
};

// Utility function to convert object format to dimensions array
export const objectToDimensions = (obj: { [key: string]: number }): { id: string; name: string; score: number }[] => {
  return Object.entries(obj).map(([key, value]) => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
    score: value
  }));
};
