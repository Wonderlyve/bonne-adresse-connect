
import { useProfile } from './useProfile';

export interface User {
  name: string;
  email: string;
  userType: 'client' | 'provider';
}

export const useAuth = () => {
  const { profile, user, loading, signOut } = useProfile();

  const login = () => {
    // Cette fonction est maintenant gérée par Supabase Auth
    console.log('Login via Supabase Auth');
  };

  const logout = () => {
    signOut();
  };

  // Convertir le profil Supabase au format attendu par l'ancien système
  const legacyUser = profile ? {
    name: profile.full_name || profile.email,
    email: profile.email,
    userType: profile.user_type
  } : null;

  return {
    user: legacyUser,
    isLoading: loading,
    isAuthenticated: !!user,
    login,
    logout
  };
};
