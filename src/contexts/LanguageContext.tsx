
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = 'en' | 'nl';

interface LanguageContextType {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const translations = {
  en: {
    dashboard: {
      urgentCases: {
        title: "Urgent Cases",
        irrelevantTitle: "Non-Urgent Cases",
        errorLoading: "Error loading cases",
        other: "Other",
        viewAll: "View All",
        unknown: "Unknown",
        yes: "Yes",
        no: "No",
        na: "N/A",
        columns: {
          patient: "Patient",
          symptoms: "Symptoms",
          urgency: "Urgency",
          forwarded: "Forwarded",
          summary: "Summary",
          duration: "Duration",
          emotion: "Emotion"
        }
      },
      callButton: {
        start: "Start Call",
        end: "End Call",
        connecting: "Connecting..."
      },
      toast: {
        callEnded: "Call Ended",
        callEndedDesc: "The call has been ended successfully",
        callError: "Call Error",
        callErrorDesc: "There was an error with the call",
        callConnected: "Call Connected",
        callConnectedDesc: "You are now connected to the call",
        callFailed: "Call Failed"
      },
      filters: {
        today: "Today",
        lastWeek: "Last Week",
        lastMonth: "Last Month"
      }
    },
    nav: {
      about: "About",
      login: "Login",
      bookDemo: "Book Demo"
    },
    footer: {
      description: "Your trusted AI medical assistant for efficient patient care",
      about: "About Us",
      blog: "Blog",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved"
    },
    demo: {
      title: "Book a Demo",
      subtitle: "See how we can help your practice",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      practice: "Practice Name",
      practitioners: "Number of Practitioners",
      submit: "Book Demo",
      submitting: "Booking...",
      success: {
        title: "Demo Booked Successfully",
        message: "We'll be in touch shortly to schedule your demo"
      }
    },
    features: {
      title: "Intelligent Healthcare Assistant",
      subtitle: "Experience the future of healthcare communication"
    },
    capabilities: {
      title: "Advanced Capabilities",
      subtitle: "Discover what our AI assistant can do for your practice",
      medicalIntelligence: {
        title: "Medical Intelligence",
        description: "Advanced medical knowledge base for accurate patient assistance"
      },
      workerCustomization: {
        title: "Customizable Workflow",
        description: "Adapt the system to your specific practice needs"
      },
      humanExperience: {
        title: "Human-like Experience",
        description: "Natural conversations with patients for better care"
      },
      seamlessIntegration: {
        title: "Seamless Integration",
        description: "Works with your existing medical systems"
      },
      continuousLearning: {
        title: "Continuous Learning",
        description: "Constantly improving through real-world interactions"
      }
    },
    sarah: {
      useCases: {
        title: "Use Cases",
        subtitle: "Discover how Sarah can help your practice",
        forward: {
          title: "Smart Forwarding",
          description: "Automatically direct patients to appropriate care"
        },
        selfCare: {
          title: "Self-Care Guidance",
          description: "Provide reliable health advice when appropriate"
        },
        routing: {
          title: "Intelligent Routing",
          description: "Direct cases to the right healthcare provider"
        },
        conversation: {
          title: "Natural Conversations",
          description: "Human-like interaction with patients"
        },
        communication: {
          title: "Clear Communication",
          description: "Easy to understand medical information"
        },
        support: {
          title: "24/7 Support",
          description: "Always available for patient inquiries"
        }
      }
    },
    calls: {
      recentCalls: "Recent Calls",
      date: "Date",
      caller: "Caller",
      duration: "Duration",
      status: "Status"
    }
  },
  nl: {
    dashboard: {
      urgentCases: {
        title: "Urgente Gevallen",
        irrelevantTitle: "Niet-Urgente Gevallen",
        errorLoading: "Fout bij het laden van gevallen",
        other: "Overig",
        viewAll: "Bekijk Alles",
        unknown: "Onbekend",
        yes: "Ja",
        no: "Nee",
        na: "N.v.t.",
        columns: {
          patient: "Patiënt",
          symptoms: "Symptomen",
          urgency: "Urgentie",
          forwarded: "Doorgestuurd",
          summary: "Samenvatting",
          duration: "Duur",
          emotion: "Emotie"
        }
      },
      callButton: {
        start: "Start Gesprek",
        end: "Beëindig Gesprek",
        connecting: "Verbinden..."
      },
      toast: {
        callEnded: "Gesprek Beëindigd",
        callEndedDesc: "Het gesprek is succesvol beëindigd",
        callError: "Gespreksfout",
        callErrorDesc: "Er is een fout opgetreden tijdens het gesprek",
        callConnected: "Verbinding Gemaakt",
        callConnectedDesc: "U bent nu verbonden met het gesprek",
        callFailed: "Gesprek Mislukt"
      },
      filters: {
        today: "Vandaag",
        lastWeek: "Afgelopen Week",
        lastMonth: "Afgelopen Maand"
      }
    },
    nav: {
      about: "Over Ons",
      login: "Inloggen",
      bookDemo: "Demo Aanvragen"
    },
    footer: {
      description: "Uw vertrouwde AI-medische assistent voor efficiënte patiëntenzorg",
      about: "Over Ons",
      blog: "Blog",
      privacy: "Privacybeleid",
      terms: "Gebruiksvoorwaarden",
      rights: "Alle rechten voorbehouden"
    },
    demo: {
      title: "Demo Aanvragen",
      subtitle: "Ontdek hoe wij uw praktijk kunnen helpen",
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mailadres",
      phone: "Telefoonnummer",
      practice: "Praktijknaam",
      practitioners: "Aantal Zorgverleners",
      submit: "Demo Aanvragen",
      submitting: "Aanvragen...",
      success: {
        title: "Demo Succesvol Aangevraagd",
        message: "We nemen binnenkort contact met u op om de demo in te plannen"
      }
    },
    features: {
      title: "Intelligente Zorgassistent",
      subtitle: "Ervaar de toekomst van communicatie in de gezondheidszorg"
    },
    capabilities: {
      title: "Geavanceerde Mogelijkheden",
      subtitle: "Ontdek wat onze AI-assistent voor uw praktijk kan betekenen",
      medicalIntelligence: {
        title: "Medische Intelligentie",
        description: "Geavanceerde medische kennisbank voor nauwkeurige patiëntondersteuning"
      },
      workerCustomization: {
        title: "Aanpasbare Workflow",
        description: "Pas het systeem aan uw specifieke praktijkbehoeften aan"
      },
      humanExperience: {
        title: "Menselijke Ervaring",
        description: "Natuurlijke gesprekken met patiënten voor betere zorg"
      },
      seamlessIntegration: {
        title: "Naadloze Integratie",
        description: "Werkt samen met uw bestaande medische systemen"
      },
      continuousLearning: {
        title: "Continue Ontwikkeling",
        description: "Voortdurende verbetering door praktijkervaring"
      }
    },
    sarah: {
      useCases: {
        title: "Toepassingen",
        subtitle: "Ontdek hoe Sarah uw praktijk kan ondersteunen",
        forward: {
          title: "Slim Doorverwijzen",
          description: "Automatisch patiënten naar de juiste zorg leiden"
        },
        selfCare: {
          title: "Zelfzorgadvies",
          description: "Betrouwbaar gezondheidsadvies wanneer gepast"
        },
        routing: {
          title: "Intelligente Routering",
          description: "Gevallen naar de juiste zorgverlener leiden"
        },
        conversation: {
          title: "Natuurlijke Gesprekken",
          description: "Menselijke interactie met patiënten"
        },
        communication: {
          title: "Heldere Communicatie",
          description: "Begrijpelijke medische informatie"
        },
        support: {
          title: "24/7 Ondersteuning",
          description: "Altijd beschikbaar voor patiëntvragen"
        }
      }
    },
    calls: {
      recentCalls: "Recente Gesprekken",
      date: "Datum",
      caller: "Beller",
      duration: "Duur",
      status: "Status"
    }
  }
};

const LanguageContext = createContext<LanguageContextType>({
  t: () => "",
  language: "nl",
  setLanguage: () => {}
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("nl");

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
