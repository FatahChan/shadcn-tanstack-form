"use client";
import { revalidateLogic } from "@tanstack/react-form";
import { isValidPhoneNumber } from "libphonenumber-js";
import type { FormHTMLAttributes } from "react";
import { useCallback } from "react";
import { toast } from "sonner";
import { z } from "zod";
import PhoneInputField from "@/components/form-fields/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";

const shippingSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters long.",
  }),
  addressLine1: z.string().min(5, {
    message: "Address must be at least 5 characters long.",
  }),
  addressLine2: z.string(),
  city: z.string().min(2, {
    message: "City must be at least 2 characters long.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters long.",
  }),
  postalCode: z.string().min(4, {
    message: "Please enter a valid postal code.",
  }),
  phone: z.string().refine((value) => isValidPhoneNumber(value, "US"), {
    message: "Please enter a valid phone number.",
  }),
});
interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {}

interface ShippingFormProps extends FormProps {
  onSubmit: (data: z.infer<typeof shippingSchema>) => void;
  defaultValues?: z.infer<typeof shippingSchema>;
}

function ShippingForm({
  onSubmit,
  defaultValues,
  className,
  ...props
}: ShippingFormProps) {
  const form = useAppForm({
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      addressLine1: defaultValues?.addressLine1 ?? "",
      addressLine2: defaultValues?.addressLine2 ?? "",
      city: defaultValues?.city ?? "",
      state: defaultValues?.state ?? "",
      postalCode: defaultValues?.postalCode ?? "",
      phone: defaultValues?.phone ?? "",
    },
    validators: { onDynamic: shippingSchema },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    onSubmit: ({ formApi, value }) => {
      onSubmit(value);
      toast.success("Shipping information submitted successfully!");
      formApi.reset();
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form],
  );

  return (
    <form.AppForm>
      <form
        className="mx-auto w-full max-w-lg space-y-6 rounded-lg border p-6"
        onSubmit={handleSubmit}
        noValidate
        {...props}
      >
        <form.AppField
          name="fullName"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Full Name</field.FormLabel>
              <field.FormControl>
                <Input
                  placeholder="John Doe"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        />

        <form.AppField
          name="addressLine1"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Address Line 1</field.FormLabel>
              <field.FormControl>
                <Input
                  placeholder="123 Main St"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        />

        <form.AppField
          name="addressLine2"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Address Line 2 (Optional)</field.FormLabel>
              <field.FormControl>
                <Input
                  placeholder="Apt 4B"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <form.AppField
            name="city"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel>City</field.FormLabel>
                <field.FormControl>
                  <Input
                    placeholder="New York"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />

          <form.AppField
            name="state"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel>State</field.FormLabel>
                <field.FormControl>
                  <Input
                    placeholder="NY"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <form.AppField
            name="postalCode"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel>Postal Code</field.FormLabel>
                <field.FormControl>
                  <Input
                    placeholder="10001"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />

          <form.AppField
            name="phone"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel>Phone Number</field.FormLabel>
                <field.FormControl>
                  <PhoneInputField
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Save Shipping Information
        </Button>
      </form>
    </form.AppForm>
  );
}

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
