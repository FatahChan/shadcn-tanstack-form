"use client";
import { revalidateLogic } from "@tanstack/react-form";
import { type FormHTMLAttributes, useCallback } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { useAppForm } from "@/components/ui/tanstack-form-field";
import { cn } from "@/lib/utils";

const loginFormSchema = z.object({
  email: z.string(),
  password: z.string().min(1),
});

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {}

interface LoginFormProps extends FormProps {
  onSubmit: (data: z.infer<typeof loginFormSchema>) => void;
  defaultValues?: z.infer<typeof loginFormSchema>;
}

function LoginForm({
  onSubmit,
  defaultValues,
  className,
  ...props
}: LoginFormProps) {
  const form = useAppForm({
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
    },
    validators: { onDynamic: loginFormSchema },
    validationLogic: revalidateLogic({
      mode: "submit",
      modeAfterSubmission: "change",
    }),
    onSubmit: ({ formApi, value }) => {
      onSubmit(value);
      toast.success("Login successful!");
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
        onSubmit={handleSubmit}
        className={cn(
          "mx-auto w-full max-w-lg space-y-8 rounded-md border p-4 py-10",
          className,
        )}
        noValidate
        {...props}
      >
        <form.AppField
          name="email"
          children={(field) => (
            <field.Field>
              <field.FieldLabel>Email</field.FieldLabel>
              <field.FieldControl>
                <Input
                  placeholder="example@example.com"
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FieldControl>
              <field.FieldDescription>
                This is your email
              </field.FieldDescription>
              <field.FieldError />
            </field.Field>
          )}
        />

        <form.AppField
          name="password"
          children={(field) => (
            <field.Field>
              <field.FieldLabel>Password</field.FieldLabel>
              <field.FieldControl>
                <PasswordInput
                  placeholder="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FieldControl>
              <field.FieldDescription>
                This is your password
              </field.FieldDescription>
              <field.FieldError />
            </field.Field>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </form.AppForm>
  );
}

LoginForm.displayName = "LoginForm";

export default LoginForm;
