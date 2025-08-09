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
import { useEnneagramCalculation } from '@/hooks/useEnneagramCalculation';
import { useSJTCalculation } from '@/hooks/useSJTCalculation';
import { calculateCattellScore } from '@/utils/testCalculations/cattellCalculation';
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
    [key: string]: string;
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
  score: any;
  answers: { [key: string]: number };
  completed_at: string;
  test_types: {
    name: string;
    description: string;
  };
}

// Standardized score data converter - ensures all components get consistent data structure
const standardizeScoreData = (score: any, testName: string = ''): ScoreData => {
  if (!score || typeof score !== 'object') {
    return {
      overall: 0,
      raw_score: 0,
      max_score: 100,
      interpretation: 'Interpretarea nu este disponibilă',
      dimensions: {},
      detailed_interpretations: {},
      primary_roles: [],
      secondary_roles: [],
      role_scores: {},
      recommendations: [],
      dominant_profile: undefined,
      secondary_profile: undefined
    };
  }

  return {
    overall: typeof score.overall === 'number' ? score.overall : 0,
    raw_score: typeof score.raw_score === 'number' ? score.raw_score : 0,
    max_score: typeof score.max_score === 'number' ? score.max_score : 100,
    interpretation: typeof score.interpretation === 'string' ? score.interpretation : 'Interpretarea nu este disponibilă',
    dimensions: score.dimensions && typeof score.dimensions === 'object' ? score.dimensions : {},
    detailed_interpretations: score.detailed_interpretations && typeof score.detailed_interpretations === 'object' ? score.detailed_interpretations : {},
    primary_roles: Array.isArray(score.primary_roles) ? score.primary_roles : [],
    secondary_roles: Array.isArray(score.secondary_roles) ? score.secondary_roles : [],
    role_scores: score.role_scores && typeof score.role_scores === 'object' ? score.role_scores : {},
    recommendations: Array.isArray(score.recommendations) ? score.recommendations : [],
    dominant_profile: score.dominant_profile,
    secondary_profile: score.secondary_profile
  };
};

