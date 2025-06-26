
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Question {
  id: string;
  options: any;
  options_en: any;
  question_text_ro: string;
  question_text_en: string;
  test_type_id: string;
}

// Complete DISC test question translations - mapped to actual Romanian text
const DISC_QUESTION_TRANSLATIONS: { [key: string]: string } = {
  'În situații de lucru în echipă, eu sunt cel care:': 'In team work situations, I am the one who:',
  'Când iau decizii importante:': 'When making important decisions:',
  'Sub presiune, eu:': 'Under pressure, I:',
  'În comunicare, eu prefer să:': 'In communication, I prefer to:',
  'Când lucrez la un proiect:': 'When working on a project:',
  'În conflict, eu de obicei:': 'In conflict, I usually:',
  'Mediul meu de lucru ideal ar fi:': 'My ideal work environment would be:',
  'Când îmi stabilesc obiective:': 'When setting my goals:',
  'În timpul liber, eu prefer să:': 'In my free time, I prefer to:',
  'Când învăț ceva nou:': 'When learning something new:',
  'În întâlniri de lucru:': 'In work meetings:',
  'Când planific o vacanță:': 'When planning a vacation:',
  'În situații noi:': 'In new situations:',
  'Când dau feedback altora:': 'When giving feedback to others:',
  'În managementul timpului:': 'In time management:',
  'Când conduc o echipă:': 'When leading a team:',
  'În negocieri:': 'In negotiations:',
  'Când primesc critici:': 'When receiving criticism:',
  'În rezolvarea problemelor:': 'In problem solving:',
  'În ceea ce privește schimbarea:': 'Regarding change:',
  'În delegarea sarcinilor:': 'In delegating tasks:',
  'Când iau riscuri:': 'When taking risks:',
  'În prezentări publice:': 'In public presentations:',
  'În gestionarea stresului:': 'In stress management:',
  'Când lucrez independent:': 'When working independently:',
  'În crearea de relații:': 'In building relationships:',
  'În atingerea obiectivelor:': 'In achieving goals:',
  'Când văd o oportunitate nouă:': 'When I see a new opportunity:'
};

