import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Settings, Star, Package, MessageCircle, Shield, Calendar, Heart, FileText, Camera } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { profile, loading, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: ""
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone: profile.phone || "",
        email: profile.email || ""
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file || !profile) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Veuillez sélectionner une image");
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 2 MB");
        return;
      }

      setUploading(true);

      // Delete old avatar if exists
      if (profile.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('avatars')
            .remove([`${profile.id}/${oldPath}`]);
        }
      }

      // Upload new avatar
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${profile.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await updateProfile({
        avatar_url: publicUrl
      });

      if (updateError) throw updateError;

      toast.success("Photo de profil mise à jour");
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error("Erreur lors de l'upload de l'image");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const { error } = await updateProfile({
        full_name: formData.full_name,
        phone: formData.phone
      });

      if (error) throw error;

      toast.success("Profil mis à jour avec succès");
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600">Veuillez vous connecter pour voir votre profil</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div 
                  className="relative cursor-pointer group"
                  onClick={handleAvatarClick}
                >
                  <img
                    src={profile.avatar_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {uploading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    ) : (
                      <Camera className="h-8 w-8 text-white" />
                    )}
                  </div>
                </div>
                <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Vérifié
                </Badge>
              </div>
              <div className="text-center md:text-left flex-1 mt-4 md:mt-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.full_name || 'Utilisateur'}</h1>
                <p className="text-gray-600 mb-2">
                  {profile.user_type === 'provider' ? 'Prestataire' : 'Client'} depuis {new Date(profile.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
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
                          onChange={(e) => handleInputChange('full_name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button onClick={handleSaveProfile} disabled={saving}>
                        {saving ? "Sauvegarde..." : "Sauvegarder les modifications"}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          if (profile) {
                            setFormData({
                              full_name: profile.full_name || "",
                              phone: profile.phone || "",
                              email: profile.email || ""
                            });
                          }
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
                    <span>Profil mis à jour</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Connexion récente</span>
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
