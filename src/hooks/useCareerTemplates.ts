
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

      // Get user's test results for personalization
      const { data: testResults } = await supabase
        .from('test_results')
        .select('*, test_types(name)')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      // Get user profile
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // Call generate-career-plan edge function with template-specific data
      const { data: generatedPlan, error: generateError } = await supabase.functions.invoke(
        'generate-career-plan', 
        {
          body: {
            testResults: testResults || [],
            careerGoal: template.title,
            userProfile: userProfile || {},
            userId: userId,
            templateContext: {
              title: template.title,
              description: template.description,
              category: template.category,
              estimatedDurationMonths: template.estimated_duration_months,
              difficultyLevel: template.difficulty_level,
              requiredSkills: template.required_skills,
              targetRoles: template.target_roles
            }
          }
        }
      );

      if (generateError) throw generateError;

      if (!generatedPlan?.success) {
        throw new Error(generatedPlan?.error || 'Failed to generate career plan');
      }

      // The edge function already creates the plan and returns it with ID
      return generatedPlan.careerPlan;
    },
    onSuccess: (careerPlan) => {
      queryClient.invalidateQueries({ queryKey: ['career-plans'] });
      queryClient.invalidateQueries({ queryKey: ['career-recommendations'] });
      toast({
        title: "Plan generat cu succes!",
        description: `Planul "${careerPlan.title}" a fost creat cu resurse și milestone-uri concrete.`
      });
    },
    onError: (error) => {
      console.error('Error creating plan from template:', error);
      toast({
        title: "Eroare la generarea planului",
        description: "Nu am putut genera planul cu resurse. Încearcă din nou.",
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
