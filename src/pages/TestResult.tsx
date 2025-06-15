
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
}

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

  // Convert to Big Five format for components that need it
  const getBigFiveDimensions = (): BigFiveDimensions => {
    if (isBigFiveTest && calculatedDimensions) {
      return calculatedDimensions;
    }
    
    // Fallback for non-Big Five tests or when calculation fails
    return {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0
    };
  };

  const bigFiveDimensions = getBigFiveDimensions();
  const hasValidBigFive = isBigFiveTest && Object.values(bigFiveDimensions).some(value => value > 0);

  // Use original dimensions for the general dimensions display
  const displayDimensions = isBigFiveTest ? bigFiveDimensions : (result?.score.dimensions || {});

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

        {/* Big Five Radar Chart */}
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
              
              {/* Generate Detailed Analysis Button */}
              <DetailedAnalysisSection 
                dimensions={bigFiveDimensions} 
                resultId={resultId!} 
              />
            </CardContent>
          </Card>
        )}

        {/* Dimensions */}
        <DimensionsAnalysis dimensions={displayDimensions} />

        {/* Big Five Explanations */}
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
