
import { StandardizedScore } from '@/types/tests';

export const calculateDigitalCompetenciesScore = (answers: Record<string, number>): StandardizedScore => {
  console.log('==========================================');
  console.log('CALCUL SCOR COMPETENȚE DIGITALE');
  console.log('==========================================');
  console.log('Răspunsuri primite:', JSON.stringify(answers, null, 2));
  
  // Simplifică răspunsurile doar la valori
  const answerValues = Object.values(answers);
  
  // Verificăm dacă toate răspunsurile sunt 5
  const toateRaspunsurile5 = answerValues.every(score => score === 5);
  console.log('Toate răspunsurile sunt 5?', toateRaspunsurile5);
  
  // Verificăm dacă avem toate cele 35 de răspunsuri
  const numarRaspunsuri = answerValues.length;
  console.log('Număr total răspunsuri:', numarRaspunsuri);
  
  // Obținem lista de ID-uri ale întrebărilor sortate după ordine
  const sortedQuestionIds = Object.keys(answers).sort((a, b) => {
    // Presupunem că fiecare răspuns are un index în baza de date
    // Vom folosi ordinea în care vin răspunsurile pentru a determina dimensiunea
    return a.localeCompare(b);
  });

  // Împărțim întrebările în grupuri de câte 7 pentru fiecare dimensiune
  const dimensions = {
    alfabetizare_digitala: sortedQuestionIds.slice(0, 7),
    comunicare_digitala: sortedQuestionIds.slice(7, 14),
    creare_continut: sortedQuestionIds.slice(14, 21),
    siguranta_digitala: sortedQuestionIds.slice(21, 28),
    rezolvare_probleme: sortedQuestionIds.slice(28, 35)
  };
  
  const dimensionScores: Record<string, number> = {};
  const maxScorePerDimension = 35; // 7 întrebări × 5 puncte maxim
  
  // Calculăm scorul pentru fiecare dimensiune
  Object.entries(dimensions).forEach(([dimensionKey, questionIds]) => {
    let totalScore = 0;
    let validAnswers = 0;
    
    console.log(`\nAnalizăm dimensiunea ${dimensionKey}:`);
    console.log('ID-uri întrebări pentru această dimensiune:', questionIds);
    
    questionIds.forEach(questionId => {
      if (answers[questionId] !== undefined) {
        console.log(`  Întrebarea ${questionId}: scor ${answers[questionId]}`);
        totalScore += answers[questionId];
        validAnswers++;
      } else {
        console.log(`  Întrebarea ${questionId}: lipsește răspunsul`);
      }
    });
    
    // Calculăm scorul pentru dimensiune (0-10 pentru radar chart)
    if (validAnswers > 0) {
      const rawScore = totalScore;
      const maxPossible = questionNumbers.length * 5; // 5 puncte maxim per întrebare
      dimensionScores[dimensionKey] = Math.round((rawScore / maxPossible) * 10); // Convertim la scală 0-10
      console.log(`Rezultat ${dimensionKey}:`, { 
        totalScore, 
        validAnswers, 
        rawScore, 
        maxPossible, 
        scoreBeforeRounding: (rawScore / maxPossible) * 10,
        finalScore: dimensionScores[dimensionKey]
      });
    } else {
      dimensionScores[dimensionKey] = 0;
      console.log(`${dimensionKey}: Nu sunt răspunsuri valide`);
    }
  });
  
  // Calculăm procentajul general (0-100%)
  const total = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const maxPossible = 35 * 5; // 35 întrebări × 5 puncte maxim
  const overall = Math.round((total / maxPossible) * 100);
  
  console.log('\nCalcul scor general:', {
    totalPuncte: total,
    puncteMaximePosibile: maxPossible,
    scorBrut: (total / maxPossible) * 100,
    scorFinal: overall,
    toateRaspunsurile: Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join(', ')
  });
  
  // Determinăm interpretarea generală
  let interpretation = '';
  if (overall >= 86) {
    interpretation = 'Expert - Competențe digitale foarte avansate';
  } else if (overall >= 66) {
    interpretation = 'Avansat - Competențe digitale solide';
  } else if (overall >= 41) {
    interpretation = 'Intermediar - Competențe digitale funcționale';
  } else {
    interpretation = 'Începător - Necesită dezvoltarea competențelor de bază';
  }
  
  // Creăm interpretări detaliate pentru fiecare dimensiune
  const interpretations: Record<string, string> = {};
  Object.entries(dimensionScores).forEach(([dimension, score]) => {
    // Folosim direct scorul pe scala 0-10 pentru interpretare
    if (score >= 8.6) { // 86% din 10
      interpretations[dimension] = getExpertInterpretation(dimension);
    } else if (score >= 6.6) { // 66% din 10
      interpretations[dimension] = getAdvancedInterpretation(dimension);
    } else if (score >= 4.1) { // 41% din 10
      interpretations[dimension] = getIntermediateInterpretation(dimension);
    } else {
      interpretations[dimension] = getBeginnerInterpretation(dimension);
    }
  });
  
  console.log('Scor calculat Digital Competencies:', {
    overall,
    dimensions: dimensionScores,
    interpretation,
    interpretations
  });
  
  return {
    type: 'dimensional',
    overall,
    dimensions: Object.entries(dimensionScores).map(([key, value]) => ({
      id: key,
      name: key,
      score: value
    })),
    detailed_interpretations: interpretations,
    interpretation,
    raw_score: Object.values(answers).reduce((sum, score) => sum + score, 0),
    max_score: 35 * 5 // 35 questions × 5 points max
  };
};

