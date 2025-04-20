import { GownForm } from "@/components/app/dashboard/gowns/GownForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

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
