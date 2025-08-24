
import { StandardizedScore } from '@/types/tests';

export const calculateBigFiveScore = (answers: Record<string, number>, questions: any[] = []): StandardizedScore => {
  const scores = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  };
  
  const questionCounts = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  };
  
  // Calculul bazat pe scoring_weights din întrebări
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.scoring_weights) {
      const weights = question.scoring_weights as Record<string, number[]>;
      
      // Adăugăm scorurile pentru fiecare dimensiune
      Object.entries(weights).forEach(([dimension, dimensionWeights]) => {
        if (dimension in scores && answer < dimensionWeights.length) {
          scores[dimension as keyof typeof scores] += dimensionWeights[answer];
          questionCounts[dimension as keyof typeof questionCounts]++;
        }
      });
    }
  });
  
  // Normalizarea la procente
  const normalizedScores = Object.fromEntries(
    Object.entries(scores).map(([dimension, score]) => [
      dimension,
      questionCounts[dimension as keyof typeof questionCounts] > 0 
        ? Math.round((score / (questionCounts[dimension as keyof typeof questionCounts] * 4)) * 100)
        : 0
    ])
  ) as typeof scores;
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 5);
  
  // Transformăm dimensiunile în formatul StandardizedScore (pe scara 1-10)
  const dimensions = [
    { id: 'openness', name: 'Deschidere către experiență', score: Math.max(1, Math.min(10, Math.round(normalizedScores.openness / 10))) },
    { id: 'conscientiousness', name: 'Conștiinciozitate', score: Math.max(1, Math.min(10, Math.round(normalizedScores.conscientiousness / 10))) },
    { id: 'extraversion', name: 'Extraversiune', score: Math.max(1, Math.min(10, Math.round(normalizedScores.extraversion / 10))) },
    { id: 'agreeableness', name: 'Amabilitate', score: Math.max(1, Math.min(10, Math.round(normalizedScores.agreeableness / 10))) },
    { id: 'neuroticism', name: 'Nevrotism', score: Math.max(1, Math.min(10, Math.round(normalizedScores.neuroticism / 10))) }
  ];

  // Interpretări detaliate pentru fiecare dimensiune
  const detailed_interpretations = {
    openness: getOpennessInterpretation(normalizedScores.openness),
    conscientiousness: getConscientiousnessInterpretation(normalizedScores.conscientiousness),
    extraversion: getExtraversionInterpretation(normalizedScores.extraversion),
    agreeableness: getAgreeablenessInterpretation(normalizedScores.agreeableness),
    neuroticism: getNeuroticismInterpretation(normalizedScores.neuroticism)
  };

  const interpretation = `Profilul tău Big Five arată o personalitate echilibrată cu puncte forte în ${
    Object.entries(normalizedScores).sort(([,a], [,b]) => b - a)[0][0]
  }.`;
  
  return {
    type: 'dimensional',
    overall,
    dimensions,
    detailed_interpretations,
    interpretation
  };
};

// Funcții de interpretare pentru fiecare dimensiune
function getOpennessInterpretation(score: number): string {
  if (score >= 70) return "Ești foarte deschis(ă) către experiențe noi, creativitate și idei inovatoare. Îți place să explorezi concepte abstracte și să experimentezi.";
  if (score >= 40) return "Ai un echilibru bun între deschiderea către nou și preferința pentru familiar. Ești receptiv(ă) la idei noi, dar îți păstrezi și tradițiile.";
  return "Preferi stabilitatea și rutina. Ești mai conservator(oare) în abordări și îți place să te bazezi pe metode dovedite.";
}

function getConscientiousnessInterpretation(score: number): string {
  if (score >= 70) return "Ești foarte organizat(ă), disciplinat(ă) și responsabil(ă). Îți planifici activitățile cu grijă și urmărești obiectivele cu perseverență.";
  if (score >= 40) return "Ai un nivel moderat de organizare și disciplină. Îți îndeplinești responsabilitățile, dar uneori poți fi mai flexibil(ă) cu regulile.";
  return "Preferi spontaneitatea și flexibilitatea. Uneori îți poate fi dificil să urmezi rutine stricte sau să te concentrezi pe detalii.";
}

function getExtraversionInterpretation(score: number): string {
  if (score >= 70) return "Ești o persoană foarte sociabilă și energică. Îți place să fii în centrul atenției și să interacționezi cu multe persoane.";
  if (score >= 40) return "Ai un echilibru între momente sociale și timp petrecut singur(ă). Te simți confortabil(ă) în diverse situații sociale.";
  return "Preferi activitățile liniștite și grupurile mici. Îți reîncarcă bateriile timpul petrecut singur(ă) sau cu apropiați.";
}

function getAgreeablenessInterpretation(score: number): string {
  if (score >= 70) return "Ești foarte empatic(ă) și cooperant(ă). Îți place să ajuți pe alții și să menții armonia în relații.";
  if (score >= 40) return "Ai un echilibru între compasiune și asertivitate. Ești dispus(ă) să cooperezi, dar îți exprimi și propriile opinii.";
  return "Ești direct(ă) și competitiv(ă). Îți exprimi părerea fără să te îngrijorezi prea mult de reacțiile altora.";
}

function getNeuroticismInterpretation(score: number): string {
  if (score >= 70) return "Poți fi mai sensibil(ă) la stres și ai tendința să experimentezi emoții intense. Este important să dezvolți strategii de gestionare a stresului.";
  if (score >= 40) return "Ai un nivel moderat de stabilitate emotională. Gestionezi de obicei bine stresul, dar poți avea momente de tensiune.";
  return "Ești foarte calm(ă) și stabil(ă) emoțional. Rămâi relaxat(ă) chiar și în situații stresante.";
}
