
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
}

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

    console.log('Starting translation fix process...');

    // Get all questions with potentially malformed options_en
    const { data: questions, error: fetchError } = await supabaseClient
      .from('test_questions')
      .select('id, options, options_en, question_text_ro, question_text_en');

    if (fetchError) {
      console.error('Error fetching questions:', fetchError);
      throw fetchError;
    }

    console.log(`Found ${questions?.length || 0} questions to process`);

    let fixedCount = 0;
    let errorCount = 0;
    let alreadyCorrectCount = 0;

    for (const question of questions || []) {
      try {
        console.log(`Processing question ${question.id}`);
        console.log('Current options_en:', question.options_en);
        
        // Check if options_en is already in correct format
        if (isCorrectFormat(question.options_en)) {
          console.log(`Question ${question.id} already has correct format`);
          alreadyCorrectCount++;
          continue;
        }
        
        const fixedOptionsEn = fixOptionsStructure(question.options, question.options_en);
        
        if (fixedOptionsEn) {
          console.log(`Fixing question ${question.id} with:`, fixedOptionsEn);
          
          const { error: updateError } = await supabaseClient
            .from('test_questions')
            .update({ options_en: fixedOptionsEn })
            .eq('id', question.id);

          if (updateError) {
            console.error(`Error updating question ${question.id}:`, updateError);
            errorCount++;
          } else {
            console.log(`Successfully fixed question ${question.id}`);
            fixedCount++;
          }
        } else {
          console.log(`No fix needed for question ${question.id}`);
        }
      } catch (error) {
        console.error(`Error processing question ${question.id}:`, error);
        errorCount++;
      }
    }

    console.log(`Process completed. Fixed: ${fixedCount}, Already correct: ${alreadyCorrectCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Translation fix completed. Fixed ${fixedCount} questions, ${alreadyCorrectCount} were already correct, ${errorCount} errors.`,
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
