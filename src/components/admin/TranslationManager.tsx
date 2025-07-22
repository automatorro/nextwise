
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const TranslationManager = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestionare Traduceri</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Statusul Traducerilor</h3>
          <p className="text-gray-600">
            Sistemul de traduceri funcționează automat. Traducerile sunt încărcate din fișierele JSON pentru interfață și din baza de date pentru întrebările de test.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              ✅ Traducerile interfață: Funcționale
            </p>
            <p className="text-green-800 text-sm">
              ✅ Traducerile întrebări test: Gestionate automat
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationManager;
