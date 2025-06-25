
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BigFiveRadarChart from '@/components/charts/BigFiveRadarChart';
import BigFiveExplanations from '@/components/charts/BigFiveExplanations';
import BelbinRadarChart from '@/components/charts/BelbinRadarChart';

interface TestResultChartsProps {
  isBigFiveTest: boolean;
  isCognitiveTest: boolean;
  isBelbinTest: boolean;
  hasValidTestSpecificDimensions: boolean;
  testSpecificDimensions: { [key: string]: number };
}

const TestResultCharts = ({
  isBigFiveTest,
  isCognitiveTest,
  isBelbinTest,
  hasValidTestSpecificDimensions,
  testSpecificDimensions
}: TestResultChartsProps) => {
  if (!hasValidTestSpecificDimensions) {
    return null;
  }

  return (
    <>
      {/* Belbin Radar Chart */}
      {isBelbinTest && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Vizualizare Radar - Rolurile Belbin</CardTitle>
            <p className="text-sm text-gray-600">
              Graficul radar arată profilul tău pe cele 9 roluri Belbin. 
              Fiecare axă reprezintă un rol, iar scorul este afișat în puncte (0-18).
            </p>
          </CardHeader>
          <CardContent>
            <BelbinRadarChart roleScores={testSpecificDimensions} />
          </CardContent>
        </Card>
      )}

      {/* Big Five Radar Chart */}
      {isBigFiveTest && (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Vizualizare Radar - Dimensiunile Big Five</CardTitle>
              <p className="text-sm text-gray-600">
                Graficul radar arată profilul tău de personalitate pe cele 5 dimensiuni principale. 
                Fiecare axă reprezintă o dimensiune, iar scorul este afișat ca procent.
              </p>
            </CardHeader>
            <CardContent>
              <BigFiveRadarChart dimensions={testSpecificDimensions as any} />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Ghid de Interpretare</CardTitle>
            </CardHeader>
            <CardContent>
              <BigFiveExplanations dimensions={testSpecificDimensions as any} />
            </CardContent>
          </Card>
        </>
      )}

      {/* Cognitive Abilities Visualization */}
      {isCognitiveTest && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Vizualizare Aptitudini Cognitive</CardTitle>
            <p className="text-sm text-gray-600">
              Graficul arată performanța ta pe cele 5 dimensiuni cognitive principale.
              Fiecare dimensiune este evaluată separat și afișată ca procent.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                <p><strong>Interpretare scoruri:</strong></p>
                <p>• 0-40%: Sub medie</p>
                <p>• 41-60%: Medie</p>
                <p>• 61-80%: Peste medie</p>
                <p>• 81-100%: Excelent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TestResultCharts;
