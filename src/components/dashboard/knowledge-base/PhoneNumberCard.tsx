
import { Phone } from "lucide-react";

interface PhoneNumberCardProps {
  testType: "triage" | "medicatie" | "onderzoek";
}

export const PhoneNumberCard = ({ testType }: PhoneNumberCardProps) => {
  const getPhoneInfo = () => {
    switch (testType) {
      case "triage":
        return {
          number: "+31 (970) 102 50810",
          title: "Medi Mere - Triage expert [hoofd]",
          subtitle: "DoctorDial"
        };
      case "medicatie":
        return {
          number: "+31 (970) 102 50319",
          title: "Herhaalrecepten",
          subtitle: "Herhaalrecepten"
        };
      case "onderzoek":
        return {
          number: "+31 (970) 102 52219",
          title: "Medi Mere - Terugbelverzoek onderzoek",
          subtitle: "Terugbelverzoek"
        };
      default:
        return {
          number: "",
          title: "",
          subtitle: ""
        };
    }
  };

  const { number, title, subtitle } = getPhoneInfo();

  return (
    <div className="bg-gray-900 text-white rounded-lg p-4 mb-6 shadow-md max-w-sm">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-mint/20 p-2 rounded-full">
          <Phone className="h-5 w-5 text-mint" />
        </div>
        <h3 className="text-xl font-semibold">{number}</h3>
      </div>
      <div className="text-gray-400 ml-12">
        <p>{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};
