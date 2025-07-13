import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ProgressData {
  tracking_date: string;
  steps_completed: number;
  milestones_reached: number;
  tests_retaken: number;
  achievement_description?: string;
  created_at: string;
}

interface ProgressDataByTimeframe {
  lastWeek: ProgressData[];
  lastMonth: ProgressData[];
  last3Months: ProgressData[];
  last6Months: ProgressData[];
}

export const useProgressTracking = () => {
  const [progressData, setProgressData] = useState<ProgressDataByTimeframe>({
    lastWeek: [],
    lastMonth: [],
    last3Months: [],
    last6Months: []
  });
  const [achievements, setAchievements] = useState<ProgressData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchProgressData = async () => {
    if (!user) return;

    try {
      const timeframes = {
        lastWeek: 7,
        lastMonth: 30,
        last3Months: 90,
        last6Months: 180
      };

      const data: ProgressDataByTimeframe = {
        lastWeek: [],
        lastMonth: [],
        last3Months: [],
        last6Months: []
      };

      for (const [key, days] of Object.entries(timeframes)) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const { data: progressData, error } = await supabase
          .from('user_progress_tracking')
          .select('*')
          .eq('user_id', user.id)
          .gte('tracking_date', startDate.toISOString().split('T')[0])
          .order('tracking_date', { ascending: true });

        if (error) throw error;

        data[key as keyof ProgressDataByTimeframe] = progressData || [];
      }

      setProgressData(data);

      // Fetch achievements (records with descriptions)
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('user_progress_tracking')
        .select('*')
        .eq('user_id', user.id)
        .not('achievement_description', 'is', null)
        .order('created_at', { ascending: false })
        .limit(10);

      if (achievementsError) throw achievementsError;

      setAchievements(achievementsData || []);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  const trackProgress = async (data: {
    steps_completed?: number;
    milestones_reached?: number;
    tests_retaken?: number;
    achievement_description?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const today = new Date().toISOString().split('T')[0];

      // Check if there's already a record for today
      const { data: existingData } = await supabase
        .from('user_progress_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('tracking_date', today)
        .single();

      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from('user_progress_tracking')
          .update({
            steps_completed: (existingData.steps_completed || 0) + (data.steps_completed || 0),
            milestones_reached: (existingData.milestones_reached || 0) + (data.milestones_reached || 0),
            tests_retaken: (existingData.tests_retaken || 0) + (data.tests_retaken || 0),
            achievement_description: data.achievement_description || existingData.achievement_description
          })
          .eq('id', existingData.id);

        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('user_progress_tracking')
          .insert([
            {
              user_id: user.id,
              tracking_date: today,
              steps_completed: data.steps_completed || 0,
              milestones_reached: data.milestones_reached || 0,
              tests_retaken: data.tests_retaken || 0,
              achievement_description: data.achievement_description
            }
          ]);

        if (error) throw error;
      }

      await fetchProgressData();
    } catch (error) {
      console.error('Error tracking progress:', error);
      throw error;
    }
  };

  const exportToPDF = async (timeframe: string) => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('export-progress-pdf', {
        body: {
          userId: user.id,
          timeframe,
          progressData: progressData[timeframe as keyof ProgressDataByTimeframe],
          achievements
        }
      });

      if (error) throw error;

      // Create download link
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `progress-report-${timeframe}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, [user]);

  return {
    progressData,
    achievements,
    trackProgress,
    exportToPDF,
    isLoading,
    refetch: fetchProgressData
  };
};