
import { usePageReset } from "@/hooks/usePageReset";

const Contact = () => {
  usePageReset();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact</h1>
        <p className="text-lg text-gray-600 text-center">
          Page de contact en cours de développement
        </p>
        <div className="h-20 md:h-0"></div>
      </div>
    </div>
  );
};

export default Contact;
