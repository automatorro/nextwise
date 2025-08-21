import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface AIRecommendation {
  id: string;
  user_id: string;
  source_type: 'ai_analysis' | 'test_result' | 'career_plan';
  source_id?: string;
  recommendation_text: string;
  action_items: string[];
  priority: number;
  is_applied: boolean;
  created_at: string;
  expires_at?: string;
}

export const useAIRecommendations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: recommendations, isLoading, error } = useQuery({
    queryKey: ['ai-recommendations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('ai_recommendations')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_applied', false)
        .order('priority', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AIRecommendation[];
    },
    enabled: !!user?.id
  });

  const generateRecommendations = useMutation({
    mutationFn: async ({ analysisText, sourceType, sourceId, testType }: {
      analysisText: string;
      sourceType: 'ai_analysis' | 'test_result' | 'career_plan';
      sourceId?: string;
      testType?: string;
    }) => {
      const { data, error } = await supabase.functions.invoke('generate-ai-recommendations', {
        body: { 
          analysisText, 
          sourceType, 
          sourceId, 
          testType 
        }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations'] });
      toast({
        title: "Succes",
        description: "Recomandări noi generate pe baza analizei tale.",
      });
    }
  });

  const applyRecommendation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('ai_recommendations')
        .update({ is_applied: true })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-recommendations'] });
    }
  });

  return {
    recommendations: recommendations || [],
    isLoading,
    error,
    generateRecommendations,
    applyRecommendation
  };
};