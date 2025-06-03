
import React, { useState } from 'react';
import { Flag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useProfile } from '@/hooks/useProfile';

interface ReportUserProps {
  reportedUserId: string;
  reportedUserName: string;
  size?: 'sm' | 'default';
}

const ReportUser: React.FC<ReportUserProps> = ({ 
  reportedUserId, 
  reportedUserName,
  size = 'default' 
}) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !reason.trim()) {
      toast.error('Veuillez remplir la raison du signalement');
      return;
    }

    if (user.id === reportedUserId) {
      toast.error('Vous ne pouvez pas vous signaler vous-même');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('reports').insert({
        reported_user_id: reportedUserId,
        reporter_id: user.id,
        reason: reason.trim()
      });

      if (error) throw error;

      // Vérifier et suspendre l'utilisateur si nécessaire
      await supabase.rpc('check_and_suspend_user', { user_uuid: reportedUserId });

      toast.success('Signalement envoyé avec succès');
      setOpen(false);
      setReason('');
    } catch (error) {
      console.error('Erreur lors du signalement:', error);
      toast.error('Erreur lors de l\'envoi du signalement');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size={size}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Flag className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} mr-1`} />
          Signaler
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Signaler {reportedUserName}</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="reason">Raison du signalement</Label>
            <Textarea
              id="reason"
              placeholder="Décrivez la raison de votre signalement (violation des règles, comportement inapproprié, etc.)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-800">
              <strong>Important :</strong> Les faux signalements peuvent entraîner des sanctions sur votre compte.
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !reason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? 'Envoi...' : 'Envoyer le signalement'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportUser;
