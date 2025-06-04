
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Shirt, Calendar, MapPin, Clock, Home, Star, Phone } from "lucide-react";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      category: "Papeterie & Communication",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      items: [
        { name: "Cartes de visite", price: "15 000 FC", delivery: "24h", description: "Impression haute qualité, finition mate ou brillante" },
        { name: "Flyers", price: "25 000 FC", delivery: "48h", description: "Format A5/A4, papier 150g, couleurs vives" },
        { name: "Brochures", price: "45 000 FC", delivery: "3-5 jours", description: "Pliage professionnel, papier couché" },
        { name: "Dépliants", price: "35 000 FC", delivery: "2-3 jours", description: "Pliage accordéon ou roulé" },
        { name: "Documents officiels", price: "Sur devis", delivery: "Variable", description: "Reliure, plastification disponible" }
      ]
    },
    {
      category: "Événementiel & Invitations",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      items: [
        { name: "Invitations mariage", price: "50 000 FC", delivery: "5-7 jours", description: "Design personnalisé, papier premium" },
        { name: "Invitations anniversaire", price: "25 000 FC", delivery: "3-4 jours", description: "Formats variés, impression couleur" },
        { name: "Cartons d'invitation", price: "30 000 FC", delivery: "3-5 jours", description: "Finition dorée disponible" }
      ]
    },
    {
      category: "Textile & Sérigraphie",
      icon: Shirt,
      color: "text-green-600",
      bgColor: "bg-green-50",
      items: [
        { name: "T-shirts personnalisés", price: "12 000 FC", delivery: "5-7 jours", description: "Coton 100%, impression sérigraphie" },
        { name: "Polos brodés", price: "18 000 FC", delivery: "7-10 jours", description: "Broderie logo, qualité premium" },
        { name: "Casquettes", price: "15 000 FC", delivery: "5-7 jours", description: "Broderie ou impression" }
      ]
    },
    {
      category: "Signalétique & Affichage",
      icon: Image,
      color: "text-red-600",
      bgColor: "bg-red-50",
      items: [
        { name: "Affiches A3/A2", price: "20 000 FC", delivery: "24-48h", description: "Papier photo brillant ou mat" },
        { name: "Roll-up 85x200", price: "120 000 FC", delivery: "5-7 jours", description: "Structure alu, impression HD" },
        { name: "Calicot", price: "80 000 FC", delivery: "3-5 jours", description: "Bâche PVC, œillets renforcés" },
        { name: "Bâche publicitaire", price: "Sur devis", delivery: "5-10 jours", description: "Grande format, installation possible" }
      ]
    }
  ];

  const handleOrderService = (serviceName: string) => {
    console.log(`Commande: ${serviceName}`);
    // Logique de commande à implémenter
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Services Express</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Commandez vos supports de communication en quelques clics avec livraison à domicile
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <Home className="h-4 w-4 mr-2" />
              Livraison à domicile
            </div>
            <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-full">
              <Clock className="h-4 w-4 mr-2" />
              Service rapide
            </div>
            <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-2 rounded-full">
              <Star className="h-4 w-4 mr-2" />
              Qualité garantie
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="space-y-12">
          {services.map((serviceCategory, categoryIndex) => {
            const Icon = serviceCategory.icon;
            return (
              <div key={categoryIndex}>
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${serviceCategory.bgColor} mr-4`}>
                    <Icon className={`h-6 w-6 ${serviceCategory.color}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{serviceCategory.category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceCategory.items.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary-500">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {service.name}
                          </CardTitle>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {service.delivery}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary-600">
                            {service.price}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.delivery}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-primary-600 hover:bg-primary-700"
                            onClick={() => handleOrderService(service.name)}
                          >
                            Commander maintenant
                          </Button>
                          <div className="flex items-center justify-center text-sm text-gray-500">
                            <Home className="h-4 w-4 mr-1" />
                            Livraison à domicile incluse
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Besoin d'un devis personnalisé ?
              </h3>
              <p className="text-gray-600 mb-6">
                Contactez-nous pour des projets sur mesure ou des quantités importantes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                  <Phone className="h-5 w-5 mr-2" />
                  Nous appeler
                </Button>
                <Button size="lg" variant="outline">
                  Demander un devis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Services;
