
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface CareerRecommendation {
  id: string;
  user_id: string;
  recommendation_type: 'skill' | 'path' | 'test' | 'course' | 'certification';
  title: string;
  description: string;
  action_text: string;
  action_type: string;
  action_data: any;
  category: string;
  estimated_time_minutes: number;
  priority: number;
  is_dismissed: boolean;
  based_on_test_ids: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useCareerRecommendations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: recommendations,
    isLoading,
    error
  } = useQuery({
    queryKey: ['career-recommendations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('career_recommendations' as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('is_dismissed', false)
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as any[]) as CareerRecommendation[];
    },
    enabled: !!user?.id
  });

  const dismissRecommendation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('career_recommendations' as any)
        .update({ is_dismissed: true })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-recommendations'] });
    }
  });

  return {
    recommendations: recommendations || [],
    isLoading,
    error,
    dismissRecommendation
  };
};
