import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AIProgram {
  id: string;
  user_id: string;
  program_type: string;
  current_day: number;
  is_active: boolean;
  is_completed: boolean;
  daily_tasks: any[];
  daily_reflections: any;
  intermediate_feedback?: string;
  final_feedback?: string;
  final_score?: number;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export const useAIPrograms = () => {
  const [activeProgram, setActiveProgram] = useState<AIProgram | null>(null);
  const [availablePrograms, setAvailablePrograms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchActiveProgram = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_programs_14_days')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setActiveProgram(data as AIProgram);
    } catch (error) {
      console.error('Error fetching active program:', error);
    }
  };

  const startProgram = async (programType: string) => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    try {
      // Deactivate any existing active programs
      await supabase
        .from('ai_programs_14_days')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('is_active', true);

      // Generate initial daily task using edge function
      const { data: taskData } = await supabase.functions.invoke('generate-daily-task', {
        body: { programType, day: 1 }
      });

      // Create new program
      const { data, error } = await supabase
        .from('ai_programs_14_days')
        .insert([
          {
            user_id: user.id,
            program_type: programType,
            current_day: 1,
            is_active: true,
            daily_tasks: [taskData]
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setActiveProgram(data as AIProgram);
    } catch (error) {
      console.error('Error starting program:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const submitReflection = async (reflection: string) => {
    if (!activeProgram || !user) throw new Error('No active program or user');

    setIsLoading(true);
    try {
      const currentDay = activeProgram.current_day;
      const updatedReflections = {
        ...activeProgram.daily_reflections,
        [currentDay]: reflection
      };

      // Get feedback and next day's task
      const { data: feedbackData } = await supabase.functions.invoke('process-reflection', {
        body: {
          programType: activeProgram.program_type,
          day: currentDay,
          reflection,
          programId: activeProgram.id
        }
      });

      const nextDay = currentDay + 1;
      const isCompleting = nextDay > 14;

      const updates: any = {
        daily_reflections: updatedReflections,
        updated_at: new Date().toISOString()
      };

      if (!isCompleting) {
        updates.current_day = nextDay;
        updates.daily_tasks = [...activeProgram.daily_tasks, feedbackData.nextTask];
      } else {
        updates.is_completed = true;
        updates.is_active = false;
        updates.completed_at = new Date().toISOString();
        updates.final_feedback = feedbackData.finalFeedback;
        updates.final_score = feedbackData.finalScore;
      }

      if (currentDay === 7) {
        updates.intermediate_feedback = feedbackData.intermediateFeedback;
      }

      const { data, error } = await supabase
        .from('ai_programs_14_days')
        .update(updates)
        .eq('id', activeProgram.id)
        .select()
        .single();

      if (error) throw error;

      setActiveProgram(data as AIProgram);
    } catch (error) {
      console.error('Error submitting reflection:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveProgram();
  }, [user]);

  return {
    activeProgram,
    availablePrograms,
    startProgram,
    submitReflection,
    isLoading,
    refetch: fetchActiveProgram
  };
};