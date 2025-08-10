import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from 'npm:@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Această linie va căuta cheia API pe care ai verificat-o la Pasul A
const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY')!);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const { testName, dimensions } = await req.json();
    
    if (!testName || !dimensions) {
      throw new Error('Lipsesc datele testului (nume sau dimensiuni).');
    }

    const prompt = `
      **Rol și Obiectiv:** Ești un psiholog expert în consiliere vocațională și un coach de carieră, cu o atitudine empatică, încurajatoare și extrem de analitică. Scopul tău este să oferi utilizatorului o analiză profundă și personalizată a rezultatelor testului psihometric, scrisă în limba română.

      **Context:** Utilizatorul tocmai a finalizat testul de personalitate "${testName}". Rezultatele sale (scorurile sunt pe o scală de la 1 la 10) sunt:
      ${JSON.stringify(dimensions, null, 2)}

      **Sarcină:** Generează o analiză detaliată, formatată în Markdown, care să includă OBLIGATORIU următoarele secțiuni, exact cu aceste titluri:

      ### Profil General
      (Oferă un paragraf de sumar care descrie personalitatea utilizatorului pe baza celor mai relevante scoruri, cele mai mari și cele mai mici. Creează o imagine de ansamblu coerentă.)

      ### Puncte Forte Detaliate
      (Identifică 3-4 dintre cele mai puternice trăsături indicate de scorurile mari. Pentru FIECARE punct forte, scrie un paragraf separat în care explici ce înseamnă acea trăsătură în practică și cum se poate manifesta pozitiv în mediul profesional.)

      ### Zone de Conștientizare și Dezvoltare
      (Identifică 2-3 dintre cele mai relevante trăsături indicate de scorurile mici. Abordează-le cu o atitudine constructivă, nu ca pe niște defecte. Pentru FIECARE, scrie un paragraf separat în care explici cum s-ar putea manifesta aceste tendințe și oferă un sfat concret, practic, pentru echilibrare sau dezvoltare.)

      ### Recomandări de Carieră Personalizate
      (Pe baza întregului profil, sugerează 3-4 roluri sau domenii de carieră specifice care se potrivesc foarte bine cu punctele forte identificate. Pentru FIECARE recomandare, explică pe scurt DE CE se potrivește, legând-o direct de o trăsătură specifică din test.)
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const generationConfig = { temperature: 0.7, maxOutputTokens: 2048 };
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });
    
    const aiResponse = result.response.text();

    return new Response(JSON.stringify({ analysis: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Server Error in analyze-test-result:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500, 
    });
  }
});