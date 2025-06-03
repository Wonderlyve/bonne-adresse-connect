
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Users, CheckCircle, MessageCircle, ShoppingBag, Calendar, Award, Clock, Shield } from "lucide-react";
import { useState } from "react";

const ProviderProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app would fetch from API
  const provider = {
    id: parseInt(id || "1"),
    name: "Print Express",
    category: "Imprimerie",
    rating: 4.8,
    location: "Kinshasa, Gombe",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=400&fit=crop",
    isOnline: true,
    isVerified: true,
    responseTime: "< 1h",
    completedProjects: 156,
    clientSatisfaction: 98,
    memberSince: "2022",
    description: "Print Express est votre partenaire de confiance pour tous vos besoins d'impression professionnelle. Avec plus de 5 ans d'expérience dans le domaine, nous offrons des services de qualité supérieure avec des délais respectés.",
    services: [
      { name: "Impression de flyers", price: "À partir de 50$", duration: "24-48h" },
      { name: "Cartes de visite", price: "À partir de 30$", duration: "24h" },
      { name: "Banderoles publicitaires", price: "À partir de 100$", duration: "3-5 jours" },
      { name: "Brochures", price: "À partir de 80$", duration: "2-3 jours" },
      { name: "Affiches grand format", price: "À partir de 120$", duration: "3-4 jours" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
    ],
    reviews: [
      {
        id: 1,
        author: "Marie K.",
        rating: 5,
        date: "Il y a 2 jours",
        comment: "Service excellent et rapide. Les flyers étaient parfaits et livrés dans les délais promis."
      },
      {
        id: 2,
        author: "Jean-Paul M.",
        rating: 5,
        date: "Il y a 1 semaine",
        comment: "Très professionnel, qualité d'impression remarquable. Je recommande vivement !"
      },
      {
        id: 3,
        author: "Sarah L.",
        rating: 4,
        date: "Il y a 2 semaines",
        comment: "Bon travail dans l'ensemble. Petit délai supplémentaire mais résultat final satisfaisant."
      }
    ],
    certifications: [
      "Certification Qualité ISO 9001",
      "Impression Écologique",
      "Formation Adobe Professional"
    ],
    workingHours: {
      "Lundi - Vendredi": "8h00 - 18h00",
      "Samedi": "9h00 - 15h00",
      "Dimanche": "Fermé"
    }
  };

  const handleContact = () => {
    // Navigate to chat or contact form
    console.log("Contact provider");
  };

  const handleOrder = () => {
    // Navigate to order form
    console.log("Order service");
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={provider.coverImage}
          alt={`${provider.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        {/* Profile Header */}
        <Card className="mb-6 bg-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-lg"
                />
                {provider.isOnline && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    En ligne
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                  {provider.isVerified && (
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                
                <p className="text-lg text-gray-600 mb-2">{provider.category}</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-gray-500">({provider.completedProjects} projets)</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{provider.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Répond en {provider.responseTime}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Membre depuis {provider.memberSince}</span>
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
                    <p className="text-gray-700 leading-relaxed">{provider.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {provider.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projets complétés</span>
                      <span className="font-semibold">{provider.completedProjects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Satisfaction client</span>
                      <span className="font-semibold">{provider.clientSatisfaction}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temps de réponse</span>
                      <span className="font-semibold">{provider.responseTime}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Horaires</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(provider.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-gray-600">{day}</span>
                        <span className="font-medium">{hours}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {provider.services.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-primary-600 font-semibold">{service.price}</span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {service.duration}
                      </div>
                    </div>
                    <Button className="w-full" onClick={handleOrder}>
                      Commander ce service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {provider.gallery.map((image, index) => (
                <Card key={index} className="overflow-hidden">
                  <img
                    src={image}
                    alt={`Travail ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-6">
              {provider.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{review.author}</h4>
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
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default ProviderProfile;
