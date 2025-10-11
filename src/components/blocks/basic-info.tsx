"use client";
import { revalidateLogic } from "@tanstack/react-form";
import { type FormHTMLAttributes, useCallback } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form-field";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  age: z.number().min(18, {
    message: "Age must be at least 18 years.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not exceed 160 characters, ss again.",
  }),
});

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {}

interface BasicInfoFormProps extends FormProps {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  defaultValues?: z.infer<typeof FormSchema>;
}

function BasicInfoForm({
  onSubmit,
  defaultValues,
  ...props
}: BasicInfoFormProps) {
  const form = useAppForm({
    validators: { onDynamic: FormSchema },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    onSubmit: ({ formApi, value }) => {
      onSubmit(value);
      toast.success("Account created successfully!");
      formApi.reset();
    },
    defaultValues: defaultValues ?? {
      username: "",
      email: "",
      age: 0,
      bio: "",
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
        className="@container mx-auto w-full max-w-lg space-y-8 rounded-md border p-4 py-10"
        onSubmit={handleSubmit}
        noValidate
        {...props}
      >
        <div className="grid @md:grid-cols-2 grid-cols-1 items-start gap-4">
          <form.AppField
            name="username"
            children={(field) => (
              <field.Field className="space-y-1.5">
                <field.FieldLabel>Username</field.FieldLabel>
                <field.FieldControl>
                  <Input
                    placeholder="FatahChan"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FieldControl>
                <field.FieldDescription className="text-xs">
                  This is your public display name.
                </field.FieldDescription>
                <field.FieldError className="text-xs" />
              </field.Field>
            )}
          />
          <form.AppField
            name="email"
            children={(field) => (
              <field.Field className="space-y-1.5">
                <field.FieldLabel>Email</field.FieldLabel>
                <field.FieldControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FieldControl>
                <field.FieldDescription className="text-xs">
                  Enter your email address for account verification.
                </field.FieldDescription>
                <field.FieldError className="text-xs" />
              </field.Field>
            )}
          />
          <form.AppField
            name="age"
            children={(field) => (
              <field.Field className="space-y-1.5">
                <field.FieldLabel>Age</field.FieldLabel>
                <field.FieldControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                  />
                </field.FieldControl>
                <field.FieldDescription className="text-xs">
                  Must be at least 18 years old.
                </field.FieldDescription>
                <field.FieldError className="text-xs" />
              </field.Field>
            )}
          />
          <form.AppField
            name="bio"
            children={(field) => (
              <field.Field className="space-y-1.5">
                <field.FieldLabel>Bio</field.FieldLabel>
                <field.FieldControl>
                  <Textarea
                    placeholder="Tell us about yourself"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FieldControl>
                <field.FieldDescription className="text-xs">
                  A brief description about yourself (optional).
                </field.FieldDescription>
                <field.FieldError className="text-xs" />
              </field.Field>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </form.AppForm>
  );
}

BasicInfoForm.displayName = "BasicInfoForm";

export default BasicInfoForm;
