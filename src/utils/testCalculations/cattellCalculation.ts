import { StandardizedScore } from '@/types/tests';

interface CattellAnswers {
  [key: string]: number;
}
interface Dimensions {
    [key: string]: number;
}

// ... [restul codului, interpretationMap, factorKeys, questionFactorMap rămân la fel]
const interpretationMap = {
    warmth: { low: "Sunteți o persoană rezervată, distantă și critică.", high: "Sunteți o persoană caldă, deschisă și amabilă." },
    reasoning: { low: "Aveți o gândire concretă și o capacitate de învățare mai lentă.", high: "Sunteți o persoană inteligentă, cu o gândire abstractă." },
    emotional_stability: { low: "Sunteți reactiv emoțional și schimbător.", high: "Sunteți stabil emoțional, adaptabil și matur." },
    dominance: { low: "Sunteți cooperant, evitați conflictele și sunteți supus.", high: "Sunteți dominant, asertiv și competitiv." },
    liveliness: { low: "Sunteți serios, reținut și precaut.", high: "Sunteți entuziast, spontan și plin de viață." },
    rule_consciousness: { low: "Nu vă conformați regulilor, sunteți independent.", high: "Sunteți conștiincios și respectați regulile." },
    social_boldness: { low: "Sunteți timid, reținut și sensibil la amenințări.", high: "Sunteți îndrăzneț social și aventuros." },
    sensitivity: { low: "Aveți o gândire rațională, practică și realistă.", high: "Sunteți sensibil, empatic și intuitiv." },
    vigilance: { low: "Sunteți încrezător și acceptant.", high: "Sunteți suspicios, sceptic și precaut." },
    abstractedness: { low: "Sunteți practic și cu picioarele pe pământ.", high: "Sunteți imaginativ și absorbit de idei." },
    privateness: { low: "Sunteți direct, deschis și natural.", high: "Sunteți discret, diplomat și rezervat." },
    apprehension: { low: "Sunteți încrezător în forțele proprii și calm.", high: "Sunteți îngrijorat, nesigur și predispus la vinovăție." },
    openness_to_change: { low: "Sunteți tradiționalist și conservator.", high: "Sunteți deschis la schimbare și experimental." },
    self_reliance: { low: "Sunteți dependent de grup și aveți nevoie de sprijin.", high: "Sunteți independent și ingenios." },
    perfectionism: { low: "Sunteți tolerant cu dezordinea și flexibil.", high: "Sunteți perfecționist, organizat și auto-disciplinat." },
    tension: { low: "Sunteți relaxat, liniștit și răbdător.", high: "Sunteți tensionat, energic și nerăbdător." }
};

const factorKeys = Object.keys(interpretationMap) as (keyof Dimensions)[];

const questionFactorMap: { [key: number]: keyof Dimensions } = {
    1: 'warmth', 2: 'reasoning', 3: 'emotional_stability', 4: 'dominance', 5: 'liveliness', 6: 'rule_consciousness', 7: 'social_boldness', 8: 'sensitivity', 9: 'vigilance', 10: 'abstractedness', 11: 'privateness', 12: 'apprehension', 13: 'openness_to_change', 14: 'self_reliance', 15: 'perfectionism', 16: 'tension', 17: 'warmth', 18: 'reasoning', 19: 'emotional_stability', 20: 'dominance', 21: 'liveliness', 22: 'rule_consciousness', 23: 'social_boldness', 24: 'sensitivity', 25: 'vigilance', 26: 'abstractedness', 27: 'privateness', 28: 'apprehension', 29: 'openness_to_change', 30: 'self_reliance', 31: 'perfectionism', 32: 'tension', 33: 'warmth', 34: 'reasoning', 35: 'emotional_stability', 36: 'dominance', 37: 'liveliness', 38: 'rule_consciousness', 39: 'social_boldness', 40: 'sensitivity', 41: 'vigilance', 42: 'abstractedness', 43: 'privateness', 44: 'apprehension', 45: 'openness_to_change', 46: 'self_reliance', 47: 'perfectionism', 48: 'tension'
};


export function calculateCattellScore(answers: CattellAnswers): StandardizedScore {
    const rawScores: Dimensions = factorKeys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
    const MAX_SCORE_PER_FACTOR = 15;

    // THE "BULLETPROOF" FIX IS HERE: We use Object.keys() to get a guaranteed string array.
    Object.keys(answers).forEach(questionId => {
        // Now, TypeScript knows for a fact that questionId is a string.
        const questionNumber = parseInt(questionId.replace('question-', ''), 10);
        const answerValue = answers[questionId];
        if (!isNaN(questionNumber) && questionFactorMap[questionNumber] && answerValue >= 1 && answerValue <= 5) {
            const factor = questionFactorMap[questionNumber];
            rawScores[factor] += answerValue;
        }
    });

    const dimensions: { id: string; name: string; score: number }[] = [];
    const detailed_interpretations: { [key: string]: string } = {};
    let totalRawScore = 0;

    for (const factor of factorKeys) {
        const score = rawScores[factor] || 0;
        const normalized = Math.round((score / MAX_SCORE_PER_FACTOR) * 9) + 1;
        
        dimensions.push({ id: factor, name: factor.replace(/_/g, ' '), score: normalized });
        detailed_interpretations[factor] = normalized <= 5 ? interpretationMap[factor].low : interpretationMap[factor].high;
        totalRawScore += score;
    }

    const MAX_TOTAL_SCORE = factorKeys.length * MAX_SCORE_PER_FACTOR;
    const overallPercentage = Math.round((totalRawScore / MAX_TOTAL_SCORE) * 100);

    return {
        type: 'dimensional',
        overall: overallPercentage,
        raw_score: totalRawScore,
        max_score: MAX_TOTAL_SCORE,
        interpretation: "Rezultatele tale indică un profil de personalitate complex. Mai jos găsești o analiză detaliată a fiecărui factor.",
        dimensions,
        detailed_interpretations,
    };
}