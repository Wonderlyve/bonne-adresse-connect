
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, MessageCircle, ShoppingBag, LogOut, LayoutDashboard } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthContext();

  const navigation = [
    { name: "Accueil", href: "/", current: location.pathname === "/" },
    { name: "Prestataires", href: "/providers", current: location.pathname === "/providers" },
    { name: "Designers", href: "/designers", current: location.pathname === "/designers" },
    { name: "Services", href: "/services", current: location.pathname === "/services" },
    { name: "À propos", href: "/about", current: location.pathname === "/about" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/providers?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">BA</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                La Bonne Adresse
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  item.current
                    ? "text-primary-600 bg-primary-50 border-b-2 border-primary-600"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon */}
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                  <Search className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Rechercher</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Que recherchez-vous ?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" className="w-full">
                    Rechercher
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {user?.userType === 'provider' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/provider-dashboard')}
                    className="hover:bg-gray-100"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                  </Button>
                )}
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary-100 text-primary-700">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-gray-100">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-primary-200 text-primary-600 hover:bg-primary-50"
                  onClick={() => navigate('/login')}
                >
                  Connexion
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                  onClick={() => navigate('/register')}
                >
                  S'inscrire
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slide-in">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </form>

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  item.current
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center px-3 py-2">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary-100 text-primary-700">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-700">{user?.name}</span>
                  </div>
                  {user?.userType === 'provider' && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        navigate('/provider-dashboard');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Tableau de bord
                    </Button>
                  )}
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full border-primary-200 text-primary-600"
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Connexion
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600"
                    onClick={() => {
                      navigate('/register');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    S'inscrire
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
