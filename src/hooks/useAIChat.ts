
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: string;
  session_id: string;
  user_id: string;
  message_type: 'user' | 'ai';
  content: string;
  created_at: string;
}

export const useAIChat = (sessionId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch chat history
  const {
    data: messages,
    isLoading: isLoadingHistory,
    error
  } = useQuery({
    queryKey: ['chat-messages', sessionId],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('career_chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return (data as any[]) as ChatMessage[];
    },
    enabled: !!user?.id && !!sessionId
  });

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      setIsLoading(true);

      try {
        // Call the AI mentoring edge function
        const { data: aiResponse, error: aiError } = await supabase.functions.invoke('ai-mentoring', {
          body: {
            message: content,
            sessionId: sessionId,
            userId: user.id
          }
        });

        if (aiError) throw aiError;

        if (!aiResponse.success) {
          throw new Error(aiResponse.error || 'Failed to get AI response');
        }

        return aiResponse.response;
      } catch (error) {
        console.error('Error calling AI mentoring:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      // Refresh the chat messages
      queryClient.invalidateQueries({ queryKey: ['chat-messages', sessionId] });
    },
    onError: (error) => {
      console.error('Error in AI chat:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut trimite mesajul. Te rog încearcă din nou.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  });

  const handleSendMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    sendMessage.mutate(content);
  }, [sendMessage]);

  return {
    messages: messages || [],
    isLoadingHistory,
    isLoading,
    error,
    sendMessage: handleSendMessage
  };
};
