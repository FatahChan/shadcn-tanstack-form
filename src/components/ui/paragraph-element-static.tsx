import * as React from "react";

import type { SlateElementProps } from "@udecode/plate";

import { SlateElement } from "@udecode/plate";

import { cn } from "@/lib/utils";

/**
 * Renders a static paragraph element with predefined spacing styles for use in a Slate editor.
 *
 * @param props - Props to configure the paragraph element, including its children.
 */
export function ParagraphElementStatic(props: SlateElementProps) {
  return (
    <SlateElement {...props} className={cn("m-0 px-0 py-1")}>
      {props.children}
    </SlateElement>
  );
}
