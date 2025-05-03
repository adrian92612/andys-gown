import { Header } from "@/components/app/header/Header";
import { Footer } from "@/components/app/home/footer/Footer";
import { getCurrentUser } from "@/lib/auth";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Andy's Gown Rental",
    template: "%s | Andy's Gown Rental",
  },
  description:
    "Discover elegant gowns for weddings, proms, and every special occasion.",
  keywords: [
    "Andy's Gown Rental",
    "gown rental",
    "dress rental",
    "formal wear",
    "elegant gowns",
    "event gowns",
    "wedding gown rental",
    "prom dress rental",
    "affordable gown rental",
    "online gown rental",
  ],
  openGraph: {
    title: "Andy's Gown Rental",
    description: "Rent elegant gowns for weddings, proms, and formal events.",
    url: "https://andysgownrental.com",
    siteName: "Andy's Gown Rental",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Andy's Gown Logo",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andy's Gown Rental",
    description: "Rent elegant gowns for weddings, proms, and formal events.",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Andy's Gown Logo",
      },
    ],
  },
};

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
