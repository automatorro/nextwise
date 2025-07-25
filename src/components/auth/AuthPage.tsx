
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SecureAuthForm } from './SecureAuthForm';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { loading } = useAuth();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Button
          variant="ghost"
          onClick={handleGoHome}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Înapoi la pagina principală
        </Button>
        
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isLogin ? 'Autentificare' : 'Înregistrare'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? 'Conectează-te la contul tău pentru a accesa testele' 
                : 'Creează un cont nou pentru a începe testele psihologice'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SecureAuthForm isLogin={isLogin} />
            
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                {isLogin 
                  ? 'Nu ai cont? Înregistrează-te aici' 
                  : 'Ai deja cont? Conectează-te aici'
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
