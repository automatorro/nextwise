
import {
  getDISCExplanation,
  getDISCBadgeVariant,
} from "@/utils/scoring/discExplanations";
import {
  getBigFiveExplanation,
  getBigFiveBadgeVariant,
} from "@/utils/scoring/bigFiveExplanations";

// Types for explanation structure
export interface TestExplanation {
  description: string;
  scoreRanges?: Array<{
    range: string;
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  whatItMeans?: string;
}

// Default explanation
const defaultExplanation: TestExplanation = {
  description: "Ne pare rău, nu avem o explicație detaliată pentru acest test momentan. Însă, te încurajăm să explorezi alte teste și să revii mai târziu pentru a vedea dacă am adăugat informații suplimentare.",
  whatItMeans: "Rezultatele tale oferă o imagine generală asupra performanței la acest test."
};

const watsonGlaserExplanation: TestExplanation = {
  description: "Watson-Glaser Critical Thinking Appraisal evaluează capacitatea de gândire critică prin 5 dimensiuni: inferențe, asumpții, deducție, interpretare și evaluarea argumentelor.",
  scoreRanges: [
    { range: "85-100%", label: "Superior - Abilități excepționale", variant: "default" },
    { range: "70-84%", label: "Peste medie - Abilități bune", variant: "secondary" },
    { range: "55-69%", label: "Mediu - Abilități moderate", variant: "outline" },
    { range: "40-54%", label: "Sub medie - Necesită dezvoltare", variant: "destructive" },
    { range: "0-39%", label: "Scăzut - Necesită îmbunătățire semnificativă", variant: "destructive" }
  ],
  whatItMeans: "Scorul tău reflectă capacitatea de a analiza obiectiv informațiile, identifica presupuneri, trage concluzii logice și evalua argumentele în situații complexe."
};

const discExplanation: TestExplanation = {
  description: "DISC Assessment măsoară patru stiluri comportamentale: Dominanța, Influența, Stabilitatea și Conștiinciozitatea.",
  scoreRanges: [
    { range: "80-100%", label: "Trăsătură dominantă", variant: "default" },
    { range: "60-79%", label: "Trăsătură puternică", variant: "secondary" },
    { range: "40-59%", label: "Trăsătură moderată", variant: "outline" },
    { range: "0-39%", label: "Trăsătură mai puțin prezentă", variant: "destructive" }
  ],
  whatItMeans: "Profilul tău DISC arată stilurile tale comportamentale preferate în diferite situații profesionale și sociale."
};

const bigFiveExplanation: TestExplanation = {
  description: "Big Five evaluează cinci dimensiuni fundamentale ale personalității: Deschiderea, Conștiinciozitatea, Extraversiunea, Agreabilitatea și Neurotismul.",
  scoreRanges: [
    { range: "80-100%", label: "Trăsătură foarte pronunțată", variant: "default" },
    { range: "60-79%", label: "Trăsătură puternică", variant: "secondary" },
    { range: "40-59%", label: "Trăsătură moderată", variant: "outline" },
    { range: "20-39%", label: "Trăsătură mai puțin prezentă", variant: "destructive" },
    { range: "0-19%", label: "Trăsătură foarte slabă", variant: "destructive" }
  ],
  whatItMeans: "Profilul tău de personalitate arată cum te poziționezi pe cele cinci dimensiuni universale ale personalității umane."
};

export const getTestScoringExplanation = (testName: string): TestExplanation => {
  const normalizedTestName = testName.toLowerCase();
  
  if (normalizedTestName.includes('disc')) {
    return discExplanation;
  }
  
  if (normalizedTestName.includes('big five')) {
    return bigFiveExplanation;
  }
  
  if (normalizedTestName.includes('watson') || normalizedTestName.includes('glaser') || normalizedTestName.includes('critical thinking')) {
    return watsonGlaserExplanation;
  }
  
  return defaultExplanation;
};

export const getScoreBadgeVariant = (testName: string, scoreKey: string): string => {
  const normalizedTestName = testName.toLowerCase();

  if (normalizedTestName.includes('disc')) {
      return getDISCBadgeVariant(scoreKey);
  }

  if (normalizedTestName.includes('big five')) {
      return getBigFiveBadgeVariant(scoreKey);
  }

  return 'default';
};

// Export the dimension explanation function
export const getDimensionExplanation = (testName: string, dimensionKey: string): string => {
  const normalizedTestName = testName.toLowerCase();
  
  // Generic dimension explanations
  const genericExplanations: { [key: string]: string } = {
    // Big Five
    openness: 'Deschiderea către experiență măsoară creativitatea, curiozitatea intelectuală și deschiderea către idei noi.',
    conscientiousness: 'Conștiinciozitatea reflectă organizarea, disciplina și orientarea către obiective.',
    extraversion: 'Extraversiunea indică sociabilitatea, energia și căutarea stimulării sociale.',
    agreeableness: 'Agreabilitatea măsoară cooperarea, încrederea și orientarea către alții.',
    neuroticism: 'Neurotismul reflectă stabilitatea emoțională și gestionarea stresului.',
    
    // DISC
    dominance: 'Dominanța indică orientarea către rezultate, direct și competitiv.',
    influence: 'Influența reflectă sociabilitatea, optimismul și persuasiunea.',
    steadiness: 'Stabilitatea măsoară calmul, răbdarea și cooperarea.',
    compliance: 'Conformitatea indică analiticul, precizia și orientarea către calitate.',
    
    // Watson-Glaser
    inference: 'Capacitatea de a trage concluzii logice din informațiile disponibile.',
    assumptions: 'Identificarea premiselor implicite în argumentări și declarații.',
    deduction: 'Aplicarea principiilor logice pentru a determina validitatea concluziilor.',
    interpretation: 'Evaluarea și interpretarea corectă a informațiilor și datelor.',
    argument_evaluation: 'Distingerea între argumentele puternice și cele slabe în luarea deciziilor.'
  };
  
  return genericExplanations[dimensionKey] || `Dimensiunea ${dimensionKey} este evaluată în cadrul acestui test.`;
};
