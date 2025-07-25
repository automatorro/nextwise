
export const calculateSJTScore = (answers: Record<string, number>, questions: any[]) => {
  console.log('=== SJT CALCULATION DEBUG ===');
  console.log('Answers received:', answers);
  console.log('Questions received:', questions);

  const profiles = {
    'Leader': 0,
    'Specialist_Analitic': 0,
    'Creativ': 0,
    'Suport_Servicii': 0,
    'Antreprenor': 0,
    'Vanzari': 0
  };

  let totalQuestions = 0;

  // Calculate scores for each profile
  Object.entries(answers).forEach(([questionId, answerIndex]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question || !question.scoring_weights) {
      console.warn('Question not found or missing scoring weights:', questionId);
      return;
    }

    console.log(`Processing question ${questionId}, answer index: ${answerIndex}`);
    console.log('Scoring weights:', question.scoring_weights);

    const weights = question.scoring_weights;
    totalQuestions++;

    // Add points for each profile based on the selected answer
    Object.keys(profiles).forEach(profile => {
      if (weights[profile] && weights[profile][answerIndex] !== undefined) {
        const points = weights[profile][answerIndex];
        profiles[profile] += points;
        console.log(`${profile}: +${points} points`);
      }
    });
  });

  console.log('Raw profile scores:', profiles);

  // Calculate percentages (normalize to 0-100%)
  const maxPossibleScore = totalQuestions * 4; // Maximum 4 points per question
  const normalizedProfiles: { [key: string]: number } = {};
  
  Object.entries(profiles).forEach(([profile, score]) => {
    normalizedProfiles[profile] = Math.round((score / maxPossibleScore) * 100);
  });

  console.log('Normalized profile scores:', normalizedProfiles);

  // Find dominant profile(s)
  const maxScore = Math.max(...Object.values(normalizedProfiles));
  const dominantProfiles = Object.entries(normalizedProfiles)
    .filter(([_, score]) => score === maxScore)
    .map(([profile, _]) => profile);

  console.log('Dominant profiles:', dominantProfiles);

  // Generate interpretation
  let interpretation = '';
  if (dominantProfiles.length === 1) {
    const profile = dominantProfiles[0];
    interpretation = getProfileInterpretation(profile, maxScore);
  } else {
    interpretation = `Profil mixt: ${dominantProfiles.join(', ')} (${maxScore}%)`;
  }

  const result = {
    overall: maxScore,
    dimensions: normalizedProfiles,
    interpretation,
    dominantProfiles,
    profileScores: normalizedProfiles
  };

  console.log('Final SJT result:', result);
  return result;
};

const getProfileInterpretation = (profile: string, score: number): string => {
  const interpretations = {
    'Leader': `Profil de Leadership (${score}%) - Ai o orientare puternică către conducere și coordonare echipă. Preferi să iei inițiativa și să ghidezi pe alții.`,
    'Specialist_Analitic': `Specialist Analitic (${score}%) - Ai o abordare metodică și analitică. Preferi să analizezi datele și să iei decizii bazate pe fapte.`,
    'Creativ': `Profil Creativ (${score}%) - Ai o gândire inovatoare și preferi să găsești soluții creative la problemele complexe.`,
    'Suport_Servicii': `Profil Suport & Servicii (${score}%) - Ai o orientare puternică către ajutorarea celorlalți și oferirea de suport echipei.`,
    'Antreprenor': `Profil Antreprenorial (${score}%) - Preferi să iei riscuri calculat și să însuți inițiative care pot aduce rezultate mari.`,
    'Vanzari': `Profil Vânzări (${score}%) - Ai abilități puternice de comunicare și persuasiune, preferând interacțiunea cu clienții.`
  };

  return interpretations[profile] || `Profil ${profile} (${score}%)`;
};
