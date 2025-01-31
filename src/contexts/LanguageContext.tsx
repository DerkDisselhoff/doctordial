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
      learningDescription: "Constantly improving through each interaction while maintaining consistent quality of care.",
      imageAlt: "Sarah AI Medical Assistant",
      howToWork: "How to work with Sarah",
      step1Title: "Train Sarah on the care that you provide",
      step1Description: "Customize Sarah's knowledge base to align perfectly with your practice's specific medical services and protocols. Our AI system learns from your input to provide accurate, practice-specific responses and recommendations.",
      step2Title: "Build your workflow and forwarding rules",
      step2Description: "Set up custom workflows and rules to ensure proper handling of different types of patient inquiries and urgency levels. Define specific protocols for various medical situations and establish escalation pathways.",
      step3Title: "Let Sarah take your calls",
      step3Description: "Activate Sarah to handle patient calls 24/7, providing professional and consistent care communication while following your established protocols. Sarah manages routine inquiries and intelligently escalates urgent matters.",
      conditionsTitle: "Trained on Thousands of Medical Conditions",
      readyTitle: "Ready to Transform Your Practice?",
      readyDescription: "Join the growing number of medical practices that trust Sarah to handle their patient communications.",
      hire: "Hire Sarah",
      useCases: {
        title: "How Sarah Helps Your Practice",
        subtitle: "Discover the many ways Sarah can assist your medical practice",
        forward: {
          title: "Smart Call Forwarding",
          description: "Intelligently routes calls based on urgency levels and practice protocols"
        },
        selfCare: {
          title: "Self-Care Guidance",
          description: "Provides evidence-based self-care advice for minor health concerns"
        },
        routing: {
          title: "Efficient Routing",
          description: "Directs patients to the right care provider based on their needs"
        },
        conversation: {
          title: "Natural Conversations",
          description: "Engages in human-like dialogue while gathering essential medical information"
        },
        communication: {
          title: "Clear Communication",
          description: "Ensures accurate information exchange between patients and healthcare providers"
        },
        support: {
          title: "24/7 Support",
          description: "Available around the clock to handle patient inquiries and urgent cases"
        }
      }
    },
    about: {
      location: "Founded in 2025, Amsterdam",
      title: "The next era of Healthcare,",
      subtitle: "driven by AI",
      description: "Empowering healthcare providers to focus on what matters most: patient care"
    },
    demo: {
      title: "Boek een Demo",
      subtitle: "Ervaar de toekomst van gezondheidszorgcommunicatie",
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mailadres",
      phone: "Telefoonnummer",
      practice: "Naam Praktijk",
      practitioners: "Aantal Artsen",
      submit: "Demo Aanvragen",
      submitting: "Aanvragen...",
      success: {
        title: "Bedankt voor je interesse!",
        message: "We nemen binnenkort contact met je op om een demo in te plannen."
      }
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
    hero: {
      aiPowered: "AI-Gestuurde Gespreksafhandeling",
      title: "AI assistentes, menselijke ervaring",
      subtitle: "Laat AI de telefoongesprekken van jouw praktijk afhandelen met behoud van persoonlijk contact",
      trainedOn: "Getraind op miljoenen medische gesprekken",
      bookDemo: "Demo Aanvragen",
      learnMore: "Meer Informatie"
    },
    assistant: {
      title: "Ontmoet Je Digitale Doktersassistent",
      subtitle: "Je toegewijde digitale medische assistent, 24/7 beschikbaar om patiëntgesprekken te behandelen en gevallen te triageren met de precisie van een getrainde professional.",
      trainedOn: "Getraind op uitgebreide medische protocollen",
      learnMore: "Meer informatie over Sarah",
      hire: "Huur Sarah in",
      support: "Patiëntondersteuning"
    },
    sarah: {
      title: "Maak kennis met Sarah",
      subtitle: "Je AI-aangedreven medische assistent, die geavanceerde technologie combineert met zorgzame ondersteuning",
      aiPowered: "AI-Aangedreven Intelligentie",
      aiDescription: "Getraind op uitgebreide medische protocollen en best practices om nauwkeurige, consistente ondersteuning te bieden voor jouw praktijk.",
      expertise: "Medische Expertise",
      expertiseDescription: "In staat om een breed scala aan medische aandoeningen te begrijpen en te triageren met professionele nauwkeurigheid.",
      availability: "24/7 Beschikbaarheid",
      availabilityDescription: "Altijd klaar om je patiënten te helpen, gesprekken te beheren en urgente gevallen op elk moment van de dag te behandelen.",
      learning: "Continue Ontwikkeling",
      learningDescription: "Voortdurend verbeterend door elke interactie met behoud van consistente zorgkwaliteit.",
      imageAlt: "Sarah AI Medische Assistent",
      howToWork: "Hoe werk je met Sarah",
      step1Title: "Train Sarah voor jouw zorgverlening",
      step1Description: "Pas Sarah's kennisbank aan zodat deze perfect aansluit bij de specifieke medische diensten en protocollen van jouw praktijk. Ons AI-systeem leert van jouw input om nauwkeurige, praktijkspecifieke antwoorden en aanbevelingen te geven.",
      step2Title: "Stel je workflow en doorverwijzingsregels in",
      step2Description: "Configureer aangepaste workflows en regels voor het correct afhandelen van verschillende soorten patiëntvragen en urgentieniveaus. Definieer specifieke protocollen voor verschillende medische situaties en stel escalatiepaden in.",
      step3Title: "Laat Sarah je telefoontjes beantwoorden",
      step3Description: "Activeer Sarah om 24/7 patiëntgesprekken te behandelen, met professionele en consistente zorgcommunicatie volgens jouw vastgestelde protocollen. Sarah beheert routinevragen en schaalt urgente zaken intelligent op.",
      conditionsTitle: "Getraind op Duizenden Medische Aandoeningen",
      readyTitle: "Klaar om je Praktijk te Transformeren?",
      readyDescription: "Sluit je aan bij het groeiende aantal medische praktijken die Sarah vertrouwen voor hun patiëntcommunicatie.",
      hire: "Huur Sarah in",
      useCases: {
        title: "Hoe Sarah jouw Praktijk Helpt",
        subtitle: "Ontdek de verschillende manieren waarop Sarah jouw medische praktijk kan ondersteunen",
        forward: {
          title: "Slim Doorverbinden",
          description: "Verbindt gesprekken door op basis van urgentieniveaus en praktijkprotocollen"
        },
        selfCare: {
          title: "Zelfzorg Advies",
          description: "Geeft wetenschappelijk onderbouwd zelfzorgadvies voor lichte gezondheidsklachten"
        },
        routing: {
          title: "Efficiënte Doorverwijzing",
          description: "Stuurt patiënten door naar de juiste zorgverlener op basis van hun behoeften"
        },
        conversation: {
          title: "Natuurlijke Gesprekken",
          description: "Voert menselijke gesprekken terwijl ze essentiële medische informatie verzamelt"
        },
        communication: {
          title: "Heldere Communicatie",
          description: "Zorgt voor nauwkeurige informatie-uitwisseling tussen patiënten en zorgverleners"
        },
        support: {
          title: "24/7 Ondersteuning",
          description: "Dag en nacht beschikbaar om patiëntvragen en urgente gevallen te behandelen"
        }
      }
    },
    about: {
      location: "Opgericht in 2025, Amsterdam",
      title: "Het nieuwe tijdperk van Gezondheidszorg,",
      subtitle: "gedreven door AI",
      description: "Zorgverleners in staat stellen zich te concentreren op wat het belangrijkst is: patiëntenzorg",
      stats: {
        founded: "Opgericht in Amsterdam",
        assistants: "AI Assistenten",
        expertise: "Medische Expertise",
        languages: "Beschikbare Talen"
      },
      challenge: {
        title: "De Uitdaging",
        description1: "In Nederland staat ons zorgsysteem op een kritiek punt. Een vergrijzende bevolking, stijgende kosten en een toegenomen vraag naar specialistische zorg zorgen voor een groeiende druk op Ziekenhuizen, Huisartsen en medisch personeel.",
        description2: "Mensen verliezen vertrouwen in een systeem dat overweldigd lijkt. Wachttijden nemen toe en zorgprofessionals hebben het zwaar, wat vooral uitdagend is in de huisartsenpraktijk. Dit resulteert in slechtere toegankelijkheid voor de patiënt.",
        description3: "Wanneer patiënten niet op tijd aandacht kunnen krijgen, lijden ze zowel fysiek als mentaal. Chronische aandoeningen verergeren ongecontroleerd, kleine problemen worden groot en het vertrouwen in het systeem erodeert."
      },
      solution: {
        title: "De Oplossing",
        description1: "Technologie is zover gevorderd dat het routinetaken betrouwbaar kan automatiseren zonder het menselijke aspect te verliezen. Door administratief werk aan AI te delegeren, krijgen zorgverleners meer ruimte om zich te richten op impactvolle patiëntenzorg.",
        description2: "Stel je een intelligent triagesysteem voor dat snel initiële symptomen evalueert, afspraken plant en ervoor zorgt dat mensen die urgente zorg nodig hebben eerst een arts zien - terwijl routinecontroles en follow-ups net zo effectief worden afgehandeld."
      },
      vision: {
        title: "Onze Visie",
        description1: "DoctorDial bestaat om deze toekomst werkelijkheid te maken. Onze visie is om medisch personeel te ontlasten met een AI-gedreven platform dat triage, planning en patiënt follow-up stroomlijnt, begeleid door onze eigen ervaren zorgprofessionals.",
        description2: "Door gebruik te maken van de nieuwste medische inzichten en praktische kennis, zorgen we ervoor dat onze automatiseringsoplossingen veilig en nauwkeurig zijn, en diep afgestemd op de belangen van patiënten en zorgverleners.",
        description3: "Door de kracht van AI in te zetten, vergroot DoctorDial de capaciteit van artsen, verpleegkundigen en ondersteunend personeel - zonder ooit het welzijn van de patiënt uit het oog te verliezen. Onze toewijding is om de Nederlandse huisartsenzorg sterk en toegankelijk te houden terwijl we een snel veranderende toekomst tegemoet gaan en elke patiënt de aandacht krijgt die ze verdienen, precies wanneer ze die nodig hebben."
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
