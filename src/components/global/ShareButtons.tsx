"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FaFacebook, FaLink, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

type Props = {
  fallbackUrl: string;
  title?: string;
};

export const ShareButtons = ({
  fallbackUrl,
  title = "Checkout this gown!",
}: Props) => {
  const [url, setUrl] = useState<string>(fallbackUrl);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  return (
    <div>
      <h3 className="text-site-text-light/80 mb-2 font-bold">Share this on</h3>
      <div className="flex items-center">
        <Button asChild variant="ghost" className="p-2">
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="size-6" />
          </Link>
        </Button>

        <Button asChild variant="ghost" className="p-2">
          <Link
            href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="size-6" />
          </Link>
        </Button>

        <Button asChild variant="ghost" className="p-2">
          <Link
            href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="size-6" />
          </Link>
        </Button>

        <Button variant="ghost" onClick={copyLink} className="p-2">
          <FaLink className="size-6" />
        </Button>
      </div>
    </div>
  );
};
