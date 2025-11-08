
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
  Trash2,
  Eye,
  Percent
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useProviderArticles } from "@/hooks/useProviderArticles";
import { usePromotions } from "@/hooks/usePromotions";
import { useProviderPage } from "@/hooks/useProviderPage";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useProfile();
  const { articles, createArticle, updateArticle, deleteArticle } = useProviderArticles();
  const { promotions, createPromotion, updatePromotion, deletePromotion } = usePromotions();
  const { providerPage, createOrUpdateProviderPage } = useProviderPage();

  const [pageData, setPageData] = useState({
    company_name: "",
    description: "",
    phone: "",
    website_url: "",
    address: "",
    specialties: [] as string[]
  });

  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    content: "",
    price_min: 0,
    price_max: 0,
    category: "",
    delivery_time: "",
    images: [] as string[]
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  const [newPromotion, setNewPromotion] = useState({
    title: "",
    description: "",
    discount_type: "percentage",
    discount_percentage: 0,
    discount_amount: 0,
    code: "",
    end_date: "",
    max_uses: 0,
    min_order_amount: 0
  });

  const categories = [
    "Imprimerie",
    "Design Graphique", 
    "Architecture",
    "Développement",
    "Marketing",
    "Photographie"
  ];

  useEffect(() => {
    if (!profileLoading && (!profile || profile.user_type !== 'provider')) {
      navigate('/');
      return;
    }

    if (providerPage) {
      setPageData({
        company_name: providerPage.company_name || "",
        description: providerPage.description || "",
        phone: providerPage.phone || "",
        website_url: providerPage.website_url || "",
        address: providerPage.address || "",
        specialties: providerPage.specialties || []
      });
    }
  }, [profile, profileLoading, navigate, providerPage]);

  const handlePageUpdate = async () => {
    await createOrUpdateProviderPage(pageData);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Type de fichier non supporté. Utilisez JPG, PNG, WEBP ou GIF.');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image est trop grande. Maximum 5MB.');
      return;
    }

    try {
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
      const filePath = `${profile.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Use signed URL for secure access (works with non-public buckets)
      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from('article-images')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365 * 5); // 5 years validity

      if (urlError) throw urlError;

      setNewArticle({
        ...newArticle,
        images: [...newArticle.images, signedUrlData.signedUrl]
      });

      toast.success('Image ajoutée avec succès');
      
      // Reset file input
      event.target.value = '';
    } catch (error: any) {
      console.error('Erreur lors de l\'upload:', error);
      toast.error(error.message || 'Erreur lors de l\'upload de l\'image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setNewArticle({
      ...newArticle,
      images: newArticle.images.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleCreateArticle = async () => {
    await createArticle(newArticle);
    setNewArticle({
      title: "",
      description: "",
      content: "",
      price_min: 0,
      price_max: 0,
      category: "",
      delivery_time: "",
      images: []
    });
  };

  const handleCreatePromotion = async () => {
    await createPromotion(newPromotion);
    setNewPromotion({
      title: "",
      description: "",
      discount_type: "percentage",
      discount_percentage: 0,
      discount_amount: 0,
      code: "",
      end_date: "",
      max_uses: 0,
      min_order_amount: 0
    });
  };

  if (profileLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!profile || profile.user_type !== 'provider') {
    return null;
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord prestataire</h1>
          <p className="text-gray-600">Gérez votre profil, vos articles et promotions</p>
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
                <FileText className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Articles</p>
                  <p className="text-2xl font-bold">{articles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Percent className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Promotions</p>
                  <p className="text-2xl font-bold">{promotions.length}</p>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="page">Landing Page</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={profile.email} disabled />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nom complet</Label>
                    <Input id="full_name" value={profile.full_name || ""} disabled />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" value={profile.phone || ""} disabled />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Badge variant={profile.status === 'active' ? 'default' : 'destructive'}>
                      {profile.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="articles">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Créer un nouvel article</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Titre de l'article"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                    />
                    <Select 
                      value={newArticle.category} 
                      onValueChange={(value) => setNewArticle({...newArticle, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Textarea
                    placeholder="Description"
                    value={newArticle.description}
                    onChange={(e) => setNewArticle({...newArticle, description: e.target.value})}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="number"
                      placeholder="Prix minimum"
                      value={newArticle.price_min}
                      onChange={(e) => setNewArticle({...newArticle, price_min: parseFloat(e.target.value)})}
                    />
                    <Input
                      type="number"
                      placeholder="Prix maximum"
                      value={newArticle.price_max}
                      onChange={(e) => setNewArticle({...newArticle, price_max: parseFloat(e.target.value)})}
                    />
                    <Input
                      placeholder="Délai de livraison"
                      value={newArticle.delivery_time}
                      onChange={(e) => setNewArticle({...newArticle, delivery_time: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="article-image">Images de l'article</Label>
                    <Input
                      id="article-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && (
                      <p className="text-sm text-muted-foreground">Upload en cours...</p>
                    )}
                    {newArticle.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {newArticle.images.map((img, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={img} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-20 object-cover rounded"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-0 right-0 h-6 w-6 p-0"
                              onClick={() => handleRemoveImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button onClick={handleCreateArticle}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer l'article
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mes articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="border rounded-lg p-4">
                        <div className="flex gap-4">
                          {/* Article Images */}
                          {article.images && article.images.length > 0 && (
                            <div className="flex-shrink-0">
                              <img 
                                src={article.images[0]} 
                                alt={article.title}
                                className="w-32 h-32 object-cover rounded-lg"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/128?text=Image';
                                }}
                              />
                              {article.images.length > 1 && (
                                <p className="text-xs text-gray-500 mt-1 text-center">
                                  +{article.images.length - 1} autre(s)
                                </p>
                              )}
                            </div>
                          )}
                          
                          {/* Article Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg">{article.title}</h3>
                                <Badge variant="secondary" className="mt-1">
                                  {article.category}
                                </Badge>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                  {article.description}
                                </p>
                                <div className="flex items-center gap-4 mt-3">
                                  <p className="text-sm font-semibold text-primary">
                                    ${article.price_min} - ${article.price_max}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Délai: {article.delivery_time}
                                  </p>
                                  <Badge variant={article.is_active ? "default" : "secondary"}>
                                    {article.is_active ? "Actif" : "Inactif"}
                                  </Badge>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => deleteArticle(article.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {articles.length === 0 && (
                      <p className="text-center text-gray-500 py-8">
                        Aucun article créé pour le moment
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="promotions">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Créer une nouvelle promotion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Titre de la promotion"
                      value={newPromotion.title}
                      onChange={(e) => setNewPromotion({...newPromotion, title: e.target.value})}
                    />
                    <Input
                      placeholder="Code promo"
                      value={newPromotion.code}
                      onChange={(e) => setNewPromotion({...newPromotion, code: e.target.value})}
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Description"
                    value={newPromotion.description}
                    onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select 
                      value={newPromotion.discount_type} 
                      onValueChange={(value) => setNewPromotion({...newPromotion, discount_type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Pourcentage</SelectItem>
                        <SelectItem value="fixed">Montant fixe</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {newPromotion.discount_type === 'percentage' ? (
                      <Input
                        type="number"
                        placeholder="% de réduction"
                        value={newPromotion.discount_percentage}
                        onChange={(e) => setNewPromotion({...newPromotion, discount_percentage: parseInt(e.target.value)})}
                      />
                    ) : (
                      <Input
                        type="number"
                        placeholder="Montant de réduction"
                        value={newPromotion.discount_amount}
                        onChange={(e) => setNewPromotion({...newPromotion, discount_amount: parseFloat(e.target.value)})}
                      />
                    )}
                    
                    <Input
                      type="number"
                      placeholder="Utilisations max"
                      value={newPromotion.max_uses}
                      onChange={(e) => setNewPromotion({...newPromotion, max_uses: parseInt(e.target.value)})}
                    />
                    
                    <Input
                      type="date"
                      placeholder="Date de fin"
                      value={newPromotion.end_date}
                      onChange={(e) => setNewPromotion({...newPromotion, end_date: e.target.value})}
                    />
                  </div>
                  
                  <Button onClick={handleCreatePromotion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer la promotion
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mes promotions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {promotions.map((promotion) => (
                      <div key={promotion.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{promotion.title}</h3>
                            <p className="text-sm text-gray-600">{promotion.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge variant="outline">Code: {promotion.code}</Badge>
                              <Badge variant={promotion.is_active ? 'default' : 'secondary'}>
                                {promotion.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => deletePromotion(promotion.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {promotions.length === 0 && (
                      <p className="text-center text-gray-500 py-8">
                        Aucune promotion créée pour le moment
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="page">
            <Card>
              <CardHeader>
                <CardTitle>Ma page prestataire</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Nom de l'entreprise</Label>
                    <Input
                      id="company_name"
                      value={pageData.company_name}
                      onChange={(e) => setPageData({...pageData, company_name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={pageData.phone}
                      onChange={(e) => setPageData({...pageData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website_url">Site web</Label>
                    <Input
                      id="website_url"
                      value={pageData.website_url}
                      onChange={(e) => setPageData({...pageData, website_url: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={pageData.address}
                      onChange={(e) => setPageData({...pageData, address: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={pageData.description}
                    onChange={(e) => setPageData({...pageData, description: e.target.value})}
                    placeholder="Décrivez votre entreprise et vos services..."
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button onClick={handlePageUpdate}>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                  
                  {providerPage && (
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Prévisualiser
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du compte</CardTitle>
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default ProviderDashboard;
