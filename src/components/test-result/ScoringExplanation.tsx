
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTestScoringExplanation, type TestExplanation } from '@/utils/scoring/testExplanations';
import { useLanguage } from '@/hooks/useLanguage';

interface ScoringExplanationProps {
  testName: string;
  overallScore?: number;
  scoreType?: string;
  dimensions?: { [key: string]: number };
  roleScores?: { [key: string]: number };
}

export const ScoringExplanation = ({ testName, dimensions, roleScores }: ScoringExplanationProps) => {
  const { t } = useLanguage();
  const explanation: TestExplanation = getTestScoringExplanation(testName);

  const isDISC = testName.toLowerCase().includes('disc');

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{t('testResult.scoring.title')}</CardTitle>
        <CardDescription>
          {t('testResult.scoring.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main description */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 leading-relaxed">
            {explanation.description}
          </p>
        </div>

        {/* Score interpretation */}
        {explanation.scoreRanges && (
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">{t('testResult.scoring.interpretation')}</h4>
            <div className="grid grid-cols-1 gap-3">
              {explanation.scoreRanges.map((range, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Badge variant={range.variant} className="min-w-[80px] justify-center">
                      {range.range}
                    </Badge>
                    <span className="font-medium">{range.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DISC specific additional information */}
        {isDISC && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Cum se calculează scorurile DISC</h4>
            <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
              <p className="text-sm text-gray-700">
                <strong>Metoda de calcul:</strong> Fiecare întrebare DISC îți oferă 4 opțiuni care corespund celor 4 dimensiuni (D, I, S, C). 
                Răspunsurile tale sunt analizate pentru a determina frecvența cu care alegi fiecare stil comportamental.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Procentajele:</strong> Scorurile finale sunt calculate ca procente din totalul răspunsurilor, 
                arătând cât de puternic este fiecare stil în profilul tău comportamental.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Interpretarea combinațiilor:</strong> Majoritatea oamenilor au un profil mixt, cu 1-2 stiluri dominante 
                și celelalte ca stiluri de support. Această combinație creează unicitatea profilului tău.
              </p>
            </div>
          </div>
        )}

        {/* What your results mean */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">{t('testResult.scoring.whatMeans')}</h4>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 leading-relaxed">
              {explanation.whatItMeans}
            </p>
          </div>
        </div>

        {/* Current scores display if available */}
        {(dimensions || roleScores) && (
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Scorurile tale actuale</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dimensions && Object.entries(dimensions).map(([key, value]) => (
                <div key={key} className="text-center p-3 border rounded-lg bg-white">
                  <div className="font-bold text-lg text-blue-600">{Math.round(value)}%</div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">{key}</div>
                </div>
              ))}
              {roleScores && Object.entries(roleScores).map(([key, value]) => (
                <div key={key} className="text-center p-3 border rounded-lg bg-white">
                  <div className="font-bold text-lg text-blue-600">{Math.round(value)}%</div>
                  <div className="text-xs text-gray-600 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional tips for DISC */}
        {isDISC && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h5 className="font-medium text-amber-800 mb-2">💡 Cum să folosești rezultatele</h5>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• <strong>La muncă:</strong> Adaptează stilul de comunicare în funcție de profilul colegilor</li>
              <li>• <strong>În echipă:</strong> Înțelege rolul tău natural și completează punctele forte ale altora</li>
              <li>• <strong>În dezvoltare:</strong> Lucrează la flexibilitatea stilurilor mai puțin dominante</li>
              <li>• <strong>În carieră:</strong> Caută roluri care valorifică stilurile tale dominante</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
