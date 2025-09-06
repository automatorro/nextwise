
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SecureRadarChart } from '@/components/charts/SecureRadarChart';
import { 
  getHollandDimensionExplanation, 
  getHollandCareerRecommendations,
  getHollandOverallInterpretation 
} from '@/utils/testSpecificExplanations/hollandExplanations';
import { CheckCircle, ArrowRight, Briefcase, School, Timeline } from 'lucide-react';

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
      {/* Scor General */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Overall Score' : 'Scor General'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary">
                {language === 'en' ? 'Total Score' : 'Scor Total'}
              </h3>
              <div className="text-4xl font-bold my-2">
                {score.overall}%
              </div>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Your overall score in the test' : 'Descrierea scorului tău general în cadrul testului'}
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary">
                {language === 'en' ? 'Your Dominant Type' : 'Tipul tău dominant'}
              </h3>
              <div className="text-xl font-medium my-2">
                {score.dominant_code} - {score.interpretation}
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary">
                {language === 'en' ? 'Points' : 'Puncte'}
              </h3>
              <div className="grid grid-cols-2 gap-2 justify-center my-2">
                <div>
                  <div className="text-xl font-bold">{score.raw_score}</div>
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Obtained' : 'Obținute'}</p>
                </div>
                <div>
                  <div className="text-xl font-bold">{score.max_score}</div>
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Maximum' : 'Maxime'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Overall Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{language === 'en' ? 'What Your Result Means' : 'Ce înseamnă rezultatul tău'}</span>
            <Badge variant="default" className="text-lg px-3 py-1">
              {score.dominant_code || 'N/A'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">
            {language === 'en' ? 'Your RIASEC Type:' : 'Tipul tău RIASEC:'} {score.dominant_code}
          </h3>
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

      {/* Profil Personal */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Personal Profile' : 'Profil Personal'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {language === 'en' ? 'RIASEC Profile Chart' : 'Graficul Profilului RIASEC'}
              </h3>
              <SecureRadarChart
                data={chartData}
                dataKey="score"
                fill="hsl(var(--primary))"
                stroke="hsl(var(--primary))"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {language === 'en' ? 'Personalized Interpretation' : 'Interpretare Personalizată'}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {language === 'en' 
                  ? `As a ${score.dominant_code} type, your core personality is guided by specific motivations and behavioral patterns. This RIASEC type reveals how you perceive the world and respond to career challenges.`
                  : `Ca tip ${score.dominant_code}, personalitatea ta centrală este ghidată de motivații și tipare comportamentale specifice. Acest tip RIASEC dezvăluie cum percepi lumea și cum răspunzi la provocările profesionale.`
                }
              </p>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">
                  {language === 'en' ? 'Contextual Factors' : 'Factori Contextuali'}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 mt-1"><CheckCircle className="h-4 w-4 text-primary" /></span>
                    <span className="text-sm">
                      {language === 'en' 
                        ? 'Each RIASEC type has fundamental fears and desires that guide behavior'
                        : 'Fiecare tip RIASEC are temeri și dorințe fundamentale care ghidează comportamentul'
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1"><CheckCircle className="h-4 w-4 text-primary" /></span>
                    <span className="text-sm">
                      {language === 'en' 
                        ? 'Understanding your type helps with personal development and relationships'
                        : 'Înțelegerea tipului tău ajută la dezvoltarea personală și relații'
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-1"><CheckCircle className="h-4 w-4 text-primary" /></span>
                    <span className="text-sm">
                      {language === 'en' 
                        ? 'Types can develop differently depending on stress levels and security'
                        : 'Tipurile se pot dezvolta diferit în funcție de nivelurile de stres și siguranță'
                      }
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>{language === 'en' ? 'Context:' : 'Context:'}</strong> {language === 'en' 
                    ? 'All RIASEC types are equally valid and represent different ways of experiencing and navigating the professional world.'
                    : 'Toate tipurile RIASEC sunt la fel de valide și reprezintă modalități diferite de a experimenta și naviga lumea profesională.'
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Explicația Scorului */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Score Explanation' : 'Explicația Scorului'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            {language === 'en' 
              ? 'This test evaluates specific abilities and preferences through multiple-choice questions or rating scales.'
              : 'Acest test evaluează abilități și preferințe specifice prin întrebări cu opțiuni multiple sau scale de evaluare.'
            }
          </p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">
              {language === 'en' ? 'Score Interpretation' : 'Interpretarea Scorului'}
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-gray-100 p-2 rounded">
                <div className="text-sm font-medium">0-25%</div>
                <div className="text-xs text-gray-600">{language === 'en' ? 'Low' : 'Scăzut'}</div>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <div className="text-sm font-medium">26-50%</div>
                <div className="text-xs text-gray-600">{language === 'en' ? 'Moderate' : 'Moderat'}</div>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <div className="text-sm font-medium">51-75%</div>
                <div className="text-xs text-gray-600">{language === 'en' ? 'Good' : 'Bun'}</div>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <div className="text-sm font-medium">76-100%</div>
                <div className="text-xs text-gray-600">{language === 'en' ? 'Excellent' : 'Excelent'}</div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {language === 'en' ? 'What your results mean and how to use them' : 'Ce înseamnă rezultatele tale și cum să le folosești'}
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              {language === 'en' 
                ? 'Your results provide valuable insights into your profile in the evaluated field.'
                : 'Rezultatele tale oferă insight-uri valoroase despre profilul tău în domeniul evaluat.'
              }
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {language === 'en' ? 'Your Current Scores' : 'Scorurile tale actuale'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(score.dimensions).map(([key, value]) => {
                const numericValue = typeof value === 'number' ? value : 0;
                return (
                  <div key={key} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <h4 className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                      <p className="text-xs text-gray-600">
                        {numericValue >= 70 
                          ? (language === 'en' ? 'High' : 'Ridicat') 
                          : numericValue >= 40 
                            ? (language === 'en' ? 'Moderate' : 'Moderat') 
                            : (language === 'en' ? 'Low' : 'Scăzut')
                        }
                      </p>
                    </div>
                    <Badge variant={numericValue >= 70 ? 'default' : numericValue >= 40 ? 'secondary' : 'outline'} className="text-lg px-3 py-1">
                      {numericValue}%
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">
              {language === 'en' ? 'Dimension Analysis' : 'Analiza Dimensiunilor'}
            </h3>
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
          </div>
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Career Recommendations' : 'Recomandări de Carieră'}
          </CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {careerRecommendations.map((career, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-sm font-medium text-gray-800">{career}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <School className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Skill Development Tips' : 'Sfaturi pentru Dezvoltarea Abilităților'}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 mt-1"><CheckCircle className="h-3 w-3 text-blue-600" /></span>
                <span className="text-sm text-blue-700">
                  {language === 'en' 
                    ? 'Take courses related to your RIASEC profile'
                    : 'Urmează cursuri legate de profilul tău RIASEC'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1"><CheckCircle className="h-3 w-3 text-blue-600" /></span>
                <span className="text-sm text-blue-700">
                  {language === 'en' 
                    ? 'Seek mentorship from experienced professionals'
                    : 'Caută mentorat de la profesioniști cu experiență'
                  }
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 mt-1"><CheckCircle className="h-3 w-3 text-blue-600" /></span>
                <span className="text-sm text-blue-700">
                  {language === 'en' 
                    ? 'Practice skills through projects and volunteering'
                    : 'Exersează abilități prin proiecte și voluntariat'
                  }
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Pașii Următori */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Timeline className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Next Steps' : 'Pașii Următori'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? 'Career Exploration' : 'Explorarea Carierei'}
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                {language === 'en' 
                  ? 'Research and connect with professionals in your field of interest.'
                  : 'Cercetează și conectează-te cu profesioniști în domeniul tău de interes.'
                }
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 mt-1"><ArrowRight className="h-3 w-3 text-primary" /></span>
                  <span className="text-xs text-gray-700">
                    {language === 'en' 
                      ? 'Conduct informational interviews with professionals'
                      : 'Realizează interviuri informative cu profesioniști'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1"><ArrowRight className="h-3 w-3 text-primary" /></span>
                  <span className="text-xs text-gray-700">
                    {language === 'en' 
                      ? 'Join professional associations in your field'
                      : 'Alătură-te asociațiilor profesionale din domeniul tău'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1"><ArrowRight className="h-3 w-3 text-primary" /></span>
                  <span className="text-xs text-gray-700">
                    {language === 'en' 
                      ? 'Attend industry events and career fairs'
                      : 'Participă la evenimente din industrie și târguri de carieră'
                    }
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">
                {language === 'en' ? 'Development Plan' : 'Plan de Dezvoltare'}
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                {language === 'en' 
                  ? 'Create a structured plan to build skills for your target careers.'
                  : 'Creează un plan structurat pentru a dezvolta abilități pentru carierele tale țintă.'
                }
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 mt-1"><ArrowRight className="h-3 w-3 text-primary" /></span>
                  <span className="text-xs text-gray-700">
                    {language === 'en' 
                      ? 'Set specific, measurable career goals'
                      : 'Stabilește obiective de carieră specifice și măsurabile'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1"><ArrowRight className="h-3 w-3 text-primary" /></span>
                  <span className="text-xs text-gray-700">
                    {language === 'en' 
                      ? 'Identify skills gaps and learning opportunities'
                      : 'Identifică lacunele de competențe și oportunitățile de învățare'
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1"><ArrowRight className="h-3 w-3 text-primary" /></span>
                  <span className="text-xs text-gray-700">
                    {language === 'en' 
                      ? 'Create a timeline with milestones for your development'
                      : 'Creează un calendar cu repere pentru dezvoltarea ta'
                    }
                  </span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">
              {language === 'en' ? 'Practical Experience' : 'Experiență Practică'}
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              {language === 'en' 
                ? 'Gain hands-on experience in your areas of interest.'
                : 'Obține experiență practică în domeniile tale de interes.'
              }
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">1</span>
                </div>
                <p className="text-sm text-gray-700">
                  {language === 'en' 
                    ? 'Seek internships or part-time positions in your field of interest.'
                    : 'Caută stagii sau poziții part-time în domeniul tău de interes.'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">2</span>
                </div>
                <p className="text-sm text-gray-700">
                  {language === 'en'
                    ? 'Volunteer for projects that allow you to develop relevant skills.'
                    : 'Voluntariază-te pentru proiecte care îți permit să dezvolți abilități relevante.'
                  }
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">3</span>
                </div>
                <p className="text-sm text-gray-700">
                  {language === 'en'
                    ? 'Create personal projects that showcase your abilities and interests.'
                    : 'Creează proiecte personale care îți evidențiază abilitățile și interesele.'
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HollandExplanation;
