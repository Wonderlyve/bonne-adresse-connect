
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Phone, Mail, Globe, Star } from "lucide-react";

interface AdDetails {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  provider: {
    name: string;
    rating: number;
    reviewCount: number;
    location: string;
    phone: string;
    email: string;
    website: string;
  };
  category: string;
  price: string;
  features: string[];
  publishedDate: string;
}

const AdDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState<AdDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Mock data for ad details
    const mockAd: AdDetails = {
      id: parseInt(id || "1"),
      title: "Impression haute qualité - Flyers & Brochures",
      description: "Service d'impression professionnel pour tous vos supports marketing",
      fullDescription: "Notre service d'impression haute qualité vous propose une gamme complète de solutions pour vos besoins marketing. Nous utilisons des équipements de pointe et des papiers de qualité supérieure pour garantir des résultats exceptionnels. Que ce soit pour des flyers, brochures, cartes de visite ou affiches, nous nous adaptons à vos besoins et respectons vos délais.",
      image: "/placeholder.svg",
      provider: {
        name: "Print Express Pro",
        rating: 4.8,
        reviewCount: 127,
        location: "Paris 11ème",
        phone: "01 23 45 67 89",
        email: "contact@printexpresspro.fr",
        website: "www.printexpresspro.fr"
      },
      category: "Imprimerie",
      price: "À partir de 0,10€ par exemplaire",
      features: [
        "Impression haute résolution",
        "Papiers premium",
        "Livraison rapide",
        "Devis gratuit",
        "Conseils personnalisés",
        "Formats personnalisés"
      ],
      publishedDate: "2024-01-15"
    };
    
    setAd(mockAd);
    setLoading(false);
  }, [id]);

  const handleContact = () => {
    navigate('/contact-provider', { 
      state: { 
        providerName: ad?.provider.name,
        serviceName: ad?.title 
      } 
    });
  };

  const handleOrder = () => {
    navigate('/order-service', { 
      state: { 
        providerName: ad?.provider.name,
        serviceName: ad?.title,
        price: ad?.price
      } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Publicité non trouvée</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-white/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="mb-2">
                    {ad.category}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Publié le {new Date(ad.publishedDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <CardTitle className="text-3xl text-gray-900">
                  {ad.title}
                </CardTitle>
                <p className="text-xl text-gray-600">
                  {ad.description}
                </p>
              </CardHeader>
              <CardContent>
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Description détaillée
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {ad.fullDescription}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Caractéristiques
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ad.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-600">
                  {ad.price}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleOrder}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                >
                  Commander maintenant
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleContact}
                  className="w-full border-primary-200 text-primary-600 hover:bg-primary-50"
                >
                  Demander un devis
                </Button>
              </CardContent>
            </Card>

            {/* Provider Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  Prestataire
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {ad.provider.name}
                  </h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {ad.provider.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({ad.provider.reviewCount} avis)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{ad.provider.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{ad.provider.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{ad.provider.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{ad.provider.website}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/provider/${ad.id}`)}
                  className="w-full mt-4"
                >
                  Voir le profil complet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Mobile padding */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default AdDetail;
