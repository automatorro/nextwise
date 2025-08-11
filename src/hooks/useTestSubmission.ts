// src/hooks/useTestSubmission.ts

import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

/**
 * Acest hook are ACUM o singură responsabilitate, extrem de rapidă:
 * - Salvează răspunsurile brute ale unui test în baza de date.
 * - NU mai face niciun calcul. Toate calculele sunt delegate paginii de rezultate.
 */
export const useTestSubmission = () => {
  const { user } = useAuth();
  
  const submitTest = async (testId: string, answers: Record<string, number | string>) => {
    if (!user) throw new Error('User not authenticated');

    console.log('Submitting raw answers for test:', testId);

    // Salvarea directă și rapidă a datelor.
    const { data, error } = await supabase
      .from('test_results')
      .insert({
        user_id: user.id,
        test_type_id: testId,
        answers,
        // 'score' este acum gol, va fi calculat la cerere pe pagina de rezultate.
        score: {}, 
        completed_at: new Date().toISOString()
      })
      .select('id') // Selectăm doar ID-ul rezultatului, pentru a fi rapizi.
      .single();

    if (error) {
      console.error("Error saving test results:", error);
      throw error;
    }

    // Apelăm funcția de pe server pentru a incrementa numărul de teste, dar nu așteptăm răspunsul.
    // Acest lucru face ca interfața să nu mai aștepte după server.
    supabase.functions.invoke('increment-tests-taken', {
      body: { user_id: user.id }
    }).catch(err => console.error("Error incrementing tests taken:", err));


    return data; // Returnăm doar ID-ul, pentru a naviga la pagina de rezultate.
  };

  return { submitTest };
};