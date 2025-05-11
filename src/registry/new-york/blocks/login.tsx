"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { cn } from "@/lib/utils";
import { type FormHTMLAttributes, useCallback } from "react";
import * as z from "zod";

const loginFormSchema = z.object({
  email: z.string(),
  password: z.string().min(1),
});

interface LoginFormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
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
    validators: { onBlur: loginFormSchema },
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
        {...props}
      >
        <form.AppField
          name="email"
          children={(field) => (
            <field.FormItem>
              <field.FormLabel>Email</field.FormLabel>
              <field.FormControl>
                <Input
                  placeholder="example@example.com"
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormDescription>This is your email</field.FormDescription>
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
                  placeholder="password"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormDescription>
                This is your password
              </field.FormDescription>
              <field.FormMessage />
            </field.FormItem>
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
