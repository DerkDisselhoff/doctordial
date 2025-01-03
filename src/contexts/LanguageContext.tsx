import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'nl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Navigation
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.bookDemo": "Book a Demo",

    // Hero Section
    "hero.title": "Manage patient calls effortlessly",
    "hero.subtitle": "Revolutionize how your GP practice manages patient communication with our AI-powered virtual front desk, trained on NHG-Triage data and compliant with NVDA standards.",
    "hero.aiPowered": "AI-Powered Call Management",
    "hero.trainedOn": "*Trained on Dutch healthcare standards",

    // Stats Section
    "stats.satisfaction": "Patient satisfaction rate",
    "stats.availability": "Availability for your patients",
    "stats.reduction": "Reduction in administrative workload",

    // Mission Section
    "mission.title": "Why DoctorDial Exists",
    "mission.challenge.title": "The Challenge",
    "mission.challenge.description": "GP practices struggle with managing high call volumes while maintaining quality patient care. Missed calls, long wait times, and overwhelmed staff are common challenges that affect both practice efficiency and patient satisfaction.",
    "mission.solution.title": "Our Solution",
    "mission.solution.description": "We've developed an AI solution that transforms how practices handle patient communication, ensuring no call goes unanswered while maintaining the highest standards of Dutch healthcare. Our system is trained on NHG-Triage data and compliant with NVDA standards.",

    // Features Section
    "features.title": "How Our AI Agent Optimizes Your Incoming Patient Calls",
    "features.subtitle": "Experience the future of patient communication with our comprehensive AI solution",
    "features.cta": "Ready to Transform Your Practice?",
    "features.ctaSubtitle": "Join the growing number of practices that trust DoctorDial to handle their patient communications",

    // Certifications Section
    "cert.title": "Certified & Compliant",
    "cert.subtitle": "Trusted by Dutch Healthcare Institutions",
    "cert.nhg": "NHG-Triage Certified",
    "cert.nhgDesc": "Our AI model is trained on official NHG-Triage protocols",
    "cert.nvda": "NVDA Standards Compliant",
    "cert.nvdaDesc": "Fully compliant with NVDA behavioral standards",
    "cert.description": "Our AI model is meticulously trained on NHG-Triage protocols and adheres to NVDA behavioral standards, ensuring the highest quality of patient care in accordance with Dutch healthcare regulations.",

    // Who We Serve Section
    "serve.gp.title": "For General Practitioners",
    "serve.gp.description": "We empower GPs to focus on patient care by managing their incoming calls with AI technology, reducing administrative burden and optimizing practice efficiency.",
    "serve.patients.title": "For Patients",
    "serve.patients.description": "We ensure patients receive timely responses and appropriate care through intelligent call management and efficient appointment scheduling.",

    // Testimonials Section
    "testimonials.title": "What Our Clients Say",
    "testimonials.subtitle": "Trusted by leading GP practices nationwide",

    // Book Demo Form
    "demo.title": "See DoctorDial in action",
    "demo.subtitle": "Schedule a 30-minute live product demo with expert Q&A",
    "demo.firstName": "First Name",
    "demo.lastName": "Last Name",
    "demo.email": "Work Email",
    "demo.phone": "Phone Number",
    "demo.practice": "Practice Name",
    "demo.practitioners": "Number of Practices",
    "demo.submit": "Next",
    "demo.submitting": "Submitting...",
    "demo.success.title": "Thank You!",
    "demo.success.message": "We've received your demo request and will be in touch shortly to schedule your personalized demo.",

    // Footer
    "footer.about": "About Us",
    "footer.careers": "Careers",
    "footer.blog": "Blog",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.security": "Security",
    "footer.rights": "All rights reserved.",
    "footer.description": "Transforming patient calls into practice efficiency with AI-powered call management solutions."
  },
  nl: {
    // Navigation
    "nav.features": "Functies",
    "nav.pricing": "Prijzen",
    "nav.about": "Over Ons",
    "nav.contact": "Contact",
    "nav.bookDemo": "Demo Aanvragen",

    // Hero Section
    "hero.title": "Beheer patiëntgesprekken moeiteloos",
    "hero.subtitle": "Revolutioneer hoe uw huisartsenpraktijk patiëntcommunicatie beheert met onze AI-gestuurde virtuele receptie, getraind op NHG-Triage data en conform NVDA-standaarden.",
    "hero.aiPowered": "AI-Gestuurde Gespreksafhandeling",
    "hero.trainedOn": "*Getraind volgens Nederlandse zorgnormen",

    // Stats Section
    "stats.satisfaction": "Patiënttevredenheid",
    "stats.availability": "Beschikbaarheid voor uw patiënten",
    "stats.reduction": "Vermindering van administratieve werkdruk",

    // Mission Section
    "mission.title": "Waarom DoctorDial Bestaat",
    "mission.challenge.title": "De Uitdaging",
    "mission.challenge.description": "Huisartsenpraktijken worstelen met het beheren van grote belvolumes terwijl ze kwalitatieve patiëntenzorg willen behouden. Gemiste oproepen, lange wachttijden en overbelast personeel zijn veelvoorkomende uitdagingen die zowel de praktijkefficiëntie als patiënttevredenheid beïnvloeden.",
    "mission.solution.title": "Onze Oplossing",
    "mission.solution.description": "We hebben een AI-oplossing ontwikkeld die transformeert hoe praktijken patiëntcommunicatie afhandelen, waarbij we ervoor zorgen dat geen enkele oproep onbeantwoord blijft en de hoogste standaarden van de Nederlandse gezondheidszorg worden gehandhaafd. Ons systeem is getraind op NHG-Triage data en voldoet aan NVDA-standaarden.",

    // Features Section
    "features.title": "Hoe Onze AI-Agent Uw Inkomende Patiëntgesprekken Optimaliseert",
    "features.subtitle": "Ervaar de toekomst van patiëntcommunicatie met onze uitgebreide AI-oplossing",
    "features.cta": "Klaar om Uw Praktijk te Transformeren?",
    "features.ctaSubtitle": "Sluit u aan bij het groeiende aantal praktijken dat DoctorDial vertrouwt voor hun patiëntcommunicatie",

    // Certifications Section
    "cert.title": "Gecertificeerd & Conform",
    "cert.subtitle": "Vertrouwd door Nederlandse Zorginstellingen",
    "cert.nhg": "NHG-Triage Gecertificeerd",
    "cert.nhgDesc": "Ons AI-model is getraind op officiële NHG-Triage protocollen",
    "cert.nvda": "NVDA-Standaard Conform",
    "cert.nvdaDesc": "Volledig conform NVDA gedragsstandaarden",
    "cert.description": "Ons AI-model is zorgvuldig getraind op NHG-Triage protocollen en voldoet aan NVDA gedragsstandaarden, wat de hoogste kwaliteit van patiëntenzorg garandeert volgens Nederlandse zorgregelgeving.",

    // Who We Serve Section
    "serve.gp.title": "Voor Huisartsen",
    "serve.gp.description": "We stellen huisartsen in staat zich te concentreren op patiëntenzorg door hun inkomende gesprekken te beheren met AI-technologie, waardoor de administratieve last wordt verminderd en de praktijkefficiëntie wordt geoptimaliseerd.",
    "serve.patients.title": "Voor Patiënten",
    "serve.patients.description": "We zorgen ervoor dat patiënten tijdige reacties en passende zorg ontvangen via intelligente gespreksafhandeling en efficiënte afspraakplanning.",

    // Testimonials Section
    "testimonials.title": "Wat Onze Klanten Zeggen",
    "testimonials.subtitle": "Vertrouwd door toonaangevende huisartsenpraktijken in heel Nederland",

    // Book Demo Form
    "demo.title": "Bekijk DoctorDial in actie",
    "demo.subtitle": "Plan een 30-minuten live productdemo met expert Q&A",
    "demo.firstName": "Voornaam",
    "demo.lastName": "Achternaam",
    "demo.email": "Werk E-mail",
    "demo.phone": "Telefoonnummer",
    "demo.practice": "Praktijknaam",
    "demo.practitioners": "Aantal Praktijken",
    "demo.submit": "Volgende",
    "demo.submitting": "Verzenden...",
    "demo.success.title": "Dank U!",
    "demo.success.message": "We hebben uw demoverzoek ontvangen en nemen binnenkort contact met u op om uw persoonlijke demo in te plannen.",

    // Footer
    "footer.about": "Over Ons",
    "footer.careers": "Carrières",
    "footer.blog": "Blog",
    "footer.privacy": "Privacy",
    "footer.terms": "Voorwaarden",
    "footer.security": "Beveiliging",
    "footer.rights": "Alle rechten voorbehouden.",
    "footer.description": "Transformeer patiëntgesprekken naar praktijkefficiëntie met AI-gestuurde gespreksafhandeling."
  }
} as const;

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations.en];
    if (typeof translation === 'string') {
      return translation;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};