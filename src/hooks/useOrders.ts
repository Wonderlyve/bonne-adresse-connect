
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export interface Order {
  id: string;
  client_id: string;
  provider_id: string;
  service_name: string;
  description: string;
  amount: number;
  status: string;
  deadline: string;
  delivery_date: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
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

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useProfile();

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          client:profiles!client_id(full_name, email),
          provider:profiles!provider_id(full_name, email, company_name)
        `)
        .or(`client_id.eq.${user.id},provider_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      toast.error('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Partial<Order>) => {
    if (!user) {
      toast.error('Vous devez être connecté pour passer commande');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          ...orderData,
          client_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Commande créée avec succès');
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      toast.error('Erreur lors de la création de la commande');
      return null;
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
      toast.success('Statut de la commande mis à jour');
      fetchOrders();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    fetchOrders
  };
};
