import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, ShoppingBag, Palette } from "lucide-react";
import { usePageReset } from "@/hooks/usePageReset";

const DesignServices = () => {
  usePageReset();

  const designers = [
    {
      id: 1,
      name: "Creative Studio",
      rating: 4.9,
      location: "Kinshasa, Lingwala",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      services: ["Logo", "Branding", "Site web", "Print"],
      price: "À partir de 100$",
      badge: "Populaire",
      reviews: 189,
      isOnline: true,
      specialties: ["Identité visuelle", "Digital", "Communication"]
    },
    {
      id: 2,
      name: "Art Design",
      rating: 4.7,
      location: "Kinshasa, Gombe",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      services: ["Illustrations", "Packaging", "Motion", "Animation"],
      price: "À partir de 150$",
      badge: "Créatif",
      reviews: 134,
      isOnline: true,
      specialties: ["Illustration", "Motion Design", "Direction artistique"]
    },
    {
      id: 3,
      name: "Visual Impact",
      rating: 4.8,
      location: "Kinshasa, Kalamu",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      services: ["Publicité", "Réseaux sociaux", "Print", "Marketing"],
      price: "À partir de 80$",
      badge: "Tendance",
      reviews: 98,
      isOnline: false,
      specialties: ["Marketing digital", "Stratégie", "Campagnes"]
    },
    {
      id: 4,
      name: "Pixel Perfect",
      rating: 4.6,
      location: "Kinshasa, Bandalungwa",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      services: ["UI/UX", "Apps", "Web", "Mobile"],
      price: "À partir de 200$",
      badge: "Digital",
      reviews: 76,
      isOnline: true,
      specialties: ["Expérience utilisateur", "Interfaces", "Applications"]
    },
    {
      id: 5,
      name: "Brand Makers",
      rating: 4.9,
      location: "Kinshasa, Limete",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      services: ["Identité", "Charte", "Guidelines", "Naming"],
      price: "À partir de 300$",
      badge: "Expert",
      reviews: 156,
      isOnline: true,
      specialties: ["Branding", "Identité de marque", "Positionnement"]
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
            <Palette className="h-12 w-12 text-primary-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Services de Design</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les meilleurs designers graphiques pour vos projets créatifs
          </p>
        </div>

        {/* Coming Soon Message */}
        <Card className="text-center py-12">
          <CardContent>
            <Palette className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Page en développement</h2>
            <p className="text-gray-600 mb-6">
              Notre section designers sera bientôt disponible avec les meilleurs créatifs de Kinshasa
            </p>
            <Button>Être notifié du lancement</Button>
          </CardContent>
        </Card>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default DesignServices;