// Complete DISC option translations - mapped to actual Romanian options
const DISC_OPTION_TRANSLATIONS: { [key: string]: string } = {
  'Iau inițiativa și conduc echipa': 'Take initiative and lead the team',
  'Motivez și entuziasmez echipa': 'Motivate and energize the team',
  'Asigur stabilitatea și cooperarea': 'Ensure stability and cooperation',
  'Analizez detaliile și urmăresc calitatea': 'Analyze details and pursue quality',
  'Decid rapid și ferm': 'Decide quickly and firmly',
  'Consult cu alții și caut consensul': 'Consult with others and seek consensus',
  'Iau timp să mă gândesc bine': 'Take time to think carefully',
  'Analizez toate datele disponibile': 'Analyze all available data',
  'Devin mai direct și hotărât': 'Become more direct and decisive',
  'Caut sprijinul celorlalți': 'Seek support from others',
  'Rămân calm și perseverent': 'Stay calm and perseverant',
  'Mă concentrez pe respectarea procedurilor': 'Focus on following procedures',
  'Fiu direct și concis': 'Be direct and concise',
  'Fiu expresiv și prietenos': 'Be expressive and friendly',
  'Ascult cu atenție și empatie': 'Listen carefully and empathetically',
  'Fiu precis și factualizat': 'Be precise and factual',
  'Mă concentrez pe rezultate rapide': 'Focus on quick results',
  'Îmi place să colaborez cu alții': 'I like to collaborate with others',
  'Urmăresc un progres constant': 'Pursue steady progress',
  'Mă asigur că totul este perfect': 'Make sure everything is perfect',
  'Abordez direct problema': 'Address the problem directly',
  'Încerc să găsesc o soluție care să mulțumească pe toți': 'Try to find a solution that satisfies everyone',
  'Evit confrontarea directă': 'Avoid direct confrontation',
  'Prezint faptele obiectiv': 'Present facts objectively',
  'Dinamic și provocator': 'Dynamic and challenging',
  'Social și colaborativ': 'Social and collaborative',
  'Stabil și predictibil': 'Stable and predictable',
  'Organizat și structurat': 'Organized and structured',
  'Îmi place să îmi asum riscuri mari': 'I like to take big risks',
  'Caut obiective care implică lucrul cu oamenii': 'Seek goals that involve working with people',
  'Prefer obiective realiste și realizabile': 'Prefer realistic and achievable goals',
  'Stabilesc standarde înalte de calitate': 'Set high quality standards',
  'Fac sporturi competitive': 'Do competitive sports',
  'Socializez cu prietenii': 'Socialize with friends',
  'Mă relaxez acasă': 'Relax at home',
  'Urmăresc hobby-uri care necesită precizie': 'Pursue hobbies that require precision',
  'Vreau să practic imediat': 'Want to practice immediately',
  'Îmi place să discut cu alții despre subiect': 'I like to discuss with others about the subject',
  'Iau timpul necesar pentru a înțelege bine': 'Take the necessary time to understand well',
  'Studiez toate detaliile înainte de a începe': 'Study all details before starting',
  'Îmi place să conduc discuția': 'I like to lead the discussion',
  'Contribui cu idei creative': 'Contribute creative ideas',
  'Ascult și sprijin ideile altora': 'Listen and support others\' ideas',
  'Pun întrebări despre detalii': 'Ask questions about details',
  'Aleg destinații aventuroase': 'Choose adventurous destinations',
  'Plănuiesc activități sociale': 'Plan social activities',
  'Aleg locuri familiare și confortabile': 'Choose familiar and comfortable places',
  'Cercetez tot în detaliu înainte': 'Research everything in detail beforehand',
  'Mă adaptez rapid și acționez': 'Adapt quickly and act',
  'Caut să cunosc oameni noi': 'Seek to meet new people',
  'Am nevoie de timp pentru adaptare': 'Need time to adapt',
  'Observ și analizez înainte de a acționa': 'Observe and analyze before acting',
  'Sunt direct și la obiect': 'Am direct and to the point',
  'Încerc să fiu pozitiv și încurajator': 'Try to be positive and encouraging',
  'Sunt blând și diplomatic': 'Am gentle and diplomatic',
  'Mă concentrez pe fapte și detalii': 'Focus on facts and details',
  'Mă concentrez pe taskurile importante': 'Focus on important tasks',
  'Îmi fac timp pentru interacțiuni sociale': 'Make time for social interactions',
  'Urmăresc un program regulat': 'Follow a regular schedule',
  'Plănuiesc totul în detaliu': 'Plan everything in detail',
  'Stabilesc obiective clare și măsurabile': 'Set clear and measurable goals',
  'Motivez și inspir echipa': 'Motivate and inspire the team',
  'Creez un mediu de susținere și colaborare': 'Create a supportive and collaborative environment',
  'Mă asigur că procesele sunt urmate corect': 'Ensure processes are followed correctly',
  'Sunt ferm în privința obiectivelor mele': 'Am firm about my objectives',
  'Caut soluții care să mulțumească ambele părți': 'Seek solutions that satisfy both parties',
  'Evit tensiunile și conflict': 'Avoid tensions and conflict',
  'Prezint argumente bazate pe date': 'Present data-based arguments',
  'Le iau ca pe o provocare': 'Take them as a challenge',
  'Mă întreb cum mă percep alții': 'Wonder how others perceive me',
  'Pot fi afectat emoțional': 'Can be emotionally affected',
  'Analizez dacă sunt justificate': 'Analyze if they are justified',
  'Acționez rapid pentru a găsi o soluție': 'Act quickly to find a solution',
  'Caut input de la alții': 'Seek input from others',
  'Urmăresc metode dovedite': 'Follow proven methods',
  'Analizez toate opțiunile disponibile': 'Analyze all available options',
  'O îmbrățișez ca pe o oportunitate': 'Embrace it as an opportunity',
  'Mă entuziasmez de posibilitățile noi': 'Get excited about new possibilities',
  'Am nevoie de timp pentru a mă obișnui': 'Need time to get used to it',
  'Vreau să înțeleg impactul complet': 'Want to understand the complete impact',
  'Dau autonomie completă': 'Give complete autonomy',
  'Ofer sprijin și încurajare': 'Offer support and encouragement',
  'Mă asigur că se simt confortabil': 'Make sure they feel comfortable',
  'Dau instrucțiuni clare și detaliate': 'Give clear and detailed instructions',
  'Sunt dispus să risc mult pentru câștiguri mari': 'Am willing to risk a lot for big gains',
  'Îmi asum riscuri dacă alții mă susțin': 'Take risks if others support me',
  'Prefer să evit riscurile inutile': 'Prefer to avoid unnecessary risks',
  'Calculez toate riscurile înainte': 'Calculate all risks beforehand',
  'Sunt încrezător și direct': 'Am confident and direct',
  'Îmi place să interacționez cu audiența': 'I like to interact with the audience',
  'Prefer grupuri mici și familiare': 'Prefer small and familiar groups',
  'Mă pregătesc foarte bine în avans': 'Prepare very well in advance',
  'Caut provocări noi': 'Seek new challenges',
  'Vorbesc cu prietenii despre probleme': 'Talk with friends about problems',
  'Caut stabilitate și routine': 'Seek stability and routine',
  'Analizez sursele de stres': 'Analyze sources of stress',
  'Îmi stabilesc propriile reguli': 'Set my own rules',
  'Îmi lipsește interacțiunea cu alții': 'Miss interaction with others',
  'Îmi place liniștea și focusul': 'I like quiet and focus',
  'Pot să mă concentrez pe detalii': 'Can concentrate on details',
  'Caut să conduc și să influențez': 'Seek to lead and influence',
  'Îmi place să cunosc mulți oameni': 'I like to meet many people',
  'Prefer relații profunde și de lungă durată': 'Prefer deep and long-lasting relationships',
  'Sunt selectiv în alegerea prietenilor': 'Am selective in choosing friends',
  'Mă concentrez pe rezultate măsurabile': 'Focus on measurable results',
  'Îmi place să celebrez succesele cu alții': 'I like to celebrate successes with others',
  'Progresez constant și perseverent': 'Progress steadily and persistently',
  'Mă asigur că fac totul corect': 'Make sure I do everything correctly',
  'Acționez imediat pentru a o folosi': 'Act immediately to use it',
  'O împărtășesc cu alții cu entuziasm': 'Share it with others enthusiastically',
  'Evaluez cum se potrivește cu planurile mele': 'Evaluate how it fits with my plans',
  'Cercetez toate aspectele înainte de a decide': 'Research all aspects before deciding'
};

