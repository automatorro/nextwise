import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

// Helper functions for template-specific content generation
function getTemplateSpecificDescription(careerGoal: string, phase: string): string {
  const goal = careerGoal.toLowerCase();
  
  if (goal.includes('trainer') || goal.includes('senior trainer')) {
    switch (phase) {
      case 'fundamentals':
        return 'Dezvoltă competențele de instruire și facilitare prin cursuri practice de pedagogie și comunicare.';
      case 'practical':
        return 'Aplică tehnicile de training prin proiecte demonstrative și practică cu audiențe reale.';
      case 'networking':
        return 'Conectează-te cu traineri experimentați și participă la evenimente de HR și Learning & Development.';
      default:
        return 'Dezvoltă competențele necesare pentru rolul de trainer.';
    }
  }
  
  if (goal.includes('data science') || goal.includes('data scientist')) {
    switch (phase) {
      case 'fundamentals':
        return 'Învață Python, statistică și algoritmi de machine learning prin cursuri gratuite de top.';
      case 'practical':
        return 'Construiește proiecte de data science reale și creează un portofoliu demonstrativ.';
      default:
        return 'Dezvoltă competențele tehnice pentru data science.';
    }
  }
  
  // Generic fallback
  return `Dezvoltă competențele specifice pentru ${careerGoal} prin resurse gratuite de calitate.`;
}

