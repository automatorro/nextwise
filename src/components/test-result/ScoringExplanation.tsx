
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, TrendingUp } from 'lucide-react';
import { getTestScoringExplanation, getScoreInterpretation } from '@/utils/testScoring';
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
  const interpretation = getScoreInterpretation(overallScore, testName, language);

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
            <p className="text-gray-700">{interpretation.description}</p>
          </div>
        )}

        {/* DISC Specific Content */}
        {isDISC && explanation.discSpecific && dimensions && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{labels.dimensions}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(explanation.discSpecific.dimensions).map(([key, dimInfo]) => {
                const score = dimensions[key.toLowerCase()] || 0;
                return (
                  <div key={key} className="p-3 bg-white rounded border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-blue-600">{dimInfo.name}</span>
                      <span className="text-sm font-semibold">{score}%</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{dimInfo.description}</p>
                    <div className="text-xs">
                      <span className="text-green-600">Ridicat: </span>
                      <span className="text-gray-600">{dimInfo.highTrait}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {explanation.discSpecific.combinations && (
              <div className="mt-3 p-3 bg-blue-100 rounded">
                <p className="text-sm text-blue-800">{explanation.discSpecific.combinations}</p>
              </div>
            )}
          </div>
        )}

        {/* Belbin Specific Content */}
        {isBelbin && explanation.belbinSpecific && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{labels.roles}</h4>
            <div className="space-y-2 text-sm">
              {Object.entries(explanation.belbinSpecific.categories).map(([key, category]) => (
                <div key={key} className="p-3 bg-white rounded border">
                  <h5 className="font-medium text-blue-600 mb-1">{category.name}</h5>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              ))}
            </div>
            
            {/* Role Scores Display for Belbin */}
            {roleScores && Object.keys(roleScores).length > 0 && (
              <div className="mt-4">
                <h5 className="font-medium text-gray-900 mb-2">
                  {language === 'en' ? 'Your Role Scores:' : 'Scorurile Tale pe Roluri:'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {Object.entries(roleScores)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([role, score]) => {
                      const roleInfo = explanation.belbinSpecific.roles?.[role.replace('_', '-')];
                      return (
                        <div key={role} className="flex items-center justify-between p-2 bg-white rounded border">
                          <span className="font-medium">
                            {roleInfo?.name || role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <span className="font-semibold text-blue-600">{score} pts</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
            
            <div className="mt-3 p-3 bg-blue-100 rounded">
              <p className="text-sm text-blue-800">{explanation.belbinSpecific.primaryVsSecondary}</p>
            </div>
          </div>
        )}

        {/* Clinical Tests Specific Content */}
        {isClinical && explanation.clinicalSpecific && (
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <h4 className="font-semibold text-amber-800 mb-1">{labels.limitations}</h4>
              <p className="text-sm text-amber-700">{explanation.clinicalSpecific.limitations}</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <h4 className="font-semibold text-green-800 mb-1">{labels.recommendations}</h4>
              <p className="text-sm text-green-700">{explanation.clinicalSpecific.recommendations}</p>
            </div>
          </div>
        )}

        {explanation.scoreRanges && !isBelbin && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{labels.scoreRanges}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              {explanation.scoreRanges.map((range, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="font-medium">{range.range}</span>
                  <Badge variant={range.variant}>{range.label}</Badge>
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
