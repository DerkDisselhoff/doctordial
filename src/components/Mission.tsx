import { BookDemoForm } from "./BookDemoForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Brain, Users, Phone } from "lucide-react";

const Mission = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-20 px-4 relative bg-gradient-to-b from-mint-light/5 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,255,238,0.05)_0%,rgba(139,255,238,0)_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,238,255,0.05)_0%,rgba(139,238,255,0)_50%)]" />
      
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-dark animate-fade-up font-sans">
              Why DoctorDial
            </h2>
            <div className="w-16 md:w-20 h-1 bg-mint mx-auto rounded-full animate-fade-up delay-100" />
            <p className="text-gray max-w-2xl mx-auto animate-fade-up delay-200">
              Transforming healthcare communication with AI-powered solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="group bg-white hover:bg-mint-light/5 animate-fade-up delay-200 p-8 rounded-xl border border-gray-muted shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-mint-light/50 rounded-lg group-hover:bg-mint-light transition-colors">
                  <Heart className="w-6 h-6 text-mint" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-dark">{t("mission.challenge.title")}</h3>
              </div>
              <p className="text-base md:text-lg text-gray leading-relaxed">
                {t("mission.challenge.description")}
              </p>
            </div>
            
            <div className="group bg-white hover:bg-mint-light/5 animate-fade-up delay-300 p-8 rounded-xl border border-gray-muted shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-light/50 rounded-lg group-hover:bg-blue-light transition-colors">
                  <Brain className="w-6 h-6 text-blue-dark" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-dark">{t("mission.solution.title")}</h3>
              </div>
              <p className="text-base md:text-lg text-gray leading-relaxed">
                {t("mission.solution.description")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8">
            <div className="bg-white p-6 rounded-xl border border-gray-muted animate-fade-up delay-400">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-mint" />
                <h4 className="font-semibold text-gray-dark">For Healthcare Providers</h4>
              </div>
              <p className="text-gray">Streamline your practice operations and focus on what matters most - patient care.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-muted animate-fade-up delay-500">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-5 h-5 text-blue-dark" />
                <h4 className="font-semibold text-gray-dark">For Patients</h4>
              </div>
              <p className="text-gray">Experience seamless communication and faster response times for your healthcare needs.</p>
            </div>
          </div>

          <div className="pt-6 md:pt-8 animate-fade-up delay-600">
            <BookDemoForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;