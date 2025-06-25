
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
    
    // Each answer contributes differently to each role
    // This is a simplified scoring - in reality, each question option would have different weights
    switch (selectedOption) {
      case 0: // First option
        if (questionNumber % 9 === 1) roles.plant += 3;
        else if (questionNumber % 9 === 2) roles.teamworker += 3;
        else if (questionNumber % 9 === 3) roles.resource_investigator += 3;
        else if (questionNumber % 9 === 4) roles.implementer += 3;
        else if (questionNumber % 9 === 5) roles.teamworker += 3;
        else if (questionNumber % 9 === 6) roles.shaper += 3;
        else if (questionNumber % 9 === 7) roles.plant += 3;
        else if (questionNumber % 9 === 8) roles.completer_finisher += 3;
        else roles.teamworker += 3;
        break;
        
      case 1: // Second option
        if (questionNumber % 9 === 1) roles.resource_investigator += 3;
        else if (questionNumber % 9 === 2) roles.implementer += 3;
        else if (questionNumber % 9 === 3) roles.coordinator += 3;
        else if (questionNumber % 9 === 4) roles.completer_finisher += 3;
        else if (questionNumber % 9 === 5) roles.implementer += 3;
        else if (questionNumber % 9 === 6) roles.monitor_evaluator += 3;
        else if (questionNumber % 9 === 7) roles.resource_investigator += 3;
        else if (questionNumber % 9 === 8) roles.specialist += 3;
        else roles.monitor_evaluator += 3;
        break;
        
      case 2: // Third option
        if (questionNumber % 9 === 1) roles.coordinator += 3;
        else if (questionNumber % 9 === 2) roles.completer_finisher += 3;
        else if (questionNumber % 9 === 3) roles.shaper += 3;
        else if (questionNumber % 9 === 4) roles.specialist += 3;
        else if (questionNumber % 9 === 5) roles.monitor_evaluator += 3;
        else if (questionNumber % 9 === 6) roles.teamworker += 3;
        else if (questionNumber % 9 === 7) roles.coordinator += 3;
        else if (questionNumber % 9 === 8) roles.plant += 3;
        else roles.coordinator += 3;
        break;
        
      case 3: // Fourth option
        if (questionNumber % 9 === 1) roles.shaper += 3;
        else if (questionNumber % 9 === 2) roles.specialist += 3;
        else if (questionNumber % 9 === 3) roles.monitor_evaluator += 3;
        else if (questionNumber % 9 === 4) roles.plant += 3;
        else if (questionNumber % 9 === 5) roles.shaper += 3;
        else if (questionNumber % 9 === 6) roles.implementer += 3;
        else if (questionNumber % 9 === 7) roles.monitor_evaluator += 3;
        else if (questionNumber % 9 === 8) roles.shaper += 3;
        else roles.shaper += 3;
        break;
        
      case 4: // Fifth option
        if (questionNumber % 9 === 1) roles.monitor_evaluator += 3;
        else if (questionNumber % 9 === 2) roles.plant += 3;
        else if (questionNumber % 9 === 3) roles.teamworker += 3;
        else if (questionNumber % 9 === 4) roles.resource_investigator += 3;
        else if (questionNumber % 9 === 5) roles.coordinator += 3;
        else if (questionNumber % 9 === 6) roles.completer_finisher += 3;
        else if (questionNumber % 9 === 7) roles.implementer += 3;
        else if (questionNumber % 9 === 8) roles.resource_investigator += 3;
        else roles.specialist += 3;
        break;
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
