

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { programType, day } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    // Define program-specific prompts in Romanian
    const programPrompts = {
      'motivation_reset': `Generează o sarcină practică pentru ziua ${day} dintr-un program de 14 zile pentru resetarea motivației. Concentrează-te pe construirea încrederii, stabilirea obiectivelor clare și dezvoltarea obiceiurilor pozitive.`,
      'leadership_transition': `Generează o sarcină practică pentru ziua ${day} dintr-un program de 14 zile pentru tranziția în leadership. Concentrează-te pe abilitățile de leadership, managementul echipei și luarea deciziilor.`,
      'interview_training': `Generează o sarcină practică pentru ziua ${day} dintr-un program de 14 zile pentru pregătirea interviurilor. Concentrează-te pe pregătirea pentru interviuri, abilitățile de comunicare și construirea încrederii.`,
      'career_clarity': `Generează o sarcină practică pentru ziua ${day} dintr-un program de 14 zile pentru claritatea în carieră. Concentrează-te pe autodescoperire, explorarea carierei și stabilirea obiectivelor.`
    };

    const systemPrompt = programPrompts[programType as keyof typeof programPrompts] || 
      `Generează o sarcină practică pentru ziua ${day} dintr-un program de 14 zile pentru dezvoltare profesională.`;

    const fullPrompt = `${systemPrompt}

    Creează o sarcină specifică și acționabilă pentru ziua ${day}. Sarcina trebuie să:
    - Poată fi completată în 15-30 de minute
    - Fie practică și aplicabilă în situații de lucru reale
    - Includă instrucțiuni clare și rezultate așteptate
    - Se bazeze pe învățarea din zilele anterioare
    - Fie captivantă și motivantă

    IMPORTANT: Răspunde DOAR în limba română. Toate textele, instrucțiunile și întrebările trebuie să fie în română.

    Răspunde cu un obiect JSON cu această structură exactă:
    {
      "title": "Titlul sarcinii",
      "task": "Descrierea detaliată a sarcinii cu instrucțiuni clare",
      "estimated_duration": "15-20 minute",
      "reflection_question": "Întrebare pentru reflecția de la sfârșitul zilei"
    }`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: fullPrompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const geminiResult = await response.json();
    const aiResponse = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error('No response from Gemini API');
    }

    // Clean the response to extract only JSON
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const taskContent = JSON.parse(jsonMatch[0]);

    console.log(`Generated daily task for program ${programType}, day ${day}`);

    return new Response(JSON.stringify(taskContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-daily-task:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      title: "Sarcina Zilei",
      task: "Ia 15 minute să reflectezi asupra obiectivelor tale profesionale și scrie trei acțiuni specifice pe care le poți întreprinde în această săptămână pentru a te apropia de atingerea lor.",
      estimated_duration: "15 minute",
      reflection_question: "Ce ai învățat despre tine astăzi și cum vei aplica această perspectivă?"
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

