
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Shield, Clock, Award } from "lucide-react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Paiement sécurisé",
      description: "Transactions protégées avec déblocage après validation"
    },
    {
      icon: Users,
      title: "Prestataires vérifiés",
      description: "Tous nos partenaires sont contrôlés et certifiés"
    },
    {
      icon: Clock,
      title: "Livraison garantie",
      description: "Respect des délais ou remboursement"
    },
    {
      icon: Award,
      title: "Qualité assurée",
      description: "Note moyenne de 4.8/5 sur tous nos services"
    }
  ];

  const stats = [
    { number: "500+", label: "Prestataires partenaires", color: "text-primary-600" },
    { number: "10,000+", label: "Projets réalisés", color: "text-secondary-600" },
    { number: "98%", label: "Clients satisfaits", color: "text-accent-600" },
    { number: "24/7", label: "Support client", color: "text-green-600" }
  ];

  const services = [
    {
      title: "Impression",
      description: "Flyers, cartes de visite, affiches, banderoles",
      icon: "🖨️"
    },
    {
      title: "Design",
      description: "Logo, identité visuelle, design graphique",
      icon: "🎨"
    },
    {
      title: "Architecture",
      description: "Plans, modélisation 3D, permis de construire",
      icon: "🏗️"
    },
    {
      title: "Signalétique",
      description: "Enseignes, panneaux, signalisation",
      icon: "🪧"
    },
    {
      title: "Textile",
      description: "T-shirts, uniformes, broderie",
      icon: "👕"
    },
    {
      title: "Digital",
      description: "Sites web, applications, marketing digital",
      icon: "💻"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 py-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            À propos de <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">La Bonne Adresse</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            La plateforme de référence qui connecte vos besoins aux meilleurs professionnels locaux dans l'impression, le design et l'architecture.
          </p>
        </div>

        {/* Mission Section - Enhanced Design */}
        <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-3xl p-8 md:p-12 mb-12 shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Notre mission
                </h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Nous croyons que chaque projet mérite d'être entre les meilleures mains. Notre mission est de démocratiser l'accès aux services professionnels de qualité en RDC et en Afrique.
              </p>
              <div className="space-y-4">
                {[
                  "Connecter les talents locaux aux opportunités",
                  "Garantir la qualité et la fiabilité des services",
                  "Simplifier les transactions et la communication",
                  "Développer l'économie créative locale"
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-200 to-secondary-200 rounded-3xl opacity-30 absolute inset-4 animate-pulse"></div>
              <div className="relative z-10 aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-lg font-semibold text-gray-700">Innovation & Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Enhanced */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Section - Enhanced */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une large gamme de services pour tous vos besoins professionnels
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 hover:border-primary-200"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section - Enhanced */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Pourquoi choisir La Bonne Adresse ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 hover:border-primary-200"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action - Enhanced */}
        <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Rejoignez des milliers de clients satisfaits qui nous font confiance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200">
              Trouver un prestataire
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-200">
              Devenir partenaire
            </Button>
          </div>
        </div>

        {/* Mobile padding */}
        <div className="h-20 md:h-0"></div>
      </div>
    </div>
  );
};

export default About;
