
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCattell16PFSetup = () => {
  useEffect(() => {
    const setupCattell16PF = async () => {
      try {
        // Check if test already exists
        const { data: existingTest } = await supabase
          .from('test_types')
          .select('id')
          .eq('name', 'Cattell 16PF')
          .single();

        if (existingTest) {
          console.log('Cattell 16PF test already exists');
          return;
        }

        // Get personality category
        const { data: category } = await supabase
          .from('test_categories')
          .select('id')
          .eq('name', 'Personalitate')
          .single();

        if (!category) {
          console.error('Personality category not found');
          return;
        }

        // Create the test type
        const { data: testType, error: testError } = await supabase
          .from('test_types')
          .insert({
            name: 'Cattell 16PF',
            description: 'Testul Cattell 16PF evaluează 16 factori primari de personalitate, oferind o imagine completă și detaliată a profilului tău psihologic.',
            category_id: category.id,
            questions_count: 50,
            estimated_duration: 20,
            subscription_required: 'professional'
          })
          .select()
          .single();

        if (testError) {
          console.error('Error creating test type:', testError);
          return;
        }

        console.log('Cattell 16PF test type created:', testType);

        // Add sample questions for each factor
        const sampleQuestions = [
          // Factor A: Warmth
          { text: 'Îmi place să petrec timp cu oamenii.', factor: 'A', weight: 1 },
          { text: 'Prefer să lucrez singur decât în echipă.', factor: 'A', weight: -1 },
          { text: 'Mă simt confortabil în grupuri mari de oameni.', factor: 'A', weight: 1 },
          
          // Factor B: Reasoning
          { text: 'Îmi place să rezolv probleme complexe.', factor: 'B', weight: 1 },
          { text: 'Prefer soluții simple la probleme.', factor: 'B', weight: -1 },
          { text: 'Îmi place să analizez situațiile din multiple perspective.', factor: 'B', weight: 1 },
          
          // Factor C: Emotional Stability
          { text: 'Rămân calm în situații stresante.', factor: 'C', weight: 1 },
          { text: 'Mă supăr ușor când lucrurile nu merg cum trebuie.', factor: 'C', weight: -1 },
          { text: 'Pot controla bine emoțiile mele.', factor: 'C', weight: 1 },
          
          // Factor E: Dominance
          { text: 'Îmi place să fiu liderul unui grup.', factor: 'E', weight: 1 },
          { text: 'Prefer să urmez decât să conduc.', factor: 'E', weight: -1 },
          { text: 'Îmi impun punctul de vedere în discuții.', factor: 'E', weight: 1 },
          
          // Factor F: Liveliness
          { text: 'Sunt o persoană veselă și energică.', factor: 'F', weight: 1 },
          { text: 'Sunt o persoană serioasă și rezervată.', factor: 'F', weight: -1 },
          { text: 'Îmi place să fac glume și să râd.', factor: 'F', weight: 1 },
          
          // Continue with other factors...
          // Factor G: Rule-Consciousness
          { text: 'Respect întotdeauna regulile și legile.', factor: 'G', weight: 1 },
          { text: 'Cred că regulile sunt făcute să fie încălcate.', factor: 'G', weight: -1 },
          
          // Factor H: Social Boldness
          { text: 'Mă simt confortabil să vorbesc cu străinii.', factor: 'H', weight: 1 },
          { text: 'Evit să atrag atenția asupra mea.', factor: 'H', weight: -1 },
          
          // Factor I: Sensitivity
          { text: 'Sunt o persoană sensibilă și emotivă.', factor: 'I', weight: 1 },
          { text: 'Sunt o persoană practică și obiectivă.', factor: 'I', weight: -1 },
          
          // Factor L: Vigilance
          { text: 'Sunt precaut cu oamenii necunoscuți.', factor: 'L', weight: 1 },
          { text: 'Am încredere în majoritatea oamenilor.', factor: 'L', weight: -1 },
          
          // Factor M: Abstractedness
          { text: 'Îmi place să mă gândesc la lucruri abstracte.', factor: 'M', weight: 1 },
          { text: 'Mă concentrez pe lucrurile practice.', factor: 'M', weight: -1 },
          
          // Factor N: Privateness
          { text: 'Sunt o persoană deschisă și directă.', factor: 'N', weight: -1 },
          { text: 'Prefer să îmi păstrez gândurile pentru mine.', factor: 'N', weight: 1 },
          
          // Factor O: Apprehension
          { text: 'Mă îngrijorez des pentru viitor.', factor: 'O', weight: 1 },
          { text: 'Sunt o persoană optimistă și încrezătoare.', factor: 'O', weight: -1 },
          
          // Factor Q1: Openness to Change
          { text: 'Îmi place să experimentez lucruri noi.', factor: 'Q1', weight: 1 },
          { text: 'Prefer metodele tradiționale și dovedite.', factor: 'Q1', weight: -1 },
          
          // Factor Q2: Self-Reliance
          { text: 'Prefer să lucrez independent.', factor: 'Q2', weight: 1 },
          { text: 'Îmi place să fac parte dintr-o echipă.', factor: 'Q2', weight: -1 },
          
          // Factor Q3: Perfectionism
          { text: 'Sunt foarte organizat și metodic.', factor: 'Q3', weight: 1 },
          { text: 'Nu mă deranjează dezordinea.', factor: 'Q3', weight: -1 },
          
          // Factor Q4: Tension
          { text: 'Mă simt adesea tensionat sau stresat.', factor: 'Q4', weight: 1 },
          { text: 'Sunt o persoană relaxată și calmă.', factor: 'Q4', weight: -1 }
        ];

        // Insert questions
        for (let i = 0; i < sampleQuestions.length; i++) {
          const question = sampleQuestions[i];
          const { error: questionError } = await supabase
            .from('test_questions')
            .insert({
              test_type_id: testType.id,
              question_text: question.text,
              question_order: i + 1,
              question_type: 'likert_scale',
              options: [
                { text: 'Complet dezacord', value: 1 },
                { text: 'Dezacord', value: 2 },
                { text: 'Neutru', value: 3 },
                { text: 'De acord', value: 4 },
                { text: 'Complet de acord', value: 5 }
              ],
              scoring_weights: { [question.factor]: question.weight }
            });

          if (questionError) {
            console.error('Error inserting question:', questionError);
          }
        }

        console.log('Cattell 16PF questions inserted successfully');

      } catch (error) {
        console.error('Error setting up Cattell 16PF:', error);
      }
    };

    setupCattell16PF();
  }, []);
};
