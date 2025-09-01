
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

interface ProfileHeaderProps {
  user: {
    full_name?: string;
    email?: string;
    role?: string;
  };
  isAdmin: boolean;
}

const ProfileHeader = ({ user, isAdmin }: ProfileHeaderProps) => {
  const { t } = useTranslation();
  
  const initials = user.full_name 
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold">
                {t('profile.welcome')} {user.full_name || user.email}
              </h1>
              {isAdmin && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  {t('profile.administrator')}
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground mb-4">
              {t('profile.welcomeMessage')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
              <span>{user.email}</span>
              {user.role && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>{user.role}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
