
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { simulationType, language = 'ro' } = await req.json()

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    // Define initial messages for different languages
    const initialMessages = {
      ro: {
        job_interview: "Bună ziua! Sunt recrutorul dumneavoastră pentru această simulare de interviu. Să începem cu o prezentare scurtă despre dumneavoastră și motivația pentru această poziție.",
        salary_negotiation: "Bună! Sunt managerul de HR. Am fost impresionat de performanța dumneavoastră și aș vrea să discutăm despre o ajustare salarială. Care sunt așteptările dumneavoastră?",
        team_conflict: "Salut! Am observat niște tensiuni în echipă recent. Cum vedeți situația și ce soluții aveți în vedere pentru a îmbunătăți colaborarea?",
        management_promotion: "Bună! Poziția de manager devine disponibilă și credem că ați putea fi un candidat potrivit. Cum vă vedeți în rolul de lider al echipei?"
      },
      en: {
        job_interview: "Good morning! I'm your recruiter for this interview simulation. Let's start with a brief introduction about yourself and your motivation for this position.",
        salary_negotiation: "Hello! I'm the HR manager. I've been impressed with your performance and would like to discuss a salary adjustment. What are your expectations?",
        team_conflict: "Hi! I've noticed some tensions in the team recently. How do you see the situation and what solutions do you have in mind to improve collaboration?",
        management_promotion: "Hello! The manager position is becoming available and we think you could be a suitable candidate. How do you see yourself in the team leader role?"
      }
    }

    // Get the appropriate initial message
    const initialMessage = initialMessages[language as 'ro' | 'en']?.[simulationType] || 
                           initialMessages.ro[simulationType]

    const { data: simulation, error } = await supabase
      .from('ai_simulations')
      .insert({
        user_id: user.id,
        simulation_type: simulationType,
        conversation_log: [
          {
            role: 'assistant',
            content: initialMessage,
            timestamp: new Date().toISOString()
          }
        ],
        user_responses: []
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw error
    }

    console.log(`Started ${simulationType} simulation`)

    return new Response(JSON.stringify(simulation), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error starting simulation:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
