"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ErrorResponse } from "@/lib/api/types";
import { route } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { toast } from "sonner";

type Props = {
  sideBarOpen?: boolean;
  forMobile?: boolean;
};

export const LogoutButton = ({ sideBarOpen, forMobile }: Props) => {
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
    <Button variant="destructive" onClick={handleLogout} disabled={loading}>
      {sideBarOpen || forMobile ? (
        <span className="inline-flex gap-2 items-center">
          <MdLogout /> Logout
        </span>
      ) : (
        <MdLogout />
      )}
    </Button>
  );
};
