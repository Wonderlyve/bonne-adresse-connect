
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Providers from "./pages/Providers";
import ProviderProfile from "./pages/ProviderProfile";
import Designers from "./pages/Designers";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Messages from "./pages/Messages";
import ChatDetail from "./pages/ChatDetail";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import OrderService from "./pages/OrderService";
import ContactProvider from "./pages/ContactProvider";
import PrintingServices from "./pages/PrintingServices";
import DesignServices from "./pages/DesignServices";
import ArchitectureServices from "./pages/ArchitectureServices";
import DevelopmentServices from "./pages/DevelopmentServices";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProviderDashboard from "./pages/ProviderDashboard";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import InstallPrompt from "./components/InstallPrompt";
import AdDetail from "./pages/AdDetail";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<SuperAdminLogin />} />
            <Route path="/admin-dashboard" element={<SuperAdminDashboard />} />
            
            {/* Regular Routes */}
            <Route 
              path="/*" 
              element={
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/providers" element={<Providers />} />
                    <Route path="/provider/:id" element={<ProviderProfile />} />
                    <Route path="/designers" element={<Designers />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/chat/:id" element={<ChatDetail />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/order-service" element={<OrderService />} />
                    <Route path="/contact-provider" element={<ContactProvider />} />
                    <Route path="/imprimeurs" element={<PrintingServices />} />
                    <Route path="/designers-services" element={<DesignServices />} />
                    <Route path="/architectes" element={<ArchitectureServices />} />
                    <Route path="/developpeurs" element={<DevelopmentServices />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/provider-dashboard" element={<ProviderDashboard />} />
                    <Route path="/ad/:id" element={<AdDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <MobileNav />
                  <InstallPrompt />
                </div>
              } 
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
