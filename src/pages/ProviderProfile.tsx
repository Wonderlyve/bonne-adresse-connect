
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, MessageCircle, ShoppingBag, Phone, Mail, ExternalLink, CheckCircle } from "lucide-react";

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data - in a real app, this would come from an API
  const provider = {
    id: 1,
    name: "Print Express",
    category: "Imprimerie",
    rating: 4.8,
    location: "Kinshasa, Gombe",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
    profileImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop",
    badge: "Boosté",
    reviews: 156,
    description: "Nous sommes une imprimerie moderne spécialisée dans l'impression de haute qualité. Avec plus de 10 ans d'expérience, nous offrons des services rapides et professionnels pour tous vos besoins d'impression.",
    phone: "+243 123 456 789",
    email: "contact@printexpress.cd",
    website: "www.printexpress.cd",
    services: [
      { name: "Impression de flyers", price: "À partir de 50$", description: "Flyers couleur haute qualité" },
      { name: "Cartes de visite", price: "À partir de 30$", description: "Cartes professionnelles" },
      { name: "Banderoles", price: "À partir de 100$", description: "Banderoles publicitaires" },
      { name: "Brochures", price: "À partir de 80$", description: "Brochures pliées" },
      { name: "Affiches", price: "À partir de 60$", description: "Affiches grand format" },
      { name: "Calendriers", price: "À partir de 120$", description: "Calendriers personnalisés" }
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop"
    ],
    features: [
      "Livraison rapide",
      "Qualité garantie",
      "Devis gratuit",
      "Service client 24/7",
      "Paiement sécurisé",
      "Révisions illimitées"
    ]
  };

  const handleContact = () => {
    navigate('/contact-provider');
  };

  const handleOrder = () => {
    navigate('/order-service');
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={provider.coverImage}
          alt={provider.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center space-x-4">
            <img
              src={provider.profileImage}
              alt={provider.name}
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-2xl font-bold">{provider.name}</h1>
                <Badge variant="secondary" className="text-xs">
                  {provider.badge}
                </Badge>
              </div>
              <p className="text-sm opacity-90">{provider.category}</p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{provider.rating}</span>
                  <span className="text-xs opacity-75">({provider.reviews} avis)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{provider.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>À propos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{provider.description}</p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Nos Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {provider.services.map((service, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <span className="text-primary-600 font-medium text-sm">{service.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {provider.portfolio.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                    onClick={handleOrder}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Commander un service
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary-200 text-primary-600 hover:bg-primary-50"
                    onClick={handleContact}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contacter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations de contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{provider.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{provider.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-primary-600 hover:underline cursor-pointer">
                    {provider.website}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Nos avantages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {provider.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile padding */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default ProviderProfile;
