"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ErrorResponse } from "@/lib/api/types";
import { route } from "@/lib/routes";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const { replace, refresh } = useRouter();
  const handleLogout = async () => {
    try {
      await api.auth.logout.post();
      replace(route.login);
      refresh();
    } catch (error) {
      const err = error as ErrorResponse;
      console.error(err);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
