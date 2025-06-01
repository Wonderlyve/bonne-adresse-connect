
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, ShoppingBag, ExternalLink } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

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
          id: "ad1",
          name: "Publicité",
          category: "Sponsorisé",
          rating: null,
          location: "Promotion",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
          services: ["Promotion spéciale"],
          price: "Offre limitée",
          badge: "Sponsorisé",
          reviews: null,
          isOnline: false,
          isAd: true
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
          id: "ad2",
          name: "Publicité",
          category: "Sponsorisé",
          rating: null,
          location: "Promotion",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
          services: ["Design premium"],
          price: "Découvrir",
          badge: "Sponsorisé",
          reviews: null,
          isOnline: false,
          isAd: true
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
    },
    {
      title: "Architecture",
      providers: [
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
        {
          id: "ad3",
          name: "Publicité",
          category: "Sponsorisé",
          rating: null,
          location: "Promotion",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
          services: ["Architecture moderne"],
          price: "Consulter",
          badge: "Sponsorisé",
          reviews: null,
          isOnline: false,
          isAd: true
        },
        {
          id: 13,
          name: "Urban Design",
          category: "Architecture",
          rating: 4.9,
          location: "Kinshasa, Bandalungwa",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
          services: ["Urbanisme", "Paysage", "Développement"],
          price: "À partir de 1200$",
          badge: "Expert",
          reviews: 134,
          isOnline: true
        },
        {
          id: 14,
          name: "Green Archi",
          category: "Architecture",
          rating: 4.6,
          location: "Kinshasa, Kintambo",
          image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=300&fit=crop",
          services: ["Écologique", "Durable", "Énergétique"],
          price: "À partir de 600$",
          badge: "Écologique",
          reviews: 67,
          isOnline: true
        }
      ]
    },
    {
      title: "Développement Web",
      providers: [
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
        {
          id: "ad4",
          name: "Publicité",
          category: "Sponsorisé",
          rating: null,
          location: "Promotion",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
          services: ["Solutions digitales"],
          price: "Découvrir",
          badge: "Sponsorisé",
          reviews: null,
          isOnline: false,
          isAd: true
        },
        {
          id: 17,
          name: "Code Masters",
          category: "Développement",
          rating: 4.7,
          location: "Kinshasa, Kalamu",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
          services: ["Full Stack", "DevOps", "Maintenance"],
          price: "À partir de 350$",
          badge: "Full Stack",
          reviews: 87,
          isOnline: true
        },
        {
          id: 18,
          name: "Tech Innovators",
          category: "Développement",
          rating: 4.8,
          location: "Kinshasa, Ngaliema",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
          services: ["IA", "Blockchain", "IoT"],
          price: "À partir de 500$",
          badge: "Innovation",
          reviews: 76,
          isOnline: true
        }
      ]
    },
    {
      title: "Marketing Digital",
      providers: [
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
        },
        {
          id: "ad5",
          name: "Publicité",
          category: "Sponsorisé",
          rating: null,
          location: "Promotion",
          image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
          services: ["Marketing premium"],
          price: "Essayer",
          badge: "Sponsorisé",
          reviews: null,
          isOnline: false,
          isAd: true
        },
        {
          id: 21,
          name: "Growth Hacker",
          category: "Marketing",
          rating: 4.9,
          location: "Kinshasa, Lingwala",
          image: "https://images.unsplash.com/photo-1553028826-f4804a6dfd3f?w=400&h=300&fit=crop",
          services: ["Growth", "Conversion", "Automation"],
          price: "À partir de 300$",
          badge: "Growth",
          reviews: 89,
          isOnline: true
        },
        {
          id: 22,
          name: "Brand Boost",
          category: "Marketing",
          rating: 4.6,
          location: "Kinshasa, Masina",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
          services: ["Branding", "Campagnes", "Influence"],
          price: "À partir de 180$",
          badge: "Influence",
          reviews: 98,
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
      case "Sponsorisé": return "outline";
      default: return "outline";
    }
  };

  const handleContact = () => {
    navigate('/contact-provider');
  };

  const handleOrder = () => {
    navigate('/order-service');
  };

  const handleProviderClick = (providerId: string | number) => {
    if (typeof providerId === 'string' && providerId.startsWith('ad')) {
      // Handle ad click
      return;
    }
    navigate(`/provider/${providerId}`);
  };

  const ProviderCard = ({ provider }: { provider: any }) => {
    if (provider.isAd) {
      return (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-dashed border-blue-200 overflow-hidden group min-w-[240px] max-w-[240px] h-[280px] flex flex-col">
          <div className="relative flex-1">
            <img
              src={provider.image}
              alt="Publicité"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="font-medium text-xs bg-white/90">
                {provider.badge}
              </Badge>
            </div>
          </div>

          <div className="p-3 flex-shrink-0">
            <div className="text-center">
              <h3 className="font-bold text-sm text-gray-800 mb-1">Votre publicité ici</h3>
              <p className="text-xs text-gray-600 mb-2">Atteignez plus de clients</p>
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-xs h-7"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden group min-w-[240px] max-w-[240px] h-[280px] flex flex-col cursor-pointer"
        onClick={() => handleProviderClick(provider.id)}
      >
        <div className="relative">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-full h-28 object-cover group-hover:scale-110 transition-transform duration-300"
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

        <div className="p-3 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-gray-900 mb-1 truncate">{provider.name}</h3>
              <p className="text-xs text-gray-600">{provider.category}</p>
            </div>
            <div className="flex items-center space-x-1 text-yellow-500 ml-2">
              <Star className="h-3 w-3 fill-current" />
              <span className="text-xs font-medium text-gray-700">{provider.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-gray-500 text-xs mb-2">
            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">{provider.location}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2 flex-1">
            {provider.services.slice(0, 3).map((service: string) => (
              <span
                key={service}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full truncate"
              >
                {service}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-primary-600 text-xs">{provider.price}</span>
            <span className="text-xs text-gray-500">({provider.reviews} avis)</span>
          </div>

          <div className="flex space-x-2 mt-auto">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-primary-200 text-primary-600 hover:bg-primary-50 text-xs h-7"
              onClick={(e) => {
                e.stopPropagation();
                handleContact();
              }}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Contacter
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-xs h-7"
              onClick={(e) => {
                e.stopPropagation();
                handleOrder();
              }}
            >
              <ShoppingBag className="h-3 w-3 mr-1" />
              Commander
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="space-y-6">
        {providerCategories.map((category) => (
          <div key={category.title}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-medium text-gray-700">{category.title}</h3>
              <Link 
                to="/providers" 
                className="text-xs text-primary-600 hover:text-primary-700 hover:underline"
              >
                Voir tout
              </Link>
            </div>
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
    </section>
  );
};

export default FeaturedProviders;
