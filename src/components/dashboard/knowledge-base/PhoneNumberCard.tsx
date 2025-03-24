
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
    <div className="inline-flex items-center bg-white border border-purple-100 rounded-lg px-4 py-2 shadow-sm">
      <div className="bg-[#9b87f5]/20 p-2 rounded-full mr-3">
        <Phone className="h-4 w-4 text-[#7E69AB]" />
      </div>
      <div>
        <p className="text-[#1A1F2C] font-semibold text-sm">{number}</p>
        <p className="text-[#8E9196] text-xs">{title}</p>
      </div>
    </div>
  );
};
