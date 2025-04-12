import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string | React.ReactNode;
  className?: string;
  labelCn?: string;
  valueCn?: string;
};

export const InfoField = ({
  label,
  value,
  className,
  labelCn,
  valueCn,
}: Props) => {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      <span className={cn("font-semibold", labelCn)}>{label}:</span>
      <span className={cn(valueCn)}>{value}</span>
    </div>
  );
};
