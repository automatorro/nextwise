
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const AdminNotice = () => {
  const { t } = useLanguage();

  return (
    <Card className="mb-8 border-orange-200 bg-orange-50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-orange-600" />
          <div>
            <h3 className="font-semibold text-orange-900">{t('profile.administrator')}</h3>
            <p className="text-orange-700 text-sm">
              {t('profile.admin.notice')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminNotice;
