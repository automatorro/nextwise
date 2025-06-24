import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BigFiveRadarChart from '@/components/charts/BigFiveRadarChart';
import BigFiveExplanations from '@/components/charts/BigFiveExplanations';
import OverallScoreCard from '@/components/test-result/OverallScoreCard';
import DimensionsAnalysis from '@/components/test-result/DimensionsAnalysis';
import DetailedAnalysisSection from '@/components/test-result/DetailedAnalysisSection';
import DetailedInterpretations from '@/components/test-result/DetailedInterpretations';
import ScoringExplanation from '@/components/test-result/ScoringExplanation';
import DimensionExplanations from '@/components/test-result/DimensionExplanations';
import { useBigFiveCalculation } from '@/hooks/useBigFiveCalculation';

interface ScoreData {
  overall: number;
  raw_score: number;
  max_score: number;
  interpretation: string;
  dimensions?: { [key: string]: number };
  detailed_interpretations?: {
    openness?: string;
    conscientiousness?: string;
    extraversion?: string;
    agreeableness?: string;
    neuroticism?: string;
  };
}

interface TestResultData {
  id: string;
  score: ScoreData;
  answers: { [key: string]: number };
  completed_at: string;
  test_types: {
    name: string;
    description: string;
  };
}

interface BigFiveDimensions {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  [key: string]: number;
}

// Helper function to safely convert dimensions to the right format
const convertToBigFiveDimensions = (dimensions: { [key: string]: number }): BigFiveDimensions => {
  return {
    openness: dimensions.openness || 0,
    conscientiousness: dimensions.conscientiousness || 0,
    extraversion: dimensions.extraversion || 0,
    agreeableness: dimensions.agreeableness || 0,
    neuroticism: dimensions.neuroticism || 0,
    ...dimensions
  };
};

const TestResult = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();

  const { data: result, isLoading, error } = useQuery({
    queryKey: ['test-result', resultId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_results')
        .select(`
          *,
          test_types (
            name,
            description
          )
        `)
        .eq('id', resultId)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        score: data.score as unknown as ScoreData,
        answers: data.answers as unknown as { [key: string]: number }
      } as TestResultData;
    },
    enabled: !!resultId
  });

  // Calculate Big Five dimensions from answers if it's a Big Five test
  const isBigFiveTest = result?.test_types.name.includes('Big Five');
  const calculatedDimensions = useBigFiveCalculation(isBigFiveTest ? result?.answers : undefined);

  // Get properly typed Big Five dimensions
  const bigFiveDimensions: BigFiveDimensions = React.useMemo(() => {
    if (isBigFiveTest && calculatedDimensions) {
      return calculatedDimensions;
    }
    
    return {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0
    };
  }, [isBigFiveTest, calculatedDimensions]);

  const hasValidBigFive = isBigFiveTest && Object.values(bigFiveDimensions).some(value => value > 0);

  // Use different dimensions for general display vs Big Five specific components
  const generalDisplayDimensions = result?.score.dimensions || {};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Rezultatul nu a fost găsit</h2>
          <Button onClick={() => navigate('/teste')}>
            Înapoi la teste
          </Button>
        </div>
      </div>
    );
  }

  // Determine score type based on test
  const getScoreType = (testName: string) => {
    if (testName.includes('16PF') || testName.includes('Cattell')) return 'scale';
    return 'percentage';
  };

  const scoreType = getScoreType(result?.test_types.name || '');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/teste')}
            className="flex items-center mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Înapoi la teste
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rezultatul testului: {result.test_types.name}
          </h1>
          <p className="text-gray-600">
            Completat pe {new Date(result.completed_at).toLocaleDateString('ro-RO')}
          </p>
        </div>

        {/* Overall Score */}
        <OverallScoreCard score={result.score} />

        {/* NEW: Scoring Explanation */}
        <ScoringExplanation 
          testName={result.test_types.name}
          overallScore={result.score.overall}
          scoreType={scoreType}
        />

        {/* Big Five Radar Chart - only for Big Five tests */}
        {isBigFiveTest && hasValidBigFive && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Vizualizare Radar - Dimensiunile Big Five</CardTitle>
              <p className="text-sm text-gray-600">
                Graficul radar arată profilul tău de personalitate pe cele 5 dimensiuni principale. 
                Fiecare axă reprezintă o dimensiune, iar scorul este afișat ca procent.
              </p>
            </CardHeader>
            <CardContent>
              <BigFiveRadarChart dimensions={bigFiveDimensions} />
            </CardContent>
          </Card>
        )}

        {/* Dimensions - use Big Five dimensions for Big Five tests, otherwise use general dimensions */}
        <DimensionsAnalysis dimensions={isBigFiveTest ? convertToBigFiveDimensions(bigFiveDimensions) : generalDisplayDimensions} />

        {/* NEW: Dimension Explanations */}
        <DimensionExplanations 
          testName={result.test_types.name}
          dimensions={isBigFiveTest ? convertToBigFiveDimensions(bigFiveDimensions) : generalDisplayDimensions}
        />

        {/* Big Five Explanations - only for Big Five tests */}
        {isBigFiveTest && hasValidBigFive && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ghid de Interpretare</CardTitle>
            </CardHeader>
            <CardContent>
              <BigFiveExplanations dimensions={bigFiveDimensions} />
            </CardContent>
          </Card>
        )}

        {/* Detailed Interpretations for Big Five */}
        {isBigFiveTest && result.score.detailed_interpretations && (
          <DetailedInterpretations interpretations={result.score.detailed_interpretations} />
        )}

        {/* Detailed Analysis Section - NOW AVAILABLE FOR ALL TESTS */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analiză Detaliată cu AI</CardTitle>
            <p className="text-sm text-gray-600">
              Generează o analiză personalizată și recomandări specifice bazate pe rezultatele tale.
            </p>
          </CardHeader>
          <CardContent>
            <DetailedAnalysisSection 
              dimensions={isBigFiveTest ? convertToBigFiveDimensions(bigFiveDimensions) : generalDisplayDimensions} 
              resultId={resultId!}
              testType={result.test_types.name}
              score={result.score}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={() => navigate('/teste')} className="flex-1">
            Încearcă un alt test
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex-1">
            Mergi la Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
