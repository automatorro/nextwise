

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

    // Define program-specific prompts in Romanian with progression
    const getProgression = (day: number) => {
      if (day <= 3) return "introducere și conștientizare";
      if (day <= 7) return "dezvoltare și practică";
      if (day <= 10) return "consolidare și aplicare";
      return "finalizare și integrare";
    };

    const programPrompts = {
      'motivation_reset': `Ești un coach de motivație expert. Generează o sarcină pentru ziua ${day}/14 dintr-un program pentru RESETAREA MOTIVAȚIEI. 

      FAZA: ${getProgression(day)}
      
      FOCUS SPECIFIC pentru motivation_reset:
      - Zilele 1-3: Identificarea blocajelor, evaluarea stării actuale de motivație
      - Zilele 4-7: Redefinirea obiectivelor, crearea rutinelor energizante
      - Zilele 8-10: Implementarea strategiilor de menținere a motivației 
      - Zilele 11-14: Consolidarea obiceiurilor noi, planul pe termen lung`,

      'leadership_transition': `Ești un coach de leadership senior. Generează o sarcină pentru ziua ${day}/14 dintr-un program pentru TRANZIȚIA ÎN LEADERSHIP.

      FAZA: ${getProgression(day)}
      
      FOCUS SPECIFIC pentru leadership_transition:
      - Zilele 1-3: Evaluarea stilului de leadership actual, identificarea zonelor de dezvoltare
      - Zilele 4-7: Practicarea abilităților de comunicare și delegare
      - Zilele 8-10: Managementul conflictelor și luarea deciziilor dificile
      - Zilele 11-14: Crearea viziunii de echipă, planul de dezvoltare ca lider`,

      'interview_training': `Ești un expert în recrutare și coaching pentru interviuri. Generează o sarcină pentru ziua ${day}/14 dintr-un program pentru PREGĂTIREA INTERVIURILOR.

      FAZA: ${getProgression(day)}
      
      FOCUS SPECIFIC pentru interview_training:
      - Zilele 1-3: Analiza profilului profesional, identificarea punctelor forte
      - Zilele 4-7: Practicarea răspunsurilor la întrebări comune, storytelling
      - Zilele 8-10: Simularea interviurilor, gestionarea stresului 
      - Zilele 11-14: Pregătirea pentru diferite tipuri de interviuri, follow-up`,

      'career_clarity': `Ești un consilier de carieră cu experiență vastă. Generează o sarcină pentru ziua ${day}/14 dintr-un program pentru CLARITATEA ÎN CARIERĂ.

      FAZA: ${getProgression(day)}
      
      FOCUS SPECIFIC pentru career_clarity:
      - Zilele 1-3: Autodescoperirea valorilor, aptitudinilor și intereselor
      - Zilele 4-7: Explorarea opțiunilor de carieră, research-ul pieței
      - Zilele 8-10: Definirea obiectivelor de carieră pe termen scurt și lung
      - Zilele 11-14: Crearea planului de acțiune, primii pași concreti`
    };

    const systemPrompt = programPrompts[programType as keyof typeof programPrompts] || 
      `Generează o sarcină practică pentru ziua ${day} dintr-un program de 14 zile pentru dezvoltare profesională.`;

    const fullPrompt = `${systemPrompt}

    Creează o sarcină specifică și acționabilă pentru ziua ${day}. Sarcina trebuie să:
    - Fie adaptată exact la faza programului (${getProgression(day)})
    - Poată fi completată în 15-30 de minute
    - Fie practică și aplicabilă în situații reale
    - Includă instrucțiuni pas cu pas foarte clare
    - Fie captivantă și să construiască pe zilele anterioare

    IMPORTANT: Răspunde EXCLUSIV în limba română. 

    Răspunde cu un obiect JSON valid cu această structură exactă:
    {
      "title": "Titlul sarcinii pentru ziua ${day}",
      "task": "Descrierea detaliată a sarcinii cu instrucțiuni pas cu pas",
      "estimated_duration": "15-30 minute", 
      "reflection_question": "Întrebare specifică pentru reflecția de la sfârșitul zilei"
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

    // Clean and extract JSON with improved parsing
    let cleanedResponse = aiResponse.trim();
    
    // Remove markdown code blocks if present
    cleanedResponse = cleanedResponse.replace(/```json\s*|\s*```/g, '');
    
    // Extract JSON object
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }
    
    let taskContent;
    try {
      taskContent = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, 'Raw response:', aiResponse);
      throw new Error(`Failed to parse JSON: ${parseError.message}`);
    }

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

