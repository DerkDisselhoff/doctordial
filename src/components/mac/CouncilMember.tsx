
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center space-y-4 w-full max-w-[320px] mx-auto">
      <Avatar className="w-48 h-48 mb-2">
        <AvatarImage src={image} alt={name} className="object-cover" />
        <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
      </Avatar>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-dark">{name}</h3>
        <p className="text-gray">{title}</p>
      </div>
    </div>
  );
};
