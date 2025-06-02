
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Activity
} from "lucide-react";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [isCreateAdOpen, setIsCreateAdOpen] = useState(false);
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [adImage, setAdImage] = useState("");
  const [adLink, setAdLink] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('superAdmin');
    navigate('/');
  };

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating ad:", { adTitle, adDescription, adImage, adLink });
    setIsCreateAdOpen(false);
    setAdTitle("");
    setAdDescription("");
    setAdImage("");
    setAdLink("");
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
      title: "Boosts Actifs",
      value: "67",
      icon: TrendingUp,
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
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Native Ad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Gestion des Publicités</span>
              </CardTitle>
              <CardDescription>
                Créer et gérer les publicités natives de l'application
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

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Actions Rapides</span>
              </CardTitle>
              <CardDescription>
                Accès rapide aux fonctionnalités d'administration
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
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analyser les Performances
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
                <ShoppingCart className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Nouvelle commande passée</p>
                  <p className="text-xs text-gray-500">Il y a 18 minutes</p>
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
