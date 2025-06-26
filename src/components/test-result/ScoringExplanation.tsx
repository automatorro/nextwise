
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
}

const ScoringExplanation = ({ testName, overallScore, scoreType = 'percentage' }: ScoringExplanationProps) => {
  const { language } = useLanguage();
  const explanation = getTestScoringExplanation(testName, language);
  const interpretation = getScoreInterpretation(overallScore, testName, language);

  if (!explanation) return null;

  const labels = {
    title: language === 'en' ? 'Understanding Your Score' : 'Înțelegerea Scorului',
    whatThisMeasures: language === 'en' ? 'What this test measures:' : 'Ce măsoară acest test:',
    yourScoreInterpretation: language === 'en' ? 'Your score interpretation:' : 'Interpretarea scorului tău:',
    scoreRanges: language === 'en' ? 'Score ranges:' : 'Intervalele de scor:',
    whatItMeans: language === 'en' ? 'What the result means:' : 'Ce înseamnă rezultatul:'
  };

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

        {explanation.scoreRanges && (
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
