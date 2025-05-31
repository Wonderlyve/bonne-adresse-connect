
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Settings, Star, Package, MessageCircle, Shield } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const userStats = [
    { label: "Commandes totales", value: "23", icon: Package },
    { label: "Évaluations", value: "4.8", icon: Star },
    { label: "Messages", value: "156", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <Badge className="absolute -bottom-1 -right-1 bg-green-500">
                  <Shield className="h-3 w-3" />
                </Badge>
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Marie Ngoma</h1>
                <p className="text-gray-600 mb-4">Cliente vérifiée depuis Mars 2023</p>
                <div className="flex justify-center md:justify-start space-x-4 text-sm text-gray-600">
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
                </div>
              </div>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: "profile", label: "Profil" },
            { id: "orders", label: "Commandes récentes" },
            { id: "favorites", label: "Favoris" },
            { id: "reviews", label: "Mes avis" }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-b-none"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "profile" && "Informations personnelles"}
              {activeTab === "orders" && "Commandes récentes"}
              {activeTab === "favorites" && "Prestataires favoris"}
              {activeTab === "reviews" && "Mes évaluations"}
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
                </div>
                <Button className="mt-6">Sauvegarder les modifications</Button>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Vos commandes récentes apparaîtront ici</p>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Vos prestataires favoris apparaîtront ici</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Vos évaluations apparaîtront ici</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default Profile;
