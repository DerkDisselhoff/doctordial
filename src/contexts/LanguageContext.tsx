import React, { createContext, useContext, useState, ReactNode } from "react";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      processOverview: {
        title: "Process Overview of DoctorDial",
        subtitle: "Transform fragmented call handling into a unified, efficient system",
        steps: {
          integration: {
            title: "Integration with Phone Systems",
            description: "Seamlessly integrates with existing phone operators"
          },
          flexibility: {
            title: "Flexible Call Management",
            description: "Use your own assistants or fully rely on DoctorDial"
          },
          entry: {
            title: "Smart Call Entry",
            description: "First point of contact or queue management"
          },
          urgency: {
            title: "Urgency-Based Handling",
            description: "Intelligent routing based on urgency levels (U1-U5)"
          },
          insights: {
            title: "Comprehensive Insights",
            description: "Track sentiment, urgency levels, and follow-ups"
          },
          planning: {
            title: "Planning Integration",
            description: "Direct appointment scheduling with your systems"
          }
        }
      },
    },
    nl: {
      processOverview: {
        title: "Procesoverzicht van DoctorDial",
        subtitle: "Transformeer gefragmenteerde oproepafhandeling naar een geïntegreerd, efficiënt systeem",
        steps: {
          integration: {
            title: "Integratie met Telefoonsystemen",
            description: "Naadloze integratie met bestaande telefoonoperators"
          },
          flexibility: {
            title: "Flexibel Oproepbeheer",
            description: "Gebruik eigen assistenten of vertrouw volledig op DoctorDial"
          },
          entry: {
            title: "Slim Oproepbeheer",
            description: "Eerste contactpunt of wachtrijbeheer"
          },
          urgency: {
            title: "Urgentie-gebaseerde Afhandeling",
            description: "Intelligente routering op basis van urgentieniveaus (U1-U5)"
          },
          insights: {
            title: "Uitgebreide Inzichten",
            description: "Volg sentiment, urgentieniveaus en follow-ups"
          },
          planning: {
            title: "Planning Integratie",
            description: "Directe afspraakplanning met uw systemen"
          }
        }
      },
    }
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
