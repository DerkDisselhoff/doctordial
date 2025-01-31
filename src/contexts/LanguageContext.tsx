
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

type Language = 'en' | 'nl';

interface LanguageContextType {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoading: boolean;
}

interface TranslationsResponse {
  translations: {
    [key: string]: any;
  };
}

const LanguageContext = createContext<LanguageContextType>({
  t: () => "",
  language: "nl",
  setLanguage: () => {},
  isLoading: true
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("nl");
  const [translations, setTranslations] = useState<{[key: string]: any}>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('translations')
          .select('translations')
          .eq('language', language)
          .single();

        if (error) {
          throw error;
        }

        if (data && data.translations) {
          // Ensure we're setting an object for translations
          setTranslations(typeof data.translations === 'object' ? data.translations : {});
        }
      } catch (error) {
        console.error('Error fetching translations:', error);
        toast({
          title: "Error loading translations",
          description: "Please refresh the page to try again",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranslations();
  }, [language, toast]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage, isLoading }}>
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
