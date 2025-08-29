import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

export const useTestResultsManager = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const deleteTestResult = useMutation({
    mutationFn: async (testResultId: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('test_results')
        .delete()
        .eq('id', testResultId)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-results'] });
      toast({
        title: t('careerPlan.testInfluence.deleteSuccess'),
        description: t('careerPlan.testInfluence.deleteSuccessDesc'),
      });
    },
    onError: (error) => {
      console.error('Error deleting test result:', error);
      toast({
        title: t('common.error'),
        description: t('careerPlan.testInfluence.deleteError'),
        variant: 'destructive',
      });
    },
  });

  const bulkDeleteOldResults = useMutation({
    mutationFn: async (keepLatestCount: number = 10) => {
      if (!user?.id) throw new Error('User not authenticated');

      // Get all test results ordered by date
      const { data: allResults, error: fetchError } = await supabase
        .from('test_results')
        .select('id, completed_at')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (allResults && allResults.length > keepLatestCount) {
        const resultsToDelete = allResults.slice(keepLatestCount);
        const idsToDelete = resultsToDelete.map(result => result.id);

        const { error: deleteError } = await supabase
          .from('test_results')
          .delete()
          .in('id', idsToDelete)
          .eq('user_id', user.id);

        if (deleteError) throw deleteError;
        return resultsToDelete.length;
      }
      
      return 0;
    },
    onSuccess: (deletedCount) => {
      queryClient.invalidateQueries({ queryKey: ['test-results'] });
      toast({
        title: t('careerPlan.testInfluence.bulkDeleteSuccess'),
        description: t('careerPlan.testInfluence.bulkDeleteSuccessDesc', { count: deletedCount.toString() }),
      });
    },
    onError: (error) => {
      console.error('Error bulk deleting test results:', error);
      toast({
        title: t('common.error'),
        description: t('careerPlan.testInfluence.bulkDeleteError'),
        variant: 'destructive',
      });
    },
  });

  return {
    deleteTestResult: deleteTestResult.mutate,
    bulkDeleteOldResults: bulkDeleteOldResults.mutate,
    isDeleting: deleteTestResult.isPending || bulkDeleteOldResults.isPending,
  };
};