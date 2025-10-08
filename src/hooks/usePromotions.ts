
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export interface Promotion {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  discount_percentage: number;
  discount_amount: number;
  discount_type: string;
  code: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  max_uses: number;
  current_uses: number;
  min_order_amount: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export const usePromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  const fetchPromotions = async (providerId?: string) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });

      if (providerId) {
        query = query.eq('provider_id', providerId);
      } else if (profile && profile.user_type === 'provider') {
        query = query.eq('provider_id', profile.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPromotions(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des promotions:', error);
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  };

  const createPromotion = async (promotionData: Partial<Promotion>) => {
    if (!profile) return null;

    try {
      const { data, error } = await supabase
        .from('promotions')
        .insert({
          title: promotionData.title || 'Nouvelle promotion',
          description: promotionData.description || '',
          ...promotionData,
          created_by: profile.id
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Promotion créée avec succès');
      fetchPromotions();
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la promotion:', error);
      toast.error('Erreur lors de la création de la promotion');
      return null;
    }
  };

  const updatePromotion = async (id: string, promotionData: Partial<Promotion>) => {
    try {
      const { data, error } = await supabase
        .from('promotions')
        .update(promotionData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Promotion mise à jour avec succès');
      fetchPromotions();
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la promotion:', error);
      toast.error('Erreur lors de la mise à jour de la promotion');
      return null;
    }
  };

  const deletePromotion = async (id: string) => {
    try {
      const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Promotion supprimée avec succès');
      fetchPromotions();
    } catch (error) {
      console.error('Erreur lors de la suppression de la promotion:', error);
      toast.error('Erreur lors de la suppression de la promotion');
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, [profile]);

  return {
    promotions,
    loading,
    fetchPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion
  };
};
