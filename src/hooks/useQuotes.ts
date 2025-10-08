
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export interface QuoteRequest {
  id: string;
  client_id: string;
  provider_id: string;
  service_id: string;
  title: string;
  description: string;
  budget_min: number;
  budget_max: number;
  deadline: string;
  status: string;
  created_at: string;
  client?: {
    full_name: string;
    email: string;
  };
  provider?: {
    full_name: string;
    email: string;
    company_name: string;
  };
}

export interface Quote {
  id: string;
  quote_request_id: string;
  provider_id: string;
  amount: number;
  description: string;
  delivery_time: string;
  valid_until: string;
  status: string;
  created_at: string;
  quote_request?: QuoteRequest;
}

export const useQuotes = () => {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  const fetchQuoteRequests = async () => {
    if (!profile) return;

    try {
      setLoading(true);
      
      // Try to fetch from quote_requests table, fallback to empty array if table doesn't exist
      try {
        const { data, error } = await supabase
          .from('quote_requests')
          .select(`
            *,
            client:profiles!client_id(full_name, email),
            provider:profiles!provider_id(full_name, email, company_name)
          `)
          .or(`client_id.eq.${profile.id},provider_id.eq.${profile.id}`)
          .order('created_at', { ascending: false });

        if (error) {
          console.log('Quote requests table not ready');
          setQuoteRequests([]);
        } else {
          setQuoteRequests(data || []);
        }
      } catch (error) {
        console.log('Quote requests table not ready');
        setQuoteRequests([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des demandes de devis:', error);
      toast.error('Erreur lors du chargement des demandes de devis');
      setQuoteRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const createQuoteRequest = async (requestData: Partial<QuoteRequest>) => {
    if (!profile) {
      toast.error('Vous devez être connecté pour demander un devis');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .insert({
          client_id: profile.id,
          provider_id: requestData.provider_id || '',
          service_id: requestData.service_id || '',
          title: requestData.title || 'Nouvelle demande',
          description: requestData.description || '',
          budget_min: requestData.budget_min,
          budget_max: requestData.budget_max,
          deadline: requestData.deadline
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Demande de devis envoyée avec succès');
      fetchQuoteRequests(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la demande:', error);
      toast.error('Erreur lors de la création de la demande');
      return null;
    }
  };

  const createQuote = async (quoteData: Partial<Quote>) => {
    if (!profile) {
      toast.error('Vous devez être connecté pour envoyer un devis');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert([{
          provider_id: profile.id,
          amount: quoteData.amount || 0,
          description: quoteData.description || '',
          status: 'pending'
        }] as any)
        .select()
        .single();

      if (error) throw error;
      toast.success('Devis envoyé avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du devis:', error);
      toast.error('Erreur lors de l\'envoi du devis');
      return null;
    }
  };

  useEffect(() => {
    fetchQuoteRequests();
  }, [profile]);

  return {
    quoteRequests,
    quotes,
    loading,
    createQuoteRequest,
    createQuote,
    fetchQuoteRequests
  };
};
