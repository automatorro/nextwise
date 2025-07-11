import { useMemo } from 'react';

interface Cattell16PFAnswers {
  [key: string]: number;
}

interface Cattell16PFDimensions {
  A: number; // Warmth (Reserved vs Outgoing)
  B: number; // Reasoning (Concrete vs Abstract)
  C: number; // Emotional Stability (Reactive vs Emotionally Stable)
  E: number; // Dominance (Deferential vs Dominant)
  F: number; // Liveliness (Serious vs Lively)
  G: number; // Rule-Consciousness (Expedient vs Rule-conscious)
  H: number; // Social Boldness (Shy vs Socially Bold)
  I: number; // Sensitivity (Utilitarian vs Sensitive)
  L: number; // Vigilance (Trusting vs Vigilant)
  M: number; // Abstractedness (Grounded vs Abstracted)
  N: number; // Privateness (Forthright vs Private)
  O: number; // Apprehension (Self-assured vs Apprehensive)
  Q1: number; // Openness to Change (Traditional vs Open to change)
  Q2: number; // Self-Reliance (Group-oriented vs Self-reliant)
  Q3: number; // Perfectionism (Tolerates disorder vs Perfectionistic)
  Q4: number; // Tension (Relaxed vs Tense)
  [key: string]: number;
}

export const useCattell16PFCalculation = (answers: Cattell16PFAnswers | undefined) => {
  return useMemo(() => {
    console.log('useCattell16PFCalculation called with answers:', answers);
    
    if (!answers) {
      console.log('No answers provided, returning zeros');
      return {
        A: 0, B: 0, C: 0, E: 0, F: 0, G: 0, H: 0, I: 0,
        L: 0, M: 0, N: 0, O: 0, Q1: 0, Q2: 0, Q3: 0, Q4: 0
      };
    }

    const answerKeys = Object.keys(answers);
    console.log('Answer keys:', answerKeys);
    
    // Check if we have UUID-based answers (16PF test format)
    if (answerKeys.length === 0 || !answerKeys.some(key => key.length > 10)) {
      console.log('No valid UUID keys found, not a 16PF test');
      return {
        A: 0, B: 0, C: 0, E: 0, F: 0, G: 0, H: 0, I: 0,
        L: 0, M: 0, N: 0, O: 0, Q1: 0, Q2: 0, Q3: 0, Q4: 0
      };
    }

    // Initialize dimension scores
    const dimensionScores: { [key: string]: number } = {
      A: 0, B: 0, C: 0, E: 0, F: 0, G: 0, H: 0, I: 0,
      L: 0, M: 0, N: 0, O: 0, Q1: 0, Q2: 0, Q3: 0, Q4: 0
    };

    // Questions mapping to dimensions with their weights
    // Based on actual 16PF structure from database - 48 questions, 3 per factor
    const questionMappings = [
      // Factor A (Questions 1-3)
      { factor: 'A', weight: 1 }, { factor: 'A', weight: -1 }, { factor: 'A', weight: 1 },
      
      // Factor B (Questions 4-6)
      { factor: 'B', weight: 1 }, { factor: 'B', weight: -1 }, { factor: 'B', weight: 1 },
      
      // Factor C (Questions 7-9)
      { factor: 'C', weight: 1 }, { factor: 'C', weight: -1 }, { factor: 'C', weight: 1 },
      
      // Factor E (Questions 10-12)
      { factor: 'E', weight: 1 }, { factor: 'E', weight: -1 }, { factor: 'E', weight: 1 },
      
      // Factor F (Questions 13-15)
      { factor: 'F', weight: 1 }, { factor: 'F', weight: -1 }, { factor: 'F', weight: 1 },
      
      // Factor G (Questions 16-18)
      { factor: 'G', weight: 1 }, { factor: 'G', weight: -1 }, { factor: 'G', weight: 1 },
      
      // Factor H (Questions 19-21)
      { factor: 'H', weight: 1 }, { factor: 'H', weight: -1 }, { factor: 'H', weight: 1 },
      
      // Factor I (Questions 22-24)
      { factor: 'I', weight: 1 }, { factor: 'I', weight: -1 }, { factor: 'I', weight: 1 },
      
      // Factor L (Questions 25-27)
      { factor: 'L', weight: 1 }, { factor: 'L', weight: -1 }, { factor: 'L', weight: 1 },
      
      // Factor M (Questions 28-30)
      { factor: 'M', weight: 1 }, { factor: 'M', weight: -1 }, { factor: 'M', weight: 1 },
      
      // Factor N (Questions 31-33)
      { factor: 'N', weight: -1 }, { factor: 'N', weight: 1 }, { factor: 'N', weight: -1 },
      
      // Factor O (Questions 34-36)
      { factor: 'O', weight: 1 }, { factor: 'O', weight: -1 }, { factor: 'O', weight: 1 },
      
      // Factor Q1 (Questions 37-39)
      { factor: 'Q1', weight: 1 }, { factor: 'Q1', weight: -1 }, { factor: 'Q1', weight: 1 },
      
      // Factor Q2 (Questions 40-42)
      { factor: 'Q2', weight: 1 }, { factor: 'Q2', weight: -1 }, { factor: 'Q2', weight: 1 },
      
      // Factor Q3 (Questions 43-45)
      { factor: 'Q3', weight: 1 }, { factor: 'Q3', weight: -1 }, { factor: 'Q3', weight: 1 },
      
      // Factor Q4 (Questions 46-48)
      { factor: 'Q4', weight: 1 }, { factor: 'Q4', weight: -1 }, { factor: 'Q4', weight: 1 }
    ];

    // Calculate scores using position-based mapping
    const sortedAnswerEntries = Object.entries(answers);
    console.log('Sorted answer entries count:', sortedAnswerEntries.length);

    sortedAnswerEntries.forEach(([, answer], index) => {
      if (index < questionMappings.length && answer !== undefined && answer !== null) {
        const mapping = questionMappings[index];
        const adjustedScore = mapping.weight > 0 ? answer : (6 - answer); // Reverse score for negative weights
        dimensionScores[mapping.factor] += adjustedScore;
        
        console.log(`Question ${index + 1} (${mapping.factor}): answer=${answer}, weight=${mapping.weight}, adjusted=${adjustedScore}`);
      }
    });

    // Convert raw scores to sten scores (1-10 scale)
    // Each factor has 3 questions, scored 1-5, so raw range is 3-15
    // Convert to sten scale (standard ten): 1-10 with mean=5.5, std=2
    const stenScores: Cattell16PFDimensions = {} as Cattell16PFDimensions;
    
    Object.keys(dimensionScores).forEach(factor => {
      const rawScore = dimensionScores[factor];
      // Convert raw score (3-15) to sten score (1-10)
      // Linear transformation: sten = 1 + 9 * (raw - 3) / (15 - 3)
      const sten = Math.max(1, Math.min(10, Math.round(1 + 9 * (rawScore - 3) / 12)));
      stenScores[factor as keyof Cattell16PFDimensions] = sten;
      
      console.log(`Factor ${factor}: raw score=${rawScore}, sten=${sten}`);
    });

    console.log('Final 16PF sten scores:', stenScores);
    console.log('Raw dimension scores:', dimensionScores);
    
    return stenScores;
  }, [answers]);
};