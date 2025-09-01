
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileEditFormProps {
  user: {
    id: string;
    full_name?: string;
    email?: string;
  };
  onUpdate: () => void;
}

const ProfileEditForm = ({ user, onUpdate }: ProfileEditFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [fullName, setFullName] = useState(user.full_name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!fullName.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (error) throw error;

      toast({
        title: t('toasts.success'),
        description: t('toasts.profileUpdated'),
      });
      
      onUpdate();
    } catch (error: any) {
      toast({
        title: t('toasts.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: t('toasts.error'),
        description: t('profile.passwordMismatch'),
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: t('toasts.error'),
        description: t('auth.passwordTooShort'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: t('toasts.success'),
        description: t('toasts.passwordChanged'),
      });
      
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: t('toasts.error'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('profile.updateProfile')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t('profile.fullName')}</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('profile.fullName')}
            />
          </div>
          <Button 
            onClick={handleUpdateProfile} 
            disabled={loading || !fullName.trim()}
          >
            {loading ? t('common.loading') : t('profile.updateProfile')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('profile.changePassword')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">{t('profile.currentPassword')}</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">{t('profile.newPassword')}</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('profile.confirmPassword')}</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleChangePassword} 
            disabled={loading || !newPassword || !confirmPassword}
          >
            {loading ? t('common.loading') : t('profile.changePassword')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEditForm;
