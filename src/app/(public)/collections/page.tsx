import { CollectionsBlock } from "@/components/app/collections/Collections";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse our curated collection of elegant gowns for rent — perfect for weddings, proms, and formal events.",
  keywords: [
    "gown rental",
    "formal wear",
    "wedding dresses",
    "prom gowns",
    "evening gowns",
    "Andy's Gown Rental",
    "dress rental",
    "collections",
    "gown catalogue",
  ],
  openGraph: {
    title: "Elegant Gown Collections",
    description:
      "Explore our wide range of gowns, handpicked for every occasion. Affordable, elegant, and ready for your next event.",
    url: "https://andys-gown.vercel.app/collections",
    siteName: "Andy's Gown Rental",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Display of elegant gowns from Andy's Gown Rental",
      },
    ],

    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Our Gown Collections",
    description:
      "Find the perfect gown for your next wedding, formal, or special occasion.",
    images: ["/og-image"],
  },
};

const CollectionsPage = () => {
  return <CollectionsBlock />;
};

export default CollectionsPage;
