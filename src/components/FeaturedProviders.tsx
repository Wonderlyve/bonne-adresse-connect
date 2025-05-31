
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedProviders = () => {
  const navigate = useNavigate();

  const providerCategories = [
    {
      title: "Imprimerie",
      providers: [
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
        {
          id: 3,
          name: "Digital Print",
          category: "Imprimerie",
          rating: 4.7,
          location: "Kinshasa, Lingwala",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
          services: ["Roll-up", "Bâches", "Vinyles"],
          price: "À partir de 80$",
          badge: "Nouveau",
          reviews: 45,
          isOnline: false
        },
        {
          id: 4,
          name: "Pro Print",
          category: "Imprimerie",
          rating: 4.9,
          location: "Kinshasa, Ngaliema",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
          services: ["Magazines", "Livres", "Catalogues"],
          price: "À partir de 100$",
          badge: "Premium",
          reviews: 234,
          isOnline: true
        },
        {
          id: 5,
          name: "Flash Print",
          category: "Imprimerie",
          rating: 4.5,
          location: "Kinshasa, Masina",
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
          services: ["Stickers", "Étiquettes", "Badges"],
          price: "À partir de 25$",
          badge: "Rapide",
          reviews: 67,
          isOnline: true
        }
      ]
    },
    {
      title: "Design Graphique",
      providers: [
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
        {
          id: 8,
          name: "Visual Impact",
          category: "Design Graphique",
          rating: 4.8,
          location: "Kinshasa, Kalamu",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
          services: ["Publicité", "Réseaux sociaux", "Print"],
          price: "À partir de 80$",
          badge: "Tendance",
          reviews: 98,
          isOnline: false
        },
        {
          id: 9,
          name: "Pixel Perfect",
          category: "Design Graphique",
          rating: 4.6,
          location: "Kinshasa, Bandalungwa",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
          services: ["UI/UX", "Apps", "Web"],
          price: "À partir de 200$",
          badge: "Digital",
          reviews: 76,
          isOnline: true
        },
        {
          id: 10,
          name: "Brand Makers",
          category: "Design Graphique",
          rating: 4.9,
          location: "Kinshasa, Limete",
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
          services: ["Identité", "Charte", "Guidelines"],
          price: "À partir de 300$",
          badge: "Expert",
          reviews: 156,
          isOnline: true
        }
      ]
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

  const handleContact = () => {
    navigate('/contact-provider');
  };

  const handleOrder = () => {
    navigate('/order-service');
  };

  const ProviderCard = ({ provider }: { provider: any }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden group min-w-[260px] max-w-[260px]">
      <div className="relative">
        <img
          src={provider.image}
          alt={provider.name}
          className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <Badge variant={getBadgeVariant(provider.badge)} className="font-medium text-xs">
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

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-base text-gray-900 mb-1">{provider.name}</h3>
            <p className="text-xs text-gray-600">{provider.category}</p>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs font-medium text-gray-700">{provider.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-xs mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{provider.location}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {provider.services.slice(0, 3).map((service: string) => (
            <span
              key={service}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {service}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-primary-600 text-sm">{provider.price}</span>
          <span className="text-xs text-gray-500">({provider.reviews} avis)</span>
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-primary-200 text-primary-600 hover:bg-primary-50 text-xs"
            onClick={handleContact}
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Contacter
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-xs"
            onClick={handleOrder}
          >
            <ShoppingBag className="h-3 w-3 mr-1" />
            Commander
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-4">
        {providerCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-base font-medium text-gray-700 mb-3">{category.title}</h3>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {category.providers.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
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
