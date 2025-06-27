
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

      // Create new career plan
      const { data: careerPlan, error: planError } = await supabase
        .from('career_paths')
        .insert({
          user_id: userId,
          title: customizations?.title || `Plan ${template.title}`,
          description: customizations?.description || template.description,
          generated_by_ai: false,
          progress_percentage: 0
        })
        .select()
        .single();

      if (planError) throw planError;

      // Create milestones from template
      const milestones = templateMilestones.map((tm, index) => {
        const startDate = new Date();
        const weeksOffset = templateMilestones
          .slice(0, index)
          .reduce((sum, m) => sum + m.estimated_duration_weeks, 0);
        
        const targetDate = new Date(startDate);
        targetDate.setDate(targetDate.getDate() + (weeksOffset * 7));

        return {
          career_path_id: careerPlan.id,
          title: tm.title,
          description: tm.description,
          milestone_order: tm.milestone_order,
          target_date: targetDate.toISOString().split('T')[0],
          is_completed: false
        };
      });

      const { error: milestonesInsertError } = await supabase
        .from('career_milestones')
        .insert(milestones);

      if (milestonesInsertError) throw milestonesInsertError;

      return careerPlan;
    },
    onSuccess: (careerPlan) => {
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
      toast({
        title: "Plan creat cu succes!",
        description: `Planul "${careerPlan.title}" a fost creat din template.`
      });
    },
    onError: (error) => {
      console.error('Error creating plan from template:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut crea planul din template.",
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
