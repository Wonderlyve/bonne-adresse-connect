
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Store, 
  ShoppingCart, 
  TrendingUp, 
  Plus, 
  LogOut,
  Shield,
  Eye,
  DollarSign,
  Activity,
  Settings,
  Package,
  Lock,
  EyeOff,
  Percent
} from "lucide-react";
import { toast } from "sonner";
import { useServices } from "@/hooks/useServices";
import { useAds } from "@/hooks/useAds";
import { usePromotions } from "@/hooks/usePromotions";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { createService } = useServices();
  const { createAd } = useAds();
  const { createPromotion } = usePromotions();
  
  const [isCreateAdOpen, setIsCreateAdOpen] = useState(false);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [isServiceManagementOpen, setIsServiceManagementOpen] = useState(false);
  const [isCreatePromotionOpen, setIsCreatePromotionOpen] = useState(false);
  
  // État pour créer une publicité
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [adImage, setAdImage] = useState("");
  const [adLink, setAdLink] = useState("");
  
  // État pour changer le mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  
  // État pour gestion des services
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePriceMin, setServicePriceMin] = useState("");
  const [servicePriceMax, setServicePriceMax] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceDeliveryTime, setServiceDeliveryTime] = useState("");

  // État pour créer une promotion
  const [promotionTitle, setPromotionTitle] = useState("");
  const [promotionDescription, setPromotionDescription] = useState("");
  const [promotionCode, setPromotionCode] = useState("");
  const [promotionDiscountType, setPromotionDiscountType] = useState("percentage");
  const [promotionDiscountPercentage, setPromotionDiscountPercentage] = useState("");
  const [promotionDiscountAmount, setPromotionDiscountAmount] = useState("");
  const [promotionEndDate, setPromotionEndDate] = useState("");
  const [promotionMaxUses, setPromotionMaxUses] = useState("");

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const session = localStorage.getItem('superAdminSession');
    if (!session) {
      navigate('/super-admin');
      return;
    }

    try {
      const sessionData = JSON.parse(session);
      // Vérifier si la session est valide (moins de 24h)
      const sessionAge = Date.now() - sessionData.loginTime;
      if (sessionAge > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('superAdminSession');
        navigate('/super-admin');
        toast.error("Session expirée, veuillez vous reconnecter");
      }
    } catch (error) {
      localStorage.removeItem('superAdminSession');
      navigate('/super-admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('superAdminSession');
    navigate('/');
    toast.success("Déconnexion réussie");
  };

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const adData = {
      title: adTitle,
      description: adDescription,
      image_url: adImage,
      link_url: adLink,
      is_active: true,
      position: 'hero'
    };

    const result = await createAd(adData);
    if (result) {
      setIsCreateAdOpen(false);
      setAdTitle("");
      setAdDescription("");
      setAdImage("");
      setAdLink("");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Simulation du changement de mot de passe
    toast.success("Mot de passe modifié avec succès");
    setIsPasswordChangeOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleServiceManagement = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer un service avec un provider_id temporaire (super admin)
    const serviceData = {
      title: serviceName,
      description: serviceDescription,
      price_min: parseFloat(servicePriceMin) || 0,
      price_max: parseFloat(servicePriceMax) || 0,
      price_unit: 'USD',
      delivery_time: serviceDeliveryTime,
      category_id: serviceCategory,
      is_active: true,
      images: ['/placeholder.svg']
    };

    const result = await createService(serviceData);
    if (result) {
      setIsServiceManagementOpen(false);
      setServiceName("");
      setServiceDescription("");
      setServicePriceMin("");
      setServicePriceMax("");
      setServiceCategory("");
      setServiceDeliveryTime("");
    }
  };

  const handleCreatePromotion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const promotionData = {
      title: promotionTitle,
      description: promotionDescription,
      code: promotionCode,
      discount_type: promotionDiscountType,
      discount_percentage: promotionDiscountType === 'percentage' ? parseInt(promotionDiscountPercentage) : 0,
      discount_amount: promotionDiscountType === 'fixed' ? parseFloat(promotionDiscountAmount) : 0,
      end_date: promotionEndDate,
      max_uses: parseInt(promotionMaxUses) || 0,
      is_active: true
    };

    const result = await createPromotion(promotionData);
    if (result) {
      setIsCreatePromotionOpen(false);
      setPromotionTitle("");
      setPromotionDescription("");
      setPromotionCode("");
      setPromotionDiscountPercentage("");
      setPromotionDiscountAmount("");
      setPromotionEndDate("");
      setPromotionMaxUses("");
    }
  };

  const stats = [
    {
      title: "Utilisateurs Total",
      value: "2,847",
      icon: Users,
      description: "+12% ce mois",
      color: "text-blue-600"
    },
    {
      title: "Prestataires",
      value: "342",
      icon: Store,
      description: "+8% ce mois",
      color: "text-green-600"
    },
    {
      title: "Commandes",
      value: "1,234",
      icon: ShoppingCart,
      description: "+23% ce mois",
      color: "text-orange-600"
    },
    {
      title: "Services Actifs",
      value: "67",
      icon: Package,
      description: "+15% ce mois",
      color: "text-purple-600"
    },
    {
      title: "Revenus",
      value: "45,890€",
      icon: DollarSign,
      description: "+18% ce mois",
      color: "text-green-600"
    },
    {
      title: "Taux d'activité",
      value: "89%",
      icon: Activity,
      description: "+5% ce mois",
      color: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-red-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Tableau de Bord Super Admin
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={isPasswordChangeOpen} onOpenChange={setIsPasswordChangeOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Lock className="h-4 w-4 mr-2" />
                    Mot de passe
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Changer le mot de passe</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mot de passe actuel</label>
                      <div className="relative">
                        <Input
                          type={showPasswords ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords(!showPasswords)}
                        >
                          {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Input
                      type={showPasswords ? "text" : "password"}
                      placeholder="Nouveau mot de passe"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <Input
                      type={showPasswords ? "text" : "password"}
                      placeholder="Confirmer le nouveau mot de passe"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Changer le mot de passe
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Create Native Ad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Publicités</span>
              </CardTitle>
              <CardDescription>
                Créer et gérer les publicités natives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isCreateAdOpen} onOpenChange={setIsCreateAdOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une Publicité
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Nouvelle Publicité Native</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateAd} className="space-y-4">
                    <Input
                      placeholder="Titre de la publicité"
                      value={adTitle}
                      onChange={(e) => setAdTitle(e.target.value)}
                      required
                    />
                    <Textarea
                      placeholder="Description"
                      value={adDescription}
                      onChange={(e) => setAdDescription(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="URL de l'image"
                      value={adImage}
                      onChange={(e) => setAdImage(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Lien de destination"
                      value={adLink}
                      onChange={(e) => setAdLink(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Créer la Publicité
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Service Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Services</span>
              </CardTitle>
              <CardDescription>
                Gérer les services de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isServiceManagementOpen} onOpenChange={setIsServiceManagementOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Gérer les Services
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Gestion des Services</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleServiceManagement} className="space-y-4">
                    <Input
                      placeholder="Nom du service"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      required
                    />
                    <Textarea
                      placeholder="Description du service"
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Prix min"
                        type="number"
                        value={servicePriceMin}
                        onChange={(e) => setServicePriceMin(e.target.value)}
                        required
                      />
                      <Input
                        placeholder="Prix max"
                        type="number"
                        value={servicePriceMax}
                        onChange={(e) => setServicePriceMax(e.target.value)}
                        required
                      />
                    </div>
                    <Select value={serviceCategory} onValueChange={setServiceCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="imprimerie">Imprimerie</SelectItem>
                        <SelectItem value="design-graphique">Design Graphique</SelectItem>
                        <SelectItem value="architecture">Architecture</SelectItem>
                        <SelectItem value="developpement">Développement</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="photographie">Photographie</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Délai de livraison (ex: 3-5 jours)"
                      value={serviceDeliveryTime}
                      onChange={(e) => setServiceDeliveryTime(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Ajouter le Service
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Promotion Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Percent className="h-5 w-5" />
                <span>Promotions</span>
              </CardTitle>
              <CardDescription>
                Créer des promotions générales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isCreatePromotionOpen} onOpenChange={setIsCreatePromotionOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une Promotion
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Nouvelle Promotion</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreatePromotion} className="space-y-4">
                    <Input
                      placeholder="Titre de la promotion"
                      value={promotionTitle}
                      onChange={(e) => setPromotionTitle(e.target.value)}
                      required
                    />
                    <Textarea
                      placeholder="Description"
                      value={promotionDescription}
                      onChange={(e) => setPromotionDescription(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Code promo"
                      value={promotionCode}
                      onChange={(e) => setPromotionCode(e.target.value)}
                      required
                    />
                    <Select value={promotionDiscountType} onValueChange={setPromotionDiscountType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Pourcentage</SelectItem>
                        <SelectItem value="fixed">Montant fixe</SelectItem>
                      </SelectContent>
                    </Select>
                    {promotionDiscountType === 'percentage' ? (
                      <Input
                        type="number"
                        placeholder="% de réduction"
                        value={promotionDiscountPercentage}
                        onChange={(e) => setPromotionDiscountPercentage(e.target.value)}
                        required
                      />
                    ) : (
                      <Input
                        type="number"
                        placeholder="Montant de réduction"
                        value={promotionDiscountAmount}
                        onChange={(e) => setPromotionDiscountAmount(e.target.value)}
                        required
                      />
                    )}
                    <Input
                      type="date"
                      placeholder="Date de fin"
                      value={promotionEndDate}
                      onChange={(e) => setPromotionEndDate(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Utilisations max"
                      value={promotionMaxUses}
                      onChange={(e) => setPromotionMaxUses(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                      Créer la Promotion
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Actions Rapides</span>
              </CardTitle>
              <CardDescription>
                Accès rapide aux fonctionnalités
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Gérer les Utilisateurs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Store className="h-4 w-4 mr-2" />
                Gérer les Prestataires
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/services')}
              >
                <Package className="h-4 w-4 mr-2" />
                Voir la Page Services
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
            <CardDescription>
              Dernières actions sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Nouvel utilisateur inscrit</p>
                  <p className="text-xs text-gray-500">Il y a 5 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Store className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Nouveau prestataire validé</p>
                  <p className="text-xs text-gray-500">Il y a 12 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Package className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Nouveau service ajouté</p>
                  <p className="text-xs text-gray-500">Il y a 25 minutes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
