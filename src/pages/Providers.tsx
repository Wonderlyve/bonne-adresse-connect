import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, MessageCircle, ShoppingBag, Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import { useProviders } from "@/hooks/useProviders";
import { Skeleton } from "@/components/ui/skeleton";

const Providers = () => {
  const navigate = useNavigate();
  const { user } = useProfile();
  const { providers, loading } = useProviders();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["all", "Imprimerie", "Design Graphique", "Architecture", "Développement", "Marketing"];
  const locations = ["all", "Abidjan", "Bouaké", "Yamoussoukro", "San-Pédro", "Gombe", "Kintambo", "Lingwala", "Ngaliema"];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = searchTerm === "" ||
      provider.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.bio?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" ||
      provider.services_offered?.some(service => 
        service.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    
    const matchesLocation = selectedLocation === "all" || provider.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getBadgeVariant = (badge: string | null) => {
    if (!badge) return "default";
    switch (badge) {
      case "Boosté": return "default";
      case "Populaire": return "secondary";
      case "Nouveau": return "destructive";
      default: return "outline";
    }
  };

  const handleMessage = async (providerId: string) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour envoyer un message');
      navigate('/login');
      return;
    }

    try {
      const { data: existingConv, error: searchError } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${providerId}),and(participant1_id.eq.${providerId},participant2_id.eq.${user.id})`)
        .maybeSingle();

      if (searchError && searchError.code !== 'PGRST116') {
        throw searchError;
      }

      let conversationId;

      if (existingConv) {
        conversationId = existingConv.id;
      } else {
        const { data: newConv, error: createError } = await supabase
          .from('conversations')
          .insert({
            participant1_id: user.id,
            participant2_id: providerId
          })
          .select('id')
          .single();

        if (createError) throw createError;
        conversationId = newConv.id;
      }

      navigate(`/chat/${conversationId}`);
    } catch (error) {
      console.error('Erreur création conversation:', error);
      toast.error('Erreur lors de la création de la conversation');
    }
  };

  const handleOrder = () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour commander');
      navigate('/login');
      return;
    }
    navigate('/order-service');
  };

  const handleProviderClick = (providerId: string) => {
    navigate(`/provider/${providerId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Skeleton className="h-10 w-64 mb-6" />
          <Skeleton className="h-24 w-full mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
        {filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun prestataire trouvé pour ces critères</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProviders.map((provider) => (
              <Card 
                key={provider.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleProviderClick(provider.id)}
              >
                <div className="relative">
                  {provider.avatar_url ? (
                    <img
                      src={provider.avatar_url}
                      alt={provider.company_name || provider.full_name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary">
                        {(provider.company_name || provider.full_name).charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    {provider.badges && provider.badges.length > 0 && (
                      <Badge variant={getBadgeVariant(provider.badges[0])} className="text-xs">
                        {provider.badges[0]}
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-2 right-2">
                    {provider.is_online && (
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
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{provider.company_name || provider.full_name}</h3>
                      {provider.services_offered && provider.services_offered.length > 0 && (
                        <p className="text-sm text-gray-600">{provider.services_offered[0]}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{provider.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {provider.location && (
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{provider.location}</span>
                    </div>
                  )}

                  {provider.specialties && provider.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {provider.specialties.slice(0, 3).map((specialty: string) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-primary-600">{provider.price_range || "Sur devis"}</span>
                    <span className="text-sm text-gray-500">({provider.reviews_count} avis)</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary-200 text-primary-600 hover:bg-primary-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMessage(provider.id);
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
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
        )}
      </div>

      {/* Mobile padding */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Providers;
