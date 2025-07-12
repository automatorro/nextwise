
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface ProfileHeaderProps {
  isAdmin: boolean;
  profileName?: string;
  userEmail?: string;
}

const ProfileHeader = ({ isAdmin, profileName, userEmail }: ProfileHeaderProps) => {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3">
        <h1 className="text-3xl font-bold text-gray-900">{t('profile.title')}</h1>
        {isAdmin && (
          <Badge variant="destructive" className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>{t('profile.administrator')}</span>
          </Badge>
        )}
      </div>
      <p className="text-gray-600 mt-2">
        {t('profile.welcome')}, {profileName || userEmail}! {t('profile.welcomeMessage')}
      </p>
    </div>
  );
};

export default ProfileHeader;
