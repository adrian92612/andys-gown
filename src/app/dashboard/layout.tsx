import { LogoutButton } from "@/components/app/dashboard/LogoutButton";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LogoutButton />
      {children}
    </div>
  );
};

export default DashboardLayout;
