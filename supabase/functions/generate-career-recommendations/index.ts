import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Updated stable resource links that are less likely to change
const VERIFIED_RESOURCES = {
  personality_tests: [
    {
      title: 'Test 16 Personalities (MBTI)',
      url: 'https://www.16personalities.com/',
      description: 'Test gratuit de personalitate MBTI pentru înțelegerea preferințelor profesionale'
    },
    {
      title: 'VIA Character Strengths Survey',
      url: 'https://www.viacharacter.org/character-strengths-survey',
      description: 'Identifică-ți cele 24 de puncte forte de caracter'
    }
  ],
  courses: {
    leadership: [
      {
        title: 'Introduction to Leadership - University of Virginia',
        url: 'https://www.coursera.org/learn/leadership-introduction',
        platform: 'Coursera',
        estimatedHours: 12
      },
      {
        title: 'Leadership in Organizations - IESE Business School',
        url: 'https://www.coursera.org/learn/leadership-organizations',
        platform: 'Coursera',
        estimatedHours: 15
      }
    ],
    project_management: [
      {
        title: 'Introduction to Project Management - University of Adelaide',
        url: 'https://www.coursera.org/learn/project-management',
        platform: 'Coursera',
        estimatedHours: 18
      },
      {
        title: 'Google Project Management Certificate',
        url: 'https://www.coursera.org/professional-certificates/google-project-management',
        platform: 'Coursera',
        estimatedHours: 180
      }
    ],
    communication: [
      {
        title: 'Introduction to Communication Science - University of Amsterdam',
        url: 'https://www.coursera.org/learn/communication',
        platform: 'Coursera',
        estimatedHours: 25
      },
      {
        title: 'Improving Communication Skills - University of Pennsylvania',
        url: 'https://www.coursera.org/learn/wharton-communication-skills',
        platform: 'Coursera',
        estimatedHours: 12
      }
    ],
    data_science: [
      {
        title: 'Data Science Methodology - IBM',
        url: 'https://www.coursera.org/learn/data-science-methodology',
        platform: 'Coursera',
        estimatedHours: 15
      },
      {
        title: 'Python for Data Science and AI - IBM',
        url: 'https://www.coursera.org/learn/python-for-applied-data-science-ai',
        platform: 'Coursera',
        estimatedHours: 20
      }
    ],
    technology: [
      {
        title: 'Introduction to Computer Science - Harvard CS50',
        url: 'https://www.edx.org/course/introduction-computer-science-harvardx-cs50x',
        platform: 'edX',
        estimatedHours: 150
      },
      {
        title: 'Web Development - University of Michigan',
        url: 'https://www.coursera.org/specializations/web-design',
        platform: 'Coursera',
        estimatedHours: 60
      }
    ]
  },
  youtube_channels: [
    {
      title: 'CrashCourse - Educational Content',
      url: 'https://www.youtube.com/@CrashCourse',
      description: 'Cursuri intensive pe diverse domenii'
    },
    {
      title: 'TED-Ed - Professional Development',
      url: 'https://www.youtube.com/@TEDEd',
      description: 'Lecții pentru dezvoltare profesională'
    },
    {
      title: 'Khan Academy - Skill Building',
      url: 'https://www.youtube.com/@khanacademy',
      description: 'Construirea competențelor fundamentale'
    }
  ]
}

