
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useConversations } from "@/hooks/useConversations";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const FeaturedProviders = () => {
  const navigate = useNavigate();
  const { createOrGetConversation, isCreating } = useConversations();
  const { user } = useProfile();

  const providers = [
    {
      id: "1",
      name: "Print Express",
      category: "Imprimerie",
      rating: 4.8,
      reviews: 142,
      location: "Kinshasa, Gombe",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      verified: true,
      response_time: "< 1h",
      specialties: ["Flyers", "Cartes de visite", "Brochures"]
    },
    {
      id: "2", 
      name: "Creative Studio",
      category: "Design Graphique",
      rating: 4.9,
      reviews: 89,
      location: "Kinshasa, Bandalungwa",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      verified: true,
      response_time: "< 2h",
      specialties: ["Logo", "Identité visuelle", "Packaging"]
    },
    {
      id: "3",
      name: "Archi Plus",
      category: "Architecture",
      rating: 4.7,
      reviews: 67,
      location: "Kinshasa, Kalamu",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
      response_time: "< 4h",
      specialties: ["Plans", "Permis", "Supervision"]
    }
  ];

  const handleMessage = async (providerId: string) => {
    if (!user) {
      toast.error("Veuillez vous connecter pour envoyer un message");
      navigate('/login');
      return;
    }

    try {
      const conversationId = await createOrGetConversation(providerId);
      if (conversationId) {
        navigate(`/chat/${conversationId}`);
      } else {
        toast.error("Erreur lors de la création de la conversation");
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors de la création de la conversation");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prestataires recommandés
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos meilleurs prestataires vérifiés et bien notés par la communauté
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {provider.verified && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <Star className="h-3 w-3 fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {provider.name}
                    </h3>
                    <Badge variant="secondary" className="mb-2">
                      {provider.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {provider.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium text-gray-900">{provider.rating}</span>
                    <span className="text-sm text-gray-600 ml-1">({provider.reviews} avis)</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Répond {provider.response_time}
                  </Badge>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Spécialités :</p>
                  <div className="flex flex-wrap gap-1">
                    {provider.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/provider/${provider.id}`)}
                  >
                    Voir le profil
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-primary-600 hover:bg-primary-700"
                    onClick={() => handleMessage(provider.id)}
                    disabled={isCreating}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {isCreating ? "..." : "Message"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/providers')}
            className="px-8 py-3"
          >
            Voir tous les prestataires
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
