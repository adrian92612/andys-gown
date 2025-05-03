import { GownForm } from "@/components/app/dashboard/gowns/GownForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const gown = await prisma.gown.findUnique({
    where: { id },
    select: { name: true },
  });

  if (!gown) {
    return {
      title: "Edit Gown",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Edit: ${gown.name}`,
    description: `Edit details, images, and availability of "${gown.name}".`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

const EditGownPage = async ({ params }: Props) => {
  const { id } = await params;
  const gown = await prisma.gown.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!gown) return notFound();
  return (
    <div>
      <GownForm gownData={gown} />
    </div>
  );
};

export default EditGownPage;
