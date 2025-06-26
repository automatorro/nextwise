
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';

interface TestResult {
  id: string;
  score: any;
  completed_at: string;
  test_types: {
    name: string;
    description: string;
  };
}

interface UserStats {
  totalTests: number;
  averageScore: number;
  completedThisMonth: number;
  bestCategory: string;
}

export const useProfileData = () => {
  const { user } = useAuth();

  // Fetch user's test results
  const { data: testResults, isLoading: resultsLoading } = useQuery({
    queryKey: ['user-test-results', user?.id],
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
        .eq('user_id', user?.id)
        .order('completed_at', { ascending: false });
      
      if (error) throw error;
      return data as TestResult[];
    },
    enabled: !!user?.id
  });

  // Fetch user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Calculate user statistics
  const userStats: UserStats = React.useMemo(() => {
    if (!testResults) return { totalTests: 0, averageScore: 0, completedThisMonth: 0, bestCategory: 'N/A' };

    const totalTests = testResults.length;
    const averageScore = testResults.length > 0 
      ? Math.round(testResults.reduce((sum, result) => sum + (result.score?.overall || 0), 0) / testResults.length)
      : 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const completedThisMonth = testResults.filter(result => {
      const resultDate = new Date(result.completed_at);
      return resultDate.getMonth() === currentMonth && resultDate.getFullYear() === currentYear;
    }).length;

    // Find best performing category (simplified)
    const categoryScores: { [key: string]: number[] } = {};
    testResults.forEach(result => {
      const category = result.test_types.name;
      if (!categoryScores[category]) categoryScores[category] = [];
      categoryScores[category].push(result.score?.overall || 0);
    });

    let bestCategory = 'N/A';
    let bestAverage = 0;
    Object.entries(categoryScores).forEach(([category, scores]) => {
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      if (average > bestAverage) {
        bestAverage = average;
        bestCategory = category;
      }
    });

    return { totalTests, averageScore, completedThisMonth, bestCategory };
  }, [testResults]);

  return {
    testResults: testResults || [],
    profile,
    userStats,
    isLoading: resultsLoading || profileLoading
  };
};
