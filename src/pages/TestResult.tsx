
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BelbinRoleResults from '@/components/test-result/BelbinRoleResults';
import OverallScoreCard from '@/components/test-result/OverallScoreCard';
import DimensionsAnalysis from '@/components/test-result/DimensionsAnalysis';
import DetailedAnalysisSection from '@/components/test-result/DetailedAnalysisSection';
import DetailedInterpretations from '@/components/test-result/DetailedInterpretations';
import { ScoringExplanation } from '@/components/test-result/ScoringExplanation';
import DimensionExplanations from '@/components/test-result/DimensionExplanations';
import CorrectAnswersSection from '@/components/test-result/CorrectAnswersSection';
import TestResultHeader from '@/components/test-result/TestResultHeader';
import { TestResultCharts } from '@/components/test-result/TestResultCharts';
import TestResultActions from '@/components/test-result/TestResultActions';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { SJTResults } from '@/components/test-result/SJTResults';
import { useBigFiveCalculation } from '@/hooks/useBigFiveCalculation';
import { useCognitiveAbilitiesCalculation } from '@/hooks/useCognitiveAbilitiesCalculation';
import { useCattell16PFCalculation } from '@/hooks/useCattell16PFCalculation';
import { useEnneagramCalculation } from '@/hooks/useEnneagramCalculation';
import { useSJTCalculation } from '@/hooks/useSJTCalculation';
import { isCognitiveAbilitiesTest, isBelbinTeamRoles } from '@/utils/testLabels';
import { translateInterpretation, getResultLabels } from '@/utils/testResultTranslations';
import { useLanguage } from '@/hooks/useLanguage';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';

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
  primary_roles?: string[];
  secondary_roles?: string[];
  role_scores?: { [key: string]: number };
  recommendations?: string[];
  dominant_profile?: string;
  secondary_profile?: string;
}

interface TestResultData {
  id: string;
  test_type_id: string;
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

// Helper function to safely convert score data
const convertToScoreData = (score: any): ScoreData => {
  if (!score || typeof score !== 'object') {
    return {
      overall: 0,
      raw_score: 0,
      max_score: 100,
      interpretation: 'Interpretarea nu este disponibilă'
    };
  }

  return {
    overall: score.overall || 0,
    raw_score: score.raw_score || 0,
    max_score: score.max_score || 100,
    interpretation: score.interpretation || 'Interpretarea nu este disponibilă',
    dimensions: score.dimensions || {},
    detailed_interpretations: score.detailed_interpretations || {},
    primary_roles: score.primary_roles || [],
    secondary_roles: score.secondary_roles || [],
    role_scores: score.role_scores || {},
    recommendations: score.recommendations || [],
    dominant_profile: score.dominant_profile,
    secondary_profile: score.secondary_profile
  };
};

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
  const { language } = useLanguage();
  const labels = getResultLabels(language);

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
      
      // Safely convert score data
      const safeScore = convertToScoreData(data.score);
      
      // Translate the interpretation based on current language
      const translatedScore = {
        ...safeScore,
        interpretation: translateInterpretation(safeScore.interpretation, language)
      };
      