function getTemplateSpecificResources(careerGoal: string, phase: string): any[] {
  const goal = careerGoal.toLowerCase();
  
  if (goal.includes('trainer') || goal.includes('senior trainer')) {
    switch (phase) {
      case 'fundamentals':
        return [
          {
            type: 'course',
            title: 'Learning How to Learn - Coursera',
            url: 'https://www.coursera.org/learn/learning-how-to-learn',
            description: 'Fundamentele învățării eficiente - esențial pentru traineri',
            estimatedHours: 15,
            isFree: true
          },
          {
            type: 'course',
            title: 'Introduction to Public Speaking - edX',
            url: 'https://www.edx.org/course/introduction-to-public-speaking',
            description: 'Dezvoltă competențele de prezentare și comunicare',
            estimatedHours: 12,
            isFree: true
          },
          {
            type: 'video',
            title: 'TED Talks - How to Give Great Presentations',
            url: 'https://www.youtube.com/playlist?list=PLJicmE8fK0EiGpX9BtIz2WtS6j2vz2u9d',
            description: 'Colecție de prezentări despre arta comunicării',
            estimatedHours: 8,
            isFree: true
          }
        ];
      case 'practical':
        return [
          {
            type: 'practice',
            title: 'Toastmasters International',
            url: 'https://www.toastmasters.org/',
            description: 'Practică prezentarea în fața audiențelor reale',
            estimatedHours: 20,
            isFree: true
          },
          {
            type: 'course',
            title: 'Instructional Design Course - Khan Academy',
            url: 'https://www.khanacademy.org/computing/computer-programming',
            description: 'Învață să creezi curriculum educațional eficient',
            estimatedHours: 15,
            isFree: true
          }
        ];
      case 'networking':
        return [
          {
            type: 'networking',
            title: 'ATD (Association for Talent Development)',
            url: 'https://www.td.org/',
            description: 'Asociația internațională pentru profesioniștii în training',
            estimatedHours: 5,
            isFree: true
          },
          {
            type: 'networking',
            title: 'LinkedIn Learning & Development Groups',
            url: 'https://www.linkedin.com/groups/',
            description: 'Grupuri specializate pentru traineri și specialiști L&D',
            estimatedHours: 8,
            isFree: true
          }
        ];
      default:
        return [];
    }
  }
  
  // Generic resources
  return [
    {
      type: 'course',
      title: `${careerGoal} Fundamentals`,
      url: `https://www.coursera.org/search?query=${encodeURIComponent(careerGoal)}`,
      description: 'Cursuri introductive în domeniu',
      estimatedHours: 20,
      isFree: true
    },
    {
      type: 'video',
      title: 'YouTube Learning Path',
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(careerGoal)}+tutorial`,
      description: 'Tutorial-uri gratuite și practice',
      estimatedHours: 15,
      isFree: true
    }
  ];
}

function getTemplateSpecificActions(careerGoal: string, phase: string): string[] {
  const goal = careerGoal.toLowerCase();
  
  if (goal.includes('trainer') || goal.includes('senior trainer')) {
    switch (phase) {
      case 'fundamentals':
        return [
          'Completează cursul Learning How to Learn',
          'Practică 15 minute de public speaking zilnic',
          'Citește 3 articole despre pedagogie pe săptămână'
        ];
      case 'practical':
        return [
          'Creează primul tău material de training (20 min)',
          'Găzduiește o sesiune de training pentru colegi/prieteni',
          'Documentează feedback-ul și îmbunătățește materialul'
        ];
      case 'networking':
        return [
          'Creează profil LinkedIn optimizat pentru training',
          'Alătură-te la ATD și 2 grupuri locale de traineri',
          'Participă la minim 1 webinar L&D pe lună'
        ];
      default:
        return ['Stabilește obiective clare', 'Urmărește progresul zilnic'];
    }
  }
  
  // Generic actions
  return [
    'Dedică 1-2 ore zilnic studiului',
    'Aplică cunoștințele în proiecte practice',
    'Solicită feedback de la profesioniști din domeniu'
  ];
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { testResults, careerGoal, userProfile, userId, templateContext } = await req.json();
    
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

    // Enhanced prompt based on template context
    const isTemplate = templateContext && templateContext.title;
    const timeframe = isTemplate ? `${templateContext.estimatedDurationMonths} luni` : '6-12 luni';
    
    const prompt = `
      Creează un plan detaliat de dezvoltare a carierei pentru cineva care vrea să devină ${careerGoal}.
      ${isTemplate ? `
      
      CONTEXT TEMPLATE:
      - Categorie: ${templateContext.category}
      - Nivel dificultate: ${templateContext.difficultyLevel}
      - Durată estimată: ${templateContext.estimatedDurationMonths} luni
      - Skills necesare: ${templateContext.requiredSkills?.join(', ') || 'N/A'}
      - Roluri țintă: ${templateContext.targetRoles?.join(', ') || 'N/A'}
      ` : ''}
      
      ${personalityInsights}
      
      Alte rezultate ale testelor:
      ${testResults.map((r: any) => `- ${r.test_types?.name}: ${JSON.stringify(r.score)}`).join('\n')}
      
      IMPORTANT: Pentru fiecare milestone și recomandare, INCLUDE RESURSE GRATUITE CONCRETE cu linkuri reale către:
      - Coursera (cursuri gratuite cu audit)
      - edX (cursuri MIT, Harvard, Stanford gratuite)
      - Khan Academy pentru skills fundamentale
      - YouTube canale educaționale specializate (CrashCourse, freeCodeCamp, etc.)
      - Articole Medium, dev.to, blog-uri relevante
      - Cărți gratuite (archive.org, PDF-uri open source)
      - Teste gratuite (16personalities, VIA Character Survey)
      - Platforme practică (HackerRank, Codecademy free tier, etc.)
      
      Structură obligatorie:
      {
        "title": "Plan de dezvoltare ${careerGoal}",
        "description": "Plan personalizat cu resurse gratuite pentru a deveni ${careerGoal}",
        "timeline": "${timeframe}",
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
      // Fallback: create a template-specific structure with real resources
      const fallbackTimeframe = isTemplate ? `${templateContext.estimatedDurationMonths} luni` : '6-12 luni';
      careerPlan = {
        title: `Plan de dezvoltare ${careerGoal}`,
        description: `Plan personalizat cu resurse gratuite concrete pentru a deveni ${careerGoal} în ${fallbackTimeframe}.`,
        timeline: fallbackTimeframe,
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
            description: getTemplateSpecificDescription(careerGoal, 'fundamentals'),
            targetWeeks: isTemplate ? Math.floor(templateContext.estimatedDurationMonths * 4 * 0.4) : 8,
            category: 'skill',
            resources: getTemplateSpecificResources(careerGoal, 'fundamentals'),
            actionItems: getTemplateSpecificActions(careerGoal, 'fundamentals')
          },
          {
            title: 'Dezvoltă competențe practice',
            description: getTemplateSpecificDescription(careerGoal, 'practical'),
            targetWeeks: isTemplate ? Math.floor(templateContext.estimatedDurationMonths * 4 * 0.5) : 12,
            category: 'experience',
            resources: getTemplateSpecificResources(careerGoal, 'practical'),
            actionItems: getTemplateSpecificActions(careerGoal, 'practical')
          },
          {
            title: 'Construiește rețeaua profesională',
            description: getTemplateSpecificDescription(careerGoal, 'networking'),
            targetWeeks: isTemplate ? Math.floor(templateContext.estimatedDurationMonths * 4 * 0.3) : 16,
            category: 'networking',
            resources: getTemplateSpecificResources(careerGoal, 'networking'),
            actionItems: getTemplateSpecificActions(careerGoal, 'networking')
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

    // Trigger career recommendations generation in background
    try {
      await supabase.functions.invoke('generate-career-recommendations', {
        body: { userId }
      });
    } catch (recError) {
      console.error('Error generating recommendations (non-blocking):', recError);
      // Don't throw - this shouldn't block the main plan creation
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