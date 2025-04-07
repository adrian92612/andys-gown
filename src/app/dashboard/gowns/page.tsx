import { DataTable } from "@/components/app/dashboard/DataTable";
import { gownColumns } from "@/components/app/dashboard/gowns/gown-columns";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { route } from "@/lib/routes";
import Link from "next/link";

const GownsPage = async () => {
  const gowns = await prisma.gown.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="w-full space-y-4">
      <div className="flex justify-end">
        <Link href={route.newGown} className="ml-auto">
          <Button>Add Gown</Button>
        </Link>
      </div>
      <DataTable columns={gownColumns} data={gowns} />
    </section>
  );
};

export default GownsPage;
