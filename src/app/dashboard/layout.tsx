import { BackButton } from "@/components/app/dashboard/BackButton";
import { MobileNavBar } from "@/components/app/dashboard/sidebar/MobileNavBar";
import { Sidebar } from "@/components/app/dashboard/sidebar/Sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh  bg-slate-900 text-stone-800">
      <Sidebar />
      <main className="flex-1 bg-slate-900 overflow-hidden py-4 md:pr-4">
        <div className="bg-slate-200 h-full overflow-y-auto p-4 sm:px-8 rounded-2xl ">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-5 mb-5">
              <MobileNavBar />
              <BackButton />
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
