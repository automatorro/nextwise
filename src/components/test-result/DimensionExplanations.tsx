import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDimensionLabel, isCognitiveAbilitiesTest } from '@/utils/testLabels';
import { useLanguage } from '@/hooks/useLanguage';

interface DimensionExplanationsProps {
  testName: string;
  dimensions: { [key: string]: number };
}

const DimensionExplanations = ({ testName, dimensions }: DimensionExplanationsProps) => {
  const { language } = useLanguage();
  const isCognitive = isCognitiveAbilitiesTest(testName);
  const isEnneagramTest = testName.includes('Enneagram');
  const testKey = testName.toLowerCase();

  // Get proper type names for Enneagram
  const getEnneagramTypeName = (key: string) => {
    const typeNames = {
      type1: language === 'en' ? 'The Reformer' : 'Reformatorul',
      type2: language === 'en' ? 'The Helper' : 'Ajutătorul', 
      type3: language === 'en' ? 'The Achiever' : 'Realizatorul',
      type4: language === 'en' ? 'The Individualist' : 'Individualistul',
      type5: language === 'en' ? 'The Investigator' : 'Investigatorul',
      type6: language === 'en' ? 'The Loyalist' : 'Loyalul',
      type7: language === 'en' ? 'The Enthusiast' : 'Entuziastul',
      type8: language === 'en' ? 'The Challenger' : 'Provocatorul',
      type9: language === 'en' ? 'The Peacemaker' : 'Mediatorul'
    };
    return typeNames[key as keyof typeof typeNames] || key;
  };
  
  const getDimensionExplanation = (dimension: string, score: number): string => {
    // Enneagram-specific explanations
    if (isEnneagramTest) {
      const explanations = {
        type1: {
          ro: score >= 15 ? 'Ai o orientare puternică către perfectionism și principii morale. Tinde să fii organizat, responsabil și să ai standarde înalte pentru tine și alții. Poți fi critic și să îți dorești să îmbunătățești constant lumea din jurul tău.'
            : score >= 10 ? 'Ai unele caracteristici ale Reformatorului - apreciezi ordinea și corectitudinea, dar nu în mod extrem. Poți fi conștiincios fără a deveni obsesiv cu perfecțiunea.'
            : score >= 5 ? 'Ai doar câteva trăsături ale Reformatorului. Ocazional îți pasă de ordine și corectitudine, dar nu este o prioritate centrală în personalitatea ta.'
            : 'Reformatorul nu este o parte semnificativă a profilului tău de personalitate. Ești mai puțin preocupat de perfectionism și mai flexibil cu regulile și standardele.',
          en: score >= 15 ? 'You have a strong orientation toward perfectionism and moral principles. You tend to be organized, responsible, and have high standards for yourself and others. You can be critical and desire to constantly improve the world around you.'
            : score >= 10 ? 'You have some Reformer characteristics - you appreciate order and correctness, but not extremely. You can be conscientious without becoming obsessive about perfection.'
            : score >= 5 ? 'You have only a few Reformer traits. You occasionally care about order and correctness, but it\'s not a central priority in your personality.'
            : 'The Reformer is not a significant part of your personality profile. You are less concerned with perfectionism and more flexible with rules and standards.'
        },
        type2: {
          ro: score >= 15 ? 'Ai o orientare puternică către ajutorarea celorlalți și construirea relațiilor. Ești empatic, generos și te concentrezi pe nevoile altora, uneori neglijându-te pe tine. Îți place să fii necesar și apreciat.'
            : score >= 10 ? 'Ai caracteristici moderate ale Ajutătorului - îți pasă de alții și vrei să ajuți, dar menții un echilibru sănătos între nevoile tale și ale celorlalți.'
            : score >= 5 ? 'Ai doar câteva trăsături ale Ajutătorului. Ocazional îți place să ajuți, dar nu este motivația ta principală în relații.'
            : 'Ajutătorul nu este o parte semnificativă a profilului tău. Ești mai puțin motivat de nevoia de a fi util altora și mai concentrat pe propriile obiective.',
          en: score >= 15 ? 'You have a strong orientation toward helping others and building relationships. You are empathetic, generous, and focus on others\' needs, sometimes neglecting yourself. You like to be needed and appreciated.'
            : score >= 10 ? 'You have moderate Helper characteristics - you care about others and want to help, but maintain a healthy balance between your needs and others\'.'
            : score >= 5 ? 'You have only a few Helper traits. You occasionally like to help, but it\'s not your main motivation in relationships.'
            : 'The Helper is not a significant part of your profile. You are less motivated by the need to be useful to others and more focused on your own goals.'
        },
        type3: {
          ro: score >= 15 ? 'Ai o orientare puternică către succes și realizare. Ești ambițios, eficient și te concentrezi pe imagine și performanță. Îți place să fii admirat pentru realizările tale și să îți depășești obiectivele.'
            : score >= 10 ? 'Ai caracteristici moderate ale Realizatorului - îți place să reușești și să performezi, dar nu în mod obsesiv. Poți fi productiv fără a sacrifica alte aspecte ale vieții.'
            : score >= 5 ? 'Ai doar câteva trăsături ale Realizatorului. Ocazional îți dorești să excelezi, dar nu este motivația ta centrală.'
            : 'Realizatorul nu este o parte semnificativă a profilului tău. Ești mai puțin preocupat de succes extern și imagine, preferând alte motivații.',
          en: score >= 15 ? 'You have a strong orientation toward success and achievement. You are ambitious, efficient, and focus on image and performance. You like to be admired for your accomplishments and exceed your goals.'
            : score >= 10 ? 'You have moderate Achiever characteristics - you like to succeed and perform, but not obsessively. You can be productive without sacrificing other aspects of life.'
            : score >= 5 ? 'You have only a few Achiever traits. You occasionally want to excel, but it\'s not your central motivation.'
            : 'The Achiever is not a significant part of your profile. You are less concerned with external success and image, preferring other motivations.'
        },
        type4: {
          ro: score >= 15 ? 'Ai o orientare puternică către autenticitate și unicitate. Ești creativ, introspectiv și te concentrezi pe identitatea personală. Poți fi emoțional intens și să căuți ceea ce lipsește în viața ta.'
            : score >= 10 ? 'Ai caracteristici moderate ale Individualistului - îți valorezi autenticitatea și creativitatea, dar nu în mod dramatic. Poți fi reflexiv fără a deveni melancolic.'
            : score >= 5 ? 'Ai doar câteva trăsături ale Individualistului. Ocazional îți place să te exprimi creativ, dar nu este aspectul central al personalității tale.'
            : 'Individualistul nu este o parte semnificativă a profilului tău. Ești mai puțin preocupat de unicitate și mai confortabil cu conformitatea.',
          en: score >= 15 ? 'You have a strong orientation toward authenticity and uniqueness. You are creative, introspective, and focus on personal identity. You can be emotionally intense and seek what\'s missing in your life.'
            : score >= 10 ? 'You have moderate Individualist characteristics - you value authenticity and creativity, but not dramatically. You can be reflective without becoming melancholic.'
            : score >= 5 ? 'You have only a few Individualist traits. You occasionally like to express yourself creatively, but it\'s not the central aspect of your personality.'
            : 'The Individualist is not a significant part of your profile. You are less concerned with uniqueness and more comfortable with conformity.'
        },
        type5: {
          ro: score >= 15 ? 'Ai o orientare puternică către înțelegere și cunoaștere. Ești observator, analitic și te concentrezi pe competență intelectuală. Îți place să te retragi pentru a procesa informațiile și să îți păstrezi energia.'
            : score >= 10 ? 'Ai caracteristici moderate ale Investigatorului - îți place să înveți și să analizezi, dar nu în mod extremist. Poți fi reflectiv fără a deveni izolat.'
            : score >= 5 ? 'Ai doar câteva trăsături ale Investigatorului. Ocazional îți place să studiezi subiecte în profunzime, dar nu este motivația ta principală.'
            : 'Investigatorul nu este o parte semnificativă a profilului tău. Ești mai puțin interesat de cunoașterea teoretică și mai orientat spre acțiune.',
          en: score >= 15 ? 'You have a strong orientation toward understanding and knowledge. You are observant, analytical, and focus on intellectual competence. You like to withdraw to process information and preserve your energy.'
            : score >= 10 ? 'You have moderate Investigator characteristics - you like to learn and analyze, but not extremely. You can be reflective without becoming isolated.'
            : score >= 5 ? 'You have only a few Investigator traits. You occasionally like to study subjects in depth, but it\'s not your main motivation.'
            : 'The Investigator is not a significant part of your profile. You are less interested in theoretical knowledge and more action-oriented.'
        },
        type6: {
          ro: score >= 15 ? 'Ai o orientare puternică către securitate și loialitate. Ești responsabil, angajat și te concentrezi pe anticiparea problemelor. Poți fi anxios și să cauți ghidare sau să te rebeli împotriva autorității.'
            : score >= 10 ? 'Ai caracteristici moderate ale Loyalului - îți valorezi securitatea și relațiile de încredere, dar nu în mod excesiv. Poți fi prudent fără a deveni paranoic.'
            : score >= 5 ? 'Ai doar câteva trăsături ale Loyalului. Ocazional îți faci griji pentru securitate, dar nu este preocuparea ta centrală.'
            : 'Loyalul nu este o parte semnificativă a profilului tău. Ești mai puțin preocupat de securitate și mai dispus să îți asumi riscuri.',
          en: score >= 15 ? 'You have a strong orientation toward security and loyalty. You are responsible, committed, and focus on anticipating problems. You can be anxious and seek guidance or rebel against authority.'
            : score >= 10 ? 'You have moderate Loyalist characteristics - you value security and trustworthy relationships, but not excessively. You can be prudent without becoming paranoid.'
            : score >= 5 ? 'You have only a few Loyalist traits. You occasionally worry about security, but it\'s not your central concern.'
            : 'The Loyalist is not a significant part of your profile. You are less concerned with security and more willing to take risks.'
        },
        type7: {
          ro: score >= 15 ? 'Ai o orientare puternică către varietate și aventură. Ești optimist, versatil și te concentrezi pe posibilități multiple. Îți place să explorezi opțiuni noi și să eviți limitările sau durerea.'
            : score >= 10 ? 'Ai caracteristici moderate ale Entuziastului - îți place varietatea și experiențele noi, dar poți să te concentrezi când este necesar. Ești optimist fără a evita realitatea.'
            : score >= 5 ? 'Ai doar câteva trăsături ale Entuziastului. Ocazional îți place să explorezi opțiuni noi, dar nu este motivația ta principală.'
            : 'Entuziastul nu este o parte semnificativă a profilului tău. Ești mai puțin interesat de varietate și mai confortabil cu rutina.',
          en: score >= 15 ? 'You have a strong orientation toward variety and adventure. You are optimistic, versatile, and focus on multiple possibilities. You like to explore new options and avoid limitations or pain.'
            : score >= 10 ? 'You have moderate Enthusiast characteristics - you like variety and new experiences, but can focus when needed. You are optimistic without avoiding reality.'
            : score >= 5 ? 'You have only a few Enthusiast traits. You occasionally like to explore new options, but it\'s not your main motivation.'
            : 'The Enthusiast is not a significant part of your profile. You are less interested in variety and more comfortable with routine.'
        },
        type8: {
          ro: score >= 15 ? 'Ai o orientare puternică către control și putere. Ești asertiv, încrezător și te concentrezi pe protejarea ta și a celorlalți. Îți place să fii în control și să lupți pentru justiție.'
            : score >= 10 ? 'Ai caracteristici moderate ale Provocatorului - poți fi asertiv și să îți aperi punctul de vedere, dar nu în mod agresiv. Ești încrezător fără a domina.'
            : score >= 5 ? 'Ai doar câteva trăsături ale Provocatorului. Ocazional poți fi asertiv, dar nu este stilul tău principal de interacțiune.'
            : 'Provocatorul nu este o parte semnificativă a profilului tău. Ești mai puțin interesat de control și mai colaborativ în abordare.',
          en: score >= 15 ? 'You have a strong orientation toward control and power. You are assertive, confident, and focus on protecting yourself and others. You like to be in control and fight for justice.'
            : score >= 10 ? 'You have moderate Challenger characteristics - you can be assertive and defend your point of view, but not aggressively. You are confident without dominating.'
            : score >= 5 ? 'You have only a few Challenger traits. You can occasionally be assertive, but it\'s not your main interaction style.'
            : 'The Challenger is not a significant part of your profile. You are less interested in control and more collaborative in approach.'
        },
        type9: {
          ro: score >= 15 ? 'Ai o orientare puternică către armonie și pace. Ești relaxat, de acord și te concentrezi pe menținerea stabilității. Îți place să eviți conflictele și să menții echilibrul în relații.'
            : score >= 10 ? 'Ai caracteristici moderate ale Mediatorului - îți place pacea și armonia, dar poți să îți exprimi opiniile când este necesar. Ești diplomatic fără a evita problemele.'
            : score >= 5 ? 'Ai doar câteva trăsături ale Mediatorului. Ocazional preferi să eviți conflictele, dar nu este strategia ta principală.'
            : 'Mediatorul nu este o parte semnificativă a profilului tău. Ești mai puțin evitant al conflictelor și mai direct în abordare.',
          en: score >= 15 ? 'You have a strong orientation toward harmony and peace. You are relaxed, agreeable, and focus on maintaining stability. You like to avoid conflicts and maintain balance in relationships.'
            : score >= 10 ? 'You have moderate Peacemaker characteristics - you like peace and harmony, but can express your opinions when needed. You are diplomatic without avoiding problems.'
            : score >= 5 ? 'You have only a few Peacemaker traits. You occasionally prefer to avoid conflicts, but it\'s not your main strategy.'
            : 'The Peacemaker is not a significant part of your profile. You are less conflict-avoidant and more direct in approach.'
        }
      };

      const typeExplanations = explanations[dimension as keyof typeof explanations];
      if (typeExplanations) {
        return typeExplanations[language as keyof typeof typeExplanations];
      }
    }

    // Explicații specifice pentru GAD-7 (corectare critică!)
    if (testKey.includes('gad-7') || testKey.includes('anxietate')) {
      if (language === 'en') {
        if (score >= 71) return 'Your anxiety levels are significantly elevated and may be impacting your daily functioning. Consider seeking support from a mental health professional who can provide appropriate strategies and treatment options.';
        if (score >= 48) return 'You\'re experiencing moderate anxiety symptoms that may benefit from stress management techniques, relaxation exercises, or professional guidance to develop coping strategies.';
        if (score >= 24) return 'You have some anxiety symptoms present. Consider incorporating stress-reduction activities like mindfulness, regular exercise, or talking to someone you trust.';
        return 'Your anxiety levels appear to be minimal, which is positive. Continue maintaining healthy habits that support your mental well-being.';
      } else {
        if (score >= 71) return 'Nivelurile tale de anxietate sunt semnificativ ridicate și pot afecta funcționarea zilnică. Ia în considerare căutarea sprijinului din partea unui profesionist în sănătate mentală care poate oferi strategii și opțiuni de tratament adecvate.';
        if (score >= 48) return 'Experimentezi simptome moderate de anxietate care ar putea beneficia de tehnici de gestionare a stresului, exerciții de relaxare sau îndrumarea profesională pentru dezvoltarea strategiilor de adaptare.';
        if (score >= 24) return 'Ai unele simptome de anxietate prezente. Ia în considerare încorporarea activităților de reducere a stresului cum ar fi mindfulness-ul, exercițiile regulate sau vorbitul cu cineva în care ai încredere.';
        return 'Nivelurile tale de anxietate par să fie minime, ceea ce este pozitiv. Continuă să menții obiceiurile sănătoase care îți susțin bunăstarea mentală.';
      }
    }

    if (isCognitive) {
      const explanations = {
        en: {
          verbal: {
            high: 'Excellent in understanding and using language. You can work efficiently with complex texts, analogies and verbal concepts. This strength can be valuable in careers involving communication, writing, teaching, or analysis.',
            good: 'Good verbal skills. You handle most language and communication tasks well. You can understand complex information and express ideas clearly.',
            average: 'Average verbal skills. You have basic language understanding but can improve vocabulary and text analysis through reading and practice.',
            low: 'Below average verbal skills. Focus on expanding vocabulary, reading comprehension, and practice with analogies and word relationships.'
          },
          numeric: {
            high: 'Excellent numerical skills. You can efficiently solve complex mathematical problems and calculations. This ability is valuable in STEM fields, finance, and analytical roles.',
            good: 'Good numerical skills. You handle most calculations and mathematical problems well and can work with quantitative data effectively.',
            average: 'Average numerical skills. You can perform basic calculations but would benefit from practice with more complex mathematical concepts.',
            low: 'Below average numerical skills. Focus on strengthening basic mathematical concepts and practice with calculations and number relationships.'
          },
          logic: {
            high: 'Excellent logical reasoning skills. You can efficiently analyze premises and conclusions, identify logical errors, and think systematically. This is valuable for problem-solving roles.',
            good: 'Good logical skills. You handle most reasoning problems well and can identify patterns and relationships effectively.',
            average: 'Average logical skills. You understand basic concepts but can improve with practice in systematic thinking and logical analysis.',
            low: 'Below average logical skills. Focus on developing systematic thinking patterns and practice with logical reasoning exercises.'
          },
          spatial: {
            high: 'Excellent spatial skills. You can easily visualize and mentally manipulate three-dimensional objects. This ability is valuable in engineering, architecture, and design fields.',
            good: 'Good spatial skills. You handle most visual and geometric tasks well and can work effectively with spatial relationships.',
            average: 'Average spatial skills. You have basic understanding but can improve 3D visualization through practice and spatial exercises.',
            low: 'Below average spatial skills. Focus on developing visualization abilities through practice with geometric shapes and spatial relationships.'
          },
          abstract: {
            high: 'Excellent abstract reasoning skills. You can identify complex patterns and conceptual relationships easily. This ability supports innovation and creative problem-solving.',
            good: 'Good abstract skills. You can identify patterns and work with conceptual relationships effectively in most situations.',
            average: 'Average abstract skills. You can recognize simple patterns but would benefit from practice with more complex conceptual relationships.',
            low: 'Below average abstract skills. Focus on pattern recognition exercises and practice identifying relationships between concepts.'
          }
        },
        ro: {
          verbal: {
            high: 'Excelent în înțelegerea și utilizarea limbajului. Poți lucra eficient cu texte complexe, analogii și concepte verbale. Această abilitate poate fi valoroasă în cariere care implică comunicare, scriere, predare sau analiză.',
            good: 'Bune abilități verbale. Te descurci bine cu majoritatea sarcinilor de limbaj și comunicare. Poți înțelege informații complexe și exprima idei clar.',
            average: 'Abilități verbale medii. Ai o înțelegere de bază a limbajului, dar poți îmbunătăți vocabularul și analiza textelor prin lectură și practică.',
            low: 'Abilități verbale sub medie. Concentrează-te pe extinderea vocabularului, înțelegerea textelor și practica cu analogii și relații între cuvinte.'
          },
          numeric: {
            high: 'Excelente abilități numerice. Poți rezolva eficient probleme matematice complexe și calcule. Această abilitate este valoroasă în domenii STEM, finanțe și roluri analitice.',
            good: 'Bune abilități numerice. Te descurci bine cu majoritatea calculelor și problemelor matematice și poți lucra eficient cu date cantitative.',
            average: 'Abilități numerice medii. Poți efectua calcule de bază, dar ai beneficia de practică cu concepte matematice mai complexe.',
            low: 'Abilități numerice sub medie. Concentrează-te pe consolidarea conceptelor matematice de bază și practica cu calcule și relații numerice.'
          },
          logic: {
            high: 'Excelente abilități de raționament logic. Poți analiza eficient premise și concluzii, identifica erori logice și gândi sistematic. Aceasta este valoroasă pentru roluri de rezolvare a problemelor.',
            good: 'Bune abilități logice. Te descurci bine cu majoritatea problemelor de raționament și poți identifica modele și relații eficient.',
            average: 'Abilități logice medii. Înțelegi conceptele de bază, dar poți îmbunătăți cu practică în gândirea sistematică și analiza logică.',
            low: 'Abilități logice sub medie. Concentrează-te pe dezvoltarea modelelor de gândire sistematică și practica cu exerciții de raționament logic.'
          },
          spatial: {
            high: 'Excelente abilități spațiale. Poți vizualiza și manipula mental obiecte tridimensionale cu ușurință. Această abilitate este valoroasă în inginerie, arhitectură și design.',
            good: 'Bune abilități spațiale. Te descurci bine cu majoritatea sarcinilor vizuale și geometrice și poți lucra eficient cu relații spațiale.',
            average: 'Abilități spațiale medii. Ai o înțelegere de bază, dar poți îmbunătăți vizualizarea 3D prin practică și exerciții spațiale.',
            low: 'Abilități spațiale sub medie. Concentrează-te pe dezvoltarea abilităților de vizualizare prin practica cu forme geometrice și relații spațiale.'
          },
          abstract: {
            high: 'Excelente abilități de raționament abstract. Poți identifica cu ușurință modele complexe și relații conceptuale. Această abilitate susține inovația și rezolvarea creativă a problemelor.',
            good: 'Bune abilități abstracte. Poți identifica modele și lucra eficient cu relații conceptuale în majoritatea situațiilor.',
            average: 'Abilități abstracte medii. Poți recunoaște modele simple, dar ai beneficia de practică cu relații conceptuale mai complexe.',
            low: 'Abilități abstracte sub medie. Concentrează-te pe exerciții de recunoaștere a modelelor și practica identificării relațiilor între concepte.'
          }
        }
      };

      const langExplanations = explanations[language];
      const dimExplanations = langExplanations[dimension as keyof typeof langExplanations];
      
      if (dimExplanations) {
        if (score >= 80) return dimExplanations.high;
        if (score >= 60) return dimExplanations.good;
        if (score >= 40) return dimExplanations.average;
        return dimExplanations.low;
      }
    }
    
    // Default explanations for other test types
    return language === 'en' 
      ? `Your score for ${getDimensionLabel(testName, dimension)}: ${score}%. This represents your performance on this specific dimension of the test.`
      : `Scorul tău pentru ${getDimensionLabel(testName, dimension)}: ${score}%. Aceasta reprezintă performanța ta pe această dimensiune specifică a testului.`;
  };

  if (!dimensions || Object.keys(dimensions).length === 0) {
    return null;
  }

  const labels = {
    title: language === 'en' ? 'Detailed Dimension Explanations' : 'Explicații Detaliate ale Dimensiunilor',
    description: isCognitive 
      ? (language === 'en' 
        ? "Detailed interpretation of your performance on each cognitive dimension with specific recommendations."
        : "Interpretarea detaliată a performanței tale pe fiecare dimensiune cognitivă cu recomandări specifice.")
      : isEnneagramTest
        ? (language === 'en'
          ? "Detailed explanations of your scores on each Enneagram type with specific insights about your personality patterns."
          : "Explicații detaliate ale scorurilor tale pe fiecare tip Enneagram cu insight-uri specifice despre tiparele tale de personalitate.")
        : (language === 'en'
          ? "Detailed explanations of the scores obtained on different dimensions with actionable insights."
          : "Explicații detaliate ale scorurilor obținute pe diferite dimensiuni cu perspective practice.")
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{labels.title}</CardTitle>
        <p className="text-sm text-gray-600">
          {labels.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(dimensions).map(([dimension, score]) => (
            <div key={dimension} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                {isEnneagramTest 
                  ? `${getEnneagramTypeName(dimension)} - ${score} ${language === 'en' ? 'points' : 'puncte'}`
                  : `${getDimensionLabel(testName, dimension)} - ${score}%`
                }
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {getDimensionExplanation(dimension, score)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionExplanations;
