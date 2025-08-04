
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

export interface CareerPlan {
  id: string;
  title: string;
  description: string | null;
  progress_percentage: number | null;
  generated_by_ai: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  user_id: string;
  milestones: any | null;
}

export interface CareerMilestone {
  id: string;
  career_path_id: string;
  title: string;
  description: string | null;
  target_date: string | null;
  completed_at: string | null;
  is_completed: boolean;
  milestone_order: number;
  created_at: string;
  updated_at: string;
}

export const useCareerPlans = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: careerPlans,
    isLoading,
    error
  } = useQuery({
    queryKey: ['career-plans', user?.id, language],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('career_paths')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Return the data as is for now, since the _en columns don't exist yet
      return data as CareerPlan[];
    },
    enabled: !!user?.id
  });

  const createCareerPlan = useMutation({
    mutationFn: async (planData: {
      title: string;
      description?: string;
      generated_by_ai?: boolean;
      milestones?: any[];
    }) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('career_paths')
        .insert({
          user_id: user.id,
          title: planData.title,
          description: planData.description,
          generated_by_ai: planData.generated_by_ai || false,
          milestones: planData.milestones || null,
          progress_percentage: 0
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
      toast({
        title: t('common.success'),
        description: t('careerPaths.messages.planCreated')
      });
    },
    onError: (error) => {
      console.error('Error creating career plan:', error);
      toast({
        title: t('common.error'),
        description: t('careerPaths.messages.createError'),
        variant: "destructive"
      });
    }
  });

  const updateCareerPlan = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CareerPlan> }) => {
      const { data, error } = await supabase
        .from('career_paths')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
      toast({
        title: t('common.success'),
        description: t('careerPaths.messages.planUpdated')
      });
    }
  });

  const deleteCareerPlan = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('career_paths')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
      toast({
        title: t('common.success'),
        description: t('careerPaths.messages.planDeleted')
      });
    }
  });

  return {
    careerPlans: careerPlans || [],
    isLoading,
    error,
    createCareerPlan,
    updateCareerPlan,
    deleteCareerPlan
  };
};
