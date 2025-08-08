
// src/utils/testCalculations/cattellCalculation.ts

interface Answers {
  [key: string]: number;
}

interface Dimensions {
  [key: string]: number;
}

const interpretationMap = {
  warmth: {
    low: "Sunteți o persoană rezervată, distantă și critică. Preferiți să lucrați singur și evitați compromisurile.",
    high: "Sunteți o persoană caldă, deschisă, amabilă și participativă. Vă place să lucrați cu oamenii."
  },
  reasoning: {
    low: "Aveți o gândire concretă și o capacitate de învățare mai lentă. Tindeți să renunțați ușor.",
    high: "Sunteți o persoană inteligentă, cu o gândire abstractă și o capacitate de învățare rapidă."
  },
  emotional_stability: {
    low: "Sunteți reactiv emoțional, schimbător și vă puteți supăra ușor. Sunteți considerat mai puțin stabil emoțional.",
    high: "Sunteți stabil emoțional, adaptabil și matur. Vă confruntați realist cu provocările vieții."
  },
  dominance: {
    low: "Sunteți o persoană cooperantă, evitați conflictele și sunteți supus și umil. Cedați ușor în fața altora.",
    high: "Sunteți dominant, asertiv și competitiv. Vă place să aveți controlul și să luați decizii."
  },
  liveliness: {
    low: "Sunteți serios, reținut și precaut. Tindeți să fiți tăcut și introspectiv.",
    high: "Sunteți entuziast, spontan și plin de viață. Vă bucurați de interacțiuni sociale."
  },
  rule_consciousness: {
    low: "Nu vă conformați regulilor, sunteți independent și ignorați normele sociale.",
    high: "Sunteți conștiincios, respectați regulile și aveți un simț puternic al datoriei."
  },
  social_boldness: {
    low: "Sunteți timid, reținut și sensibil la amenințări. Evitați situațiile sociale noi.",
    high: "Sunteți îndrăzneț social, aventuros și nu vă sfiiți să luați inițiativa."
  },
  sensitivity: {
    low: "Aveți o gândire rațională, sunteți practic și realist. Vă bazați pe logică, nu pe sentimente.",
    high: "Sunteți sensibil, empatic și intuitiv. Vă bazați pe sentimente și aveți interese artistice."
  },
  vigilance: {
    low: "Sunteți încrezător, acceptant și lipsit de gelozie sau invidie. Tindeți să aveți încredere în oameni.",
    high: "Sunteți suspicios, sceptic și precaut. Tindeți să nu aveți încredere în intențiile altora."
  },
  abstractedness: {
    low: "Sunteți practic, cu picioarele pe pământ și convențional. Vă concentrați pe realitatea imediată.",
    high: "Sunteți imaginativ, absorbit de idei și creativ. Puteți fi distras de la realitatea practică."
  },
  privateness: {
    low: "Sunteți direct, deschis și natural. Spuneți ce gândiți și sunteți ușor de citit.",
    high: "Sunteți discret, diplomat și rezervat. Nu vă dezvăluiți ușor gândurile sau sentimentele."
  },
  apprehension: {
    low: "Sunteți încrezător în forțele proprii, calm și sigur pe sine. Nu vă faceți griji excesive.",
    high: "Sunteți îngrijorat, nesigur și predispus la vinovăție. Vă faceți griji pentru viitor."
  },
  openness_to_change: {
    low: "Sunteți tradiționalist, conservator și respectați ideile consacrate. Rezistați la schimbare.",
    high: "Sunteți deschis la schimbare, experimental și liberal. Vă place să încercați lucruri noi."
  },
  self_reliance: {
    low: "Sunteți dependent de grup, preferați să fiți un adept și aveți nevoie de sprijin social.",
    high: "Sunteți independent, ingenios și preferați să luați propriile decizii."
  },
  perfectionism: {
    low: "Sunteți tolerant cu dezordinea, flexibil și nu sunteți constrâns de reguli stricte.",
    high: "Sunteți perfecționist, organizat și auto-disciplinat. Acordați o mare atenție detaliilor."
  },
  tension: {
    low: "Sunteți relaxat, liniștit și răbdător. Aveți un nivel scăzut de frustrare.",
    high: "Sunteți tensionat, energic și nerăbdător. Vă frustrați ușor."
  }
};

const questionFactorMap: { [key: number]: keyof Dimensions } = {
    1: 'warmth', 2: 'reasoning', 3: 'emotional_stability', 4: 'dominance', 5: 'liveliness',
    6: 'rule_consciousness', 7: 'social_boldness', 8: 'sensitivity', 9: 'vigilance',
    10: 'abstractedness', 11: 'privateness', 12: 'apprehension', 13: 'openness_to_change',
    14: 'self_reliance', 15: 'perfectionism', 16: 'tension', 17: 'warmth', 18: 'reasoning',
    19: 'emotional_stability', 20: 'dominance', 21: 'liveliness', 22: 'rule_consciousness',
    23: 'social_boldness', 24: 'sensitivity', 25: 'vigilance', 26: 'abstractedness',
    27: 'privateness', 28: 'apprehension', 29: 'openness_to_change', 30: 'self_reliance',
    31: 'perfectionism', 32: 'tension', 33: 'warmth', 34: 'reasoning', 35: 'emotional_stability',
    36: 'dominance', 37: 'liveliness', 38: 'rule_consciousness', 39: 'social_boldness',
    40: 'sensitivity', 41: 'vigilance', 42: 'abstractedness', 43: 'privateness',
    44: 'apprehension', 45: 'openness_to_change', 46: 'self_reliance', 47: 'perfectionism', 48: 'tension'
};

const factorKeys = Object.keys(interpretationMap) as (keyof Dimensions)[];

export function calculateCattellScore(answers: Answers) {
    const rawScores: Dimensions = factorKeys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
    const MAX_SCORE_PER_FACTOR = 15;

    for (const questionId in answers) {
        const questionNumber = parseInt(questionId.replace('question-', ''), 10);
        const answerValue = answers[questionId];

        if (!isNaN(questionNumber) && questionFactorMap[questionNumber] && answerValue >= 1 && answerValue <= 5) {
            const factor = questionFactorMap[questionNumber];
            rawScores[factor] += answerValue;
        }
    }

    const normalizedScores: Dimensions = {};
    const detailedInterpretations: { [key: string]: string } = {};
    let totalNormalizedScore = 0;

    for (const factor of factorKeys) {
        const score = rawScores[factor] || 0;
        const normalized = Math.round((score / MAX_SCORE_PER_FACTOR) * 9) + 1;
        normalizedScores[factor] = normalized;
        totalNormalizedScore += score;

        // Determine interpretation based on normalized score (scale 1-10)
        detailedInterpretations[factor] = normalized <= 5 ? interpretationMap[factor].low : interpretationMap[factor].high;
    }

    const MAX_TOTAL_SCORE = factorKeys.length * MAX_SCORE_PER_FACTOR;
    const overallPercentage = Math.round((totalNormalizedScore / MAX_TOTAL_SCORE) * 100);

    return {
        dimensions: normalizedScores,
        detailed_interpretations: detailedInterpretations,
        overall: overallPercentage,
        raw_score: totalNormalizedScore,
        max_score: MAX_TOTAL_SCORE,
        interpretation: "Rezultatele tale indică un profil de personalitate complex. Mai jos găsești o analiză detaliată a fiecărui factor."
    };
}
