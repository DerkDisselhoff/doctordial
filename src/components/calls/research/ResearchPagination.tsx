
import { Button } from "@/components/ui/button";

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
  
  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-muted/10">
      <button
        onClick={() => setCurrentPage(Math.max(page => page - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm border border-gray-muted/20 rounded hover:bg-gray-muted/10 disabled:opacity-50 disabled:pointer-events-none"
      >
        Vorige
      </button>
      <span className="text-sm text-gray">
        Pagina {currentPage} van {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(Math.min(page => page + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm border border-gray-muted/20 rounded hover:bg-gray-muted/10 disabled:opacity-50 disabled:pointer-events-none"
      >
        Volgende
      </button>
    </div>
  );
}
