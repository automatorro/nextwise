
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    console.log('AuthPage: Component mounted, user:', !!user);
    if (user) {
      console.log('AuthPage: User is logged in, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Handle email confirmation from URL
  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const type = searchParams.get('type');

      if (type === 'signup' && accessToken && refreshToken) {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (error) {
            console.error('Error setting session:', error);
            toast({
              title: "Eroare la confirmare",
              description: "A apărut o problemă la confirmarea contului.",
              variant: "destructive"
            });
          } else if (data.user) {
            toast({
              title: "Cont confirmat!",
              description: "Contul tău a fost confirmat cu succes. Bun venit!"
            });
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Confirmation error:', error);
        }
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate, toast]);

  const handleSignIn = async (e: React.FormEvent) => {
    console.log('AuthPage: Sign in form submitted');
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      console.log('AuthPage: Attempting sign in with email:', email);
      await signIn(email, password);
      console.log('AuthPage: Sign in completed');
    } catch (error) {
      console.error('AuthPage: Sign in error:', error);
    }
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    console.log('AuthPage: Sign up form submitted');
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      console.log('AuthPage: Attempting sign up with email:', email);
      const result = await signUp(email, password, fullName);
      if (!result.error) {
        console.log('AuthPage: Sign up successful, showing email sent message');
        setShowEmailSent(true);
      }
      console.log('AuthPage: Sign up completed');
    } catch (error) {
      console.error('AuthPage: Sign up error:', error);
    }
    
    setIsLoading(false);
  };

  const handleBackToAuth = (e: React.MouseEvent) => {
    console.log('AuthPage: Back to auth button clicked');
    e.preventDefault();
    e.stopPropagation();
    setShowEmailSent(false);
  };

  if (showEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <HomeNavigation />
        <div className="flex items-center justify-center px-4 pt-24 pb-12">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Verifică emailul</CardTitle>
              <CardDescription>
                Ți-am trimis un link de confirmare
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Am trimis un email de confirmare la <strong>{email}</strong>. 
                  Verifică inbox-ul și folderul spam, apoi urmează link-ul pentru a-ți activa contul.
                </AlertDescription>
              </Alert>
              <Button 
                variant="outline" 
                className="w-full min-h-[48px]" 
                onClick={handleBackToAuth}
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  userSelect: 'none'
                }}
              >
                Înapoi la autentificare
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  console.log('AuthPage: Rendering auth form');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <HomeNavigation />
      <div className="flex items-center justify-center px-4 pt-24 pb-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">EmpowerCareer</CardTitle>
            <CardDescription>
              Descoperă-ți potențialul și dezvoltă-ți cariera
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Autentificare</TabsTrigger>
                <TabsTrigger value="signup">Înregistrare</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="nume@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Parolă</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full min-h-[48px]" 
                    disabled={isLoading}
                    style={{ 
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                      userSelect: 'none'
                    }}
                  >
                    {isLoading ? 'Se încarcă...' : 'Autentificare'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nume complet</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="Nume Prenume"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="nume@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Parolă</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full min-h-[48px]" 
                    disabled={isLoading}
                    style={{ 
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                      userSelect: 'none'
                    }}
                  >
                    {isLoading ? 'Se încarcă...' : 'Înregistrare'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
