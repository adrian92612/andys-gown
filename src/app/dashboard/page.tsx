import { route } from "@/lib/routes";
import { redirect } from "next/navigation";

const DashboardPage = () => redirect(route.dashboard);

export default DashboardPage;
