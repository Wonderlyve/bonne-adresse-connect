
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';

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
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useProfile();

  const handleSubmit = async () => {
    if (!user || !reason) return;

    setIsSubmitting(true);
    try {
      const finalReason = reason === 'autre' ? customReason : reason;
      
      await supabase.from('reports').insert({
        reported_user_id: reportedUserId,
        reporter_id: user.id,
        reason: finalReason
      } as any);

      toast.success('Signalement envoyé avec succès');
      setIsOpen(false);
      setReason('');
      setCustomReason('');
    } catch (error) {
      console.error('Erreur signalement:', error);
      toast.error('Erreur lors du signalement');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size={size}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <AlertTriangle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Signaler {reportedUserName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Motif du signalement</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un motif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="harassment">Harcèlement</SelectItem>
                <SelectItem value="inappropriate">Contenu inapproprié</SelectItem>
                <SelectItem value="scam">Arnaque</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {reason === 'autre' && (
            <div>
              <Label>Précisez le motif</Label>
              <Textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Décrivez le problème..."
                rows={3}
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!reason || isSubmitting || (reason === 'autre' && !customReason)}
            >
              {isSubmitting ? 'Envoi...' : 'Signaler'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportUser;
