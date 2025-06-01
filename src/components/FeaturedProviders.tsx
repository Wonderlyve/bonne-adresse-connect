import { useState } from "react";
import { Star, MapPin, Clock, MessageCircle, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const FeaturedProviders = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const providers = [
    {
      id: 1,
      name: "Print Express",
      domain: "Imprimerie",
      address: "Kinshasa, Gombe",
      rating: 4.8,
      reviews: 156,
      responseTime: "2h",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      services: ["Flyers", "Cartes de visite", "Banderoles", "Brochures", "Affiches publicitaires"],
      verified: true,
      priceRange: "10-200$"
    },
    {
      id: 2,
      name: "Global Design",
      domain: "Design Graphique",
      address: "Lubumbashi, Centre-ville",
      rating: 4.5,
      reviews: 89,
      responseTime: "3h",
      image: "https://images.unsplash.com/photo-1618046358514-9ff8e56c4709?w=400&h=300&fit=crop",
      services: ["Logos", "Identité visuelle", "Packaging", "Illustrations"],
      verified: false,
      priceRange: "50-500$"
    },
    {
      id: 3,
      name: "ArchiTech Solutions",
      domain: "Architecture",
      address: "Goma, Volcans",
      rating: 4.9,
      reviews: 212,
      responseTime: "1h",
      image: "https://images.unsplash.com/photo-1559526663-1ca6c347e09f?w=400&h=300&fit=crop",
      services: ["Plans de construction", "Design intérieur", "Modélisation 3D", "Rénovation"],
      verified: true,
      priceRange: "100-1000+$"
    },
    {
      id: 4,
      name: "CodeMaster Digital",
      domain: "Développement Web",
      address: "Mbuji-Mayi, Mining District",
      rating: 4.6,
      reviews: 142,
      responseTime: "4h",
      image: "https://images.unsplash.com/photo-1583508915404-24c8244c4115?w=400&h=300&fit=crop",
      services: ["Sites web", "Applications mobiles", "E-commerce", "SEO"],
      verified: false,
      priceRange: "200-2000$"
    },
    {
      id: 5,
      name: "Event Horizon",
      domain: "Organisation d'événements",
      address: "Kisangani, Fleuve Congo",
      rating: 4.7,
      reviews: 95,
      responseTime: "2h",
      image: "https://images.unsplash.com/photo-1504610926078-a163c2c98e2f?w=400&h=300&fit=crop",
      services: ["Mariages", "Conférences", "Soirées d'entreprise", "Anniversaires"],
      verified: true,
      priceRange: "500-5000$"
    }
  ];

  const handleAction = (action: 'contact' | 'order', providerId: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (action === 'contact') {
      navigate('/contact-provider');
    } else {
      navigate('/order-service');
    }
  };

  const cardsToShow = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, providers.length - cardsToShow)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prestataires Recommandés
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos meilleurs prestataires vérifiés et notés par la communauté
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            disabled={currentIndex >= providers.length - cardsToShow}
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Cards container */}
          <div className="overflow-hidden mx-8">
            <div 
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                width: `${(providers.length / cardsToShow) * 100}%`
              }}
            >
              {providers.map((provider) => (
                <Card key={provider.id} className="flex-shrink-0 w-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Link to={`/provider/${provider.id}`}>
                        <img
                          src={provider.image}
                          alt={provider.name}
                          className="w-full h-48 object-cover rounded-t-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      {provider.verified && (
                        <Badge className="absolute top-3 right-3 bg-green-100 text-green-800 border-green-200">
                          Vérifié
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Link to={`/provider/${provider.id}`}>
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors cursor-pointer">
                              {provider.name}
                            </h3>
                          </Link>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <span>{provider.domain}</span>
                            <span className="mx-2">•</span>
                            <span>{provider.address}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{provider.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">({provider.reviews})</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Répond en {provider.responseTime}</span>
                        <span className="ml-auto font-medium text-primary-600">{provider.priceRange}</span>
                      </div>

                      {/* Services horizontales avec scroll */}
                      <div className="mb-6">
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          {provider.services.map((service, index) => (
                            <Badge key={index} variant="secondary" className="whitespace-nowrap flex-shrink-0 bg-gray-100 text-gray-700 hover:bg-gray-200">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-primary-200 text-primary-600 hover:bg-primary-50"
                          onClick={() => handleAction('contact', provider.id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contacter
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                          onClick={() => handleAction('order', provider.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Commander
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary-200 text-primary-600 hover:bg-primary-50" asChild>
            <Link to="/providers">
              Voir tous les prestataires
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
