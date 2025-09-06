// src/types/tests.ts

// Defines the main categories of test results we can have.
export type TestResultType = 'dimensional' | 'profile' | 'scale' | 'role';

/**
 * The single, universal "contract" for any test result object in the application.
 * Every calculation function MUST return an object that conforms to this interface.
 */
export interface StandardizedScore {
  // MANDATORY: What kind of result is this? Determines which layout to use.
  type: TestResultType;

  // --- Common Properties (optional) ---
  overall?: number; // e.g., 85 (%)
  raw_score?: number; // e.g., 120
  max_score?: number; // e.g., 160
  interpretation?: string; // The main, overall interpretation text.

  // --- For 'dimensional' tests (Cattell, Big Five) ---
  dimensions?: {
    id: string;      // e.g., 'warmth'
    name: string;    // e.g., 'Warmth'
    score: number;   // e.g., 8 (out of 10)
  }[];
  detailed_interpretations?: {
    [key: string]: string; // e.g., { warmth: 'Sunteți o persoană caldă...' }
  };

  // --- For 'profile' tests (DISC, Enneagram) ---
  dominant_profile?: string; // e.g., 'Dominance'
  dominant_code?: string; // e.g., 'RIA' for Holland RIASEC tests
  // Contains descriptions for ALL possible profiles of the test
  profile_details?: { 
    [key: string]: { name: string; description: string };
  };

  // --- For 'scale' tests (BDI, GAD-7) ---
  scale_level?: string; // e.g., 'Depresie Ușoară'

  // --- For 'role' tests (Belbin) ---
  roles?: {
    primary: string[];
    secondary: string[];
  };
}