
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check subscription when user state changes
  const checkSubscription = async (userId: string, accessToken: string) => {
    try {
      await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Check subscription status when user signs in
        if (event === 'SIGNED_IN' && session?.user) {
          toast({
            title: "Bun venit!",
            description: "Te-ai autentificat cu succes."
          });
          
          // Check subscription in background
          setTimeout(() => {
            checkSubscription(session.user.id, session.access_token);
          }, 1000);
        }

        // Handle email confirmation success
        if (event === 'TOKEN_REFRESHED' && session?.user) {
          console.log('Token refreshed successfully');
          // Also check subscription on token refresh
          setTimeout(() => {
            checkSubscription(session.user.id, session.access_token);
          }, 1000);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Check subscription for existing session
      if (session?.user) {
        setTimeout(() => {
          checkSubscription(session.user.id, session.access_token);
        }, 1000);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signUp = async (email: string, password: string, fullName: string) => {
    // Use the production URL for email redirect
    const redirectUrl = window.location.hostname === 'localhost' 
      ? `${window.location.origin}/`
      : 'https://empower-career-now.lovable.app/';
    
    console.log('Sign up redirect URL:', redirectUrl);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      toast({
        title: "Eroare la înregistrare",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Verifică emailul",
        description: "Ți-am trimis un link de confirmare pe email. Verifică și inbox-ul și folderul spam."
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: "Eroare la autentificare",
        description: error.message,
        variant: "destructive"
      });
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "La revedere!",
      description: "Te-ai deconectat cu succes."
    });
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
