
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCattell16PFSetup = () => {
  useEffect(() => {
    const setupCattell16PF = async () => {
      try {
        // Use a proper UUID for the Cattell 16PF test
        const cattell16PFTestId = 'f47ac10b-58cc-4372-a567-0e02b2c3d481';
        
        // Check if test already exists
        const { data: existingTest } = await supabase
          .from('test_types')
          .select('id')
          .eq('id', cattell16PFTestId)
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

        console.log('Creating Cattell 16PF test...');

        // Create the test type
        const { data: testType, error: testError } = await supabase
          .from('test_types')
          .insert({
            id: cattell16PFTestId,
            name: 'Cattell 16PF',
            description: 'Testul Cattell 16PF evaluează 16 factori primari de personalitate, oferind o imagine completă și detaliată a profilului tău psihologic.',
            category_id: category.id,
            questions_count: 48,
            estimated_duration: 25,
            subscription_required: 'professional'
          })
          .select()
          .single();

        if (testError) {
          console.error('Error creating test type:', testError);
          return;
        }

        console.log('Cattell 16PF test type created:', testType);

        // Add questions for each factor (3 questions per factor = 48 total)
        const cattell16PFQuestions = [
          // Factor A: Warmth
          { text: 'Îmi place să petrec timp cu oamenii și să fiu sociabil.', factor: 'A', weight: 1 },
          { text: 'Prefer să lucrez singur decât în echipă.', factor: 'A', weight: -1 },
          { text: 'Mă simt confortabil în grupuri mari de oameni.', factor: 'A', weight: 1 },
          
          // Factor B: Reasoning
          { text: 'Îmi place să rezolv probleme complexe și abstracte.', factor: 'B', weight: 1 },
          { text: 'Prefer soluții simple și practice la probleme.', factor: 'B', weight: -1 },
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
          
          // Factor G: Rule-Consciousness
          { text: 'Respect întotdeauna regulile și legile.', factor: 'G', weight: 1 },
          { text: 'Cred că regulile sunt făcute să fie încălcate.', factor: 'G', weight: -1 },
          { text: 'Sunt o persoană disciplinată și responsabilă.', factor: 'G', weight: 1 },
          
          // Factor H: Social Boldness
          { text: 'Mă simt confortabil să vorbesc cu străinii.', factor: 'H', weight: 1 },
          { text: 'Evit să atrag atenția asupra mea.', factor: 'H', weight: -1 },
          { text: 'Îmi place să fiu în centrul atenției.', factor: 'H', weight: 1 },
          
          // Factor I: Sensitivity
          { text: 'Sunt o persoană sensibilă și emotivă.', factor: 'I', weight: 1 },
          { text: 'Sunt o persoană practică și obiectivă.', factor: 'I', weight: -1 },
          { text: 'Mă emoționez ușor la filme sau cărți.', factor: 'I', weight: 1 },
          
          // Factor L: Vigilance
          { text: 'Sunt precaut cu oamenii necunoscuți.', factor: 'L', weight: 1 },
          { text: 'Am încredere în majoritatea oamenilor.', factor: 'L', weight: -1 },
          { text: 'Verific de două ori informațiile primite.', factor: 'L', weight: 1 },
          
          // Factor M: Abstractedness
          { text: 'Îmi place să mă gândesc la lucruri abstracte.', factor: 'M', weight: 1 },
          { text: 'Mă concentrez pe lucrurile practice.', factor: 'M', weight: -1 },
          { text: 'Îmi pierd adesea timpul cu vise cu ochii deschiși.', factor: 'M', weight: 1 },
          
          // Factor N: Privateness
          { text: 'Sunt o persoană deschisă și directă.', factor: 'N', weight: -1 },
          { text: 'Prefer să îmi păstrez gândurile pentru mine.', factor: 'N', weight: 1 },
          { text: 'Vorbesc deschis despre problemele mele.', factor: 'N', weight: -1 },
          
          // Factor O: Apprehension
          { text: 'Mă îngrijorez des pentru viitor.', factor: 'O', weight: 1 },
          { text: 'Sunt o persoană optimistă și încrezătoare.', factor: 'O', weight: -1 },
          { text: 'Mă gândesc adesea la ce ar putea merge prost.', factor: 'O', weight: 1 },
          
          // Factor Q1: Openness to Change
          { text: 'Îmi place să experimentez lucruri noi.', factor: 'Q1', weight: 1 },
          { text: 'Prefer metodele tradiționale și dovedite.', factor: 'Q1', weight: -1 },
          { text: 'Sunt deschis la idei neconvenționale.', factor: 'Q1', weight: 1 },
          
          // Factor Q2: Self-Reliance
          { text: 'Prefer să lucrez independent.', factor: 'Q2', weight: 1 },
          { text: 'Îmi place să fac parte dintr-o echipă.', factor: 'Q2', weight: -1 },
          { text: 'Iau decizii fără să mă consult cu alții.', factor: 'Q2', weight: 1 },
          
          // Factor Q3: Perfectionism
          { text: 'Sunt foarte organizat și metodic.', factor: 'Q3', weight: 1 },
          { text: 'Nu mă deranjează dezordinea.', factor: 'Q3', weight: -1 },
          { text: 'Verific totul de mai multe ori pentru a fi perfect.', factor: 'Q3', weight: 1 },
          
          // Factor Q4: Tension
          { text: 'Mă simt adesea tensionat sau stresat.', factor: 'Q4', weight: 1 },
          { text: 'Sunt o persoană relaxată și calmă.', factor: 'Q4', weight: -1 },
          { text: 'Am energie în exces și sunt foarte activ.', factor: 'Q4', weight: 1 }
        ];

        // Insert questions
        for (let i = 0; i < cattell16PFQuestions.length; i++) {
          const question = cattell16PFQuestions[i];
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
