"use client";

import { Category, Prisma } from "@prisma/client";
import { GownCard } from "./GownCard";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { CategoryBtn } from "./CategoryBtn";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PAGE_SIZE = 12;

export type CategoryWithAll = Category | "All";

type Props = {
  gownList: Prisma.GownGetPayload<{
    include: { images: { select: { url: true }; take: 1 } };
  }>[];
};

export const CollectionsGownGrid = ({ gownList }: Props) => {
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState<CategoryWithAll>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categoryList = useMemo(
    () => gownList.filter((g) => category === "All" || g.category === category),
    [gownList, category]
  );

  const filteredList = useMemo(
    () =>
      categoryList.filter((g) => {
        const name = g.name.toLowerCase().includes(filter.toLowerCase());
        const price = g.price.toString().includes(filter);
        const color = g.color.toLowerCase().includes(filter.toLowerCase());
        return name || price || color;
      }),
    [filter, categoryList]
  );
  const maxPage = Math.ceil(filteredList.length / PAGE_SIZE);

  const slicedList = useMemo(
    () =>
      filteredList.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      ),
    [filteredList, currentPage]
  );

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSetCategory = (value: CategoryWithAll) => {
    setCategory(value);
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
        <CategoryBtn
          value="All"
          category={category}
          handleClick={handleSetCategory}
        />
        {Object.values(Category).map((c, i) => (
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
        value={filter}
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
