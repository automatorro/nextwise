import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from 'npm:@google/generative-ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY')!);

// Creează prompt-uri specializate pentru fiecare tip de test
const createPromptForTestType = (testName: string, testType: string, scoreData: any) => {
  const basePrompt = `**Rol și Obiectiv:** Ești un psiholog expert în consiliere vocațională și un coach de carieră, cu o atitudine empatică, încurajatoare și extrem de analitică. Scopul tău este să oferi utilizatorului o analiză profundă și personalizată a rezultatelor testului psihometric, scrisă în limba română.`;

  if (testType === 'scale') {
    return `${basePrompt}

**Context:** Utilizatorul tocmai a finalizat testul clinic "${testName}". Rezultatele sale sunt:
- Scor brut: ${scoreData.raw_score || 'N/A'}
- Scor maxim: ${scoreData.max_score || 'N/A'}  
- Nivel: ${scoreData.scale_level || 'N/A'}
- Interpretare: ${scoreData.interpretation || 'N/A'}

**Sarcină:** Generează o analiză detaliată, formatată în Markdown, care să includă OBLIGATORIU următoarele secțiuni:

### Interpretare Clinică
(Explică semnificația scorului obținut într-un mod empatic și accesibil. Oferă context despre ce înseamnă rezultatul în termeni practici, fără diagnostice medicale.)

### Înțelegerea Rezultatelor  
(Descrie cum se interpretează acest scor în raport cu populația generală și ce implicații poate avea pentru viața de zi cu zi.)

### Recomandări și Pași Următori
(Oferă sugestii constructive pentru gestionarea aspectelor identificate, resurse de ajutor și când să se solicite sprijin profesional suplimentar.)

Folosește un ton de susținere, evită limbajul medical tehnic și concentrează-te pe înțelegere și direcții constructive.`;

  } else if (testType === 'dimensional') {
    return `${basePrompt}

**Context:** Utilizatorul tocmai a finalizat testul de personalitate "${testName}". Rezultatele sale (scorurile sunt pe o scală de la 1 la 10) sunt:
${JSON.stringify(scoreData.dimensions, null, 2)}

**Sarcină:** Generează o analiză detaliată, formatată în Markdown, care să includă OBLIGATORIU următoarele secțiuni:

### Profil General
(Oferă un paragraf de sumar care descrie personalitatea utilizatorului pe baza celor mai relevante scoruri. Creează o imagine de ansamblu coerentă.)

### Puncte Forte Detaliate
(Identifică 3-4 dintre cele mai puternice trăsături indicate de scorurile mari. Pentru FIECARE punct forte, explică ce înseamnă în practică și cum se poate manifesta pozitiv în mediul profesional.)

### Zone de Conștientizare și Dezvoltare
(Identifică 2-3 dintre cele mai relevante trăsături indicate de scorurile mici. Abordează-le constructiv, ca oportunități de creștere, cu sfaturi practice pentru echilibrare.)

### Recomandări de Carieră Personalizate
(Sugerează 3-4 roluri sau domenii de carieră specifice care se potrivesc cu punctele forte identificate, explicând DE CE se potrivesc.)`;

  } else if (testType === 'profile') {
    return `${basePrompt}

**Context:** Utilizatorul tocmai a finalizat testul de stil comportamental "${testName}". Rezultatele sale sunt:
- Profil dominant: ${scoreData.dominant_profile || 'N/A'}
- Detalii: ${JSON.stringify(scoreData.profile_details, null, 2)}

**Sarcină:** Generează o analiză detaliată, formatată în Markdown, care să includă OBLIGATORIU următoarele secțiuni:

### Profilul Tău Dominant
(Explică detailat profilul identificat și caracteristicile principale, cum se manifestă în practică.)

### Puncte Forte și Talente Naturale  
(Identifică abilitățile și preferințele naturale, cum să îți valorifici aceste puncte forte.)

### Stilul de Lucru și Comunicare
(Descrie cum preferi să lucrezi și să comunici, sfaturi pentru colaborarea eficientă.)

### Oportunități de Carieră
(Sugerează roluri și medii de lucru potrivite pentru profilul tău, industrii și poziții care valorifică stilul tău natural.)`;
  }

  return `${basePrompt}

**Context:** Rezultatele testului "${testName}":
${JSON.stringify(scoreData, null, 2)}

**Sarcină:** Generează o analiză generală detaliată a rezultatelor în format Markdown.`;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const requestData = await req.json();
    const { testName, testType, ...scoreData } = requestData;
    
    if (!testName || !testType) {
      throw new Error('Lipsesc datele testului (nume sau tip).');
    }

    console.log(`Analyzing ${testType} test: ${testName}`);
    const prompt = createPromptForTestType(testName, testType, scoreData);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
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