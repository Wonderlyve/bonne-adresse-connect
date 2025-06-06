
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export interface Message {
  id: string;
  content: string;
  file_url: string;
  message_type: string;
  conversation_id: string;
  sender_id: string;
  created_at: string;
  sender?: {
    full_name: string;
    profile_image: string;
  };
}

export interface Conversation {
  id: string;
  participant1_id: string;
  participant2_id: string;
  type: string;
  order_id: string;
  created_at: string;
  updated_at: string;
  last_message?: Message;
  other_participant?: {
    full_name: string;
    profile_image: string;
    company_name: string;
  };
}

export const useMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useProfile();

  const fetchConversations = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          messages(content, created_at, sender_id)
        `)
        .or(`participant1_id.eq.${user.id},participant2_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Enrichir avec les informations des participants
      const enrichedConversations = await Promise.all(
        (data || []).map(async (conv) => {
          const otherParticipantId = conv.participant1_id === user.id 
            ? conv.participant2_id 
            : conv.participant1_id;

          const { data: participant } = await supabase
            .from('profiles')
            .select('full_name, profile_image, company_name')
            .eq('id', otherParticipantId)
            .single();

          const lastMessage = conv.messages?.[0];

          return {
            ...conv,
            other_participant: participant,
            last_message: lastMessage
          };
        })
      );

      setConversations(enrichedConversations);
    } catch (error) {
      console.error('Erreur lors du chargement des conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles(full_name, profile_image)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
    }
  };

  const sendMessage = async (conversationId: string, content: string, messageType = 'text') => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content,
          message_type: messageType
        })
        .select()
        .single();

      if (error) throw error;

      // Mettre à jour la conversation
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      return data;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error('Erreur lors de l\'envoi du message');
      return null;
    }
  };

  const createConversation = async (participantId: string, type = 'general') => {
    if (!user) return null;

    try {
      // Vérifier si une conversation existe déjà
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${participantId}),and(participant1_id.eq.${participantId},participant2_id.eq.${user.id})`)
        .single();

      if (existing) {
        return existing.id;
      }

      // Créer une nouvelle conversation
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          participant1_id: user.id,
          participant2_id: participantId,
          type
        })
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Erreur lors de la création de la conversation:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [user]);

  return {
    conversations,
    messages,
    loading,
    fetchConversations,
    fetchMessages,
    sendMessage,
    createConversation
  };
};
