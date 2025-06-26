
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
  const testKey = testName.toLowerCase();
  
  const getDimensionExplanation = (dimension: string, score: number): string => {
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

    // Explicații pentru teste cognitive
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
                {getDimensionLabel(testName, dimension)} - {score}%
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
