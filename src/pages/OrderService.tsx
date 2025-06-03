
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Shield, MessageCircle, Phone } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import MaskedUserInfo from "@/components/MaskedUserInfo";
import ReportUser from "@/components/ReportUser";
import { useProfile } from "@/hooks/useProfile";
import SuspensionAlert from "@/components/SuspensionAlert";

const OrderServiceContent = () => {
  const [selectedService, setSelectedService] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSensitive, setShowSensitive] = useState(false);
  const { profile, isSuspended } = useProfile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const provider = {
    id: "provider-123",
    name: "Print Express",
    category: "Imprimerie",
    rating: 4.8,
    location: "Kinshasa, Gombe",
    email: "contact@printexpress.cd",
    phone: "+243 81 234 5678",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    reviews: 156,
    services: [
      { name: "Flyers A5", price: 50, unit: "1000 ex" },
      { name: "Cartes de visite", price: 30, unit: "500 ex" },
      { name: "Banderoles", price: 80, unit: "1 pièce" },
      { name: "Brochures", price: 120, unit: "100 ex" }
    ]
  };

  if (isSuspended) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SuspensionAlert 
            violationCount={profile?.violation_count || 0}
            onContactAdmin={() => window.open('mailto:superadmin@super.com')}
          />
        </div>
      </div>
    );
  }

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
                  <div className="flex space-x-2">
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Vérifié
                    </Badge>
                    <ReportUser 
                      reportedUserId={provider.id}
                      reportedUserName={provider.name}
                      size="sm"
                    />
                  </div>
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

                {/* Informations masquées */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Informations de contact</h4>
                  <MaskedUserInfo 
                    email={provider.email}
                    phone={provider.phone}
                    showSensitive={showSensitive}
                    onToggleSensitive={() => setShowSensitive(!showSensitive)}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Les contacts sont masqués pour votre sécurité. Utilisez la messagerie interne.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" disabled className="opacity-50">
                    <Phone className="h-4 w-4 mr-1" />
                    Appel (après commande)
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Sécurité renforcée</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Tous les paiements doivent être effectués via la plateforme. 
                  Tout paiement externe est aux risques de l'utilisateur et aucun support ne sera fourni en cas de litige.
                </p>
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
                    placeholder="Décrivez votre projet en détail... (évitez de partager vos coordonnées personnelles)"
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

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-xs text-yellow-800">
                    <strong>Rappel :</strong> Utilisez uniquement la messagerie interne pour communiquer. 
                    Les échanges de contacts sont interdits pour votre sécurité.
                  </p>
                </div>
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
