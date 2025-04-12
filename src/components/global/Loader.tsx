import { LoaderIcon } from "lucide-react";

type Props = {
  label?: string;
};

export const Loader = ({ label = "Contents" }: Props) => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="text-2xl font-bold flex gap-5 items-center animate-bounce">
        <span>Loading {label}... </span>
        <LoaderIcon className="animate-spin w-12 h-12 text-black" />
      </div>
    </div>
  );
};
