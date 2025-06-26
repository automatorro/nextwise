
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Question {
  id: string;
  options: any;
  options_en: any;
  question_text_ro: string;
  question_text_en: string;
  test_type_id: string;
}

// Complete DISC test question translations
const DISC_QUESTION_TRANSLATIONS: { [key: string]: string } = {
  'În situații de lucru în echipă, eu sunt cel care:': 'In team work situations, I am the one who:',
  'Când iau decizii importante:': 'When making important decisions:',
  'Sub presiune, eu:': 'Under pressure, I:',
  'În comunicare, eu prefer să:': 'In communication, I prefer to:',
  'Când lucrez la un proiect:': 'When working on a project:',
  'În conflict, eu de obicei:': 'In conflict, I usually:',
  'Mediul meu de lucru ideal ar fi:': 'My ideal work environment would be:',
  'Când îmi stabilesc obiective:': 'When setting my goals:',
  'În timpul liber, eu prefer să:': 'In my free time, I prefer to:',
  'Când învăț ceva nou:': 'When learning something new:',
  'În întâlniri de lucru:': 'In work meetings:',
  'Când planific o vacanță:': 'When planning a vacation:',
  'În situații noi:': 'In new situations:',
  'Când dau feedback altora:': 'When giving feedback to others:',
  'În managementul timpului:': 'In time management:',
  'Când conduc o echipă:': 'When leading a team:',
  'În negocieri:': 'In negotiations:',
  'Când primesc critici:': 'When receiving criticism:',
  'În rezolvarea problemelor:': 'In problem solving:',
  'În ceea ce privește schimbarea:': 'Regarding change:',
  'În delegarea sarcinilor:': 'In delegating tasks:',
  'Când iau riscuri:': 'When taking risks:',
  'În prezentări publice:': 'In public presentations:',
  'În gestionarea stresului:': 'In stress management:',
  'Când lucrez independent:': 'When working independently:',
  'În crearea de relații:': 'In building relationships:',
  'În atingerea obiectivelor:': 'In achieving goals:',
  'Când văd o oportunitate nouă:': 'When I see a new opportunity:'
};

