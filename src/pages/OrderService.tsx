import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Shield, MessageCircle, Phone } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const OrderServiceContent = () => {
  const [selectedService, setSelectedService] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const provider = {
    name: "Print Express",
    category: "Imprimerie",
    rating: 4.8,
    location: "Kinshasa, Gombe",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    reviews: 156,
    services: [
      { name: "Flyers A5", price: 50, unit: "1000 ex" },
      { name: "Cartes de visite", price: 30, unit: "500 ex" },
      { name: "Banderoles", price: 80, unit: "1 pièce" },
      { name: "Brochures", price: 120, unit: "100 ex" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provider Info */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
                    <p className="text-gray-600">{provider.category}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Vérifié
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {provider.rating} ({provider.reviews} avis)
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {provider.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Répond en 2h
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Appeler
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Commander un service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choisissez un service
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {provider.services.map((service) => (
                      <div
                        key={service.name}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedService === service.name
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedService(service.name)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-gray-600">{service.unit}</p>
                          </div>
                          <p className="font-bold text-primary-600">{service.price}$</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description détaillée (optionnel)
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    placeholder="Décrivez votre projet en détail..."
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date limite souhaitée
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedService && (
                  <>
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-medium">{selectedService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantité:</span>
                      <span>{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prix unitaire:</span>
                      <span>
                        {provider.services.find(s => s.name === selectedService)?.price}$
                      </span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary-600">
                        {(provider.services.find(s => s.name === selectedService)?.price || 0) * quantity}$
                      </span>
                    </div>
                  </>
                )}
                
                <Button 
                  className="w-full"
                  disabled={!selectedService}
                >
                  Envoyer la demande
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Aucun paiement requis maintenant. Le prestataire vous contactera avec un devis détaillé.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

const OrderService = () => {
  return (
    <ProtectedRoute>
      <OrderServiceContent />
    </ProtectedRoute>
  );
};

export default OrderService;
