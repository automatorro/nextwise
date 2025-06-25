
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getDimensionLabel } from '@/utils/testLabels';

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
  const maxScore = 18; // Maximum possible score per role in Belbin

  const roleDescriptions: { [key: string]: { name: string; description: string } } = {
    plant: { 
      name: 'Plant (Creativul)', 
      description: 'Generează idei creative și soluții inovatoare pentru probleme'
    },
    resource_investigator: { 
      name: 'Resource Investigator (Investigatorul)', 
      description: 'Explorează oportunități și dezvoltă contacte externe'
    },
    coordinator: { 
      name: 'Coordinator (Coordonatorul)', 
      description: 'Clarifică obiectivele și promovează luarea deciziilor'
    },
    shaper: { 
      name: 'Shaper (Modelatorul)', 
      description: 'Provocă echipa să depășească obstacolele și dificultățile'
    },
    monitor_evaluator: { 
      name: 'Monitor Evaluator (Evaluatorul)', 
      description: 'Analizează opțiunile și judecă cu acuratețe și obiectivitate'
    },
    teamworker: { 
      name: 'Teamworker (Echipierul)', 
      description: 'Cooperează eficient și evită conflictele în echipă'
    },
    implementer: { 
      name: 'Implementer (Implementatorul)', 
      description: 'Transformă ideile în acțiuni practice și organizate'
    },
    completer_finisher: { 
      name: 'Completer Finisher (Finalizatorul)', 
      description: 'Caută erorile și se asigură că totul este finalizat la timp'
    },
    specialist: { 
      name: 'Specialist (Specialistul)', 
      description: 'Aduce cunoștințe și abilități specializate în domeniul său'
    }
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
          <CardTitle>Interpretarea Rezultatelor Belbin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{interpretation}</p>
        </CardContent>
      </Card>

      {/* Primary Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Rolurile Tale Dominante
            <Badge variant="default">Puncte (max. 18)</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedRoles.slice(0, 2).map(({ role, score }) => (
              <div key={role} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-blue-900">
                    {roleDescriptions[role]?.name || getDimensionLabel('belbin', role)}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-700">{score}</span>
                    <span className="text-sm text-blue-600">/ {maxScore}</span>
                  </div>
                </div>
                <Progress value={(score / maxScore) * 100} className="mb-2" />
                <p className="text-sm text-blue-800">
                  {roleDescriptions[role]?.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Role Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Scorurile Complete pe Roluri</CardTitle>
          <p className="text-sm text-gray-600">
            Fiecare rol este evaluat pe o scală de la 0 la 18 puncte
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
                      {roleDescriptions[role]?.name || getDimensionLabel('belbin', role)}
                    </span>
                    {isPrimary && <Badge variant="default" className="text-xs">Primar</Badge>}
                    {isSecondary && <Badge variant="secondary" className="text-xs">Secundar</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{score}</span>
                    <span className="text-sm text-gray-500">puncte</span>
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
          <CardTitle>Ghid de Interpretare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-green-50 rounded border border-green-200">
              <p><strong>Scoruri ridicate (12-18 puncte):</strong> Roluri foarte pronunțate care definesc stilul tău dominant de contribuție în echipă.</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
              <p><strong>Scoruri moderate (6-11 puncte):</strong> Roluri care pot fi dezvoltate și folosite în anumite contexte.</p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p><strong>Scoruri scăzute (0-5 puncte):</strong> Roluri care nu sunt naturale pentru tine, dar pot fi învățate dacă este necesar.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BelbinRoleResults;
