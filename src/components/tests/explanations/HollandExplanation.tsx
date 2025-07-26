
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SecureRadarChart } from '@/components/charts/SecureRadarChart';
import { 
  getHollandDimensionExplanation, 
  getHollandCareerRecommendations,
  getHollandOverallInterpretation 
} from '@/utils/testSpecificExplanations/hollandExplanations';

interface HollandExplanationProps {
  score: any;
  language?: string;
}

const HollandExplanation = ({ score, language = 'ro' }: HollandExplanationProps) => {
  if (!score || !score.dimensions) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {language === 'en' ? 'No results available for interpretation.' : 'Nu sunt disponibile rezultate pentru interpretare.'}
        </p>
      </div>
    );
  }

  // Prepare chart data
  const chartData = Object.entries(score.dimensions).map(([key, value]) => ({
    dimension: {
      realistic: language === 'en' ? 'Realistic' : 'Realistic (R)',
      investigative: language === 'en' ? 'Investigative' : 'Investigative (I)',
      artistic: language === 'en' ? 'Artistic' : 'Artistic (A)',
      social: language === 'en' ? 'Social' : 'Social (S)',
      enterprising: language === 'en' ? 'Enterprising' : 'Enterprising (E)',
      conventional: language === 'en' ? 'Conventional' : 'Conventional (C)'
    }[key] || key,
    score: typeof value === 'number' ? value : 0
  }));

  const dominantType = score.dominant_code?.toLowerCase() || 'realistic';
  const careerRecommendations = getHollandCareerRecommendations(dominantType);
  const overallInterpretation = getHollandOverallInterpretation(score.dominant_code || 'REALISTIC', score.overall || 0);

  return (
    <div className="space-y-6">
      {/* Overall Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{language === 'en' ? 'Your Career Personality' : 'Personalitatea Ta Profesională'}</span>
            <Badge variant="default" className="text-lg px-3 py-1">
              {score.dominant_code || 'N/A'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed mb-4">
            {overallInterpretation}
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              {language === 'en' ? 'Your Dominant Code:' : 'Codul Tău Dominant:'} {score.dominant_code}
            </h4>
            <p className="text-blue-700 text-sm">
              {score.interpretation}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'RIASEC Profile Chart' : 'Graficul Profilului RIASEC'}</CardTitle>
        </CardHeader>
        <CardContent>
          <SecureRadarChart
            data={chartData}
            dataKey="score"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--primary))"
          />
        </CardContent>
      </Card>

      {/* Dimension Explanations */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Dimension Analysis' : 'Analiza Dimensiunilor'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(score.dimensions).map(([key, value]) => {
              const numericValue = typeof value === 'number' ? value : 0;
              return (
                <div key={key} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{key.toUpperCase()}</h4>
                    <Badge variant={numericValue >= 70 ? 'default' : numericValue >= 40 ? 'secondary' : 'outline'}>
                      {numericValue}%
                    </Badge>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {getHollandDimensionExplanation(key, numericValue)}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Career Recommendations' : 'Recomandări de Carieră'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-gray-600 mb-3">
              {language === 'en' 
                ? 'Based on your dominant type, here are some career paths that might suit you:'
                : 'Bazat pe tipul tău dominant, iată câteva căi de carieră care ți-ar putea fi potrivite:'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {careerRecommendations.map((career, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-gray-800">{career}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Next Steps' : 'Pașii Următori'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs font-bold">1</span>
              </div>
              <p className="text-sm text-gray-700">
                {language === 'en' 
                  ? 'Explore the recommended careers in more detail through research and informational interviews.'
                  : 'Explorează carierele recomandate în detaliu prin cercetare și interviuri informative.'
                }
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs font-bold">2</span>
              </div>
              <p className="text-sm text-gray-700">
                {language === 'en'
                  ? 'Consider gaining experience through internships, volunteering, or part-time work in your areas of interest.'
                  : 'Consideră să îți câștigi experiență prin stagii, voluntariat sau muncă part-time în domeniile de interes.'
                }
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs font-bold">3</span>
              </div>
              <p className="text-sm text-gray-700">
                {language === 'en'
                  ? 'Create a development plan to build skills needed for your target careers.'
                  : 'Creează un plan de dezvoltare pentru a construi abilitățile necesare carierelor țintă.'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HollandExplanation;
