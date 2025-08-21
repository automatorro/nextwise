import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export interface UserNote {
  id: string;
  user_id: string;
  title: string;
  content: string;
  note_type: string;
  test_type?: string;
  test_result_id?: string;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export const useUserNotes = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: notes, isLoading, error } = useQuery({
    queryKey: ['user-notes', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserNote[];
    },
    enabled: !!user?.id
  });

  const createNote = useMutation({
    mutationFn: async (noteData: Omit<UserNote, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_notes')
        .insert({
          ...noteData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-notes'] });
      toast({
        title: "Succes",
        description: "Nota a fost salvată cu succes.",
      });
    },
    onError: (error) => {
      toast({
        title: "Eroare",
        description: "Nu am putut salva nota. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    }
  });

  const updateNote = useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<UserNote> & { id: string }) => {
      const { data, error } = await supabase
        .from('user_notes')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-notes'] });
      toast({
        title: "Succes",
        description: "Nota a fost actualizată cu succes.",
      });
    }
  });

  const deleteNote = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('user_notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-notes'] });
      toast({
        title: "Succes",
        description: "Nota a fost ștearsă cu succes.",
      });
    }
  });

  return {
    notes: notes || [],
    isLoading,
    error,
    createNote,
    updateNote,
    deleteNote
  };
};