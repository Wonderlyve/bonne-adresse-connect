
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Service } from "@/hooks/useServices";
import { useOrders } from "@/hooks/useOrders";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
}

const OrderDialog = ({ open, onOpenChange, service }: OrderDialogProps) => {
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createOrder } = useOrders();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    setIsSubmitting(true);
    try {
      const orderData = {
        provider_id: service.provider_id,
        service_name: service.title,
        description,
        amount: service.price_min,
        deadline: deadline || null,
        status: 'pending'
      };

      const order = await createOrder(orderData);
      if (order) {
        onOpenChange(false);
        setDescription("");
        setDeadline("");
      }
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Passer commande</DialogTitle>
          <DialogDescription>
            Remplissez les détails de votre commande pour {service?.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Input
              id="service"
              value={service?.title || ""}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">Prestataire</Label>
            <Input
              id="provider"
              value={service?.provider?.company_name || service?.provider?.full_name || ""}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description de votre demande *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez en détail ce dont vous avez besoin..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Date limite souhaitée</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-700">
              <strong>Prix indicatif :</strong> {service?.price_min} - {service?.price_max} {service?.price_unit}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Le prix final sera confirmé par le prestataire
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !description.trim()}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
            >
              {isSubmitting ? "Envoi..." : "Passer commande"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
