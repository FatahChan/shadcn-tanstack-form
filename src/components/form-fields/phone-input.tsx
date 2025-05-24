import { Input } from "@/components/ui/input";
import { AsYouType, type CountryCode } from "libphonenumber-js";
import type { ComponentProps } from "react";
import { NumberFormatBase } from "react-number-format";

interface PhoneInputFieldProps
  extends Omit<
    ComponentProps<typeof Input>,
    "type" | "defaultValue" | "onChange"
  > {
  value?: string;
  defaultValue?: string | number | null | undefined;
  onChange?: (value: string) => void;
}

function phoneFormatter(countryCode: CountryCode, value: string) {
  const asYouType = new AsYouType(countryCode);
  return asYouType.input(value);
}

export default function PhoneInputField({
  value,
  onChange,
  defaultValue,
  ...props
}: PhoneInputFieldProps) {
  return (
    <NumberFormatBase
      type="tel"
      value={value}
      customInput={Input}
      placeholder="Phone number"
      getInputRef={props.ref}
      className={props.className}
      defaultValue={defaultValue}
      format={(value) => phoneFormatter("US", value.slice(0, 15))}
      onValueChange={(e) => {
        onChange?.(e.value);
      }}
      {...props}
    />
  );
}
