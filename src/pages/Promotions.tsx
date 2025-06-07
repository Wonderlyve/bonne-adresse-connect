
import { useState } from "react";
import { usePageReset } from "@/hooks/usePageReset";
import { usePromotions } from "@/hooks/usePromotions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Percent, Tag, Calendar, Users } from "lucide-react";

const Promotions = () => {
  usePageReset();
  
  const { promotions, loading } = usePromotions();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || 
                         (filterType === "active" && promotion.is_active) ||
                         (filterType === "expired" && !promotion.is_active);
    
    return matchesSearch && matchesFilter;
  });

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Percent className="h-10 w-10 mr-3 text-primary-600" />
          Promotions et Offres Spéciales
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Découvrez les meilleures promotions proposées par nos prestataires qualifiés
        </p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher une promotion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les promotions</SelectItem>
              <SelectItem value="active">Promotions actives</SelectItem>
              <SelectItem value="expired">Promotions expirées</SelectItem>
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
          {filteredPromotions.length} promotion{filteredPromotions.length > 1 ? 's' : ''} trouvée{filteredPromotions.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille des promotions */}
      {filteredPromotions.length === 0 ? (
        <div className="text-center py-12">
          <Percent className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Aucune promotion trouvée</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setFilterType("all");
            }}
            className="mt-4"
          >
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromotions.map((promotion) => (
            <Card key={promotion.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-primary-50 to-secondary-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-primary-600" />
                    {promotion.title}
                  </CardTitle>
                  <Badge variant={promotion.is_active ? "default" : "secondary"}>
                    {promotion.is_active ? "Active" : "Expirée"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-600">{promotion.description}</p>
                  
                  <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Code promo:</span>
                    <span className="font-mono font-bold text-primary-600 bg-white px-3 py-1 rounded border">
                      {promotion.code}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {promotion.discount_type === 'percentage' 
                          ? `${promotion.discount_percentage}%` 
                          : `$${promotion.discount_amount}`
                        }
                      </div>
                      <div className="text-xs text-green-700">
                        {promotion.discount_type === 'percentage' ? 'Réduction' : 'Rabais fixe'}
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600 flex items-center justify-center">
                        <Users className="h-4 w-4 mr-1" />
                        {promotion.current_uses || 0}/{promotion.max_uses || '∞'}
                      </div>
                      <div className="text-xs text-blue-700">Utilisations</div>
                    </div>
                  </div>
                  
                  {promotion.end_date && (
                    <div className="flex items-center justify-center p-3 bg-orange-50 rounded-lg">
                      <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                      <span className="text-sm text-orange-700">
                        Expire le {new Date(promotion.end_date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  
                  {promotion.min_order_amount > 0 && (
                    <div className="text-center p-2 bg-gray-50 rounded text-sm text-gray-600">
                      Commande minimum: ${promotion.min_order_amount}
                    </div>
                  )}
                  
                  <Button className="w-full" disabled={!promotion.is_active}>
                    {promotion.is_active ? 'Utiliser cette promotion' : 'Promotion expirée'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Promotions;