// Helper to check if dimensions data is meaningful
const hasMeaningfulDimensions = (dimensions: { [key: string]: number } | undefined): boolean => {
  if (!dimensions || typeof dimensions !== 'object') return false;
  return Object.values(dimensions).some(value => typeof value === 'number' && value > 0);
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
      
      // Properly handle the Json type conversion
      return {
        ...data,
        answers: data.answers as unknown as { [key: string]: number },
        score: data.score // Keep as any, will be standardized later
      } as TestResultData;
    },
    enabled: !!resultId
  });

  // Determine test types
  const testName = result?.test_types?.name || '';
  const isBigFiveTest = testName.includes('Big Five');
  const isCognitiveTest = result ? isCognitiveAbilitiesTest(testName) : false;
  const isBelbinTest = result ? isBelbinTeamRoles(testName) : false;
  const isCattell16PFTest = testName.includes('Cattell') || testName.includes('16PF');
  const isEnneagramTest = testName.includes('Enneagram');
  const isSJTTest = testName.includes('SJT') || testName.includes('Situational Judgment') || testName.includes('orientare') || testName.includes('cariera');
  
  // Calculate dimensions using appropriate calculation hooks
  const calculatedBigFiveDimensions = useBigFiveCalculation(isBigFiveTest ? result?.answers : undefined);
  const calculatedCognitiveDimensions = useCognitiveAbilitiesCalculation(isCognitiveTest ? result?.answers : undefined);
  const calculatedEnneagramDimensions = useEnneagramCalculation(isEnneagramTest ? result?.answers : undefined);
  const calculatedSJTDimensions = useSJTCalculation(isSJTTest ? result?.answers : undefined, []);

  // Calculate Cattell 16PF dimensions
  const calculatedCattell16PFDimensions = React.useMemo(() => {
    if (isCattell16PFTest && result?.answers) {
      const transformedAnswers = Object.entries(result.answers).reduce((acc, [key, value]) => {
        acc[`question-${key}`] = value;
        return acc;
      }, {} as Record<string, number>);
      
      const cattellResult = calculateCattellScore(transformedAnswers);
      return cattellResult;
    }
    return null;
  }, [isCattell16PFTest, result?.answers]);

  // Get the appropriate dimensions based on test type
  const testSpecificDimensions = React.useMemo(() => {
    if (isBigFiveTest && calculatedBigFiveDimensions) {
      return calculatedBigFiveDimensions;
    }
    
    if (isCognitiveTest && calculatedCognitiveDimensions) {
      return calculatedCognitiveDimensions;
    }

    if (isCattell16PFTest && calculatedCattell16PFDimensions) {
      return calculatedCattell16PFDimensions.dimensions;
    }

    if (isEnneagramTest && calculatedEnneagramDimensions) {
      return calculatedEnneagramDimensions;
    }

    if (isSJTTest && calculatedSJTDimensions) {
      return calculatedSJTDimensions;
    }

    if (isBelbinTest) {
      return result?.score?.role_scores || result?.score?.dimensions || {};
    }
    
    return result?.score?.dimensions || {};
  }, [
    isBigFiveTest, isCognitiveTest, isCattell16PFTest, isEnneagramTest, isSJTTest, isBelbinTest,
    calculatedBigFiveDimensions, calculatedCognitiveDimensions, calculatedCattell16PFDimensions,
    calculatedEnneagramDimensions, calculatedSJTDimensions, result?.score
  ]);

  // Create standardized score object
  const standardizedScore = React.useMemo(() => {
    if (!result) return null;

    let baseScore = standardizeScoreData(result.score, testName);

    // For Cattell 16PF, use the calculated result
    if (isCattell16PFTest && calculatedCattell16PFDimensions) {
      baseScore = {
        ...baseScore,
        overall: calculatedCattell16PFDimensions.overall,
        raw_score: calculatedCattell16PFDimensions.raw_score,
        max_score: calculatedCattell16PFDimensions.max_score,
        interpretation: calculatedCattell16PFDimensions.interpretation,
        dimensions: calculatedCattell16PFDimensions.dimensions,
        detailed_interpretations: calculatedCattell16PFDimensions.detailed_interpretations
      };
    } else {
      // For other tests, use calculated dimensions if available
      baseScore.dimensions = testSpecificDimensions;
    }

    // Translate interpretation if needed
    if (baseScore.interpretation) {
      baseScore.interpretation = translateInterpretation(baseScore.interpretation, language);
    }

    return baseScore;
  }, [result, testName, isCattell16PFTest, calculatedCattell16PFDimensions, testSpecificDimensions, language]);

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

  if (error || !result || !standardizedScore) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{labels.noResultsFound}</h2>
            <Button onClick={() => navigate('/tests')}>
              {labels.backToTests}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const scoreType = (testName.includes('16PF') || testName.includes('Cattell')) ? 'scale' : 'percentage';

  return (
    <div>
      <HomeNavigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header - Always show */}
          <TestResultHeader 
            testName={testName}
            completedAt={result.completed_at}
          />

          {/* Test Explanations - Always show */}
          <TestExplanations 
            testName={testName}
            score={standardizedScore}
            language={language}
          />

          {/* Scoring Explanation - Always show */}
          <ScoringExplanation 
            testName={testName}
            overallScore={standardizedScore.overall}
            scoreType={scoreType}
            dimensions={standardizedScore.dimensions}
            roleScores={standardizedScore.role_scores}
          />

          {/* Test-specific results sections */}
          {isSJTTest && (
            <SJTResults
              score={{
                overall: standardizedScore.overall,
                dimensions: standardizedScore.dimensions || {},
                interpretation: standardizedScore.interpretation,
                detailed_interpretations: standardizedScore.detailed_interpretations,
                recommendations: standardizedScore.recommendations,
                dominant_profile: standardizedScore.dominant_profile,
                secondary_profile: standardizedScore.secondary_profile
              }}
            />
          )}

          {isBelbinTest && (
            <BelbinRoleResults
              roleScores={standardizedScore.role_scores || standardizedScore.dimensions || {}}
              primaryRoles={standardizedScore.primary_roles || []}
              secondaryRoles={standardizedScore.secondary_roles || []}
              interpretation={standardizedScore.interpretation}
            />
          )}

          {/* Overall Score - show for non-Belbin, non-SJT, non-Enneagram tests */}
          {!isBelbinTest && !isSJTTest && !isEnneagramTest && standardizedScore.overall > 0 && (
            <OverallScoreCard score={standardizedScore} />
          )}

          {/* Correct Answers Section - only for cognitive tests */}
          {isCognitiveTest && (
            <CorrectAnswersSection 
              testTypeId={result.test_type_id}
              userAnswers={result.answers}
            />
          )}

          {/* Dimensions Analysis - only if meaningful dimensions exist */}
          {hasMeaningfulDimensions(standardizedScore.dimensions) && (
            <DimensionsAnalysis 
              dimensions={standardizedScore.dimensions!}
              testName={testName}
            />
          )}

          {/* Dimension Explanations - only if meaningful dimensions exist */}
          {hasMeaningfulDimensions(standardizedScore.dimensions) && (
            <DimensionExplanations 
              testName={testName}
              dimensions={standardizedScore.dimensions!}
            />
          )}

          {/* Detailed Interpretations - only if they exist and are meaningful */}
          {standardizedScore.detailed_interpretations && 
           Object.keys(standardizedScore.detailed_interpretations).length > 0 && 
           Object.values(standardizedScore.detailed_interpretations).some(interpretation => 
             interpretation && interpretation.trim() !== '' && interpretation !== 'Interpretarea nu este disponibilă'
           ) && (
            <DetailedInterpretations 
              interpretations={standardizedScore.detailed_interpretations}
              testName={testName}
            />
          )}

          {/* Charts Section - only if meaningful dimensions exist */}
          {hasMeaningfulDimensions(standardizedScore.dimensions) && (
            <TestResultCharts
              testName={testName}
              score={standardizedScore}
            />
          )}

          {/* Detailed Analysis Section - Always available */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{labels.generateAnalysis}</CardTitle>
              <p className="text-sm text-gray-600">
                {labels.analysisDescription}
              </p>
            </CardHeader>
            <CardContent>
              <DetailedAnalysisSection 
                dimensions={standardizedScore.dimensions || {}} 
                resultId={resultId!}
                testType={testName}
                score={standardizedScore}
              />
            </CardContent>
          </Card>

          {/* Actions - Always show */}
          <TestResultActions />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestResult;
