import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const FeaturedProviders = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleContactClick = (providerId: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/contact-provider?id=${providerId}`);
  };

  const handleOrderClick = (providerId: number) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/order-service?id=${providerId}`);
  };

  const providers = [
    {
      id: 1,
      name: "Print Express",
      category: "Imprimerie",
      rating: 4.8,
      reviews: 156,
      location: "Kinshasa",
      domain: "Gombe",
      price: "À partir de 50$",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      services: ["Flyers", "Cartes de visite", "Banderoles", "Brochures"],
      verified: true
    },
    {
      id: 2,
      name: "Creative Studio",
      category: "Design Graphique",
      rating: 4.9,
      reviews: 203,
      location: "Kinshasa",
      domain: "Lemba",
      price: "À partir de 80$",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
      services: ["Logo", "Identité visuelle", "Packaging", "Web design"],
      verified: true
    },
    {
      id: 3,
      name: "TechDev Solutions",
      category: "Développement Web",
      rating: 4.7,
      reviews: 89,
      location: "Kinshasa",
      domain: "Kalamu",
      price: "À partir de 200$",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop",
      services: ["Site web", "Application mobile", "E-commerce", "Backend"],
      verified: true
    },
    {
      id: 4,
      name: "ArchiPlan",
      category: "Architecture",
      rating: 4.6,
      reviews: 67,
      location: "Kinshasa",
      domain: "Ngaliema",
      price: "À partir de 500$",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
      services: ["Plans", "Suivi de chantier", "Décoration", "Consultation"],
      verified: true
    },
    {
      id: 5,
      name: "Digital Marketing Pro",
      category: "Marketing Digital",
      rating: 4.8,
      reviews: 134,
      location: "Kinshasa",
      domain: "Gombe",
      price: "À partir de 100$",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      services: ["SEO", "Publicité Facebook", "Content marketing", "Analytics"],
      verified: true
    },
    {
      id: 6,
      name: "Photo Studio Max",
      category: "Photographie",
      rating: 4.9,
      reviews: 178,
      location: "Kinshasa",
      domain: "Bandalungwa",
      price: "À partir de 120$",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e4d40834?w=400&h=300&fit=crop",
      services: ["Portrait", "Événement", "Produit", "Mariage"],
      verified: true
    }
  ];

  const categories = [
    {
      title: "Prestataires d'Imprimerie",
      providers: providers.filter(p => p.category === "Imprimerie")
    },
    {
      title: "Designers Graphiques",
      providers: providers.filter(p => p.category === "Design Graphique")
    },
    {
      title: "Architectes",
      providers: providers.filter(p => p.category === "Architecture")
    },
    {
      title: "Développeurs Web",
      providers: providers.filter(p => p.category === "Développement Web")
    },
    {
      title: "Marketing Digital",
      providers: providers.filter(p => p.category === "Marketing Digital")
    }
  ];

  const ProviderCard = ({ provider, isAd = false }: { provider?: any, isAd?: boolean }) => {
    if (isAd) {
      return (
        <Card className="h-full border-2 border-dashed border-yellow-300 bg-yellow-50">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="relative h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg mb-3 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="font-bold text-lg">Votre Pub Ici</h3>
                <p className="text-sm">Contactez-nous</p>
              </div>
              <Badge className="absolute top-2 right-2 bg-yellow-600 text-white text-xs">
                Sponsorisé
              </Badge>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Espace Publicitaire</h3>
                <p className="text-sm text-gray-600">Faites connaître vos services</p>
              </div>
              <Button size="sm" className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700">
                En savoir plus
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => navigate(`/provider/${provider.id}`)}>
        <CardContent className="p-4 h-full flex flex-col">
          <div className="relative mb-3">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            {provider.verified && (
              <Badge className="absolute top-2 right-2 bg-green-600 text-white text-xs">
                Vérifié
              </Badge>
            )}
          </div>
          
          <div className="flex-1 flex flex-col">
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
              {provider.name}
            </h3>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {provider.location}, {provider.domain}
              </span>
            </div>
            
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{provider.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({provider.reviews})</span>
            </div>
            
            <div className="flex-1">
              <div className="flex overflow-x-auto scrollbar-hide gap-1 pb-1 mb-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {provider.services.map((service: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs whitespace-nowrap">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 mt-auto">
              <p className="text-sm font-medium text-primary-600">{provider.price}</p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 text-xs py-1 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContactClick(provider.id);
                  }}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Contacter
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 text-xs py-1 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrderClick(provider.id);
                  }}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Commander
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CategorySection = ({ title, providers }: { title: string, providers: any[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;
    const maxIndex = Math.max(0, Math.ceil((providers.length + 1) / itemsPerPage) - 1);

    const nextSlide = () => {
      setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    const displayProviders = [...providers];
    const adIndex = Math.floor(displayProviders.length / 2);
    displayProviders.splice(adIndex, 0, { isAd: true });

    const startIndex = currentIndex * itemsPerPage;
    const visibleProviders = displayProviders.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="flex items-center gap-4">
            <Link to="/providers" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Voir tout
            </Link>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProviders.map((provider, index) => (
            <ProviderCard 
              key={provider.isAd ? `ad-${index}` : provider.id} 
              provider={provider.isAd ? undefined : provider}
              isAd={provider.isAd}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.map((category, index) => (
          <CategorySection 
            key={index}
            title={category.title}
            providers={category.providers}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProviders;
