"use client";

import { cn } from "@/lib/utils";

import { Toolbar } from "./toolbar";

/**
 * Renders a toolbar with fixed positioning and enhanced styling at the top of the viewport.
 *
 * Combines default sticky, scrollable, and visually distinct styles with any additional class names provided via props.
 *
 * @param props - Props forwarded to the underlying {@link Toolbar} component.
 * @returns The styled toolbar component.
 */
export function FixedToolbar(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar
      {...props}
      className={cn(
        "scrollbar-hide sticky top-0 left-0 z-50 w-full justify-between overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 p-1 backdrop-blur-sm supports-backdrop-blur:bg-background/60",
        props.className,
      )}
    />
  );
}
