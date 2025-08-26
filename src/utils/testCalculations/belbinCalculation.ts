import { supabase } from '@/integrations/supabase/client';
import { StandardizedScore } from '@/types/tests';

export interface BelbinScore {
  overall: number;
  dimensions: {
    plant: number;
    resource_investigator: number;
    coordinator: number;
    shaper: number;
    monitor_evaluator: number;
    teamworker: number;
    implementer: number;
    completer_finisher: number;
    specialist: number;
  };
  primary_roles: string[];
  secondary_roles: string[];
  interpretation: string;
}

export const calculateBelbinScore = (answers: Record<string, number>): StandardizedScore => {
  const roleScores = {
    plant: 0,
    resource_investigator: 0,
    coordinator: 0,
    shaper: 0,
    monitor_evaluator: 0,
    teamworker: 0,
    implementer: 0,
    completer_finisher: 0,
    specialist: 0
  };
  
  // Maparea întrebărilor la roluri (presupunem 36 întrebări, câte 4 pentru fiecare rol)
  Object.entries(answers).forEach(([questionId, answer]) => {
    const questionNumber = parseInt(questionId.split('-')[1]);
    
    if (questionNumber >= 1 && questionNumber <= 4) {
      roleScores.plant += answer;
    } else if (questionNumber >= 5 && questionNumber <= 8) {
      roleScores.resource_investigator += answer;
    } else if (questionNumber >= 9 && questionNumber <= 12) {
      roleScores.coordinator += answer;
    } else if (questionNumber >= 13 && questionNumber <= 16) {
      roleScores.shaper += answer;
    } else if (questionNumber >= 17 && questionNumber <= 20) {
      roleScores.monitor_evaluator += answer;
    } else if (questionNumber >= 21 && questionNumber <= 24) {
      roleScores.teamworker += answer;
    } else if (questionNumber >= 25 && questionNumber <= 28) {
      roleScores.implementer += answer;
    } else if (questionNumber >= 29 && questionNumber <= 32) {
      roleScores.completer_finisher += answer;
    } else if (questionNumber >= 33 && questionNumber <= 36) {
      roleScores.specialist += answer;
    }
  });
  
  // Normalizarea la procente
  const maxScorePerRole = 4 * 4; // 4 întrebări × 4 puncte maxim
  const normalizedScores = Object.fromEntries(
    Object.entries(roleScores).map(([role, score]) => [
      role,
      Math.round((score / maxScorePerRole) * 100)
    ])
  ) as typeof roleScores;
  
  // Sortarea rolurilor după scor
  const sortedRoles = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
  
  const primary_roles = sortedRoles.slice(0, 2).map(([role]) => role);
  const secondary_roles = sortedRoles.slice(2, 4).map(([role]) => role);
  
  const overall = Math.round(Object.values(normalizedScores).reduce((sum, score) => sum + score, 0) / 9);
  
  const roleNames = {
    plant: 'Plant (Creativul)',
    resource_investigator: 'Resource Investigator (Investigatorul)',
    coordinator: 'Coordinator (Coordonatorul)',
    shaper: 'Shaper (Modelatorul)',
    monitor_evaluator: 'Monitor Evaluator (Evaluatorul)',
    teamworker: 'Teamworker (Echipierul)',
    implementer: 'Implementer (Implementatorul)',
    completer_finisher: 'Completer Finisher (Finalizatorul)',
    specialist: 'Specialist (Specialistul)'
  };
  
  // Convert to dimensions array format for StandardizedScore
  const dimensions = Object.entries(normalizedScores).map(([key, score]) => ({
    id: key,
    name: roleNames[key as keyof typeof roleNames],
    score: Math.round(score * 18 / 100), // Convert back to 0-18 scale for display
    percentage: score
  }));

  // Return in StandardizedScore format for role-based tests
  return {
    type: 'role',
    overall: Math.round(overall),
    raw_score: Math.round(overall),
    max_score: 18,
    interpretation: `Rolurile tale principale sunt: ${primary_roles.map(role => roleNames[role as keyof typeof roleNames]).join(', ')}`,
    dimensions,
    roles: {
      primary: primary_roles.map(role => roleNames[role as keyof typeof roleNames]),
      secondary: secondary_roles.map(role => roleNames[role as keyof typeof roleNames])
    }
  };
};
