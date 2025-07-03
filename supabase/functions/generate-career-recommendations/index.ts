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
    const { userId } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
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

    if (!testResults || testResults.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          recommendations: [
            {
              user_id: userId,
              recommendation_type: 'test',
              title: 'Completează primul test de personalitate',
              description: 'Pentru a primi recomandări personalizate, completează testul Big Five pentru a-ți înțelege mai bine personalitatea și preferințele profesionale.',
              action_text: 'Fă testul Big Five',
              priority: 5
            }
          ]
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze test results for recommendations
    const bigFiveResult = testResults.find(r => 
      r.test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    );

    let personalityAnalysis = '';
    if (bigFiveResult?.score?.dimensions) {
      const dims = bigFiveResult.score.dimensions;
      personalityAnalysis = `
        Analiză Big Five:
        - Deschidere: ${dims.openness}/100
        - Conștiinciozitate: ${dims.conscientiousness}/100  
        - Extraversiune: ${dims.extraversion}/100
        - Amabilitate: ${dims.agreeableness}/100
        - Nevroza: ${dims.neuroticism}/100
      `;
    }

    let analysisPrompt = `
      Pe baza următorului profil al utilizatorului, generează 3-5 recomandări personalizate pentru carieră cu RESURSE GRATUITE REALE:
      
      Rezultatele testelor:
      ${testResults.map(r => `- ${r.test_types?.name}: Scor ${JSON.stringify(r.score)}`).join('\n')}
      
      ${personalityAnalysis}
      
      Planuri de carieră existente: ${careerPlans?.map(p => p.title).join(', ') || 'Niciunul'}
      
      Recomandări existente (evită duplicatele): ${existingRecs?.map(r => r.title).join(', ') || 'Niciunul'}
      
      IMPORTANT: Pentru fiecare recomandare, include RESURSE GRATUITE cu linkuri REALE către:
      - Coursera (cursuri gratuite cu audit)
      - edX (cursuri MIT, Harvard gratuite)
      - Khan Academy 
      - YouTube (canale educaționale specifice)
      - LinkedIn Learning (trial gratuit)
      - Teste gratuite (16personalities, VIA Character Survey)
      - Cărți PDF gratuite
      
      Formatează ca array JSON (DOAR JSON, fără alte explicații):
      [
        {
          "recommendation_type": "skill|path|test|course|certification",
          "title": "Titlu scurt și atractiv",
          "description": "De ce este recomandată pe baza profilului lor (2-3 propoziții concrete)",
          "action_text": "Text pentru buton (ex: 'Înscrie-te gratuit', 'Fă testul acum')",
          "action_type": "external_link",
          "action_data": {
            "url": "https://link-real-către-resursa-gratuită",
            "estimatedHours": 5-20,
            "difficulty": "beginner|intermediate|advanced"
          },
          "category": "skill_development|assessment|networking|certification",
          "priority": 1-5,
          "estimated_time_minutes": 60-300
        }
      ]
      
      Exemplu de linkuri reale:
      - https://www.coursera.org/learn/leadership-introduction (Leadership gratuit)
      - https://www.16personalities.com/ (Test MBTI gratuit)
      - https://www.edx.org/course/introduction-to-project-management (Project Management MIT)
      - https://www.youtube.com/c/CrashCourse (YouTube educațional)
      - https://www.khanacademy.org/ (Competențe fundamentale)
      
      Fii specific și practic. Linkurile TREBUIE să fie funcționale.
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
              text: analysisPrompt
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

    let recommendations = [];
    try {
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      // Fallback recommendations based on Big Five results
      if (bigFiveResult?.score?.dimensions) {
        const dims = bigFiveResult.score.dimensions;
        
        if (dims.openness > 70) {
          recommendations.push({
            recommendation_type: 'course',
            title: 'Explorează tehnologii noi cu MIT',
            description: 'Deschiderea ta ridicată sugerează că ai avea succes în învățarea de tehnologii inovatoare. Acest curs MIT te introduce în noile paradigme tehnologice.',
            action_text: 'Începe cursul MIT gratuit',
            action_type: 'external_link',
            action_data: {
              url: 'https://www.edx.org/course/introduction-to-computer-science-and-programming-7',
              estimatedHours: 15,
              difficulty: 'intermediate'
            },
            category: 'skill_development',
            priority: 4,
            estimated_time_minutes: 180
          });
        }
        
        if (dims.conscientiousness > 70) {
          recommendations.push({
            recommendation_type: 'certification',
            title: 'Google Project Management Certificate',
            description: 'Conștiinciozitatea ta ridicată te va ajuta să completezi cu succes acest program de certificare Google. Ideal pentru management și organizare.',
            action_text: 'Înscrie-te gratuit la Google',
            action_type: 'external_link',
            action_data: {
              url: 'https://www.coursera.org/professional-certificates/google-project-management',
              estimatedHours: 180,
              difficulty: 'intermediate'
            },
            category: 'certification',
            priority: 5,
            estimated_time_minutes: 300
          });
        }
        
        if (dims.extraversion > 70) {
          recommendations.push({
            recommendation_type: 'course',
            title: 'Leadership și Management - Stanford',
            description: 'Extraversiunea ta ridicată indică potențial pentru roluri manageriale. Acest curs Stanford te va pregăti pentru pozițiile de conducere.',
            action_text: 'Începe cursul Stanford',
            action_type: 'external_link',
            action_data: {
              url: 'https://www.coursera.org/learn/leadership-introduction',
              estimatedHours: 12,
              difficulty: 'intermediate'
            },
            category: 'skill_development',
            priority: 4,
            estimated_time_minutes: 180
          });
        } else if (dims.extraversion < 40) {
          recommendations.push({
            recommendation_type: 'course',
            title: 'Deep Learning Specialization',
            description: 'Introversiunea ta poate fi un avantaj în roluri tehnice care necesită concentrare profundă. Acest curs Andrew Ng te va specializa în AI.',
            action_text: 'Începe cursul Andrew Ng',
            action_type: 'external_link',
            action_data: {
              url: 'https://www.coursera.org/specializations/deep-learning',
              estimatedHours: 60,
              difficulty: 'advanced'
            },
            category: 'skill_development',
            priority: 4,
            estimated_time_minutes: 240
          });
        }
      }
      
      // Default fallback with real resources
      if (recommendations.length === 0) {
        recommendations = [
          {
            recommendation_type: 'test',
            title: 'Myers-Briggs Type Indicator (MBTI)',
            description: 'Descoperă tipul tău de personalitate pentru a-ți alinia cariera cu punctele forte naturale. Acest test gratuit îți va oferi insight-uri valoroase.',
            action_text: 'Fă testul MBTI gratuit',
            action_type: 'external_link',
            action_data: {
              url: 'https://www.16personalities.com/',
              estimatedHours: 1,
              difficulty: 'beginner'
            },
            category: 'assessment',
            priority: 5,
            estimated_time_minutes: 15
          },
          {
            recommendation_type: 'course',
            title: 'Competențe de comunicare - Harvard',
            description: 'Competențele de comunicare sunt esențiale în orice carieră. Acest curs Harvard te va ajuta să devii un comunicator mai eficient.',
            action_text: 'Înscrie-te gratuit la Harvard',
            action_type: 'external_link',
            action_data: {
              url: 'https://www.edx.org/course/introduction-to-communication-science',
              estimatedHours: 8,
              difficulty: 'beginner'
            },
            category: 'skill_development',
            priority: 4,
            estimated_time_minutes: 120
          },
          {
            recommendation_type: 'course',
            title: 'Project Management Fundamentals',
            description: 'Învață fundamentele managementului de proiect pentru a-ți îmbunătăți capacitatea de organizare și leadership.',
            action_text: 'Începe cursul gratuit',
            action_type: 'external_link',
            action_data: {
              url: 'https://www.coursera.org/learn/project-management',
              estimatedHours: 15,
              difficulty: 'intermediate'
            },
            category: 'skill_development',
            priority: 3,
            estimated_time_minutes: 180
          }
        ];
      }
    }

    // Add user_id and test_ids to each recommendation
    const enrichedRecommendations = recommendations.map((rec: any) => ({
      ...rec,
      user_id: userId,
      based_on_test_ids: testResults.map(r => r.id)
    }));

    // Save recommendations to database
    const { error: insertError } = await supabase
      .from('career_recommendations')
      .insert(enrichedRecommendations);

    if (insertError) {
      console.error('Error saving recommendations:', insertError);
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