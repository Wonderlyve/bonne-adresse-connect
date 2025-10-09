import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Users, CheckCircle, MessageCircle, ShoppingBag, Calendar, Award, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProviderPage } from "@/hooks/useProviderPage";
import { useProviderArticles } from "@/hooks/useProviderArticles";
import { useConversations } from "@/hooks/useConversations";
import { useProfile } from "@/hooks/useProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Provider {
  id: string;
  full_name: string;
  email: string;
  company_name: string | null;
  avatar_url: string | null;
  location: string | null;
  bio: string | null;
  rating: number;
  reviews_count: number;
  services_offered: string[] | null;
  specialties: string[] | null;
  price_range: string | null;
  is_online: boolean;
  badges: string[] | null;
  response_time: string | null;
  completion_rate: number | null;
  created_at: string;
}

interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useProfile();
  const { createOrFindConversation } = useConversations();
  const [activeTab, setActiveTab] = useState("overview");
  const [provider, setProvider] = useState<Provider | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { providerPage, fetchProviderPage } = useProviderPage();
  const { articles, fetchArticles } = useProviderArticles();
useEffect(() => {
    const fetchProviderData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch provider profile
        const { data: providerData, error: providerError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .eq('user_type', 'provider')
          .single();

        if (providerError) throw providerError;
        setProvider(providerData);

        // Fetch provider page and articles
        await Promise.all([
          fetchProviderPage(id),
          fetchArticles(id)
        ]);

        // Fetch reviews - temporarily disabled due to schema issues
        setReviews([]);
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
        toast.error('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProviderData();
  }, [id]);

  const handleContact = async () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour envoyer un message');
      navigate('/login');
      return;
    }
    
    if (!id) return;
    await createOrFindConversation(id);
  };

  const handleOrder = () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour commander');
      navigate('/login');
      return;
    }
    navigate('/order-service');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50">
        <Skeleton className="w-full h-64 md:h-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <Card className="mb-6 bg-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Skeleton className="w-32 h-32 rounded-xl" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen pt-16 bg-gray-50 flex items-center justify-center">
        <Card className="p-6">
          <p className="text-gray-600">Prestataire non trouvé</p>
        </Card>
      </div>
    );
  }

  const memberSince = new Date(provider.created_at).getFullYear();

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        {providerPage?.banner_url ? (
          <img
            src={providerPage.banner_url}
            alt={`${provider.company_name || provider.full_name} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Profile Header */}
        <Card className="mb-6 bg-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                {providerPage?.logo_url || provider.avatar_url ? (
                  <img
                    src={providerPage?.logo_url || provider.avatar_url || ''}
                    alt={provider.company_name || provider.full_name}
                    className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-xl border-4 border-white shadow-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <span className="text-5xl font-bold text-primary">
                      {(provider.company_name || provider.full_name).charAt(0)}
                    </span>
                  </div>
                )}
                {provider.is_online && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    En ligne
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{providerPage?.company_name || provider.company_name || provider.full_name}</h1>
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                </div>
                
                <p className="text-lg text-gray-600 mb-2">
                  {provider.services_offered?.[0] || 'Prestataire de services'}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{provider.rating.toFixed(1)}</span>
                    <span className="text-gray-500">({provider.reviews_count} avis)</span>
                  </div>
                  
                  {provider.location && (
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.location}</span>
                    </div>
                  )}
                  
                  {provider.response_time && (
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Répond en {provider.response_time}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Membre depuis {memberSince}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleContact}
                    variant="outline"
                    className="border-primary-200 text-primary-600 hover:bg-primary-50"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button
                    onClick={handleOrder}
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Commander
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gallery">Galerie</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {providerPage?.description || provider.bio || 'Aucune description disponible.'}
                    </p>
                  </CardContent>
                </Card>

                {provider.specialties && provider.specialties.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Spécialités</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avis</span>
                      <span className="font-semibold">{provider.reviews_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Note moyenne</span>
                      <span className="font-semibold">{provider.rating.toFixed(1)} / 5</span>
                    </div>
                    {provider.completion_rate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taux de complétion</span>
                        <span className="font-semibold">{provider.completion_rate}%</span>
                      </div>
                    )}
                    {provider.response_time && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temps de réponse</span>
                        <span className="font-semibold">{provider.response_time}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {providerPage?.business_hours && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Horaires</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {Object.entries(providerPage.business_hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="text-gray-600">{day}</span>
                          <span className="font-medium">{hours as string}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {providerPage?.website_url && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {providerPage.website_url && (
                        <a href={providerPage.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Site web
                        </a>
                      )}
                      {providerPage.phone && (
                        <p className="text-sm text-gray-600">Tél: {providerPage.phone}</p>
                      )}
                      {providerPage.address && (
                        <p className="text-sm text-gray-600">{providerPage.address}</p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun service disponible pour le moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.filter(article => article.is_active).map((article) => (
                  <Card key={article.id}>
                    {article.images && article.images.length > 0 && (
                      <img
                        src={article.images[0]}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-primary-600 font-semibold">
                          {article.price_min === article.price_max 
                            ? `${article.price_min}$ / ${article.price_unit}`
                            : `${article.price_min}$ - ${article.price_max}$ / ${article.price_unit}`}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {article.delivery_time}
                        </div>
                      </div>
                      <Button className="w-full" onClick={handleOrder}>
                        Commander ce service
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            {articles.filter(article => article.images && article.images.length > 0).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune image disponible pour le moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.filter(article => article.images && article.images.length > 0).map((article) => (
                  article.images?.map((image, index) => (
                    <Card key={`${article.id}-${index}`} className="overflow-hidden">
                      <img
                        src={image}
                        alt={`${article.title} - ${index + 1}`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Card>
                  ))
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun avis pour le moment</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{review.reviewer_name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default ProviderProfile;
