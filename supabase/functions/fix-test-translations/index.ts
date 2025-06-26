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

// Complete DISC test question translations
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

// Complete DISC option translations
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

    console.log('Starting comprehensive DISC translation fix process...');

    // Get all DISC test questions
    const { data: questions, error: fetchError } = await supabaseClient
      .from('test_questions')
      .select('id, options, options_en, question_text_ro, question_text_en, test_type_id')
      .eq('test_type_id', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');

    if (fetchError) {
      console.error('Error fetching DISC questions:', fetchError);
      throw fetchError;
    }

    console.log(`Found ${questions?.length || 0} DISC questions to process`);

    let fixedCount = 0;
    let errorCount = 0;
    let alreadyCorrectCount = 0;

    for (const question of questions || []) {
      try {
        console.log(`Processing DISC question ${question.id}`);
        console.log('Romanian question text:', question.question_text_ro);
        console.log('Current English question text:', question.question_text_en);
        console.log('Current options:', question.options);
        console.log('Current options_en:', question.options_en);
        
        let needsUpdate = false;
        let updatedData: any = {};

        // Translate question text
        const englishQuestion = DISC_QUESTION_TRANSLATIONS[question.question_text_ro];
        if (englishQuestion && (!question.question_text_en || question.question_text_en === '[Translation needed]')) {
          updatedData.question_text_en = englishQuestion;
          needsUpdate = true;
          console.log(`Translating question: ${question.question_text_ro} -> ${englishQuestion}`);
        }

        // Fix and translate options
        const fixedOptionsEn = fixDISCOptionsStructure(question.options);
        if (fixedOptionsEn) {
          updatedData.options_en = fixedOptionsEn;
          needsUpdate = true;
          console.log(`Fixed and translated options for question ${question.id}:`, fixedOptionsEn);
        }
        
        if (needsUpdate) {
          const { error: updateError } = await supabaseClient
            .from('test_questions')
            .update(updatedData)
            .eq('id', question.id);

          if (updateError) {
            console.error(`Error updating question ${question.id}:`, updateError);
            errorCount++;
          } else {
            console.log(`Successfully translated DISC question ${question.id}`);
            fixedCount++;
          }
        } else {
          console.log(`Question ${question.id} already has correct translations`);
          alreadyCorrectCount++;
        }
      } catch (error) {
        console.error(`Error processing question ${question.id}:`, error);
        errorCount++;
      }
    }

    console.log(`DISC translation process completed. Fixed: ${fixedCount}, Already correct: ${alreadyCorrectCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `DISC translation fix completed. Fixed ${fixedCount} questions, ${alreadyCorrectCount} were already correct, ${errorCount} errors.`,
        fixed: fixedCount,
        alreadyCorrect: alreadyCorrectCount,
        errors: errorCount
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Fatal error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

function fixDISCOptionsStructure(originalOptions: any): any[] | null {
  console.log('=== FIXING DISC OPTIONS STRUCTURE ===');
  console.log('Original DISC options:', originalOptions);

  if (!Array.isArray(originalOptions)) {
    console.log('Original options is not an array, cannot fix DISC options');
    return null;
  }

  try {
    const fixedOptions = originalOptions.map((option, index) => {
      if (typeof option === 'object' && option !== null) {
        const romanianLabel = option.label || option.text || `Option ${index + 1}`;
        const englishLabel = DISC_OPTION_TRANSLATIONS[romanianLabel] || romanianLabel;
        
        return {
          value: option.value !== undefined ? option.value : index,
          label: englishLabel,
          dimension: option.dimension || getDimensionForIndex(index)
        };
      }
      
      // Handle string options
      if (typeof option === 'string') {
        const englishLabel = DISC_OPTION_TRANSLATIONS[option] || option;
        return {
          value: index,
          label: englishLabel,
          dimension: getDimensionForIndex(index)
        };
      }
      
      return {
        value: index,
        label: `Option ${index + 1}`,
        dimension: getDimensionForIndex(index)
      };
    });

    console.log('Fixed DISC options with translations:', fixedOptions);
    return fixedOptions;
  } catch (error) {
    console.error('Error fixing DISC options:', error);
    return null;
  }
}

function getDimensionForIndex(index: number): string {
  // Map option index to DISC dimension (D, I, S, C cycle)
  const dimensions = ['D', 'I', 'S', 'C'];
  return dimensions[index % 4];
}

function isCorrectFormat(optionsEn: any): boolean {
  if (!Array.isArray(optionsEn)) return false;
  if (optionsEn.length === 0) return false;
  
  // Check if all elements have the correct {label, value} structure
  return optionsEn.every(opt => 
    typeof opt === 'object' && 
    opt !== null && 
    'label' in opt && 
    'value' in opt &&
    typeof opt.label === 'string' &&
    typeof opt.value === 'number' &&
    opt.label.trim() !== '' &&
    opt.label !== '[object Object]' &&
    !opt.label.includes('[object Object]') &&
    !opt.label.startsWith('Option ') // Not generic placeholder
  );
}

function isCorruptedData(data: any): boolean {
  if (typeof data === 'string') {
    return data === '[object Object]' || data.includes('[object Object]');
  }
  
  if (Array.isArray(data)) {
    return data.some(item => 
      typeof item === 'string' && (item === '[object Object]' || item.includes('[object Object]'))
    );
  }
  
  if (typeof data === 'object' && data !== null) {
    const values = Object.values(data);
    return values.some(val => 
      typeof val === 'string' && (val === '[object Object]' || val.includes('[object Object]'))
    );
  }
  
  return false;
}

function fixOptionsStructure(originalOptions: any, malformedOptionsEn: any): any[] | null {
  console.log('=== FIXING OPTIONS STRUCTURE ===');
  console.log('Original options:', originalOptions);
  console.log('Malformed options_en:', malformedOptionsEn);

  // If options_en is already properly formatted, return null (no fix needed)
  if (isCorrectFormat(malformedOptionsEn)) {
    console.log('Options already in correct format');
    return null;
  }

  // If the data is corrupted, create proper structure from original options
  if (isCorruptedData(malformedOptionsEn)) {
    console.log('Detected corrupted data, rebuilding from original options');
    return createEnglishOptionsFromOriginal(originalOptions);
  }

  // Parse original options to get the structure
  let parsedOriginal: any[] = [];
  
  if (Array.isArray(originalOptions)) {
    parsedOriginal = originalOptions.map((opt, index) => {
      if (typeof opt === 'object' && opt !== null) {
        return {
          value: opt.value !== undefined ? opt.value : index,
          label: opt.label || opt.text || `Option ${index + 1}`
        };
      }
      return {
        value: index,
        label: String(opt)
      };
    });
  } else if (typeof originalOptions === 'object' && originalOptions !== null) {
    parsedOriginal = Object.entries(originalOptions).map(([key, value]) => ({
      value: parseInt(key) || 0,
      label: String(value)
    }));
  }

  if (parsedOriginal.length === 0) {
    console.log('Could not parse original options, using default Likert scale');
    return [
      { value: 0, label: 'Strongly Disagree' },
      { value: 1, label: 'Disagree' },
      { value: 2, label: 'Neutral' },
      { value: 3, label: 'Agree' },
      { value: 4, label: 'Strongly Agree' }
    ];
  }

  // Try to extract English translations from malformed data
  let englishLabels: string[] = [];

  if (Array.isArray(malformedOptionsEn)) {
    englishLabels = malformedOptionsEn.map((item, index) => {
      if (typeof item === 'string' && !isCorruptedData(item)) {
        return item;
      } else if (typeof item === 'object' && item !== null && !isCorruptedData(item)) {
        return item.label || item.text || translateOption(parsedOriginal[index]?.label) || `Option ${index + 1}`;
      }
      return translateOption(parsedOriginal[index]?.label) || `Option ${index + 1}`;
    });
  } else if (typeof malformedOptionsEn === 'string' && !isCorruptedData(malformedOptionsEn)) {
    try {
      const parsed = JSON.parse(malformedOptionsEn);
      if (Array.isArray(parsed)) {
        englishLabels = parsed.map(String);
      }
    } catch {
      // If parsing fails, create translated labels from original
      englishLabels = parsedOriginal.map(opt => translateOption(opt.label));
    }
  } else {
    // Create translated labels from original options
    englishLabels = parsedOriginal.map(opt => translateOption(opt.label));
  }

  // Ensure we have the right number of labels
  while (englishLabels.length < parsedOriginal.length) {
    const index = englishLabels.length;
    englishLabels.push(translateOption(parsedOriginal[index]?.label) || `Option ${index + 1}`);
  }

  // Create properly structured options_en
  const fixedOptions = parsedOriginal.map((originalOpt, index) => ({
    value: originalOpt.value,
    label: englishLabels[index] || translateOption(originalOpt.label) || `Option ${originalOpt.value + 1}`
  }));

  console.log('Fixed options:', fixedOptions);
  return fixedOptions;
}

function createEnglishOptionsFromOriginal(originalOptions: any): any[] {
  console.log('Creating English options from original:', originalOptions);
  
  let parsedOriginal: any[] = [];
  
  if (Array.isArray(originalOptions)) {
    parsedOriginal = originalOptions.map((opt, index) => {
      if (typeof opt === 'object' && opt !== null) {
        return {
          value: opt.value !== undefined ? opt.value : index,
          label: opt.label || opt.text || `Option ${index + 1}`
        };
      }
      return {
        value: index,
        label: String(opt)
      };
    });
  } else if (typeof originalOptions === 'object' && originalOptions !== null) {
    parsedOriginal = Object.entries(originalOptions).map(([key, value]) => ({
      value: parseInt(key) || 0,
      label: String(value)
    }));
  }

  if (parsedOriginal.length === 0) {
    // Default Likert scale
    return [
      { value: 0, label: 'Strongly Disagree' },
      { value: 1, label: 'Disagree' },
      { value: 2, label: 'Neutral' },
      { value: 3, label: 'Agree' },
      { value: 4, label: 'Strongly Agree' }
    ];
  }

  // Translate Romanian labels to English
  const englishOptions = parsedOriginal.map(opt => ({
    value: opt.value,
    label: translateOption(opt.label)
  }));

  console.log('Created English options:', englishOptions);
  return englishOptions;
}

function translateOption(romanianLabel: string): string {
  if (!romanianLabel) return '';
  
  const translations: { [key: string]: string } = {
    'Complet dezacord': 'Strongly Disagree',
    'Dezacord': 'Disagree',
    'Neutru': 'Neutral',
    'Acord': 'Agree',
    'Complet de acord': 'Strongly Agree',
    'Deloc': 'Not at all',
    'Puțin': 'A little',
    'Putin': 'A little',
    'Moderat': 'Moderately',
    'Mult': 'A lot',
    'Foarte mult': 'Very much',
    'Niciodata': 'Never',
    'Niciodată': 'Never',
    'Rareori': 'Rarely',
    'Uneori': 'Sometimes',
    'Adesea': 'Often',
    'Intotdeauna': 'Always',
    'Întotdeauna': 'Always',
    'Da': 'Yes',
    'Nu': 'No',
    'Foarte scăzut': 'Very low',
    'Scăzut': 'Low',
    'Mediu': 'Medium',
    'Ridicat': 'High',
    'Foarte ridicat': 'Very high'
  };

  return translations[romanianLabel] || romanianLabel;
}
