
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Star, MapPin } from "lucide-react";

interface DesignerWork {
  id: number;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    id: number;
    rating: number;
    location: string;
    speciality: string;
  };
  category: string;
  tags: string[];
}

const Designers = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState<DesignerWork[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Mock data for designer works
    const mockWorks: DesignerWork[] = [
      {
        id: 1,
        title: "Identité visuelle moderne",
        description: "Création d'une identité visuelle complète pour une startup tech",
        image: "/placeholder.svg",
        author: {
          name: "Sophie Martin",
          id: 1,
          rating: 4.9,
          location: "Paris",
          speciality: "Identité visuelle"
        },
        category: "Branding",
        tags: ["Logo", "Charte graphique", "Startup"]
      },
      {
        id: 2,
        title: "Design d'application mobile",
        description: "Interface utilisateur pour une application de fitness",
        image: "/placeholder.svg",
        author: {
          name: "Thomas Dubois",
          id: 2,
          rating: 4.8,
          location: "Lyon",
          speciality: "UI/UX Design"
        },
        category: "Mobile App",
        tags: ["UI/UX", "Mobile", "Fitness"]
      },
      {
        id: 3,
        title: "Site web e-commerce",
        description: "Design et développement d'une boutique en ligne",
        image: "/placeholder.svg",
        author: {
          name: "Marie Lefèvre",
          id: 3,
          rating: 4.7,
          location: "Marseille",
          speciality: "Web Design"
        },
        category: "Web Design",
        tags: ["E-commerce", "Responsive", "UX"]
      },
      {
        id: 4,
        title: "Packaging produit",
        description: "Design d'emballage pour une gamme de cosmétiques bio",
        image: "/placeholder.svg",
        author: {
          name: "Lucas Bernard",
          id: 4,
          rating: 4.9,
          location: "Bordeaux",
          speciality: "Packaging"
        },
        category: "Packaging",
        tags: ["Cosmétiques", "Bio", "Écologique"]
      },
      {
        id: 5,
        title: "Affiche événementielle",
        description: "Création d'affiches pour un festival de musique",
        image: "/placeholder.svg",
        author: {
          name: "Emma Rousseau",
          id: 5,
          rating: 4.6,
          location: "Lille",
          speciality: "Print Design"
        },
        category: "Print",
        tags: ["Festival", "Musique", "Affiche"]
      },
      {
        id: 6,
        title: "Animation 2D",
        description: "Animation explicative pour une entreprise tech",
        image: "/placeholder.svg",
        author: {
          name: "Antoine Moreau",
          id: 6,
          rating: 4.8,
          location: "Nantes",
          speciality: "Motion Design"
        },
        category: "Animation",
        tags: ["2D", "Explicatif", "Tech"]
      }
    ];
    
    setWorks(mockWorks);
  }, []);

  const handleViewDesigner = (designerId: number) => {
    navigate(`/provider/${designerId}`);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Portfolio des Designers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les créations exceptionnelles de nos designers talentueux
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <Card key={work.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-gray-200/50">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {work.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {work.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {work.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {work.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {work.author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {work.author.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {work.author.speciality}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">
                          {work.author.rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {work.author.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button 
                  onClick={() => handleViewDesigner(work.author.id)}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transition-all duration-200"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Voir le profil
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Mobile padding */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Designers;
