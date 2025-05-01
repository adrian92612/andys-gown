import { Header } from "@/components/app/header/Header";
import { Footer } from "@/components/app/home/footer/Footer";
import { getCurrentUser } from "@/lib/auth";
import { AuthProvider } from "@/lib/providers/AuthProvider";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = async ({ children }: Props) => {
  const user = await getCurrentUser();
  return (
    <div>
      <AuthProvider initialUser={user}>
        <Header />
        <main>{children}</main>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default PublicLayout;
