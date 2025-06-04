
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useProfileUpdate = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const updateProfile = async (profileData: {
    full_name?: string;
    phone?: string;
    email?: string;
  }) => {
    try {
      setIsUpdating(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Utilisateur non connecté');
      }

      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profil mis à jour avec succès');
      return true;
    } catch (error) {
      console.error('Erreur mise à jour profil:', error);
      toast.error('Erreur lors de la mise à jour du profil');
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const uploadProfilePhoto = async (file: File) => {
    try {
      setIsUploadingPhoto(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Utilisateur non connecté');
      }

      // Créer un nom unique pour le fichier
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;

      // Supprimer l'ancienne photo si elle existe
      await supabase.storage
        .from('profile-pictures')
        .remove([fileName]);

      // Télécharger la nouvelle photo
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Obtenir l'URL publique
      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      // Mettre à jour l'URL dans le profil
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast.success('Photo de profil mise à jour');
      return data.publicUrl;
    } catch (error) {
      console.error('Erreur upload photo:', error);
      toast.error('Erreur lors du téléchargement de la photo');
      return null;
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  return {
    updateProfile,
    uploadProfilePhoto,
    isUpdating,
    isUploadingPhoto
  };
};
