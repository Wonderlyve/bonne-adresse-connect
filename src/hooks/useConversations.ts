
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export const useConversations = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useProfile();
  const navigate = useNavigate();

  const createOrGetConversation = async (otherUserId: string) => {
    if (!user) {
      toast.error('Vous devez être connecté pour envoyer un message');
      return;
    }

    if (user.id === otherUserId) {
      toast.error('Vous ne pouvez pas vous envoyer un message à vous-même');
      return;
    }

    setIsCreating(true);
    try {
      // Vérifier si une conversation existe déjà
      const { data: existingConversation, error: searchError } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${otherUserId}),and(participant1_id.eq.${otherUserId},participant2_id.eq.${user.id})`)
        .single();

      if (searchError && searchError.code !== 'PGRST116') {
        throw searchError;
      }

      if (existingConversation) {
        // Conversation existe, rediriger vers celle-ci
        navigate(`/chat/${existingConversation.id}`);
        return;
      }

      // Créer une nouvelle conversation
      const { data: newConversation, error: createError } = await supabase
        .from('conversations')
        .insert({
          participant1_id: user.id,
          participant2_id: otherUserId
        })
        .select('id')
        .single();

      if (createError) throw createError;

      // Rediriger vers la nouvelle conversation
      navigate(`/chat/${newConversation.id}`);

    } catch (error) {
      console.error('Erreur lors de la création de la conversation:', error);
      toast.error('Erreur lors de la création de la conversation');
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createOrGetConversation,
    isCreating
  };
};
