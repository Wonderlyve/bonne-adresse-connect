
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useMessageFilter = () => {
  const [isChecking, setIsChecking] = useState(false);

  const sensitivePatterns = {
    phone: /(\+243|089|081|082|08|\+2|09)/gi,
    email: /@|\.com|\.fr|\.cd/gi,
    keywords: /whatsapp|appel|momo|numéro|paiement direct|orange|airtel|mp|voda|africell|afri|transfert|contact|téléphone|numero|telephone/gi
  };

  const checkMessage = async (content: string, userId: string): Promise<boolean> => {
    setIsChecking(true);
    
    try {
      let violationType = '';
      let hasViolation = false;

      // Vérifier les numéros de téléphone
      if (sensitivePatterns.phone.test(content)) {
        violationType = 'phone_number';
        hasViolation = true;
      }
      // Vérifier les emails
      else if (sensitivePatterns.email.test(content)) {
        violationType = 'email_address';
        hasViolation = true;
      }
      // Vérifier les mots-clés sensibles
      else if (sensitivePatterns.keywords.test(content)) {
        violationType = 'sensitive_keywords';
        hasViolation = true;
      }

      if (hasViolation) {
        // Enregistrer la violation
        await supabase.from('message_flags').insert({
          user_id: userId,
          message_content: content,
          type_violation: violationType
        });

        // Vérifier et suspendre l'utilisateur si nécessaire
        await supabase.rpc('check_and_suspend_user', { user_uuid: userId });

        toast.error('❌ Pour votre sécurité, les échanges de contacts et paiements directs sont interdits sur la plateforme.');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification du message:', error);
      return true; // En cas d'erreur, on laisse passer le message
    } finally {
      setIsChecking(false);
    }
  };

  return { checkMessage, isChecking };
};
