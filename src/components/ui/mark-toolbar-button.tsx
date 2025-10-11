"use client";

import {
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from "@udecode/plate/react";
import type * as React from "react";

import { ToolbarButton } from "@/components/ui/toolbar";

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
