
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export interface ProviderArticle {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  content: string;
  images: string[];
  price_min: number;
  price_max: number;
  price_unit: string;
  category: string;
  delivery_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useProviderArticles = () => {
  const [articles, setArticles] = useState<ProviderArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  const fetchArticles = async (providerId?: string) => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('provider_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (providerId) {
        query = query.eq('provider_id', providerId);
      } else if (profile) {
        query = query.eq('provider_id', profile.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData: Partial<ProviderArticle>) => {
    if (!profile) return null;

    try {
      const { data, error } = await supabase
        .from('provider_articles')
        .insert({
          provider_id: profile.id,
          title: articleData.title || 'Nouvel article',
          description: articleData.description || '',
          content: articleData.content,
          images: articleData.images,
          price_min: articleData.price_min,
          price_max: articleData.price_max,
          price_unit: articleData.price_unit,
          category: articleData.category,
          delivery_time: articleData.delivery_time,
          is_active: articleData.is_active ?? true
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Article créé avec succès');
      fetchArticles();
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      toast.error('Erreur lors de la création de l\'article');
      return null;
    }
  };

  const updateArticle = async (id: string, articleData: Partial<ProviderArticle>) => {
    try {
      const { data, error } = await supabase
        .from('provider_articles')
        .update(articleData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Article mis à jour avec succès');
      fetchArticles();
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
      toast.error('Erreur lors de la mise à jour de l\'article');
      return null;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('provider_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Article supprimé avec succès');
      fetchArticles();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      toast.error('Erreur lors de la suppression de l\'article');
    }
  };

  useEffect(() => {
    if (profile && profile.user_type === 'provider') {
      fetchArticles();
    }
  }, [profile]);

  return {
    articles,
    loading,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle
  };
};
