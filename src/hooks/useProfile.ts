
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  user_type: 'client' | 'provider';
  status: 'active' | 'suspended';
  violation_count: number;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        getProfile();
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setLoading(false);
        return;
      }

      setUser(session.user);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        throw error;
      }

      // Type assertion pour s'assurer que les types correspondent
      const profileData: Profile = {
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        phone: data.phone,
        user_type: data.user_type as 'client' | 'provider',
        status: data.status as 'active' | 'suspended',
        violation_count: data.violation_count,
        avatar_url: data.avatar_url,
        created_at: data.created_at,
        updated_at: data.updated_at
      };

      setProfile(profileData);
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

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user?.id) return { error: 'No user logged in' };

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const profileData: Profile = {
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          phone: data.phone,
          user_type: data.user_type as 'client' | 'provider',
          status: data.status as 'active' | 'suspended',
          violation_count: data.violation_count,
          avatar_url: data.avatar_url,
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        setProfile(profileData);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { data: null, error };
    }
  };

  return {
    profile,
    user,
    loading,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    isSuspended: profile?.status === 'suspended'
  };
};
