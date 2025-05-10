// app/providers.js
"use client";
import posthog from "posthog-js";
import { PostHogProvider as PHP } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    });
  }, []);

  return <PHP client={posthog}>{children}</PHP>;
}
