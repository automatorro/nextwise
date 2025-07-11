
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BigFiveRadarChart from '@/components/charts/BigFiveRadarChart';
import BigFiveExplanations from '@/components/charts/BigFiveExplanations';
import BelbinRadarChart from '@/components/charts/BelbinRadarChart';

interface TestResultChartsProps {
  isBigFiveTest: boolean;
  isCognitiveTest: boolean;
  isBelbinTest: boolean;
  isCattell16PFTest?: boolean;
  hasValidTestSpecificDimensions: boolean;
  testSpecificDimensions: { [key: string]: number };
}

const TestResultCharts = ({
  isBigFiveTest,
  isCognitiveTest,
  isBelbinTest,
  isCattell16PFTest,
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

      {/* Cattell 16PF Visualization */}
      {isCattell16PFTest && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Vizualizare Cattell 16PF</CardTitle>
            <p className="text-sm text-gray-600">
              Profilul tău de personalitate pe cele 16 factori ai lui Cattell.
              Fiecare factor este măsurat pe o scală Sten (1-10), unde 5.5 este media.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                <p><strong>Interpretare scoruri Sten:</strong></p>
                <p>• 1-3: Scăzut (polaritatea stângă)</p>
                <p>• 4-7: Mediu</p>
                <p>• 8-10: Ridicat (polaritatea dreaptă)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(testSpecificDimensions).map(([factor, score]) => (
                  <div key={factor} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Factor {factor}</span>
                      <span className="text-lg font-bold">{score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(score / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TestResultCharts;
