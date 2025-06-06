
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Ad {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link_url: string;
  is_active: boolean;
  position: string;
  created_at: string;
  updated_at: string;
}

export const useAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from ads table, fallback to mock data if table doesn't exist
      try {
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.log('Ads table not ready, using mock data');
          setAds(getMockAds());
        } else {
          setAds(data || []);
        }
      } catch (error) {
        console.log('Ads table not ready, using mock data');
        setAds(getMockAds());
      }
    } catch (error) {
      console.error('Erreur lors du chargement des publicités:', error);
      setAds(getMockAds());
    } finally {
      setLoading(false);
    }
  };

  const createAd = async (adData: Partial<Ad>) => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .insert(adData)
        .select()
        .single();

      if (error) throw error;
      toast.success('Publicité créée avec succès');
      fetchAds(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la publicité:', error);
      toast.error('Erreur lors de la création de la publicité');
      return null;
    }
  };

  const getMockAds = (): Ad[] => [
    {
      id: 'mock-ad-1',
      title: 'Services de qualité professionnelle',
      description: 'Découvrez nos prestataires experts dans tous les domaines',
      image_url: '/placeholder.svg',
      link_url: '/services',
      is_active: true,
      position: 'hero',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchAds();
  }, []);

  return {
    ads,
    loading,
    fetchAds,
    createAd
  };
};
