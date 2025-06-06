
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export interface Service {
  id: string;
  provider_id: string;
  category_id: string;
  title: string;
  description: string;
  price_min: number;
  price_max: number;
  price_unit: string;
  delivery_time: string;
  images: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  provider?: {
    full_name: string;
    email: string;
    company_name: string;
    profile_image: string;
  };
  category?: {
    name: string;
    slug: string;
  };
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useProfile();

  const fetchServices = async (categorySlug?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('services')
        .select(`
          *,
          provider:profiles(full_name, email, company_name, profile_image),
          category:service_categories(name, slug)
        `)
        .eq('is_active', true);

      if (categorySlug) {
        query = query.eq('service_categories.slug', categorySlug);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des services:', error);
      toast.error('Erreur lors du chargement des services');
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: Partial<Service>) => {
    if (!user) {
      toast.error('Vous devez être connecté pour créer un service');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .insert({
          ...serviceData,
          provider_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Service créé avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du service:', error);
      toast.error('Erreur lors de la création du service');
      return null;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    fetchServices,
    createService
  };
};
