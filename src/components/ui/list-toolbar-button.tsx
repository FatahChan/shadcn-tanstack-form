"use client";

import type * as React from "react";

import {
  BulletedListPlugin,
  useListToolbarButton,
  useListToolbarButtonState,
} from "@udecode/plate-list/react";
import { List, ListOrdered } from "lucide-react";

import { ToolbarButton } from "./toolbar";

/**
 * Renders a toolbar button for toggling bulleted or numbered list formatting in a rich text editor.
 *
 * The button displays an appropriate icon and tooltip based on the specified list type.
 *
 * @param nodeType - Optional. The list type to control; defaults to bulleted list.
 */
export function ListToolbarButton({
  nodeType = BulletedListPlugin.key,
  ...props
}: React.ComponentProps<typeof ToolbarButton> & {
  nodeType?: string;
}) {
  const state = useListToolbarButtonState({ nodeType });
  const { props: buttonProps } = useListToolbarButton(state);

  return (
    <ToolbarButton
      {...props}
      {...buttonProps}
      tooltip={
        nodeType === BulletedListPlugin.key ? "Bulleted List" : "Numbered List"
      }
    >
      {nodeType === BulletedListPlugin.key ? <List /> : <ListOrdered />}
    </ToolbarButton>
  );
}
