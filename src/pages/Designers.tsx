
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Clock, CheckCircle, Search, Filter, Eye } from "lucide-react";

const Designers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedPriceRange, setPriceRange] = useState("all");

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
      portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "Experte en design d'interface avec plus de 5 ans d'expérience",
      level: "Expert",
      location: "Kinshasa"
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
      portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "Architecte diplômé spécialisé en modélisation 3D",
      level: "Pro",
      location: "Kinshasa"
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
      portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "Créatrice passionnée par le design graphique et l'illustration",
      level: "Pro",
      location: "Lubumbashi"
    },
    {
      id: 4,
      name: "David Mukendi",
      title: "Brand Designer & Illustrateur",
      avatar: "/placeholder.svg",
      rating: 4.6,
      reviews: 45,
      completedProjects: 67,
      responseTime: "1h30",
      startingPrice: 80,
      specialties: ["Branding", "Illustration", "Packaging"],
      isOnline: true,
      verified: false,
      portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
      description: "Spécialiste en création d'identité visuelle pour PME",
      level: "Intermédiaire",
      location: "Kinshasa"
    }
  ];

  const specialties = [
    { value: "all", label: "Toutes spécialités" },
    { value: "Logo", label: "Logo Design" },
    { value: "Branding", label: "Branding" },
    { value: "UI/UX", label: "UI/UX Design" },
    { value: "Architecture", label: "Architecture" },
    { value: "3D", label: "Modélisation 3D" },
    { value: "Print", label: "Design Print" },
    { value: "Illustration", label: "Illustration" },
    { value: "Packaging", label: "Packaging" }
  ];

  const priceRanges = [
    { value: "all", label: "Tous les prix" },
    { value: "0-50", label: "0 - 50$" },
    { value: "50-100", label: "50 - 100$" },
    { value: "100-200", label: "100 - 200$" },
    { value: "200+", label: "200$+" }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "text-purple-600 bg-purple-100";
      case "Pro": return "text-blue-600 bg-blue-100";
      case "Intermédiaire": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const filteredDesigners = designers.filter(designer => {
    const matchesSearch = designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         designer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         designer.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === "all" || 
                            designer.specialties.includes(selectedSpecialty);
    
    const matchesPriceRange = selectedPriceRange === "all" || (() => {
      const price = designer.startingPrice;
      switch (selectedPriceRange) {
        case "0-50": return price <= 50;
        case "50-100": return price > 50 && price <= 100;
        case "100-200": return price > 100 && price <= 200;
        case "200+": return price > 200;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesSpecialty && matchesPriceRange;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trouvez votre designer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des talents créatifs pour donner vie à vos projets
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Rechercher un designer ou spécialité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Spécialité" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedPriceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="border-primary-200 text-primary-600">
                <Filter className="h-4 w-4 mr-2" />
                Plus de filtres
              </Button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredDesigners.length} designer{filteredDesigners.length > 1 ? 's' : ''} trouvé{filteredDesigners.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {filteredDesigners.map((designer) => (
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
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${getLevelColor(designer.level)}`}>
                        {designer.level}
                      </Badge>
                      <span className="text-xs text-gray-500">{designer.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="px-6 py-4">
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium text-gray-700">{designer.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">({designer.reviews} avis)</div>
                  </div>
                  <div>
                    <div className="font-bold text-primary-600 mb-1">{designer.completedProjects}</div>
                    <div className="text-xs text-gray-500">Projets</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium">{designer.responseTime}</span>
                    </div>
                    <div className="text-xs text-gray-500">Réponse</div>
                  </div>
                </div>
              </div>

              {/* Portfolio Preview */}
              <div className="px-6">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {designer.portfolio.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {designer.description}
                </p>

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
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-primary-600">
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

        {/* Load More Button */}
        {filteredDesigners.length > 0 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-primary-200 text-primary-600 hover:bg-primary-50"
            >
              Charger plus de designers
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredDesigners.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun designer trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("all");
                setPriceRange("all");
              }}
              variant="outline"
              className="border-primary-200 text-primary-600"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Mobile padding */}
        <div className="h-20 md:h-0"></div>
      </div>
    </div>
  );
};

export default Designers;
