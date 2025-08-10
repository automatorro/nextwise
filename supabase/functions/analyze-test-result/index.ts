import { corsHeaders } from '../_shared/cors.ts'

console.log(`Function "analyze-test-result" up and running!`)

Deno.serve(async (req) => {
  // Manevrarea cererilor preflight pentru CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  try {
    const { score, testName } = await req.json()
    
    // Aici va veni logica reală de apel la Gemini API.
    // Deocamdată, folosim un răspuns demonstrativ.
    const prompt = `
      You are an expert career psychologist. Analyze the following test results for a user.
      Test Name: ${testName}
      Scores: ${JSON.stringify(score, null, 2)}

      Provide a detailed, insightful, and encouraging analysis. Structure your response in Markdown format.
      Include the following sections:
      - **Profil General:** A summary of the user's personality or profile based on the scores.
      - **Puncte Forte:** Highlight the key strengths revealed by the test.
      - **Zone de Dezvoltare:** Gently point out areas where the user could improve or be more aware.
      - **Recomandări de Carieră:** Suggest 2-3 career paths or types of roles that would be a good fit, and explain why.
    `;
    
    const aiResponse = `
### Profil General
Acesta este un răspuns demonstrativ de la funcția **analyze-test-result**. Profilul dumneavoastră **${testName}** indică o personalitate complexă.

### Puncte Forte
- **Reziliență:** Scorul ridicat la stabilitate emoțională sugerează că sunteți o persoană calmă.
- **Creativitate:** Deschiderea spre experiențe noi arată o minte curioasă și inovatoare.

### Recomandări de Carieră
1.  **Product Manager**
2.  **UX/UI Designer**
    `;

    return new Response(
      JSON.stringify({ analysis: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})