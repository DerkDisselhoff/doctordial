import { Stethoscope } from "lucide-react";

export function SidebarHeader() {
  return (
    <div className="p-5 border-b border-mint/10">
      <div className="flex items-center space-x-3 transition-all hover:opacity-80">
        <Stethoscope className="w-6 h-6 text-mint" />
        <h1 className="text-xl font-semibold text-white tracking-tight">
          DoctorDial
        </h1>
      </div>
    </div>
  );
}