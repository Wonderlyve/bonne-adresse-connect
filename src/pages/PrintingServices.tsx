
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, ShoppingBag, Printer } from "lucide-react";

const PrintingServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const printers = [
    {
      id: 1,
      name: "Print Express",
      rating: 4.8,
      location: "Kinshasa, Gombe",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      services: ["Flyers", "Cartes de visite", "Banderoles", "Brochures"],
      price: "À partir de 50$",
      badge: "Boosté",
      reviews: 156,
      isOnline: true,
      specialties: ["Impression numérique", "Grand format", "Reliure"]
    },
    {
      id: 2,
      name: "Quick Print Solutions",
      rating: 4.6,
      location: "Kinshasa, Kintambo",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      services: ["Affiches", "Calendriers", "Menus", "Étiquettes"],
      price: "À partir de 40$",
      badge: "Populaire",
      reviews: 89,
      isOnline: true,
      specialties: ["Impression offset", "Plastification", "Découpe"]
    },
    {
      id: 3,
      name: "Digital Print Center",
      rating: 4.7,
      location: "Kinshasa, Lingwala",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      services: ["Roll-up", "Bâches", "Vinyles", "Panneaux"],
      price: "À partir de 80$",
      badge: "Nouveau",
      reviews: 45,
      isOnline: false,
      specialties: ["Signalétique", "Impression textile", "Sérigraphie"]
    },
    {
      id: 4,
      name: "Pro Print Services",
      rating: 4.9,
      location: "Kinshasa, Ngaliema",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      services: ["Magazines", "Livres", "Catalogues", "Rapports"],
      price: "À partir de 100$",
      badge: "Premium",
      reviews: 234,
      isOnline: true,
      specialties: ["Impression de luxe", "Dorure", "Embossage"]
    },
    {
      id: 5,
      name: "Flash Print",
      rating: 4.5,
      location: "Kinshasa, Masina",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      services: ["Stickers", "Badges", "Cartes PVC", "Tampons"],
      price: "À partir de 25$",
      badge: "Rapide",
      reviews: 67,
      isOnline: true,
      specialties: ["Impression rapide", "Petits formats", "Personnalisation"]
    },
    {
      id: 6,
      name: "Elite Printing",
      rating: 4.8,
      location: "Kinshasa, Bandalungwa",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      services: ["Cartons d'invitation", "Faire-part", "Diplômes", "Certificats"],
      price: "À partir de 60$",
      badge: "Élégant",
      reviews: 123,
      isOnline: true,
      specialties: ["Papiers spéciaux", "Finitions haut de gamme", "Design personnalisé"]
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Printer className="h-12 w-12 text-primary-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Services d'Imprimerie</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez les meilleurs imprimeurs de Kinshasa pour tous vos besoins d'impression
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <Button variant="outline" size="sm">Tous les services</Button>
          <Button variant="outline" size="sm">Impression numérique</Button>
          <Button variant="outline" size="sm">Grand format</Button>
          <Button variant="outline" size="sm">Reliure</Button>
          <Button variant="outline" size="sm">Signalétique</Button>
          <Button variant="outline" size="sm">Textile</Button>
        </div>

        {/* Printers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {printers.map((printer) => (
            <Card
              key={printer.id}
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={printer.image}
                  alt={printer.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant={getBadgeVariant(printer.badge)} className="font-medium">
                    {printer.badge}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  {printer.isOnline && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-ring"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full absolute"></div>
                    </div>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{printer.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {printer.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{printer.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Services principaux:</h4>
                  <div className="flex flex-wrap gap-1">
                    {printer.services.slice(0, 4).map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Spécialités:</h4>
                  <div className="flex flex-wrap gap-1">
                    {printer.specialties.slice(0, 2).map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-primary-600">{printer.price}</span>
                  <span className="text-sm text-gray-500">({printer.reviews} avis)</span>
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Voir plus d'imprimeurs
          </Button>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default PrintingServices;
