
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

    // Get all questions with malformed options_en
    const { data: questions, error: fetchError } = await supabaseClient
      .from('test_questions')
      .select('id, options, options_en, question_text_ro, question_text_en')
      .not('options_en', 'is', null);

    if (fetchError) {
      console.error('Error fetching questions:', fetchError);
      throw fetchError;
    }

    console.log(`Found ${questions?.length || 0} questions to process`);

    let fixedCount = 0;
    let errorCount = 0;

    for (const question of questions || []) {
      try {
        const fixedOptionsEn = fixOptionsStructure(question.options, question.options_en);
        
        if (fixedOptionsEn) {
          const { error: updateError } = await supabaseClient
            .from('test_questions')
            .update({ options_en: fixedOptionsEn })
            .eq('id', question.id);

          if (updateError) {
            console.error(`Error updating question ${question.id}:`, updateError);
            errorCount++;
          } else {
            console.log(`Fixed question ${question.id}`);
            fixedCount++;
          }
        }
      } catch (error) {
        console.error(`Error processing question ${question.id}:`, error);
        errorCount++;
      }
    }

    console.log(`Process completed. Fixed: ${fixedCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Translation fix completed. Fixed ${fixedCount} questions, ${errorCount} errors.`,
        fixed: fixedCount,
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

function fixOptionsStructure(originalOptions: any, malformedOptionsEn: any): any[] | null {
  console.log('Original options:', originalOptions);
  console.log('Malformed options_en:', malformedOptionsEn);

  // If options_en is already properly formatted, return it
  if (Array.isArray(malformedOptionsEn) && 
      malformedOptionsEn.length > 0 && 
      typeof malformedOptionsEn[0] === 'object' &&
      'label' in malformedOptionsEn[0] && 
      'value' in malformedOptionsEn[0]) {
    return malformedOptionsEn;
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
      if (typeof item === 'string') {
        return item;
      } else if (typeof item === 'object' && item !== null) {
        return item.label || item.text || `Option ${index + 1}`;
      }
      return `Option ${index + 1}`;
    });
  } else if (typeof malformedOptionsEn === 'string') {
    try {
      const parsed = JSON.parse(malformedOptionsEn);
      if (Array.isArray(parsed)) {
        englishLabels = parsed.map(String);
      }
    } catch {
      // If parsing fails, create generic labels
    }
  }

  // Create properly structured options_en
  const fixedOptions = parsedOriginal.map((originalOpt, index) => ({
    value: originalOpt.value,
    label: englishLabels[index] || translateOption(originalOpt.label) || `Option ${originalOpt.value + 1}`
  }));

  console.log('Fixed options:', fixedOptions);
  return fixedOptions;
}

function translateOption(romanianLabel: string): string {
  const translations: { [key: string]: string } = {
    'Complet dezacord': 'Strongly Disagree',
    'Dezacord': 'Disagree',
    'Neutru': 'Neutral',
    'Acord': 'Agree',
    'Complet de acord': 'Strongly Agree',
    'Deloc': 'Not at all',
    'Putin': 'A little',
    'Moderat': 'Moderately',
    'Mult': 'A lot',
    'Foarte mult': 'Very much',
    'Niciodata': 'Never',
    'Rareori': 'Rarely',
    'Uneori': 'Sometimes',
    'Adesea': 'Often',
    'Intotdeauna': 'Always',
    'Da': 'Yes',
    'Nu': 'No'
  };

  return translations[romanianLabel] || romanianLabel;
}
