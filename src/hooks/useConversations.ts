
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';

export const useConversations = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useProfile();

  const createOrGetConversation = async (otherUserId: string) => {
    if (!user) return null;
    
    try {
      setIsCreating(true);

      // Vérifier si une conversation existe déjà
      const { data: existingConv, error: searchError } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${otherUserId}),and(participant1_id.eq.${otherUserId},participant2_id.eq.${user.id})`)
        .single();

      if (searchError && searchError.code !== 'PGRST116') {
        throw searchError;
      }

      if (existingConv) {
        return existingConv.id;
      }

      // Créer une nouvelle conversation
      const { data: newConv, error: createError } = await supabase
        .from('conversations')
        .insert({
          participant1_id: user.id,
          participant2_id: otherUserId
        })
        .select('id')
        .single();

      if (createError) throw createError;

      return newConv.id;
    } catch (error) {
      console.error('Erreur création conversation:', error);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createOrGetConversation,
    isCreating
  };
};
