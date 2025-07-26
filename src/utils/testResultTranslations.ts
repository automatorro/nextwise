export const getResultLabels = (language: string) => {
  return {
    overallScoreTitle: language === 'en' ? 'Overall Score' : 'Scorul Total',
    scoredPoints: language === 'en' ? 'Scored Points' : 'Puncte Obținute',
    maxPoints: language === 'en' ? 'Max Points' : 'Puncte Maxime'
  };
};

export const translateInterpretation = (interpretation: string, language: string): string => {
  if (language === 'en') {
    // English translations for sensory perception
    if (interpretation.includes('excepționale')) {
      return 'Exceptional perceptual abilities - Superior sensory acuity with potential for specialized careers requiring high perceptual precision.';
    }
    if (interpretation.includes('ridicate')) {
      return 'High perceptual abilities - Good sensory processing with above-average performance in most fields requiring attention to detail.';
    }
    if (interpretation.includes('moderate')) {
      return 'Moderate perceptual abilities - Normal functioning with opportunities for improvement through specific training and targeted practice.';
    }
    if (interpretation.includes('dezvoltare')) {
      return 'Developing perceptual abilities - Requires attention and specialized training to improve performance in complex perceptual tasks.';
    }
    
    if (interpretation.includes('deschis')) {
      return 'You are open to new experiences and ideas, which makes you creative and adaptable.';
    }
    if (interpretation.includes('rutina')) {
      return 'You prefer routine and the familiar, which can offer stability but limits innovation.';
    }
    if (interpretation.includes('organizat')) {
      return 'You are organized and responsible, which helps you achieve your goals successfully.';
    }
    if (interpretation.includes('relaxat')) {
      return 'You may be more relaxed about planning and organization.';
    }
    if (interpretation.includes('sociabil')) {
      return 'You are sociable and energetic, enjoying the company of others.';
    }
    if (interpretation.includes('rezervat')) {
      return 'You are more reserved and prefer moments of quiet.';
    }
    if (interpretation.includes('cooperant')) {
      return 'You are cooperative and empathetic, making you a good colleague and friend.';
    }
    if (interpretation.includes('direct')) {
      return 'You may be more direct and focused on your own goals.';
    }
    if (interpretation.includes('sensibil')) {
      return 'You may be more sensitive to stress and negative emotions.';
    }
    if (interpretation.includes('calm')) {
      return 'You are calm and emotionally balanced in the face of challenges.';
    }
  }
  
  return interpretation; // Return original if no translation found
};
