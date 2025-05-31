
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";

const DesignersSection = () => {
  const designers = [
    {
      id: 1,
      name: "Marie Nkomo",
      title: "Designer UI/UX Expert",
      avatar: "/placeholder.svg",
      rating: 4.9,
      reviews: 127,
      completedProjects: 89,
      responseTime: "1h",
      startingPrice: 75,
      specialties: ["Logo", "Branding", "UI/UX"],
      isOnline: true,
      verified: true,
      portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: 2,
      name: "Jean-Paul Mbuyi",
      title: "Architecte & Designer 3D",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviews: 94,
      completedProjects: 156,
      responseTime: "2h",
      startingPrice: 150,
      specialties: ["Architecture", "3D", "Plans"],
      isOnline: false,
      verified: true,
      portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    },
    {
      id: 3,
      name: "Grace Kasongo",
      title: "Graphiste Print & Digital",
      avatar: "/placeholder.svg",
      rating: 4.7,
      reviews: 73,
      completedProjects: 112,
      responseTime: "30min",
      startingPrice: 50,
      specialties: ["Print", "Digital", "Illustration"],
      isOnline: true,
      verified: true,
      portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Trouvez votre designer
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Des talents créatifs pour donner vie à vos projets, du logo à l'architecture
        </p>
        <Button className="bg-gradient-to-r from-secondary-600 to-accent-600 hover:from-secondary-700 hover:to-accent-700">
          Voir tous les designers
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {designers.map((designer) => (
          <div
            key={designer.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={designer.avatar}
                    alt={designer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {designer.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{designer.name}</h3>
                    {designer.verified && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{designer.title}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-medium">{designer.rating}</span>
                      <span className="ml-1">({designer.reviews})</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Répond en {designer.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Preview */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {designer.portfolio.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                  />
                ))}
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-4">
                {designer.specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="text-xs"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                <div>
                  <div className="text-lg font-bold text-primary-600">
                    {designer.completedProjects}
                  </div>
                  <div className="text-xs text-gray-500">Projets terminés</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-secondary-600">
                    À partir de {designer.startingPrice}$
                  </div>
                  <div className="text-xs text-gray-500">Prix de départ</div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700">
                  Voir les services
                </Button>
                <Button variant="outline" className="w-full border-primary-200 text-primary-600 hover:bg-primary-50">
                  Contacter
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DesignersSection;
