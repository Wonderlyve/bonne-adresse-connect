
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, MessageCircle, ShoppingBag, Search, Filter } from "lucide-react";

const Providers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const providers = [
    {
      id: 1,
      name: "Print Express",
      category: "Imprimerie",
      rating: 4.8,
      location: "Kinshasa, Gombe",
      image: "/placeholder.svg",
      services: ["Flyers", "Cartes de visite", "Banderoles", "Affiches"],
      price: "À partir de 50$",
      badge: "Boosté",
      reviews: 156,
      isOnline: true,
      description: "Spécialiste de l'impression haute qualité depuis 10 ans"
    },
    {
      id: 2,
      name: "Creative Studio",
      category: "Design Graphique",
      rating: 4.9,
      location: "Kinshasa, Lingwala",
      image: "/placeholder.svg",
      services: ["Logo", "Branding", "Site web", "Packaging"],
      price: "À partir de 100$",
      badge: "Populaire",
      reviews: 89,
      isOnline: true,
      description: "Agence créative primée, experts en identité visuelle"
    },
    {
      id: 3,
      name: "Archi Plus",
      category: "Architecture",
      rating: 4.7,
      location: "Kinshasa, Ngaliema",
      image: "/placeholder.svg",
      services: ["Plans", "3D", "Permis", "Supervision"],
      price: "À partir de 500$",
      badge: "Nouveau",
      reviews: 34,
      isOnline: false,
      description: "Bureau d'architecture moderne et innovant"
    },
    // Add more providers for demonstration
    {
      id: 4,
      name: "Sign Master",
      category: "Signalétique",
      rating: 4.6,
      location: "Kinshasa, Kintambo",
      image: "/placeholder.svg",
      services: ["Enseignes", "Totems", "Panneaux", "Lettrage"],
      price: "À partir de 200$",
      badge: "Boosté",
      reviews: 67,
      isOnline: true,
      description: "Fabrication d'enseignes et signalétique sur mesure"
    },
    {
      id: 5,
      name: "Textile Pro",
      category: "Textile",
      rating: 4.5,
      location: "Kinshasa, Limete",
      image: "/placeholder.svg",
      services: ["T-shirts", "Casquettes", "Broderie", "Sérigraphie"],
      price: "À partir de 25$",
      badge: "",
      reviews: 78,
      isOnline: true,
      description: "Personnalisation textile de qualité professionnelle"
    },
    {
      id: 6,
      name: "Digital Agency",
      category: "Digital",
      rating: 4.8,
      location: "Kinshasa, Gombe",
      image: "/placeholder.svg",
      services: ["Sites web", "E-commerce", "SEO", "Marketing"],
      price: "À partir de 300$",
      badge: "Populaire",
      reviews: 124,
      isOnline: true,
      description: "Votre partenaire digital pour réussir en ligne"
    }
  ];

  const categories = [
    { value: "all", label: "Toutes catégories" },
    { value: "Imprimerie", label: "Imprimerie" },
    { value: "Design Graphique", label: "Design Graphique" },
    { value: "Architecture", label: "Architecture" },
    { value: "Signalétique", label: "Signalétique" },
    { value: "Textile", label: "Textile" },
    { value: "Digital", label: "Digital" }
  ];

  const locations = [
    { value: "all", label: "Toutes les villes" },
    { value: "Gombe", label: "Kinshasa, Gombe" },
    { value: "Lingwala", label: "Kinshasa, Lingwala" },
    { value: "Ngaliema", label: "Kinshasa, Ngaliema" },
    { value: "Kintambo", label: "Kinshasa, Kintambo" },
    { value: "Limete", label: "Kinshasa, Limete" }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Boosté": return "default";
      case "Populaire": return "secondary";
      case "Nouveau": return "destructive";
      default: return "outline";
    }
  };

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || provider.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trouvez votre prestataire
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos partenaires de confiance près de chez vous
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Rechercher un service ou prestataire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Localisation" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-primary-200 text-primary-600">
                <Filter className="h-4 w-4 mr-2" />
                Plus de filtres
              </Button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProviders.length} prestataire{filteredProviders.length > 1 ? 's' : ''} trouvé{filteredProviders.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  {provider.badge && (
                    <Badge variant={getBadgeVariant(provider.badge)} className="font-medium">
                      {provider.badge}
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  {provider.isOnline && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-ring"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full absolute"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
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

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {provider.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {provider.services.slice(0, 3).map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                  {provider.services.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{provider.services.length - 3}
                    </span>
                  )}
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
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contacter
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Commander
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProviders.length > 0 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-primary-200 text-primary-600 hover:bg-primary-50"
            >
              Charger plus de prestataires
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun prestataire trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedLocation("all");
              }}
              variant="outline"
              className="border-primary-200 text-primary-600"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Mobile padding */}
        <div className="h-20 md:h-0"></div>
      </div>
    </div>
  );
};

export default Providers;
