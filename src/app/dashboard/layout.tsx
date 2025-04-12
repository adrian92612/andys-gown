import { BackButton } from "@/components/app/dashboard/BackButton";
import { MobileNavBar } from "@/components/app/dashboard/sidebar/MobileNavBar";
import { Sidebar } from "@/components/app/dashboard/sidebar/Sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh">
      <Sidebar />
      <main className="flex-1 overflow-y-auto py-4 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <MobileNavBar />
          <BackButton />
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
