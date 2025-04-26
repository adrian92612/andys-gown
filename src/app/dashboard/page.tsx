import { route } from "@/constants/routes";
import { redirect } from "next/navigation";

const DashboardPage = () => redirect(route.dashboard);

export default DashboardPage;
