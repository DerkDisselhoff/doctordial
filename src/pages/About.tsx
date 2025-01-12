import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building2, Users, Stethoscope, Globe2, Heart, Brain, Clock } from "lucide-react";
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
            Why DoctorDial
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-up">
            Revolutionizing healthcare communication from the heart of Amsterdam
          </p>
        </div>
      </section>

      {/* Why Story Section */}
      <section className="py-8 px-4 bg-forest-light/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Challenge Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-mint mb-4">
                <Heart className="w-6 h-6" />
                <h3 className="text-xl font-semibold text-mint">The Challenge</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                In the Netherlands, our healthcare system stands at a critical juncture. An aging population, 
                rising costs, and increased demand for specialized care are placing growing strain on Hospitals, 
                GPs and medical staff.
              </p>
              <p className="text-white/80 leading-relaxed">
                Individuals lose confidence in a system that feels overwhelmed. Waiting times are increasing, 
                and healthcare professionals are stretched thin which is especially challenging in general practice. 
                This results in poorer accessibility for the patient.
              </p>
              <p className="text-white/80 leading-relaxed">
                When patients can't receive timely attention, they suffer physically and mentally. Chronic 
                conditions progress unchecked, minor issues become major, and trust in the system erodes.
              </p>
            </div>

            {/* Solution Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-mint mb-4">
                <Brain className="w-6 h-6" />
                <h3 className="text-xl font-semibold text-mint">The Solution</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                Technology has advanced to a point where it can confidently automate routine tasks without 
                sacrificing a human touch. By delegating mundane administrative work to AI, healthcare 
                providers free themselves to focus on high-impact patient care.
              </p>
              <p className="text-white/80 leading-relaxed">
                Picture an intelligent triage system that quickly evaluates initial symptoms, schedules 
                appointments, and ensures that those needing urgent attention see a doctor first—while 
                routine checkups and follow-ups happen just as effectively.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    icon: <Clock className="w-8 h-8 text-mint" />,
                    title: "24/7 Availability",
                    description: "Always-on triage and support"
                  },
                  {
                    icon: <Brain className="w-8 h-8 text-mint" />,
                    title: "AI-Powered",
                    description: "Smart, accurate decision making"
                  },
                  {
                    icon: <Heart className="w-8 h-8 text-mint" />,
                    title: "Human-Centric",
                    description: "Compassionate care delivery"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="p-6 bg-forest-light/10 rounded-xl border border-mint/10 hover:border-mint/20 transition-all"
                  >
                    {feature.icon}
                    <h4 className="text-lg font-semibold text-white mt-4">{feature.title}</h4>
                    <p className="text-white/60 mt-2">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-mint mb-4">
                <Stethoscope className="w-6 h-6" />
                <h3 className="text-xl font-semibold text-mint">Our Vision</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                DoctorDial exists to bring this future to life. Our vision is to unburden medical staff 
                with an AI-driven platform that streamlines triage, scheduling, and patient follow-up 
                guided by our own experienced healthcare professionals.
              </p>
              <p className="text-white/80 leading-relaxed">
                Drawing on the latest medical insights and practical know-how, we ensure that our 
                automation solutions are safe, accurate, and deeply aligned with the best interests 
                of patients and practitioners.
              </p>
              <p className="text-white/80 leading-relaxed">
                By leveraging the power of AI, DoctorDial amplifies the capacity of doctors, nurses, 
                and support staff—without ever losing sight of patient well-being. Our commitment is 
                to keep Dutch GP healthcare strong and accessible as we move into a rapidly changing 
                future and every patient receives the attention they deserve, precisely when they need it.
              </p>
            </div>
          </div>
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
                Founded in Amsterdam in 2025, DoctorDial combines Dutch healthcare excellence 
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
                  value: "2025"
                },
                {
                  icon: <Users className="w-8 h-8 text-mint" />,
                  label: "AI Assistants",
                  value: "50+"
                },
                {
                  icon: <Stethoscope className="w-8 h-8 text-mint" />,
                  label: "Medical Expertise",
                  value: "50 Years"
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

          {/* Values Grid */}
          <div className="mt-20 space-y-12">
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
