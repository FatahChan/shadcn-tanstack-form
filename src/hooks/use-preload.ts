import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const usePreload = ({
  link = "",
  condition = true,
}: {
  link: string;
  condition?: boolean;
}) => {
  const router = useRouter();
  useEffect(() => {
    if (!condition) return;
    router.preloadRoute({
      to: link,
    });
  }, [link, router, condition]);
};