// Complete DISC option translations
const DISC_OPTION_TRANSLATIONS: { [key: string]: string } = {
  'Iau inițiativa și conduc echipa': 'Take initiative and lead the team',
  'Motivez și entuziasmez echipa': 'Motivate and energize the team',
  'Asigur stabilitatea și cooperarea': 'Ensure stability and cooperation',
  'Analizez detaliile și urmăresc calitatea': 'Analyze details and pursue quality',
  'Decid rapid și ferm': 'Decide quickly and firmly',
  'Consult cu alții și caut consensul': 'Consult with others and seek consensus',
  'Iau timp să mă gândesc bine': 'Take time to think carefully',
  'Analizez toate datele disponibile': 'Analyze all available data',
  'Devin mai direct și hotărât': 'Become more direct and decisive',
  'Caut sprijinul celorlalți': 'Seek support from others',
  'Rămân calm și perseverent': 'Stay calm and perseverant',
  'Mă concentrez pe respectarea procedurilor': 'Focus on following procedures',
  'Fiu direct și concis': 'Be direct and concise',
  'Fiu expresiv și prietenos': 'Be expressive and friendly',
  'Ascult cu atenție și empatie': 'Listen carefully and empathetically',
  'Fiu precis și factualizat': 'Be precise and factual',
  'Mă concentrez pe rezultate rapide': 'Focus on quick results',
  'Îmi place să colaborez cu alții': 'I like to collaborate with others',
  'Urmăresc un progres constant': 'Pursue steady progress',
  'Mă asigur că totul este perfect': 'Make sure everything is perfect',
  'Abordez direct problema': 'Address the problem directly',
  'Încerc să găsesc o soluție care să mulțumească pe toți': 'Try to find a solution that satisfies everyone',
  'Evit confrontarea directă': 'Avoid direct confrontation',
  'Prezint faptele obiectiv': 'Present facts objectively',
  'Dinamic și provocator': 'Dynamic and challenging',
  'Social și colaborativ': 'Social and collaborative',
  'Stabil și predictibil': 'Stable and predictable',
  'Organizat și structurat': 'Organized and structured',
  'Îmi place să îmi asum riscuri mari': 'I like to take big risks',
  'Caut obiective care implică lucrul cu oamenii': 'Seek goals that involve working with people',
  'Prefer obiective realiste și realizabile': 'Prefer realistic and achievable goals',
  'Stabilesc standarde înalte de calitate': 'Set high quality standards',
  'Fac sporturi competitive': 'Do competitive sports',
  'Socializez cu prietenii': 'Socialize with friends',
  'Mă relaxez acasă': 'Relax at home',
  'Urmăresc hobby-uri care necesită precizie': 'Pursue hobbies that require precision',
  'Vreau să practic imediat': 'Want to practice immediately',
  'Îmi place să discut cu alții despre subiect': 'I like to discuss with others about the subject',
  'Iau timpul necesar pentru a înțelege bine': 'Take the necessary time to understand well',
  'Studiez toate detaliile înainte de a începe': 'Study all details before starting',
  'Îmi place să conduc discuția': 'I like to lead the discussion',
  'Contribui cu idei creative': 'Contribute creative ideas',
  'Ascult și sprijin ideile altora': 'Listen and support others\' ideas',
  'Pun întrebări despre detalii': 'Ask questions about details',
  'Aleg destinații aventuroase': 'Choose adventurous destinations',
  'Plănuiesc activități sociale': 'Plan social activities',
  'Aleg locuri familiare și confortabile': 'Choose familiar and comfortable places',
  'Cercetez tot în detaliu înainte': 'Research everything in detail beforehand',
  'Mă adaptez rapid și acționez': 'Adapt quickly and act',
  'Caut să cunosc oameni noi': 'Seek to meet new people',
  'Am nevoie de timp pentru adaptare': 'Need time to adapt',
  'Observ și analizez înainte de a acționa': 'Observe and analyze before acting',
  'Sunt direct și la obiect': 'Am direct and to the point',
  'Încerc să fiu pozitiv și încurajator': 'Try to be positive and encouraging',
  'Sunt blând și diplomatic': 'Am gentle and diplomatic',
  'Mă concentrez pe fapte și detalii': 'Focus on facts and details',
  'Mă concentrez pe taskurile importante': 'Focus on important tasks',
  'Îmi fac timp pentru interacțiuni sociale': 'Make time for social interactions',
  'Urmăresc un program regulat': 'Follow a regular schedule',
  'Plănuiesc totul în detaliu': 'Plan everything in detail',
  'Stabilesc obiective clare și măsurabile': 'Set clear and measurable goals',
  'Motivez și inspir echipa': 'Motivate and inspire the team',
  'Creez un mediu de susținere și colaborare': 'Create a supportive and collaborative environment',
  'Mă asigur că procesele sunt urmate corect': 'Ensure processes are followed correctly',
  'Sunt ferm în privința obiectivelor mele': 'Am firm about my objectives',
  'Caut soluții care să mulțumească ambele părți': 'Seek solutions that satisfy both parties',
  'Evit tensiunile și conflict': 'Avoid tensions and conflict',
  'Prezint argumente bazate pe date': 'Present data-based arguments',
  'Le iau ca pe o provocare': 'Take them as a challenge',
  'Mă întreb cum mă percep alții': 'Wonder how others perceive me',
  'Pot fi afectat emoțional': 'Can be emotionally affected',
  'Analizez dacă sunt justificate': 'Analyze if they are justified',
  'Acționez rapid pentru a găsi o soluție': 'Act quickly to find a solution',
  'Caut input de la alții': 'Seek input from others',
  'Urmăresc metode dovedite': 'Follow proven methods',
  'Analizez toate opțiunile disponibile': 'Analyze all available options',
  'O îmbrățișez ca pe o oportunitate': 'Embrace it as an opportunity',
  'Mă entuziasmez de posibilitățile noi': 'Get excited about new possibilities',
  'Am nevoie de timp pentru a mă obișnui': 'Need time to get used to it',
  'Vreau să înțeleg impactul complet': 'Want to understand the complete impact',
  'Dau autonomie completă': 'Give complete autonomy',
  'Ofer sprijin și încurajare': 'Offer support and encouragement',
  'Mă asigur că se simt confortabil': 'Make sure they feel comfortable',
  'Dau instrucțiuni clare și detaliate': 'Give clear and detailed instructions',
  'Sunt dispus să risc mult pentru câștiguri mari': 'Am willing to risk a lot for big gains',
  'Îmi asum riscuri dacă alții mă susțin': 'Take risks if others support me',
  'Prefer să evit riscurile inutile': 'Prefer to avoid unnecessary risks',
  'Calculez toate riscurile înainte': 'Calculate all risks beforehand',
  'Sunt încrezător și direct': 'Am confident and direct',
  'Îmi place să interacționez cu audiența': 'I like to interact with the audience',
  'Prefer grupuri mici și familiare': 'Prefer small and familiar groups',
  'Mă pregătesc foarte bine în avans': 'Prepare very well in advance',
  'Caut provocări noi': 'Seek new challenges',
  'Vorbesc cu prietenii despre probleme': 'Talk with friends about problems',
  'Caut stabilitate și routine': 'Seek stability and routine',
  'Analizez sursele de stres': 'Analyze sources of stress',
  'Îmi stabilesc propriile reguli': 'Set my own rules',
  'Îmi lipsește interacțiunea cu alții': 'Miss interaction with others',
  'Îmi place liniștea și focusul': 'I like quiet and focus',
  'Pot să mă concentrez pe detalii': 'Can concentrate on details',
  'Caut să conduc și să influențez': 'Seek to lead and influence',
  'Îmi place să cunosc mulți oameni': 'I like to meet many people',
  'Prefer relații profunde și de lungă durată': 'Prefer deep and long-lasting relationships',
  'Sunt selectiv în alegerea prietenilor': 'Am selective in choosing friends',
  'Mă concentrez pe rezultate măsurabile': 'Focus on measurable results',
  'Îmi place să celebrez succesele cu alții': 'I like to celebrate successes with others',
  'Progresez constant și perseverent': 'Progress steadily and persistently',
  'Mă asigur că fac totul corect': 'Make sure I do everything correctly',
  'Acționez imediat pentru a o folosi': 'Act immediately to use it',
  'O împărtășesc cu alții cu entuziasm': 'Share it with others enthusiastically',
  'Evaluez cum se potrivește cu planurile mele': 'Evaluate how it fits with my plans',
  'Cercetez toate aspectele înainte de a decide': 'Research all aspects before deciding'
};

