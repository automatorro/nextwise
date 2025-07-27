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
  updated_at?: string;
  completed_at?: string;
}

export const useAISimulations = () => {
  const [activeSimulation, setActiveSimulation] = useState<AISimulation | null>(null);
  const [simulations, setSimulations] = useState<AISimulation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchActiveSimulation = async () => {
    if (!user) return;

    try {
      setError(null);
      const { data, error } = await supabase
        .from('ai_simulations')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_completed', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching active simulation:', error);
        setError('Eroare la încărcarea simulării');
        return;
      }

      setActiveSimulation(data as AISimulation);
    } catch (error) {
      console.error('Error fetching active simulation:', error);
      setError('Eroare la încărcarea simulării');
    }
  };

  const fetchCompletedSimulations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_simulations')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_completed', true)
        .order('completed_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching completed simulations:', error);
        return;
      }

      setSimulations(data as AISimulation[] || []);
    } catch (error) {
      console.error('Error fetching completed simulations:', error);
    }
  };

  const startSimulation = async (simulationType: string) => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    setError(null);
    
    try {
      // Complete any existing active simulations
      await supabase
        .from('ai_simulations')
        .update({ 
          is_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('is_completed', false);

      // Generate initial AI message
      const { data: initialMessage, error: messageError } = await supabase.functions.invoke('start-simulation', {
        body: { simulationType }
      });

      if (messageError) {
        console.error('Error starting simulation:', messageError);
        throw new Error('Eroare la pornirea simulării');
      }

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

      if (error) {
        console.error('Database error:', error);
        throw new Error('Eroare la crearea simulării');
      }

      setActiveSimulation(data as AISimulation);
    } catch (error) {
      console.error('Error starting simulation:', error);
      setError(error instanceof Error ? error.message : 'Eroare necunoscută');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const sendResponse = async (response: string) => {
    if (!activeSimulation || !user) {
      throw new Error('No active simulation or user');
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Sending response for simulation:', activeSimulation.id);
      
      const userMessage = {
        sender: 'user',
        content: response,
        timestamp: new Date().toISOString()
      };

      const updatedConversation = [...activeSimulation.conversation_log, userMessage];
      const updatedResponses = [...activeSimulation.user_responses, response];

      console.log('Updated conversation:', updatedConversation);
      console.log('Updated responses:', updatedResponses);

      // Get AI response
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('process-simulation-response', {
        body: {
          userResponse: response,
          conversationLog: updatedConversation,
          simulationType: activeSimulation.simulation_type
        }
      });

      if (aiError) {
        console.error('Error processing response:', aiError);
        throw new Error('Eroare la procesarea răspunsului');
      }

      console.log('AI Response received:', aiResponse);

      if (!aiResponse || typeof aiResponse.message !== 'string') {
        throw new Error('Răspuns invalid de la AI');
      }

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

      // Check if simulation should be completed
      if (aiResponse.shouldComplete) {
        updates.is_completed = true;
        updates.completed_at = new Date().toISOString();
        
        if (aiResponse.feedback) {
          updates.ai_feedback = aiResponse.feedback;
        }
        
        if (aiResponse.scores) {
          updates.clarity_score = aiResponse.scores.clarity || 0;
          updates.empathy_score = aiResponse.scores.empathy || 0;
          updates.conviction_score = aiResponse.scores.conviction || 0;
          updates.structure_score = aiResponse.scores.structure || 0;
          updates.overall_score = aiResponse.scores.overall || 0;
        }
      }

      console.log('Updating simulation with:', updates);

      const { data: updatedData, error: updateError } = await supabase
        .from('ai_simulations')
        .update(updates)
        .eq('id', activeSimulation.id)
        .select()
        .single();

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error('Eroare la salvarea conversației');
      }

      console.log('Simulation updated successfully:', updatedData);
      setActiveSimulation(updatedData as AISimulation);
      
    } catch (error) {
      console.error('Error sending response:', error);
      setError(error instanceof Error ? error.message : 'Eroare la trimiterea răspunsului');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearActiveSimulation = () => {
    setActiveSimulation(null);
    setError(null);
  };

  useEffect(() => {
    fetchActiveSimulation();
    fetchCompletedSimulations();
  }, [user]);

  return {
    activeSimulation,
    simulations,
    startSimulation,
    sendResponse,
    clearActiveSimulation,
    isLoading,
    error,
    refetch: () => {
      fetchActiveSimulation();
      fetchCompletedSimulations();
    }
  };
};
