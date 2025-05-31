
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, MessageCircle, Clock, Mail } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "123 Avenue des Martyrs, Gombe\nKinshasa, République Démocratique du Congo",
      color: "text-primary-600"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+243 123 456 789\n+243 987 654 321",
      color: "text-secondary-600"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@labonneadresse.cd\nsupport@labonneadresse.cd",
      color: "text-accent-600"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lundi - Vendredi: 8h - 18h\nSamedi: 9h - 15h\nDimanche: Fermé",
      color: "text-green-600"
    }
  ];

  const faqs = [
    {
      question: "Comment choisir le bon prestataire ?",
      answer: "Consultez les avis clients, portfolios et certifications. Notre système de notation vous aide à identifier les meilleurs professionnels."
    },
    {
      question: "Les paiements sont-ils sécurisés ?",
      answer: "Oui, tous les paiements sont protégés. Les fonds ne sont libérés au prestataire qu'après validation de votre commande."
    },
    {
      question: "Que faire en cas de problème ?",
      answer: "Notre équipe support est disponible 24/7. Contactez-nous via le chat, email ou téléphone pour une résolution rapide."
    },
    {
      question: "Comment devenir prestataire partenaire ?",
      answer: "Inscrivez-vous, soumettez vos documents d'identification et portfolio. Après validation, vous pourrez proposer vos services."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre équipe est là pour vous accompagner dans tous vos projets
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                <CardDescription className="text-white/80">
                  Nous vous répondrons dans les plus brefs délais
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <Input placeholder="Votre nom complet" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input type="email" placeholder="votre@email.com" required />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <Input placeholder="+243 123 456 789" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <Input placeholder="Objet de votre message" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Décrivez votre demande en détail..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                  >
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl ${info.color.replace('text-', 'bg-').replace('600', '100')} flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${info.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                        <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-primary-50 to-secondary-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-primary-200 text-primary-600 hover:bg-primary-50">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat en direct
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-secondary-200 text-secondary-600 hover:bg-secondary-50">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler maintenant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Questions fréquentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Notre localisation</h3>
              <p className="text-gray-600">Retrouvez-nous au cœur de Kinshasa</p>
            </div>
            <div className="absolute inset-0 bg-primary-600/10"></div>
          </div>
        </Card>

        {/* Mobile padding */}
        <div className="h-20 md:h-0"></div>
      </div>
    </div>
  );
};

export default Contact;
