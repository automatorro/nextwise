import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// High-quality resource platforms prioritized in order
const PRIORITY_PLATFORMS = {
  youtube: {
    baseUrl: 'https://www.youtube.com',
    searchPatterns: [
      'site:youtube.com "{query}" full course',
      'site:youtube.com "{query}" tutorial',
      'site:youtube.com "{query}" TED',
      'site:youtube.com "{query}" freeCodeCamp',
      'site:youtube.com "{query}" Google',
      'site:youtube.com "{query}" Microsoft',
    ],
    priorityChannels: ['TED', 'freeCodeCamp', 'Google', 'Microsoft', 'Harvard', 'MIT', 'Stanford']
  },
  ted: {
    baseUrl: 'https://www.ted.com',
    searchPatterns: [
      'site:ted.com "{query}"',
      'site:ted.com "{query}" talk',
    ]
  },
  coursera: {
    baseUrl: 'https://www.coursera.org',
    searchPatterns: [
      'site:coursera.org "{query}" audit',
      'site:coursera.org "{query}" free',
      'site:coursera.org "{query}" course',
    ]
  },
  udemy: {
    baseUrl: 'https://www.udemy.com',
    searchPatterns: [
      'site:udemy.com "{query}" free',
      'site:udemy.com "{query}" course',
    ]
  }
};

// Function to validate a URL by making an HTTP HEAD request
async function validateUrl(url: string): Promise<{ isValid: boolean; statusCode?: number; error?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CareerPlatform/1.0; +https://example.com/bot)'
      }
    });
    
    clearTimeout(timeoutId);
    
    return {
      isValid: response.status === 200,
      statusCode: response.status
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message
    };
  }
}

// Function to generate search queries for a milestone
function generateSearchQueries(milestoneTitle: string): string[] {
  const queries = [];
  
  // Base queries
  queries.push(`"${milestoneTitle}" tutorial`);
  queries.push(`"${milestoneTitle}" course`);
  queries.push(`"${milestoneTitle}" guide`);
  queries.push(`Introduction to ${milestoneTitle}`);
  queries.push(`${milestoneTitle} fundamentals`);
  queries.push(`${milestoneTitle} basics`);
  
  // Add variations with common keywords
  if (milestoneTitle.toLowerCase().includes('design')) {
    queries.push(`${milestoneTitle} design thinking`);
    queries.push(`${milestoneTitle} UX design`);
  }
  
  if (milestoneTitle.toLowerCase().includes('development') || milestoneTitle.toLowerCase().includes('programming')) {
    queries.push(`${milestoneTitle} coding`);
    queries.push(`${milestoneTitle} programming`);
  }
  
  return queries;
}

