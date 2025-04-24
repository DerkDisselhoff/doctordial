
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
    <div className="bg-white rounded-xl border border-gray-muted/30 p-6 flex flex-col items-center text-center space-y-6 hover:shadow-md transition-shadow duration-300">
      <Avatar className="w-48 h-48 border-2 border-mint/20">
        <AvatarImage 
          src={image} 
          alt={name} 
          className="object-cover rounded-full" 
        />
        <AvatarFallback className="text-2xl bg-mint/10 text-mint-dark">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-gray-dark tracking-tight">
          {name}
        </h3>
        <p className="text-base text-gray">
          {title}
        </p>
      </div>
    </div>
  );
};
