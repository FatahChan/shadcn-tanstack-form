import * as React from "react";

import { SlateElement, type SlateElementProps } from "@udecode/plate";

/**
 * Renders a static blockquote element within a Slate editor, styled with margin, left border, padding, and italic text.
 *
 * All received props are forwarded to the underlying {@link SlateElement}.
 */
export function BlockquoteElementStatic(props: SlateElementProps) {
  return (
    <SlateElement
      as="blockquote"
      className="my-1 border-l-2 pl-6 italic"
      {...props}
    />
  );
}
