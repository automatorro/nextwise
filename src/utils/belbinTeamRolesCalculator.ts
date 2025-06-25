import { supabase } from '@/integrations/supabase/client';

export interface BelbinTeamRolesScore {
  overall: number;
  raw_score: number;
  max_score: number;
  dimensions: { [key: string]: number };
  interpretation: string;
  primary_roles: string[];
  secondary_roles: string[];
  role_scores: { [key: string]: number }; // Raw scores 0-18 for each role
}

// Belbin Team Roles scoring function using database weights
export async function calculateBelbinTeamRolesScoreFromDB(testTypeId: string, answers: { [key: string]: number }): Promise<BelbinTeamRolesScore> {
  console.log('Calculating Belbin Team Roles score using database weights for answers:', answers);
  
  try {
    // Fetch questions with scoring weights from database
    const { data: questions, error } = await supabase
      .from('test_questions')
      .select('id, question_order, scoring_weights')
      .eq('test_type_id', testTypeId)
      .order('question_order');

    if (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }

    if (!questions || questions.length === 0) {
      throw new Error('No questions found for this test');
    }

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

    // Calculate scores using database weights
    questions.forEach(question => {
      const questionId = question.id;
      const userAnswer = answers[questionId];
      
      if (userAnswer !== undefined && question.scoring_weights) {
        const weights = question.scoring_weights as any;
        const answerWeights = weights[userAnswer.toString()];
        
        if (answerWeights && typeof answerWeights === 'object') {
          Object.entries(answerWeights).forEach(([role, score]) => {
            if (roles.hasOwnProperty(role) && typeof score === 'number') {
              roles[role as keyof typeof roles] += score;
            }
          });
        }
      }
    });

    console.log('Calculated role scores:', roles);

    // Find primary and secondary roles based on scores
    const sortedRoles = Object.entries(roles)
      .sort(([,a], [,b]) => b - a)
      .map(([role, score]) => ({ role, score }));

    const primaryRoles = sortedRoles.slice(0, 2).map(r => r.role);
    const secondaryRoles = sortedRoles.slice(2, 4).map(r => r.role);

    // Generate role-specific interpretation
    const roleDescriptions: { [key: string]: string } = {
      plant: 'Plant (Creativul) - Aduce idei creative și inovatoare echipei',
      resource_investigator: 'Resource Investigator (Investigatorul) - Explorează oportunități și dezvoltă contacte',
      coordinator: 'Coordinator (Coordonatorul) - Clarifică obiectivele și promovează luarea deciziilor',
      shaper: 'Shaper (Modelatorul) - Provocă echipa să depășească obstacolele',
      monitor_evaluator: 'Monitor Evaluator (Evaluatorul) - Analizează opțiunile și judecă cu acuratețe',
      teamworker: 'Teamworker (Echipierul) - Cooperează și evită conflictele',
      implementer: 'Implementer (Implementatorul) - Transformă ideile în acțiuni practice',
      completer_finisher: 'Completer Finisher (Finalizatorul) - Caută erorile și respectă termenele',
      specialist: 'Specialist (Specialistul) - Aduce cunoștințe specializate'
    };

    const topRole = sortedRoles[0];
    const secondRole = sortedRoles[1];
    
    const interpretation = `Rolul tău dominant în echipă este ${roleDescriptions[topRole.role]} cu ${topRole.score} puncte, ` +
      `urmat de ${roleDescriptions[secondRole.role]} cu ${secondRole.score} puncte. ` +
      `Aceste roluri definesc modul în care contribui cel mai eficient la succesul echipei.`;

    // For compatibility, calculate a percentage based on highest possible score
    const maxPossiblePerRole = 18; // Maximum score per role in Belbin
    const topScorePercentage = Math.round((topRole.score / maxPossiblePerRole) * 100);

    return {
      overall: topScorePercentage, // Keep for compatibility but not used in UI
      raw_score: Object.values(roles).reduce((sum, score) => sum + score, 0),
      max_score: Object.keys(roles).length * maxPossiblePerRole,
      dimensions: roles, // Raw scores for each role
      interpretation,
      primary_roles: primaryRoles,
      secondary_roles: secondaryRoles,
      role_scores: roles // Explicit raw scores
    };

  } catch (error) {
    console.error('Database calculation failed, using fallback:', error);
    return calculateBelbinTeamRolesScore(answers);
  }
}

// Fallback calculation method (existing implementation)
export function calculateBelbinTeamRolesScore(answers: { [key: string]: number }): BelbinTeamRolesScore {
  console.log('Using fallback Belbin calculation for answers:', answers);
  
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

  // Find primary and secondary roles
  const sortedRoles = Object.entries(roles)
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
    roles,
    primaryRoles,
    secondaryRoles
  });

  return {
    overall: overallPercentage,
    raw_score: totalScore,
    max_score: maxPossibleScore,
    dimensions: roles,
    interpretation,
    primary_roles: primaryRoles,
    secondary_roles: secondaryRoles,
    role_scores: roles
  };
}
