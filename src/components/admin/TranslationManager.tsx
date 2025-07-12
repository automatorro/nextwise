
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import TranslationFixButton from './TranslationFixButton';

const TranslationManager = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('admin.translations')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{t('admin.fixTranslations')}</h3>
          <p className="text-gray-600">
            {t('admin.notice')}
          </p>
          <TranslationFixButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default TranslationManager;
