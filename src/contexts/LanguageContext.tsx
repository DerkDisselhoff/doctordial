import React, { createContext, useContext, useState, ReactNode } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      login: "Login",
    },
  },
  nl: {
    nav: {
      features: "Kenmerken",
      pricing: "Prijzen",
      about: "Over",
      contact: "Contact",
      login: "Inloggen",
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const t = (key) => {
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
