"use client";

import { Category, Prisma } from "@prisma/client";
import { GownCard } from "./GownCard";
import { Input } from "@/components/ui/input";
import { CategoryBtn } from "./CategoryBtn";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { parseAsInteger, parseAsStringEnum, useQueryState } from "nuqs";

const PAGE_SIZE = 12;

const categoryEnums = ["All", ...Object.values(Category)] as const;
type CategoryWithAll = Category | "All";

type Props = {
  gownList: Prisma.GownGetPayload<{
    include: { images: { select: { url: true }; take: 1 } };
  }>[];
};

export const CollectionsGownGrid = ({ gownList }: Props) => {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsStringEnum([...categoryEnums]).withDefault("All")
  );
  const [search, setSearch] = useQueryState("q", {
    defaultValue: "",
  });
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const categoryList = gownList.filter(
    (g) => category === "All" || g.category === category
  );

  const filteredList = categoryList.filter((g) => {
    const name = g.name.toLowerCase().includes(search.toLowerCase());
    const price = g.price.toString().includes(search);
    const color = g.color.toLowerCase().includes(search.toLowerCase());
    return name || price || color;
  });

  const maxPage = Math.ceil(filteredList.length / PAGE_SIZE);

  const slicedList = filteredList.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSetCategory = (value: CategoryWithAll) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage === 1 ? maxPage : currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage === maxPage ? 1 : currentPage + 1);
  };

  return (
    <section className="bg-site-text text-site-text-light mt-[2px] py-10 px-4 sm:px-8 space-y-10 grow">
      <div className="flex items-center justify-center flex-wrap">
        {categoryEnums.map((c, i) => (
          <CategoryBtn
            key={i}
            value={c}
            category={category}
            handleClick={handleSetCategory}
          />
        ))}
      </div>

      <Input
        placeholder="Search for..."
        className="border-site-background rounded-none text-site-text max-w-80 bg-site-background"
        value={search}
        onChange={handleFilter}
      />

      <div className="max-w-7xl mx-auto grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-20 gap-x-10 py-10">
        {!!slicedList.length ? (
          slicedList.map((g) => <GownCard key={g.id} gown={g} />)
        ) : (
          <p>No Gowns Found</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-4 text-site-text-light">
        <Button onClick={handlePrevPage} variant="secondary">
          <FaChevronLeft />
        </Button>
        <span className="text-base font-bold">
          {!!slicedList.length ? `${currentPage} / ${maxPage}` : "0 / 0"}
        </span>
        <Button onClick={handleNextPage} variant="secondary">
          <FaChevronRight />
        </Button>
      </div>
    </section>
  );
};
