
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
  
  const getDimensionExplanation = (dimension: string, score: number): string => {
    if (isCognitive) {
      const explanations = {
        en: {
          verbal: {
            high: 'Excellent in understanding and using language. You can work efficiently with complex texts, analogies and verbal concepts.',
            good: 'Good verbal skills. You handle most language and communication tasks well.',
            average: 'Average verbal skills. You have basic language understanding but can improve vocabulary and text analysis.',
            low: 'Below average verbal skills. We recommend practicing reading, vocabulary and analogy exercises.'
          },
          numeric: {
            high: 'Excellent numerical skills. You can efficiently solve complex mathematical problems and calculations.',
            good: 'Good numerical skills. You handle most calculations and mathematical problems well.',
            average: 'Average numerical skills. You can perform basic calculations but can improve with complex problems.',
            low: 'Below average numerical skills. We recommend practicing basic calculations and mathematical problems.'
          },
          logic: {
            high: 'Excellent logical reasoning skills. You can efficiently analyze premises and conclusions, identify logical errors.',
            good: 'Good logical skills. You handle most reasoning problems well.',
            average: 'Average logical skills. You understand basic concepts but can improve with complex problems.',
            low: 'Below average logical skills. We recommend studying logic principles and reasoning exercises.'
          },
          spatial: {
            high: 'Excellent spatial skills. You can easily visualize and mentally manipulate three-dimensional objects.',
            good: 'Good spatial skills. You handle most visual and geometric tasks well.',
            average: 'Average spatial skills. You have basic understanding but can improve 3D visualization.',
            low: 'Below average spatial skills. We recommend visualization and geometry exercises.'
          },
          abstract: {
            high: 'Excellent abstract reasoning skills. You can identify complex patterns and conceptual relationships.',
            good: 'Good abstract skills. You handle pattern identification and concepts well.',
            average: 'Average abstract skills. You can recognize simple patterns but can improve with complex ones.',
            low: 'Below average abstract skills. We recommend pattern identification and sequence exercises.'
          }
        },
        ro: {
          verbal: {
            high: 'Excelent în înțelegerea și utilizarea limbajului. Poți lucra eficient cu texte complexe, analogii și concepte verbale.',
            good: 'Bune abilități verbale. Te descurci bine cu majoritatea sarcinilor care implică limbajul și comunicarea.',
            average: 'Abilități verbale medii. Ai o înțelegere de bază a limbajului, dar poți îmbunătăți vocabularul și analiza textelor.',
            low: 'Abilități verbale sub medie. Recomandăm practicarea lecturii, vocabularului și exercițiilor de analogii.'
          },
          numeric: {
            high: 'Excelente abilități numerice. Poți rezolva eficient probleme matematice complexe și calcule.',
            good: 'Bune abilități numerice. Te descurci bine cu majoritatea calculelor și problemelor matematice.',
            average: 'Abilități numerice medii. Poți efectua calcule de bază, dar poți îmbunătăți la probleme mai complexe.',
            low: 'Abilități numerice sub medie. Recomandăm practicarea calculelor de bază și a problemelor matematice.'
          },
          logic: {
            high: 'Excelente abilități de raționament logic. Poți analiza eficient premise și concluzii, identifici erori logice.',
            good: 'Bune abilități logice. Te descurci bine cu majoritatea problemelor de raționament.',
            average: 'Abilități logice medii. Înțelegi conceptele de bază, dar poți îmbunătăți la probleme complexe.',
            low: 'Abilități logice sub medie. Recomandăm studiul principiilor de logică și exercițiile de raționament.'
          },
          spatial: {
            high: 'Excelente abilități spațiale. Poți vizualiza și manipula mental obiecte tridimensionale cu ușurință.',
            good: 'Bune abilități spațiale. Te descurci bine cu majoritatea sarcinilor vizuale și geometrice.',
            average: 'Abilități spațiale medii. Ai o înțelegere de bază, dar poți îmbunătăți vizualizarea 3D.',
            low: 'Abilități spațiale sub medie. Recomandăm exerciții de vizualizare și geometrie.'
          },
          abstract: {
            high: 'Excelente abilități de raționament abstract. Poți identifica modele complexe și relații conceptuale.',
            good: 'Bune abilități abstracte. Te descurci bine cu identificarea modelelor și conceptelor.',
            average: 'Abilități abstracte medii. Poți recunoaște modele simple, dar poți îmbunătăți la cele complexe.',
            low: 'Abilități abstracte sub medie. Recomandăm exerciții de identificare a modelelor și secvențelor.'
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
      ? `Your score for ${getDimensionLabel(testName, dimension)}: ${score}%`
      : `Scorul tău pentru ${getDimensionLabel(testName, dimension)}: ${score}%`;
  };

  if (!dimensions || Object.keys(dimensions).length === 0) {
    return null;
  }

  const labels = {
    title: language === 'en' ? 'Detailed Dimension Explanations' : 'Explicații Detaliate ale Dimensiunilor',
    description: isCognitive 
      ? (language === 'en' 
        ? "Detailed interpretation of your performance on each cognitive dimension."
        : "Interpretarea detaliată a performanței tale pe fiecare dimensiune cognitivă.")
      : (language === 'en'
        ? "Detailed explanations of the scores obtained on different dimensions."
        : "Explicații detaliate ale scorurilor obținute pe diferite dimensiuni.")
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
