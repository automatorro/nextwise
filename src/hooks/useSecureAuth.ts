
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createRateLimiter } from '@/utils/security';
import { toast } from 'sonner';

// Rate limiter for authentication attempts
const authRateLimiter = createRateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

export const useSecureAuth = () => {
  const { user, signIn, signUp, signOut } = useAuth();
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const secureSignIn = async (email: string, password: string) => {
    const identifier = email.toLowerCase();
    
    if (authRateLimiter.isRateLimited(identifier)) {
      setIsRateLimited(true);
      toast.error('Too many failed attempts. Please try again in 15 minutes.');
      return { error: 'Rate limited' };
    }

    try {
      const result = await signIn(email, password);
      
      if (result.error) {
        setAttemptCount(prev => prev + 1);
        
        // Log authentication attempt (in production, send to monitoring service)
        console.warn('Failed authentication attempt:', {
          email: identifier,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          ip: 'client-side' // In production, get from server
        });
        
        if (attemptCount >= 3) {
          toast.error('Multiple failed attempts detected. Please check your credentials.');
        }
      } else {
        // Reset on successful login
        authRateLimiter.reset(identifier);
        setAttemptCount(0);
        setIsRateLimited(false);
        
        // Log successful authentication
        console.info('Successful authentication:', {
          email: identifier,
          timestamp: new Date().toISOString()
        });
      }
      
      return result;
    } catch (error) {
      console.error('Authentication error:', error);
      return { error: 'Authentication failed' };
    }
  };

  const secureSignUp = async (email: string, password: string, fullName: string) => {
    const identifier = email.toLowerCase();
    
    if (authRateLimiter.isRateLimited(identifier)) {
      setIsRateLimited(true);
      toast.error('Too many attempts. Please try again in 15 minutes.');
      return { error: 'Rate limited' };
    }

    try {
      const result = await signUp(email, password, fullName);
      
      if (result.error) {
        setAttemptCount(prev => prev + 1);
        console.warn('Failed registration attempt:', {
          email: identifier,
          timestamp: new Date().toISOString()
        });
      } else {
        authRateLimiter.reset(identifier);
        setAttemptCount(0);
        console.info('Successful registration:', {
          email: identifier,
          timestamp: new Date().toISOString()
        });
      }
      
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      return { error: 'Registration failed' };
    }
  };

  const secureSignOut = async () => {
    try {
      console.info('User signed out:', {
        userId: user?.id,
        timestamp: new Date().toISOString()
      });
      
      await signOut();
      setAttemptCount(0);
      setIsRateLimited(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Check for suspicious activity patterns
  useEffect(() => {
    if (attemptCount >= 3) {
      toast.warning('Multiple failed login attempts detected. Please verify your credentials.');
    }
  }, [attemptCount]);

  return {
    user,
    signIn: secureSignIn,
    signUp: secureSignUp,
    signOut: secureSignOut,
    isRateLimited,
    attemptCount
  };
};
