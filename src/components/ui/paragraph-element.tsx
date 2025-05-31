"use client";

import * as React from "react";

import type { PlateElementProps } from "@udecode/plate/react";

import { PlateElement } from "@udecode/plate/react";

import { cn } from "@/lib/utils";

/**
 * Renders a paragraph element within a Plate editor, applying consistent spacing styles.
 *
 * Combines the provided props with default margin and padding classes for visual consistency.
 */
export function ParagraphElement(props: PlateElementProps) {
  return (
    <PlateElement {...props} className={cn("m-0 px-0 py-1")}>
      {props.children}
    </PlateElement>
  );
}
