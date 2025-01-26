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
      title: "Digital Workers, Human Experience",
      subtitle: "Let AI handle your practice's calls while maintaining the personal touch your patients expect.",
      trainedOn: "Trained on millions of medical conversations",
      bookDemo: "Book a Demo",
      learnMore: "Learn More"
    },
    assistant: {
      title: "Meet Your Digital Doctor's Assistant",
      subtitle: "Your dedicated digital medical assistant, available 24/7 to handle patient calls and triage cases with the precision of a trained professional.",
      trainedOn: "Trained on extensive medical protocols",
      learnMore: "Learn more about Sarah",
      hire: "Hire Sarah",
      support: "Patient Support"
    },
    sarah: {
      title: "Meet Sarah",
      subtitle: "Your AI-powered medical assistant, combining advanced technology with compassionate care",
      aiPowered: "AI-Powered Intelligence",
      aiDescription: "Trained on extensive medical protocols and best practices to provide accurate, consistent support for your practice.",
      expertise: "Medical Expertise",
      expertiseDescription: "Capable of understanding and triaging a wide range of medical conditions with professional accuracy.",
      availability: "24/7 Availability",
      availabilityDescription: "Always ready to assist your patients, manage calls, and handle urgent cases at any time of day.",
      learning: "Continuous Learning",
      learningDescription: "Constantly improving through each interaction while maintaining consistent quality of care."
    },
    about: {
      location: "Founded in 2025, Amsterdam",
      title: "The next era of Healthcare,",
      subtitle: "driven by AI",
      description: "Empowering healthcare providers to focus on what matters most: patient care"
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
      title: "AI assistentes, menselijke ervaring",
      subtitle: "Laat AI de telefoongesprekken van uw praktijk afhandelen met behoud van persoonlijk contact",
      trainedOn: "Getraind op miljoenen medische gesprekken",
      bookDemo: "Demo Aanvragen",
      learnMore: "Meer Informatie"
    },
    assistant: {
      title: "Ontmoet Uw Digitale Doktersassistent",
      subtitle: "Uw toegewijde digitale medische assistent, 24/7 beschikbaar om patiëntgesprekken te behandelen en gevallen te triageren met de precisie van een getrainde professional.",
      trainedOn: "Getraind op uitgebreide medische protocollen",
      learnMore: "Meer informatie over Sarah",
      hire: "Huur Sarah in",
      support: "Patiëntondersteuning"
    },
    sarah: {
      title: "Ontmoet Sarah",
      subtitle: "Uw AI-aangedreven medische assistent, die geavanceerde technologie combineert met zorgzame ondersteuning",
      aiPowered: "AI-Aangedreven Intelligentie",
      aiDescription: "Getraind op uitgebreide medische protocollen en best practices om nauwkeurige, consistente ondersteuning te bieden voor uw praktijk.",
      expertise: "Medische Expertise",
      expertiseDescription: "In staat om een breed scala aan medische aandoeningen te begrijpen en te triageren met professionele nauwkeurigheid.",
      availability: "24/7 Beschikbaarheid",
      availabilityDescription: "Altijd klaar om uw patiënten te helpen, gesprekken te beheren en urgente gevallen op elk moment van de dag te behandelen.",
      learning: "Continue Ontwikkeling",
      learningDescription: "Voortdurend verbeterend door elke interactie met behoud van consistente zorgkwaliteit."
    },
    about: {
      location: "Opgericht in 2025, Amsterdam",
      title: "Het nieuwe tijdperk van Gezondheidszorg,",
      subtitle: "gedreven door AI",
      description: "Zorgverleners in staat stellen zich te concentreren op wat het belangrijkst is: patiëntenzorg"
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
