
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ResearchSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ResearchSearch({ searchQuery, setSearchQuery }: ResearchSearchProps) {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray" />
          <Input
            placeholder="Zoeken op patiënt of onderzoek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-muted text-gray-dark placeholder:text-gray"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray" />
          <Select value="all">
            <SelectTrigger className="w-[140px] bg-white border-gray-muted">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle onderzoeken</SelectItem>
              <SelectItem value="recent">Recente onderzoeken</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
