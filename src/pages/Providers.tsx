
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, MessageCircle, ShoppingBag, Search, Filter } from "lucide-react";

const Providers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data - combine all providers from FeaturedProviders
  const allProviders = [
    // Imprimerie
    {
      id: 1,
      name: "Print Express",
      category: "Imprimerie",
      rating: 4.8,
      location: "Kinshasa, Gombe",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      services: ["Flyers", "Cartes de visite", "Banderoles"],
      price: "À partir de 50$",
      badge: "Boosté",
      reviews: 156,
      isOnline: true
    },
    {
      id: 2,
      name: "Quick Print",
      category: "Imprimerie",
      rating: 4.6,
      location: "Kinshasa, Kintambo",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      services: ["Brochures", "Affiches", "Calendriers"],
      price: "À partir de 40$",
      badge: "Populaire",
      reviews: 89,
      isOnline: true
    },
    // Design Graphique
    {
      id: 6,
      name: "Creative Studio",
      category: "Design Graphique",
      rating: 4.9,
      location: "Kinshasa, Lingwala",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      services: ["Logo", "Branding", "Site web"],
      price: "À partir de 100$",
      badge: "Populaire",
      reviews: 189,
      isOnline: true
    },
    {
      id: 7,
      name: "Art Design",
      category: "Design Graphique",
      rating: 4.7,
      location: "Kinshasa, Gombe",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      services: ["Illustrations", "Packaging", "Motion"],
      price: "À partir de 150$",
      badge: "Créatif",
      reviews: 134,
      isOnline: true
    },
    // Architecture
    {
      id: 11,
      name: "Archi Pro",
      category: "Architecture",
      rating: 4.8,
      location: "Kinshasa, Gombe",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
      services: ["Plans", "3D", "Permis"],
      price: "À partir de 500$",
      badge: "Certifié",
      reviews: 78,
      isOnline: true
    },
    {
      id: 12,
      name: "Design Build",
      category: "Architecture",
      rating: 4.7,
      location: "Kinshasa, Ngaliema",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      services: ["Résidentiel", "Commercial", "Rénovation"],
      price: "À partir de 800$",
      badge: "Premium",
      reviews: 92,
      isOnline: false
    },
    // Développement Web
    {
      id: 15,
      name: "WebCraft Studio",
      category: "Développement",
      rating: 4.9,
      location: "Kinshasa, Gombe",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      services: ["Sites web", "E-commerce", "Applications"],
      price: "À partir de 300$",
      badge: "Top Dev",
      reviews: 145,
      isOnline: true
    },
    {
      id: 16,
      name: "Digital Solutions",
      category: "Développement",
      rating: 4.8,
      location: "Kinshasa, Lingwala",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      services: ["Mobile Apps", "Backend", "API"],
      price: "À partir de 400$",
      badge: "Mobile",
      reviews: 98,
      isOnline: true
    },
    // Marketing Digital
    {
      id: 19,
      name: "Social Media Pro",
      category: "Marketing",
      rating: 4.8,
      location: "Kinshasa, Gombe",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      services: ["Réseaux sociaux", "Content", "Stratégie"],
      price: "À partir de 200$",
      badge: "Social",
      reviews: 156,
      isOnline: true
    },
    {
      id: 20,
      name: "SEO Masters",
      category: "Marketing",
      rating: 4.7,
      location: "Kinshasa, Kintambo",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
      services: ["SEO", "SEM", "Analytics"],
      price: "À partir de 250$",
      badge: "SEO Expert",
      reviews: 134,
      isOnline: true
    }
  ];

  const categories = ["all", "Imprimerie", "Design Graphique", "Architecture", "Développement", "Marketing"];
  const locations = ["all", "Gombe", "Kintambo", "Lingwala", "Ngaliema", "Kalamu", "Bandalungwa", "Masina", "Limete"];

  const filteredProviders = allProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || provider.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Boosté": return "default";
      case "Populaire": return "secondary";
      case "Nouveau": return "destructive";
      default: return "outline";
    }
  };

  const handleContact = () => {
    navigate('/contact-provider');
  };

  const handleOrder = () => {
    navigate('/order-service');
  };

  const handleProviderClick = (providerId: number) => {
    navigate(`/provider/${providerId}`);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prestataires</h1>
          <p className="text-gray-600">Découvrez nos prestataires de confiance</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher un prestataire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "Toutes les catégories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === "all" ? "Toutes les zones" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filtres avancés
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredProviders.length} prestataire{filteredProviders.length > 1 ? 's' : ''} trouvé{filteredProviders.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProviders.map((provider) => (
            <Card 
              key={provider.id} 
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleProviderClick(provider.id)}
            >
              <div className="relative">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant={getBadgeVariant(provider.badge)} className="text-xs">
                    {provider.badge}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  {provider.isOnline && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-ring"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full absolute"></div>
                    </div>
                  )}
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{provider.name}</h3>
                    <p className="text-sm text-gray-600">{provider.category}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{provider.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{provider.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {provider.services.slice(0, 3).map((service: string) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-primary-600">{provider.price}</span>
                  <span className="text-sm text-gray-500">({provider.reviews} avis)</span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-primary-200 text-primary-600 hover:bg-primary-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContact();
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contacter
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrder();
                    }}
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Commander
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun prestataire trouvé pour ces critères</p>
          </div>
        )}
      </div>

      {/* Mobile padding */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Providers;
