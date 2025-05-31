"use client";

import * as React from "react";

import type { PlateElementProps } from "@udecode/plate/react";

import { PlateElement } from "@udecode/plate/react";
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
 * Renders a styled heading element within a rich text editor, supporting variants from h1 to h6.
 *
 * Applies variant-specific styles to the heading and renders its children inside a {@link PlateElement}.
 *
 * @param variant - The heading level to render (e.g., "h1", "h2"). Defaults to "h1".
 * @returns A {@link PlateElement} rendered as the specified heading tag with appropriate styles.
 */
export function HeadingElement({
  variant = "h1",
  ...props
}: PlateElementProps & VariantProps<typeof headingVariants>) {
  return (
    <PlateElement
      as={variant ?? undefined}
      className={headingVariants({ variant })}
      {...props}
    >
      {props.children}
    </PlateElement>
  );
}
