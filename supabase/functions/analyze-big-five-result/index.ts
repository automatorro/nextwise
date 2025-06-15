
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface BigFiveAnswers {
  [key: string]: number;
}

interface BigFiveDimensions {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

interface BigFiveInterpretation {
  overall: number;
  raw_score: number;
  max_score: number;
  interpretation: string;
  dimensions: BigFiveDimensions;
  detailed_interpretations: {
    openness: string;
    conscientiousness: string;
    extraversion: string;
    agreeableness: string;
    neuroticism: string;
  };
}

serve(async (req) => {
  try {
    const { answers, test_type_id } = await req.json();

    // Verify this is a Big Five test
    if (test_type_id !== 'f47ac10b-58cc-4372-a567-0e02b2c3d480') {
      return new Response(
        JSON.stringify({ error: 'This function only handles Big Five tests' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = analyzeBigFiveResults(answers);

    return new Response(
      JSON.stringify(result),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error analyzing Big Five results:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze results' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

function analyzeBigFiveResults(answers: BigFiveAnswers): BigFiveInterpretation {
  // Define which questions belong to each dimension (40 questions total, 8 per dimension)
  const dimensions = {
    openness: [1, 2, 3, 4, 5, 6, 7, 8],
    conscientiousness: [9, 10, 11, 12, 13, 14, 15, 16],
    extraversion: [17, 18, 19, 20, 21, 22, 23, 24],
    agreeableness: [25, 26, 27, 28, 29, 30, 31, 32],
    neuroticism: [33, 34, 35, 36, 37, 38, 39, 40]
  };

  // Define which questions are reverse scored
  const reverseScored = [4, 5, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 37, 40];

  // Calculate scores for each dimension
  const dimensionScores: BigFiveDimensions = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  };

  // Calculate each dimension score
  Object.entries(dimensions).forEach(([dimension, questionNumbers]) => {
    let score = 0;
    questionNumbers.forEach(questionNum => {
      const answer = answers[questionNum.toString()];
      if (answer !== undefined) {
        // Apply reverse scoring if needed: (6 - answer)
        const adjustedScore = reverseScored.includes(questionNum) ? (6 - answer) : answer;
        score += adjustedScore;
      }
    });
    dimensionScores[dimension as keyof BigFiveDimensions] = score;
  });

  // Convert raw scores to percentages (each dimension: 8-40 points -> 0-100%)
  const dimensionPercentages: BigFiveDimensions = {
    openness: Math.round(((dimensionScores.openness - 8) / 32) * 100),
    conscientiousness: Math.round(((dimensionScores.conscientiousness - 8) / 32) * 100),
    extraversion: Math.round(((dimensionScores.extraversion - 8) / 32) * 100),
    agreeableness: Math.round(((dimensionScores.agreeableness - 8) / 32) * 100),
    neuroticism: Math.round(((dimensionScores.neuroticism - 8) / 32) * 100)
  };

  // Calculate overall score (average of all dimensions)
  const totalRawScore = Object.values(dimensionScores).reduce((sum, score) => sum + score, 0);
  const maxPossibleScore = 200; // 5 dimensions × 40 points each
  const minPossibleScore = 40; // 5 dimensions × 8 points each
  const overallPercentage = Math.round(((totalRawScore - minPossibleScore) / (maxPossibleScore - minPossibleScore)) * 100);

  // Generate interpretations using the exact text provided
  const detailedInterpretations = {
    openness: getOpennessInterpretation(dimensionScores.openness),
    conscientiousness: getConscientiousnessInterpretation(dimensionScores.conscientiousness),
    extraversion: getExtraversionInterpretation(dimensionScores.extraversion),
    agreeableness: getAgreeablenessInterpretation(dimensionScores.agreeableness),
    neuroticism: getNeuroticismInterpretation(dimensionScores.neuroticism)
  };

  // Generate overall interpretation
  const overallInterpretation = getOverallInterpretation(dimensionPercentages);

  return {
    overall: overallPercentage,
    raw_score: totalRawScore,
    max_score: maxPossibleScore,
    interpretation: overallInterpretation,
    dimensions: dimensionPercentages,
    detailed_interpretations: detailedInterpretations
  };
}

function getOpennessInterpretation(score: number): string {
  if (score >= 30) {
    return "PERSOANĂ DESCHISĂ, CREATIVĂ: Ești curios, creativ și ai o imaginație bogată. Îți place noutatea și varietatea, ești deschis la idei neconvenționale și apreciezi arta și esteticul. Te adaptezi ușor la schimbare și ești dornic să înveți lucruri noi. În carieră: Te potrivești în roluri care cer inovație, gândire abstractă și rezolvare creativă a problemelor, cum ar fi antreprenoriat, marketing, artă, design, cercetare sau strategie.";
  } else {
    return "PERSOANĂ PRAGMATICĂ, CONSECVENTĂ: Ești practic, pragmatic și preferi familiarul și rutina. Abordezi lucrurile într-un mod direct și convențional, bazându-te pe soluții testate. Stabilitatea și predictibilitatea sunt importante pentru tine. În carieră: Excelent în roluri care cer consistență, respectarea procedurilor și eficiență, cum ar fi administrație, contabilitate, logistică, operațiuni sau controlul calității.";
  }
}

function getConscientiousnessInterpretation(score: number): string {
  if (score >= 30) {
    return "PERSOANĂ ORGANIZATĂ, DISCIPLINATĂ: Ești o persoană de încredere, organizată, responsabilă și disciplinată. Îți stabilești obiective clare, îți planifici munca și ești foarte atent la detalii. Respecți termenele limită și ești motivat să duci sarcinile la bun sfârșit. În carieră: Ești un angajat model. Te potrivești în aproape orice rol, dar excelezi în management de proiect, inginerie, drept, medicină sau orice domeniu care necesită rigoare și fiabilitate.";
  } else {
    return "PERSOANĂ SPONTANĂ, FLEXIBILĂ: Ești mai spontan, flexibil și relaxat în privința regulilor și a planurilor. Poți fi mai puțin organizat și uneori amâni lucrurile, dar te adaptezi rapid la schimbări neașteptate. Preferi să lucrezi într-un ritm propriu, fără o structură rigidă. În carieră: Te potrivești în medii de lucru dinamice, care nu sunt birocratice. Roluri creative, vânzări sau startup-uri unde flexibilitatea este mai valoroasă decât planificarea rigidă pot fi potrivite pentru tine.";
  }
}

function getExtraversionInterpretation(score: number): string {
  if (score >= 30) {
    return "PERSOANĂ EXTRAVERTITĂ, SOCIABILĂ: Ești energic, vorbăreț și sociabil. Îți iei energia din interacțiunea cu ceilalți, îți place să fii în centrul atenției și te simți confortabil în grupuri mari. Ești asertiv și entuziast. În carieră: Excelezi în roluri care implică interacțiune umană constantă: vânzări, relații publice, management, training, consultanță sau organizare de evenimente.";
  } else {
    return "PERSOANĂ INTROVERTITĂ, REZERVATĂ: Ești mai rezervat, tăcut și preferi un mediu mai liniștit. Îți iei energia din timpul petrecut singur și preferi interacțiunile profunde, în grupuri mici, în detrimentul celor superficiale, în grupuri mari. Ești un bun ascultător și reflexiv. În carieră: Te potrivești în roluri care permit concentrare profundă și muncă independentă: programare, analiză de date, cercetare, scris, contabilitate sau design grafic.";
  }
}

function getAgreeablenessInterpretation(score: number): string {
  if (score >= 30) {
    return "PERSOANĂ EMPATICĂ, COOPERANTĂ: Ești cald, prietenos, empatic și cooperant. Ai încredere în oameni, îți pasă de bunăstarea lor și ești dispus să ajuți fără a aștepta ceva în schimb. Prețuiești armonia și eviți conflictele. În carieră: Ești un coechipier excelent. Te potrivești în roluri din domeniul medical, educație, resurse umane, servicii sociale, customer support sau orice rol care implică munca în echipă și ajutorarea altora.";
  } else {
    return "PERSOANĂ ANALITICĂ, INDEPENDENTĂ: Ești mai direct, sceptic și competitiv. Pui mai mult preț pe logică și pe interesele proprii decât pe sentimentele celorlalți. Nu te temi de confruntare și poți lua decizii dificile, obiective, fără a fi influențat de emoții. În carieră: Te potrivești în roluri care necesită decizii dure, negociere sau gândire critică: management superior, avocatură (litigii), analiză financiară, roluri de supervizare sau în armată.";
  }
}

function getNeuroticismInterpretation(score: number): string {
  if (score >= 30) {
    return "PERSOANĂ SENSIBILĂ, REACTIVĂ (Nevrotism ridicat): Experimentezi emoții negative precum anxietatea, tristețea sau furia mai intens și mai frecvent. Ești mai sensibil la stres și poți avea schimbări de dispoziție. Ești foarte conștient de posibilele amenințări din mediu. În carieră: Este important să găsești un mediu de lucru cu nivel redus de stres. Rolurile care necesită empatie (datorită sensibilității) sau atenție la risc (ex: controlul calității) pot fi potrivite, dar trebuie gestionat factorul de stres.";
  } else {
    return "PERSOANĂ CALMĂ, STABILĂ (Stabilitate emoțională ridicată): Ești calm, relaxat și rezistent la stres. Rareori te simți anxios sau deprimat și gestionezi situațiile dificile cu o atitudine echilibrată. Ești sigur pe tine și stabil din punct de vedere emoțional. În carieră: Te descurci excelent în medii cu presiune mare. Ești potrivit pentru roluri de management de criză, medicină de urgență, controlor de trafic aerian, forțe de ordine sau orice poziție de leadership care necesită o mână de fier.";
  }
}

function getOverallInterpretation(dimensions: BigFiveDimensions): string {
  const highDimensions = [];
  const lowDimensions = [];
  
  Object.entries(dimensions).forEach(([dimension, score]) => {
    if (score >= 70) highDimensions.push(dimension);
    if (score <= 30) lowDimensions.push(dimension);
  });

  if (highDimensions.length >= 3) {
    return "Profil echilibrat cu trăsături puternice";
  } else if (lowDimensions.length >= 3) {
    return "Profil stabil cu preferințe clare";
  } else {
    return "Profil mixt cu caracteristici diverse";
  }
}
