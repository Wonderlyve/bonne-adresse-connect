
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
  };
  category?: {
    name: string;
    slug: string;
  };
}

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  const fetchServices = async (categorySlug?: string) => {
    try {
      setLoading(true);
      
      // Try to fetch from services table, fallback to mock data if table doesn't exist
      try {
        let query = supabase
          .from('services')
          .select(`
            *,
            provider:profiles(full_name, email, company_name),
            category:service_categories(name, slug)
          `)
          .eq('is_active', true);

        if (categorySlug) {
          query = query.eq('service_categories.slug', categorySlug);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        
        if (error) {
          console.log('Services table not ready, using mock data');
          setServices(getMockServices());
        } else {
          setServices(data || []);
        }
      } catch (error) {
        console.log('Services table not ready, using mock data');
        setServices(getMockServices());
      }
    } catch (error) {
      console.error('Erreur lors du chargement des services:', error);
      toast.error('Erreur lors du chargement des services');
      setServices(getMockServices());
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: Partial<Service>) => {
    if (!profile) {
      toast.error('Vous devez être connecté pour créer un service');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .insert({
          ...serviceData,
          provider_id: profile.id
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Service créé avec succès');
      fetchServices(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du service:', error);
      toast.error('Erreur lors de la création du service');
      return null;
    }
  };

  const getMockServices = (): Service[] => [
    {
      id: '1',
      provider_id: 'mock-provider-1',
      category_id: 'imprimerie',
      title: 'Impression de flyers haute qualité',
      description: 'Service d\'impression professionnel pour vos flyers, cartes de visite et supports publicitaires',
      price_min: 50,
      price_max: 500,
      price_unit: 'USD',
      delivery_time: '3-5 jours',
      images: ['/placeholder.svg'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      provider: {
        full_name: 'Jean Dupont',
        email: 'jean@imprimerie.com',
        company_name: 'Imprimerie Moderne'
      },
      category: {
        name: 'Imprimerie',
        slug: 'imprimerie'
      }
    },
    {
      id: '2',
      provider_id: 'mock-provider-2',
      category_id: 'design-graphique',
      title: 'Création de logo professionnel',
      description: 'Design de logo unique et professionnel pour votre entreprise',
      price_min: 100,
      price_max: 300,
      price_unit: 'USD',
      delivery_time: '5-7 jours',
      images: ['/placeholder.svg'],
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      provider: {
        full_name: 'Marie Martin',
        email: 'marie@design.com',
        company_name: 'Studio Créatif'
      },
      category: {
        name: 'Design Graphique',
        slug: 'design-graphique'
      }
    }
  ];

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
