"use client";

import {
  BulletedListPlugin,
  useListToolbarButton,
  useListToolbarButtonState,
} from "@udecode/plate-list/react";
import { List, ListOrdered } from "lucide-react";
import type * as React from "react";

import { ToolbarButton } from "@/components/ui/toolbar";

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
