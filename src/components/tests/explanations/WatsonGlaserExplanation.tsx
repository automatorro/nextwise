
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, CheckCircle, AlertCircle } from 'lucide-react';

interface WatsonGlaserExplanationProps {
  score: {
    overall: number;
    raw_score: number;
    max_score: number;
    dimensions: {
      inferences: number;
      assumptions: number;
      deduction: number;
      interpretation: number;
      argument_evaluation: number;
    };
    interpretation: string;
    level: string;
    section_scores: {
      inferences: number;
      assumptions: number;
      deduction: number;
      interpretation: number;
      argument_evaluation: number;
    };
  };
  language: string;
}

export const WatsonGlaserExplanation: React.FC<WatsonGlaserExplanationProps> = ({ score, language }) => {
  const isRomanian = language === 'ro';
  
  const dimensionLabels = {
    inferences: isRomanian ? 'Inferențe' : 'Inferences',
    assumptions: isRomanian ? 'Asumpții' : 'Assumptions',
    deduction: isRomanian ? 'Deducție' : 'Deduction',
    interpretation: isRomanian ? 'Interpretarea' : 'Interpretation',
    argument_evaluation: isRomanian ? 'Evaluarea Argumentelor' : 'Argument Evaluation'
  };

  const dimensionDescriptions = {
    inferences: isRomanian 
      ? 'Capacitatea de a trage concluzii logice pe baza informațiilor disponibile'
      : 'Ability to draw logical conclusions based on available information',
    assumptions: isRomanian
      ? 'Capacitatea de a identifica presupunerile ascunse într-un argument'
      : 'Ability to identify hidden assumptions in an argument',
    deduction: isRomanian
      ? 'Capacitatea de a determina dacă concluziile urmează logic din premise'
      : 'Ability to determine if conclusions follow logically from premises',
    interpretation: isRomanian
      ? 'Capacitatea de a interpreta corect informațiile și evidențele'
      : 'Ability to correctly interpret information and evidence',
    argument_evaluation: isRomanian
      ? 'Capacitatea de a evalua puterea și validitatea argumentelor'
      : 'Ability to evaluate the strength and validity of arguments'
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 80) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (percentage >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            {isRomanian ? 'Rezultatul Testului Watson-Glaser' : 'Watson-Glaser Test Result'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {score.overall}%
                </div>
                <Badge variant={score.overall >= 80 ? 'default' : score.overall >= 60 ? 'secondary' : 'destructive'}>
                  {score.level}
                </Badge>
              </div>
              <Progress value={score.overall} className="mb-4" />
              <p className="text-sm text-gray-600 text-center">
                {score.raw_score} {isRomanian ? 'din' : 'out of'} {score.max_score} {isRomanian ? 'puncte' : 'points'}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">
                {isRomanian ? 'Interpretarea rezultatului:' : 'Result interpretation:'}
              </h4>
              <p className="text-sm text-gray-700">{score.interpretation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {isRomanian ? 'Performanța pe Dimensiuni' : 'Performance by Dimensions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(score.dimensions).map(([key, percentage]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getScoreIcon(percentage)}
                    <span className="font-medium">
                      {dimensionLabels[key as keyof typeof dimensionLabels]}
                    </span>
                  </div>
                  <span className={`font-semibold ${getScoreColor(percentage)}`}>
                    {percentage}%
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-sm text-gray-600">
                  {dimensionDescriptions[key as keyof typeof dimensionDescriptions]}
                </p>
                <p className="text-xs text-gray-500">
                  {score.section_scores[key as keyof typeof score.section_scores]} {isRomanian ? 'din 8 răspunsuri corecte' : 'out of 8 correct answers'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {isRomanian ? 'Recomandări pentru Dezvoltare' : 'Development Recommendations'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {score.overall < 60 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">
                  {isRomanian ? 'Dezvoltarea Urgentă' : 'Urgent Development'}
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• {isRomanian ? 'Exerciții zilnice de logică și raționament' : 'Daily logic and reasoning exercises'}</li>
                  <li>• {isRomanian ? 'Cursuri de gândire critică' : 'Critical thinking courses'}</li>
                  <li>• {isRomanian ? 'Analiză sistematică a argumentelor' : 'Systematic argument analysis'}</li>
                </ul>
              </div>
            )}
            
            {score.overall >= 60 && score.overall < 80 && (
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">
                  {isRomanian ? 'Îmbunătățiri Recomandate' : 'Recommended Improvements'}
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• {isRomanian ? 'Practică regulată cu cazuri complexe' : 'Regular practice with complex cases'}</li>
                  <li>• {isRomanian ? 'Dezvoltarea abilităților de analiză' : 'Development of analytical skills'}</li>
                  <li>• {isRomanian ? 'Învățarea tehnicilor de evaluare critică' : 'Learning critical evaluation techniques'}</li>
                </ul>
              </div>
            )}
            
            {score.overall >= 80 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">
                  {isRomanian ? 'Menținerea Performanței' : 'Maintaining Performance'}
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• {isRomanian ? 'Aplicarea abilităților în situații reale' : 'Applying skills in real situations'}</li>
                  <li>• {isRomanian ? 'Mentorarea colegilor' : 'Mentoring colleagues'}</li>
                  <li>• {isRomanian ? 'Provocări intelectuale continue' : 'Continuous intellectual challenges'}</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
