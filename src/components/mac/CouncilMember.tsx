
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
    <div className="flex items-start space-x-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <Avatar className="w-24 h-24">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-dark">{name}</h3>
        <p className="text-gray">{title}</p>
      </div>
    </div>
  );
};
