
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getEnneagramTypeDescription } from '@/utils/testCalculations/enneagramCalculation';

interface EnneagramExplanationProps {
  score: any;
  language: string;
}

const EnneagramExplanation: React.FC<EnneagramExplanationProps> = ({ score, language }) => {
  console.log('EnneagramExplanation score:', score);
  
  // Safely extract dimensions from score
  const dimensions = score?.dimensions || {};
  const hasValidDimensions = Object.keys(dimensions).length > 0;
  
  if (!hasValidDimensions) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Enneagram Test' : 'Testul Enneagram'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'The Enneagram test results are being processed...'
              : 'Rezultatele testului Enneagram sunt în procesare...'}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Find the dominant type
  const dominantType = Object.entries(dimensions).reduce((a, b) => 
    dimensions[a[0]] > dimensions[b[0]] ? a : b
  )[0];

  // Get type names in Romanian
  const typeNames = {
    type1: 'Reformatorul',
    type2: 'Ajutătorul', 
    type3: 'Realizatorul',
    type4: 'Individualistul',
    type5: 'Investigatorul',
    type6: 'Loyalul',
    type7: 'Entuziastul',
    type8: 'Provocatorul',
    type9: 'Mediatorul'
  };

  const typeNamesEn = {
    type1: 'The Reformer',
    type2: 'The Helper', 
    type3: 'The Achiever',
    type4: 'The Individualist',
    type5: 'The Investigator',
    type6: 'The Loyalist',
    type7: 'The Enthusiast',
    type8: 'The Challenger',
    type9: 'The Peacemaker'
  };

  const currentTypeNames = language === 'en' ? typeNamesEn : typeNames;
  const dominantTypeName = currentTypeNames[dominantType as keyof typeof currentTypeNames] || 'Necunoscut';

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {language === 'en' ? 'Enneagram Test' : 'Testul Enneagram'}
          <Badge variant="outline">
            {language === 'en' ? 'Personality Types' : 'Tipuri de Personalitate'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            {language === 'en' ? 'About the Enneagram' : 'Despre Enneagram'}
          </h3>
          <p className="text-blue-800 text-sm">
            {language === 'en' 
              ? 'The Enneagram identifies 9 personality types: The Reformer, The Helper, The Achiever, The Individualist, The Investigator, The Loyalist, The Enthusiast, The Challenger, and The Peacemaker. Each type has a unique worldview and characteristic behaviors.'
              : 'Enneagramul identifică 9 tipuri de personalitate: Reformatorul, Ajutătorul, Realizatorul, Individualistul, Investigatorul, Loyalul, Entuziastul, Provocatorul și Mediatorul. Fiecare tip este asociat cu o perspectivă unică asupra lumii și cu un set de comportamente caracteristice.'}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">
            {language === 'en' ? 'Your Dominant Type' : 'Tipul Tău Dominant'}
          </h3>
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="default" className="text-lg px-4 py-2">
              {dominantTypeName}
            </Badge>
            <span className="text-2xl font-bold text-blue-600">
              {Math.round(dimensions[dominantType])} {language === 'en' ? 'points' : 'puncte'}
            </span>
          </div>
          <p className="text-gray-700 mb-4">
            {getEnneagramTypeDescription(dominantType, language === 'en' ? 'en' : 'ro')}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            {language === 'en' ? 'All Type Scores' : 'Toate Scorurile pe Tipuri'}
          </h3>
          <div className="space-y-3">
            {Object.entries(dimensions)
              .sort(([,a], [,b]) => b - a)
              .map(([type, score]) => {
                const typeName = currentTypeNames[type as keyof typeof currentTypeNames] || type;
                const scoreValue = typeof score === 'number' ? score : 0;
                const percentage = Math.min(100, Math.max(0, (scoreValue / 20) * 100)); // Assuming max score is around 20
                
                return (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{typeName}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {Math.round(scoreValue)} {language === 'en' ? 'pts' : 'pct'}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">
            {language === 'en' ? 'How to interpret your results' : 'Cum să îți interpretezi rezultatele'}
          </h4>
          <ul className="text-green-800 text-sm space-y-1">
            <li>• {language === 'en' ? 'Your highest score indicates your dominant type' : 'Scorul cel mai mare indică tipul tău dominant'}</li>
            <li>• {language === 'en' ? 'Secondary types show aspects of your personality' : 'Tipurile secundare arată aspecte ale personalității tale'}</li>
            <li>• {language === 'en' ? 'No type is better than another - each has strengths' : 'Niciun tip nu este mai bun decât altul - fiecare are puncte forte'}</li>
            <li>• {language === 'en' ? 'Use insights for personal growth and self-understanding' : 'Folosește aceste insight-uri pentru dezvoltare personală și autocunoaștere'}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnneagramExplanation;
