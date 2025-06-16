
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export const useCareerMilestones = (careerPathId?: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: milestones,
    isLoading,
    error
  } = useQuery({
    queryKey: ['career-milestones', careerPathId],
    queryFn: async () => {
      if (!careerPathId) return [];

      const { data, error } = await supabase
        .from('career_milestones' as any)
        .select('*')
        .eq('career_path_id', careerPathId)
        .order('milestone_order', { ascending: true });

      if (error) throw error;
      return data as CareerMilestone[];
    },
    enabled: !!careerPathId
  });

  const createMilestone = useMutation({
    mutationFn: async (milestoneData: {
      career_path_id: string;
      title: string;
      description?: string;
      target_date?: string;
      milestone_order?: number;
    }) => {
      const { data, error } = await supabase
        .from('career_milestones' as any)
        .insert(milestoneData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-milestones'] });
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
      toast({
        title: "Success",
        description: "Milestone-ul a fost creat cu succes!"
      });
    }
  });

  const updateMilestone = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CareerMilestone> }) => {
      const { data, error } = await supabase
        .from('career_milestones' as any)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-milestones'] });
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
      toast({
        title: "Success",
        description: "Milestone-ul a fost actualizat!"
      });
    }
  });

  const toggleMilestone = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const updates: Partial<CareerMilestone> = {
        is_completed: completed,
        completed_at: completed ? new Date().toISOString() : null
      };

      const { data, error } = await supabase
        .from('career_milestones' as any)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-milestones'] });
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
    }
  });

  const deleteMilestone = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('career_milestones' as any)
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-milestones'] });
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
      toast({
        title: "Success",
        description: "Milestone-ul a fost șters!"
      });
    }
  });

  return {
    milestones: milestones || [],
    isLoading,
    error,
    createMilestone,
    updateMilestone,
    toggleMilestone,
    deleteMilestone
  };
};
