
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, Palette, Building, Shirt, Monitor, PenTool, ShoppingBag, Star } from "lucide-react";

const Services = () => {
  const serviceCategories = [
    {
      icon: Printer,
      title: "Services d'impression",
      description: "Tous vos besoins d'impression professionnelle",
      color: "from-blue-500 to-blue-600",
      services: [
        { name: "Cartes de visite", price: "À partir de 25$", popular: true },
        { name: "Flyers & Dépliants", price: "À partir de 50$", popular: true },
        { name: "Affiches grand format", price: "À partir de 80$", popular: false },
        { name: "Banderoles publicitaires", price: "À partir de 120$", popular: false },
        { name: "Autocollants personnalisés", price: "À partir de 30$", popular: true },
        { name: "Calendriers sur mesure", price: "À partir de 60$", popular: false }
      ]
    },
    {
      icon: Palette,
      title: "Design graphique",
      description: "Création visuelle et identité de marque",
      color: "from-purple-500 to-purple-600",
      services: [
        { name: "Création de logo", price: "À partir de 100$", popular: true },
        { name: "Charte graphique complète", price: "À partir de 300$", popular: true },
        { name: "Design de packaging", price: "À partir de 200$", popular: false },
        { name: "Illustrations personnalisées", price: "À partir de 150$", popular: false },
        { name: "Design de flyers", price: "À partir de 75$", popular: true },
        { name: "Retouche photo", price: "À partir de 40$", popular: false }
      ]
    },
    {
      icon: Building,
      title: "Architecture & Plans",
      description: "Conception architecturale et technique",
      color: "from-orange-500 to-orange-600",
      services: [
        { name: "Plans de maison", price: "À partir de 500$", popular: true },
        { name: "Modélisation 3D", price: "À partir de 400$", popular: true },
        { name: "Permis de construire", price: "À partir de 800$", popular: false },
        { name: "Supervision de travaux", price: "À partir de 1000$", popular: false },
        { name: "Rénovation design", price: "À partir de 600$", popular: true },
        { name: "Plans techniques", price: "À partir de 350$", popular: false }
      ]
    },
    {
      icon: Shirt,
      title: "Textile personnalisé",
      description: "Vêtements et accessoires sur mesure",
      color: "from-green-500 to-green-600",
      services: [
        { name: "T-shirts personnalisés", price: "À partir de 15$", popular: true },
        { name: "Casquettes brodées", price: "À partir de 20$", popular: true },
        { name: "Polos d'entreprise", price: "À partir de 25$", popular: false },
        { name: "Sacs promotionnels", price: "À partir de 18$", popular: false },
        { name: "Tabliers personnalisés", price: "À partir de 22$", popular: false },
        { name: "Uniformes sur mesure", price: "À partir de 45$", popular: true }
      ]
    },
    {
      icon: Monitor,
      title: "Services digitaux",
      description: "Solutions web et marketing digital",
      color: "from-indigo-500 to-indigo-600",
      services: [
        { name: "Site web vitrine", price: "À partir de 300$", popular: true },
        { name: "Boutique en ligne", price: "À partir de 800$", popular: true },
        { name: "Application mobile", price: "À partir de 1500$", popular: false },
        { name: "Référencement SEO", price: "À partir de 200$", popular: false },
        { name: "Gestion réseaux sociaux", price: "À partir de 150$/mois", popular: true },
        { name: "Publicité en ligne", price: "À partir de 250$", popular: false }
      ]
    },
    {
      icon: PenTool,
      title: "Signalétique",
      description: "Enseignes et signalisation professionnelle",
      color: "from-red-500 to-red-600",
      services: [
        { name: "Enseignes lumineuses", price: "À partir de 400$", popular: true },
        { name: "Panneaux directionnels", price: "À partir de 150$", popular: false },
        { name: "Totems publicitaires", price: "À partir de 600$", popular: true },
        { name: "Lettrage adhésif", price: "À partir de 80$", popular: false },
        { name: "Plaques professionnelles", price: "À partir de 50$", popular: true },
        { name: "Bâches publicitaires", price: "À partir de 120$", popular: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nos services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre large gamme de services professionnels avec des tarifs transparents
          </p>
        </div>

        {/* Services Categories */}
        <div className="space-y-12">
          {serviceCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card key={categoryIndex} className="overflow-hidden border-0 shadow-xl">
                <CardHeader className={`bg-gradient-to-r ${category.color} text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                      <CardDescription className="text-white/80">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                    {category.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="p-6 border-b border-r border-gray-100 hover:bg-gray-50 transition-colors group relative"
                      >
                        {service.popular && (
                          <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">
                            Populaire
                          </Badge>
                        )}
                        <div className="mb-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            {service.name}
                          </h3>
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-xl font-bold text-primary-600">
                              {service.price}
                            </span>
                            <div className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-sm text-gray-600 ml-1">4.8</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Service professionnel avec satisfaction garantie
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                          >
                            <ShoppingBag className="h-4 w-4 mr-1" />
                            Commander
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-primary-200 text-primary-600 hover:bg-primary-50"
                          >
                            Détails
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'un service sur mesure ?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Nos experts sont là pour vous accompagner dans vos projets spécifiques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
              Devis personnalisé
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
              Nous contacter
            </Button>
          </div>
        </div>

        {/* Mobile padding */}
        <div className="h-20 md:h-0"></div>
      </div>
    </div>
  );
};

export default Services;
