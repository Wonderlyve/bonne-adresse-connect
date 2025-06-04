
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Settings, Star, Package, MessageCircle, Shield, Calendar, Heart, FileText } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userStats = [
    { label: "Commandes", value: "23", icon: Package, color: "text-blue-600" },
    { label: "Note moyenne", value: "4.8", icon: Star, color: "text-yellow-600" },
    { label: "Messages", value: "156", icon: MessageCircle, color: "text-green-600" },
    { label: "Favoris", value: "12", icon: Heart, color: "text-red-600" },
  ];

  const recentOrders = [
    { id: "CMD-001", service: "Impression Flyers", provider: "Print Express", status: "Livré", date: "15 Jan 2024" },
    { id: "CMD-002", service: "Logo Design", provider: "Creative Studio", status: "En cours", date: "20 Jan 2024" },
    { id: "CMD-003", service: "Plan Architecture", provider: "Archi Plus", status: "En attente", date: "22 Jan 2024" },
  ];

  const favoriteProviders = [
    { name: "Print Express", category: "Imprimerie", rating: 4.8 },
    { name: "Creative Studio", category: "Design", rating: 4.9 },
    { name: "Archi Plus", category: "Architecture", rating: 4.7 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 h-32"></div>
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 -mt-16 relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Vérifié
                </Badge>
              </div>
              <div className="text-center md:text-left flex-1 mt-4 md:mt-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Marie Ngoma</h1>
                <p className="text-gray-600 mb-2">Cliente depuis Mars 2023</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    marie.ngoma@email.com
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    +243 123 456 789
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Kinshasa, RDC
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Membre depuis 10 mois
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-16">
                <Button variant="outline" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Modifier le profil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className={`inline-flex p-3 bg-gray-100 rounded-full mb-3`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "profile", label: "Informations", icon: User },
            { id: "orders", label: "Commandes", icon: Package },
            { id: "favorites", label: "Favoris", icon: Heart },
            { id: "reviews", label: "Mes avis", icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center"
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {activeTab === "profile" && (
                    <>
                      <User className="h-5 w-5 mr-2" />
                      Informations personnelles
                    </>
                  )}
                  {activeTab === "orders" && (
                    <>
                      <Package className="h-5 w-5 mr-2" />
                      Commandes récentes
                    </>
                  )}
                  {activeTab === "favorites" && (
                    <>
                      <Heart className="h-5 w-5 mr-2" />
                      Prestataires favoris
                    </>
                  )}
                  {activeTab === "reviews" && (
                    <>
                      <Star className="h-5 w-5 mr-2" />
                      Mes évaluations
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                        <input
                          type="text"
                          value="Marie Ngoma"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value="marie.ngoma@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input
                          type="tel"
                          value="+243 123 456 789"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                        <input
                          type="text"
                          value="Kinshasa"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                          placeholder="Parlez-nous un peu de vous..."
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button>Sauvegarder les modifications</Button>
                      <Button variant="outline">Annuler</Button>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{order.service}</h4>
                          <p className="text-sm text-gray-600">{order.provider} • {order.date}</p>
                        </div>
                        <Badge variant={order.status === "Livré" ? "default" : "secondary"}>
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Voir toutes les commandes
                    </Button>
                  </div>
                )}

                {activeTab === "favorites" && (
                  <div className="space-y-4">
                    {favoriteProviders.map((provider) => (
                      <div key={provider.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{provider.name}</h4>
                          <p className="text-sm text-gray-600">{provider.category}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{provider.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Vos évaluations apparaîtront ici</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Commande CMD-002 mise à jour</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Nouveau message reçu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Évaluation ajoutée</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramètres rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres du compte
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Sécurité
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Profile;
