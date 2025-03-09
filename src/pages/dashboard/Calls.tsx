
import { DetailedCallsList } from "@/components/calls/DetailedCallsList";
import { MedicationList } from "@/components/calls/MedicationList";
import { ResearchResultsList } from "@/components/calls/ResearchResultsList";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { CallDetail } from "@/components/calls/CallDetail";
import { MedicationDetail } from "@/components/calls/MedicationDetail";
import { ChevronRight } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const Calls = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine if we're on a detail page
  const isDetailPage = path.includes("/calls/") && path.split("/").length > 3;

  // Determine which type of calls we're viewing
  const getPageTitle = () => {
    if (path.includes("/medication")) {
      return "Medication";
    } else if (path.includes("/research")) {
      return "Research Results";
    } else {
      return "Triage";
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-dark">Assistant Output</h2>
        <p className="text-gray">Monitor and analyze assistant performance across services</p>
      </div>

      {isDetailPage && (
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/dashboard/calls">Assistant Output</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {path.includes("/medication") ? (
                <BreadcrumbLink>
                  <Link to="/dashboard/calls/medication">Medication</Link>
                </BreadcrumbLink>
              ) : path.includes("/research") ? (
                <BreadcrumbLink>
                  <Link to="/dashboard/calls/research">Research Results</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink>
                  <Link to="/dashboard/calls">Triage</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>Details</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      {!isDetailPage && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-dark">{getPageTitle()}</h3>
        </div>
      )}

      <Routes>
        <Route index element={<DetailedCallsList />} />
        <Route path=":callId" element={<CallDetail />} />
        <Route path="medication" element={<MedicationList />} />
        <Route path="medication/:callId" element={<MedicationDetail />} />
        <Route path="research" element={<ResearchResultsList />} />
      </Routes>
    </div>
  );
};

export default Calls;
