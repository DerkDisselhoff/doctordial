
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ResearchPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export function ResearchPagination({ 
  currentPage, 
  totalPages,
  setCurrentPage 
}: ResearchPaginationProps) {
  if (totalPages <= 1) return null;
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-muted/10">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm border border-gray-muted/20 rounded hover:bg-gray-muted/10 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Vorige
      </button>
      <span className="text-sm text-gray">
        Pagina {currentPage} van {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm border border-gray-muted/20 rounded hover:bg-gray-muted/10 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1"
      >
        Volgende
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
