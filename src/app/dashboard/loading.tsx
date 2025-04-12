import { LoaderIcon } from "lucide-react";

const LoadingDashboard = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="text-2xl font-bold flex gap-5 items-center animate-bounce">
        <span>Loading Contents... </span>
        <LoaderIcon className="animate-spin w-12 h-12 text-black" />
      </div>
    </div>
  );
};

export default LoadingDashboard;
