
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useTestSubmission = () => {
  const { user } = useAuth();
  
  const submitTest = async (testId: string, answers: Record<string, number>, sessionId: string) => {
    if (!user) throw new Error('User not authenticated');

    console.log('Submitting test:', testId);
    console.log('Answers:', answers);

    // Get test details first
    const { data: testDetails, error: testError } = await supabase
      .from('test_types')
      .select('name')
      .eq('id', testId)
      .single();

    if (testError) throw testError;

    const testName = testDetails.name.toLowerCase();
    console.log('Test name:', testName);

    // Get questions for scoring
    const { data: questions, error: questionsError } = await supabase
      .from('test_questions')
      .select('*')
      .eq('test_type_id', testId)
      .order('question_order');

    if (questionsError) throw questionsError;

    let calculatedScore;

    // Use appropriate calculator based on test type
    if (testName.includes('watson') || testName.includes('glaser')) {
      console.log('Using Watson-Glaser calculator');
      const { calculateWatsonGlaserScore } = await import('@/utils/testCalculations/watsonGlaserCalculation');
      calculatedScore = calculateWatsonGlaserScore(answers);
    } else if (testName.includes('big five') || testName.includes('big-five')) {
      const { calculateBigFiveScore } = await import('@/utils/testCalculations/bigFiveCalculation');
      calculatedScore = calculateBigFiveScore(answers, questions);
    } else if (testName.includes('hexaco')) {
      const { calculateHexacoScore } = await import('@/utils/testCalculations/hexacoCalculation');
      calculatedScore = calculateHexacoScore(answers);
    } else if (testName.includes('cattell') || testName.includes('16pf')) {
      const { calculateCattellScore } = await import('@/utils/testCalculations/cattellCalculation');
      calculatedScore = calculateCattellScore(answers);
    } else if (testName.includes('belbin')) {
      const { calculateBelbinScore } = await import('@/utils/testCalculations/belbinCalculation');
      calculatedScore = calculateBelbinScore(answers);
    } else if (testName.includes('disc')) {
      const { calculateDISCScore } = await import('@/utils/testCalculations/discCalculation');
      calculatedScore = calculateDISCScore(answers);
    } else if (testName.includes('enneagram')) {
      const { calculateEnneagramScore } = await import('@/utils/testCalculations/enneagramCalculation');
      calculatedScore = calculateEnneagramScore(answers);
    } else if (testName.includes('gad') || testName.includes('anxiety')) {
      const { calculateGADScore } = await import('@/utils/testCalculations/gadCalculation');
      calculatedScore = calculateGADScore(answers);
    } else if (testName.includes('emotional') || testName.includes('eq')) {
      const { calculateEmotionalIntelligenceScore } = await import('@/utils/testCalculations/emotionalIntelligenceCalculation');
      calculatedScore = calculateEmotionalIntelligenceScore(answers);
    } else if (testName.includes('holland') || testName.includes('riasec') || testName.includes('occupational themes')) {
      console.log('Using Holland RIASEC calculator');
      const { calculateHollandScore } = await import('@/utils/testCalculations/hollandCalculation');
      calculatedScore = calculateHollandScore(answers);
    } else if (testName.includes('sjt') || testName.includes('situational')) {
      const { calculateSJTScore } = await import('@/utils/testCalculations/sjtCalculation');
      calculatedScore = calculateSJTScore(answers, questions);
    } else if (testName.includes('cognitive') || testName.includes('cognitiv')) {
      const { calculateCognitiveScore } = await import('@/utils/testCalculations/cognitiveCalculation');
      calculatedScore = calculateCognitiveScore(answers, questions);
    } else {
      // Generic fallback calculation
      console.log('Using generic calculation for:', testName);
      const totalQuestions = questions.length;
      const answeredQuestions = Object.keys(answers).length;
      const overall = Math.round((answeredQuestions / totalQuestions) * 100);
      
      calculatedScore = {
        overall,
        dimensions: {},
        interpretations: {}
      };
    }

    console.log('Calculated score:', calculatedScore);

    // Insert result into database
    const { data, error } = await supabase
      .from('test_results')
      .insert({
        user_id: user.id,
        test_type_id: testId,
        answers,
        score: calculatedScore,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    // Update subscription usage with edge function call
    try {
      const { error: updateError } = await supabase.functions.invoke('increment-tests-taken', {
        body: { user_id: user.id }
      });

      if (updateError) {
        console.error('Error updating subscription usage:', updateError);
        // Don't throw here as the test was successfully submitted
      }
    } catch (error) {
      console.error('Error calling increment-tests-taken function:', error);
      // Don't throw here as the test was successfully submitted
    }

    return data;
  };

  return { submitTest };
};
