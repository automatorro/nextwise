
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ProgressSheet {
  id: string;
  user_id: string;
  user_question: string;
  extracted_objective: string;
  ai_analysis: string;
  recommendations: any[];
  next_steps: string[];
  is_saved: boolean;
  created_at: string;
  updated_at: string;
}

export const useProgressSheets = () => {
  const [sheets, setSheets] = useState<ProgressSheet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchSheets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('ai_progress_sheets')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_saved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching progress sheets:', error);
        return;
      }

      setSheets((data as ProgressSheet[]) || []);
    } catch (error) {
      console.error('Error fetching progress sheets:', error);
    }
  };

  const generateSheet = async (question: string) => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    try {
      // Call edge function to generate progress sheet
      const { data: sheetData, error: sheetError } = await supabase.functions.invoke('generate-progress-sheet', {
        body: { question }
      });

      if (sheetError) {
        console.error('Error generating sheet:', sheetError);
        throw sheetError;
      }

      // Create temporary sheet (not saved)
      const { data, error } = await supabase
        .from('ai_progress_sheets')
        .insert([
          {
            user_id: user.id,
            user_question: question,
            extracted_objective: sheetData.objective,
            ai_analysis: sheetData.analysis,
            recommendations: sheetData.recommendations,
            next_steps: sheetData.nextSteps,
            is_saved: false
          }
        ])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error generating progress sheet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const saveSheet = async (sheetId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_progress_sheets')
        .update({ is_saved: true })
        .eq('id', sheetId)
        .select()
        .single();

      if (error) throw error;

      await fetchSheets(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error saving progress sheet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSheet = async (sheetId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('ai_progress_sheets')
        .delete()
        .eq('id', sheetId);

      if (error) throw error;

      setSheets(sheets.filter(sheet => sheet.id !== sheetId));
    } catch (error) {
      console.error('Error deleting progress sheet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSheets();
  }, [user]);

  return {
    sheets,
    generateSheet,
    saveSheet,
    deleteSheet,
    isLoading,
    refetch: fetchSheets
  };
};
