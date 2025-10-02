import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Provider {
  id: string;
  full_name: string;
  email: string;
  company_name: string | null;
  avatar_url: string | null;
  location: string | null;
  bio: string | null;
  rating: number;
  reviews_count: number;
  services_offered: string[] | null;
  specialties: string[] | null;
  price_range: string | null;
  is_online: boolean;
  badges: string[] | null;
  response_time: string | null;
  completion_rate: number | null;
  created_at: string;
}

export const useProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'provider')
        .eq('status', 'active')
        .order('rating', { ascending: false });

      if (error) throw error;

      setProviders(data || []);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return {
    providers,
    loading,
    fetchProviders
  };
};
