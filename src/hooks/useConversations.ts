
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';

export const useConversations = () => {
  const navigate = useNavigate();
  const { user } = useProfile();
  const [isCreating, setIsCreating] = useState(false);

  const createOrFindConversation = async (providerId: number) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour envoyer un message');
      navigate('/login');
      return;
    }

    setIsCreating(true);
    try {
      // Créer une conversation avec un ID unique pour le prestataire
      const providerUserId = `provider_${providerId}`;
      
      // Vérifier si une conversation existe déjà
      const { data: existingConv, error: searchError } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${providerUserId}),and(participant1_id.eq.${providerUserId},participant2_id.eq.${user.id})`)
        .maybeSingle();

      if (searchError && searchError.code !== 'PGRST116') {
        throw searchError;
      }

      let conversationId;

      if (existingConv) {
        conversationId = existingConv.id;
      } else {
        // Créer une nouvelle conversation
        const { data: newConv, error: createError } = await supabase
          .from('conversations')
          .insert({
            participant1_id: user.id,
            participant2_id: providerUserId
          })
          .select('id')
          .single();

        if (createError) throw createError;
        conversationId = newConv.id;
      }

      navigate(`/chat/${conversationId}`);
    } catch (error) {
      console.error('Erreur création conversation:', error);
      toast.error('Erreur lors de la création de la conversation');
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createOrFindConversation,
    isCreating
  };
};
