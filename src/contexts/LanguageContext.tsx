import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = 'en' | 'nl';

interface LanguageContextType {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const translations = {
  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      login: "Login",
      bookDemo: "Book a Demo"
    },
    demo: {
      title: "Book a Demo",
      subtitle: "See how DoctorDial can transform your practice",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      practice: "Practice Name",
      practitioners: "Number of Practitioners",
      submit: "Book Demo",
      submitting: "Booking...",
      success: {
        title: "Demo Request Submitted",
        message: "Thank you for your interest! We'll contact you shortly to schedule your demo."
      }
    },
    footer: {
      description: "AI-powered call management for modern medical practices",
      about: "About Us",
      careers: "Careers",
      blog: "Blog",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      security: "Security",
      rights: "All rights reserved."
    },
    mission: {
      title: "Why DoctorDial Exists",
      challenge: {
        title: "The Challenge",
        description: "Medical practices struggle with managing high call volumes while maintaining quality patient care."
      },
      solution: {
        title: "Our Solution",
        description: "AI-powered call management that ensures every patient receives immediate attention while reducing practice workload."
      }
    },
    hero: {
      aiPowered: "AI-Powered Call Management",
      title: "Transform Your Practice's Communication",
      subtitle: "Let AI handle your practice's calls while maintaining the personal touch your patients expect.",
      trainedOn: "Trained on millions of medical conversations"
    },
    stats: {
      satisfaction: "Patient Satisfaction Rate",
      availability: "Availability",
      reduction: "Workload Reduction"
    }
  },
  nl: {
    nav: {
      features: "Kenmerken",
      pricing: "Prijzen",
      about: "Over Ons",
      contact: "Contact",
      login: "Inloggen",
      bookDemo: "Demo Aanvragen"
    },
    demo: {
      title: "Demo Aanvragen",
      subtitle: "Ontdek hoe DoctorDial uw praktijk kan transformeren",
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mail",
      phone: "Telefoonnummer",
      practice: "Praktijknaam",
      practitioners: "Aantal Zorgverleners",
      submit: "Demo Aanvragen",
      submitting: "Aanvragen...",
      success: {
        title: "Demo Aanvraag Verzonden",
        message: "Bedankt voor uw interesse! We nemen binnenkort contact met u op om uw demo in te plannen."
      }
    },
    footer: {
      description: "AI-gestuurde gespreksafhandeling voor moderne medische praktijken",
      about: "Over Ons",
      careers: "Vacatures",
      blog: "Blog",
      privacy: "Privacybeleid",
      terms: "Gebruiksvoorwaarden",
      security: "Beveiliging",
      rights: "Alle rechten voorbehouden."
    },
    mission: {
      title: "Waarom DoctorDial Bestaat",
      challenge: {
        title: "De Uitdaging",
        description: "Medische praktijken worstelen met het beheren van grote belvolumes terwijl ze kwaliteitszorg willen blijven leveren."
      },
      solution: {
        title: "Onze Oplossing",
        description: "AI-gestuurde gespreksafhandeling die zorgt dat elke patiënt direct aandacht krijgt terwijl de werkdruk wordt verlaagd."
      }
    },
    hero: {
      aiPowered: "AI-Gestuurde Gespreksafhandeling",
      title: "Transformeer de Communicatie van uw Praktijk",
      subtitle: "Laat AI de telefoongesprekken van uw praktijk afhandelen met behoud van persoonlijk contact.",
      trainedOn: "Getraind op miljoenen medische gesprekken"
    },
    stats: {
      satisfaction: "Patiënttevredenheid",
      availability: "Beschikbaarheid",
      reduction: "Werkdrukvermindering"
    }
  }
};

const LanguageContext = createContext<LanguageContextType>({
  t: () => "",
  language: "en",
  setLanguage: () => {}
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};