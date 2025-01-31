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
      menu: {
        overview: "Overview",
        workflow: "Workflow",
        calendar: "Calendar",
        clients: "Clients",
        practices: "Practices",
        reports: "Reports",
        billing: "Billing",
        contracts: "Contracts",
        activity: "Activity",
        settings: "Settings",
        calls: "Calls",
        appointments: "Appointments",
        assistant: "Assistant"
      },
      metrics: {
        totalClients: "Total Clients",
        totalCalls: "Total Calls",
        avgCallDuration: "Avg. Call Duration",
        monthlyRevenue: "Monthly Revenue",
        newClients: "New This Month",
        recentlyOnboarded: "Recently onboarded",
        activeUsers: "Active Users",
        usageRate: "Usage rate",
        churned: "Churned",
        last30Days: "Last 30 days"
      },
      settings: {
        title: "Settings",
        subtitle: "Manage your account and application preferences",
        general: {
          title: "General Settings",
          description: "Manage your account and application preferences",
          accountInfo: "Account Information",
          practiceName: "Practice Name",
          email: "Email Address",
          notifications: "Notifications",
          language: "Language",
          timezone: "Time Zone",
          security: "Security",
          changePassword: "Change Password",
          twoFactor: "Two-Factor Authentication",
          loginHistory: "Login History",
          saveChanges: "Save Changes",
          saving: "Saving...",
          successTitle: "Changes saved",
          successMessage: "Your information has been updated successfully."
        }
      },
      workflow: {
        title: "Workflow Configuration",
        description: "Configure how incoming calls are handled",
        urgencyLevels: "Urgency Level Forwarding",
        subjectForwarding: "Subject Forwarding Rules",
        addSubject: "Add Subject",
        subject: "Subject",
        forwardTo: "Forward To",
        enterSubject: "Enter subject",
        enterDestination: "Enter destination",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        status: {
          active: "Active",
          inactive: "Inactive"
        }
      },
      calls: {
        title: "Call Management",
        subtitle: "Monitor and analyze call activity",
        status: {
          all: "All Calls",
          active: "Active",
          completed: "Completed",
          missed: "Missed"
        },
        details: {
          duration: "Duration",
          patient: "Patient",
          timestamp: "Time",
          type: "Call Type",
          urgency: "Urgency Level",
          notes: "Notes"
        },
        filters: {
          search: "Search calls...",
          dateRange: "Date Range",
          status: "Status",
          urgencyLevel: "Urgency Level"
        }
      }
    }
  },
  nl: {
    dashboard: {
      menu: {
        overview: "Overzicht",
        workflow: "Workflow",
        calendar: "Agenda",
        clients: "Cliënten",
        practices: "Praktijken",
        reports: "Rapporten",
        billing: "Facturering",
        contracts: "Contracten",
        activity: "Activiteit",
        settings: "Instellingen",
        calls: "Gesprekken",
        appointments: "Afspraken",
        assistant: "Assistent"
      },
      metrics: {
        totalClients: "Totaal Aantal Cliënten",
        totalCalls: "Totaal Aantal Gesprekken",
        avgCallDuration: "Gem. Gespreksduur",
        monthlyRevenue: "Maandelijkse Omzet",
        newClients: "Nieuw Deze Maand",
        recentlyOnboarded: "Recent toegevoegd",
        activeUsers: "Actieve Gebruikers",
        usageRate: "Gebruikspercentage",
        churned: "Opgezegd",
        last30Days: "Laatste 30 dagen"
      },
      settings: {
        title: "Instellingen",
        subtitle: "Beheer uw account en applicatie-instellingen",
        general: {
          title: "Algemene Instellingen",
          description: "Beheer uw account en applicatie-instellingen",
          accountInfo: "Account Informatie",
          practiceName: "Praktijknaam",
          email: "E-mailadres",
          notifications: "Notificaties",
          language: "Taal",
          timezone: "Tijdzone",
          security: "Beveiliging",
          changePassword: "Wachtwoord Wijzigen",
          twoFactor: "Twee-Factor Authenticatie",
          loginHistory: "Inloggeschiedenis",
          saveChanges: "Wijzigingen Opslaan",
          saving: "Opslaan...",
          successTitle: "Wijzigingen opgeslagen",
          successMessage: "Uw gegevens zijn succesvol bijgewerkt."
        }
      },
      workflow: {
        title: "Workflow Configuratie",
        description: "Configureer hoe inkomende gesprekken worden afgehandeld",
        urgencyLevels: "Urgentieniveau Doorschakeling",
        subjectForwarding: "Onderwerp Doorschakelregels",
        addSubject: "Onderwerp Toevoegen",
        subject: "Onderwerp",
        forwardTo: "Doorschakelen Naar",
        enterSubject: "Voer onderwerp in",
        enterDestination: "Voer bestemming in",
        actions: "Acties",
        edit: "Bewerken",
        delete: "Verwijderen",
        save: "Opslaan",
        status: {
          active: "Actief",
          inactive: "Inactief"
        }
      },
      calls: {
        title: "Gespreksmanagement",
        subtitle: "Monitor en analyseer gespreksactiviteit",
        status: {
          all: "Alle Gesprekken",
          active: "Actief",
          completed: "Voltooid",
          missed: "Gemist"
        },
        details: {
          duration: "Duur",
          patient: "Patiënt",
          timestamp: "Tijd",
          type: "Gesprekstype",
          urgency: "Urgentieniveau",
          notes: "Notities"
        },
        filters: {
          search: "Zoek gesprekken...",
          dateRange: "Datumbereik",
          status: "Status",
          urgencyLevel: "Urgentieniveau"
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
