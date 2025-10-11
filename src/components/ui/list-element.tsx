"use client";

import type { PlateElementProps } from "@udecode/plate/react";
import { PlateElement } from "@udecode/plate/react";
import { cva, type VariantProps } from "class-variance-authority";

const listVariants = cva("m-0 ps-6", {
  variants: {
    variant: {
      ol: "list-decimal",
      ul: "list-disc [&_ul]:list-[circle] [&_ul_ul]:list-[square]",
    },
  },
});

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
