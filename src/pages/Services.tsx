
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, Star, MapPin } from "lucide-react";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: 1,
      name: "Cartes de visite",
      category: "impression",
      description: "Cartes de visite professionnelles, plusieurs finitions disponibles",
      price: "5 USD",
      duration: "24h",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
      rating: 4.8,
      deliveryIncluded: true
    },
    {
      id: 2,
      name: "Affiches publicitaires",
      category: "impression",
      description: "Affiches haute qualité pour vos campagnes publicitaires",
      price: "15 USD",
      duration: "48h",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop",
      rating: 4.7,
      deliveryIncluded: true
    },
    {
      id: 3,
      name: "Brochures",
      category: "impression",
      description: "Brochures pliées professionnelles pour présenter vos services",
      price: "12 USD",
      duration: "48h",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop",
      rating: 4.9,
      deliveryIncluded: true
    },
    {
      id: 4,
      name: "Dépliants",
      category: "impression",
      description: "Dépliants informatifs avec pliage personnalisé",
      price: "8 USD",
      duration: "24h",
      image: "https://images.unsplash.com/photo-1586953208408-b95a79798f07?w=300&h=200&fit=crop",
      rating: 4.6,
      deliveryIncluded: true
    },
    {
      id: 5,
      name: "Documents officiels",
      category: "impression",
      description: "Impression de documents officiels sur papier de qualité",
      price: "3 USD",
      duration: "12h",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop",
      rating: 4.8,
      deliveryIncluded: true
    },
    {
      id: 6,
      name: "Invitations",
      category: "impression",
      description: "Invitations élégantes pour tous vos événements",
      price: "10 USD",
      duration: "36h",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop",
      rating: 4.9,
      deliveryIncluded: true
    },
    {
      id: 7,
      name: "T-shirts personnalisés",
      category: "textile",
      description: "T-shirts avec impression personnalisée haute qualité",
      price: "25 USD",
      duration: "72h",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop",
      rating: 4.7,
      deliveryIncluded: true
    },
    {
      id: 8,
      name: "Roll-up publicitaire",
      category: "signalétique",
      description: "Roll-up portable pour vos événements et salons",
      price: "80 USD",
      duration: "5 jours",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop",
      rating: 4.8,
      deliveryIncluded: true
    },
    {
      id: 9,
      name: "Calicot publicitaire",
      category: "signalétique",
      description: "Calicot résistant pour affichage extérieur",
      price: "60 USD",
      duration: "4 jours",
      image: "https://images.unsplash.com/photo-1586953208408-b95a79798f07?w=300&h=200&fit=crop",
      rating: 4.6,
      deliveryIncluded: true
    },
    {
      id: 10,
      name: "Bâche publicitaire",
      category: "signalétique",
      description: "Bâche grand format pour affichage publicitaire",
      price: "120 USD",
      duration: "7 jours",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop",
      rating: 4.9,
      deliveryIncluded: true
    }
  ];

  const categories = [
    { id: "all", name: "Tous les services" },
    { id: "impression", name: "Impression" },
    { id: "textile", name: "Textile" },
    { id: "signalétique", name: "Signalétique" }
  ];

  const filteredServices = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Services de Livraison Rapide
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Commandez vos supports de communication et recevez-les directement à domicile. 
            Qualité professionnelle garantie avec livraison rapide à Kinshasa.
          </p>
          
          {/* Avantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
              <Truck className="h-6 w-6 text-primary-600" />
              <span className="font-medium">Livraison gratuite</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
              <Clock className="h-6 w-6 text-primary-600" />
              <span className="font-medium">Délais respectés</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
              <Star className="h-6 w-6 text-primary-600" />
              <span className="font-medium">Qualité garantie</span>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                {service.deliveryIncluded && (
                  <Badge className="absolute top-3 right-3 bg-green-500">
                    <Truck className="h-3 w-3 mr-1" />
                    Livraison incluse
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">
                      {service.price}
                    </span>
                    <span className="text-gray-500 ml-1">/ unité</span>
                  </div>
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    Commander
                  </Button>
                </div>

                <div className="mt-3 flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Livraison à domicile - Kinshasa</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Besoin d'un service personnalisé ?
          </h2>
          <p className="text-gray-600 mb-6">
            Contactez notre équipe pour des demandes spéciales ou des volumes importants
          </p>
          <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
            Demander un devis
          </Button>
        </div>
      </div>
      
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Services;
