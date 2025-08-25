
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDimensionLabel } from '@/utils/testLabels';
import { useLanguage } from '@/hooks/useLanguage';

interface DetailedInterpretationsProps {
  interpretations: {
    [key: string]: string;
  };
  testName?: string;
}

const DetailedInterpretations = ({ interpretations, testName = 'Big Five Personalitate' }: DetailedInterpretationsProps) => {
  const { t } = useLanguage();
  
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
  
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  // Function to detect if a string is a translation key
  const isTranslationKey = (str: string): boolean => {
    return str.includes('.') && str.split('.').length >= 2 && !str.startsWith(str.charAt(0).toUpperCase());
  };

  // Function to translate interpretation text
  const translateInterpretation = (interpretation: string): string => {
    if (isTranslationKey(interpretation)) {
      const translated = t(interpretation);
      // If translation is not found (returns the key itself), try fallback
      return translated !== interpretation ? translated : 'Interpretare indisponibilă';
    }
    return interpretation;
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{getTranslation('testResult.detailedInterpretations.title', 'Interpretări Detaliate')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {validInterpretations.map(([dimension, interpretation]) => (
            <div key={dimension} className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg mb-2 text-blue-700">
                {getDimensionLabel(testName, dimension)}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {translateInterpretation(interpretation)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedInterpretations;
