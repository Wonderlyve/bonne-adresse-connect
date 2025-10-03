import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useConversations } from "@/hooks/useConversations";
import { useProviders } from "@/hooks/useProviders";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeaturedProviders = () => {
  const navigate = useNavigate();
  const { createOrFindConversation, isCreating } = useConversations();
  const { providers, loading } = useProviders();

  const getBadgeVariant = (badge: string | null) => {
    if (!badge) return "default";
    switch (badge) {
      case "Boosté": return "default";
      case "Populaire": return "secondary";
      case "Nouveau": return "destructive";
      case "Sponsorisé": return "outline";
      default: return "outline";
    }
  };

  const handleOrder = () => {
    navigate('/order-service');
  };

  const handleProviderClick = (providerId: string) => {
    navigate(`/provider/${providerId}`);
  };

  const handleMessage = async (providerId: string) => {
    // @ts-ignore - UUID string will work once types are regenerated
    await createOrFindConversation(providerId);
  };

  if (loading) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const featuredProviders = providers.slice(0, 6);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Prestataires en vedette</h2>
        <Link to="/providers">
          <Button variant="outline">Voir tout</Button>
        </Link>
      </div>
      {featuredProviders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun prestataire disponible pour le moment.</p>
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredProviders.map((provider) => (
              <CarouselItem key={provider.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div 
                  className="group hover:shadow-lg transition-shadow cursor-pointer rounded-lg overflow-hidden bg-white border h-full"
                  onClick={() => handleProviderClick(provider.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    {provider.avatar_url ? (
                      <img 
                        src={provider.avatar_url} 
                        alt={provider.company_name || provider.full_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary">
                          {(provider.company_name || provider.full_name).charAt(0)}
                        </span>
                      </div>
                    )}
                    {provider.badges && provider.badges.length > 0 && (
                      <Badge className="absolute top-2 right-2" variant={getBadgeVariant(provider.badges[0])}>
                        {provider.badges[0]}
                      </Badge>
                    )}
                    {provider.is_online && (
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        En ligne
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{provider.company_name || provider.full_name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{provider.rating.toFixed(1)}</span>
                          <span>({provider.reviews_count} avis)</span>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    </div>

                    {provider.bio && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{provider.bio}</p>
                    )}

                    {provider.location && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-lg font-bold text-primary">{provider.price_range || "Sur devis"}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMessage(provider.id);
                          }}
                          disabled={isCreating}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrder();
                          }}
                        >
                          Commander
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      )}
    </section>
  );
};

export default FeaturedProviders;
