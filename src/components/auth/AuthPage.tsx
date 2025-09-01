
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import SecureAuthForm from './SecureAuthForm';

const AuthPage = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('auth.backToMain')}
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              {t('auth.welcome')}
            </CardTitle>
            <p className="text-center text-gray-600">
              {t('auth.signInMessage')}
            </p>
          </CardHeader>
          <CardContent>
            <SecureAuthForm mode={mode} />
            
            <div className="mt-6 text-center">
              {mode === 'signin' ? (
                <p className="text-sm text-gray-600">
                  {t('auth.dontHaveAccount')}{' '}
                  <Button
                    variant="link"
                    onClick={() => setMode('signup')}
                    className="p-0 h-auto font-semibold"
                  >
                    {t('auth.signUp')}
                  </Button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  {t('auth.alreadyHaveAccount')}{' '}
                  <Button
                    variant="link"
                    onClick={() => setMode('signin')}
                    className="p-0 h-auto font-semibold"
                  >
                    {t('auth.signIn')}
                  </Button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
