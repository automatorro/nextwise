
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CareerTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  estimated_duration_months: number;
  difficulty_level: string;
  required_skills: string[] | null;
  target_roles: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateMilestone {
  id: string;
  template_id: string;
  title: string;
  description: string | null;
  milestone_order: number;
  estimated_duration_weeks: number;
  required_skills: string[] | null;
  resources: any | null;
  created_at: string;
}

export const useCareerTemplates = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: templates,
    isLoading,
    error
  } = useQuery({
    queryKey: ['career-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('career_plan_templates')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('title', { ascending: true });

      if (error) throw error;
      return data as CareerTemplate[];
    }
  });

  const getTemplateMilestones = (templateId: string) => {
    return useQuery({
      queryKey: ['template-milestones', templateId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('career_template_milestones')
          .select('*')
          .eq('template_id', templateId)
          .order('milestone_order', { ascending: true });

        if (error) throw error;
        return data as TemplateMilestone[];
      },
      enabled: !!templateId
    });
  };

  const createPlanFromTemplate = useMutation({
    mutationFn: async ({ templateId, userId, customizations }: {
      templateId: string;
      userId: string;
      customizations?: {
        title?: string;
        description?: string;
        adjustMonths?: number;
      };
    }) => {
      // Get template details
      const { data: template, error: templateError } = await supabase
        .from('career_plan_templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (templateError) throw templateError;

      // Get template milestones
      const { data: templateMilestones, error: milestonesError } = await supabase
        .from('career_template_milestones')
        .select('*')
        .eq('template_id', templateId)
        .order('milestone_order', { ascending: true });

      if (milestonesError) throw milestonesError;

      // Create the career plan first
      const { data: careerPlan, error: planError } = await supabase
        .from('career_paths')
        .insert({
          user_id: userId,
          title: customizations?.title || `Plan ${template.title}`,
          description: customizations?.description || template.description,
          generated_by_ai: false, // Templates are not AI-generated
          progress_percentage: 0
        })
        .select()
        .single();

      if (planError) throw planError;

      // Convert template milestones to career milestones
      if (templateMilestones && templateMilestones.length > 0) {
        const careerMilestones = templateMilestones.map((tm, index) => ({
          career_path_id: careerPlan.id,
          title: tm.title,
          description: tm.description,
          milestone_order: tm.milestone_order,
          is_completed: false,
          target_date: null, // User can set this later
          resources: tm.resources // Copy resources from template
        }));

        const { error: milestonesInsertError } = await supabase
          .from('career_milestones')
          .insert(careerMilestones);

        if (milestonesInsertError) throw milestonesInsertError;
      }

      return {
        ...careerPlan,
        milestones: templateMilestones // Include template milestones for display
      };
    },
    onSuccess: (careerPlan) => {
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
      queryClient.invalidateQueries({ queryKey: ['career-recommendations'] });
      toast({
        title: "Template aplicat cu succes!",
        description: `Planul "${careerPlan.title}" a fost creat cu milestone-urile din template.`
      });
    },
    onError: (error) => {
      console.error('Error creating plan from template:', error);
      toast({
        title: "Eroare la aplicarea template-ului",
        description: "Nu am putut crea planul din template. Încearcă din nou.",
        variant: "destructive"
      });
    }
  });

  return {
    templates: templates || [],
    isLoading,
    error,
    getTemplateMilestones,
    createPlanFromTemplate
  };
};
