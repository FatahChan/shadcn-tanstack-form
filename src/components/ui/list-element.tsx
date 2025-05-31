"use client";

import * as React from "react";

import type { PlateElementProps } from "@udecode/plate/react";

import { PlateElement } from "@udecode/plate/react";
import { type VariantProps, cva } from "class-variance-authority";

const listVariants = cva("m-0 ps-6", {
  variants: {
    variant: {
      ol: "list-decimal",
      ul: "list-disc [&_ul]:list-[circle] [&_ul_ul]:list-[square]",
    },
  },
});

/**
 * Renders a styled list element using the specified variant.
 *
 * Applies appropriate CSS classes and element type for ordered or unordered lists, supporting nested list styles.
 *
 * @param variant - The list type to render, such as 'ol' for ordered or 'ul' for unordered lists.
 * @returns A {@link PlateElement} component with styling and element type based on the {@link variant}.
 */
export function ListElement({
  variant,
  ...props
}: PlateElementProps & VariantProps<typeof listVariants>) {
  return (
    <PlateElement
      as={variant ?? undefined}
      className={listVariants({ variant })}
      {...props}
    >
      {props.children}
    </PlateElement>
  );
}
