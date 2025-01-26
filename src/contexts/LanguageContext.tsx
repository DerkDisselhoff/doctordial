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
      bookDemo: "Book a Demo",
      sarah: "Sarah"
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
        description: "Medical practices struggle with managing high call volumes while maintaining quality patient care, compounded by a growing shortage of doctors' assistants."
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
      trainedOn: "Trained on millions of medical conversations",
      bookDemo: "Book a Demo",
      learnMore: "Learn More"
    },
    stats: {
      accuracy: "Triage Accuracy",
      handling: "AI Action Handling Time",
      reduction: "Workload Reduction"
    },
    dashboard: {
      overview: "Overview",
      calls: "Calls",
      appointments: "Appointments",
      settings: "Settings",
      workflow: "Workflow",
      assistant: "Assistant",
      billing: "Billing",
      reports: "Reports",
      logout: "Log out",
      profile: "Profile Settings",
      notifications: "Notifications",
      security: "Security",
      team: "Team"
    },
    capabilities: {
      title: "Digital Workers, Ready to Deploy",
      subtitle: "Discover how our plug-and-play digital workers seamlessly integrate with your practice"
    },
    assistant: {
      title: "Meet Your Digital Doctor's Assistant",
      description: "Your dedicated digital medical assistant, available 24/7 to handle patient calls and triage cases with the precision of a trained professional.",
      learnMore: "Learn more about Sarah",
      hire: "Hire Sarah"
    }
  },
  nl: {
    nav: {
      features: "Functies",
      pricing: "Prijzen",
      about: "Over Ons",
      contact: "Contact",
      login: "Inloggen",
      bookDemo: "Demo Aanvragen",
      sarah: "Sarah"
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
        description: "Medische praktijken worstelen met het beheren van grote belvolumes terwijl ze kwaliteitszorg willen blijven leveren, versterkt door een groeiend tekort aan doktersassistenten."
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
      trainedOn: "Getraind op miljoenen medische gesprekken",
      bookDemo: "Demo Aanvragen",
      learnMore: "Meer Informatie"
    },
    stats: {
      accuracy: "Triage Nauwkeurigheid",
      handling: "AI Actie Verwerkingstijd",
      reduction: "Werkdrukvermindering"
    },
    dashboard: {
      overview: "Overzicht",
      calls: "Gesprekken",
      appointments: "Afspraken",
      settings: "Instellingen",
      workflow: "Workflow",
      assistant: "Assistent",
      billing: "Facturering",
      reports: "Rapporten",
      logout: "Uitloggen",
      profile: "Profielinstellingen",
      notifications: "Meldingen",
      security: "Beveiliging",
      team: "Team"
    },
    capabilities: {
      title: "Digitale Medewerkers, Klaar voor Gebruik",
      subtitle: "Ontdek hoe onze plug-and-play digitale medewerkers naadloos integreren met uw praktijk"
    },
    assistant: {
      title: "Maak Kennis met uw Digitale Doktersassistent",
      description: "Uw toegewijde digitale medische assistent, 24/7 beschikbaar om patiëntgesprekken af te handelen en triage uit te voeren met de precisie van een getrainde professional.",
      learnMore: "Meer over Sarah",
      hire: "Huur Sarah in"
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