      return {
        ...data,
        score: translatedScore,
        answers: data.answers as unknown as { [key: string]: number }
      } as TestResultData;
    },
    enabled: !!resultId
  });

  // Calculate dimensions based on test type
  const isBigFiveTest = result?.test_types.name.includes('Big Five');
  const isCognitiveTest = result ? isCognitiveAbilitiesTest(result.test_types.name) : false;
  const isBelbinTest = result ? isBelbinTeamRoles(result.test_types.name) : false;
  const isCattell16PFTest = result?.test_types.name.includes('Cattell') || result?.test_types.name.includes('16PF');
  const isEnneagramTest = result?.test_types.name.includes('Enneagram');
  const isSJTTest = result?.test_types.name.includes('SJT') || result?.test_types.name.includes('Situational Judgment') || result?.test_types.name.includes('orientare') || result?.test_types.name.includes('cariera');
  
  const calculatedBigFiveDimensions = useBigFiveCalculation(isBigFiveTest ? result?.answers : undefined);
  const calculatedCognitiveDimensions = useCognitiveAbilitiesCalculation(isCognitiveTest ? result?.answers : undefined);
  const calculatedCattell16PFDimensions = useCattell16PFCalculation(isCattell16PFTest ? result?.answers : undefined);
  const calculatedEnneagramDimensions = useEnneagramCalculation(isEnneagramTest ? result?.answers : undefined);
  const calculatedSJTDimensions = useSJTCalculation(isSJTTest ? result?.answers : undefined, []);

  // Get properly typed dimensions based on test type
  const testSpecificDimensions = React.useMemo(() => {
    if (isBigFiveTest && calculatedBigFiveDimensions) {
      return calculatedBigFiveDimensions;
    }
    
    if (isCognitiveTest && calculatedCognitiveDimensions) {
      return calculatedCognitiveDimensions;
    }

    if (isCattell16PFTest && calculatedCattell16PFDimensions) {
      return calculatedCattell16PFDimensions;
    }

    if (isEnneagramTest && calculatedEnneagramDimensions) {
      return calculatedEnneagramDimensions;
    }

    if (isSJTTest && calculatedSJTDimensions) {
      return calculatedSJTDimensions;
    }

    if (isBelbinTest) {
      return result?.score.role_scores || result?.score.dimensions || {};
    }
    
    return result?.score.dimensions || {};
  }, [isBigFiveTest, isCognitiveTest, isCattell16PFTest, isEnneagramTest, isSJTTest, isBelbinTest, calculatedBigFiveDimensions, calculatedCognitiveDimensions, calculatedCattell16PFDimensions, calculatedEnneagramDimensions, calculatedSJTDimensions, result?.score]);

  const hasValidTestSpecificDimensions = testSpecificDimensions && Object.values(testSpecificDimensions).some(value => typeof value === 'number' && value > 0);

  // Use different dimensions for general display
  const generalDisplayDimensions = testSpecificDimensions || {};

  if (isLoading) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p>{language === 'en' ? 'Loading...' : 'Se încarcă...'}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{labels.noResultsFound}</h2>
            <Button onClick={() => navigate('/teste')}>
              {labels.backToTests}
            </Button>
          </div>
        </div>
        <Footer />
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
    <div>
      <HomeNavigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <TestResultHeader 
            testName={result.test_types.name}
            completedAt={result.completed_at}
          />

          {/* Test Explanations - NEW SECTION */}
          <TestExplanations 
            testName={result.test_types.name}
            score={{ ...result.score, dimensions: testSpecificDimensions }}
            language={language}
          />

          {/* SJT Test Results - Special handling */}
          {isSJTTest ? (
            <>
              {/* Scoring Explanation for SJT - ALWAYS SHOW FIRST */}
              <ScoringExplanation 
                testName={result.test_types.name}
                overallScore={result.score.overall}
                scoreType={scoreType}
                dimensions={generalDisplayDimensions}
              />
              
              {/* SJT Results */}
              <SJTResults
                score={{
                  overall: result.score.overall,
                  dimensions: generalDisplayDimensions,
                  interpretation: result.score.interpretation,
                  detailed_interpretations: result.score.detailed_interpretations,
                  recommendations: result.score.recommendations || [],
                  dominant_profile: result.score.dominant_profile,
                  secondary_profile: result.score.secondary_profile
                }}
              />
            </>
          ) : (
            <>
              {/* Belbin Test Results - Special handling */}
              {isBelbinTest ? (
                <>
                  {/* Scoring Explanation for Belbin - ALWAYS SHOW FIRST */}
                  <ScoringExplanation 
                    testName={result.test_types.name}
                    overallScore={result.score.overall}
                    scoreType={scoreType}
                    dimensions={generalDisplayDimensions}
                    roleScores={result.score.role_scores || result.score.dimensions}
                  />
                  
                  {/* Belbin Role Results */}
                  <BelbinRoleResults
                    roleScores={result.score.role_scores || result.score.dimensions || {}}
                    primaryRoles={result.score.primary_roles || []}
                    secondaryRoles={result.score.secondary_roles || []}
                    interpretation={result.score.interpretation}
                  />
                </>
              ) : (
                <>
                  {/* Overall Score - only for non-Belbin and non-SJT tests */}
                  {!isEnneagramTest && <OverallScoreCard score={result.score} />}

                  {/* Scoring Explanation - ALWAYS SHOW WITH DIMENSIONS */}
                  <ScoringExplanation 
                    testName={result.test_types.name}
                    overallScore={result.score.overall}
                    scoreType={scoreType}
                    dimensions={generalDisplayDimensions}
                  />

                  {/* Correct Answers Section - only for cognitive abilities tests */}
                  {isCognitiveTest && (
                    <CorrectAnswersSection 
                      testTypeId={result.test_type_id}
                      userAnswers={result.answers}
                    />
                  )}

                  {/* Dimensions Analysis - ALWAYS SHOW IF DIMENSIONS EXIST */}
                  {hasValidTestSpecificDimensions && (
                    <DimensionsAnalysis 
                      dimensions={generalDisplayDimensions}
                      testName={result.test_types.name}
                    />
                  )}

                  {/* Dimension Explanations - ALWAYS SHOW IF DIMENSIONS EXIST */}
                  {hasValidTestSpecificDimensions && (
                    <DimensionExplanations 
                      testName={result.test_types.name}
                      dimensions={generalDisplayDimensions}
                    />
                  )}

                  {/* Detailed Interpretations for Big Five - ALWAYS SHOW IF EXISTS */}
                  {isBigFiveTest && result.score.detailed_interpretations && (
                    <DetailedInterpretations 
                      interpretations={result.score.detailed_interpretations}
                      testName={result.test_types.name}
                    />
                  )}
                </>
              )}
            </>
          )}

          {/* Charts Section */}
          <TestResultCharts
            testName={result.test_types.name}
            score={{ ...result.score, dimensions: testSpecificDimensions }}
          />

          {/* Detailed Analysis Section - AVAILABLE FOR ALL TESTS */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{labels.generateAnalysis}</CardTitle>
              <p className="text-sm text-gray-600">
                {labels.analysisDescription}
              </p>
            </CardHeader>
            <CardContent>
              <DetailedAnalysisSection 
                dimensions={generalDisplayDimensions} 
                resultId={resultId!}
                testType={result.test_types.name}
                score={result.score}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <TestResultActions />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestResult;
