import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { testResults, careerGoal, userProfile, userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Analyze test results to create career plan prompt
    const bigFiveResults = testResults.find((result: any) => 
      result.test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    );

    let personalityInsights = '';
    if (bigFiveResults?.score) {
      const dimensions = bigFiveResults.score.dimensions || {};
      personalityInsights = `
        Profilul de personalitate (Big Five):
        - Deschidere: ${dimensions.openness || 'N/A'}/100
        - Conștiinciozitate: ${dimensions.conscientiousness || 'N/A'}/100
        - Extraversiune: ${dimensions.extraversion || 'N/A'}/100
        - Amabilitate: ${dimensions.agreeableness || 'N/A'}/100
        - Nevroza: ${dimensions.neuroticism || 'N/A'}/100
      `;
    }

    const prompt = `
      Creează un plan detaliat de dezvoltare a carierei pentru cineva care vrea să devină ${careerGoal}.
      
      ${personalityInsights}
      
      Alte rezultate ale testelor:
      ${testResults.map((r: any) => `- ${r.test_types?.name}: ${JSON.stringify(r.score)}`).join('\n')}
      
      IMPORTANT: Pentru fiecare milestone și recomandare, INCLUDE RESURSE GRATUITE CONCRETE cu linkuri reale către:
      - Coursera (cursuri gratuite)
      - edX (cursuri gratuite) 
      - Khan Academy
      - YouTube tutorials specifice
      - Articole relevante
      - Cărți gratuite (PDF-uri disponibile online)
      - Teste gratuite de personalitate sau competențe
      - Platforme de practică gratuite
      
      Structură obligatorie:
      {
        "title": "Plan de dezvoltare ${careerGoal}",
        "description": "Plan personalizat cu resurse gratuite pentru a deveni ${careerGoal}",
        "timeline": "6-12 luni",
        "milestones": [
          {
            "title": "Titlul Milestone-ului",
            "description": "Descriere detaliată cu pași concreti",
            "targetWeeks": 2-8,
            "category": "skill|certification|experience|networking|assessment",
            "resources": [
              {
                "type": "course|article|book|test|video|practice",
                "title": "Numele resursei",
                "url": "https://link-real-către-resursa",
                "description": "Ce vei învăța",
                "estimatedHours": 5-20,
                "isFree": true
              }
            ],
            "actionItems": [
              "Acțiune concretă 1",
              "Acțiune concretă 2"
            ]
          }
        ],
        "recommendations": [
          {
            "type": "skill|course|certification|networking|test",
            "title": "Titlul recomandării",
            "description": "De ce este important și cum te ajută",
            "priority": 1-5,
            "resources": [
              {
                "type": "course|article|book|test|video",
                "title": "Nume resursă",
                "url": "https://link-real",
                "description": "Descriere",
                "isFree": true
              }
            ]
          }
        ]
      }
      
      Exemple de linkuri reale pentru ${careerGoal}:
      - Coursera: https://www.coursera.org/search?query=${encodeURIComponent(careerGoal)}
      - edX: https://www.edx.org/search?q=${encodeURIComponent(careerGoal)}
      - Khan Academy pentru competențe de bază
      - YouTube pentru tutoriale practice
      - LinkedIn Learning (cu trial gratuit)
      
      Răspunde DOAR cu JSON-ul, fără alte explicații.
    `;

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
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error: ${response.status} - ${errorText}`);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const geminiResult = await response.json();
    const generatedText = geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No response from Gemini API');
    }

    // Try to parse JSON from the response
    let careerPlan;
    try {
      // Extract JSON from the response (it might contain markdown formatting)
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        careerPlan = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      // Fallback: create a comprehensive structure with real resources
      careerPlan = {
        title: `Plan de dezvoltare ${careerGoal}`,
        description: `Plan personalizat cu resurse gratuite concrete pentru a deveni ${careerGoal} în 6-12 luni.`,
        timeline: '6-12 luni',
        milestones: [
          {
            title: 'Evaluare competențe și personalitate',
            description: 'Completează teste gratuite pentru a-ți cunoaște punctele forte și zonele de dezvoltare.',
            targetWeeks: 1,
            category: 'assessment',
            resources: [
              {
                type: 'test',
                title: 'Myers-Briggs Type Indicator',
                url: 'https://www.16personalities.com/',
                description: 'Test gratuit de personalitate pentru înțelegerea preferințelor tale profesionale',
                estimatedHours: 1,
                isFree: true
              },
              {
                type: 'test',
                title: 'VIA Character Strengths Survey',
                url: 'https://www.viacharacter.org/www/Character-Strengths-Survey',
                description: 'Identifică-ți punctele forte de caracter',
                estimatedHours: 1,
                isFree: true
              }
            ],
            actionItems: [
              'Completează testul MBTI și salvează rezultatele',
              'Fă testul de puncte forte VIA',
              'Notează 3 puncte forte principale identificate'
            ]
          },
          {
            title: `Învață fundamentele pentru ${careerGoal}`,
            description: 'Dobândește cunoștințele de bază necesare în domeniu prin cursuri gratuite de calitate.',
            targetWeeks: 8,
            category: 'skill',
            resources: [
              {
                type: 'course',
                title: 'Curs introductiv relevant',
                url: `https://www.coursera.org/search?query=${encodeURIComponent(careerGoal)}`,
                description: 'Cursuri gratuite de introducere în domeniu',
                estimatedHours: 20,
                isFree: true
              },
              {
                type: 'course',
                title: 'Khan Academy - Competențe fundamentale',
                url: 'https://www.khanacademy.org/',
                description: 'Dezvoltă competențele de bază necesare',
                estimatedHours: 15,
                isFree: true
              }
            ],
            actionItems: [
              'Înscrie-te la 2 cursuri gratuite relevante',
              'Dedică 2-3 ore pe săptămână studiului',
              'Completează exercițiile practice'
            ]
          },
          {
            title: 'Dezvoltă competențe practice',
            description: 'Aplică cunoștințele învățate prin proiecte practice și exerciții.',
            targetWeeks: 12,
            category: 'experience',
            resources: [
              {
                type: 'practice',
                title: 'YouTube - Tutorial-uri practice',
                url: `https://www.youtube.com/results?search_query=${encodeURIComponent(careerGoal)}+tutorial`,
                description: 'Tutorial-uri gratuite pentru aplicarea practică',
                estimatedHours: 25,
                isFree: true
              },
              {
                type: 'book',
                title: 'Cărți gratuite de specialitate',
                url: 'https://archive.org/',
                description: 'Resurse gratuite pentru aprofundarea cunoștințelor',
                estimatedHours: 30,
                isFree: true
              }
            ],
            actionItems: [
              'Creează 2-3 proiecte demonstrative',
              'Documentează progresul într-un jurnal',
              'Solicită feedback de la profesioniști'
            ]
          },
          {
            title: 'Construiește rețeaua profesională',
            description: 'Conectează-te cu profesioniști din domeniu și participă la evenimente.',
            targetWeeks: 16,
            category: 'networking',
            resources: [
              {
                type: 'networking',
                title: 'LinkedIn - Grupuri profesionale',
                url: 'https://www.linkedin.com/groups/',
                description: 'Alătură-te grupurilor relevante pentru domeniul tău',
                estimatedHours: 5,
                isFree: true
              },
              {
                type: 'networking',
                title: 'Meetup - Evenimente locale',
                url: 'https://www.meetup.com/',
                description: 'Participă la evenimente și workshop-uri locale',
                estimatedHours: 10,
                isFree: true
              }
            ],
            actionItems: [
              'Creează profil LinkedIn profesional',
              'Alătură-te la 3 grupuri relevante',
              'Participă la minim 2 evenimente în domeniu'
            ]
          },
          {
            title: 'Pregătire pentru tranziție',
            description: 'Pregătește-te pentru primul rol în noua carieră prin CV, portofoliu și interviuri.',
            targetWeeks: 20,
            category: 'experience',
            resources: [
              {
                type: 'course',
                title: 'Coursera - CV și scrisori de intenție',
                url: 'https://www.coursera.org/learn/resume-writing',
                description: 'Învață să scrii CV-uri eficiente',
                estimatedHours: 8,
                isFree: true
              },
              {
                type: 'practice',
                title: 'GitHub - Portofoliu online',
                url: 'https://github.com/',
                description: 'Creează un portofoliu online pentru proiectele tale',
                estimatedHours: 12,
                isFree: true
              }
            ],
            actionItems: [
              'Actualizează CV-ul cu noile competențe',
              'Creează portofoliu online',
              'Practică interviurile cu prietenii'
            ]
          }
        ],
        recommendations: [
          {
            type: 'course',
            title: 'Certificare Google relevantă',
            description: 'Obține o certificare Google gratuită pentru a-ți valida competențele.',
            priority: 5,
            resources: [
              {
                type: 'certification',
                title: 'Google Career Certificates',
                url: 'https://www.coursera.org/google-career-certificates',
                description: 'Certificări Google pentru cariere în tehnologie',
                isFree: true
              }
            ]
          },
          {
            type: 'skill',
            title: 'Competențe de comunicare',
            description: 'Dezvoltă competențele de comunicare esențiale pentru orice carieră.',
            priority: 4,
            resources: [
              {
                type: 'course',
                title: 'edX - Communication Skills',
                url: 'https://www.edx.org/course/introduction-to-communication-science',
                description: 'Curs gratuit de comunicare de la universități de top',
                isFree: true
              }
            ]
          }
        ]
      };
    }

    // Save the career plan to database
    const { data: savedPlan, error: saveError } = await supabase
      .from('career_paths')
      .insert({
        user_id: userId,
        title: careerPlan.title,
        description: careerPlan.description,
        milestones: careerPlan.milestones,
        generated_by_ai: true,
        progress_percentage: 0
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving career plan:', saveError);
      throw saveError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        careerPlan: {
          ...careerPlan,
          id: savedPlan.id
        }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error generating career plan:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to generate career plan' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});