
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResearchResultsTable } from "./research/ResearchResultsTable";
import { ResearchPagination } from "./research/ResearchPagination";
import { ResearchSearch } from "./research/ResearchSearch";
import { ResearchLoading } from "./research/ResearchLoading";
import { useResearchCalls } from "./research/useResearchCalls";

export function ResearchResultsList() {
  const {
    filteredCalls,
    loading,
    error,
    isDemoAccount,
    currentPage,
    totalPages,
    itemsPerPage,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    formatDate
  } = useResearchCalls();

  if (loading) {
    return (
      <Card className="dashboard-card">
        <CardContent className="flex justify-center p-8">
          <ResearchLoading />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="border-b border-gray-muted">
        <CardTitle className="text-gray-dark">Onderzoek Uitslagen</CardTitle>
        <ResearchSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </CardHeader>
      <CardContent className="p-0">
        {error && !isDemoAccount && (
          <div className="p-4 text-center text-red-500">
            {error}
          </div>
        )}
        
        <ResearchResultsTable 
          filteredCalls={filteredCalls}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          formatDate={formatDate}
          isDemoAccount={isDemoAccount}
        />
        
        <ResearchPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
}
