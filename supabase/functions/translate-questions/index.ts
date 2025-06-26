
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

// Sleep function for delays
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retry function with exponential backoff
const retryWithBackoff = async (fn: () => Promise<any>, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 2000; // 2s, 4s, 8s
      console.log(`Retry ${i + 1} failed, waiting ${delay}ms before next attempt`);
      await sleep(delay);
    }
  }
};

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

    // Process questions in smaller batches to avoid rate limiting
    const batchSize = 2; // Reduced from 5 to 2
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(questions.length / batchSize)}`);
      
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

      try {
        const batchTranslations = await retryWithBackoff(async () => {
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
            if (response.status === 429) {
              throw new Error(`Rate limit exceeded: ${response.status}`);
            }
            throw new Error(`Gemini API error: ${response.status}`);
          }

          const data = await response.json();
          return data.candidates[0].content.parts[0].text;
        });

        console.log('Raw Gemini response for batch:', batchTranslations);
        
        // Clean and parse the JSON response
        let cleanedText = batchTranslations.trim();
        
        // Remove markdown code blocks if present
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        } else if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }
        
        try {
          const parsedBatch = JSON.parse(cleanedText);
          if (Array.isArray(parsedBatch)) {
            translatedQuestions.push(...parsedBatch);
            console.log(`Successfully processed batch with ${parsedBatch.length} questions`);
          } else {
            console.error('Invalid batch translation format:', parsedBatch);
          }
        } catch (parseError) {
          console.error('Failed to parse batch translation:', cleanedText, parseError);
          
          // Create fallback translations for this batch
          const fallbackTranslations = batch.map(q => ({
            id: q.id,
            question_text_en: `[Translation needed] ${q.question_text_ro}`,
            options_en: q.options.map((opt, idx) => `Option ${idx + 1}`)
          }));
          
          translatedQuestions.push(...fallbackTranslations);
          console.log(`Added fallback translations for ${fallbackTranslations.length} questions`);
        }
      } catch (batchError) {
        console.error(`Failed to translate batch ${Math.floor(i / batchSize) + 1}:`, batchError);
        
        // Create fallback translations for failed batch
        const fallbackTranslations = batch.map(q => ({
          id: q.id,
          question_text_en: `[Translation needed] ${q.question_text_ro}`,
          options_en: q.options.map((opt, idx) => `Option ${idx + 1}`)
        }));
        
        translatedQuestions.push(...fallbackTranslations);
        console.log(`Added fallback translations for failed batch with ${fallbackTranslations.length} questions`);
      }

      // Add longer delay between batches to avoid rate limiting
      if (i + batchSize < questions.length) {
        console.log('Waiting 5 seconds before next batch...');
        await sleep(5000); // Increased from 1s to 5s
      }
    }

    console.log(`Successfully processed ${translatedQuestions.length} out of ${questions.length} questions`);

    // Update the database with translations
    if (translatedQuestions.length > 0) {
      for (const tq of translatedQuestions) {
        try {
          // Create proper options_en structure
          const properOptionsEn = tq.options_en.map((label, index) => ({
            value: index,
            label: label
          }));

          const { error } = await supabaseClient
            .from('test_questions')
            .update({
              question_text_en: tq.question_text_en,
              options_en: properOptionsEn
            })
            .eq('id', tq.id);

          if (error) {
            console.error('Error updating question:', tq.id, error);
          } else {
            console.log('Successfully updated question:', tq.id);
          }
        } catch (updateError) {
          console.error('Error processing question update:', tq.id, updateError);
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
