
import { Star, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useConversations } from "@/hooks/useConversations";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const FeaturedProviders = () => {
  const { createOrGetConversation, isCreating } = useConversations();
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const providers = [
    {
      id: "1",
      name: "Print Express",
      category: "Imprimerie",
      rating: 4.8,
      reviews: 156,
      location: "Kinshasa, Gombe",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
      price: "À partir de 5 USD",
      verified: true
    },
    {
      id: "2",
      name: "Creative Studio",
      category: "Design Graphique",
      rating: 4.9,
      reviews: 89,
      location: "Kinshasa, Bandalungwa",
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=200&fit=crop",
      price: "À partir de 15 USD",
      verified: true
    },
    {
      id: "3",
      name: "Archi Plus",
      category: "Architecture",
      rating: 4.7,
      reviews: 124,
      location: "Kinshasa, Lemba",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=200&fit=crop",
      price: "À partir de 100 USD",
      verified: true
    }
  ];

  const handleMessage = (providerId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    createOrGetConversation(providerId);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prestataires Recommandés
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos meilleurs prestataires vérifiés et noté par la communauté
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full h-48 object-cover"
                />
                {provider.verified && (
                  <Badge className="absolute top-3 right-3 bg-green-500">
                    Vérifié
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {provider.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({provider.reviews})</span>
                  </div>
                </div>
                
                <Badge variant="secondary" className="mb-3">
                  {provider.category}
                </Badge>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{provider.location}</span>
                </div>
                
                <p className="text-lg font-semibold text-primary-600">
                  {provider.price}
                </p>
              </CardContent>
              
              <CardFooter className="px-6 pb-6 pt-0 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/provider/${provider.id}`)}
                >
                  Voir le profil
                </Button>
                <Button
                  className="flex-1 flex items-center"
                  onClick={() => handleMessage(provider.id)}
                  disabled={isCreating}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
