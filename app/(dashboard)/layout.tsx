import AppSidebar from '@/components/dashboard/AppSidebar';
import DashboardNav from '@/components/dashboard/DashboardNav';
import SidebarProvider from '@/components/providers/SidebarProvider';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      {/* Grid layout for sidebar and main content */}
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        
        {/* Sidebar for large screens */}
        <div className="hidden border-r bg-muted/40 lg:block">
          <AppSidebar />
        </div>

        {/* Main content area */}
        <div className="flex flex-col">
          <DashboardNav />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-muted/40">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}