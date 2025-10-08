
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
  const { profile } = useProfile();

  const fetchOrders = async () => {
    if (!profile) return;

    try {
      setLoading(true);
      
      // Try to fetch from orders table, fallback to empty array if table doesn't exist
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            client:profiles!client_id(full_name, email),
            provider:profiles!provider_id(full_name, email, company_name)
          `)
          .or(`client_id.eq.${profile.id},provider_id.eq.${profile.id}`)
          .order('created_at', { ascending: false });

        if (error) {
          console.log('Orders table not ready');
          setOrders([]);
        } else {
          const ordersWithDefaults = (data || []).map(order => ({
            ...order,
            description: order.description || '',
            deadline: order.deadline || '',
            delivery_date: order.delivery_date || '',
            payment_method: order.payment_method || 'platform',
            client: order.client || { full_name: 'Client inconnu', email: '' },
            provider: order.provider || { full_name: 'Prestataire inconnu', email: '', company_name: '' }
          }));
          setOrders(ordersWithDefaults);
        }
      } catch (error) {
        console.log('Orders table not ready');
        setOrders([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      toast.error('Erreur lors du chargement des commandes');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Partial<Order>) => {
    if (!profile) {
      toast.error('Vous devez être connecté pour passer commande');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          provider_id: orderData.provider_id || '',
          status: 'pending'
        }] as any)
        .select()
        .single();

      if (error) throw error;
      toast.success('Commande créée avec succès');
      fetchOrders(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      toast.error('Erreur lors de la création de la commande');
      return null;
    }
  };

  const updateOrderStatus = async (orderId: string, status: 'pending' | 'in_progress' | 'completed' | 'cancelled') => {
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
  }, [profile]);

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    fetchOrders
  };
};
