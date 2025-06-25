
import { getScoreInterpretation } from './testScoring';

export interface BelbinTeamRolesScore {
  overall: number;
  raw_score: number;
  max_score: number;
  dimensions: { [key: string]: number };
  interpretation: string;
  primary_roles: string[];
  secondary_roles: string[];
}

// Belbin Team Roles scoring function
export function calculateBelbinTeamRolesScore(answers: { [key: string]: number }): BelbinTeamRolesScore {
  console.log('Calculating Belbin Team Roles score for answers:', answers);
  
  const roles = {
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

  let totalScore = 0;
  const maxPossibleScore = Object.keys(answers).length * 3; // Each question max contribution is 3

  // Calculate scores for each role based on answers
  Object.entries(answers).forEach(([questionId, selectedOption]) => {
    const questionNumber = parseInt(questionId.replace(/\D/g, ''));
    
    // Map each question and option to the appropriate roles
    // The scoring system uses a direct mapping based on the question content
    const scoreMapping = {
      1: { 0: 'plant', 1: 'resource_investigator', 2: 'coordinator', 3: 'shaper', 4: 'monitor_evaluator' },
      2: { 0: 'teamworker', 1: 'implementer', 2: 'completer_finisher', 3: 'specialist', 4: 'plant' },
      3: { 0: 'resource_investigator', 1: 'coordinator', 2: 'shaper', 3: 'monitor_evaluator', 4: 'teamworker' },
      4: { 0: 'implementer', 1: 'completer_finisher', 2: 'specialist', 3: 'plant', 4: 'resource_investigator' },
      5: { 0: 'teamworker', 1: 'implementer', 2: 'monitor_evaluator', 3: 'shaper', 4: 'coordinator' },
      6: { 0: 'shaper', 1: 'monitor_evaluator', 2: 'teamworker', 3: 'implementer', 4: 'completer_finisher' },
      7: { 0: 'plant', 1: 'resource_investigator', 2: 'coordinator', 3: 'monitor_evaluator', 4: 'implementer' },
      8: { 0: 'completer_finisher', 1: 'specialist', 2: 'plant', 3: 'shaper', 4: 'resource_investigator' },
      9: { 0: 'teamworker', 1: 'implementer', 2: 'completer_finisher', 3: 'specialist', 4: 'coordinator' },
      10: { 0: 'monitor_evaluator', 1: 'implementer', 2: 'completer_finisher', 3: 'plant', 4: 'resource_investigator' },
      11: { 0: 'coordinator', 1: 'shaper', 2: 'specialist', 3: 'plant', 4: 'resource_investigator' },
      12: { 0: 'monitor_evaluator', 1: 'implementer', 2: 'completer_finisher', 3: 'shaper', 4: 'plant' },
      13: { 0: 'teamworker', 1: 'implementer', 2: 'completer_finisher', 3: 'specialist', 4: 'plant' },
      14: { 0: 'coordinator', 1: 'shaper', 2: 'completer_finisher', 3: 'specialist', 4: 'plant' },
      15: { 0: 'plant', 1: 'resource_investigator', 2: 'coordinator', 3: 'shaper', 4: 'completer_finisher' },
      16: { 0: 'specialist', 1: 'plant', 2: 'implementer', 3: 'shaper', 4: 'monitor_evaluator' },
      17: { 0: 'teamworker', 1: 'implementer', 2: 'completer_finisher', 3: 'specialist', 4: 'plant' },
      18: { 0: 'monitor_evaluator', 1: 'resource_investigator', 2: 'coordinator', 3: 'shaper', 4: 'implementer' },
      19: { 0: 'teamworker', 1: 'monitor_evaluator', 2: 'implementer', 3: 'completer_finisher', 4: 'plant' },
      20: { 0: 'specialist', 1: 'plant', 2: 'resource_investigator', 3: 'coordinator', 4: 'shaper' },
      21: { 0: 'monitor_evaluator', 1: 'implementer', 2: 'completer_finisher', 3: 'specialist', 4: 'plant' },
      22: { 0: 'coordinator', 1: 'specialist', 2: 'resource_investigator', 3: 'completer_finisher', 4: 'shaper' },
      23: { 0: 'teamworker', 1: 'implementer', 2: 'completer_finisher', 3: 'specialist', 4: 'plant' },
      24: { 0: 'monitor_evaluator', 1: 'implementer', 2: 'completer_finisher', 3: 'specialist', 4: 'plant' },
      25: { 0: 'teamworker', 1: 'implementer', 2: 'completer_finisher', 3: 'specialist', 4: 'coordinator' },
      26: { 0: 'plant', 1: 'resource_investigator', 2: 'coordinator', 3: 'shaper', 4: 'monitor_evaluator' },
      27: { 0: 'teamworker', 1: 'implementer', 2: 'completer_finisher', 3: 'specialist', 4: 'plant' }
    };

    const mapping = scoreMapping[questionNumber as keyof typeof scoreMapping];
    if (mapping && mapping[selectedOption as keyof typeof mapping]) {
      const roleKey = mapping[selectedOption as keyof typeof mapping] as keyof typeof roles;
      roles[roleKey] += 3; // Each answer contributes 3 points to the selected role
    }
    
    totalScore += selectedOption;
  });

  // Convert to percentages and find dominant roles
  const rolePercentages: { [key: string]: number } = {};
  const maxRoleScore = Math.max(...Object.values(roles));
  
  Object.entries(roles).forEach(([role, score]) => {
    rolePercentages[role] = Math.round((score / (maxRoleScore || 1)) * 100);
  });

  // Identify primary and secondary roles
  const sortedRoles = Object.entries(rolePercentages)
    .sort(([,a], [,b]) => b - a)
    .map(([role]) => role);

  const primaryRoles = sortedRoles.slice(0, 2);
  const secondaryRoles = sortedRoles.slice(2, 4);

  // Generate interpretation based on primary roles
  const roleDescriptions: { [key: string]: string } = {
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

  const primaryRoleNames = primaryRoles.map(role => roleDescriptions[role]).join(' și ');
  
  const interpretation = `Rolurile tale dominante în echipă sunt: ${primaryRoleNames}. ` +
    `Aceasta înseamnă că aduci o combinație unică de abilități echipei și contribui cel mai bine ` +
    `prin aceste stiluri de comportament. Fiecare rol Belbin are forțe distincte și contribuții valoroase la succesul echipei.`;

  const overallPercentage = Math.round((totalScore / maxPossibleScore) * 100);

  console.log('Belbin Team Roles calculated scores:', {
    totalScore,
    maxPossibleScore,
    overallPercentage,
    roles: rolePercentages,
    primaryRoles,
    secondaryRoles
  });

  return {
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: maxPossibleScore,
    dimensions: rolePercentages,
    interpretation,
    primary_roles: primaryRoles,
    secondary_roles: secondaryRoles
  };
}
