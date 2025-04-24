
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
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/10 text-mint mb-8">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">{t("mac.label")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6">
              {t("mac.title")}
            </h1>
            <p className="text-xl text-gray max-w-3xl">
              {t("mac.subtitle")}
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto grid gap-16 md:gap-24">
              {/* Members Section */}
              <div>
                <div className="inline-flex items-center gap-2 text-mint mb-12">
                  <Users className="w-5 h-5" />
                  <h2 className="text-2xl font-semibold text-gray-dark">
                    {t("mac.members.title")}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <CouncilMember
                    name="Ben Disselhoff, MD, PhD"
                    title="Vascular Surgeon, Phlebologist"
                    image="/lovable-uploads/27866be6-94e2-43c7-8927-10229f2ee38e.png"
                  />
                  {/* Add more council members as needed */}
                </div>
              </div>

              {/* Composition Section */}
              <div>
                <div className="inline-flex items-center gap-2 text-mint mb-8">
                  <Users className="w-5 h-5" />
                  <h2 className="text-2xl font-semibold text-gray-dark">
                    {t("mac.composition.title")}
                  </h2>
                </div>
                <div className="space-y-6 text-gray max-w-4xl">
                  {["first", "second", "third"].map((key) => (
                    <p key={key} className="text-lg leading-relaxed">
                      {t(`mac.composition.${key}`)}
                    </p>
                  ))}
                </div>
              </div>

              {/* Purpose Section */}
              <div>
                <div className="inline-flex items-center gap-2 text-mint mb-8">
                  <Shield className="w-5 h-5" />
                  <h2 className="text-2xl font-semibold text-gray-dark">
                    {t("mac.purpose.title")}
                  </h2>
                </div>
                <div className="space-y-6 text-gray max-w-4xl">
                  {["first", "second", "third"].map((key) => (
                    <p key={key} className="text-lg leading-relaxed">
                      {t(`mac.purpose.${key}`)}
                    </p>
                  ))}
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
