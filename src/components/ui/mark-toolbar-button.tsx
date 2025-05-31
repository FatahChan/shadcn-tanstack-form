"use client";

import type * as React from "react";

import {
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from "@udecode/plate/react";

import { ToolbarButton } from "./toolbar";

/**
 * Renders a toolbar button for applying or clearing a text mark in a rich text editor.
 *
 * @param nodeType - The type of mark to apply (e.g., "bold", "italic").
 * @param clear - Optional mark or marks to clear when the button is activated.
 *
 * @returns A {@link ToolbarButton} component configured for mark formatting.
 */
export function MarkToolbarButton({
  clear,
  nodeType,
  ...props
}: React.ComponentProps<typeof ToolbarButton> & {
  nodeType: string;
  clear?: string[] | string;
}) {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props: buttonProps } = useMarkToolbarButton(state);

  return <ToolbarButton {...props} {...buttonProps} />;
}
