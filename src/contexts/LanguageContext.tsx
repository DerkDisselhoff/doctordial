import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    nav: {
      bookDemo: "Book a Demo",
    },
    demo: {
      title: "Book Your Personal Demo",
      subtitle: "Experience how DoctorDial can transform your practice's communication",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      practice: "Practice Name",
      practitioners: "Number of Practitioners",
      submit: "Schedule Demo",
      submitting: "Scheduling...",
      success: {
        title: "Demo Request Submitted!",
        message: "Thank you for your interest! We'll be in touch within 24 hours to schedule your personal demo.",
      },
    },
  },
  nl: {
    nav: {
      bookDemo: "Demo Aanvragen",
    },
    demo: {
      title: "Plan Uw Persoonlijke Demo",
      subtitle: "Ervaar hoe DoctorDial de communicatie van uw praktijk kan transformeren",
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mailadres",
      phone: "Telefoonnummer",
      practice: "Praktijknaam",
      practitioners: "Aantal Artsen",
      submit: "Demo Inplannen",
      submitting: "Aanvragen...",
      success: {
        title: "Demo Aanvraag Ontvangen!",
        message: "Bedankt voor uw interesse! We nemen binnen 24 uur contact met u op om uw persoonlijke demo in te plannen.",
      },
    },
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");

  const t = (key: string) => {
    const keys = key.split(".");
    let translation: any = translations[language];

    for (const k of keys) {
      translation = translation[k];
      if (!translation) return key; // return the key if translation is not found
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
