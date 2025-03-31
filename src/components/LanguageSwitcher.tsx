
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-muted/50 hover:bg-gray-muted transition-colors">
        <Globe className="w-4 h-4 text-gray-dark" />
        <span className="text-sm font-medium text-gray-dark">
          {language === 'en' ? 'English' : 'Nederlands'}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px] bg-white">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className="flex items-center gap-2"
        >
          <span className="w-5 h-5 rounded-full bg-blue-dark flex items-center justify-center text-[10px] text-white font-medium">
            EN
          </span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('nl')}
          className="flex items-center gap-2"
        >
          <span className="w-5 h-5 rounded-full bg-blue-dark flex items-center justify-center text-[10px] text-white font-medium">
            NL
          </span>
          Nederlands
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
