import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users } from "lucide-react";
import { CouncilMember } from "@/components/mac/CouncilMember";

const MedicalAdvisoryCouncil = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3 text-mint mb-4">
              <Shield className="w-6 h-6" />
              <h6 className="text-mint uppercase tracking-wide font-medium">
                {t("mac.label")}
              </h6>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-dark">
              {t("mac.title")}
            </h1>
            <p className="text-xl text-gray">
              {t("mac.subtitle")}
            </p>
          </div>
        </section>

        {/* Council Description */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid gap-12">
              {/* Composition Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-mint" />
                  <h2 className="text-2xl font-semibold text-gray-dark">
                    {t("mac.composition.title")}
                  </h2>
                </div>
                <div className="space-y-4 text-gray">
                  {["first", "second", "third"].map((key) => (
                    <p key={key} className="leading-relaxed">
                      {t(`mac.composition.${key}`)}
                    </p>
                  ))}
                </div>
              </div>

              {/* Purpose Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-mint" />
                  <h2 className="text-2xl font-semibold text-gray-dark">
                    {t("mac.purpose.title")}
                  </h2>
                </div>
                <div className="space-y-4 text-gray">
                  {["first", "second", "third"].map((key) => (
                    <p key={key} className="leading-relaxed">
                      {t(`mac.purpose.${key}`)}
                    </p>
                  ))}
                </div>
              </div>

              {/* Members Section */}
              <div className="space-y-6 mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-mint" />
                  <h2 className="text-2xl font-semibold text-gray-dark">
                    {t("mac.members.title")}
                  </h2>
                </div>
                <div className="grid gap-6">
                  <CouncilMember
                    name="Ben Disselhoff, MD, PhD"
                    title="Vascular Surgeon, Phlebologist"
                    image="/lovable-uploads/27866be6-94e2-43c7-8927-10229f2ee38e.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MedicalAdvisoryCouncil;
