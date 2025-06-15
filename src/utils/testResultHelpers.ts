
export const getDimensionLabel = (key: string) => {
  const labels: { [key: string]: string } = {
    // General
    general_score: 'Scor General',

    // GAD-7
    anxiety_level: 'Nivel de Anxietate',

    // Emotional Intelligence
    self_awareness: 'Conștientizare de Sine',
    self_regulation: 'Autoreglare',
    motivation: 'Motivație',
    empathy: 'Empatie',
    social_skills: 'Abilități Sociale',

    // Big Five
    openness: 'Deschidere către Experiență',
    conscientiousness: 'Conștiinciozitate',
    extraversion: 'Extraversiune',
    agreeableness: 'Amabilitate',
    neuroticism: 'Nevrotism',

    // Legacy/Other - might still be in use
    emotional_intelligence: 'Inteligență Emoțională',
    leadership: 'Leadership',
    stress_management: 'Gestionarea Stresului',
  };
  // A nice fallback for any keys not explicitly defined
  return labels[key] || key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export const getScoreBadgeVariant = (score: number) => {
  if (score >= 80) return 'default';
  if (score >= 60) return 'secondary';
  return 'destructive';
};

// Helper function to safely convert dimensions to Big Five format
export const getBigFiveDimensions = (dimensions: { [key: string]: number } | undefined) => {
  if (!dimensions) {
    return {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0
    };
  }
  
  return {
    openness: dimensions.openness || 0,
    conscientiousness: dimensions.conscientiousness || 0,
    extraversion: dimensions.extraversion || 0,
    agreeableness: dimensions.agreeableness || 0,
    neuroticism: dimensions.neuroticism || 0
  };
};

// Helper function to check if we have valid Big Five data
export const hasValidBigFiveData = (dimensions: { [key: string]: number } | undefined) => {
  if (!dimensions) return false;
  return 'openness' in dimensions && 'conscientiousness' in dimensions && 
         'extraversion' in dimensions && 'agreeableness' in dimensions && 
         'neuroticism' in dimensions;
};
