"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ErrorResponse } from "@/lib/api/types";
import { route } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const LogoutButton = () => {
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await api.auth.logout.post();
      if (res.status === 200) {
        toast.success(res.message);
        replace(route.login);
      }
    } catch (error) {
      const err = error as ErrorResponse;
      console.error(err);
      toast.error(err.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={loading}>
      Logout
    </Button>
  );
};
