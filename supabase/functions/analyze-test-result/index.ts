// supabase/functions/analyze-test-result/index.ts

console.log(`Function "analyze-test-result" up and running!`);

// Setările CORS sunt acum definite direct aici, eliminând dependențele externe.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Manevrarea cererilor de permisiune (preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const { score, testName } = await req.json();
    
    // Verificare minimă a datelor primite
    if (!score || !testName) {
      throw new Error('Lipsesc datele testului (scor sau nume).');
    }

    // Aici va veni logica reală de apel la Gemini API.
    // Deocamdată, folosim un răspuns demonstrativ pentru a testa conexiunea.
    const aiResponse = `
### Profil General
Acesta este un răspuns demonstrativ de la funcția **analyze-test-result**. Conexiunea a funcționat! Profilul dumneavoastră **${testName}** indică o personalitate complexă și echilibrată.

### Puncte Forte
- **Reziliență:** Scorul ridicat la stabilitate emoțională sugerează că sunteți o persoană calmă, capabilă să gestioneze stresul eficient.
- **Creativitate:** Deschiderea spre experiențe noi arată o minte curioasă, dornică să exploreze idei noi și abordări neconvenționale.

### Recomandări de Carieră
1.  **Product Manager:** Datorită echilibrului excelent între creativitate și gândire analitică.
2.  **Consultant în Management:** Abilitatea de a înțelege sisteme complexe și de a oferi soluții inovatoare este un atu major.
    `;

    return new Response(
      JSON.stringify({ analysis: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Server Error in analyze-test-result:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      // Folosim 500 pentru erori interne neașteptate
      status: 500, 
    });
  }
});