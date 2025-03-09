
import { DetailedCallsList } from "@/components/calls/DetailedCallsList";
import { MedicationList } from "@/components/calls/MedicationList";
import { ResearchResultsList } from "@/components/calls/ResearchResultsList";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { CallDetail } from "@/components/calls/CallDetail";
import { MedicationDetail } from "@/components/calls/MedicationDetail";
import { 
  Tabs, TabsList, TabsTrigger, TabsContent 
} from "@/components/ui/tabs";
import { 
  Heart, Pill, Microscope, ChevronRight 
} from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const Calls = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine which tab is active
  let activeTab = "triage";
  if (path.includes("/medication")) {
    activeTab = "medication";
  } else if (path.includes("/research")) {
    activeTab = "research";
  }

  // Determine if we're on a detail page
  const isDetailPage = path.includes("/calls/") && path.split("/").length > 3;

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
        <Tabs value={activeTab} className="mb-6">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger 
              value="triage" 
              asChild
              className="flex items-center gap-2 data-[state=active]:bg-mint/10 data-[state=active]:text-mint data-[state=active]:border-mint"
            >
              <Link to="/dashboard/calls" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Triage</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="medication" 
              asChild
              className="flex items-center gap-2 data-[state=active]:bg-mint/10 data-[state=active]:text-mint data-[state=active]:border-mint"
            >
              <Link to="/dashboard/calls/medication" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                <span>Medication</span>
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="research" 
              asChild
              className="flex items-center gap-2 data-[state=active]:bg-mint/10 data-[state=active]:text-mint data-[state=active]:border-mint"
            >
              <Link to="/dashboard/calls/research" className="flex items-center gap-2">
                <Microscope className="h-4 w-4" />
                <span>Research Results</span>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
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
