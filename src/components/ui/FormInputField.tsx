import { useFormContext } from "react-hook-form";
import { Input } from "./input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

type Props = {
  name: string;
  label?: string;
  labelCN?: string;
  className?: string;
  loading?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

export const FormInputField = ({
  name,
  label,
  labelCN,
  className,
  loading,
  type = "text",
  ...rest
}: Props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel className={cn("text-xl", labelCN)}>{label}</FormLabel>
            )}
            <FormMessage />
            <FormControl>
              <Input
                {...field}
                value={field.value}
                type={type}
                disabled={loading}
                className={className}
                {...rest}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};
