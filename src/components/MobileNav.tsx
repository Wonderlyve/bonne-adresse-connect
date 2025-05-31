
import { Link, useLocation } from "react-router-dom";
import { Home, Search, MessageCircle, ShoppingBag, User } from "lucide-react";

const MobileNav = () => {
  const location = useLocation();

  const navigation = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Recherche", href: "/providers", icon: Search },
    { name: "Messages", href: "/messages", icon: MessageCircle },
    { name: "Commandes", href: "/orders", icon: ShoppingBag },
    { name: "Profil", href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "scale-110" : ""}`} />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
