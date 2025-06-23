
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useCareerPlanGeneration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateCareerPlan = useMutation({
    mutationFn: async ({ careerGoal, testResults }: { careerGoal: string; testResults: any[] }) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase.functions.invoke('generate-career-plan', {
        body: {
          userId: user.id,
          careerGoal,
          testResults,
          userProfile: {}
        }
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate career plan');
      }

      return data.careerPlan;
    },
    onSuccess: (careerPlan) => {
      toast({
        title: "Plan de carieră generat!",
        description: `Planul "${careerPlan.title}" a fost creat cu succes.`,
      });
      
      // Refresh career plans
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
    },
    onError: (error: any) => {
      console.error('Error generating career plan:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera planul de carieră. Te rog încearcă din nou.",
        variant: "destructive"
      });
    }
  });

  const generateRecommendations = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase.functions.invoke('generate-career-recommendations', {
        body: {
          userId: user.id
        }
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate recommendations');
      }

      return data.recommendations;
    },
    onSuccess: (recommendations) => {
      toast({
        title: "Recomandări actualizate!",
        description: `${recommendations.length} recomandări noi au fost generate pentru tine.`,
      });
      
      // Refresh recommendations
      queryClient.invalidateQueries({ queryKey: ['career-recommendations'] });
    },
    onError: (error: any) => {
      console.error('Error generating recommendations:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut genera recomandările. Te rog încearcă din nou.",
        variant: "destructive"
      });
    }
  });

  return {
    generateCareerPlan,
    generateRecommendations,
    isGeneratingPlan: generateCareerPlan.isPending,
    isGeneratingRecommendations: generateRecommendations.isPending
  };
};
