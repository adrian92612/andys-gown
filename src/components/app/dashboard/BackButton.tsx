"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

export const BackButton = () => {
  const { back, refresh } = useRouter();
  const handleClick = () => {
    refresh();
    back();
  };
  return (
    <Button onClick={handleClick} variant="outline">
      <IoMdArrowRoundBack />
      Back
    </Button>
  );
};
