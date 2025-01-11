import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Users, Stethoscope, Globe2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent" />
        <div className="container mx-auto text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-up">
            About DoctorDial
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-up">
            Revolutionizing healthcare communication from the heart of Amsterdam
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Company Story */}
            <div className="space-y-6 animate-fade-up">
              <h2 className="text-3xl font-bold text-white">
                Amsterdam-Based Innovation
              </h2>
              <p className="text-white/80 leading-relaxed">
                Founded in Amsterdam, DoctorDial combines Dutch healthcare excellence 
                with cutting-edge AI technology. Our team of medical professionals and 
                tech experts work together to create solutions that truly understand 
                and address the challenges faced by modern medical practices.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Building2 className="w-8 h-8 text-mint" />,
                  label: "Founded in Amsterdam",
                  value: "2023"
                },
                {
                  icon: <Users className="w-8 h-8 text-mint" />,
                  label: "Healthcare Providers",
                  value: "50+"
                },
                {
                  icon: <Stethoscope className="w-8 h-8 text-mint" />,
                  label: "Medical Expertise",
                  value: "15+ Years"
                },
                {
                  icon: <Globe2 className="w-8 h-8 text-mint" />,
                  label: "Available Languages",
                  value: "2"
                }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-all animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    {stat.icon}
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-sm text-white/60">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Section */}
          <div className="mt-20 space-y-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-white">
                Medical Expertise Meets AI Innovation
              </h2>
              <p className="text-white/80 leading-relaxed">
                Our team combines decades of medical experience with advanced AI technology. 
                We understand the unique challenges of healthcare communication because 
                we've lived them. This firsthand experience drives us to create solutions 
                that make a real difference in patient care and practice management.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Healthcare First",
                  description: "Every feature we develop is rooted in real medical practice needs and challenges."
                },
                {
                  title: "Dutch Innovation",
                  description: "Combining the efficiency of Dutch healthcare with cutting-edge technology."
                },
                {
                  title: "Patient-Centric",
                  description: "Ensuring every patient interaction is handled with care and professionalism."
                }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="p-6 bg-forest-light rounded-xl border border-mint/10 hover:border-mint/20 transition-all animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold text-mint mb-4">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;