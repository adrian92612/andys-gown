export const dynamic = "force-dynamic";

import { BackButton } from "@/components/app/dashboard/BackButton";
import { MobileNavBar } from "@/components/app/dashboard/sidebar/MobileNavBar";
import { Sidebar } from "@/components/app/dashboard/sidebar/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | Andy's Gown Rental",
    template: "%s | Dashboard",
  },
  description:
    "Admin dashboard for managing gowns, bookings, and site content.",
  robots: {
    index: false,
    follow: false,
  },
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh bg-dashboard-primary text-dashboard-primary">
      <Sidebar />
      <main className="flex-1 bg-dashboard-primary overflow-hidden py-4 md:pr-4">
        <div className="bg-dashboard-secondary h-full overflow-y-auto p-4 sm:px-8 rounded-2xl ">
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