// Belbin test translations
const BELBIN_QUESTION_TRANSLATIONS: { [key: string]: string } = {
  'Cred că pot contribui eficient la o echipă pentru că:': 'I believe I can contribute effectively to a team because:',
  'Dacă am o deficiență în lucrul în echipă, aceasta ar putea fi:': 'If I have a shortcoming in teamwork, it might be:',
  'Când sunt implicat într-un proiect cu alte persoane:': 'When I am involved in a project with other people:',
  'Abordarea mea caracteristică a lucrului în grup este:': 'My characteristic approach to group work is:',
  'Obțin satisfacție dintr-o muncă pentru că:': 'I gain satisfaction from a job because:',
  'Dacă brusc mi se dă o sarcină dificilă cu timp limitat și oameni necunoscuți:': 'If I am suddenly given a difficult task with limited time and unfamiliar people:',
  'În ceea ce privește problemele la care mă confrunt când lucrez în grup:': 'With regard to the problems I encounter when working in groups:',
  'În caracterizarea stilului meu de lucru:': 'In characterizing my working style:',
  'Când echipa trebuie să aleagă dintre două opțiuni:': 'When the team needs to choose between two options:'
};

const BELBIN_OPTION_TRANSLATIONS: { [key: string]: string } = {
  'am o natură liniștită': 'I have a quiet nature',
  'sunt obișnuit să mă înțeleg bine cu tot felul de oameni': 'I am used to getting along well with all kinds of people',
  'producerea de idei este unul dintre punctele mele forte': 'producing ideas is one of my strong points',
  'am capacitatea de a-i face pe oameni să vorbească atunci când detectez că au ceva valoros de contribuit': 'I have the ability to get people to talk when I detect they have something valuable to contribute',
  'capacitatea mea de a urma prin lucru cu perseverență ceea ce consider de valoare': 'my ability to follow through with persistence what I consider valuable',
  'sunt pregătit să fiu nepopular temporar dacă acest lucru duce la rezultate valoroase în final': 'I am prepared to be temporarily unpopular if this leads to worthwhile results in the end',
  'de obicei observ și pot profita de noi oportunități': 'I usually notice and can take advantage of new opportunities',
  'pot colabora bine cu oameni care oferă ceva nou': 'I can work well with people who offer something new'
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('=== STARTING TRANSLATION FIX PROCESS ===');

    // Get test IDs by looking for tests that actually have questions
    const { data: testTypesWithQuestions, error: testTypesError } = await supabaseClient
      .from('test_types')
      .select(`
        id, 
        name,
        test_questions(count)
      `)
      .in('name', ['Test DISC', 'Test Belbin']);

    if (testTypesError) {
      console.error('Error fetching test types:', testTypesError);
      throw testTypesError;
    }

    console.log('Found test types:', testTypesWithQuestions);

    // Find the actual tests with questions
    const discTest = testTypesWithQuestions?.find(test => 
      test.name === 'Test DISC' && test.test_questions && test.test_questions.length > 0
    );
    const belbinTest = testTypesWithQuestions?.find(test => 
      test.name === 'Test Belbin' && test.test_questions && test.test_questions.length > 0
    );

    if (!discTest) {
      console.error('DISC test with questions not found');
      throw new Error('DISC test with questions not found');
    }

    console.log('Found DISC test with ID:', discTest.id);
    if (belbinTest) {
      console.log('Found Belbin test with ID:', belbinTest.id);
    }

    let totalFixed = 0;
    let totalErrors = 0;

    // Process DISC questions
    const { data: discQuestions, error: discFetchError } = await supabaseClient
      .from('test_questions')
      .select('id, options, options_en, question_text_ro, question_text_en')
      .eq('test_type_id', discTest.id);

    if (discFetchError) {
      console.error('Error fetching DISC questions:', discFetchError);
      throw discFetchError;
    }

    console.log(`Processing ${discQuestions?.length || 0} DISC questions`);

    for (const question of discQuestions || []) {
      try {
        console.log(`\n=== Processing DISC question ${question.id} ===`);
        console.log('Romanian text:', question.question_text_ro);
        
        let needsUpdate = false;
        let updatedData: any = {};

        // Check if question needs translation
        const englishQuestion = DISC_QUESTION_TRANSLATIONS[question.question_text_ro];
        if (englishQuestion && (!question.question_text_en || question.question_text_en === '[Translation needed]')) {
          updatedData.question_text_en = englishQuestion;
          needsUpdate = true;
          console.log('Will translate question to:', englishQuestion);
        }

        // Process options - extract Romanian text and translate
        if (question.options && Array.isArray(question.options)) {
          const translatedOptions = question.options.map((option: any, index: number) => {
            let optionText = '';
            
            // Extract Romanian text from different possible structures
            if (typeof option === 'object') {
              if (option.label) {
                optionText = option.label;
              } else if (option.text) {
                optionText = option.text;
              } else if (option.value && typeof option.value === 'string') {
                optionText = option.value;
              }
            } else if (typeof option === 'string') {
              optionText = option;
            }

            const englishOption = DISC_OPTION_TRANSLATIONS[optionText] || optionText;
            
            return {
              value: index,
              label: englishOption,
              dimension: ['D', 'I', 'S', 'C'][index % 4]
            };
          });

          updatedData.options_en = translatedOptions;
          needsUpdate = true;
          console.log('Will update options to:', translatedOptions);
        }

        if (needsUpdate) {
          console.log('Updating question with data:', updatedData);
          
          const { error: updateError } = await supabaseClient
            .from('test_questions')
            .update(updatedData)
            .eq('id', question.id);

          if (updateError) {
            console.error(`Failed to update DISC question ${question.id}:`, updateError);
            totalErrors++;
          } else {
            console.log(`Successfully updated DISC question ${question.id}`);
            totalFixed++;
          }
        } else {
          console.log('Question already translated correctly');
        }
      } catch (error) {
        console.error(`Error processing DISC question ${question.id}:`, error);
        totalErrors++;
      }
    }

    // Process Belbin questions if test exists
    if (belbinTest) {
      const { data: belbinQuestions, error: belbinFetchError } = await supabaseClient
        .from('test_questions')
        .select('id, options, options_en, question_text_ro, question_text_en')
        .eq('test_type_id', belbinTest.id);

      if (belbinFetchError) {
        console.error('Error fetching Belbin questions:', belbinFetchError);
      } else {
        console.log(`Processing ${belbinQuestions?.length || 0} Belbin questions`);

        for (const question of belbinQuestions || []) {
          try {
            console.log(`\n=== Processing Belbin question ${question.id} ===`);
            console.log('Romanian text:', question.question_text_ro);
            
            let needsUpdate = false;
            let updatedData: any = {};

            // Check if question needs translation
            const englishQuestion = BELBIN_QUESTION_TRANSLATIONS[question.question_text_ro];
            if (englishQuestion && (!question.question_text_en || question.question_text_en === '[Translation needed]')) {
              updatedData.question_text_en = englishQuestion;
              needsUpdate = true;
              console.log('Will translate question to:', englishQuestion);
            }

            // Process options
            if (question.options && Array.isArray(question.options)) {
              const translatedOptions = question.options.map((option: any, index: number) => {
                let optionText = '';
                
                if (typeof option === 'object') {
                  if (option.label) {
                    optionText = option.label;
                  } else if (option.text) {
                    optionText = option.text;
                  } else if (option.value && typeof option.value === 'string') {
                    optionText = option.value;
                  }
                } else if (typeof option === 'string') {
                  optionText = option;
                }

                const englishOption = BELBIN_OPTION_TRANSLATIONS[optionText] || optionText;
                
                return {
                  value: index,
                  label: englishOption
                };
              });

              updatedData.options_en = translatedOptions;
              needsUpdate = true;
              console.log('Will update options to:', translatedOptions);
            }

            if (needsUpdate) {
              console.log('Updating question with data:', updatedData);
              
              const { error: updateError } = await supabaseClient
                .from('test_questions')
                .update(updatedData)
                .eq('id', question.id);

              if (updateError) {
                console.error(`Failed to update Belbin question ${question.id}:`, updateError);
                totalErrors++;
              } else {
                console.log(`Successfully updated Belbin question ${question.id}`);
                totalFixed++;
              }
            } else {
              console.log('Question already translated correctly');
            }
          } catch (error) {
            console.error(`Error processing Belbin question ${question.id}:`, error);
            totalErrors++;
          }
        }
      }
    }

    console.log(`\n=== TRANSLATION PROCESS COMPLETED ===`);
    console.log(`Total questions fixed: ${totalFixed}`);
    console.log(`Total errors: ${totalErrors}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Translation fix completed successfully. Fixed ${totalFixed} questions with ${totalErrors} errors.`,
        fixed: totalFixed,
        errors: totalErrors
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('=== FATAL ERROR IN TRANSLATION PROCESS ===');
    console.error('Error details:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        details: 'Check function logs for more information'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
