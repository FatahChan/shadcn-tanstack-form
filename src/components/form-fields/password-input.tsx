"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Eye, EyeOff } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import { useState } from "react";

export function PasswordInput({
  className,
  containerProps,
  ...props
}: ComponentProps<typeof Input> & {
  containerProps?: HTMLAttributes<HTMLDivElement>;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div
      {...containerProps}
      className={cn("relative", containerProps?.className)}
    >
      <Input
        className={cn("pe-9", className)}
        placeholder="Password"
        type={isVisible ? "text" : "password"}
        {...props}
      />
      <button
        type="button"
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Eye size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
