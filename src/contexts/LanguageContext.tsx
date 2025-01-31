import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = 'en' | 'nl';

interface LanguageContextType {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const translations = {
  en: {
    hero: {
      aiPowered: "AI-Powered Call Management",
      title: "Digital Workers, Human Experience",
      subtitle: "Let AI handle your practice's calls while maintaining the personal touch your patients expect.",
      trainedOn: "Trained on millions of medical conversations",
      bookDemo: "Book a Demo",
      learnMore: "Learn More"
    },
    nav: {
      features: "Features",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      login: "Login",
      bookDemo: "Book a Demo",
      sarah: "Sarah"
    },
    footer: {
      description: "Empowering healthcare providers with AI-powered call management solutions for better patient care.",
      about: "About Us",
      blog: "Blog",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved."
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
    dashboard: {
      overview: "Overview",
      menu: {
        overview: "Overview",
        workflow: "Workflow",
        workerOutput: "Assistant Output",
        appointments: "Appointments",
        calendar: "Calendar",
        clients: "Clients",
        practices: "Practices",
        reports: "Reports",
        billing: "Billing",
        contracts: "Contracts",
        activity: "Activity",
        settings: "Settings",
        logout: "Log out"
      },
      metrics: {
        todaysCalls: "Today's Calls",
        totalAppointments: "Total Appointments",
        urgentCases: "Urgent Cases",
        callDuration: "Average Call Duration",
        totalClients: "Total Clients",
        monthlyRevenue: "Monthly Revenue",
        averageWaitTime: "Average Wait Time",
        satisfactionRate: "Satisfaction Rate"
      },
      filters: {
        today: "Today",
        lastWeek: "Last Week",
        lastMonth: "Last Month",
        urgency: "Urgency",
        allUrgencies: "All Urgencies",
        sentiment: "Sentiment",
        allSentiments: "All Sentiments"
      },
      callButton: {
        start: "Call Assistant",
        connecting: "Connecting...",
        end: "End Call"
      },
      toast: {
        callConnected: "Call connected",
        callConnectedDesc: "You are now connected to the assistant.",
        callEnded: "Call ended",
        callEndedDesc: "The call with the assistant has ended.",
        callError: "Call error",
        callErrorDesc: "There was an error with the call. Please try again.",
        callFailed: "Call failed",
        loggedOut: "Logged out",
        loggedOutDesc: "You have been logged out successfully.",
        logoutError: "Error logging out",
        tryAgain: "Please try again",
        saveSuccess: "Changes saved",
        saveError: "Error saving changes",
        deleteSuccess: "Successfully deleted",
        deleteError: "Error deleting item"
      },
      urgentCases: {
        title: "Urgent Cases",
        noUrgentCases: "No urgent cases at the moment",
        irrelevantTitle: "Non-Urgent Cases",
        noIrrelevantCases: "No non-urgent cases at the moment"
      },
      settings: {
        title: "Settings",
        general: "General",
        profile: "Profile",
        notifications: "Notifications",
        security: "Security & Privacy",
        billing: "Billing",
        team: "Team Management",
        integrations: "Integrations"
      },
      user: {
        defaultName: "User",
        admin: "Administrator",
        practiceManager: "Practice Manager"
      },
      appointments: {
        title: "Appointments",
        new: "New Appointment",
        upcoming: "Upcoming Appointments",
        past: "Past Appointments",
        details: {
          date: "Date",
          time: "Time",
          type: "Type",
          patient: "Patient",
          notes: "Notes",
          status: "Status"
        }
      },
      calendar: {
        title: "Calendar",
        month: "Month",
        week: "Week",
        day: "Day",
        schedule: "Schedule"
      }
    }
  },
  nl: {
    hero: {
      aiPowered: "AI-Gestuurde Gespreksafhandeling",
      title: "AI assistentes, menselijke ervaring",
      subtitle: "Laat AI de telefoongesprekken van jouw praktijk afhandelen met behoud van persoonlijk contact",
      trainedOn: "Getraind op miljoenen medische gesprekken",
      bookDemo: "Demo Aanvragen",
      learnMore: "Meer Informatie"
    },
    nav: {
      features: "Functies",
      pricing: "Prijzen",
      about: "Over Ons",
      contact: "Contact",
      login: "Inloggen",
      bookDemo: "Demo Aanvragen",
      sarah: "Sarah"
    },
    footer: {
      description: "Zorgverleners ondersteunen met AI-gestuurde gespreksbeheersoplossingen voor betere patiëntenzorg.",
      about: "Over Ons",
      blog: "Blog",
      privacy: "Privacybeleid",
      terms: "Servicevoorwaarden",
      rights: "Alle rechten voorbehouden."
    },
    capabilities: {
      title: "Digitale Medewerkers, Klaar voor Gebruik",
      subtitle: "Ontdek hoe onze plug-and-play digitale medewerkers naadloos integreren met jouw praktijk",
      medicalIntelligence: {
        title: "Medische Intelligentie",
        description: "Getraind op NHG-triagestandaarden en medische datasets voor nauwkeurige patiëntbeoordeling"
      },
      workerCustomization: {
        title: "Medewerker Aanpassing",
        description: "Pas doorverwijzingsregels, activeringstijden, stem, toon en medische vraagafhandeling aan naar jouw praktijkbehoeften"
      },
      humanExperience: {
        title: "Menselijke Ervaring",
        description: "Getraind op miljarden emotionele en empathische interacties voor natuurlijke, menselijke gesprekken"
      },
      seamlessIntegration: {
        title: "Naadloze Integratie",
        description: "Integreert eenvoudig met jouw bestaande belsoftware voor soepele implementatie"
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
    dashboard: {
      overview: "Overzicht",
      menu: {
        overview: "Overzicht",
        workflow: "Workflow",
        workerOutput: "Assistent Output",
        appointments: "Afspraken",
        calendar: "Kalender",
        clients: "Cliënten",
        practices: "Praktijken",
        reports: "Rapporten",
        billing: "Facturering",
        contracts: "Contracten",
        activity: "Activiteit",
        settings: "Instellingen",
        logout: "Uitloggen"
      },
      metrics: {
        todaysCalls: "Gesprekken Vandaag",
        totalAppointments: "Totaal Afspraken",
        urgentCases: "Urgente Gevallen",
        callDuration: "Gemiddelde Gespreksduur",
        totalClients: "Totaal Cliënten",
        monthlyRevenue: "Maandelijkse Omzet",
        averageWaitTime: "Gemiddelde Wachttijd",
        satisfactionRate: "Tevredenheid"
      },
      filters: {
        today: "Vandaag",
        lastWeek: "Afgelopen Week",
        lastMonth: "Afgelopen Maand",
        urgency: "Urgentie",
        allUrgencies: "Alle Urgenties",
        sentiment: "Sentiment",
        allSentiments: "Alle Sentimenten"
      },
      callButton: {
        start: "Bel Assistent",
        connecting: "Verbinden...",
        end: "Gesprek Beëindigen"
      },
      toast: {
        callConnected: "Verbinding gemaakt",
        callConnectedDesc: "U bent nu verbonden met de assistent.",
        callEnded: "Gesprek beëindigd",
        callEndedDesc: "Het gesprek met de assistent is beëindigd.",
        callError: "Fout in gesprek",
        callErrorDesc: "Er is een fout opgetreden. Probeer het opnieuw.",
        callFailed: "Gesprek mislukt",
        loggedOut: "Uitgelogd",
        loggedOutDesc: "U bent succesvol uitgelogd",
        logoutError: "Fout bij uitloggen",
        tryAgain: "Probeer het opnieuw",
        saveSuccess: "Wijzigingen opgeslagen",
        saveError: "Fout bij opslaan",
        deleteSuccess: "Succesvol verwijderd",
        deleteError: "Fout bij verwijderen"
      },
      urgentCases: {
        title: "Urgente Gevallen",
        noUrgentCases: "Momenteel geen urgente gevallen",
        irrelevantTitle: "Niet-Urgente Gevallen",
        noIrrelevantCases: "Momenteel geen niet-urgente gevallen"
      },
      settings: {
        title: "Instellingen",
        general: "Algemeen",
        profile: "Profiel",
        notifications: "Notificaties",
        security: "Beveiliging & Privacy",
        billing: "Facturering",
        team: "Team Beheer",
        integrations: "Integraties"
      },
      user: {
        defaultName: "Gebruiker",
        admin: "Beheerder",
        practiceManager: "Praktijkmanager"
      },
      appointments: {
        title: "Afspraken",
        new: "Nieuwe Afspraak",
        upcoming: "Aankomende Afspraken",
        past: "Eerdere Afspraken",
        details: {
          date: "Datum",
          time: "Tijd",
          type: "Type",
          patient: "Patiënt",
          notes: "Notities",
          status: "Status"
        }
      },
      calendar: {
        title: "Kalender",
        month: "Maand",
        week: "Week",
        day: "Dag",
        schedule: "Planning"
      }
    }
  }
};

const LanguageContext = createContext<LanguageContextType>({
  t: () => "",
  language: "nl", // Changed default to Dutch
  setLanguage: () => {}
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("nl"); // Changed default to Dutch

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
