
import { Button } from "@/components/ui/button";
import { 
  Printer, 
  Palette, 
  Building, 
  Shirt, 
  Monitor, 
  PenTool,
  ArrowUp,
  Star
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Printer,
      title: "Impression",
      description: "Flyers, cartes de visite, affiches, banderoles...",
      color: "from-blue-500 to-blue-600",
      providers: "120+ prestataires"
    },
    {
      icon: Palette,
      title: "Design Graphique",
      description: "Logos, identité visuelle, packaging...",
      color: "from-purple-500 to-purple-600",
      providers: "85+ designers"
    },
    {
      icon: Building,
      title: "Architecture",
      description: "Plans, modélisation 3D, permis de construire...",
      color: "from-orange-500 to-orange-600",
      providers: "45+ architectes"
    },
    {
      icon: Shirt,
      title: "Textile",
      description: "T-shirts, casquettes, textiles personnalisés...",
      color: "from-green-500 to-green-600",
      providers: "60+ spécialistes"
    },
    {
      icon: Monitor,
      title: "Digital",
      description: "Sites web, applications, marketing digital...",
      color: "from-indigo-500 to-indigo-600",
      providers: "95+ experts"
    },
    {
      icon: PenTool,
      title: "Signalétique",
      description: "Enseignes, panneaux, signalisation...",
      color: "from-red-500 to-red-600",
      providers: "40+ fabricants"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Nos services
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Une large gamme de services pour tous vos besoins professionnels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    {service.providers}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 group-hover:scale-105 transition-all duration-200"
                >
                  Découvrir
                  <ArrowUp className="ml-2 h-4 w-4 rotate-45" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