// Function to find high-quality resources for a milestone
async function findQualityResources(milestoneTitle: string, category: string): Promise<any[]> {
  const resources = [];
  const searchQueries = generateSearchQueries(milestoneTitle);
  
  // Template resources based on milestone category and title
  const templateResources = getTemplateResources(milestoneTitle, category);
  
  // Validate each template resource
  for (const resource of templateResources) {
    console.log(`Validating resource: ${resource.url}`);
    const validation = await validateUrl(resource.url);
    
    if (validation.isValid) {
      resources.push({
        ...resource,
        validationStatus: 'active',
        lastChecked: new Date().toISOString()
      });
      console.log(`✓ Valid resource added: ${resource.title}`);
    } else {
      console.log(`✗ Invalid resource skipped: ${resource.title} (${validation.statusCode || validation.error})`);
    }
    
    // Add small delay to prevent overwhelming servers
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return resources;
}

// Function to get template resources based on milestone content
function getTemplateResources(milestoneTitle: string, category: string): any[] {
  const title = milestoneTitle.toLowerCase();
  const resources = [];
  
  // Design-related resources
  if (title.includes('design thinking') || title.includes('design')) {
    resources.push({
      type: 'video',
      title: 'Design Thinking Process - IDEO',
      url: 'https://www.youtube.com/watch?v=_r0VX-aU_T8',
      description: 'Learn the design thinking process from IDEO experts',
      estimatedHours: 1,
      isFree: true,
      platform: 'YouTube'
    });
    
    resources.push({
      type: 'course',
      title: 'Introduction to Design Thinking - Stanford',
      url: 'https://www.coursera.org/learn/design-thinking-introduction',
      description: 'Stanford course on design thinking fundamentals',
      estimatedHours: 25,
      isFree: true,
      platform: 'Coursera'
    });
  }
  
  // Programming/Development resources
  if (title.includes('programming') || title.includes('development') || title.includes('coding')) {
    resources.push({
      type: 'course',
      title: 'freeCodeCamp - Full Stack Development',
      url: 'https://www.freecodecamp.org/learn',
      description: 'Complete free coding curriculum',
      estimatedHours: 300,
      isFree: true,
      platform: 'freeCodeCamp'
    });
    
    resources.push({
      type: 'video',
      title: 'Programming Fundamentals - Harvard CS50',
      url: 'https://www.youtube.com/watch?v=YoXxevp1WRQ',
      description: 'Harvard CS50 introduction to programming',
      estimatedHours: 2,
      isFree: true,
      platform: 'YouTube'
    });
  }
  
  // Leadership/Management resources
  if (title.includes('leadership') || title.includes('management') || title.includes('trainer')) {
    resources.push({
      type: 'video',
      title: 'How to be a Great Leader - TED',
      url: 'https://www.ted.com/talks/roselinde_torres_what_it_takes_to_be_a_great_leader',
      description: 'TED talk on leadership fundamentals',
      estimatedHours: 1,
      isFree: true,
      platform: 'TED'
    });
    
    resources.push({
      type: 'course',
      title: 'Leadership Skills for Managers - Coursera',
      url: 'https://www.coursera.org/learn/leadership-skills-managers',
      description: 'University of Virginia course on leadership',
      estimatedHours: 15,
      isFree: true,
      platform: 'Coursera'
    });
  }
  
  // Communication resources
  if (title.includes('communication') || title.includes('presentation') || title.includes('public speaking')) {
    resources.push({
      type: 'video',
      title: 'The Power of Effective Communication - TED',
      url: 'https://www.ted.com/talks/celeste_headlee_10_ways_to_have_a_better_conversation',
      description: 'TED talk on effective communication',
      estimatedHours: 1,
      isFree: true,
      platform: 'TED'
    });
    
    resources.push({
      type: 'course',
      title: 'Public Speaking - University of Washington',
      url: 'https://www.coursera.org/learn/public-speaking',
      description: 'Comprehensive public speaking course',
      estimatedHours: 20,
      isFree: true,
      platform: 'Coursera'
    });
  }
  
  // Data Science resources
  if (title.includes('data') || title.includes('analytics') || title.includes('statistics')) {
    resources.push({
      type: 'course',
      title: 'Data Science Fundamentals - IBM',
      url: 'https://www.coursera.org/learn/data-science-methodology',
      description: 'IBM course on data science methodology',
      estimatedHours: 15,
      isFree: true,
      platform: 'Coursera'
    });
    
    resources.push({
      type: 'video',
      title: 'Data Science Tutorial - freeCodeCamp',
      url: 'https://www.youtube.com/watch?v=ua-CiDNNj30',
      description: 'Complete data science tutorial',
      estimatedHours: 12,
      isFree: true,
      platform: 'YouTube'
    });
  }
  
  // Project Management resources
  if (title.includes('project') || title.includes('management') || title.includes('agile')) {
    resources.push({
      type: 'course',
      title: 'Project Management - Google',
      url: 'https://www.coursera.org/professional-certificates/google-project-management',
      description: 'Google Project Management Certificate',
      estimatedHours: 180,
      isFree: true,
      platform: 'Coursera'
    });
    
    resources.push({
      type: 'video',
      title: 'Agile Project Management - Microsoft',
      url: 'https://www.youtube.com/watch?v=502ILHjX9EE',
      description: 'Microsoft guide to agile project management',
      estimatedHours: 2,
      isFree: true,
      platform: 'YouTube'
    });
  }
  
  // Generic assessment resources
  if (title.includes('assessment') || title.includes('evaluation') || title.includes('personality')) {
    resources.push({
      type: 'test',
      title: 'Myers-Briggs Type Indicator',
      url: 'https://www.16personalities.com/',
      description: 'Free personality assessment test',
      estimatedHours: 1,
      isFree: true,
      platform: '16Personalities'
    });
    
    resources.push({
      type: 'test',
      title: 'VIA Character Strengths Survey',
      url: 'https://www.viacharacter.org/character-strengths-survey',
      description: 'Identify your character strengths',
      estimatedHours: 1,
      isFree: true,
      platform: 'VIA Institute'
    });
  }
  
  return resources;
}

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
      // Fallback: create a template-specific structure with validated resources
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
            resources: await findQualityResources('personality assessment', 'assessment'),
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
            resources: await findQualityResources(`${careerGoal} fundamentals`, 'skill'),
            actionItems: getTemplateSpecificActions(careerGoal, 'fundamentals')
          },
          {
            title: 'Dezvoltă competențe practice',
            description: getTemplateSpecificDescription(careerGoal, 'practical'),
            targetWeeks: isTemplate ? Math.floor(templateContext.estimatedDurationMonths * 4 * 0.5) : 12,
            category: 'experience',
            resources: await findQualityResources(`${careerGoal} practical`, 'experience'),
            actionItems: getTemplateSpecificActions(careerGoal, 'practical')
          },
          {
            title: 'Construiește rețeaua profesională',
            description: getTemplateSpecificDescription(careerGoal, 'networking'),
            targetWeeks: isTemplate ? Math.floor(templateContext.estimatedDurationMonths * 4 * 0.3) : 16,
            category: 'networking',
            resources: await findQualityResources(`${careerGoal} networking`, 'networking'),
            actionItems: getTemplateSpecificActions(careerGoal, 'networking')
          },
          {
            title: 'Pregătire pentru tranziție',
            description: 'Pregătește-te pentru primul rol în noua carieră prin CV, portofoliu și interviuri.',
            targetWeeks: 20,
            category: 'experience',
            resources: await findQualityResources('career transition', 'experience'),
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

    // Validate resources in the career plan before saving
    if (careerPlan.milestones && Array.isArray(careerPlan.milestones)) {
      for (const milestone of careerPlan.milestones) {
        if (milestone.resources && Array.isArray(milestone.resources)) {
          const validatedResources = [];
          
          for (const resource of milestone.resources) {
            if (resource.url) {
              console.log(`Validating milestone resource: ${resource.url}`);
              const validation = await validateUrl(resource.url);
              
              if (validation.isValid) {
                validatedResources.push({
                  ...resource,
                  validationStatus: 'active',
                  lastChecked: new Date().toISOString()
                });
                console.log(`✓ Valid milestone resource: ${resource.title}`);
              } else {
                console.log(`✗ Invalid milestone resource skipped: ${resource.title} (${validation.statusCode || validation.error})`);
              }
            }
            
            // Add small delay to prevent overwhelming servers
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          
          milestone.resources = validatedResources;
        }
      }
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

    // Create individual milestone records in career_milestones table with validation status
    if (careerPlan.milestones && Array.isArray(careerPlan.milestones)) {
      const milestoneInserts = careerPlan.milestones.map((milestone: any, index: number) => {
        // Create validation status object for the milestone
        const validationStatus: any = {};
        if (milestone.resources && Array.isArray(milestone.resources)) {
          milestone.resources.forEach((resource: any) => {
            if (resource.url) {
              validationStatus[resource.url] = resource.validationStatus === 'active';
            }
          });
        }

        return {
          career_path_id: savedPlan.id,
          title: milestone.title,
          description: milestone.description,
          milestone_order: index + 1,
          resources: milestone.resources || [],
          target_date: null,
          is_completed: false,
          last_validation_check: new Date().toISOString(),
          validation_status: validationStatus
        };
      });

      const { error: milestonesError } = await supabase
        .from('career_milestones')
        .insert(milestoneInserts);

      if (milestonesError) {
        console.error('Error creating milestones:', milestonesError);
        // Don't throw - the plan was created successfully, milestones can be added later
      }
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
