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
      }
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
      }
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
