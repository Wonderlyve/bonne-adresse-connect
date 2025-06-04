
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification des identifiants super admin
    if (email !== "superadmin@super.com" || password !== "Supreradminwonder2020") {
      toast.error("Identifiants super admin incorrects");
      return;
    }

    setIsLoading(true);
    
    try {
      // Tentative de connexion avec Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Si le compte n'existe pas, on le crée
        if (error.message.includes('Invalid login credentials')) {
          toast.info("Création du compte super admin...");
          
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: "Super Admin",
                user_type: "admin"
              }
            }
          });

          if (signUpError) {
            throw signUpError;
          }

          if (signUpData.user) {
            // Mettre à jour le profil pour marquer comme admin
            await supabase
              .from('profiles')
              .update({ 
                user_type: 'admin',
                full_name: 'Super Admin'
              })
              .eq('id', signUpData.user.id);
            
            toast.success("Compte super admin créé et connecté");
            navigate("/super-admin");
          }
        } else {
          throw error;
        }
      } else if (data.user) {
        toast.success("Connexion super admin réussie");
        navigate("/super-admin");
      }
    } catch (error: any) {
      console.error("Erreur connexion super admin:", error);
      toast.error(`Erreur: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-red-200">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Super Admin
          </CardTitle>
          <CardDescription className="text-gray-600">
            Accès administrateur système
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email super admin</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superadmin@super.com"
                required
                className="border-red-200 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Supreradminwonder2020"
                  required
                  className="border-red-200 focus:border-red-500 focus:ring-red-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminLogin;
