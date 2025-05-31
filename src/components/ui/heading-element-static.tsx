import * as React from "react";

import type { SlateElementProps } from "@udecode/plate";

import { SlateElement } from "@udecode/plate";
import { type VariantProps, cva } from "class-variance-authority";

const headingVariants = cva("relative mb-1", {
  variants: {
    variant: {
      h1: "mt-[1.6em] pb-1 font-heading text-4xl font-bold",
      h2: "mt-[1.4em] pb-px font-heading text-2xl font-semibold tracking-tight",
      h3: "mt-[1em] pb-px font-heading text-xl font-semibold tracking-tight",
      h4: "mt-[0.75em] font-heading text-lg font-semibold tracking-tight",
      h5: "mt-[0.75em] text-lg font-semibold tracking-tight",
      h6: "mt-[0.75em] text-base font-semibold tracking-tight",
    },
  },
});

/**
 * Renders a styled heading element within a Slate editor, using the specified heading level and variant-based styles.
 *
 * @param variant - The heading level to render (e.g., "h1" through "h6"). Defaults to "h1" if not specified.
 * @returns A {@link SlateElement} rendered as the specified heading tag with appropriate styles applied.
 */
export function HeadingElementStatic({
  variant = "h1",
  ...props
}: SlateElementProps & VariantProps<typeof headingVariants>) {
  return (
    <SlateElement
      as={variant ?? undefined}
      className={headingVariants({ variant })}
      {...props}
    >
      {props.children}
    </SlateElement>
  );
}
