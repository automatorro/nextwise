
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface QuestionToTranslate {
  id: string;
  question_text_ro: string;
  options: string[];
}

interface TranslatedQuestion {
  id: string;
  question_text_en: string;
  options_en: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { questions } = await req.json();

    if (!questions || !Array.isArray(questions)) {
      throw new Error('Invalid questions data');
    }

    console.log(`Starting translation for ${questions.length} questions`);

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const translatedQuestions: TranslatedQuestion[] = [];

    // Process questions in batches of 5 to avoid overwhelming the API
    const batchSize = 5;
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      
      const prompt = `You are a professional translator specializing in psychological and cognitive assessment tests. Please translate the following Romanian test questions and their answer options to English. Maintain the psychological accuracy and professional tone.

Please respond with ONLY a valid JSON array containing objects with this exact structure:
[
  {
    "id": "question_id",
    "question_text_en": "translated_question_text",
    "options_en": ["option1", "option2", "option3", ...]
  }
]

Questions to translate:
${batch.map(q => `
ID: ${q.id}
Romanian Question: ${q.question_text_ro}
Romanian Options: ${JSON.stringify(q.options)}
`).join('\n')}

Remember: 
- Preserve the psychological meaning and nuance
- Keep professional terminology consistent
- Maintain the same option count and order
- Return ONLY the JSON array, no additional text`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + geminiApiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 4096,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const translatedText = data.candidates[0].content.parts[0].text;
      
      console.log('Raw Gemini response:', translatedText);
      
      // Clean and parse the JSON response
      let cleanedText = translatedText.trim();
      
      // Remove markdown code blocks if present
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\n?/, '').replace(/\n?```$/, '');
      }
      
      try {
        const batchTranslations = JSON.parse(cleanedText);
        if (Array.isArray(batchTranslations)) {
          translatedQuestions.push(...batchTranslations);
        } else {
          console.error('Invalid batch translation format:', batchTranslations);
        }
      } catch (parseError) {
        console.error('Failed to parse batch translation:', cleanedText, parseError);
        // Continue with next batch instead of failing completely
      }

      // Add a small delay between batches to be respectful to the API
      if (i + batchSize < questions.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`Successfully translated ${translatedQuestions.length} out of ${questions.length} questions`);

    // Update the database with translations
    const updates = translatedQuestions.map(tq => ({
      id: tq.id,
      question_text_en: tq.question_text_en,
      options_en: tq.options_en
    }));

    if (updates.length > 0) {
      for (const update of updates) {
        const { error } = await supabaseClient
          .from('test_questions')
          .update({
            question_text_en: update.question_text_en,
            options_en: update.options_en
          })
          .eq('id', update.id);

        if (error) {
          console.error('Error updating question:', update.id, error);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        translated: translatedQuestions.length,
        total: questions.length,
        translations: translatedQuestions
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Translation error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
