
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Settings, Star, Package, MessageCircle, Shield, Calendar, Heart, FileText, Camera } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { toast } from "sonner";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: ""
  });

  const { profile, loading } = useProfile();
  const { updateProfile, uploadProfilePhoto, isUpdating, isUploadingPhoto } = useProfileUpdate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        email: profile.email || "",
        phone: profile.phone || ""
      });
    }
  }, [profile]);

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("La taille du fichier ne doit pas dépasser 5MB");
      return;
    }

    await uploadProfilePhoto(file);
    window.location.reload(); // Recharger pour voir la nouvelle photo
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Profil non trouvé</p>
        </div>
      </div>
    );
  }

  const userStats = [
    { label: "Commandes", value: "0", icon: Package, color: "text-blue-600" },
    { label: "Note moyenne", value: "5.0", icon: Star, color: "text-yellow-600" },
    { label: "Messages", value: "0", icon: MessageCircle, color: "text-green-600" },
    { label: "Favoris", value: "0", icon: Heart, color: "text-red-600" },
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
                  src={profile.avatar_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <label className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={isUploadingPhoto}
                  />
                </label>
                <Badge className="absolute -bottom-2 -left-2 bg-green-500 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Vérifié
                </Badge>
              </div>
              <div className="text-center md:text-left flex-1 mt-4 md:mt-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile.full_name || profile.email}
                </h1>
                <p className="text-gray-600 mb-2">
                  {profile.user_type === 'provider' ? 'Prestataire' : 'Client'} depuis {new Date(profile.created_at).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {profile.email}
                  </div>
                  {profile.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {profile.phone}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Membre depuis {Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24 * 30))} mois
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-16">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {isEditing ? "Annuler" : "Modifier le profil"}
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
                          value={formData.full_name}
                          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex space-x-4">
                        <Button onClick={handleSave} disabled={isUpdating}>
                          {isUpdating ? "Sauvegarde..." : "Sauvegarder les modifications"}
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Annuler
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune commande pour le moment</p>
                  </div>
                )}

                {activeTab === "favorites" && (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun favori pour le moment</p>
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
                    <span>Profil créé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Compte vérifié</span>
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
