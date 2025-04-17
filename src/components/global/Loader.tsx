import { LoaderIcon } from "lucide-react";

type Props = {
  label?: string;
};

export const Loader = ({ label = "Contents" }: Props) => {
  return (
    <div className="text-2xl font-bold h-[80dvh] flex flex-col gap-5 items-center justify-center animate-pulse">
      <LoaderIcon className="animate-spin w-12 h-12 text-black" />
      <span>Loading {label}... </span>
    </div>
  );
};
