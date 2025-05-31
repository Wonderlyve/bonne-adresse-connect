
import { Button } from "@/components/ui/button";
import { Search, ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%239C92AC\" fill-opacity=\"0.05\"><circle cx=\"30\" cy=\"30\" r=\"4\"/></g></g></svg>')] animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                La Bonne Adresse
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              La plateforme qui connecte vos projets aux meilleurs prestataires locaux
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Impression, design, architecture... Trouvez le professionnel qu'il vous faut près de chez vous
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-xl border border-gray-200/50">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Que recherchez-vous ? (ex: impression flyers, logo design...)"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Où ? (Ville, code postal...)"
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <Button className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 transform transition-all duration-200 hover:scale-105 shadow-lg">
                Rechercher
              </Button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {["Impression", "Design Graphique", "Architecture", "Signalétique", "Textile", "Digital"].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="rounded-full border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300 transition-all duration-200 hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-gray-600">Prestataires de confiance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600">10k+</div>
              <div className="text-gray-600">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600">98%</div>
              <div className="text-gray-600">Clients satisfaits</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
