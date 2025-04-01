"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ErrorType } from "@/lib/api/apiClient";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const { replace, refresh } = useRouter();
  const handleLogout = async () => {
    try {
      await api.auth.logout.post();
      replace("/login");
      refresh();
    } catch (error) {
      const err = error as ErrorType;
      console.log(err);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
