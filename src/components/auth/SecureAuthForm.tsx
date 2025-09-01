
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecureAuthFormProps {
  mode: 'signin' | 'signup';
}

const SecureAuthForm = ({ mode }: SecureAuthFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: t('toasts.error'),
        description: !email ? t('auth.emailRequired') : t('auth.passwordRequired'),
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: t('toasts.error'),
        description: t('auth.passwordTooShort'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: t('toasts.success'),
          description: t('toasts.accountCreated'),
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: t('toasts.success'),
          description: t('toasts.loginSuccessful'),
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: t('toasts.error'),
        description: error.message === 'Invalid login credentials' 
          ? t('auth.invalidCredentials') 
          : error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{t('auth.email')}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('auth.email')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t('auth.password')}</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('auth.password')}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t('common.loading') : mode === 'signin' ? t('auth.signIn') : t('auth.signUp')}
      </Button>
    </form>
  );
};

export default SecureAuthForm;