// Belbin test translations
const BELBIN_QUESTION_TRANSLATIONS: { [key: string]: string } = {
  'Cred că pot contribui eficient la o echipă pentru că:': 'I believe I can contribute effectively to a team because:',
  'Dacă am o deficiență în lucrul în echipă, aceasta ar putea fi:': 'If I have a shortcoming in teamwork, it might be:',
  'Când sunt implicat într-un proiect cu alte persoane:': 'When I am involved in a project with other people:',
  'Abordarea mea caracteristică a lucrului în grup este:': 'My characteristic approach to group work is:',
  'Obțin satisfacție dintr-o muncă pentru că:': 'I gain satisfaction from a job because:',
  'Dacă brusc mi se dă o sarcină dificilă cu timp limitat și oameni necunoscuți:': 'If I am suddenly given a difficult task with limited time and unfamiliar people:',
  'În ceea ce privește problemele la care mă confrunt când lucrez în grup:': 'With regard to the problems I encounter when working in groups:',
  'În caracterizarea stilului meu de lucru:': 'In characterizing my working style:',
  'Când echipa trebuie să aleagă dintre două opțiuni:': 'When the team needs to choose between two options:'
};

const BELBIN_OPTION_TRANSLATIONS: { [key: string]: string } = {
  'am o natură liniștită': 'I have a quiet nature',
  'sunt obișnuit să mă înțeleg bine cu tot felul de oameni': 'I am used to getting along well with all kinds of people',
  'producerea de idei este unul dintre punctele mele forte': 'producing ideas is one of my strong points',
  'am capacitatea de a-i face pe oameni să vorbească atunci când detectez că au ceva valoros de contribuit': 'I have the ability to get people to talk when I detect they have something valuable to contribute',
  'capacitatea mea de a urma prin lucru cu perseverență ceea ce consider de valoare': 'my ability to follow through with persistence what I consider valuable',
  'sunt pregătit să fiu nepopular temporar dacă acest lucru duce la rezultate valoroase în final': 'I am prepared to be temporarily unpopular if this leads to worthwhile results in the end',
  'de obicei observ și pot profita de noi oportunități': 'I usually notice and can take advantage of new opportunities',
  'pot colabora bine cu oameni care oferă ceva nou': 'I can work well with people who offer something new',
  'am tendința să vorbesc prea mult odată ce grupul abordează idei noi': 'I tend to talk too much once the group gets onto new ideas',
  'obiectivitatea mea îmi face dificil să mă alătur cu entuziasm colegilor': 'my objectivity makes it difficult for me to join in readily with colleagues',
  'uneori sunt văzut ca fiind prea energic și impetuos': 'I am sometimes seen as being too forceful and authoritarian',
  'îmi pare rău să îmi exprim opiniile atunci când există o opoziție puternică împotriva lor': 'I find it difficult to lead from the front, perhaps because I am over-responsive to group atmosphere',
  'am tendința să devin prea prins în idei care îmi vin în minte': 'I tend to get too caught up in ideas that occur to me',
  'colegii mei tind să mă vadă ca fiind prea preocupat de detalii': 'my colleagues tend to see me as worrying unnecessarily over detail',
  'există riscul să nu fiu în stare să comunic entuziasmul pentru propria muncă': 'there is risk that I may not be able to communicate the enthusiasm for my own work',
  'îmi pare greu să încep dacă obiectivele nu sunt clare': 'I find it difficult to get started unless the goals are clear',
  'obișnuiesc să am o influență puternică': 'I usually have a strong influence',
  'promovez ceea ce cred că este corect, fără a considera punctele de vedere ale altora': 'I promote what I believe to be right without considering other viewpoints',
  'am grijă să urmăresc care sunt cele mai noi idei și evoluții': 'I take care to follow up on the latest ideas and developments',
  'cred că toți ceilalți membri ai echipei trebuie să fie consultați înainte de a lua o decizie': 'I believe that all other team members should be consulted before making a decision',
  'mă simt în elementul meu atunci când pot planifica munca în mod sistematic': 'I feel in my element when I can plan work systematically',
  'îmi evit angajamentele de grup dacă pot găsi o modalitate mai bună de a exprima individualitatea': 'I avoid group commitments if I can find a better way to express individuality',
  'îmi folosesc relațiile pentru a promova interesele comune': 'I use my relationships to promote common interests',
  'de obicei pot găsi linia de acțiune care evită extremele': 'I can usually find the line of action that avoids extremes',
  'îmi place să analizez situațiile și să cântăresc toate opțiunile posibile': 'I like to analyze situations and weigh all possible choices',
  'mă interesează să cunosc oameni noi și să învăț lucruri noi': 'I am interested in getting to know new people and learning new things',
  'oamenii se bazează pe mine pentru a pune în aplicare ceea ce trebuie făcut': 'people rely on me to put into practice what needs to be done',
  'pot fi de încredere pentru a vedea că toată munca necesară este organizată': 'I can be relied upon to see that all necessary work is organized',
  'sunt pregătit să fac presiuni pentru acțiune să se asigure că întâlnirea nu este o pierdere de timp': 'I am ready to make pressure for action to ensure the meeting is not a waste of time',
  'pot fi de încredere să contribui cu ceva neobișnuit': 'I can be relied upon to contribute something unusual',
  'mă bazez pe membrii cu experiență din grup pentru sprijin': 'I rely on experienced group members for support',
  'pare că am o capacitate naturală de a preveni certurile': 'I seem to have a natural ability to prevent arguments',
  'de obicei pot fi de încredere să propun ceva creativ': 'I usually can be relied upon to come up with something creative',
  'îmi place să mă retrag într-un fundal și să urmăresc ce se întâmplă': 'I like to withdraw into the background and observe what is happening',
  'sunt fericit să profit de cunoștințele specialiste ale altora': 'I am happy to take advantage of others specialist knowledge',
  'pot acționa ca un fel de liant când oamenii nu se înțeleg': 'I can act as a sort of bridge when people do not get along',
  'de obicei sunt capabil să influențez evenimentele fără să îmi impun autoritatea oficială': 'I usually am able to influence events without imposing my official authority',
  'ceea ce scriu este de obicei scurt și la obiect': 'what I write is usually brief and to the point',
  'mă preocup de aspectele practice mai degrabă decât de urmărirea ideilor în abstract': 'I am concerned with practical aspects rather than pursuing ideas in the abstract',
  'îmi displac pierderea de timp și prefer să mergem direct la subiect': 'I dislike wasting time and prefer to get straight to the point',
  'pot să lucrez cu o varietate mare de oameni': 'I can work with a wide variety of people',
  'îmi rezerv poziția până când toți factorii relevanți sunt cunoscuți': 'I reserve my position until all relevant factors are known',
  'îmi place să fiu activ și să nu stau doar să urmăresc': 'I like to be active and not just sit back and watch',
  'în general sprijin punctele de vedere care au fost bine gândite': 'I generally support views that have been well thought out',
  'nu am nicio ezitare în a contesta punctele de vedere ale altora sau în a fi în minoritate': 'I have no hesitation in challenging the views of others or holding a minority position',
  'de obicei pot găsi un argument pentru a refuta propunerile nesigure': 'I usually can find an argument to refute unsound propositions',
  'cred că este important să avem o structură de întâlnire': 'I believe it is important to have a meeting structure',
  'am tendința să evit evidentul și să vin cu ceva neașteptat': 'I tend to avoid the obvious and come up with something unexpected',
  'aduc o abordare metodică la sarcini și probleme comune': 'I bring a methodical approach to tasks and common problems',
  'îmi place să explorez ideile și posibilitățile noi': 'I like to explore new ideas and possibilities',
  'aduc experiența și cunoștințele practice la probleme': 'I bring experience and practical knowledge to problems',
  'îmi place varietatea și prefer să nu fac același lucru de două ori': 'I like variety and prefer not to do the same thing twice',
  'îmi place să lucrez cu oameni care abordează task-urile în mod energic': 'I like to work with people who approach tasks energetically',
  'am un ochi bun pentru a observa greșelile și omisiunile': 'I have a good eye for spotting mistakes and omissions',
  'pot vedea cum ideile și tehnicile pot fi folosite în situații noi': 'I can see how ideas and techniques can be used in new situations',
  'îmi place să mă simt responsabil pentru vederea că important lucru se întâmplă': 'I like to feel responsible for seeing that important work gets done',
  'pot lucra cu oameni cu condiția să îmi tolereze punctele slabe': 'I can work with people provided they tolerate my weaknesses',
  'de obicei îmi dau seama atunci când cineva într-un grup nu este folosit în mod corespunzător': 'I usually realize when someone in a group is not being used properly',
  'nu ezit să cer acțiuni atunci când simt că grupul nu face progrese': 'I do not hesitate to ask for action when I feel the group is not making progress',
  'îmi place să urmăresc trend-urile actuale': 'I like to keep track of current trends',
  'pot fi de încredere să nu fac greșeli prin neglijență': 'I can be relied upon not to make careless mistakes',
  'îmi rezerv eforturile pentru lucrurile care mă pasionează cu adevărat': 'I reserve my efforts for things I am really passionate about',
  'pot lucra cu majoritatea oamenilor atâta timp cât îmi respect principiile': 'I can work with most people as long as I respect my principles'
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('=== STARTING TRANSLATION FIX PROCESS ===');

    // Get DISC test ID
    const { data: discTest, error: discTestError } = await supabaseClient
      .from('test_types')
      .select('id')
      .eq('name', 'Test DISC')
      .single();

    if (discTestError) {
      console.error('Error finding DISC test:', discTestError);
      throw discTestError;
    }

    console.log('Found DISC test with ID:', discTest.id);

    // Get Belbin test ID
    const { data: belbinTest, error: belbinTestError } = await supabaseClient
      .from('test_types')
      .select('id')
      .eq('name', 'Test Belbin')
      .single();

    if (belbinTestError) {
      console.error('Error finding Belbin test:', belbinTestError);
      console.log('Continuing with DISC only...');
    } else {
      console.log('Found Belbin test with ID:', belbinTest.id);
    }

    let totalFixed = 0;
    let totalErrors = 0;

    // Process DISC questions
    const { data: discQuestions, error: discFetchError } = await supabaseClient
      .from('test_questions')
      .select('id, options, options_en, question_text_ro, question_text_en')
      .eq('test_type_id', discTest.id);

    if (discFetchError) {
      console.error('Error fetching DISC questions:', discFetchError);
      throw discFetchError;
    }

    console.log(`Processing ${discQuestions?.length || 0} DISC questions`);

    for (const question of discQuestions || []) {
      try {
        console.log(`\n=== Processing DISC question ${question.id} ===`);
        console.log('Romanian text:', question.question_text_ro);
        console.log('Current English text:', question.question_text_en);
        
        let needsUpdate = false;
        let updatedData: any = {};

        // Check if question needs translation
        const englishQuestion = DISC_QUESTION_TRANSLATIONS[question.question_text_ro];
        if (englishQuestion && (!question.question_text_en || question.question_text_en === '[Translation needed]')) {
          updatedData.question_text_en = englishQuestion;
          needsUpdate = true;
          console.log('Will translate question to:', englishQuestion);
        }

        // Process options
        if (question.options && Array.isArray(question.options)) {
          const translatedOptions = question.options.map((option: any, index: number) => {
            let optionText = '';
            if (typeof option === 'object' && option.label) {
              optionText = option.label;
            } else if (typeof option === 'string') {
              optionText = option;
            } else {
              optionText = `Option ${index + 1}`;
            }

            const englishOption = DISC_OPTION_TRANSLATIONS[optionText] || optionText;
            
            return {
              value: index,
              label: englishOption,
              dimension: ['D', 'I', 'S', 'C'][index % 4]
            };
          });

          updatedData.options_en = translatedOptions;
          needsUpdate = true;
          console.log('Will update options to:', translatedOptions);
        }

        if (needsUpdate) {
          console.log('Updating question with data:', updatedData);
          
          const { error: updateError } = await supabaseClient
            .from('test_questions')
            .update(updatedData)
            .eq('id', question.id);

          if (updateError) {
            console.error(`Failed to update DISC question ${question.id}:`, updateError);
            totalErrors++;
          } else {
            console.log(`Successfully updated DISC question ${question.id}`);
            totalFixed++;
          }
        } else {
          console.log('Question already translated correctly');
        }
      } catch (error) {
        console.error(`Error processing DISC question ${question.id}:`, error);
        totalErrors++;
      }
    }

    // Process Belbin questions if test exists
    if (belbinTest) {
      const { data: belbinQuestions, error: belbinFetchError } = await supabaseClient
        .from('test_questions')
        .select('id, options, options_en, question_text_ro, question_text_en')
        .eq('test_type_id', belbinTest.id);

      if (belbinFetchError) {
        console.error('Error fetching Belbin questions:', belbinFetchError);
      } else {
        console.log(`Processing ${belbinQuestions?.length || 0} Belbin questions`);

        for (const question of belbinQuestions || []) {
          try {
            console.log(`\n=== Processing Belbin question ${question.id} ===`);
            console.log('Romanian text:', question.question_text_ro);
            console.log('Current English text:', question.question_text_en);
            
            let needsUpdate = false;
            let updatedData: any = {};

            // Check if question needs translation
            const englishQuestion = BELBIN_QUESTION_TRANSLATIONS[question.question_text_ro];
            if (englishQuestion && (!question.question_text_en || question.question_text_en === '[Translation needed]')) {
              updatedData.question_text_en = englishQuestion;
              needsUpdate = true;
              console.log('Will translate question to:', englishQuestion);
            }

            // Process options
            if (question.options && Array.isArray(question.options)) {
              const translatedOptions = question.options.map((option: any, index: number) => {
                let optionText = '';
                if (typeof option === 'object' && option.label) {
                  optionText = option.label;
                } else if (typeof option === 'string') {
                  optionText = option;
                } else {
                  optionText = `Option ${index + 1}`;
                }

                const englishOption = BELBIN_OPTION_TRANSLATIONS[optionText] || optionText;
                
                return {
                  value: index,
                  label: englishOption
                };
              });

              updatedData.options_en = translatedOptions;
              needsUpdate = true;
              console.log('Will update options to:', translatedOptions);
            }

            if (needsUpdate) {
              console.log('Updating question with data:', updatedData);
              
              const { error: updateError } = await supabaseClient
                .from('test_questions')
                .update(updatedData)
                .eq('id', question.id);

              if (updateError) {
                console.error(`Failed to update Belbin question ${question.id}:`, updateError);
                totalErrors++;
              } else {
                console.log(`Successfully updated Belbin question ${question.id}`);
                totalFixed++;
              }
            } else {
              console.log('Question already translated correctly');
            }
          } catch (error) {
            console.error(`Error processing Belbin question ${question.id}:`, error);
            totalErrors++;
          }
        }
      }
    }

    console.log(`\n=== TRANSLATION PROCESS COMPLETED ===`);
    console.log(`Total questions fixed: ${totalFixed}`);
    console.log(`Total errors: ${totalErrors}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Translation fix completed successfully. Fixed ${totalFixed} questions with ${totalErrors} errors.`,
        fixed: totalFixed,
        errors: totalErrors
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('=== FATAL ERROR IN TRANSLATION PROCESS ===');
    console.error('Error details:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        details: 'Check function logs for more information'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
