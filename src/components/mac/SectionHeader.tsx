
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
}

export const SectionHeader = ({ icon: Icon, title }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-2 text-mint mb-8 animate-fade-in">
      <Icon className="w-5 h-5" />
      <h2 className="text-2xl font-semibold text-gray-dark">
        {title}
      </h2>
    </div>
  );
};
