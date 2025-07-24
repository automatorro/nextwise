
export interface HexacoScore {
  overall: number;
  dimensions: {
    honesty_humility: number;
    emotionality: number;
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    openness: number;
  };
  interpretation: string;
  detailed_interpretations: {
    honesty_humility: string;
    emotionality: string;
    extraversion: string;
    agreeableness: string;
    conscientiousness: string;
    openness: string;
  };
  recommendations: string[];
}

export const calculateHexacoScore = (answers: Record<string, number>): HexacoScore => {
  const answerArray = Object.values(answers);
  const totalQuestions = answerArray.length;
  
  // HEXACO are 6 dimensiuni principale cu câte 10 întrebări fiecare (60 total)
  const questionsPerDimension = Math.floor(totalQuestions / 6);
  
  // Calcularea scorurilor pentru fiecare dimensiune
  const honestyHumilityScore = calculateDimensionScore(answerArray, 0, questionsPerDimension);
  const emotionalityScore = calculateDimensionScore(answerArray, questionsPerDimension, questionsPerDimension);
  const extraversionScore = calculateDimensionScore(answerArray, questionsPerDimension * 2, questionsPerDimension);
  const agreeablenessScore = calculateDimensionScore(answerArray, questionsPerDimension * 3, questionsPerDimension);
  const conscientiousnessScore = calculateDimensionScore(answerArray, questionsPerDimension * 4, questionsPerDimension);
  const opennessScore = calculateDimensionScore(answerArray, questionsPerDimension * 5, questionsPerDimension);
  
  // Calcularea scorului general
  const overallScore = Math.round(
    (honestyHumilityScore + emotionalityScore + extraversionScore + 
     agreeablenessScore + conscientiousnessScore + opennessScore) / 6
  );
  
  const dimensions = {
    honesty_humility: honestyHumilityScore,
    emotionality: emotionalityScore,
    extraversion: extraversionScore,
    agreeableness: agreeablenessScore,
    conscientiousness: conscientiousnessScore,
    openness: opennessScore
  };
  
  return {
    overall: overallScore,
    dimensions,
    interpretation: generateOverallInterpretation(overallScore, dimensions),
    detailed_interpretations: generateDetailedInterpretations(dimensions),
    recommendations: generateRecommendations(dimensions)
  };
};

const calculateDimensionScore = (answers: number[], startIndex: number, length: number): number => {
  let sum = 0;
  for (let i = startIndex; i < startIndex + length && i < answers.length; i++) {
    sum += answers[i];
  }
  return Math.round((sum / length) * 20); // Normalizare la 0-100
};

const generateOverallInterpretation = (overallScore: number, dimensions: HexacoScore['dimensions']): string => {
  const dominant = getDominantDimensions(dimensions);
  
  if (overallScore >= 80) {
    return `Profil de personalitate foarte echilibrat cu puncte forte în ${dominant.join(', ')}. Demonstrezi o personalitate matură și adaptabilă în diverse contexte sociale și profesionale.`;
  } else if (overallScore >= 60) {
    return `Profil de personalitate bine dezvoltat cu caracteristici pronunțate în ${dominant.join(', ')}. Aceste trăsături te definesc în interacțiunile tale zilnice.`;
  } else if (overallScore >= 40) {
    return `Profil de personalitate moderat cu unele aspecte care se evidențiază în ${dominant.join(', ')}. Există oportunități de dezvoltare personală în alte domenii.`;
  } else {
    return `Profil de personalitate în dezvoltare. Se recomandă focus pe îmbunătățirea aspectelor legate de ${dominant.join(', ')} și explorarea altor dimensiuni ale personalității.`;
  }
};

const getDominantDimensions = (dimensions: HexacoScore['dimensions']): string[] => {
  const dimensionNames = {
    honesty_humility: 'Onestitate-Umilința',
    emotionality: 'Emotivitate',
    extraversion: 'Extraversiune',
    agreeableness: 'Agreabilitate',
    conscientiousness: 'Conștiinciozitate',
    openness: 'Deschidere'
  };
  
  return Object.entries(dimensions)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 2)
    .map(([key]) => dimensionNames[key as keyof typeof dimensionNames]);
};

const generateDetailedInterpretations = (dimensions: HexacoScore['dimensions']) => {
  return {
    honesty_humility: interpretHonestyHumility(dimensions.honesty_humility),
    emotionality: interpretEmotionality(dimensions.emotionality),
    extraversion: interpretExtraversion(dimensions.extraversion),
    agreeableness: interpretAgreeableness(dimensions.agreeableness),
    conscientiousness: interpretConscientiousness(dimensions.conscientiousness),
    openness: interpretOpenness(dimensions.openness)
  };
};

