
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

export const useProfileUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const { profile, user } = useProfile();

  const updateProfile = async (updates: {
    full_name?: string;
    phone?: string;
  }) => {
    if (!user) return { error: 'Non connecté' };

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profil mis à jour avec succès');
      return { error: null };
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      toast.error('Erreur lors de la mise à jour');
      return { error: error.message };
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return { error: 'Non connecté' };

    setIsUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Supprimer l'ancienne photo si elle existe
      const { error: deleteError } = await supabase.storage
        .from('profile-pictures')
        .remove([fileName]);

      // Uploader la nouvelle photo
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Obtenir l'URL publique
      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      // Mettre à jour le profil avec la nouvelle URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast.success('Photo de profil mise à jour');
      return { error: null, url: data.publicUrl };
    } catch (error) {
      console.error('Erreur upload avatar:', error);
      toast.error('Erreur lors du téléchargement');
      return { error: error.message };
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return {
    updateProfile,
    uploadAvatar,
    isUpdating,
    isUploadingAvatar
  };
};
