import { GownForm } from "@/components/app/dashboard/gowns/GownForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Gown",
  description: "Create and configure a new gown listing in the dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const NewGownPage = () => {
  return (
    <section>
      <GownForm />
    </section>
  );
};

export default NewGownPage;
