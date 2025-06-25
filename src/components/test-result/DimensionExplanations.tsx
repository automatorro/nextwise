
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDimensionLabel, isCognitiveAbilitiesTest } from '@/utils/testLabels';

interface DimensionExplanationsProps {
  testName: string;
  dimensions: { [key: string]: number };
}

const DimensionExplanations = ({ testName, dimensions }: DimensionExplanationsProps) => {
  const isCognitive = isCognitiveAbilitiesTest(testName);
  
  const getDimensionExplanation = (dimension: string, score: number): string => {
    if (isCognitive) {
      switch (dimension) {
        case 'verbal':
          if (score >= 80) return 'Excelent în înțelegerea și utilizarea limbajului. Poți lucra eficient cu texte complexe, analogii și concepte verbale.';
          if (score >= 60) return 'Bune abilități verbale. Te descurci bine cu majoritatea sarcinilor care implică limbajul și comunicarea.';
          if (score >= 40) return 'Abilități verbale medii. Ai o înțelegere de bază a limbajului, dar poți îmbunătăți vocabularul și analiza textelor.';
          return 'Abilități verbale sub medie. Recomandăm practicarea lecturii, vocabularului și exercițiilor de analogii.';
          
        case 'numeric':
          if (score >= 80) return 'Excelente abilități numerice. Poți rezolva eficient probleme matematice complexe și calcule.';
          if (score >= 60) return 'Bune abilități numerice. Te descurci bine cu majoritatea calculelor și problemelor matematice.';
          if (score >= 40) return 'Abilități numerice medii. Poți efectua calcule de bază, dar poți îmbunătăți la probleme mai complexe.';
          return 'Abilități numerice sub medie. Recomandăm practicarea calculelor de bază și a problemelor matematice.';
          
        case 'logic':
          if (score >= 80) return 'Excelente abilități de raționament logic. Poți analiza eficient premise și concluzii, identifici erori logice.';
          if (score >= 60) return 'Bune abilități logice. Te descurci bine cu majoritatea problemelor de raționament.';
          if (score >= 40) return 'Abilități logice medii. Înțelegi conceptele de bază, dar poți îmbunătăți la probleme complexe.';
          return 'Abilități logice sub medie. Recomandăm studiul principiilor de logică și exercițiile de raționament.';
          
        case 'spatial':
          if (score >= 80) return 'Excelente abilități spațiale. Poți vizualiza și manipula mental obiecte tridimensionale cu ușurință.';
          if (score >= 60) return 'Bune abilități spațiale. Te descurci bine cu majoritatea sarcinilor vizuale și geometrice.';
          if (score >= 40) return 'Abilități spațiale medii. Ai o înțelegere de bază, dar poți îmbunătăți vizualizarea 3D.';
          return 'Abilități spațiale sub medie. Recomandăm exerciții de vizualizare și geometrie.';
          
        case 'abstract':
          if (score >= 80) return 'Excelente abilități de raționament abstract. Poți identifica modele complexe și relații conceptuale.';
          if (score >= 60) return 'Bune abilități abstracte. Te descurci bine cu identificarea modelelor și conceptelor.';
          if (score >= 40) return 'Abilități abstracte medii. Poți recunoaște modele simple, dar poți îmbunătăți la cele complexe.';
          return 'Abilități abstracte sub medie. Recomandăm exerciții de identificare a modelelor și secvențelor.';
          
        default:
          return 'Dimensiune necunoscută.';
      }
    }
    
    // Default explanations for other test types
    return `Scorul tău pentru ${getDimensionLabel(testName, dimension)}: ${score}%`;
  };

  if (!dimensions || Object.keys(dimensions).length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Explicații Detaliate ale Dimensiunilor</CardTitle>
        <p className="text-sm text-gray-600">
          {isCognitive 
            ? "Interpretarea detaliată a performanței tale pe fiecare dimensiune cognitivă."
            : "Explicații detaliate ale scorurilor obținute pe diferite dimensiuni."
          }
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
