
import { useState } from "react";
import { Search, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Logique de recherche à implémenter
    console.log("Recherche:", { searchQuery, location });
  };

  const handleQuickDelivery = () => {
    navigate("/services");
  };

  return (
    <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Trouvez le <span className="text-yellow-300">Prestataire</span> Parfait
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Imprimerie, Design, Architecture et bien plus encore
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Que recherchez-vous ?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-gray-900 border-gray-300 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="md:col-span-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Où ?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 text-gray-900 border-gray-300 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="md:col-span-3 flex gap-2">
                <Button 
                  onClick={handleSearch}
                  className="h-12 bg-primary-600 hover:bg-primary-700 text-white flex-1"
                >
                  Rechercher
                </Button>
                <Button 
                  onClick={handleQuickDelivery}
                  variant="outline"
                  className="h-12 border-primary-600 text-primary-600 hover:bg-primary-50 flex items-center"
                  title="Livraison rapide"
                >
                  <Truck className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-blue-100 mb-4">Services populaires :</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Impression", "Logo Design", "Site Web", "Architecture", "Marketing"].map((service) => (
                <Button
                  key={service}
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