const interpretHonestyHumility = (score: number): string => {
  if (score >= 80) return "Foarte onest și umil. Eviți manipularea, arăți fairplay și nu cauți privilegii speciale. Ai o abordare modestă în relațiile cu alții.";
  if (score >= 60) return "Destul de onest și umil. Valorifici fairplay-ul și ai o abordare echilibrată față de propriile realizări și nevoi.";
  if (score >= 40) return "Nivel moderat de onestitate și umilință. Uneori poți fi competitiv sau să îți promovezi interesele mai direct.";
  return "Tendință spre competitivitate și autopromovare. Poți fi mai direct în obținerea a ceea ce dorești și mai puțin modest în privința realizărilor.";
};

const interpretEmotionality = (score: number): string => {
  if (score >= 80) return "Foarte sensibil emoțional. Exprimi deschis emoțiile, ai empatie puternică și formezi atașamente profunde cu ceilalți.";
  if (score >= 60) return "Sensibilitate emoțională peste medie. Ai o capacitate bună de a înțelege și răspunde la emoțiile proprii și ale altora.";
  if (score >= 40) return "Sensibilitate emoțională moderată. Echilibru între expresia emoțională și controlul rațional.";
  return "Sensibilitate emoțională scăzută. Tinde să fie mai logic și mai puțin afectat de stările emoționale intense.";
};

const interpretExtraversion = (score: number): string => {
  if (score >= 80) return "Foarte extravertit. Îți place să fii în centrul atenției, ești sociabil și energic în grupuri mari.";
  if (score >= 60) return "Destul de extravertit. Apreciezi interacțiunile sociale și te simți confortabil în situații de grup.";
  if (score >= 40) return "Echilibru între extraversiune și introversiune. Poți fi sociabil dar apreciezi și momentele de singurătate.";
  return "Tendință introvertă. Preferi grupurile mici, conversațiile profunde și ai nevoie de timp pentru a te reîncărca singur.";
};

const interpretAgreeableness = (score: number): string => {
  if (score >= 80) return "Foarte agreabil. Ești cooperant, îngăduitor și cauți să eviți conflictele. Ai o abordare blândă în relații.";
  if (score >= 60) return "Destul de agreabil. Valorifici cooperarea și ai o abordare pozitivă în relațiile cu alții.";
  if (score >= 40) return "Nivel moderat de agreabilitate. Poți fi cooperant dar și ferm când situația o cere.";
  return "Tendință spre competitivitate. Poți fi mai direct în exprimarea dezacordului și mai puțin îngăduitor cu greșelile altora.";
};

const interpretConscientiousness = (score: number): string => {
  if (score >= 80) return "Foarte conștiincios. Ești organizat, perseverent și ai standarde înalte în tot ceea ce faci. Planifici cu atenție și urmezi procedurile.";
  if (score >= 60) return "Destul de conștiincios. Ai o abordare organizată și îți îndeplinești responsabilitățile cu seriozitate.";
  if (score >= 40) return "Nivel moderat de conștiinciozitate. Echilibru între flexibilitate și structură în abordarea sarcinilor.";
  return "Tendință spre flexibilitate și spontaneitate. Preferi să improvizezi și să te adaptezi decât să urmezi planuri rigide.";
};

const interpretOpenness = (score: number): string => {
  if (score >= 80) return "Foarte deschis către experiențe noi. Ești creativ, curios intelectual și apreciezi arta, ideile abstracte și noutatea.";
  if (score >= 60) return "Destul de deschis. Apreciezi ideile noi și experiențele diverse, având o abordare creativă în viață.";
  if (score >= 40) return "Nivel moderat de deschidere. Echilibru între aprecierea noutății și preferința pentru familiar.";
  return "Tendință conservatoare. Preferi experiențele familiare și abordările tradiționale, fiind mai puțin interesat de abstracte.";
};

const generateRecommendations = (dimensions: HexacoScore['dimensions']): string[] => {
  const recommendations: string[] = [];
  
  // Recomandări bazate pe punctele slabe
  if (dimensions.honesty_humility < 40) {
    recommendations.push("Practică ascultarea activă și empatia pentru a dezvolta relații mai autentice");
  }
  
  if (dimensions.emotionality < 40) {
    recommendations.push("Explorează activități care îți dezvoltă inteligența emoțională, precum mindfulness sau jurnalizarea");
  }
  
  if (dimensions.extraversion < 40) {
    recommendations.push("Participă gradual la activități sociale pentru a-ți extinde zona de confort");
  }
  
  if (dimensions.agreeableness < 40) {
    recommendations.push("Practică tehnici de comunicare asertivă și colaborarea în echipă");
  }
  
  if (dimensions.conscientiousness < 40) {
    recommendations.push("Dezvoltă-ți abilitățile de organizare și planificare prin tehnici de management al timpului");
  }
  
  if (dimensions.openness < 40) {
    recommendations.push("Explorează noi hobby-uri, cărți sau experiențe culturale pentru a-ți extinde perspectivele");
  }
  
  // Recomandări pentru punctele forte
  const strongDimensions = Object.entries(dimensions)
    .filter(([, score]) => (score as number) >= 80)
    .map(([key]) => key);
  
  if (strongDimensions.length > 0) {
    recommendations.push("Valorifică punctele tale forte în dezvoltarea carierei și relațiilor personale");
  }
  
  return recommendations;
};
