
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getDimensionLabel } from '@/utils/testLabels';
import { useLanguage } from '@/hooks/useLanguage';

interface BelbinRoleResultsProps {
  roleScores: { [key: string]: number };
  primaryRoles: string[];
  secondaryRoles: string[];
  interpretation: string;
}

const BelbinRoleResults = ({ 
  roleScores, 
  primaryRoles, 
  secondaryRoles, 
  interpretation 
}: BelbinRoleResultsProps) => {
  const { language } = useLanguage();
  const maxScore = 18; // Maximum possible score per role in Belbin

  const roleDescriptions: { [key: string]: { name: { en: string; ro: string }; description: { en: string; ro: string } } } = {
    plant: { 
      name: { 
        en: 'Plant (The Creative)', 
        ro: 'Plant (Creativul)' 
      },
      description: { 
        en: 'Generates creative ideas and innovative solutions to problems',
        ro: 'Generează idei creative și soluții inovatoare pentru probleme'
      }
    },
    resource_investigator: { 
      name: { 
        en: 'Resource Investigator', 
        ro: 'Resource Investigator (Investigatorul)' 
      },
      description: { 
        en: 'Explores opportunities and develops external contacts',
        ro: 'Explorează oportunități și dezvoltă contacte externe'
      }
    },
    coordinator: { 
      name: { 
        en: 'Coordinator', 
        ro: 'Coordinator (Coordonatorul)' 
      },
      description: { 
        en: 'Clarifies objectives and promotes decision-making',
        ro: 'Clarifică obiectivele și promovează luarea deciziilor'
      }
    },
    shaper: { 
      name: { 
        en: 'Shaper', 
        ro: 'Shaper (Modelatorul)' 
      },
      description: { 
        en: 'Challenges the team to overcome obstacles and difficulties',
        ro: 'Provocă echipa să depășească obstacolele și dificultățile'
      }
    },
    monitor_evaluator: { 
      name: { 
        en: 'Monitor Evaluator', 
        ro: 'Monitor Evaluator (Evaluatorul)' 
      },
      description: { 
        en: 'Analyzes options and judges with accuracy and objectivity',
        ro: 'Analizează opțiunile și judecă cu acuratețe și obiectivitate'
      }
    },
    teamworker: { 
      name: { 
        en: 'Teamworker', 
        ro: 'Teamworker (Echipierul)' 
      },
      description: { 
        en: 'Cooperates efficiently and avoids conflicts in the team',
        ro: 'Cooperează eficient și evită conflictele în echipă'
      }
    },
    implementer: { 
      name: { 
        en: 'Implementer', 
        ro: 'Implementer (Implementatorul)' 
      },
      description: { 
        en: 'Transforms ideas into practical and organized actions',
        ro: 'Transformă ideile în acțiuni practice și organizate'
      }
    },
    completer_finisher: { 
      name: { 
        en: 'Completer Finisher', 
        ro: 'Completer Finisher (Finalizatorul)' 
      },
      description: { 
        en: 'Searches for errors and ensures everything is completed on time',
        ro: 'Caută erorile și se asigură că totul este finalizat la timp'
      }
    },
    specialist: { 
      name: { 
        en: 'Specialist', 
        ro: 'Specialist (Specialistul)' 
      },
      description: { 
        en: 'Brings specialized knowledge and skills in their field',
        ro: 'Aduce cunoștințe și abilități specializate în domeniul său'
      }
    }
  };

  const labels = {
    interpretationTitle: language === 'en' ? 'Belbin Results Interpretation' : 'Interpretarea Rezultatelor Belbin',
    dominantRoles: language === 'en' ? 'Your Dominant Roles' : 'Rolurile Tale Dominante',
    pointsMax: language === 'en' ? 'Points (max. 18)' : 'Puncte (max. 18)',
    completeScores: language === 'en' ? 'Complete Role Scores' : 'Scorurile Complete pe Roluri',
    scaleDescription: language === 'en' ? 'Each role is evaluated on a scale from 0 to 18 points' : 'Fiecare rol este evaluat pe o scală de la 0 la 18 puncte',
    primary: language === 'en' ? 'Primary' : 'Primar',
    secondary: language === 'en' ? 'Secondary' : 'Secundar',
    points: language === 'en' ? 'points' : 'puncte',
    interpretationGuide: language === 'en' ? 'Interpretation Guide' : 'Ghid de Interpretare',
    highScores: language === 'en' ? 'High scores (12-18 points):' : 'Scoruri ridicate (12-18 puncte):',
    highScoresDesc: language === 'en' ? 'Very pronounced roles that define your dominant style of team contribution.' : 'Roluri foarte pronunțate care definesc stilul tău dominant de contribuție în echipă.',
    moderateScores: language === 'en' ? 'Moderate scores (6-11 points):' : 'Scoruri moderate (6-11 puncte):',
    moderateScoresDesc: language === 'en' ? 'Roles that can be developed and used in certain contexts.' : 'Roluri care pot fi dezvoltate și folosite în anumite contexte.',
    lowScores: language === 'en' ? 'Low scores (0-5 points):' : 'Scoruri scăzute (0-5 puncte):',
    lowScoresDesc: language === 'en' ? 'Roles that are not natural for you, but can be learned if necessary.' : 'Roluri care nu sunt naturale pentru tine, dar pot fi învățate dacă este necesar.'
  };

  // Sort roles by score for better display
  const sortedRoles = Object.entries(roleScores)
    .sort(([,a], [,b]) => b - a)
    .map(([role, score]) => ({ role, score }));

  return (
    <div className="space-y-6">
      {/* Overall Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle>{labels.interpretationTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{interpretation}</p>
        </CardContent>
      </Card>

      {/* Primary Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {labels.dominantRoles}
            <Badge variant="default">{labels.pointsMax}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedRoles.slice(0, 2).map(({ role, score }) => (
              <div key={role} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-900">
                    {roleDescriptions[role]?.name[language] || getDimensionLabel('belbin', role)}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-700">{score}</span>
                    <span className="text-sm text-blue-600">/ {maxScore}</span>
                  </div>
                </div>
                <Progress value={(score / maxScore) * 100} className="mb-2" />
                <p className="text-sm text-blue-800">
                  {roleDescriptions[role]?.description[language]}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Role Scores */}
      <Card>
        <CardHeader>
          <CardTitle>{labels.completeScores}</CardTitle>
          <p className="text-sm text-gray-600">
            {labels.scaleDescription}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedRoles.map(({ role, score }, index) => {
              const isPrimary = index < 2;
              const isSecondary = index >= 2 && index < 4;
              
              return (
                <div key={role} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">
                      {roleDescriptions[role]?.name[language] || getDimensionLabel('belbin', role)}
                    </span>
                    {isPrimary && <Badge variant="default" className="text-xs">{labels.primary}</Badge>}
                    {isSecondary && <Badge variant="secondary" className="text-xs">{labels.secondary}</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{score}</span>
                    <span className="text-sm text-gray-500">{labels.points}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Role Explanations */}
      <Card>
        <CardHeader>
          <CardTitle>{labels.interpretationGuide}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-green-50 rounded border border-green-200">
              <p><strong>{labels.highScores}</strong> {labels.highScoresDesc}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
              <p><strong>{labels.moderateScores}</strong> {labels.moderateScoresDesc}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p><strong>{labels.lowScores}</strong> {labels.lowScoresDesc}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BelbinRoleResults;
