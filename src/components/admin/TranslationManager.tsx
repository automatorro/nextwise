
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TranslationFixButton from './TranslationFixButton';

const TranslationManager = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestionare Traduceri</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Reparare Traduceri Teste</h3>
          <p className="text-gray-600">
            Repară traducerile pentru întrebările și opțiunile testelor, inclusiv testul DISC.
          </p>
          <TranslationFixButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationManager;
