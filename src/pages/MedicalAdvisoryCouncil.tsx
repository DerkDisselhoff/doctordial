import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users } from "lucide-react";
import { CouncilMember } from "@/components/mac/CouncilMember";
import { SectionHeader } from "@/components/mac/SectionHeader";

const MedicalAdvisoryCouncil = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-[800px] mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint/10 text-mint mb-8 hover:bg-mint/20 transition-colors">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">{t("mac.label")}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 tracking-tight">
              {t("mac.title")}
            </h1>
            <p className="text-lg sm:text-xl text-gray">
              {t("mac.subtitle")}
            </p>
          </div>
        </section>

        {/* Content Sections */}
        <section className="bg-gray-50 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-[800px] mx-auto grid gap-12 md:gap-20">
              {/* Members Section */}
              <div>
                <SectionHeader icon={Users} title={t("mac.members.title")} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                <SectionHeader icon={Users} title={t("mac.composition.title")} />
                <div className="space-y-6 text-gray">
                  {["first", "second", "third"].map((key) => (
                    <p key={key} className="text-lg leading-relaxed animate-fade-in">
                      {t(`mac.composition.${key}`)}
                    </p>
                  ))}
                </div>
              </div>

              {/* Purpose Section */}
              <div>
                <SectionHeader icon={Shield} title={t("mac.purpose.title")} />
                <div className="space-y-6 text-gray">
                  {["first", "second", "third"].map((key) => (
                    <p key={key} className="text-lg leading-relaxed animate-fade-in">
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
