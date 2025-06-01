
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  FileText, 
  Image, 
  DollarSign, 
  Star, 
  MessageCircle, 
  ShoppingBag,
  Edit,
  Save,
  Plus,
  Trash2
} from "lucide-react";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({
    name: "Print Express",
    category: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    location: "",
    coverImage: "",
    profileImage: ""
  });
  const [services, setServices] = useState([
    { id: 1, name: "Impression de flyers", price: "50", description: "Flyers couleur haute qualité" }
  ]);

  const categories = [
    "Imprimerie",
    "Design Graphique", 
    "Architecture",
    "Développement",
    "Marketing"
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.userType !== 'provider') {
      navigate('/');
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  const handleProfileUpdate = () => {
    // Mock update - in real app, this would call an API
    alert("Profil mis à jour avec succès !");
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      name: "",
      price: "",
      description: ""
    };
    setServices([...services, newService]);
  };

  const updateService = (id: number, field: string, value: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ));
  };

  const removeService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Gérez votre profil et vos services</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Note moyenne</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <MessageCircle className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Messages</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Commandes</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Revenus</p>
                  <p className="text-2xl font-bold">$1,250</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profil</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Paramètres</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="h-5 w-5" />
                  <span>Informations du profil</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de l'entreprise</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Domaine d'intervention</Label>
                    <Select 
                      value={profile.category} 
                      onValueChange={(value) => setProfile({...profile, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un domaine" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={profile.description}
                    onChange={(e) => setProfile({...profile, description: e.target.value})}
                    placeholder="Décrivez votre entreprise et vos services..."
                  />
                </div>
                
                <Button onClick={handleProfileUpdate} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Sauvegarder le profil</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Mes services</span>
                  </CardTitle>
                  <Button onClick={addService} size="sm" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Ajouter un service</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Nom du service</Label>
                          <Input
                            value={service.name}
                            onChange={(e) => updateService(service.id, 'name', e.target.value)}
                            placeholder="Ex: Impression de flyers"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Prix (USD)</Label>
                          <Input
                            value={service.price}
                            onChange={(e) => updateService(service.id, 'price', e.target.value)}
                            placeholder="Ex: 50"
                          />
                        </div>
                        
                        <div className="flex items-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeService(service.id)}
                            className="flex items-center space-x-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Supprimer</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, 'description', e.target.value)}
                          placeholder="Description du service..."
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image className="h-5 w-5" />
                  <span>Portfolio</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Fonctionnalité à venir</p>
                  <p className="text-sm text-gray-400">Vous pourrez bientôt ajouter vos réalisations</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Paramètres du compte</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Visibilité du profil</h3>
                      <p className="text-sm text-gray-600">Votre profil est visible publiquement</p>
                    </div>
                    <Badge variant="secondary">Actif</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Notifications email</h3>
                      <p className="text-sm text-gray-600">Recevoir les notifications par email</p>
                    </div>
                    <Badge variant="secondary">Activé</Badge>
                  </div>
                  
                  <Button variant="destructive">
                    Supprimer le compte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Mobile padding */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default ProviderDashboard;
