
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
    company_name: string;
  };
}

export const useMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  const fetchConversations = async () => {
    if (!profile) return;

    try {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            *,
            messages(content, created_at, sender_id)
          `)
          .or(`participant1_id.eq.${profile.id},participant2_id.eq.${profile.id}`)
          .order('updated_at', { ascending: false });

        if (error) {
          console.log('Conversations table not ready');
          setConversations([]);
        } else {
          // Enrichir avec les informations des participants
          const enrichedConversations = await Promise.all(
            (data || []).map(async (conv) => {
              const otherParticipantId = conv.participant1_id === profile.id 
                ? conv.participant2_id 
                : conv.participant1_id;

              const { data: participant } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', otherParticipantId)
                .single();

              const lastMessage = conv.messages?.[0];

              return {
                ...conv,
                type: 'general',
                order_id: '',
                other_participant: participant ? { 
                  full_name: participant.full_name || 'Utilisateur inconnu', 
                  company_name: '' 
                } : { full_name: 'Utilisateur inconnu', company_name: '' },
                last_message: lastMessage ? {
                  id: '',
                  content: lastMessage.content,
                  file_url: '',
                  message_type: 'text',
                  conversation_id: conv.id,
                  sender_id: lastMessage.sender_id,
                  created_at: lastMessage.created_at
                } : undefined
              };
            })
          );

          setConversations(enrichedConversations);
        }
      } catch (error) {
        console.log('Conversations table not ready');
        setConversations([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des conversations:', error);
      setConversations([]);
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
          sender:profiles(full_name)
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data?.map(msg => ({
        ...msg,
        sender: msg.sender || { full_name: 'Utilisateur inconnu' }
      })) || []);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      setMessages([]);
    }
  };

  const sendMessage = async (conversationId: string, content: string, messageType = 'text') => {
    if (!profile) return null;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: profile.id,
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
    if (!profile) return null;

    try {
      // Vérifier si une conversation existe déjà
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(participant1_id.eq.${profile.id},participant2_id.eq.${participantId}),and(participant1_id.eq.${participantId},participant2_id.eq.${profile.id})`)
        .single();

      if (existing) {
        return existing.id;
      }

      // Créer une nouvelle conversation
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          participant1_id: profile.id,
          participant2_id: participantId
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
  }, [profile]);

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
