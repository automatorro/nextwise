
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SecurePasswordInput } from './SecurePasswordInput';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { emailSchema, passwordSchema, sanitizeInput } from '@/utils/security';
import { toast } from 'sonner';
import { z } from 'zod';

export const SecureAuthForm = () => {
  const { signIn, signUp, isRateLimited, attemptCount } = useSecureAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Sign in form state
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  // Sign up form state
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRateLimited) {
      toast.error('Too many failed attempts. Please try again later.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Validate email
      const emailResult = emailSchema.safeParse(signInData.email);
      if (!emailResult.success) {
        toast.error(emailResult.error.errors[0].message);
        return;
      }

      // Validate password
      const passwordResult = passwordSchema.safeParse(signInData.password);
      if (!passwordResult.success) {
        toast.error('Please check your password');
        return;
      }

      const result = await signIn(signInData.email, signInData.password);
      
      if (result.error) {
        toast.error('Invalid email or password');
        
        if (attemptCount >= 2) {
          toast.warning('Multiple failed attempts. Please verify your credentials.');
        }
      } else {
        toast.success('Successfully signed in!');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRateLimited) {
      toast.error('Too many attempts. Please try again later.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Validate email
      const emailResult = emailSchema.safeParse(signUpData.email);
      if (!emailResult.success) {
        toast.error(emailResult.error.errors[0].message);
        return;
      }

      // Validate password
      const passwordResult = passwordSchema.safeParse(signUpData.password);
      if (!passwordResult.success) {
        toast.error(passwordResult.error.errors[0].message);
        return;
      }

      // Validate full name
      const sanitizedName = sanitizeInput(signUpData.fullName);
      if (sanitizedName.length < 2) {
        toast.error('Please enter your full name');
        return;
      }

      const result = await signUp(signUpData.email, signUpData.password, sanitizedName);
      
      if (result.error) {
        toast.error(result.error.message || 'Registration failed');
      } else {
        toast.success('Registration successful! Please check your email to verify your account.');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Sign in to your account or create a new one</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <SecurePasswordInput
                value={signInData.password}
                onChange={(password) => setSignInData({ ...signInData, password })}
                showStrengthIndicator={false}
              />
              
              {attemptCount > 0 && (
                <div className="text-sm text-yellow-600">
                  Failed attempts: {attemptCount}/5
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || isRateLimited}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  value={signUpData.fullName}
                  onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <SecurePasswordInput
                value={signUpData.password}
                onChange={(password) => setSignUpData({ ...signUpData, password })}
                showStrengthIndicator={true}
              />
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || isRateLimited}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
