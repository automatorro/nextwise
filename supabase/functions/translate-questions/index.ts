
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
const retryWithBackoff = async (fn: () => Promise<any>, maxRetries = 5) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 3000; // 3s, 6s, 12s, 24s, 48s
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

    // Process questions one by one to avoid rate limiting
    const batchSize = 1;
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      
      console.log(`Processing question ${i + 1}/${questions.length}`);
      
      const prompt = `You are a professional translator specializing in psychological and cognitive assessment tests. Please translate the following Romanian test question and its answer options to English. Maintain the psychological accuracy and professional tone.

Please respond with ONLY a valid JSON array containing objects with this exact structure:
[
  {
    "id": "question_id",
    "question_text_en": "translated_question_text",
    "options_en": ["option1", "option2", "option3", ...]
  }
]

Question to translate:
ID: ${batch[0].id}
Romanian Question: ${batch[0].question_text_ro}
Romanian Options: ${JSON.stringify(batch[0].options)}

Remember: 
- Preserve the psychological meaning and nuance
- Keep professional terminology consistent
- Maintain the same option count and order
- Return ONLY the JSON array, no additional text`;

      try {
        const questionTranslation = await retryWithBackoff(async () => {
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
                maxOutputTokens: 2048,
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

        console.log(`Raw Gemini response for question ${batch[0].id}:`, questionTranslation);
        
        // Clean and parse the JSON response
        let cleanedText = questionTranslation.trim();
        
        // Remove markdown code blocks if present
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        } else if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/^```\n?/, '').replace(/\n?```$/, '');
        }
        
        try {
          const parsedQuestion = JSON.parse(cleanedText);
          if (Array.isArray(parsedQuestion) && parsedQuestion.length > 0) {
            translatedQuestions.push(parsedQuestion[0]);
            console.log(`Successfully processed question ${batch[0].id}`);
          } else {
            console.error('Invalid question translation format:', parsedQuestion);
            
            // Create fallback translation
            const fallbackTranslation = {
              id: batch[0].id,
              question_text_en: `[Translation needed] ${batch[0].question_text_ro}`,
              options_en: batch[0].options.map((opt, idx) => `Option ${idx + 1}`)
            };
            
            translatedQuestions.push(fallbackTranslation);
            console.log(`Added fallback translation for question ${batch[0].id}`);
          }
        } catch (parseError) {
          console.error('Failed to parse question translation:', cleanedText, parseError);
          
          // Create fallback translation
          const fallbackTranslation = {
            id: batch[0].id,
            question_text_en: `[Translation needed] ${batch[0].question_text_ro}`,
            options_en: batch[0].options.map((opt, idx) => `Option ${idx + 1}`)
          };
          
          translatedQuestions.push(fallbackTranslation);
          console.log(`Added fallback translation for question ${batch[0].id}`);
        }
      } catch (questionError) {
        console.error(`Failed to translate question ${batch[0].id}:`, questionError);
        
        // Create fallback translation for failed question
        const fallbackTranslation = {
          id: batch[0].id,
          question_text_en: `[Translation needed] ${batch[0].question_text_ro}`,
          options_en: batch[0].options.map((opt, idx) => `Option ${idx + 1}`)
        };
        
        translatedQuestions.push(fallbackTranslation);
        console.log(`Added fallback translation for failed question ${batch[0].id}`);
      }

      // Add longer delay between questions to avoid rate limiting
      if (i + batchSize < questions.length) {
        console.log('Waiting 8 seconds before next question...');
        await sleep(8000); // Increased delay to 8 seconds
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
