
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDimensionLabel } from '@/utils/testLabels';
import { translateInterpretation } from '@/utils/testResultTranslations';
import { useLanguage } from '@/hooks/useLanguage';

interface DetailedInterpretationsProps {
  interpretations: {
    [key: string]: string;
  };
  testName?: string;
}

const DetailedInterpretations = ({ interpretations, testName = 'Big Five Personalitate' }: DetailedInterpretationsProps) => {
  const { language } = useLanguage();
  
  // Defensive checks - don't render if no meaningful interpretations
  if (!interpretations || typeof interpretations !== 'object') {
    return null;
  }

  const validInterpretations = Object.entries(interpretations).filter(([_, interpretation]) => 
    interpretation && 
    typeof interpretation === 'string' && 
    interpretation.trim() !== '' &&
    interpretation !== 'Interpretarea nu este disponibilă'
  );

  if (validInterpretations.length === 0) {
    return null;
  }
  
  const labels = {
    title: language === 'en' ? 'Detailed Interpretations' : 'Interpretări Detaliate'
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{labels.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {validInterpretations.map(([dimension, interpretation]) => (
            <div key={dimension} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                {getDimensionLabel(testName, dimension)}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {translateInterpretation(interpretation, language)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedInterpretations;
