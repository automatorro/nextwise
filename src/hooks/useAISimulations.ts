import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AISimulation {
  id: string;
  user_id: string;
  simulation_type: string;
  conversation_log: any[];
  user_responses: any[];
  ai_feedback?: string;
  clarity_score?: number;
  empathy_score?: number;
  conviction_score?: number;
  structure_score?: number;
  overall_score?: number;
  is_completed: boolean;
  created_at: string;
  completed_at?: string;
}

export const useAISimulations = () => {
  const [activeSimulation, setActiveSimulation] = useState<AISimulation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchActiveSimulation = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_simulations')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_completed', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setActiveSimulation(data as AISimulation);
    } catch (error) {
      console.error('Error fetching active simulation:', error);
    }
  };

  const startSimulation = async (simulationType: string) => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    try {
      // Complete any existing active simulations
      await supabase
        .from('ai_simulations')
        .update({ is_completed: true })
        .eq('user_id', user.id)
        .eq('is_completed', false);

      // Generate initial AI message using edge function
      const { data: initialMessage } = await supabase.functions.invoke('start-simulation', {
        body: { simulationType }
      });

      // Create new simulation
      const { data, error } = await supabase
        .from('ai_simulations')
        .insert([
          {
            user_id: user.id,
            simulation_type: simulationType,
            conversation_log: [
              {
                sender: 'ai',
                content: initialMessage.message,
                timestamp: new Date().toISOString()
              }
            ],
            user_responses: [],
            is_completed: false
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setActiveSimulation(data as AISimulation);
    } catch (error) {
      console.error('Error starting simulation:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendResponse = async (response: string) => {
    if (!activeSimulation || !user) throw new Error('No active simulation or user');

    setIsLoading(true);
    try {
      const userMessage = {
        sender: 'user',
        content: response,
        timestamp: new Date().toISOString()
      };

      const updatedConversation = [...activeSimulation.conversation_log, userMessage];
      const updatedResponses = [...activeSimulation.user_responses, response];

      // Get AI response using edge function
      const { data: aiResponse } = await supabase.functions.invoke('process-simulation-response', {
        body: {
          simulationType: activeSimulation.simulation_type,
          conversationLog: updatedConversation,
          userResponse: response,
          simulationId: activeSimulation.id
        }
      });

      const aiMessage = {
        sender: 'ai',
        content: aiResponse.message,
        timestamp: new Date().toISOString()
      };

      const finalConversation = [...updatedConversation, aiMessage];

      const updates: any = {
        conversation_log: finalConversation,
        user_responses: updatedResponses,
        updated_at: new Date().toISOString()
      };

      // Check if simulation should be completed (after 3-5 exchanges)
      if (updatedResponses.length >= 3 || aiResponse.shouldComplete) {
        updates.is_completed = true;
        updates.completed_at = new Date().toISOString();
        updates.ai_feedback = aiResponse.feedback;
        updates.clarity_score = aiResponse.scores?.clarity;
        updates.empathy_score = aiResponse.scores?.empathy;
        updates.conviction_score = aiResponse.scores?.conviction;
        updates.structure_score = aiResponse.scores?.structure;
        updates.overall_score = aiResponse.scores?.overall;
      }

      const { data, error } = await supabase
        .from('ai_simulations')
        .update(updates)
        .eq('id', activeSimulation.id)
        .select()
        .single();

      if (error) throw error;

      setActiveSimulation(data as AISimulation);
    } catch (error) {
      console.error('Error sending response:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveSimulation();
  }, [user]);

  return {
    activeSimulation,
    startSimulation,
    sendResponse,
    isLoading,
    refetch: fetchActiveSimulation
  };
};