// Interpretări pentru nivel Expert (86-100%)
const getExpertInterpretation = (dimension: string): string => {
  const expertInterpretations: Record<string, string> = {
    alfabetizare_digitala: 'Ai competențe excepționale în gestionarea informațiilor digitale. Poți evalua critic sursele, organiza eficient datele și extrage insight-uri valoroase din informații complexe.',
    comunicare_digitala: 'Excelezi în comunicarea digitală, facilitând colaborări eficiente și adaptându-ți stilul pentru diferite contexte și audiențe online.',
    creare_continut: 'Ești foarte competent în crearea conținutului digital profesional, respectând standardele de calitate și drepturile de autor.',
    siguranta_digitala: 'Ai o înțelegere foarte avansată a securității digitale și poți implementa măsuri de protecție comprehensive.',
    rezolvare_probleme: 'Excelezi în identificarea și implementarea soluțiilor digitale inovatoare pentru provocări complexe.'
  };
  
  return expertInterpretations[dimension] || 'Competențe foarte avansate în acest domeniu.';
};

// Interpretări pentru nivel Avansat (66-85%)
const getAdvancedInterpretation = (dimension: string): string => {
  const advancedInterpretations: Record<string, string> = {
    alfabetizare_digitala: 'Ai competențe solide în gestionarea informațiilor digitale. Poți găsi și evalua informațiile necesare cu eficiență.',
    comunicare_digitala: 'Te descurci foarte bine în comunicarea digitală și colaborarea online, folosind instrumentele adecvate pentru diferite situații.',
    creare_continut: 'Poți crea conținut digital de calitate, adaptându-l pentru diferite platforme și respectând standardele profesionale.',
    siguranta_digitala: 'Ai o înțelegere solidă a securității digitale și implementezi măsuri de protecție eficiente.',
    rezolvare_probleme: 'Ești competent în identificarea soluțiilor digitale și te adaptezi rapid la noile tehnologii.'
  };
  
  return advancedInterpretations[dimension] || 'Competențe solide în acest domeniu.';
};

// Interpretări pentru nivel Intermediar (41-65%)
const getIntermediateInterpretation = (dimension: string): string => {
  const intermediateInterpretations: Record<string, string> = {
    alfabetizare_digitala: 'Ai competențe funcționale în gestionarea informațiilor digitale, dar poți îmbunătăți capacitatea de evaluare critică a surselor.',
    comunicare_digitala: 'Te descurci bine în comunicarea digitală de bază, dar poți dezvolta competențele de colaborare avansată.',
    creare_continut: 'Poți crea conținut digital funcțional, dar ai potențial de îmbunătățire în aspectele creative și tehnice.',
    siguranta_digitala: 'Ai competențe de bază în securitatea digitală, dar poți dezvolta măsuri de protecție mai avansate.',
    rezolvare_probleme: 'Poți rezolva probleme digitale standard, dar ai potențial de dezvoltare în identificarea soluțiilor inovatoare.'
  };
  
  return intermediateInterpretations[dimension] || 'Competențe funcționale cu potențial de dezvoltare.';
};

// Interpretări pentru nivel Începător (0-40%)
const getBeginnerInterpretation = (dimension: string): string => {
  const beginnerInterpretations: Record<string, string> = {
    alfabetizare_digitala: 'Ai nevoie de dezvoltarea competențelor de bază în gestionarea informațiilor digitale. Focus pe învățarea tehnicilor de căutare și evaluare a surselor.',
    comunicare_digitala: 'Este recomandat să dezvolți competențele fundamentale de comunicare digitală și să te familiarizezi cu platformele de colaborare.',
    creare_continut: 'Ai nevoie de dezvoltarea competențelor de bază în crearea conținutului digital. Începe cu instrumente simple și concepte fundamentale.',
    siguranta_digitala: 'Este esențial să dezvolți competențele de securitate digitală de bază pentru protejarea datelor și identității online.',
    rezolvare_probleme: 'Ai nevoie de dezvoltarea competențelor fundamentale în rezolvarea problemelor digitale și adaptarea la noile tehnologii.'
  };
  
  return beginnerInterpretations[dimension] || 'Necesită dezvoltarea competențelor de bază în acest domeniu.';
};
