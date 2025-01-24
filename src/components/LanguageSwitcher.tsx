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
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-primary-light/10 transition-colors">
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-text-primary">
          {language === 'en' ? 'English' : 'Nederlands'}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className="flex items-center gap-2"
        >
          <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-surface font-medium">
            EN
          </span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('nl')}
          className="flex items-center gap-2"
        >
          <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-surface font-medium">
            NL
          </span>
          Nederlands
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;