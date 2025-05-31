
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Package, Truck, CheckCircle, MessageCircle, Star } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "CMD-2024-001",
      provider: "Print Express",
      service: "Impression Flyers A5",
      quantity: "1000 exemplaires",
      price: 75,
      status: "delivered",
      statusText: "Livré",
      date: "15 Jan 2024",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=150&fit=crop"
    },
    {
      id: "CMD-2024-002",
      provider: "Creative Studio",
      service: "Création de Logo",
      quantity: "1 logo + variantes",
      price: 150,
      status: "in_progress",
      statusText: "En cours",
      date: "20 Jan 2024",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=150&fit=crop"
    },
    {
      id: "CMD-2024-003",
      provider: "Archi Plus",
      service: "Plan d'architecture",
      quantity: "Plans maison 150m²",
      price: 800,
      status: "pending",
      statusText: "En attente",
      date: "22 Jan 2024",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=150&fit=crop"
    },
    {
      id: "CMD-2024-004",
      provider: "Sign Master",
      service: "Enseigne lumineuse",
      quantity: "1 enseigne 2x1m",
      price: 450,
      status: "shipped",
      statusText: "Expédié",
      date: "25 Jan 2024",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=150&fit=crop"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "in_progress": return <Package className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Commandes</h1>
          <p className="text-gray-600">Suivez l'état de vos commandes et projets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{order.service}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{order.provider}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                    {getStatusIcon(order.status)}
                    {order.statusText}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <img
                    src={order.image}
                    alt={order.service}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Commande:</span>
                        <span className="font-medium">{order.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantité:</span>
                        <span>{order.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span>{order.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Prix:</span>
                        <span className="font-bold text-primary-600">{order.price}$</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contacter
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Star className="h-4 w-4 mr-1" />
                      Évaluer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Orders;
