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
    capabilities: {
      title: "Digital Workers, Ready to Deploy",
      subtitle: "Discover how our plug-and-play digital workers seamlessly integrate with your practice",
      medicalIntelligence: {
        title: "Medical Intelligence",
        description: "Trained on NHG triage standards and medical datasets for accurate patient assessment"
      },
      workerCustomization: {
        title: "Worker Customization",
        description: "Customize forwarding rules, activation timing, voice, tone, and medical question handling to match your practice needs"
      },
      humanExperience: {
        title: "Human Experience",
        description: "Trained on billions of emotional and empathic interactions for natural, human-like conversations"
      },
      seamlessIntegration: {
        title: "Seamless Integration",
        description: "Easily integrates with your existing call software for smooth implementation"
      },
      continuousLearning: {
        title: "Continuous Learning",
        description: "Improves through direct feedback on triage outcomes from medical professionals"
      }
    },
    features: {
      title: "Transform Patient Calls into Practice Efficiency",
      subtitle: "Experience the future of healthcare communication with our AI-powered system",
      urgencyLevels: "Urgency Levels",
      recentActivity: "Recent Activity",
      callVolume: "Call Volume"
    },
    hero: {
      aiPowered: "AI-Powered Call Management",
      title: "Transform Your Practice's Communication",
      subtitle: "Let AI handle your practice's calls while maintaining the personal touch your patients expect.",
      trainedOn: "Trained on millions of medical conversations",
      bookDemo: "Book a Demo",
      learnMore: "Learn More"
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
    capabilities: {
      title: "Digitale Medewerkers, Klaar voor Gebruik",
      subtitle: "Ontdek hoe onze plug-and-play digitale medewerkers naadloos integreren met uw praktijk",
      medicalIntelligence: {
        title: "Medische Intelligentie",
        description: "Getraind op NHG-triagestandaarden en medische datasets voor nauwkeurige patiëntbeoordeling"
      },
      workerCustomization: {
        title: "Medewerker Aanpassing",
        description: "Pas doorverwijzingsregels, activeringstijden, stem, toon en medische vraagafhandeling aan naar uw praktijkbehoeften"
      },
      humanExperience: {
        title: "Menselijke Ervaring",
        description: "Getraind op miljarden emotionele en empathische interacties voor natuurlijke, menselijke gesprekken"
      },
      seamlessIntegration: {
        title: "Naadloze Integratie",
        description: "Integreert eenvoudig met uw bestaande belsoftware voor soepele implementatie"
      },
      continuousLearning: {
        title: "Continue Ontwikkeling",
        description: "Verbetert door directe feedback op triage-uitkomsten van medische professionals"
      }
    },
    features: {
      title: "Transformeer Patiëntgesprekken naar Praktijkefficiëntie",
      subtitle: "Ervaar de toekomst van gezondheidszorgcommunicatie met ons AI-aangedreven systeem",
      urgencyLevels: "Urgentieniveaus",
      recentActivity: "Recente Activiteit",
      callVolume: "Belvolume"
    },
    hero: {
      aiPowered: "AI-Gestuurde Gespreksafhandeling",
      title: "Transformeer de Communicatie van uw Praktijk",
      subtitle: "Laat AI de telefoongesprekken van uw praktijk afhandelen met behoud van persoonlijk contact",
      trainedOn: "Getraind op miljoenen medische gesprekken",
      bookDemo: "Demo Aanvragen",
      learnMore: "Meer Informatie"
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