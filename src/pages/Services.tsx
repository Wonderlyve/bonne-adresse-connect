
import { useState } from "react";
import { usePageReset } from "@/hooks/usePageReset";
import { useServices, Service } from "@/hooks/useServices";
import { useConversations } from "@/hooks/useConversations";
import ServiceCard from "@/components/ServiceCard";
import OrderDialog from "@/components/OrderDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const Services = () => {
  usePageReset();
  
  const { services, loading, fetchServices } = useServices();
  const { createOrFindConversation } = useConversations();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const categories = [
    { value: "all", label: "Toutes les catégories" },
    { value: "imprimerie", label: "Imprimerie" },
    { value: "design-graphique", label: "Design Graphique" },
    { value: "architecture", label: "Architecture" },
    { value: "developpement", label: "Développement" },
    { value: "marketing", label: "Marketing" },
    { value: "photographie", label: "Photographie" }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.provider?.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || service.category?.slug === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleContact = async (providerId: string) => {
    await createOrFindConversation(providerId);
  };

  const handleOrder = (service: Service) => {
    setSelectedService(service);
    setOrderDialogOpen(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchServices();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tous nos services
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez notre large gamme de services professionnels proposés par nos prestataires qualifiés
        </p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Plus de filtres
          </Button>
        </div>
      </div>

      {/* Résultats */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} trouvé{filteredServices.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille des services */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucun service trouvé pour votre recherche</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              fetchServices();
            }}
            className="mt-4"
          >
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onContact={handleContact}
              onOrder={handleOrder}
            />
          ))}
        </div>
      )}

      {/* Dialog de commande */}
      <OrderDialog
        open={orderDialogOpen}
        onOpenChange={setOrderDialogOpen}
        service={selectedService}
      />
    </div>
  );
};

export default Services;
