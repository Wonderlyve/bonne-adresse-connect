
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export interface ProviderPage {
  id: string;
  provider_id: string;
  company_name: string;
  description: string;
  logo_url: string;
  banner_url: string;
  website_url: string;
  phone: string;
  address: string;
  social_links: any;
  business_hours: any;
  specialties: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export const useProviderPage = () => {
  const [providerPage, setProviderPage] = useState<ProviderPage | null>(null);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  const fetchProviderPage = async (providerId?: string) => {
    try {
      setLoading(true);
      
      const targetId = providerId || profile?.id;
      if (!targetId) return;

      const { data, error } = await supabase
        .from('provider_pages')
        .select('*')
        .eq('provider_id', targetId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProviderPage(data || null);
    } catch (error) {
      console.error('Erreur lors du chargement de la page prestataire:', error);
      setProviderPage(null);
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateProviderPage = async (pageData: Partial<ProviderPage>) => {
    if (!profile) return null;

    try {
      const { data, error } = await supabase
        .from('provider_pages')
        .upsert({
          ...pageData,
          provider_id: profile.id
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Page mise à jour avec succès');
      setProviderPage(data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la page:', error);
      toast.error('Erreur lors de la mise à jour de la page');
      return null;
    }
  };

  useEffect(() => {
    if (profile && profile.user_type === 'provider') {
      fetchProviderPage();
    }
  }, [profile]);

  return {
    providerPage,
    loading,
    fetchProviderPage,
    createOrUpdateProviderPage
  };
};
