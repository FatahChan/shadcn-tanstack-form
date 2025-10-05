"use client";

import type { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { Eye, EyeOff } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import { useCallback, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

export default function PasswordInput({
  className,
  inputGroup,
  ...props
}: ComponentProps<typeof InputGroupInput> & {
  inputGroup?: ComponentProps<typeof InputGroup>;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = useCallback(
    () => setIsVisible((prevState) => !prevState),
    [],
  );

  return (
    <InputGroup {...inputGroup}>
      <InputGroupInput placeholder="Password" {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="Toggle password visibility"
          title="Toggle password visibility"
          size="icon-xs"
          onClick={toggleVisibility}
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
