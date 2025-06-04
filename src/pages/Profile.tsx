
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Settings, Star, Package, MessageCircle, Shield, Calendar, Heart, FileText, Camera, Upload } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { useAuthContext } from "@/contexts/AuthContext";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: ""
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  
  const { profile } = useProfile();
  const { updateProfile, uploadAvatar, isUpdating, isUploadingAvatar } = useProfileUpdate();
  const { user } = useAuthContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone: profile.phone || ""
      });
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    const result = await updateProfile(formData);
    if (!result.error && avatarFile) {
      await uploadAvatar(avatarFile);
      setAvatarFile(null);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const userStats = [
    { label: "Commandes", value: "0", icon: Package, color: "text-blue-600" },
    { label: "Note moyenne", value: "5.0", icon: Star, color: "text-yellow-600" },
    { label: "Messages", value: "0", icon: MessageCircle, color: "text-green-600" },
    { label: "Favoris", value: "0", icon: Heart, color: "text-red-600" },
  ];

  const recentOrders = [
    { id: "CMD-001", service: "Aucune commande", provider: "En attente", status: "Nouveau", date: new Date().toLocaleDateString() },
  ];

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 h-32"></div>
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 -mt-16 relative">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage 
                    src={profile.avatar_url || undefined} 
                    alt="Profile" 
                  />
                  <AvatarFallback className="text-2xl bg-primary-100">
                    {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : profile.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Vérifié
                </Badge>
              </div>
              <div className="text-center md:text-left flex-1 mt-4 md:mt-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile.full_name || profile.email}
                </h1>
                <p className="text-gray-600 mb-2">
                  {profile.user_type === 'client' ? 'Client' : 'Prestataire'} depuis {new Date(profile.created_at).toLocaleDateString()}
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
                    Membre depuis {Math.ceil((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24 * 30))} mois
                  </div>
                </div>
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
                    {/* Photo de profil */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage 
                          src={profile.avatar_url || undefined} 
                          alt="Profile" 
                        />
                        <AvatarFallback className="text-lg">
                          {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : profile.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Label htmlFor="avatar-upload" className="cursor-pointer">
                          <div className="flex items-center space-x-2 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-md transition-colors">
                            <Camera className="h-4 w-4" />
                            <span>Changer la photo</span>
                          </div>
                        </Label>
                        <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        {avatarFile && (
                          <p className="text-sm text-green-600 mt-1">
                            Nouvelle photo sélectionnée: {avatarFile.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="full_name">Nom complet</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={profile.email}
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+243 XXX XXX XXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="user_type">Type de compte</Label>
                        <Input
                          id="user_type"
                          value={profile.user_type === 'client' ? 'Client' : 'Prestataire'}
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button 
                        onClick={handleSaveProfile}
                        disabled={isUpdating || isUploadingAvatar}
                      >
                        {isUpdating || isUploadingAvatar ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setFormData({
                            full_name: profile.full_name || "",
                            phone: profile.phone || ""
                          });
                          setAvatarFile(null);
                        }}
                      >
                        Annuler
                      </Button>
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
                        <Badge variant="secondary">
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "favorites" && (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun prestataire favori pour le moment</p>
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
