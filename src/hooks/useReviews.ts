
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export interface Review {
  id: string;
  reviewer_id: string;
  reviewed_id: string;
  order_id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer?: {
    full_name: string;
    profile_image: string;
  };
}

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useProfile();

  const fetchReviews = async (providerId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (providerId) {
        query = query.eq('provider_id', providerId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setReviews((data || []).map(review => ({
        ...review,
        reviewer_id: review.client_id,
        reviewed_id: review.provider_id
      })));
    } catch (error) {
      console.error('Erreur lors du chargement des avis:', error);
      toast.error('Erreur lors du chargement des avis');
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: Partial<Review>) => {
    if (!user) {
      toast.error('Vous devez être connecté pour laisser un avis');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          client_id: user.id,
          provider_id: reviewData.reviewed_id || '',
          rating: reviewData.rating || 5,
          comment: reviewData.comment || '',
          order_id: reviewData.order_id || '',
          ...reviewData
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Avis publié avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la publication de l\'avis:', error);
      toast.error('Erreur lors de la publication de l\'avis');
      return null;
    }
  };

  const getAverageRating = (providerId: string) => {
    const providerReviews = reviews.filter(r => r.reviewed_id === providerId);
    if (providerReviews.length === 0) return 0;
    
    const totalRating = providerReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / providerReviews.length;
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    createReview,
    fetchReviews,
    getAverageRating
  };
};
