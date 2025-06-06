
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
  const { user } = useProfile();

  const fetchQuoteRequests = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select(`
          *,
          client:profiles!client_id(full_name, email),
          provider:profiles!provider_id(full_name, email, company_name)
        `)
        .or(`client_id.eq.${user.id},provider_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuoteRequests(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes de devis:', error);
      toast.error('Erreur lors du chargement des demandes de devis');
    }
  };

  const createQuoteRequest = async (requestData: Partial<QuoteRequest>) => {
    if (!user) {
      toast.error('Vous devez être connecté pour demander un devis');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .insert({
          ...requestData,
          client_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Demande de devis envoyée avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la demande:', error);
      toast.error('Erreur lors de la création de la demande');
      return null;
    }
  };

  const createQuote = async (quoteData: Partial<Quote>) => {
    if (!user) {
      toast.error('Vous devez être connecté pour envoyer un devis');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          ...quoteData,
          provider_id: user.id
        })
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
  }, [user]);

  return {
    quoteRequests,
    quotes,
    loading,
    createQuoteRequest,
    createQuote,
    fetchQuoteRequests
  };
};
