import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { UseFormReturn, Path } from "react-hook-form";

type Props<T extends Record<string, unknown>> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  loading?: boolean;
};

export const FormTextField = <T extends Record<string, unknown>>({
  form,
  name,
  label,
  placeholder = "",
  type = "text",
  loading,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormMessage />
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={loading}
              value={field.value as string}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
