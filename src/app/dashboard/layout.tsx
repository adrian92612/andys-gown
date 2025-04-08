import { BackButton } from "@/components/app/dashboard/BackButton";
import { Sidebar } from "@/components/app/dashboard/sidebar/Sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4">
        <BackButton />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
