
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Target, CheckCircle, AlertCircle } from 'lucide-react';

interface WatsonGlaserExplanationProps {
  score: {
    overall: number;
    dimensions: {
      inference: number;
      assumptions: number;
      deduction: number;
      interpretation: number;
      argument_evaluation: number;
    };
    interpretations: {
      inference: string;
      assumptions: string;
      deduction: string;
      interpretation: string;
      argument_evaluation: string;
    };
    performance_level: string;
  };
  language: string;
}

export const WatsonGlaserExplanation: React.FC<WatsonGlaserExplanationProps> = ({ score, language }) => {
  const isRomanian = language === 'ro';
  
  const dimensionLabels = {
    inference: isRomanian ? 'Inferențe' : 'Inferences',
    assumptions: isRomanian ? 'Recunoașterea Asumpțiilor' : 'Recognition of Assumptions',
    deduction: isRomanian ? 'Deducție' : 'Deduction',
    interpretation: isRomanian ? 'Interpretarea' : 'Interpretation',
    argument_evaluation: isRomanian ? 'Evaluarea Argumentelor' : 'Argument Evaluation'
  };

  const dimensionDescriptions = {
    inference: isRomanian 
      ? 'Capacitatea de a determina probabilitatea adevărului unei afirmații pe baza faptelor prezentate'
      : 'Ability to determine the probability of truth of a statement based on presented facts',
    assumptions: isRomanian
      ? 'Capacitatea de a identifica presupunerile implicite dintr-o afirmație sau argument'
      : 'Ability to identify implicit assumptions in a statement or argument',
    deduction: isRomanian
      ? 'Capacitatea de a determina dacă o concluzie urmează logic din premise'
      : 'Ability to determine if a conclusion follows logically from premises',
    interpretation: isRomanian
      ? 'Capacitatea de a extrage concluzii corecte dintr-un text sau set de informații'
      : 'Ability to draw correct conclusions from text or set of information',
    argument_evaluation: isRomanian
      ? 'Capacitatea de a evalua forța unui argument prin analiza relevanței și logicii'
      : 'Ability to evaluate argument strength through relevance and logic analysis'
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 45) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 75) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (percentage >= 60) return <CheckCircle className="h-5 w-5 text-blue-600" />;
    if (percentage >= 45) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <AlertCircle className="h-5 w-5 text-red-600" />;
  };

  const getPerformanceBadgeVariant = (overall: number) => {
    if (overall >= 85) return 'default';
    if (overall >= 70) return 'secondary';
    if (overall >= 55) return 'outline';
    if (overall >= 40) return 'destructive';
    return 'destructive';
  };

  // Calculate raw scores from percentages (8 questions per dimension)
  const calculateRawScore = (percentage: number) => {
    return Math.round((percentage / 100) * 8);
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
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {score.overall}%
                </div>
                <Badge variant={getPerformanceBadgeVariant(score.overall)} className="text-sm">
                  {score.performance_level}
                </Badge>
              </div>
              <Progress value={score.overall} className="mb-4 h-3" />
              <p className="text-sm text-gray-600 text-center">
                {isRomanian ? 'Scor general de gândire critică' : 'Overall critical thinking score'}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-lg">
                {isRomanian ? 'Ce înseamnă acest rezultat?' : 'What does this result mean?'}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {isRomanian ? 
                  'Testul Watson-Glaser evaluează capacitatea ta de raționament critic prin cinci componente esențiale. Rezultatul reflectă abilitatea de a analiza informații în mod logic și de a lua decizii fundamentate.' :
                  'The Watson-Glaser test evaluates your critical thinking ability through five essential components. The result reflects your ability to analyze information logically and make informed decisions.'
                }
              </p>
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
          <div className="space-y-6">
            {Object.entries(score.dimensions).map(([key, percentage]) => (
              <div key={key} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {getScoreIcon(percentage)}
                    <span className="font-medium text-base">
                      {dimensionLabels[key as keyof typeof dimensionLabels]}
                    </span>
                  </div>
                  <span className={`font-bold text-lg ${getScoreColor(percentage)}`}>
                    {percentage}%
                  </span>
                </div>
                <Progress value={percentage} className="h-3" />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2 font-medium">
                    {dimensionDescriptions[key as keyof typeof dimensionDescriptions]}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {score.interpretations[key as keyof typeof score.interpretations]}
                  </p>
                  <p className="text-xs text-gray-500">
                    {calculateRawScore(percentage)} {isRomanian ? 'din 8 răspunsuri corecte' : 'out of 8 correct answers'}
                  </p>
                </div>
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
            {score.overall < 45 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">
                  {isRomanian ? 'Dezvoltare Prioritară' : 'Priority Development'}
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• {isRomanian ? 'Exerciții zilnice de logică și raționament critic' : 'Daily logic and critical reasoning exercises'}</li>
                  <li>• {isRomanian ? 'Cursuri structurate de gândire critică' : 'Structured critical thinking courses'}</li>
                  <li>• {isRomanian ? 'Practică cu cazuri de studiu și analiză de argumente' : 'Practice with case studies and argument analysis'}</li>
                </ul>
              </div>
            )}
            
            {score.overall >= 45 && score.overall < 70 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">
                  {isRomanian ? 'Îmbunătățiri Recomandate' : 'Recommended Improvements'}
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• {isRomanian ? 'Practică regulată cu probleme complexe de raționament' : 'Regular practice with complex reasoning problems'}</li>
                  <li>• {isRomanian ? 'Dezvoltarea abilităților de analiză și sinteză' : 'Development of analysis and synthesis skills'}</li>
                  <li>• {isRomanian ? 'Învățarea tehnicilor avansate de evaluare critică' : 'Learning advanced critical evaluation techniques'}</li>
                </ul>
              </div>
            )}
            
            {score.overall >= 70 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">
                  {isRomanian ? 'Menținerea și Perfecționarea' : 'Maintaining and Perfecting'}
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• {isRomanian ? 'Aplicarea abilităților în situații profesionale complexe' : 'Applying skills in complex professional situations'}</li>
                  <li>• {isRomanian ? 'Mentorarea și îndrumarea colegilor' : 'Mentoring and guiding colleagues'}</li>
                  <li>• {isRomanian ? 'Provocări intelectuale continue și diversificate' : 'Continuous and diverse intellectual challenges'}</li>
                </ul>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">
                {isRomanian ? 'Sfaturi Generale' : 'General Tips'}
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {isRomanian ? 'Citește diverse surse și analizează argumentele prezentate' : 'Read diverse sources and analyze presented arguments'}</li>
                <li>• {isRomanian ? 'Pune întrebări critice și caută evidențe pentru afirmații' : 'Ask critical questions and look for evidence for claims'}</li>
                <li>• {isRomanian ? 'Practică identificarea premiselor și concluziilor' : 'Practice identifying premises and conclusions'}</li>
                <li>• {isRomanian ? 'Dezvoltă toleranța la ambiguitate și incertitudine' : 'Develop tolerance for ambiguity and uncertainty'}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