function getPersonalizedRecommendations(testResults: any[], careerPlans: any[], existingRecs: any[]): any[] {
  const recommendations = [];
  
  // Find Big Five results
  const bigFiveResult = testResults.find(r => 
    r.test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
  );

  // Get career plan context for personalization
  const careerGoals = careerPlans?.map(p => p.title.toLowerCase()) || [];
  const hasLeadershipGoal = careerGoals.some(goal => 
    goal.includes('manager') || goal.includes('director') || goal.includes('lead')
  );
  const hasTechGoal = careerGoals.some(goal => 
    goal.includes('developer') || goal.includes('engineer') || goal.includes('tech')
  );

  if (bigFiveResult?.score?.dimensions) {
    const dims = bigFiveResult.score.dimensions;
    
    // Leadership recommendations for high extraversion OR career goals
    if (dims.extraversion > 70 || hasLeadershipGoal) {
      const leadershipCourse = VERIFIED_RESOURCES.courses.leadership[0];
      recommendations.push({
        recommendation_type: 'course',
        title: 'Dezvoltă competențe de leadership',
        description: `${dims.extraversion > 70 ? 'Extraversiunea ta ridicată' : 'Obiectivele tale de carieră'} indică potențial pentru roluri manageriale. Acest curs te va pregăti pentru pozițiile de conducere.`,
        action_text: 'Începe cursul gratuit',
        action_type: 'external_link',
        action_data: {
          url: leadershipCourse.url,
          estimatedHours: leadershipCourse.estimatedHours,
          difficulty: 'intermediate',
          platform: leadershipCourse.platform
        },
        category: 'skill_development',
        priority: hasLeadershipGoal ? 5 : 4,
        estimated_time_minutes: 180
      });
    }

    // Project management for high conscientiousness
    if (dims.conscientiousness > 70) {
      const pmCourse = VERIFIED_RESOURCES.courses.project_management[0];
      recommendations.push({
        recommendation_type: 'course',
        title: 'Project Management pentru persoane organizate',
        description: 'Conștiinciozitatea ta ridicată te predestinează pentru managementul de proiect. Acest curs îți va oferi instrumentele necesare.',
        action_text: 'Începe cursul PM',
        action_type: 'external_link',
        action_data: {
          url: pmCourse.url,
          estimatedHours: pmCourse.estimatedHours,
          difficulty: 'intermediate',
          platform: pmCourse.platform
        },
        category: 'certification',
        priority: 4,
        estimated_time_minutes: 240
      });
    }

    // Technical recommendations for tech career goals or high openness
    if (hasTechGoal || dims.openness > 75) {
      const techCourse = VERIFIED_RESOURCES.courses.technology[hasTechGoal ? 1 : 0];
      recommendations.push({
        recommendation_type: 'course',
        title: hasTechGoal ? 'Dezvoltare Web pentru cariera ta' : 'Explorează Computer Science',
        description: `${hasTechGoal ? 'Obiectivele tale tehnologice' : 'Deschiderea ta ridicată către experiențe noi'} te fac ideal pentru învățarea de tehnologii moderne.`,
        action_text: 'Începe cursul tech',
        action_type: 'external_link',
        action_data: {
          url: techCourse.url,
          estimatedHours: techCourse.estimatedHours,
          difficulty: hasTechGoal ? 'intermediate' : 'beginner',
          platform: techCourse.platform
        },
        category: 'skill_development',
        priority: hasTechGoal ? 5 : 3,
        estimated_time_minutes: 200
      });
    }

    // Communication skills for everyone, but especially low extraversion
    if (dims.extraversion < 50 || !existingRecs?.some(r => r.title.includes('comunicare'))) {
      const commCourse = VERIFIED_RESOURCES.courses.communication[1];
      recommendations.push({
        recommendation_type: 'course',
        title: 'Îmbunătățește comunicarea profesională',
        description: dims.extraversion < 50 
          ? 'Pentru introverți, competențele de comunicare structurate sunt esențiale pentru avansarea în carieră.'
          : 'Competențele de comunicare sunt fundamentale în orice carieră. Acest curs Wharton te va face un comunicator mai eficient.',
        action_text: 'Începe cursul Wharton',
        action_type: 'external_link',
        action_data: {
          url: commCourse.url,
          estimatedHours: commCourse.estimatedHours,
          difficulty: 'intermediate',
          platform: commCourse.platform
        },
        category: 'skill_development',
        priority: dims.extraversion < 50 ? 5 : 3,
        estimated_time_minutes: 150
      });
    }
  }

  // Add personality test recommendation if no Big Five results
  if (!bigFiveResult && !existingRecs?.some(r => r.title.includes('personalitate'))) {
    const personalityTest = VERIFIED_RESOURCES.personality_tests[0];
    recommendations.push({
      recommendation_type: 'test',
      title: 'Descoperă tipul tău de personalitate',
      description: 'Înțelegerea personalității tale este primul pas către o carieră aliniată cu punctele forte naturale.',
      action_text: 'Fă testul MBTI',
      action_type: 'external_link',
      action_data: {
        url: personalityTest.url,
        estimatedHours: 1,
        difficulty: 'beginner'
      },
      category: 'assessment',
      priority: 5,
      estimated_time_minutes: 15
    });
  }

  // Add internal navigation recommendations
  if (careerPlans.length === 0) {
    recommendations.push({
      recommendation_type: 'path',
      title: 'Creează primul tău plan de carieră',
      description: 'Pe baza testelor completate, poți genera un plan personalizat cu AI sau să creezi unul manual.',
      action_text: 'Creează plan de carieră',
      action_type: 'internal_navigation',
      action_data: {
        route: '/career-paths?tab=create',
        estimatedHours: 2,
        difficulty: 'beginner'
      },
      category: 'planning',
      priority: 4,
      estimated_time_minutes: 30
    });
  }

  return recommendations;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();
    
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get user's test results
    const { data: testResults } = await supabase
      .from('test_results')
      .select('*, test_types(name)')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    // Get existing career plans
    const { data: careerPlans } = await supabase
      .from('career_paths')
      .select('*')
      .eq('user_id', userId);

    // Get existing recommendations to avoid duplicates
    const { data: existingRecs } = await supabase
      .from('career_recommendations')
      .select('recommendation_type, title')
      .eq('user_id', userId)
      .eq('is_dismissed', false);

    // Clear old recommendations (keep only last 5 most recent)
    await supabase
      .from('career_recommendations')
      .update({ is_dismissed: true })
      .eq('user_id', userId)
      .lt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()); // older than 7 days

    let recommendations = [];

    if (!testResults || testResults.length === 0) {
      // Fallback for users without tests
      const personalityTest = VERIFIED_RESOURCES.personality_tests[0];
      recommendations = [
        {
          user_id: userId,
          recommendation_type: 'test',
          title: 'Completează primul test de personalitate',
          description: 'Pentru a primi recomandări personalizate, completează testul Big Five pentru a-ți înțelege mai bine personalitatea și preferințele profesionale.',
          action_text: 'Fă testul Big Five',
          action_type: 'internal_navigation',
          action_data: {
            route: '/assessments',
            estimatedHours: 1,
            difficulty: 'beginner'
          },
          category: 'assessment',
          priority: 5,
          estimated_time_minutes: 30
        },
        {
          user_id: userId,
          recommendation_type: 'test',
          title: 'Test MBTI pentru tipul de personalitate',
          description: 'Acest test gratuit îți va oferi insight-uri valoroase despre preferințele tale profesionale.',
          action_text: 'Fă testul MBTI gratuit',
          action_type: 'external_link',
          action_data: {
            url: personalityTest.url,
            estimatedHours: 1,
            difficulty: 'beginner'
          },
          category: 'assessment',
          priority: 4,
          estimated_time_minutes: 15
        }
      ];
    } else {
      // Generate personalized recommendations
      recommendations = getPersonalizedRecommendations(testResults, careerPlans, existingRecs);
    }

    // Add user_id and test_ids to each recommendation
    const enrichedRecommendations = recommendations.map((rec: any) => ({
      ...rec,
      user_id: userId,
      based_on_test_ids: testResults?.map(r => r.id) || []
    }));

    // Save new recommendations to database
    if (enrichedRecommendations.length > 0) {
      const { error: insertError } = await supabase
        .from('career_recommendations')
        .insert(enrichedRecommendations);

      if (insertError) {
        console.error('Error saving recommendations:', insertError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        recommendations: enrichedRecommendations 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error generating recommendations:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to generate recommendations' 
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
