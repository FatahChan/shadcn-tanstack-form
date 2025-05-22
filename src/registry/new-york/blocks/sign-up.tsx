"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useCallback } from "react";
import type { FormHTMLAttributes } from "react";
import { z } from "zod";

const signUpSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string(),
    fullName: z.string().min(2, {
      message: "Full name must be at least 2 characters long.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface SignUpFormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit: (data: z.infer<typeof signUpSchema>) => void;
  defaultValues?: z.infer<typeof signUpSchema>;
}

function SignUpForm({
  onSubmit,
  defaultValues,
  className,
  ...props
}: SignUpFormProps) {
  const form = useAppForm({
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
      confirmPassword: defaultValues?.confirmPassword ?? "",
      fullName: defaultValues?.fullName ?? "",
    },
    validators: { onBlur: signUpSchema },
    onSubmit: ({ value }) => {
      onSubmit(value);
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
          name="email"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Email</field.FormLabel>
              <field.FormControl>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
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
          name="password"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Password</field.FormLabel>
              <field.FormControl>
                <Input
                  type="password"
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
          name="confirmPassword"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Confirm Password</field.FormLabel>
              <field.FormControl>
                <Input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </form.AppForm>
  );
}

SignUpForm.displayName = "SignUpForm";

export default SignUpForm;
