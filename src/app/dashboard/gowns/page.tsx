import { Button } from "@/components/ui/button";
import { route } from "@/lib/routes";
import Link from "next/link";

const GownsPage = () => {
  return (
    <section>
      GownsPage
      <Link href={route.newGown}>
        <Button>Add Gown</Button>
      </Link>
    </section>
  );
};

export default GownsPage;
