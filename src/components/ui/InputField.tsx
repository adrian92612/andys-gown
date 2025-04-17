import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Switch } from "./switch";
import { ComponentProps } from "react";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "form">;

export const InputField = <TFieldValues extends FieldValues = FieldValues>({
  form,
  ...props
}: InputProps & {
  label?: string;
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}) => (
  <FormField
    control={form.control}
    name={props.name}
    render={({ field }) => (
      <FormItem className="w-full">
        {props.label && <FormLabel>{props.label}</FormLabel>}
        <FormMessage />
        <FormControl>
          <Input
            {...field}
            {...props}
            className={cn("bg-white rounded-xs shadow-none", props.className)}
          />
        </FormControl>
      </FormItem>
    )}
  />
);

type SwitchProps = Omit<
  ComponentProps<typeof Switch>,
  "form" | "checked" | "onCheckedChange"
>;

export const SwitchField = <TFieldValues extends FieldValues = FieldValues>({
  form,
  ...props
}: SwitchProps & {
  label?: string;
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}) => (
  <FormField
    control={form.control}
    name={props.name}
    render={({ field }) => (
      <FormItem>
        {props.label && <FormLabel>{props.label}</FormLabel>}
        <FormMessage />
        <FormControl>
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
      </FormItem>
    )}
  />
);

type TextareaProps = Omit<ComponentProps<typeof Textarea>, "form">;

export const TextareaField = <TFieldValues extends FieldValues = FieldValues>({
  form,
  ...props
}: TextareaProps & {
  label?: string;
  textAreaCN?: string;
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}) => (
  <FormField
    control={form.control}
    name={props.name}
    render={({ field }) => {
      const { textAreaCN, label, ...rest } = props;
      return (
        <FormItem>
          {props.label && <FormLabel>{label}</FormLabel>}
          <FormMessage />
          <FormControl>
            <Textarea
              {...field}
              {...rest}
              className={cn("resize-none", textAreaCN)}
            />
          </FormControl>
        </FormItem>
      );
    }}
  />
);
