"use client";

import { Form } from "@/components/ui/form";
import { LoginSchemaType, loginSchema } from "@/lib/zod/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { route } from "@/lib/routes";
import { ErrorResponse } from "@/lib/api/types";
import { toast } from "sonner";

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { replace } = useRouter();

  const handleOnSubmit = async (values: LoginSchemaType) => {
    try {
      setLoading(true);
      const res = await api.auth.login.post(values);
      if (res.status === 200) {
        toast.success(res.message);
        replace(route.dashboard);
      }
    } catch (error) {
      const err = error as ErrorResponse;
      console.error("login error: ", err.error);
      toast.error(err.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <fieldset disabled={loading} className="w-full max-w-lg">
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="flex flex-col gap-2"
        >
          <InputField form={form} name="username" placeholder="Username" />
          <InputField
            form={form}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button variant="outlineSecondary">Login</Button>
        </form>
      </fieldset>
    </Form>
  );
};
