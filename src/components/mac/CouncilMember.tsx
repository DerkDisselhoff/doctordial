
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CouncilMemberProps {
  name: string;
  title: string;
  image: string;
}

export const CouncilMember = ({ name, title, image }: CouncilMemberProps) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <div 
      className="group bg-white rounded-xl border border-gray-muted/30 p-6 flex flex-col items-center text-center space-y-6 
                 hover:shadow-lg transition-all duration-300 animate-fade-in
                 hover:border-mint/20 cursor-pointer"
    >
      <div className="relative">
        <Avatar className="w-48 h-48 border-2 border-mint/20 transition-transform duration-300 group-hover:scale-105">
          <AvatarImage 
            src={image} 
            alt={name} 
            className="object-cover rounded-full" 
          />
          <AvatarFallback className="text-2xl bg-mint/10 text-mint-dark">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 rounded-full bg-mint/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-dark tracking-tight group-hover:text-mint transition-colors duration-300">
          {name}
        </h3>
        <p className="text-base text-gray group-hover:text-gray-dark transition-colors duration-300">
          {title}
        </p>
      </div>
    </div>
  );
};
