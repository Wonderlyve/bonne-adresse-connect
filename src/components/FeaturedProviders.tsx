
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, ShoppingBag } from "lucide-react";

const FeaturedProviders = () => {
  const providers = [
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
      name: "Creative Studio",
      category: "Design Graphique",
      rating: 4.9,
      location: "Kinshasa, Lingwala",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      services: ["Logo", "Branding", "Site web"],
      price: "À partir de 100$",
      badge: "Populaire",
      reviews: 89,
      isOnline: true
    },
    {
      id: 3,
      name: "Archi Plus",
      category: "Architecture",
      rating: 4.7,
      location: "Kinshasa, Ngaliema",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      services: ["Plans", "3D", "Permis"],
      price: "À partir de 500$",
      badge: "Nouveau",
      reviews: 34,
      isOnline: false
    },
    {
      id: 4,
      name: "Sign Master",
      category: "Signalétique",
      rating: 4.6,
      location: "Kinshasa, Kintambo",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      services: ["Enseignes", "Totems", "Panneaux"],
      price: "À partir de 200$",
      badge: "Boosté",
      reviews: 67,
      isOnline: true
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Boosté": return "default";
      case "Populaire": return "secondary";
      case "Nouveau": return "destructive";
      default: return "outline";
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Prestataires en vedette
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez nos partenaires de confiance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {providers.map((provider) => (
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
                <Badge variant={getBadgeVariant(provider.badge)} className="font-medium">
                  {provider.badge}
                </Badge>
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

              <div className="flex flex-wrap gap-1 mb-4">
                {provider.services.slice(0, 3).map((service) => (
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

      <div className="text-center">
        <Button
          variant="outline"
          size="lg"
          className="border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300"
        >
          Voir tous les prestataires
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProviders;
