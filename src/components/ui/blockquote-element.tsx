"use client";

import { PlateElement, type PlateElementProps } from "@udecode/plate/react";

/**
 * Renders a blockquote element with predefined styling using PlateElement.
 *
 * Applies margin, left border, padding, and italic text styles to the blockquote.
 */
export function BlockquoteElement(props: PlateElementProps) {
  return (
    <PlateElement
      as="blockquote"
      className="my-1 border-l-2 pl-6 italic"
      {...props}
    />
  );
}
