"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper to ensure user_progress row exists
  const createUserProgressIfNeeded = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('user_id')
      .eq('user_id', userId)
      .single();
    if (!data) {
      // Insert default user_progress row
      await supabase.from('user_progress').insert({
        user_id: userId,
        level: 1,
        experience: 0,
        completed_journeys: [],
        collected_cards: [],
        badges: [],
        last_level_up: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('AuthContext: Setting user from session:', session?.user);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        await createUserProgressIfNeeded(session.user.id);
      }
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('AuthContext: Auth state changed, user:', session?.user);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        await createUserProgressIfNeeded(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 