
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SJTExplanationProps {
  score: {
    overall: number;
    dimensions?: Record<string, number>;
    dominant_profile?: string;
    secondary_profile?: string;
  };
  language?: string;
}

export const SJTExplanation: React.FC<SJTExplanationProps> = ({ score, language = 'ro' }) => {
  const getProfileLabel = (profile: string) => {
    const labels: Record<string, string> = {
      'Leader': 'Lider',
      'Specialist_Analitic': 'Specialist Analitic',
      'Creativ': 'Creativ',
      'Suport_Servicii': 'Suport/Servicii',
      'Antreprenor': 'Antreprenor',
      'Vanzari': 'Vânzări'
    };
    return labels[profile] || profile;
  };

  const getProfileDescription = (profile: string) => {
    const descriptions: Record<string, string> = {
      'Leader': 'Persoana cu înclinații naturale către leadership, coordonarea echipelor și luarea inițiativei.',
      'Specialist_Analitic': 'Persoana care preferă să analizeze în profunzime problemele și să găsească soluții bazate pe date.',
      'Creativ': 'Persoana care îi place să găsească soluții inovatoare și să aducă perspective noi.',
      'Suport_Servicii': 'Persoana cu înclinație naturală către ajutorarea celorlalți și construirea relațiilor pozitive.',
      'Antreprenor': 'Persoana care îi place să își asume riscuri calculate și să creeze oportunități noi.',
      'Vanzari': 'Persoana cu abilități naturale de persuasiune și care îi place să construiască relații cu clienții.'
    };
    return descriptions[profile] || 'Descrierea nu este disponibilă';
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ce este Testul SJT?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Testul de Judecată Situațională (SJT)</h4>
          <p className="text-sm text-gray-600 mb-3">
            Testul SJT evaluează preferințele tale pentru diferite stiluri de lucru prin prezentarea unor scenarii realiste din mediul profesional. 
            Fiecare răspuns reflectă o anumită abordare și te ajută să descoperi profilul de carieră care ți se potrivește cel mai bine.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Cele 6 Profiluri de Carieră</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries({
              'Leader': 'Lider',
              'Specialist_Analitic': 'Specialist Analitic',
              'Creativ': 'Creativ',
              'Suport_Servicii': 'Suport/Servicii',
              'Antreprenor': 'Antreprenor',
              'Vanzari': 'Vânzări'
            }).map(([key, label]) => (
              <div key={key} className="border rounded p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{label}</span>
                  {score.dimensions && (
                    <Badge variant="outline" className="text-xs">
                      {score.dimensions[key] || 0}%
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  {getProfileDescription(key)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Cum funcționează</h4>
          <p className="text-sm text-gray-600">
            Testul prezintă 10 scenarii din mediul profesional, fiecare cu 4 opțiuni de răspuns. 
            Alegerile tale sunt analizate și convertite în scoruri pentru cele 6 profiluri de carieră. 
            Profilul cu cel mai mare scor reprezintă stilul tău dominant de lucru.
          </p>
        </div>

        {score.dominant_profile && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Profilul tău dominant</h4>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-600">{getProfileLabel(score.dominant_profile)}</Badge>
              {score.secondary_profile && (
                <Badge variant="secondary">{getProfileLabel(score.secondary_profile)}</Badge>
              )}
            </div>
            <p className="text-sm text-blue-700">
              {getProfileDescription(score.dominant_profile)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
