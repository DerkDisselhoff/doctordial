import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#F1F0FB]">
        <div className="fixed inset-y-0 left-0 z-50">
          <AdminSidebar />
        </div>
        <main className="flex-1 ml-56 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}