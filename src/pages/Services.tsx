
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Truck, 
  Clock, 
  Star, 
  CreditCard,
  FileText,
  Image,
  Shirt,
  Billboard,
  Bookmark,
  Calendar,
  Mail,
  Megaphone
} from "lucide-react";

const Services = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "cartes-visite",
      name: "Conception de cartes de visite",
      description: "Cartes de visite professionnelles, design personnalisé",
      price: "À partir de 25 000 FC",
      icon: FileText,
      category: "Papeterie",
      deliveryTime: "24-48h",
      features: ["Design personnalisé", "Impression recto-verso", "Papier de qualité premium"]
    },
    {
      id: "affiches",
      name: "Affiches publicitaires",
      description: "Affiches grand format pour vos événements et promotions",
      price: "À partir de 15 000 FC",
      icon: Billboard,
      category: "Publicité",
      deliveryTime: "2-3 jours",
      features: ["Format A3, A2, A1", "Papier haute qualité", "Couleurs vives"]
    },
    {
      id: "brochures",
      name: "Brochures et catalogues",
      description: "Brochures pliées, catalogues multi-pages",
      price: "À partir de 35 000 FC",
      icon: Bookmark,
      category: "Marketing",
      deliveryTime: "3-5 jours",
      features: ["Mise en page professionnelle", "Reliure de qualité", "Papier glacé"]
    },
    {
      id: "depliants",
      name: "Dépliants publicitaires",
      description: "Dépliants 2 ou 3 volets pour vos communications",
      price: "À partir de 20 000 FC",
      icon: FileText,
      category: "Communication",
      deliveryTime: "1-2 jours",
      features: ["Pliage professionnel", "Design attractif", "Papier couché"]
    },
    {
      id: "documents",
      name: "Documents officiels",
      description: "Impression de documents, rapports, présentations",
      price: "À partir de 500 FC/page",
      icon: FileText,
      category: "Bureau",
      deliveryTime: "Même jour",
      features: ["Reliure spirale", "Couverture plastifiée", "Pagination"]
    },
    {
      id: "invitations",
      name: "Cartes d'invitation",
      description: "Invitations personnalisées pour tous vos événements",
      price: "À partir de 1 500 FC/unité",
      icon: Mail,
      category: "Événements",
      deliveryTime: "2-3 jours",
      features: ["Design sur mesure", "Papier texturé", "Finition dorée disponible"]
    },
    {
      id: "tshirts",
      name: "T-shirts personnalisés",
      description: "Impression sur textile, t-shirts, polos, sweats",
      price: "À partir de 8 000 FC",
      icon: Shirt,
      category: "Textile",
      deliveryTime: "3-5 jours",
      features: ["Sérigraphie", "Broderie", "Transfert numérique"]
    },
    {
      id: "rollup",
      name: "Roll'up publicitaires",
      description: "Supports publicitaires enroulables et transportables",
      price: "À partir de 45 000 FC",
      icon: Megaphone,
      category: "Signalétique",
      deliveryTime: "2-4 jours",
      features: ["Structure aluminium", "Impression haute définition", "Housse de transport"]
    },
    {
      id: "calicot",
      name: "Calicots et banderoles",
      description: "Banderoles en tissu pour événements et manifestations",
      price: "À partir de 25 000 FC",
      icon: Billboard,
      category: "Événements",
      deliveryTime: "2-3 jours",
      features: ["Tissu résistant", "Œillets renforcés", "Impression couleur"]
    },
    {
      id: "baches",
      name: "Bâches publicitaires",
      description: "Bâches grand format pour extérieur et intérieur",
      price: "À partir de 8 000 FC/m²",
      icon: Image,
      category: "Extérieur",
      deliveryTime: "3-5 jours",
      features: ["Résistant aux intempéries", "Œillets périphériques", "Impression HD"]
    }
  ];

  const handleOrderService = (serviceId: string) => {
    navigate(`/order-service?service=${serviceId}`);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Papeterie": "bg-blue-100 text-blue-800",
      "Publicité": "bg-red-100 text-red-800",
      "Marketing": "bg-green-100 text-green-800",
      "Communication": "bg-purple-100 text-purple-800",
      "Bureau": "bg-gray-100 text-gray-800",
      "Événements": "bg-yellow-100 text-yellow-800",
      "Textile": "bg-pink-100 text-pink-800",
      "Signalétique": "bg-indigo-100 text-indigo-800",
      "Extérieur": "bg-orange-100 text-orange-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Services Rapides</h1>
          <p className="text-xl text-gray-600 mb-6">
            Tous nos services d'impression et de communication avec livraison à domicile
          </p>
          
          {/* Features highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 text-green-600">
              <Truck className="h-5 w-5" />
              <span className="font-medium">Livraison à domicile</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Service rapide</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-600">
              <Star className="h-5 w-5" />
              <span className="font-medium">Qualité garantie</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-600">
              <CreditCard className="h-5 w-5" />
              <span className="font-medium">Paiement sécurisé</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg text-white">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <Badge 
                          variant="secondary" 
                          className={`${getCategoryColor(service.category)} text-xs mb-2`}
                        >
                          {service.category}
                        </Badge>
                        <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {service.name}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{service.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Price and delivery */}
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary-600">{service.price}</span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.deliveryTime}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">Inclus :</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <Star className="h-3 w-3 mr-2 text-yellow-500 fill-current" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Order button */}
                    <Button 
                      onClick={() => handleOrderService(service.id)}
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 group-hover:scale-105"
                    >
                      <Truck className="h-4 w-4 mr-2" />
                      Commander avec livraison
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Besoin d'un service personnalisé ?
            </h2>
            <p className="text-gray-600 mb-6">
              Contactez-nous pour un devis sur mesure ou pour tout autre service d'impression
            </p>
            <Button 
              onClick={() => navigate('/contact')}
              size="lg"
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
            >
              Demander un devis personnalisé
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile padding */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Services;
