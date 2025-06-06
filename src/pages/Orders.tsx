
import { usePageReset } from "@/hooks/usePageReset";
import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, User, Package, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const Orders = () => {
  usePageReset();
  
  const { orders, loading, updateOrderStatus } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Acceptée';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes commandes</h1>
        <p className="text-gray-600">Suivez l'état de vos commandes</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune commande
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Vous n'avez pas encore passé de commande
            </p>
            <Button onClick={() => window.location.href = '/services'}>
              Découvrir nos services
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {order.service_name}
                  </CardTitle>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Commande #{order.id.slice(0, 8)}
                </p>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Prestataire</p>
                      <p className="font-medium">
                        {order.provider?.company_name || order.provider?.full_name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Montant</p>
                      <p className="font-medium">{order.amount} USD</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Créée</p>
                      <p className="font-medium">
                        {formatDistanceToNow(new Date(order.created_at), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {order.deadline && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Échéance</p>
                        <p className="font-medium">
                          {new Date(order.deadline).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {order.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-gray-800">{order.description}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contacter
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      >
                        Annuler
                      </Button>
                    )}
                    
                    {order.status === 'completed' && (
                      <Button size="sm">
                        Laisser un avis
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
