"use client";

import { Form } from "@/components/ui/form";
import { LoginSchemaType, loginSchema } from "@/lib/zod/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { route } from "@/lib/routes";
import { ErrorResponse } from "@/lib/api/types";

export const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { replace, refresh } = useRouter();

  const handleOnSubmit = async (values: LoginSchemaType) => {
    try {
      setLoading(true);
      await api.auth.login.post(values);
      replace(route.dashboard);
      refresh();
    } catch (error) {
      const err = error as ErrorResponse;
      console.error("login error: ", err.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex flex-col gap-2 w-10/12 max-w-96"
      >
        <FormInputField
          name="username"
          placeholder="Username"
          loading={loading}
        />

        <FormInputField
          name="password"
          placeholder="Password"
          type="password"
          loading={loading}
        />
        <Button disabled={loading}>Login</Button>
      </form>
    </Form>
  );
};
