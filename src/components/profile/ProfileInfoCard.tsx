
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, Shield, Clock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ProfileInfoCardProps {
  user: {
    full_name?: string;
    email?: string;
    role?: string;
    created_at?: string;
    last_sign_in_at?: string;
  };
  isAdmin: boolean;
}

const ProfileInfoCard = ({ user, isAdmin }: ProfileInfoCardProps) => {
  const { t } = useTranslation();

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t('profile.personalInfo.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t('profile.personalInfo.name')}
            </label>
            <p className="font-medium">{user.full_name || 'Nu este setat'}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t('profile.personalInfo.email')}
            </label>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t('profile.personalInfo.role')}
            </label>
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  {t('profile.administrator')}
                </Badge>
              ) : (
                <Badge variant="outline">User</Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t('profile.personalInfo.memberSince')}
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{formatDate(user.created_at)}</p>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-muted-foreground">
              {t('profile.personalInfo.lastLogin')}
            </label>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{formatDateTime(user.last_sign_in_at)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
