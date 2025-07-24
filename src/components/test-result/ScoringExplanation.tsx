
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, TrendingUp } from 'lucide-react';
import { getTestScoringExplanation } from '@/utils/testScoring';
import { useLanguage } from '@/hooks/useLanguage';

interface ScoringExplanationProps {
  testName: string;
  overallScore: number;
  scoreType?: 'percentage' | 'scale' | 'raw';
  dimensions?: { [key: string]: number };
  roleScores?: { [key: string]: number };
}

const ScoringExplanation = ({ 
  testName, 
  overallScore, 
  scoreType = 'percentage', 
  dimensions,
  roleScores 
}: ScoringExplanationProps) => {
  const { language } = useLanguage();
  const explanation = getTestScoringExplanation(testName, language);

  if (!explanation) return null;

  const labels = {
    title: language === 'en' ? 'Understanding Your Score' : 'Înțelegerea Scorului',
    whatThisMeasures: language === 'en' ? 'What this test measures:' : 'Ce măsoară acest test:',
    yourScoreInterpretation: language === 'en' ? 'Your score interpretation:' : 'Interpretarea scorului tău:',
    scoreRanges: language === 'en' ? 'Score ranges:' : 'Intervalele de scor:',
    whatItMeans: language === 'en' ? 'What the result means:' : 'Ce înseamnă rezultatul:',
    dimensions: language === 'en' ? 'Dimensions:' : 'Dimensiuni:',
    roles: language === 'en' ? 'Team Roles:' : 'Roluri în Echipă:',
    clinicalNote: language === 'en' ? 'Clinical Information:' : 'Informații Clinice:',
    limitations: language === 'en' ? 'Important limitations:' : 'Limitări importante:',
    recommendations: language === 'en' ? 'Recommendations:' : 'Recomandări:'
  };

  // Simple interpretation based on score
  const getScoreInterpretation = (score: number) => {
    if (score >= 80) return { level: 'Ridicat', variant: 'default' as const };
    if (score >= 60) return { level: 'Mediu-ridicat', variant: 'outline' as const };
    if (score >= 40) return { level: 'Mediu', variant: 'outline' as const };
    return { level: 'Scăzut', variant: 'secondary' as const };
  };

  const interpretation = getScoreInterpretation(overallScore);

  const testKey = testName.toLowerCase();
  const isDISC = testKey.includes('disc') || testKey.includes('comportament');
  const isBelbin = testKey.includes('belbin') || testKey.includes('echipa') || testKey.includes('team');
  const isClinical = testKey.includes('gad-7') || testKey.includes('anxietate') || 
                     testKey.includes('phq-9') || testKey.includes('depresie') || 
                     testKey.includes('beck');

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Info className="w-5 h-5 mr-2 text-blue-600" />
          {labels.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">{labels.whatThisMeasures}</h4>
          <p className="text-gray-700">{explanation.description}</p>
        </div>
        
        {!isBelbin && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {labels.yourScoreInterpretation}
            </h4>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={interpretation.variant} className="text-sm">
                {interpretation.level}
              </Badge>
              <span className="text-lg font-semibold text-gray-900">{overallScore}{scoreType === 'percentage' ? '%' : ''}</span>
            </div>
            <p className="text-gray-700">
              {interpretation.level === 'Ridicat' ? 'Scor foarte bun în acest test.' : 
               interpretation.level === 'Mediu-ridicat' ? 'Scor bun în acest test.' :
               interpretation.level === 'Mediu' ? 'Scor satisfăcător în acest test.' :
               'Scor care poate fi îmbunătățit.'}
            </p>
          </div>
        )}

        {/* Show dimensions if available */}
        {dimensions && Object.keys(dimensions).length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{labels.dimensions}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(dimensions).map(([key, value]) => (
                <div key={key} className="p-3 bg-white rounded border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-blue-600">{key}</span>
                    <span className="text-sm font-semibold">{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show role scores for Belbin */}
        {isBelbin && roleScores && Object.keys(roleScores).length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{labels.roles}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {Object.entries(roleScores)
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .slice(0, 5)
                .map(([role, score]) => (
                  <div key={role} className="flex items-center justify-between p-2 bg-white rounded border">
                    <span className="font-medium">
                      {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className="font-semibold text-blue-600">{score} pts</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {explanation.whatItMeans && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{labels.whatItMeans}</h4>
            <p className="text-gray-700">{explanation.whatItMeans}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoringExplanation;
