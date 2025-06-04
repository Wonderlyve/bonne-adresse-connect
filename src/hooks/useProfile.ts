
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  user_type: 'client' | 'provider';
  status: 'active' | 'suspended';
  violation_count: number;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupération immédiate de la session existante
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await getProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la session:', error);
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Utiliser setTimeout pour éviter les deadlocks
        setTimeout(() => {
          getProfile(session.user.id);
        }, 0);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getProfile = async (userId?: string) => {
    try {
      const targetUserId = userId || user?.id;
      if (!targetUserId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        const profileData: Profile = {
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          phone: data.phone,
          avatar_url: data.avatar_url,
          user_type: data.user_type as 'client' | 'provider',
          status: data.status as 'active' | 'suspended',
          violation_count: data.violation_count || 0,
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return {
    profile,
    user,
    loading,
    signOut,
    isAuthenticated: !!user,
    isSuspended: profile?.status === 'suspended'
  };
};
